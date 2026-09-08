import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { firstQueryValue, safeReturnTo } from '@/lib/auth/inputs';
import { getSupabasePublicConfig } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';
import { GoogleSignInButton } from '../auth/google-sign-in-button';
import { EmailSignInForm } from '../auth/email-sign-in-form';
import styles from '../auth/auth.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sign in | Rendyn',
  description: 'Log in to Rendyn with Google or email.',
  robots: { index: false, follow: false },
};

const errorMessages: Record<string, string> = {
  callback: 'Sign-in could not be completed. Please try again.',
  configuration: 'Sign-in is temporarily unavailable. Please try again later.',
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

      <section className={`${styles.card} ${styles.loginCard}`} aria-labelledby="login-title">
        <h1 id="login-title">Log in to Rendyn</h1>

        {errorMessage ? <p className={styles.error} role="alert">{errorMessage}</p> : null}
        {!configured ? (
          <p className={styles.notice} role="status">
            Sign-in is temporarily unavailable. Please try again later.
          </p>
        ) : null}

        <div className={styles.loginOptions}>
          <GoogleSignInButton configured={configured} returnTo={returnTo} />
          <EmailSignInForm configured={configured} returnTo={returnTo} />
        </div>
      </section>
    </main>
  );
}
