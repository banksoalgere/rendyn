'use client';

import { useState, type FormEvent } from 'react';
import { safeReturnTo } from '@/lib/auth/inputs';
import { createClient } from '@/lib/supabase/client';
import styles from './auth.module.css';

export function EmailSignInForm({ configured, returnTo }: { configured: boolean; returnTo: string }) {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string>();

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || sent || !event.currentTarget.reportValidity()) return;

    setError(undefined);
    setPending(true);
    try {
      const supabase = createClient();
      if (!supabase) throw new Error('Sign-in unavailable');

      const callback = new URL('/auth/callback', window.location.origin);
      callback.searchParams.set('next', safeReturnTo(returnTo));
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: callback.toString() },
      });
      if (signInError) throw signInError;
      setSent(true);
    } catch {
      setError('We couldn’t send a sign-in link. Please wait a moment and try again.');
    } finally {
      setPending(false);
    }
  }

  if (!expanded) {
    return (
      <button className={styles.emailButton} disabled={!configured} onClick={() => setExpanded(true)} type="button">
        Log in with email
      </button>
    );
  }

  if (sent) {
    return (
      <div className={styles.emailConfirmation} role="status">
        <strong>Check your email</strong>
        <p>We sent a sign-in link to {email.trim()}. Open it in this browser to continue.</p>
      </div>
    );
  }

  return (
    <form className={styles.emailForm} onSubmit={signIn}>
      <label htmlFor="login-email">Email address</label>
      <input
        autoComplete="email"
        autoFocus
        disabled={pending}
        id="login-email"
        maxLength={254}
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        required
        type="email"
        value={email}
      />
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
      <button className={styles.primaryButton} disabled={!configured || pending} type="submit">
        {pending ? 'Sending link…' : 'Send sign-in link'}
      </button>
      <p className={styles.finePrint}>No password needed.</p>
    </form>
  );
}
