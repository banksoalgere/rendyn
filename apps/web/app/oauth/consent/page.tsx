import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { firstQueryValue, safeAuthorizationId, safeOAuthRedirect } from '@/lib/auth/inputs';
import { getSubscriptionAccess } from '@/lib/billing/access';
import { createClient } from '@/lib/supabase/server';
import styles from '../../auth/auth.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Connect your coding agent | Rendyn',
  description: 'Review a coding agent connection request.',
  robots: { index: false, follow: false },
};

interface ConsentPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const scopeDescriptions: Record<string, string> = {
  openid: 'Confirm your Rendyn identity.',
  email: 'See the email address attached to your account.',
  profile: 'See your basic Rendyn profile.',
};

function clientDestination(value: string): string {
  const url = safeOAuthRedirect(value);
  if (!url) return 'Registered client callback';
  return url.port ? `${url.hostname}:${url.port}` : url.hostname;
}

function ConsentFailure({ message }: { message: string }) {
  return (
    <main className={styles.page}>
      <section className={`${styles.card} ${styles.consentCard}`}>
        <p className={styles.eyebrow}>Connection request</p>
        <h1>We couldn’t open this request.</h1>
        <p className={styles.intro}>{message}</p>
        <Link className={styles.secondaryButton} href="/">Return to Rendyn</Link>
      </section>
    </main>
  );
}

export default async function ConsentPage({ searchParams }: ConsentPageProps) {
  const query = await searchParams;
  const authorizationId = safeAuthorizationId(firstQueryValue(query.authorization_id));
  if (!authorizationId) {
    return <ConsentFailure message="The authorization identifier is missing or invalid." />;
  }

  const consentPath = `/oauth/consent?authorization_id=${encodeURIComponent(authorizationId)}`;
  const supabase = await createClient();
  if (!supabase) {
    return <ConsentFailure message="Supabase authentication has not been configured yet." />;
  }

  let hasAuthenticatedUser = false;
  try {
    const { data: claimsData } = await supabase.auth.getClaims();
    hasAuthenticatedUser = Boolean(claimsData?.claims?.sub);
  } catch {
    return <ConsentFailure message="The authorization service is temporarily unavailable." />;
  }

  if (!hasAuthenticatedUser) {
    redirect(`/login?next=${encodeURIComponent(consentPath)}`);
  }

  let hasSubscriptionAccess = false;
  try {
    hasSubscriptionAccess = (await getSubscriptionAccess(supabase)).allowed;
  } catch {
    return <ConsentFailure message="Subscription status is temporarily unavailable." />;
  }

  if (!hasSubscriptionAccess) {
    return (
      <main className={styles.page}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/" aria-label="Rendyn home">
            <span className={styles.brandMark} aria-hidden="true">R</span>
            <span>Rendyn</span>
          </Link>
          <Link className={styles.backLink} href="/account">Your account</Link>
        </header>
        <section className={`${styles.card} ${styles.consentCard}`}>
          <p className={styles.eyebrow}>Subscription required</p>
          <h1>Start your trial before connecting.</h1>
          <p className={styles.intro}>
            Rendyn MCP is available during a seven-day full-access trial and with a paid subscription. A card is collected now and the first charge is on day 8 unless you cancel before the trial ends.
          </p>
          <Link
            className={styles.primaryButton}
            href={`/pricing?next=${encodeURIComponent(consentPath)}`}
          >
            Start 7-day trial
          </Link>
        </section>
      </main>
    );
  }

  let authorizationResponse;
  try {
    authorizationResponse = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
  } catch {
    return <ConsentFailure message="The authorization service is temporarily unavailable." />;
  }

  const { data, error } = authorizationResponse;
  if (error || !data) {
    return <ConsentFailure message="This connection request is invalid, expired or no longer available." />;
  }

  if ('redirect_url' in data) {
    const destination = safeOAuthRedirect(data.redirect_url);
    if (!destination) {
      return <ConsentFailure message="The registered client callback is not secure." />;
    }
    redirect(destination.toString());
  }

  const scopes = data.scope
    .slice(0, 2_048)
    .split(/\s+/)
    .filter((scope) => /^[a-z][a-z0-9:._-]{0,63}$/i.test(scope))
    .slice(0, 12);
  const clientName = data.client.name.trim().slice(0, 120) || 'An MCP client';
  const decisionError = firstQueryValue(query.error) === 'consent';

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/" aria-label="Rendyn home">
          <span className={styles.brandMark} aria-hidden="true">R</span>
          <span>Rendyn</span>
        </Link>
        <Link className={styles.backLink} href="/account">Your account</Link>
      </header>

      <section className={`${styles.card} ${styles.consentCard}`} aria-labelledby="consent-title">
        <p className={styles.eyebrow}>Coding agent connection</p>
        <h1 id="consent-title">Allow access?</h1>
        <p className={styles.intro}>
          Review what <strong>{clientName}</strong> is asking to use before you continue.
        </p>

        {decisionError ? (
          <p className={styles.error} role="alert">Your choice could not be saved. Please try again.</p>
        ) : null}

        <div className={styles.clientSummary}>
          <span>Requesting client</span>
          <strong>{clientName}</strong>
          <small>Returns to {clientDestination(data.redirect_uri)}</small>
        </div>

        <ul className={styles.scopeList} aria-label="Requested permissions">
          {(scopes.length ? scopes : ['openid']).map((scope) => (
            <li key={scope}>
              <strong>{scope}</strong>
              <small>{scopeDescriptions[scope] ?? `Use the ${scope} permission.`}</small>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <form action="/oauth/consent/decision" method="post">
            <input name="authorization_id" type="hidden" value={authorizationId} />
            <input name="decision" type="hidden" value="deny" />
            <button className={styles.secondaryButton} type="submit">Deny</button>
          </form>
          <form action="/oauth/consent/decision" method="post">
            <input name="authorization_id" type="hidden" value={authorizationId} />
            <input name="decision" type="hidden" value="approve" />
            <button className={styles.primaryButton} type="submit">Allow access</button>
          </form>
        </div>

        <p className={styles.securityNote}>
          Only approve requests you started. Rendyn sends the resulting access token to the registered client, never your Google password.
        </p>
      </section>
    </main>
  );
}
