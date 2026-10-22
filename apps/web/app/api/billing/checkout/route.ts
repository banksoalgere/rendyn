import { NextResponse } from 'next/server';
import { isSameOriginRequest, safeReturnTo } from '@/lib/auth/inputs';
import { isBillingPlanCode } from '@/lib/billing/config';

// Retain the old form boundary, but never create a new paid checkout.
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
  if (!isBillingPlanCode(formData.get('plan'))) {
    return Response.json({ error: 'invalid_plan' }, { status: 400 });
  }
  const returnValue = formData.get('return_to');
  const returnTo = safeReturnTo(typeof returnValue === 'string' ? returnValue : null, '/mcp');
  return NextResponse.redirect(new URL(returnTo, request.url), {
    status: 303, headers: { 'Cache-Control': 'private, no-store' },
  });
}
