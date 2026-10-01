import { beforeEach, describe, expect, it, vi } from 'vitest';
const { rpc, retrieve, verify } = vi.hoisted(() => ({ rpc: vi.fn(), retrieve: vi.fn(), verify: vi.fn() }));
vi.mock('@/lib/billing/config', () => ({ getBillingConfig: () => ({ stripeWebhookSecret: 'test' }), planCodeForPriceId: () => 'pro_monthly' }));
vi.mock('@/lib/billing/stripe', () => ({ getStripe: () => ({ webhooks: { constructEventAsync: verify }, subscriptions: { retrieve } }), getStripeCryptoProvider: () => ({}) }));
vi.mock('@/lib/supabase/admin', () => ({ createAdminClient: () => ({ rpc }) }));
import { POST } from './route';
const subscription = { id: 'sub_test', customer: 'cus_test', status: 'active',
  metadata: { rendyn_user_id: '11111111-1111-4111-8111-111111111111', rendyn_plan_code: 'pro_monthly' },
  trial_end: null, items: { data: [{ current_period_end: 2_000_000_000 }] }, cancel_at_period_end: false };
const request = (body = '{}') => new Request('https://rendyn.dev/api/billing/webhook', { method: 'POST', headers: { 'stripe-signature': 'test' }, body });
beforeEach(() => {
  vi.resetAllMocks();
  verify.mockResolvedValue({ id: 'evt_test', created: 1_800_000_000, type: 'customer.subscription.updated', data: { object: { ...subscription, status: 'trialing' } } });
  retrieve.mockResolvedValue(subscription);
  rpc.mockImplementation(async name => ({ data: name === 'claim_stripe_event' ? 'claimed' : null, error: null }));
});
describe('verified Stripe reconciliation', () => {
  it('claims the lease before retrieving fresh state and commits the event ID atomically', async () => {
    expect((await POST(request())).status).toBe(200);
    expect(rpc.mock.invocationCallOrder[0]).toBeLessThan(retrieve.mock.invocationCallOrder[0]);
    expect(rpc).toHaveBeenCalledWith('apply_stripe_event', expect.objectContaining({ p_event_id: 'evt_test', p_status: 'active' }));
  });
  it('acknowledges a duplicate without fetching or applying another snapshot', async () => {
    rpc.mockResolvedValueOnce({ data: 'processed', error: null });
    expect((await POST(request())).status).toBe(200); expect(retrieve).not.toHaveBeenCalled(); expect(rpc).toHaveBeenCalledOnce();
  });
  it('returns a retryable status when another handler owns the subscription', async () => {
    rpc.mockResolvedValueOnce({ data: 'busy', error: null });
    expect((await POST(request())).status).toBe(503); expect(retrieve).not.toHaveBeenCalled();
  });
  it('does not process unverified or oversized payloads', async () => {
    verify.mockRejectedValueOnce(new Error('Invalid signature'));
    expect((await POST(request())).status).toBe(400); expect(rpc).not.toHaveBeenCalled();
    expect((await POST(request('x'.repeat(1_048_577)))).status).toBe(413); expect(verify).toHaveBeenCalledOnce();
  });
  it('releases the lease and returns failure if provider retrieval fails', async () => {
    retrieve.mockRejectedValueOnce(new Error('Provider unavailable'));
    expect((await POST(request())).status).toBe(500);
    expect(rpc).toHaveBeenLastCalledWith('release_stripe_event', expect.objectContaining({ p_subscription_id: 'sub_test' }));
    expect(rpc.mock.calls.some(([name]) => name === 'apply_stripe_event')).toBe(false);
  });
});
