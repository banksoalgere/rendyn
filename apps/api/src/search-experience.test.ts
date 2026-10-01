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
    expect(data.results[0].slug).toBe(slug);
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
});
