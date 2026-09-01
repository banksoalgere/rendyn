export const BILLING_PLAN_CODES = [
  'pro_monthly',
  'pro_yearly',
  'team_monthly',
  'team_yearly',
] as const;

export type BillingPlanCode = (typeof BILLING_PLAN_CODES)[number];

interface BillingPlan {
  code: BillingPlanCode;
  priceId: string;
  team: boolean;
  trialDisclosure: string;
}

export interface BillingConfig {
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  supabaseServiceRoleKey: string;
  plans: Record<BillingPlanCode, BillingPlan>;
}

const ENVIRONMENT_PRICE_KEYS: Record<BillingPlanCode, string> = {
  pro_monthly: 'STRIPE_PRO_MONTHLY_PRICE_ID',
  pro_yearly: 'STRIPE_PRO_YEARLY_PRICE_ID',
  team_monthly: 'STRIPE_TEAM_MONTHLY_PRICE_ID',
  team_yearly: 'STRIPE_TEAM_YEARLY_PRICE_ID',
};

const TRIAL_DISCLOSURES: Record<BillingPlanCode, string> = {
  pro_monthly: 'After your 7-day free trial, Pro renews automatically at $15 per month until cancelled.',
  pro_yearly: 'After your 7-day free trial, Pro renews automatically at $150 per year until cancelled.',
  team_monthly: 'After your 7-day free trial, Team renews automatically at $20 per user per month until cancelled.',
  team_yearly: 'After your 7-day free trial, Team renews automatically at $200 per user per year until cancelled.',
};

function requiredEnvironmentValue(name: string, pattern?: RegExp): string {
  const value = process.env[name]?.trim();
  if (!value || (pattern && !pattern.test(value))) {
    throw new Error(`Missing or invalid billing configuration: ${name}`);
  }
  return value;
}

export function isBillingPlanCode(value: unknown): value is BillingPlanCode {
  return typeof value === 'string'
    && BILLING_PLAN_CODES.includes(value as BillingPlanCode);
}

export function getBillingConfig(): BillingConfig {
  const plans = Object.fromEntries(BILLING_PLAN_CODES.map((code) => {
    const priceId = requiredEnvironmentValue(ENVIRONMENT_PRICE_KEYS[code], /^price_[A-Za-z0-9]+$/);
    return [code, {
      code,
      priceId,
      team: code.startsWith('team_'),
      trialDisclosure: TRIAL_DISCLOSURES[code],
    }];
  })) as Record<BillingPlanCode, BillingPlan>;

  return {
    stripeSecretKey: requiredEnvironmentValue('STRIPE_SECRET_KEY', /^sk_(?:test|live)_[A-Za-z0-9]+$/),
    stripeWebhookSecret: requiredEnvironmentValue('STRIPE_WEBHOOK_SECRET', /^whsec_[A-Za-z0-9]+$/),
    supabaseServiceRoleKey: requiredEnvironmentValue('SUPABASE_SERVICE_ROLE_KEY', /^.{20,}$/),
    plans,
  };
}

export function planCodeForPriceId(priceId: string): BillingPlanCode | null {
  const plans = getBillingConfig().plans;
  return BILLING_PLAN_CODES.find((code) => plans[code].priceId === priceId) ?? null;
}
