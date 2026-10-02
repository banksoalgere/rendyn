import { redirect } from 'next/navigation';
import { createClient } from '../../../lib/supabase/server';
import { getSubscriptionAccess, type SubscriptionAccess } from '../../../lib/billing/access';
import { isFreeAccessActive, FREE_ACCESS_END_LABEL } from '../../../../../packages/catalog/src/free-access';
import { SignOutForm } from '../../auth/sign-out-form';
import styles from '../workspace.module.css';

export default async function WorkspaceAccountPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const supabase = await createClient();
  if (!supabase) redirect('/login?next=%2Fapp%2Faccount');
  const result = await supabase.auth.getUser().catch(() => null);
  if (!result || result.error || !result.data.user) redirect('/login?next=%2Fapp%2Faccount');
  let subscription: SubscriptionAccess | null = null;
  try { subscription = await getSubscriptionAccess(supabase); } catch { /* Keep account controls usable during billing outages. */ }
  const freeAccess = isFreeAccessActive();
  const query = await searchParams;
  const billingState = typeof query.billing === 'string' ? query.billing : '';
  return <>
    <div className={styles.pageHeading}><div><p className={styles.eyebrow}>Your account</p><h1>Make yourself at home.</h1><p>One account for the website and your coding agents.</p></div></div>
    {billingState === 'success' && <p className={styles.notice} role="status">Checkout completed. Your subscription will appear once the payment update is confirmed.</p>}
    {billingState === 'portal_error' && <p className={styles.notice} role="alert">The billing portal could not be opened. Please try again.</p>}
    <section className={styles.accountPanel}><h2>Account details</h2><dl><div><dt>Email</dt><dd>{result.data.user.email}</dd></div><div><dt>Access</dt><dd>{freeAccess ? `All access, free until ${FREE_ACCESS_END_LABEL}` : subscription?.allowed ? 'Subscription active' : 'Component source included with login'}</dd></div><div><dt>Saved items</dt><dd>Saved in this browser, separately for your account.</dd></div></dl><SignOutForm returnTo="/login" /></section>
    <section className={styles.accountPanel}><h2>Billing</h2><p>{freeAccess ? 'No card or subscription is needed for the free-access period. Existing subscriptions keep their current billing schedule; you can manage or cancel yours below.' : 'Manage your existing subscription or explore the available plans.'}</p>
      {subscription?.status || !subscription ? <form action="/api/billing/portal" method="post"><button className={styles.secondaryButton} type="submit">Manage billing</button></form> : freeAccess ? <p>You have no subscription. You can start using Rendyn now.</p> : <a className={styles.primaryButton} href="/pricing">View plans</a>}
    </section>
  </>;
}
