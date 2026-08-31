import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SignOutForm } from '../auth/sign-out-form';
import styles from '../auth/auth.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Your account | DesignMCP',
  description: 'Your DesignMCP account.',
};

export default async function AccountPage() {
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

  const email = typeof claims.email === 'string' ? claims.email : 'Google account';

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/" aria-label="DesignMCP home">
          <span className={styles.brandMark} aria-hidden="true">D</span>
          <span>DesignMCP</span>
        </Link>
        <Link className={styles.backLink} href="/">Back to home</Link>
      </header>

      <section className={styles.card} aria-labelledby="account-title">
        <p className={styles.eyebrow}>Account</p>
        <h1 id="account-title">You’re signed in.</h1>
        <p className={styles.intro}>
          Your website access and MCP component unlocks now use the same DesignMCP identity.
        </p>
        <div className={styles.accountSummary}>
          <span>Google account</span>
          <strong>{email}</strong>
        </div>
        <div className={styles.accountActions}>
          <Link className={styles.secondaryButton} href="/">Browse DesignMCP</Link>
          <SignOutForm />
        </div>
      </section>
    </main>
  );
}
