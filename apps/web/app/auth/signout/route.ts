import { NextResponse } from 'next/server';
import { isSameOriginRequest, safeReturnTo } from '@/lib/auth/inputs';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: 'invalid_origin' }, { status: 403 });
  }

  let returnTo = '/';
  try {
    const formData = await request.formData();
    const value = formData.get('return_to');
    returnTo = safeReturnTo(typeof value === 'string' ? value : '/', '/');
  } catch {
    return Response.json({ error: 'invalid_request' }, { status: 400 });
  }

  const supabase = await createClient();
  if (supabase) {
    try {
      await supabase.auth.signOut({ scope: 'local' });
    } catch {
      // Redirecting clears the current browser flow even during a provider outage.
    }
  }

  return NextResponse.redirect(new URL(returnTo, request.url), {
    status: 303,
    headers: {
      'Cache-Control': 'private, no-store',
      Expires: '0',
      Pragma: 'no-cache',
    },
  });
}
