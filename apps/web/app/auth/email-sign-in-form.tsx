'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { safeReturnTo } from '@/lib/auth/inputs';
import { EMAIL_CODE_COOLDOWN, EMAIL_CODE_LENGTH, requestEmailCode, verifyEmailCode } from '@/lib/auth/email-code';
import { EASE_OUT } from '@/lib/ease';
import { createClient } from '@/lib/supabase/client';
import { GoogleSignInButton } from './google-sign-in-button';
import styles from './auth.module.css';

// Input focus and code slots follow the catalogue's beUI Input / OTP Input.
// Keep native editing, paste and one-time-code autofill on one real input.
export function EmailSignInForm({ configured, returnTo, title = 'Log in to Rendyn' }: { configured: boolean; returnTo: string; title?: string }) {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [sentTo, setSentTo] = useState<string>();
  const [code, setCode] = useState('');
  const [pending, setPending] = useState(false);
  const busy = useRef(false);
  const [error, setError] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [retryAt, setRetryAt] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!retryAt) return;
    const update = () => setRemaining(Math.max(0, Math.ceil((retryAt - Date.now()) / 1000)));
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [retryAt]);

  async function sendCode(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (busy.current || Date.now() < retryAt) return;
    busy.current = true;
    setPending(true);
    setError(undefined);
    setNotice(undefined);
    try {
      const supabase = createClient();
      if (!supabase) throw new Error('Sign-in is temporarily unavailable.');
      const recipient = await requestEmailCode(supabase.auth, sentTo ?? email);
      setNotice(sentTo ? 'A new code has been sent.' : undefined);
      setSentTo(recipient);
      setCode('');
      setRemaining(EMAIL_CODE_COOLDOWN);
      setRetryAt(Date.now() + EMAIL_CODE_COOLDOWN * 1000);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'We couldn’t send a code. Please try again.');
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !sentTo) return;
    busy.current = true;
    setPending(true);
    setError(undefined);
    setNotice(undefined);
    try {
      const supabase = createClient();
      if (!supabase) throw new Error('Sign-in is temporarily unavailable.');
      await verifyEmailCode(supabase.auth, sentTo, code);
      window.location.assign(safeReturnTo(returnTo));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'We couldn’t verify the code. Please try again.');
      busy.current = false;
      setPending(false);
    }
  }

  const transition = { duration: reduce ? 0 : 0.3, ease: EASE_OUT };

  return (
    <AnimatePresence initial={false} mode="wait">
      {sentTo ? (
        <motion.div key="code" initial={{ opacity: 0, y: reduce ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={transition}>
          <button className={styles.changeEmail} disabled={pending} onClick={() => { setSentTo(undefined); setError(undefined); setNotice(undefined); setExpanded(true); }} type="button">← Change email</button>
          <div className={styles.inboxMark} aria-hidden="true"><MailIcon /></div>
          <h1 id="login-title">Check your inbox</h1>
          <p className={styles.codeIntro}>Enter the code sent to <strong>{sentTo}</strong></p>
          <form className={styles.emailForm} onSubmit={verifyCode}>
            <label htmlFor="login-code">Authentication code</label>
            <div className={styles.codeField}>
              <input className={styles.codeInput} aria-describedby={error ? 'login-code-error' : undefined} aria-invalid={Boolean(error)} autoComplete="one-time-code" autoFocus disabled={pending} id="login-code" inputMode="numeric" maxLength={EMAIL_CODE_LENGTH} onChange={(event) => { setCode(event.target.value.replace(/\D/g, '').slice(0, EMAIL_CODE_LENGTH)); setError(undefined); }} pattern={`[0-9]{${EMAIL_CODE_LENGTH}}`} required type="text" value={code} />
              <div className={styles.codeSlots} aria-hidden="true">
                {Array.from({ length: EMAIL_CODE_LENGTH }, (_, index) => <span key={index} data-filled={Boolean(code[index])}>{code[index] || '·'}</span>)}
              </div>
            </div>
            {error ? <p className={styles.error} id="login-code-error" role="alert">{error}</p> : null}
            <button className={styles.primaryButton} disabled={pending || code.length !== EMAIL_CODE_LENGTH} type="submit">{pending ? 'Please wait…' : 'Log in'}<ArrowIcon /></button>
          </form>
          <p className={styles.resendRow}><button disabled={pending || remaining > 0} onClick={() => sendCode()} type="button">{remaining > 0 ? `Resend code in ${remaining}s` : 'Resend code'}</button></p>
          {notice ? <p className={styles.finePrint} role="status">{notice}</p> : null}
        </motion.div>
      ) : (
        <motion.div key="email" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}>
          <h1 id="login-title">{title}</h1>
          <GoogleSignInButton configured={configured} returnTo={returnTo} />
          <div className={styles.loginDivider}>or</div>
          <button aria-controls="email-login-fields" aria-expanded={expanded} className={styles.emailButton} disabled={!configured || pending} onClick={() => setExpanded(!expanded)} type="button"><MailIcon />Log in with email</button>
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div id="email-login-fields" key="fields" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={transition} className={styles.emailReveal}>
                <form className={styles.emailForm} onSubmit={sendCode}>
                  <label htmlFor="login-email">Email address</label>
                  <input autoComplete="email" autoFocus disabled={pending} id="login-email" maxLength={254} name="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required type="email" value={email} />
                  {error ? <p className={styles.error} role="alert">{error}</p> : null}
                  <button className={styles.primaryButton} disabled={!configured || pending || remaining > 0} type="submit">{pending ? 'Sending code…' : remaining > 0 ? `Send again in ${remaining}s` : 'Send me a code'}<ArrowIcon /></button>
                </form>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MailIcon() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>;
}

function ArrowIcon() {
  return <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>;
}
