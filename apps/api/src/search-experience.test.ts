import { Client, StreamableHTTPClientTransport, type CallToolResult } from '@modelcontextprotocol/client';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildNodeApp } from './node-app.js';
import { readConfig } from './config.js';
import { SupabaseTokenVerifier } from './auth.js';

const { rpc } = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock('@supabase/supabase-js', () => ({ createClient: () => ({ rpc }) }));
const subscription = { allowed: true, plan_code: 'pro_monthly', subscription_status: 'trialing',
  trial_end: '2099-01-01T00:00:00Z', current_period_end: '2099-01-01T00:00:00Z', cancel_at_period_end: false };

function payload(result: CallToolResult) {
  const text = result.content.find(item => item.type === 'text');
  if (!text || text.type !== 'text') throw new Error('Missing tool text');
  return JSON.parse(text.text);
}

describe('search over the MCP transport', () => {
  let app: Awaited<ReturnType<typeof buildNodeApp>>;
  const clients: Client[] = [];
  beforeAll(async () => {
    app = await buildNodeApp(readConfig({ NODE_ENV: 'test', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_ANON_KEY: 'test-public-key-not-a-real-secret' }));
  });
  beforeEach(() => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-03T12:00:00Z'));
    rpc.mockReset().mockResolvedValue({ data: [subscription], error: null });
    vi.spyOn(SupabaseTokenVerifier.prototype, 'verifyAccessToken').mockImplementation(async token => (
      { token, clientId: 'test-user', scopes: ['openid'], expiresAt: 4102444800 }
    ));
  });
  afterEach(async () => {
    await Promise.all(clients.splice(0).map(client => client.close()));
    vi.restoreAllMocks();
  });
  async function connect() {
    const client = new Client({ name: 'rendyn-search-test', version: '1.0.0' });
    clients.push(client);
    await client.connect(new StreamableHTTPClientTransport(new URL('http://localhost:8787/mcp'), {
      requestInit: { headers: { Authorization: 'Bearer test-user-token' } },
      fetch: async (input, init) => {
        const request = new Request(input, init);
        request.headers.set('Host', 'localhost');
        return app.fetch(request);
      },
    }));
    return client;
  }

  it.each([
    ['keyboard-first command menu for a dense admin tool', 'command-palette'],
    ['human approval before an AI agent publishes changes', 'approval-card'],
    ['commmand palete', 'command-palette'],
  ])('finds the requested interaction and provides the next call: %s', async (query, slug) => {
    const client = await connect();
    const response = await client.callTool({ name: 'search_components', arguments: { query } });
    expect(response.isError).not.toBe(true);
    expect(response.content).toHaveLength(1);
    const data = payload(response);
    if (slug === 'command-palette' && /command menu/.test(query)) {
      expect(data.results[0].labels.family).toMatch(/^command(?:-palette)?$/);
    } else expect(data.results[0].slug).toBe(slug);
    expect(data.results[0].retrieve).toEqual({ tool: 'get_component', arguments: { id: data.results[0].id } });
    expect(rpc.mock.calls.every(([name]) => name === 'get_subscription_access')).toBe(true);
  });
  it('gives public HTTP and MCP callers the same table results', async () => {
    const client = await connect();
    const query = 'dashboard table for reviewing user status and roles';
    const mcp = payload(await client.callTool({ name: 'search_components', arguments: { query } }));
    const response = await app.request(`http://localhost/api/search?q=${encodeURIComponent(query)}`, { headers: { Host: 'localhost' } });
    const http = await response.json();
    expect(mcp.results.length).toBeGreaterThanOrEqual(2);
    expect(mcp.results.every((result: {name:string})=>/table/i.test(result.name))).toBe(true);
    expect(http.results).toEqual(mcp.results);
  });
  it('keeps category filters strict and offers a working recovery call', async () => {
    const client = await connect();
    const data = payload(await client.callTool({ name: 'search_components', arguments: { query: 'bento grid', category: 'blocks' } }));
    expect(data.count).toBe(0);
    expect(data.suggested_search.arguments).not.toHaveProperty('category');
    const recovered = payload(await client.callTool({ name: data.suggested_search.tool, arguments: data.suggested_search.arguments }));
    expect(recovered.results[0].slug).toBe('magicui-bento-grid');
  });
  it('reports catalogue gaps, rejects invalid input and only returns images on request', async () => {
    const client = await connect();
    const missing = payload(await client.callTool({ name: 'search_components', arguments: { query: 'quantum teleportation simulator' } }));
    expect(missing.count).toBe(0);
    expect(missing.message).toContain('No close match');
    expect((await client.callTool({ name: 'search_components', arguments: { query: 'x'.repeat(501) } })).isError).toBe(true);
    const preview = await client.callTool({ name: 'search_components', arguments: { query: 'bento grid', limit: 1, include_previews: true } });
    expect(preview.content.some(item => item.type === 'image')).toBe(true);
  });

  it('returns purpose, implementation, behavior and source visual labels over MCP', async () => {
    const client = await connect();
    const search = payload(await client.callTool({ name: 'search_components', arguments: { query: 'shadcn-base-button', limit: 1 } }));
    const result = search.results[0];
    expect(result.labels).toMatchObject({ kind: 'component', family: 'button', labelStatus: 'source-labelled',
      visual: { evidence: 'source', scope: 'bundled-examples' } });
    expect(result.labels.tags).toContain('base-ui');
    expect(result.labels.exampleCount).toBeGreaterThan(0);
    expect(result.description).toContain('action');
    expect(result.labels).not.toHaveProperty('searchText');
    expect(result).not.toHaveProperty('files');
    rpc.mockImplementation(async name => ({ data: [name === 'claim_component_access' ? {
      allowed: true, newly_unlocked: true, plan_code: 'pro_monthly', subscription_status: 'trialing', access_ends_at: '2099-01-01T00:00:00Z',
    } : subscription], error: null }));
    const source = payload(await client.callTool({ name: result.retrieve.tool, arguments: result.retrieve.arguments }));
    expect(source.component.metadata).toMatchObject(result.labels);
    expect(source.component.metadata).not.toHaveProperty('searchText');
    expect(source.component.files.length).toBeGreaterThan(0);
    expect(source.component.license.spdx).toBe('MIT');
  });

  it('gives an authenticated account full MCP source during free access without requiring or mutating a subscription', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-10-10T12:00:00Z'));
    rpc.mockRejectedValue(new Error('Subscription database unavailable'));
    const client = await connect();
    const source = payload(await client.callTool({ name: 'get_component', arguments: { id: 'beui:button' } }));
    expect(source.component.files.length).toBeGreaterThan(0);
    expect(source.entitlement).toMatchObject({ allowed: true, plan_code: 'free_access', access_ends_at: '2026-11-02T00:00:00.000Z' });
    expect(rpc).not.toHaveBeenCalled();
  });

  it('gives the authenticated HTTP source route the same free access', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-10-10T12:00:00Z'));
    rpc.mockRejectedValue(new Error('Subscription database unavailable'));
    const response = await app.request('http://localhost/api/components/button/source', { headers: { Host: 'localhost', Authorization: 'Bearer test-user-token' } });
    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect((await response.json()).entitlement.plan_code).toBe('free_access');
    expect(rpc).not.toHaveBeenCalled();
  });

  it('still rejects missing or invalid bearer tokens during free access', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-10-10T12:00:00Z'));
    const missing = await app.request('http://localhost/mcp', { headers: { Host: 'localhost' } });
    expect(missing.status).toBe(401);
    vi.spyOn(SupabaseTokenVerifier.prototype, 'verifyAccessToken').mockRejectedValue(new Error('Invalid token'));
    const invalidSource = await app.request('http://localhost/api/components/button/source', { headers: { Host: 'localhost', Authorization: 'Bearer invalid-token' } });
    expect(invalidSource.status).toBe(401);
    expect(await invalidSource.json()).not.toHaveProperty('component');
  });

  it('restores subscription enforcement exactly when the free window ends', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-02T00:00:00.000Z'));
    rpc.mockResolvedValue({ data: [{ ...subscription, allowed: false }], error: null });
    const response = await app.request('http://localhost/mcp', { headers: { Host: 'localhost', Authorization: 'Bearer test-user-token' } });
    expect(response.status).toBe(402);
    expect((await response.json()).error).toBe('subscription_required');
    expect(rpc).toHaveBeenCalledWith('get_subscription_access');
  });

  it('uses the same labels in category browsing and public HTTP metadata', async () => {
    const client = await connect();
    const browse = payload(await client.callTool({ name: 'browse_category', arguments: { category: 'blocks', limit: 1 } }));
    const item = browse.items[0];
    expect(item.labels.family).toBeTruthy();
    expect(item.labels.visual.evidence).toBe('source');
    const response = await app.request(`http://localhost/api/components/${item.slug}`, { headers: { Host: 'localhost' } });
    const metadata = await response.json();
    expect(metadata.metadata).toMatchObject(item.labels);
    expect(metadata.metadata).not.toHaveProperty('searchText');
  });
});
