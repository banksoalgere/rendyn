import type Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { isSameOriginRequest, safeReturnTo } from '@/lib/auth/inputs';
import { getBillingConfig, isBillingPlanCode } from '@/lib/billing/config';
import { getStripe } from '@/lib/billing/stripe';
import { createClient } from '@/lib/supabase/server';

function pricingRedirect(request: Request, error: string) {
  const url = new URL('/pricing', request.url);
  url.searchParams.set('error', error);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: 'invalid_origin' }, { status: 403 });
  }

  let planCode: FormDataEntryValue | null;
  let returnTo = '/account';
  try {
    const formData = await request.formData();
    planCode = formData.get('plan');
    const returnValue = formData.get('return_to');
    returnTo = safeReturnTo(typeof returnValue === 'string' ? returnValue : null, '/account');
  } catch {
    return Response.json({ error: 'invalid_request' }, { status: 400 });
  }
  if (!isBillingPlanCode(planCode)) {
    return Response.json({ error: 'invalid_plan' }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) return pricingRedirect(request, 'configuration');

  try {
    const { data: claimsData } = await supabase.auth.getClaims();
    const userId = claimsData?.claims?.sub;
    const email = claimsData?.claims?.email;
    if (typeof userId !== 'string') {
      const login = new URL('/login', request.url);
      const pricing = new URL('/pricing', request.url);
      pricing.searchParams.set('next', returnTo);
      login.searchParams.set('next', `${pricing.pathname}${pricing.search}`);
      return NextResponse.redirect(login, { status: 303 });
    }

    const { data: subscriptions, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('provider', 'stripe')
      .order('updated_at', { ascending: false })
      .limit(20);
    if (subscriptionError) throw new Error(`Subscription lookup failed: ${subscriptionError.code}`);

    const existing = subscriptions ?? [];
    if (existing.length > 0) {
      return pricingRedirect(request, 'trial_used');
    }

    const billing = getBillingConfig();
    const selectedPlan = billing.plans[planCode];
    const subscriptionData: Stripe.Checkout.SessionCreateParams.SubscriptionData = {
      metadata: { rendyn_user_id: userId, rendyn_plan_code: planCode },
      trial_period_days: 7,
    };
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price: selectedPlan.priceId,
      quantity: selectedPlan.team ? 2 : 1,
      ...(selectedPlan.team ? {
        adjustable_quantity: { enabled: true, minimum: 2, maximum: 100 },
      } : {}),
    };

    const successUrl = new URL(returnTo, request.url);
    successUrl.searchParams.set('billing', 'success');
    const cancelUrl = new URL('/pricing', request.url);
    cancelUrl.searchParams.set('billing', 'cancelled');
    cancelUrl.searchParams.set('next', returnTo);
    const session = await getStripe().checkout.sessions.create({
      mode: 'subscription',
      client_reference_id: userId,
      // Managed Payments selects the available payment methods and checkout text.
      // Keep payment collection mandatory without overriding those settings.
      payment_method_collection: 'always',
      line_items: [lineItem],
      subscription_data: subscriptionData,
      metadata: { rendyn_user_id: userId, rendyn_plan_code: planCode },
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
      ...(typeof email === 'string' ? { customer_email: email } : {}),
    }, {
      idempotencyKey: `rendyn-trial-checkout:${userId}`,
    });

    if (!session.url) throw new Error('Stripe Checkout did not return a URL');
    return NextResponse.redirect(session.url, { status: 303 });
  } catch (error) {
    console.error('billing_checkout_failed', error instanceof Error ? error.message : 'unknown_error');
    return pricingRedirect(request, 'checkout');
  }
}
