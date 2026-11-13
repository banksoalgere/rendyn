import { Client, StreamableHTTPClientTransport, type CallToolResult } from '@modelcontextprotocol/client';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildNodeApp } from './node-app.js';
import { readConfig } from './config.js';
import { SupabaseTokenVerifier } from './auth.js';

const { rpc } = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock('@supabase/supabase-js', () => ({ createClient: () => ({ rpc }) }));
const grant = { allowed:true, newly_unlocked:false, plan_code:'free', subscription_status:null, access_ends_at:null };

function payload(result: CallToolResult) {
  const text = result.content.find(item => item.type === 'text');
  if (!text || text.type !== 'text') throw new Error('Missing tool text');
  return JSON.parse(text.text);
}

describe('MCP discovery to source workflow', () => {
  let app: Awaited<ReturnType<typeof buildNodeApp>>;
  const clients: Client[] = [];
  beforeAll(async () => {
    app = await buildNodeApp(readConfig({ NODE_ENV:'test', SUPABASE_URL:'https://example.supabase.co', SUPABASE_ANON_KEY:'test-public-key-not-a-real-secret' }));
  });
  beforeEach(() => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-02T00:00:00.000Z'));
    rpc.mockReset().mockRejectedValue(new Error('Subscription database unavailable'));
    vi.spyOn(SupabaseTokenVerifier.prototype, 'verifyAccessToken').mockImplementation(async token => ({ token, clientId:'test-user', scopes:['openid'], expiresAt:4102444800 }));
  });
  afterEach(async () => {
    await Promise.all(clients.splice(0).map(client => client.close()));
    vi.restoreAllMocks();
  });
  async function connect() {
    const client = new Client({name:'rendyn-experience-test',version:'1.0.0'});
    clients.push(client);
    await client.connect(new StreamableHTTPClientTransport(new URL('http://localhost:8787/mcp'), {
      requestInit: { headers:{Authorization:'Bearer test-user-token'} },
      fetch: async (input, init) => {
        const request = new Request(input, init);
        request.headers.set('Host','localhost');
        return app.fetch(request);
      },
    }));
    return client;
  }

  it('makes discovery read-only and explains the cross-category workflow', async () => {
    const client = await connect();
    const tools = (await client.listTools()).tools;
    expect(tools.filter(tool => tool.name !== 'get_component').every(tool => tool.annotations?.readOnlyHint)).toBe(true);
    expect(tools.find(tool => tool.name === 'get_component')?.annotations?.readOnlyHint).toBe(true);
    const categories = payload(await client.callTool({name:'list_categories',arguments:{}}));
    expect(categories.suggested_workflow).toHaveLength(3);
    expect(categories.categories.find((category: {slug:string}) => category.slug==='motion').description).toContain('not a motion-only filter');
  });
  it('advertises the search limit and gives callers a valid retry when they exceed it', async () => {
    const client = await connect();
    const searchTool = (await client.listTools()).tools.find(tool => tool.name === 'search_components');
    expect(searchTool?.description).toContain('Omit limit');
    expect(searchTool?.inputSchema.required).not.toContain('limit');
    expect(searchTool?.inputSchema.properties?.limit).toMatchObject({
      type: 'integer',
      minimum: 1,
      maximum: 5,
      default: 5,
      description: expect.stringContaining('from 1 to 5'),
    });

    const query = 'animated button';
    const rejected = await client.callTool({ name: 'search_components', arguments: { query, limit: 10 } });
    expect(rejected.isError).toBe(true);
    expect(rejected.content[0]).toMatchObject({
      type: 'text',
      text: expect.stringContaining('Omit limit or use an integer from 1 to 5.'),
    });

    const retry = await client.callTool({ name: 'search_components', arguments: { query } });
    expect(retry.isError).not.toBe(true);
    expect(payload(retry).results).toHaveLength(5);
  });
  it('finds the intended component, then follows its retrieval call to complete source', async () => {
    const client = await connect();
    const result = await client.callTool({name:'search_components',arguments:{query:'A responsive bento grid for presenting product features on a minimal white landing page'}});
    expect(result.content).toHaveLength(1);
    expect(JSON.stringify(result).length).toBeLessThan(5000);
    const search = payload(result);
    expect(search.results[0].id).toBe('magicui:bento-grid');
    const source = await client.callTool({name:search.results[0].retrieve.tool,arguments:search.results[0].retrieve.arguments});
    expect(source.isError).not.toBe(true);
    const data = payload(source);
    expect(data.entitlement).toEqual(grant);
    expect(data.component.files[0].content).toContain('BentoGrid');
    expect(data.component.license.text).toContain('MIT License');
    expect(data.component.entrypoints[0].import_from).toBe('@/components/magicui/bento-grid');
    expect(data.component.required_project_imports).toContain('@/lib/utils');
  });
  it.each(['magicui:hero-video-dialog','beui:expanding-arrow-button'])('retrieves source using the current entitlement contract: %s', async id => {
    const client = await connect();
    const result = await client.callTool({name:'get_component',arguments:{id}});
    expect(result.isError).not.toBe(true);
    const source = payload(result);
    expect(source.component.files.length).toBeGreaterThan(0);
    expect(source.component.license.spdx).toBe('MIT');
    if (id.startsWith('magicui')) expect(source.component.dependencies).toContain('lucide-react');
  });
  it('explains how to recover from a mismatched category', async () => {
    const client = await connect();
    const data = payload(await client.callTool({name:'search_components',arguments:{query:'bento grid',category:'blocks'}}));
    expect(data.count).toBe(0);
    expect(data.suggested_search.arguments).not.toHaveProperty('category');
    const recovered = payload(await client.callTool({name:data.suggested_search.tool,arguments:data.suggested_search.arguments}));
    expect(recovered.results[0].slug).toBe('magicui-bento-grid');
  });
  it('explicitly reports gaps and refuses made-up identifiers', async () => {
    const client = await connect();
    const missing = payload(await client.callTool({name:'search_components',arguments:{query:'pricing tiers cards'}}));
    expect(missing.count).toBe(0);
    expect(missing.message).toContain('No close match');
    const invented = await client.callTool({name:'get_component',arguments:{id:'pricing-table'}});
    expect(invented.isError).toBe(true);
    expect(payload(invented).message).toContain('returned id');
  });
  it('retrieves free source even when billing is unavailable', async () => {
    const client = await connect();
    const result = await client.callTool({name:'get_component',arguments:{id:'button'}});
    expect(result.isError).not.toBe(true);
    expect(payload(result).entitlement).toEqual(grant);
    expect(payload(result).component.files.length).toBeGreaterThan(0);
    expect(rpc).not.toHaveBeenCalled();
  });
  it('returns visual previews only when requested', async () => {
    const client = await connect();
    const result = await client.callTool({name:'search_components',arguments:{query:'bento grid',limit:1,include_previews:true}});
    expect(result.content.some(item => item.type === 'image')).toBe(true);
    expect(payload(result).results[0].slug).toBe('magicui-bento-grid');
  });
});
