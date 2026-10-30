import { describe, expect, it } from 'vitest';
import {
  isSameOriginRequest,
  safeAuthorizationId,
  safeOAuthRedirect,
  safeReturnTo,
} from './inputs.js';

describe('authentication input boundaries', () => {
  it('keeps same-origin return paths including their query string', () => {
    expect(safeReturnTo('/oauth/consent?authorization_id=abc12345')).toBe(
      '/oauth/consent?authorization_id=abc12345',
    );
  });

  it.each([
    'https://attacker.example/callback',
    '//attacker.example/callback',
    '/\\attacker.example/callback',
    '/account\nset-cookie:bad',
  ])('rejects unsafe return path %s', (value) => {
    expect(safeReturnTo(value)).toBe('/app');
  });

  it('accepts bounded opaque authorization identifiers', () => {
    expect(safeAuthorizationId(' 01JTEST_AUTH-id.123 ')).toBe('01JTEST_AUTH-id.123');
  });

  it.each(['short', 'contains/slash', 'contains space', '<script>']) (
    'rejects invalid authorization identifier %s',
    (value) => {
      expect(safeAuthorizationId(value)).toBeNull();
    },
  );

  it('requires an exact same-origin POST boundary', () => {
    const sameOrigin = new Request('https://rendyn.example/oauth/consent/decision', {
      headers: { origin: 'https://rendyn.example' },
    });
    const crossOrigin = new Request('https://rendyn.example/oauth/consent/decision', {
      headers: { origin: 'https://attacker.example' },
    });

    expect(isSameOriginRequest(sameOrigin)).toBe(true);
    expect(isSameOriginRequest(crossOrigin)).toBe(false);
  });

  it('allows HTTPS and OAuth loopback redirects only', () => {
    expect(safeOAuthRedirect('https://client.example/callback')?.hostname).toBe('client.example');
    expect(safeOAuthRedirect('http://127.0.0.1:49152/callback')?.port).toBe('49152');
    expect(safeOAuthRedirect('http://client.example/callback')).toBeNull();
    expect(safeOAuthRedirect('javascript:alert(1)')).toBeNull();
  });
});
