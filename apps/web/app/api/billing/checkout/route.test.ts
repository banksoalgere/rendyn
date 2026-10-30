import { beforeEach, describe, expect, it, vi } from 'vitest';
const { createSession, createClient } = vi.hoisted(() => ({ createSession: vi.fn(), createClient: vi.fn() }));
vi.mock('@/lib/auth/inputs', async () => import('../../../../lib/auth/inputs'));
vi.mock('@/lib/billing/config', async () => import('../../../../lib/billing/config'));
vi.mock('@/lib/billing/checkout-attempt', () => ({ checkoutSession: createSession }));
vi.mock('@/lib/supabase/server', () => ({ createClient }));
import { POST } from './route';

function checkout(plan = 'pro_monthly', origin = 'https://rendyn.dev', returnTo = '/mcp') {
  return POST(new Request('https://rendyn.dev/api/billing/checkout', {
    method: 'POST', headers: { Origin: origin }, body: new URLSearchParams({ plan, return_to: returnTo }),
  }));
}

beforeEach(() => vi.resetAllMocks());
describe('retired paid checkout', () => {
  it('sends old checkout forms to free access without creating a payment or requiring an account', async () => {
    const response = await checkout();
    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe('https://rendyn.dev/mcp');
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(createSession).not.toHaveBeenCalled();
    expect(createClient).not.toHaveBeenCalled();
  });
  it('keeps valid same-origin destinations and rejects open redirects', async () => {
    expect((await checkout('team_yearly', 'https://rendyn.dev', '/app/mcp')).headers.get('Location')).toBe('https://rendyn.dev/app/mcp');
    expect((await checkout('pro_yearly', 'https://rendyn.dev', 'https://attacker.example')).headers.get('Location')).toBe('https://rendyn.dev/mcp');
    expect(createSession).not.toHaveBeenCalled();
  });
  it('retains origin and plan validation', async () => {
    expect((await checkout('pro_monthly', 'https://attacker.example')).status).toBe(403);
    expect((await checkout('price_attacker')).status).toBe(400);
    expect(createSession).not.toHaveBeenCalled();
  });
  it('rejects malformed forms', async () => {
    const response = await POST(new Request('https://rendyn.dev/api/billing/checkout', {
      method: 'POST', headers: { Origin: 'https://rendyn.dev', 'Content-Type': 'application/json' }, body: '{}',
    }));
    expect(response.status).toBe(400);
  });
});
