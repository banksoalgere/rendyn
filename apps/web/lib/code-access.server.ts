import type { CodeAccess } from './code-access';
import { createClient } from './supabase/server';

export const codeAccessHeaders = { 'Cache-Control': 'private, no-store', Vary: 'Cookie' };

export async function getCodeAccess(): Promise<CodeAccess> {
  const supabase = await createClient();
  if (!supabase) throw new Error('Authentication is not configured');
  const { data, error } = await supabase.auth.getUser();
  if (error && error.name !== 'AuthSessionMissingError') throw new Error('Authentication unavailable');
  return { signedIn: !error && Boolean(data.user) };
}
