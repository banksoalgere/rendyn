import { expect, it } from 'vitest';
import { verifyWebReleaseConfig } from './verify-release-config';
const valid = { NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co', NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_example_test_key' };
it('requires usable authentication configuration for free code access', () => {
  expect(() => verifyWebReleaseConfig({})).toThrow('NEXT_PUBLIC_SUPABASE');
  expect(() => verifyWebReleaseConfig({ ...valid, NEXT_PUBLIC_SUPABASE_URL: 'http://remote.example' })).toThrow();
  expect(() => verifyWebReleaseConfig({ ...valid, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_secret_private_service_key' })).toThrow();
  expect(() => verifyWebReleaseConfig(valid)).not.toThrow();
});
