import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { createClient, createSession, getClaims, subscriptionLimit } = vi.hoisted(() => ({
  createClient: vi.fn(), createSession: vi.fn(), getClaims: vi.fn(), subscriptionLimit: vi.fn(),
}));
vi.mock('@/lib/auth/inputs', async () => import('../../../../lib/auth/inputs'));
vi.mock('@/lib/billing/config', async () => import('../../../../lib/billing/config'));
vi.mock('@/lib/billing/checkout-attempt', () => ({ checkoutSession: createSession, TrialAlreadyUsed: class extends Error {} }));
vi.mock('@/lib/supabase/server', () => ({ createClient }));
import { POST } from './route';

function checkout(plan = 'pro_monthly', origin = 'https://rendyn.dev') {
  return POST(new Request('https://rendyn.dev/api/billing/checkout', {
    method: 'POST', headers: { Origin: origin }, body: new URLSearchParams({ plan }),
  }));
}

afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe('trial checkout', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-03T12:00:00Z'));
    vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_abcdefghijklmnopqrstuvwxyz');
    vi.stubEnv('STRIPE_WEBHOOK_SECRET', 'whsec_abcdefghijklmnopqrstuvwxyz');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'server-only-service-role-key-value');
    for (const plan of ['PRO_MONTHLY', 'PRO_YEARLY', 'TEAM_MONTHLY', 'TEAM_YEARLY']) {
      vi.stubEnv(`STRIPE_${plan}_PRICE_ID`, 'price_Example123');
    }
    getClaims.mockResolvedValue({ data: { claims: { sub: 'test-user', email: 'test@example.com' } } });
    subscriptionLimit.mockResolvedValue({ data: [], error: null });
    createClient.mockResolvedValue({ auth: { getClaims }, from: () => ({
      select: () => ({ eq: () => ({ limit: subscriptionLimit }) }),
    }) });
    createSession.mockResolvedValue({ url: 'https://checkout.stripe.com/example' });
  });

  it('creates a seven-day trial compatible with Managed Payments while requiring payment collection', async () => {
    const response = await checkout();
    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe('https://checkout.stripe.com/example');
    const [, params] = createSession.mock.calls[0];
    expect(params).toMatchObject({
      mode: 'subscription', payment_method_collection: 'always',
      client_reference_id: 'test-user',
      subscription_data: { trial_period_days: 7, metadata: { rendyn_user_id: 'test-user', rendyn_plan_code: 'pro_monthly' } },
      line_items: [{ price: 'price_Example123', quantity: 1 }],
    });
    expect(params).not.toHaveProperty('custom_text');
    expect(params).not.toHaveProperty('payment_method_types');
    expect(params).not.toHaveProperty('managed_payments');
  });

  it('redirects a signed-in user to the workspace during free access without contacting Stripe or subscriptions', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-10-10T12:00:00Z'));
    const response = await checkout();
    expect(response.headers.get('Location')).toBe('https://rendyn.dev/app');
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(createSession).not.toHaveBeenCalled();
    expect(subscriptionLimit).not.toHaveBeenCalled();
  });

  it('sends anonymous checkout visitors through login during free access', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-10-10T12:00:00Z'));
    getClaims.mockResolvedValueOnce({ data: { claims: null } });
    const response = await checkout();
    const login = new URL(response.headers.get('Location')!);
    expect(login.pathname).toBe('/login');
    expect(login.searchParams.get('next')).toBe('/app');
    expect(createSession).not.toHaveBeenCalled();
  });

  it('still validates origin and plan during free access', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-10-10T12:00:00Z'));
    expect((await checkout('pro_monthly', 'https://attacker.example')).status).toBe(403);
    expect((await checkout('price_attacker')).status).toBe(400);
    expect(getClaims).not.toHaveBeenCalled();
    expect(createSession).not.toHaveBeenCalled();
  });

  it('rejects foreign origins and browser-supplied price IDs before contacting Stripe', async () => {
    expect((await checkout('pro_monthly', 'https://other.example')).status).toBe(403);
    expect((await checkout('price_attacker')).status).toBe(400);
    expect(createSession).not.toHaveBeenCalled();
  });

  it('requires sign-in and prevents a repeat trial', async () => {
    getClaims.mockResolvedValueOnce({ data: { claims: null } });
    expect((await checkout()).headers.get('Location')).toContain('/login?');
    subscriptionLimit.mockResolvedValueOnce({ data: [{ id: 'prior-subscription' }], error: null });
    expect((await checkout()).headers.get('Location')).toContain('error=trial_used');
    expect(createSession).not.toHaveBeenCalled();
  });
});
