import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { firstQueryValue, safeReturnTo } from '@/lib/auth/inputs';
import { getSupabasePublicConfig } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';
import { GoogleSignInButton } from '../auth/google-sign-in-button';
import styles from '../auth/auth.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sign in | Rendyn',
  description: 'Sign in to Rendyn with Google.',
  robots: { index: false, follow: false },
};

const errorMessages: Record<string, string> = {
  callback: 'Google sign-in could not be completed. Please try again.',
  configuration: 'Google sign-in is not configured yet.',
  consent: 'Your connection request could not be completed. Please try again.',
};

interface LoginPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const query = await searchParams;
  const returnTo = safeReturnTo(firstQueryValue(query.next));
  const configured = Boolean(getSupabasePublicConfig());
  const supabase = await createClient();
  let signedIn = false;

  if (supabase) {
    try {
      const { data } = await supabase.auth.getClaims();
      signedIn = Boolean(data?.claims?.sub);
    } catch {
      // The sign-in page remains available while Supabase is temporarily unavailable.
    }
  }

  if (signedIn) redirect(returnTo);

  const errorCode = firstQueryValue(query.error);
  const errorMessage = errorCode ? errorMessages[errorCode] : undefined;

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/" aria-label="Rendyn home">
          <span className={styles.brandMark} aria-hidden="true">R</span>
          <span>Rendyn</span>
        </Link>
        <Link className={styles.backLink} href="/">Back to home</Link>
      </header>

      <section className={styles.card} aria-labelledby="login-title">
        <p className={styles.eyebrow}>Your Rendyn account</p>
        <h1 id="login-title">Welcome in.</h1>
        <p className={styles.intro}>
          Sign in to use one Rendyn identity for your subscription, the website and your coding agent.
        </p>

        {errorMessage ? <p className={styles.error} role="alert">{errorMessage}</p> : null}
        {!configured ? (
          <p className={styles.notice} role="status">
            Google sign-in will become available when the Supabase project settings are added.
          </p>
        ) : null}

        <GoogleSignInButton configured={configured} returnTo={returnTo} />
        <p className={styles.finePrint}>
          We request your basic profile and email. Your Google password is never shared with Rendyn.
        </p>
      </section>
    </main>
  );
}
