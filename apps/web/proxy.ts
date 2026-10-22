import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    '/login/:path*',
    '/account/:path*',
    '/app/:path*',
    '/auth/:path*',
    '/oauth/:path*',
  ],
};
