import type { SupabaseClient } from '@supabase/supabase-js';

type EmailAuth = Pick<SupabaseClient['auth'], 'signInWithOtp' | 'verifyOtp'>;
export const EMAIL_CODE_LENGTH = 8;
export const EMAIL_CODE_COOLDOWN = 60;

function validatedEmail(value: string): string {
  const email = value.trim();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Enter a valid email address.');
  }
  return email;
}

export async function requestEmailCode(auth: EmailAuth, value: string): Promise<string> {
  const email = validatedEmail(value);
  const { error } = await auth.signInWithOtp({ email });
  if (error) throw new Error('We couldn’t send a code. Please wait a moment and try again.');
  return email;
}

export async function verifyEmailCode(auth: EmailAuth, value: string, token: string): Promise<void> {
  const email = validatedEmail(value);
  if (!new RegExp(`^\\d{${EMAIL_CODE_LENGTH}}$`).test(token)) throw new Error(`Enter the ${EMAIL_CODE_LENGTH}-digit code from your email.`);
  const { data, error } = await auth.verifyOtp({ email, token, type: 'email' });
  if (error || !data.session) throw new Error('That code is invalid or has expired. Please try again.');
}
