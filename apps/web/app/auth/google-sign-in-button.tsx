'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from './auth.module.css';

interface GoogleSignInButtonProps {
  configured: boolean;
  returnTo: string;
}

export function GoogleSignInButton({ configured, returnTo }: GoogleSignInButtonProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();

  async function signIn() {
    const supabase = createClient();
    if (!supabase) {
      setError('Google sign-in is not configured yet.');
      return;
    }

    setError(undefined);
    setPending(true);

    const callback = new URL('/auth/callback', window.location.origin);
    callback.searchParams.set('next', returnTo);

    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: callback.toString() },
      });
      if (signInError) throw signInError;
    } catch {
      setPending(false);
      setError('Google sign-in could not be started. Please try again.');
    }
  }

  return (
    <>
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
      <button
        className={styles.googleButton}
        disabled={!configured || pending}
        onClick={signIn}
        type="button"
      >
        {pending ? 'Opening Google…' : 'Log in with Google'}
      </button>
    </>
  );
}
