import { NextResponse } from 'next/server';
import { isSameOriginRequest } from '@/lib/auth/inputs';
import { getStripe } from '@/lib/billing/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: 'invalid_origin' }, { status: 403 });
  }

  const supabase = await createClient();
  if (!supabase) return Response.json({ error: 'configuration' }, { status: 503 });

  try {
    const { data: claimsData } = await supabase.auth.getClaims();
    if (typeof claimsData?.claims?.sub !== 'string') {
      return Response.json({ error: 'authentication_required' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .select('provider_customer_id')
      .eq('provider', 'stripe')
      .not('provider_customer_id', 'is', null)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(`Subscription lookup failed: ${error.code}`);
    if (!data?.provider_customer_id) {
      return NextResponse.redirect(new URL('/pricing?error=no_subscription', request.url), {
        status: 303,
      });
    }

    const session = await getStripe().billingPortal.sessions.create({
      customer: data.provider_customer_id,
      return_url: `${new URL(request.url).origin}/account`,
    });
    return NextResponse.redirect(session.url, { status: 303 });
  } catch (error) {
    console.error('billing_portal_failed', error instanceof Error ? error.message : 'unknown_error');
    return NextResponse.redirect(new URL('/account?billing=portal_error', request.url), {
      status: 303,
    });
  }
}
