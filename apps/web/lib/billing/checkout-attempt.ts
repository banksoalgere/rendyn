import type Stripe from 'stripe';
import { createAdminClient } from '../supabase/admin';
import { getStripe } from './stripe';

export class TrialAlreadyUsed extends Error {}

interface Attempt {
  status: 'claimed' | 'busy' | 'trial_used';
  attemptId: string | null;
  parameters: Stripe.Checkout.SessionCreateParams | null;
  sessionId: string | null;
}

// JSONB reorders object keys. Compare canonical parameters, including nested metadata.
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    return `{${Object.entries(value).sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => `${JSON.stringify(key)}:${canonical(item)}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export async function checkoutSession(userId: string, parameters: Stripe.Checkout.SessionCreateParams) {
  const admin = createAdminClient();
  const stripe = getStripe();
  const token = crypto.randomUUID();
  const lease = { p_user_id: userId, p_lease_token: token };
  const { data, error } = await admin.rpc('claim_checkout_attempt', lease);
  if (error) throw new Error(`Checkout claim failed: ${error.code}`);
  const attempt = data as Attempt;
  if (attempt?.status === 'trial_used') throw new TrialAlreadyUsed();
  if (attempt?.status !== 'claimed') throw new Error('Checkout is already being prepared; retry shortly');

  async function save(id: string, params: Stripe.Checkout.SessionCreateParams, sessionId: string | null) {
    const { error } = await admin.rpc('save_checkout_attempt', {
      ...lease, p_attempt_id: id, p_parameters: params, p_session_id: sessionId,
    });
    if (error) throw new Error(`Checkout save failed: ${error.code}`);
  }

  try {
    if (attempt.attemptId && attempt.parameters) {
      // Replay an uncertain creation with exactly the persisted request/key. Never
      // create a replacement until the previous session is known to be expired.
      if (!attempt.sessionId && (attempt.parameters.expires_at ?? 0) <= Date.now() / 1000) {
        throw new Error('Unresolved checkout requires reconciliation');
      }
      const previous = attempt.sessionId
        ? await stripe.checkout.sessions.retrieve(attempt.sessionId)
        : await stripe.checkout.sessions.create(attempt.parameters, { idempotencyKey: `rendyn-checkout:${attempt.attemptId}` });
      await save(attempt.attemptId, attempt.parameters, previous.id);
      if (previous.status === 'complete') throw new TrialAlreadyUsed();
      const priorParameters = { ...attempt.parameters };
      delete priorParameters.expires_at;
      if (previous.status === 'open') {
        if (canonical(priorParameters) === canonical(parameters) && previous.expires_at > Date.now() / 1000) return previous;
        // If checkout completes concurrently, Stripe refuses expiration. Fail closed.
        await stripe.checkout.sessions.expire(previous.id);
      } else if (previous.status !== 'expired') {
        throw new Error('Unexpected checkout state');
      }
    }
    const id = crypto.randomUUID();
    const params = { ...parameters, expires_at: Math.floor(Date.now() / 1000) + 3600 };
    await save(id, params, null);
    const session = await stripe.checkout.sessions.create(params, { idempotencyKey: `rendyn-checkout:${id}` });
    await save(id, params, session.id);
    return session;
  } finally {
    const { error } = await admin.rpc('release_checkout_attempt', lease);
    if (error) console.error('checkout_lease_release_failed', error.code);
  }
}
