import { afterEach, describe, expect, it, vi } from 'vitest';
import { getSupabasePublicConfig } from './config.js';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('public Supabase configuration', () => {
  it('accepts a secure project URL and publishable key', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://project-ref.supabase.co/');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_12345678901234567890');

    expect(getSupabasePublicConfig()).toEqual({
      url: 'https://project-ref.supabase.co',
      publishableKey: 'sb_publishable_12345678901234567890',
    });
  });

  it('allows HTTP only for local development', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_12345678901234567890');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'http://127.0.0.1:54321');
    expect(getSupabasePublicConfig()?.url).toBe('http://127.0.0.1:54321');

    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'http://supabase.example');
    expect(getSupabasePublicConfig()).toBeNull();
  });

  it('rejects secret keys at the browser boundary', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://project-ref.supabase.co');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'sb_secret_123456789012345678901234');

    expect(getSupabasePublicConfig()).toBeNull();
  });
});
