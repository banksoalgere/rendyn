import { getSupabasePublicConfig } from '../apps/web/lib/supabase/config';

export function verifyWebReleaseConfig(env: Record<string, string | undefined>) {
  if (!getSupabasePublicConfig(env)) {
    throw new Error('Configure valid NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY before releasing the website');
  }
}

if (import.meta.url === new URL(process.argv[1] ?? '', 'file:').href) {
  verifyWebReleaseConfig(process.env);
  console.log('Website release configuration verified (secret values omitted)');
}
