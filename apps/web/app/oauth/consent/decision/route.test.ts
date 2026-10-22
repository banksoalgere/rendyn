import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createClient, getClaims, approveAuthorization, denyAuthorization, rpc } = vi.hoisted(() => ({
  createClient: vi.fn(), getClaims: vi.fn(), approveAuthorization: vi.fn(), denyAuthorization: vi.fn(), rpc: vi.fn(),
}));
vi.mock('@/lib/auth/inputs', async () => import('../../../../lib/auth/inputs'));
vi.mock('@/lib/supabase/server', () => ({ createClient }));
import { POST } from './route';

function decide(decision = 'approve', origin = 'https://rendyn.dev', id = 'authorization-123') {
  return POST(new Request('https://rendyn.dev/oauth/consent/decision', {
    method: 'POST', headers: { Origin: origin }, body: new URLSearchParams({ authorization_id: id, decision }),
  }));
}

beforeEach(() => {
  vi.resetAllMocks();
  getClaims.mockResolvedValue({ data: { claims: { sub: 'verified-user' } } });
  approveAuthorization.mockResolvedValue({ data: { redirect_url: 'https://client.example/callback?code=test' }, error: null });
  denyAuthorization.mockResolvedValue({ data: { redirect_url: 'https://client.example/callback?error=access_denied' }, error: null });
  rpc.mockRejectedValue(new Error('No subscription service'));
  createClient.mockResolvedValue({ auth: { getClaims, oauth: { approveAuthorization, denyAuthorization } }, rpc });
});

describe('free MCP consent', () => {
  it('approves a verified account without querying subscriptions', async () => {
    const response = await decide();
    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe('https://client.example/callback?code=test');
    expect(approveAuthorization).toHaveBeenCalledWith('authorization-123', { skipBrowserRedirect: true });
    expect(rpc).not.toHaveBeenCalled();
  });
  it('requires authentication before granting consent', async () => {
    getClaims.mockResolvedValue({ data: { claims: null } });
    expect((await decide()).headers.get('Location')).toContain('/login?next=');
    expect(approveAuthorization).not.toHaveBeenCalled();
  });
  it('keeps the origin, identifier and decision boundaries', async () => {
    expect((await decide('approve', 'https://attacker.example')).status).toBe(403);
    expect((await decide('approve', 'https://rendyn.dev', '../invalid')).status).toBe(400);
    expect((await decide('other')).status).toBe(400);
    expect(approveAuthorization).not.toHaveBeenCalled();
  });
  it('allows denial and prevents unsafe registered callbacks', async () => {
    expect((await decide('deny')).headers.get('Location')).toContain('error=access_denied');
    expect(denyAuthorization).toHaveBeenCalled();
    approveAuthorization.mockResolvedValue({ data: { redirect_url: 'http://attacker.example/callback' }, error: null });
    expect((await decide()).headers.get('Location')).toContain('/oauth/consent?');
  });
});
