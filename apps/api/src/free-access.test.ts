import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { OAuthError, OAuthErrorCode } from '@modelcontextprotocol/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildNodeApp } from './node-app';
import { readConfig } from './config';
import { SupabaseTokenVerifier } from './auth';
const { rpc } = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock('@supabase/supabase-js', () => ({ createClient: () => ({ rpc }) }));
const config = readConfig({ NODE_ENV: 'test', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_ANON_KEY: 'local-test-public-key-value' });
const headers = { Host: 'localhost', Authorization: 'Bearer valid-test-token' };
afterEach(() => vi.restoreAllMocks());
beforeEach(() => {
  rpc.mockReset().mockRejectedValue(new Error('Billing unavailable'));
  vi.spyOn(SupabaseTokenVerifier.prototype, 'verifyAccessToken').mockImplementation(async token => ({ token, clientId: 'test-user', scopes: ['openid'], expiresAt: 4102444800 }));
});
describe('permanently free source with authenticated MCP', () => {
  it('returns public HTTP source without authentication or billing', async () => {
    const app = await buildNodeApp(config);
    const response = await app.request('http://localhost/api/components/button/source', { headers: { Host: 'localhost' } });
    expect(response.status).toBe(200);
    const source = await response.json();
    expect(source.component.files.length).toBeGreaterThan(0);
    expect(source.component.license.text).toContain('MIT License');
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(rpc).not.toHaveBeenCalled();
  });
  it.each(['2026-10-10T12:00:00Z', '2026-11-02T00:00:00Z', '2030-01-01T00:00:00Z'])('returns authenticated MCP source without expiry or billing at %s', async now => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse(now));
    const app = await buildNodeApp(config);
    const client = new Client({ name: 'free-access-release-test', version: '1' });
    try {
      await client.connect(new StreamableHTTPClientTransport(new URL('http://localhost/mcp'), { requestInit: { headers }, fetch: async (input, init) => app.fetch(new Request(input, init)) }));
      const result = await client.callTool({ name: 'get_component', arguments: { id: 'beui:button' } });
      expect(result.isError).not.toBe(true);
      const payload = JSON.parse(result.content.find(item => item.type === 'text')!.text);
      expect(payload.component.files.length).toBeGreaterThan(0);
      expect(payload.entitlement).toEqual({ allowed: true, newly_unlocked: false, plan_code: 'free', subscription_status: null, access_ends_at: null });
      expect(rpc).not.toHaveBeenCalled();
    } finally { await client.close(); }
  });
  it('rejects missing and invalid MCP tokens', async () => {
    const app = await buildNodeApp(config);
    expect((await app.request('http://localhost/mcp', { headers: { Host: 'localhost' } })).status).toBe(401);
    vi.spyOn(SupabaseTokenVerifier.prototype, 'verifyAccessToken').mockRejectedValue(new OAuthError(OAuthErrorCode.InvalidToken, 'Invalid token'));
    expect((await app.request('http://localhost/mcp', { headers })).status).toBe(401);
  });
  it('rejects authenticated MCP requests missing required scopes', async () => {
    const app = await buildNodeApp(config);
    vi.spyOn(SupabaseTokenVerifier.prototype, 'verifyAccessToken').mockImplementation(async token => ({ token, clientId: 'test-user', scopes: [], expiresAt: 4102444800 }));
    expect((await app.request('http://localhost/mcp', { headers })).status).toBe(403);
    expect(rpc).not.toHaveBeenCalled();
  });
});
