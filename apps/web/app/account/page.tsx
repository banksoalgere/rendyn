/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim breaks hydrated navigation on this auth boundary. */
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSubscriptionAccess, type SubscriptionAccess } from '@/lib/billing/access';
import { createClient } from '@/lib/supabase/server';
import { SignOutForm } from '../auth/sign-out-form';
import styles from '../auth/auth.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Your account | Rendyn',
  description: 'Your Rendyn account.',
  robots: { index: false, follow: false },
};

interface AccountPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function dateLabel(value: string | null): string {
  if (!value) return 'Not available';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/London',
  }).format(new Date(value));
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const supabase = await createClient();
  if (!supabase) redirect('/login?error=configuration&next=%2Faccount');

  let claims: Record<string, unknown> | undefined;
  try {
    const response = await supabase.auth.getClaims();
    claims = response.data?.claims;
  } catch {
    redirect('/login?next=%2Faccount');
  }

  if (!claims?.sub) redirect('/login?next=%2Faccount');

  const email = typeof claims.email === 'string' ? claims.email : 'Your account';
  let subscription: SubscriptionAccess | null = null;
  try {
    subscription = await getSubscriptionAccess(supabase);
  } catch {
    // The account remains usable while billing status is temporarily unavailable.
  }
  const query = await searchParams;
  const billingState = Array.isArray(query.billing) ? query.billing[0] : query.billing;
  const accessEndsAt = subscription?.status === 'trialing'
    ? subscription.trialEnd
    : subscription?.currentPeriodEnd ?? null;

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="/" aria-label="Rendyn home">
          <span className={styles.brandMark} aria-hidden="true">R</span>
          <span>Rendyn</span>
        </a>
        <a className={styles.backLink} href="/">Back to home</a>
      </header>

      <section className={styles.card} aria-labelledby="account-title">
        <p className={styles.eyebrow}>Account</p>
        <h1 id="account-title">Your Rendyn account.</h1>
        <p className={styles.intro}>
          Your website and MCP access use this same Rendyn identity.
        </p>
        {billingState === 'success' ? (
          <p className={styles.notice} role="status">
            Checkout completed. Your seven-day trial will appear here as soon as the signed payment update is confirmed.
          </p>
        ) : null}
        {billingState === 'portal_error' ? (
          <p className={styles.error} role="alert">The billing portal could not be opened. Please try again.</p>
        ) : null}
        <div className={styles.accountSummary}>
          <span>Email</span>
          <strong>{email}</strong>
        </div>
        <div className={styles.accountSummary}>
          <span>Rendyn access</span>
          <strong>
            {subscription?.allowed
              ? subscription.status === 'trialing' ? '7-day trial active' : 'Paid access active'
              : subscription ? 'Subscription required' : 'Status temporarily unavailable'}
          </strong>
          {subscription?.planCode ? <small>Plan: {subscription.planCode.replaceAll('_', ' ')}</small> : null}
          {subscription?.allowed ? (
            <small>
              {subscription.cancelAtPeriodEnd ? 'Access ends' : subscription.status === 'trialing' ? 'First charge' : 'Renews'}: {dateLabel(accessEndsAt)}
            </small>
          ) : null}
        </div>
        <div className={styles.accountActions}>
          {subscription?.status ? (
            <form action="/api/billing/portal" method="post">
              <button className={styles.secondaryButton} type="submit">Manage billing</button>
            </form>
          ) : (
            <a className={styles.primaryButton} href="/pricing">Start 7-day trial</a>
          )}
          <a className={styles.secondaryButton} href="/">Browse Rendyn</a>
          <SignOutForm returnTo="/login" />
        </div>
      </section>
    </main>
  );
}
