import { beforeEach, describe, expect, it, vi } from 'vitest';
import type Stripe from 'stripe';
const { rpc, create, retrieve, expire } = vi.hoisted(() => ({ rpc: vi.fn(), create: vi.fn(), retrieve: vi.fn(), expire: vi.fn() }));
vi.mock('../supabase/admin', () => ({ createAdminClient: () => ({ rpc }) }));
vi.mock('./stripe', () => ({ getStripe: () => ({ checkout: { sessions: { create, retrieve, expire } } }) }));
import { checkoutSession, TrialAlreadyUsed } from './checkout-attempt';

const params: Stripe.Checkout.SessionCreateParams = { mode: 'subscription', line_items: [{ price: 'price_monthly', quantity: 1 }], success_url: 'https://rendyn.dev/account', metadata: { plan: 'monthly' } };
const open = () => ({ id: 'cs_old', status: 'open', expires_at: Math.floor(Date.now() / 1000) + 3600, url: 'https://checkout.stripe.com/old' });
let attempt: Record<string, unknown>;
beforeEach(() => {
  vi.resetAllMocks();
  attempt = { status: 'claimed', attemptId: null, parameters: null, sessionId: null };
  rpc.mockImplementation(async (name, args) => {
    if (name === 'claim_checkout_attempt') return { data: { ...attempt }, error: null };
    if (name === 'save_checkout_attempt') attempt = { ...attempt, attemptId: args.p_attempt_id, parameters: args.p_parameters, sessionId: args.p_session_id };
    return { data: null, error: null };
  });
  create.mockResolvedValue({ ...open(), id: 'cs_new' }); retrieve.mockResolvedValue(open()); expire.mockResolvedValue({ status: 'expired' });
});
function prior(sessionId: string | null = 'cs_old') {
  attempt = { status: 'claimed', attemptId: 'old-attempt', sessionId, parameters: { ...params, expires_at: open().expires_at } };
}
describe('checkout attempt recovery', () => {
  it('persists creation inputs first and reuses an open session on repeat clicks', async () => {
    await checkoutSession('user', params);
    expect(rpc.mock.invocationCallOrder[1]).toBeLessThan(create.mock.invocationCallOrder[0]);
    await checkoutSession('user', params);
    expect(create).toHaveBeenCalledOnce();
    expect(expire).not.toHaveBeenCalled();
  });
  it.each([{ ...params, line_items: [{ price: 'price_annual', quantity: 1 }] }, { ...params, success_url: 'https://rendyn.dev/components/button' }])('expires the previous session before creating changed inputs', async updated => {
    prior(); await checkoutSession('user', updated);
    expect(expire).toHaveBeenCalledWith('cs_old');
    expect(expire.mock.invocationCallOrder[0]).toBeLessThan(create.mock.invocationCallOrder[0]);
    expect(create.mock.calls[0][1].idempotencyKey).not.toContain('old-attempt');
  });
  it('uses the saved parameters and key to recover an uncertain request', async () => {
    prior(null); const saved = attempt.parameters;
    await checkoutSession('user', params);
    expect(create).toHaveBeenCalledExactlyOnceWith(saved, { idempotencyKey: 'rendyn-checkout:old-attempt' });
  });
  it('creates a fresh attempt after confirmed expiry', async () => {
    prior(); retrieve.mockResolvedValue({ ...open(), status: 'expired' });
    await checkoutSession('user', params); expect(create).toHaveBeenCalledOnce(); expect(expire).not.toHaveBeenCalled();
  });
  it('does not replace a completed trial or a session that completes during expiration', async () => {
    prior(); retrieve.mockResolvedValueOnce({ ...open(), status: 'complete' });
    await expect(checkoutSession('user', params)).rejects.toBeInstanceOf(TrialAlreadyUsed);
    expire.mockRejectedValueOnce(new Error('Already complete'));
    await expect(checkoutSession('user', { ...params, success_url: 'https://rendyn.dev/new' })).rejects.toThrow('Already complete');
    expect(create).not.toHaveBeenCalled();
  });
  it('fails closed for busy, expired-unresolved and lost-lease attempts', async () => {
    attempt.status = 'busy'; await expect(checkoutSession('user', params)).rejects.toThrow('already');
    prior(null); attempt.parameters = { ...params, expires_at: 1 };
    await expect(checkoutSession('user', params)).rejects.toThrow('reconciliation');
    prior(); rpc.mockImplementation(async name => name === 'claim_checkout_attempt'
      ? { data: attempt, error: null } : { error: { code: 'lease_lost' } });
    await expect(checkoutSession('user', params)).rejects.toThrow('lease_lost');
    expect(create).not.toHaveBeenCalled();
  });
});
