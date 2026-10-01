/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim breaks hydrated navigation on this auth boundary. */
import { BrandMark } from '@/app/components/brand-mark';
import '../globals.css';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { firstQueryValue, safeReturnTo } from '@/lib/auth/inputs';
import { getSupabasePublicConfig } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';
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
    <main className={styles.loginPage}>
      <section className={styles.loginCard} aria-labelledby="login-title">
        <a className={styles.loginBrand} href="/" aria-label="Rendyn home">
          <BrandMark className={styles.loginBrandMark} />
          <span>Rendyn</span>
        </a>

        {errorMessage ? <p className={styles.error} role="alert">{errorMessage}</p> : null}
        {!configured && !errorMessage ? (
          <p className={styles.notice} role="status">
            Sign-in is temporarily unavailable. Please try again later.
          </p>
        ) : null}

        <EmailSignInForm configured={configured} returnTo={returnTo} />
      </section>
    </main>
  );
}
