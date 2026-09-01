import { describe, expect, it } from 'vitest';
import { readConfig } from './config.js';

describe('API production configuration', () => {
  it('requires only the user-scoped Supabase key for paid entitlement checks', () => {
    const config = readConfig({
      NODE_ENV: 'production',
      PUBLIC_BASE_URL: 'https://mcp.rendyn.dev',
      PREVIEW_BASE_URL: 'https://rendyn.dev',
      SUPABASE_URL: 'https://project.supabase.co',
      SUPABASE_ANON_KEY: 'public-anon-key-with-enough-length',
    });

    expect(config.supabaseConfigured).toBe(true);
    expect(config).not.toHaveProperty('SUPABASE_SERVICE_ROLE_KEY');
    expect(config).not.toHaveProperty('ANONYMOUS_COOKIE_SECRET');
  });

  it('still fails closed when production Supabase is incomplete', () => {
    expect(() => readConfig({
      NODE_ENV: 'production',
      PUBLIC_BASE_URL: 'https://mcp.rendyn.dev',
      PREVIEW_BASE_URL: 'https://rendyn.dev',
    })).toThrow('complete Supabase configuration');
  });
});
