import type Stripe from 'stripe';
import { BodyTooLargeError, readBoundedBody } from '../../../../../../packages/catalog/src/bounded-body';
import { planCodeForPriceId, type BillingPlanCode, getBillingConfig } from '@/lib/billing/config';
import { getStripe, getStripeCryptoProvider } from '@/lib/billing/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import type { SubscriptionStatus } from '@/lib/billing/access';

const MAX_WEBHOOK_BYTES = 1_048_576;
const USER_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function stripeStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  if (status === 'incomplete_expired') return 'canceled';
  if (status === 'paused') return 'unpaid';
  if (
    status === 'trialing'
    || status === 'active'
    || status === 'past_due'
    || status === 'canceled'
    || status === 'incomplete'
    || status === 'unpaid'
  ) return status;
  return 'unpaid';
}

function unixTimestamp(value: number | null): string | null {
  return typeof value === 'number' ? new Date(value * 1_000).toISOString() : null;
}

function currentPeriodEnd(subscription: Stripe.Subscription): string | null {
  const timestamps = subscription.items.data
    .map((item) => item.current_period_end)
    .filter((value): value is number => typeof value === 'number');
  return timestamps.length ? unixTimestamp(Math.min(...timestamps)) : null;
}

function customerId(subscription: Stripe.Subscription): string {
  return typeof subscription.customer === 'string'
    ? subscription.customer
    : subscription.customer.id;
}

function subscriptionPlanCode(subscription: Stripe.Subscription): BillingPlanCode | null {
  const metadataPlan = subscription.metadata.rendyn_plan_code;
  if (
    metadataPlan === 'pro_monthly'
    || metadataPlan === 'pro_yearly'
    || metadataPlan === 'team_monthly'
    || metadataPlan === 'team_yearly'
  ) return metadataPlan;

  const priceId = subscription.items.data[0]?.price.id;
  return priceId ? planCodeForPriceId(priceId) : null;
}

async function syncSubscription(subscription: Stripe.Subscription, event: Stripe.Event, leaseToken: string) {
  const userId = subscription.metadata.rendyn_user_id;
  const planCode = subscriptionPlanCode(subscription);
  if (!USER_ID_PATTERN.test(userId) || !planCode) {
    throw new Error('Stripe subscription is missing valid Rendyn metadata');
  }

  const { error } = await createAdminClient().rpc('apply_stripe_event', {
    p_event_id: event.id,
    p_lease_token: leaseToken,
    p_user_id: userId,
    p_provider_customer_id: customerId(subscription),
    p_provider_subscription_id: subscription.id,
    p_plan_code: planCode,
    p_status: stripeStatus(subscription.status),
    p_trial_end: unixTimestamp(subscription.trial_end),
    p_current_period_end: currentPeriodEnd(subscription),
    p_cancel_at_period_end: subscription.cancel_at_period_end,
    p_event_created_at: unixTimestamp(event.created),
  });
  if (error) throw new Error(`Subscription sync failed: ${error.code}`);
}

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  if (!signature || signature.length > 2_048) {
    return Response.json({ error: 'invalid_signature' }, { status: 400 });
  }

  let body: Uint8Array;
  try {
    body = await readBoundedBody(request, MAX_WEBHOOK_BYTES);
  } catch (error) {
    return Response.json({ error: error instanceof BodyTooLargeError ? 'payload_too_large' : 'invalid_body' },
      { status: error instanceof BodyTooLargeError ? 413 : 400 });
  }

  let event: Stripe.Event;
  try {
    event = await getStripe().webhooks.constructEventAsync(
      new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(body),
      signature,
      getBillingConfig().stripeWebhookSecret,
      undefined,
      getStripeCryptoProvider(),
    );
  } catch {
    return Response.json({ error: 'invalid_signature' }, { status: 400 });
  }

  let subscriptionId: string | undefined;
  const leaseToken = crypto.randomUUID();
  let claimed = false;
  try {
    if (
      event.type === 'customer.subscription.created'
      || event.type === 'customer.subscription.updated'
      || event.type === 'customer.subscription.deleted'
    ) {
      subscriptionId = event.data.object.id;
    } else if (event.type === 'checkout.session.completed') {
      subscriptionId = typeof event.data.object.subscription === 'string'
        ? event.data.object.subscription
        : event.data.object.subscription?.id;
    }
    if (subscriptionId) {
      const { data: status, error } = await createAdminClient().rpc('claim_stripe_event', {
        p_event_id: event.id, p_subscription_id: subscriptionId, p_lease_token: leaseToken,
      });
      if (error) throw new Error(`Event claim failed: ${error.code}`);
      if (status === 'processed') return Response.json({ received: true });
      if (status !== 'claimed') return Response.json({ error: 'subscription_busy' }, { status: 503, headers: { 'Retry-After': '5' } });
      claimed = true;
      // Reconcile current provider state under the lease, even for old/same-second events.
      await syncSubscription(await getStripe().subscriptions.retrieve(subscriptionId), event, leaseToken);
    }
  } catch (error) {
    console.error('stripe_webhook_sync_failed', error instanceof Error ? error.message : 'unknown_error');
    return Response.json({ error: 'webhook_sync_failed' }, { status: 500 });
  } finally {
    if (claimed && subscriptionId) {
      const { error } = await createAdminClient().rpc('release_stripe_event', {
        p_subscription_id: subscriptionId, p_lease_token: leaseToken,
      });
      if (error) console.error('stripe_lease_release_failed', error.code);
    }
  }

  return Response.json({ received: true });
}
