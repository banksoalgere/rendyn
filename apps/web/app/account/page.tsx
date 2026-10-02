import { redirect } from 'next/navigation';
import { firstQueryValue } from '../../lib/auth/inputs';

export const dynamic = 'force-dynamic';

export default async function AccountPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const billing = firstQueryValue(query.billing);
  const parameters = new URLSearchParams();
  if (billing && ['success', 'portal_error'].includes(billing)) parameters.set('billing', billing);
  redirect(`/app/account${parameters.size ? `?${parameters}` : ''}`);
}
