import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getBillingConfig,
  isBillingPlanCode,
  planCodeForPriceId,
} from './config.js';

function configureBilling() {
  vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_abcdefghijklmnopqrstuvwxyz');
  vi.stubEnv('STRIPE_WEBHOOK_SECRET', 'whsec_abcdefghijklmnopqrstuvwxyz');
  vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'server-only-service-role-key-value');
  vi.stubEnv('STRIPE_PRO_MONTHLY_PRICE_ID', 'price_ProMonthly123');
  vi.stubEnv('STRIPE_PRO_YEARLY_PRICE_ID', 'price_ProYearly123');
  vi.stubEnv('STRIPE_TEAM_MONTHLY_PRICE_ID', 'price_TeamMonthly123');
  vi.stubEnv('STRIPE_TEAM_YEARLY_PRICE_ID', 'price_TeamYearly123');
}

afterEach(() => vi.unstubAllEnvs());

describe('billing configuration', () => {
  it('accepts only the four server-mapped plans', () => {
    expect(isBillingPlanCode('pro_monthly')).toBe(true);
    expect(isBillingPlanCode('team_yearly')).toBe(true);
    expect(isBillingPlanCode('enterprise')).toBe(false);
    expect(isBillingPlanCode('price_attacker')).toBe(false);
  });

  it('maps fixed Stripe prices without accepting a browser-supplied price ID', () => {
    configureBilling();
    expect(getBillingConfig().plans.team_monthly).toMatchObject({
      priceId: 'price_TeamMonthly123',
      team: true,
    });
    expect(planCodeForPriceId('price_ProYearly123')).toBe('pro_yearly');
    expect(planCodeForPriceId('price_unknown')).toBeNull();
  });

  it('fails closed when a billing secret or price is malformed', () => {
    configureBilling();
    vi.stubEnv('STRIPE_PRO_MONTHLY_PRICE_ID', 'https://attacker.example/price');
    expect(() => getBillingConfig()).toThrow('STRIPE_PRO_MONTHLY_PRICE_ID');
  });
});
