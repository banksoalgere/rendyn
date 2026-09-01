import { NextResponse } from 'next/server';
import {
  isSameOriginRequest,
  safeAuthorizationId,
  safeOAuthRedirect,
} from '@/lib/auth/inputs';
import { getSubscriptionAccess } from '@/lib/billing/access';
import { createClient } from '@/lib/supabase/server';

const privateHeaders = {
  'Cache-Control': 'private, no-store',
  Expires: '0',
  Pragma: 'no-cache',
};

function retryConsent(request: Request, authorizationId: string) {
  const url = new URL('/oauth/consent', request.url);
  url.searchParams.set('authorization_id', authorizationId);
  url.searchParams.set('error', 'consent');
  return NextResponse.redirect(url, { status: 303, headers: privateHeaders });
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: 'invalid_origin' }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: 'invalid_request' }, { status: 400 });
  }

  const authorizationId = safeAuthorizationId(formData.get('authorization_id'));
  const decision = formData.get('decision');
  if (!authorizationId || (decision !== 'approve' && decision !== 'deny')) {
    return Response.json({ error: 'invalid_request' }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) {
    const login = new URL('/login', request.url);
    login.searchParams.set('error', 'configuration');
    login.searchParams.set(
      'next',
      `/oauth/consent?authorization_id=${encodeURIComponent(authorizationId)}`,
    );
    return NextResponse.redirect(login, { status: 303, headers: privateHeaders });
  }

  try {
    const { data: claimsData } = await supabase.auth.getClaims();
    if (!claimsData?.claims?.sub) {
      const login = new URL('/login', request.url);
      login.searchParams.set(
        'next',
        `/oauth/consent?authorization_id=${encodeURIComponent(authorizationId)}`,
      );
      return NextResponse.redirect(login, { status: 303, headers: privateHeaders });
    }

    if (decision === 'approve') {
      const subscription = await getSubscriptionAccess(supabase);
      if (!subscription.allowed) {
        const pricing = new URL('/pricing', request.url);
        pricing.searchParams.set(
          'next',
          `/oauth/consent?authorization_id=${encodeURIComponent(authorizationId)}`,
        );
        return NextResponse.redirect(pricing, { status: 303, headers: privateHeaders });
      }
    }

    const result = decision === 'approve'
      ? await supabase.auth.oauth.approveAuthorization(authorizationId, { skipBrowserRedirect: true })
      : await supabase.auth.oauth.denyAuthorization(authorizationId, { skipBrowserRedirect: true });

    if (result.error || !result.data?.redirect_url) {
      return retryConsent(request, authorizationId);
    }

    const destination = safeOAuthRedirect(result.data.redirect_url);
    if (!destination) return retryConsent(request, authorizationId);

    return NextResponse.redirect(destination, { status: 303, headers: privateHeaders });
  } catch {
    return retryConsent(request, authorizationId);
  }
}
