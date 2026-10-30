import { expect, it } from 'vitest';
import { verifyBuiltWebConfig } from './verify-built-web-config';

const valid = {
  NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_example_test_key',
};

it('accepts the intended public configuration in browser chunks', () => {
  expect(() => verifyBuiltWebConfig([
    `const url = "${valid.NEXT_PUBLIC_SUPABASE_URL}";`,
    `const key = "${valid.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}";`,
  ], valid)).not.toThrow();
});

it('rejects dynamic environment lookups that were not inlined', () => {
  expect(() => verifyBuiltWebConfig([
    'const env = process.env; const url = env.NEXT_PUBLIC_SUPABASE_URL;',
  ], valid)).toThrow('refusing release');
});

it('rejects a missing or mismatched public key', () => {
  expect(() => verifyBuiltWebConfig([valid.NEXT_PUBLIC_SUPABASE_URL], valid)).toThrow();
  expect(() => verifyBuiltWebConfig([
    valid.NEXT_PUBLIC_SUPABASE_URL, 'sb_publishable_other_project_key',
  ], valid)).toThrow();
});

it('rejects a missing or mismatched project URL', () => {
  expect(() => verifyBuiltWebConfig([valid.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY], valid)).toThrow();
  expect(() => verifyBuiltWebConfig([
    'https://wrong.supabase.co', valid.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  ], valid)).toThrow();
});

it('fails closed for absent chunks or invalid configuration', () => {
  expect(() => verifyBuiltWebConfig([], valid)).toThrow();
  expect(() => verifyBuiltWebConfig(Object.values(valid), {})).toThrow();
  expect(() => verifyBuiltWebConfig(Object.values(valid), {
    ...valid, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_secret_server_only_key',
  })).toThrow();
});
