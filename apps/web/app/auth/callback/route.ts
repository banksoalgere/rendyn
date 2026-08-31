import { NextResponse } from 'next/server';
import { safeReturnTo } from '@/lib/auth/inputs';
import { createClient } from '@/lib/supabase/server';

const privateHeaders = {
  'Cache-Control': 'private, no-store',
  Expires: '0',
  Pragma: 'no-cache',
};

function loginError(request: Request, error: 'callback' | 'configuration') {
  const url = new URL('/login', request.url);
  url.searchParams.set('error', error);
  return NextResponse.redirect(url, { status: 303, headers: privateHeaders });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const returnTo = safeReturnTo(url.searchParams.get('next'));

  if (!code || code.length > 2_048) return loginError(request, 'callback');

  const supabase = await createClient();
  if (!supabase) return loginError(request, 'configuration');

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return loginError(request, 'callback');

    return NextResponse.redirect(new URL(returnTo, request.url), {
      status: 303,
      headers: privateHeaders,
    });
  } catch {
    return loginError(request, 'callback');
  }
}
