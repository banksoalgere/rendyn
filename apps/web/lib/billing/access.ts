import type { SupabaseClient } from '@supabase/supabase-js';

export const SUBSCRIPTION_STATUSES = [
  'trialing',
  'active',
  'past_due',
  'canceled',
  'incomplete',
  'unpaid',
] as const;

export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export interface SubscriptionAccess {
  allowed: boolean;
  planCode: string | null;
  status: SubscriptionStatus | null;
  trialEnd: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

function isStatus(value: unknown): value is SubscriptionStatus {
  return typeof value === 'string'
    && SUBSCRIPTION_STATUSES.includes(value as SubscriptionStatus);
}

function firstRow(value: unknown): Record<string, unknown> | null {
  const row = Array.isArray(value) ? value[0] : value;
  return row && typeof row === 'object' ? row as Record<string, unknown> : null;
}

function nullableTimestamp(value: unknown): string | null | undefined {
  if (value === null) return null;
  if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) return undefined;
  return value;
}

export async function getSubscriptionAccess(
  supabase: SupabaseClient,
): Promise<SubscriptionAccess> {
  const { data, error } = await supabase.rpc('get_subscription_access');
  if (error) throw new Error(`Subscription access check failed: ${error.code}`);

  const row = firstRow(data);
  const status = isStatus(row?.subscription_status) ? row.subscription_status : null;
  const trialEnd = nullableTimestamp(row?.trial_end);
  const currentPeriodEnd = nullableTimestamp(row?.current_period_end);
  const planCode = typeof row?.plan_code === 'string' ? row.plan_code : null;
  const hasValidActiveBoundary = status === 'active' && currentPeriodEnd !== null;
  const hasValidTrialBoundary = status === 'trialing' && trialEnd !== null;

  if (
    !row
    || typeof row.allowed !== 'boolean'
    || typeof row.cancel_at_period_end !== 'boolean'
    || trialEnd === undefined
    || currentPeriodEnd === undefined
    || (row.allowed && (!planCode || (!hasValidActiveBoundary && !hasValidTrialBoundary)))
  ) {
    throw new Error('Malformed subscription access response');
  }

  return {
    allowed: row.allowed,
    planCode,
    status,
    trialEnd,
    currentPeriodEnd,
    cancelAtPeriodEnd: row.cancel_at_period_end,
  };
}
