import type { SupabaseClient } from '@supabase/supabase-js';
import { describe, expect, it, vi } from 'vitest';
import { getSubscriptionAccess } from './access.js';

function clientResult(data: unknown, error: unknown = null): SupabaseClient {
  return {
    rpc: vi.fn().mockResolvedValue({ data, error }),
  } as unknown as SupabaseClient;
}

describe('subscription access response validation', () => {
  it('accepts a bounded trialing response from the paid-access RPC', async () => {
    const access = await getSubscriptionAccess(clientResult([{
      allowed: true,
      plan_code: 'pro_monthly',
      subscription_status: 'trialing',
      trial_end: '2026-09-08T12:00:00.000Z',
      current_period_end: '2026-09-08T12:00:00.000Z',
      cancel_at_period_end: false,
    }]));

    expect(access).toMatchObject({
      allowed: true,
      planCode: 'pro_monthly',
      status: 'trialing',
    });
  });

  it('keeps expired and unpaid responses denied', async () => {
    const access = await getSubscriptionAccess(clientResult([{
      allowed: false,
      plan_code: 'pro_monthly',
      subscription_status: 'past_due',
      trial_end: null,
      current_period_end: '2026-09-01T00:00:00.000Z',
      cancel_at_period_end: false,
    }]));
    expect(access.allowed).toBe(false);
    expect(access.status).toBe('past_due');
  });

  it('rejects malformed or failed database responses', async () => {
    await expect(getSubscriptionAccess(clientResult([{ allowed: 'yes' }]))).rejects.toThrow(
      'Malformed subscription access response',
    );
    await expect(getSubscriptionAccess(clientResult(null, { code: '42501' }))).rejects.toThrow(
      '42501',
    );
  });
});
