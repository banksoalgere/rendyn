export interface SupabasePublicConfig {
  url: string;
  publishableKey: string;
}

function isSecureSupabaseUrl(value: string): boolean {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:') return true;

    const isLoopback = url.hostname === 'localhost'
      || url.hostname === '127.0.0.1'
      || url.hostname === '[::1]';

    return url.protocol === 'http:' && isLoopback;
  } catch {
    return false;
  }
}

export function getSupabasePublicConfig(env: Record<string, string | undefined> = process.env): SupabasePublicConfig | null {
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (
    !url
    || !publishableKey
    || publishableKey.length < 20
    || publishableKey.startsWith('sb_secret_')
    || !isSecureSupabaseUrl(url)
  ) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ''),
    publishableKey,
  };
}
