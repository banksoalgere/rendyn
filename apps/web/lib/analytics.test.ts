import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanAnalyticsUrl, cleanEventProperties, cleanSearchQuery, isAnalyticsPage } from './analytics-privacy';

const sdk = vi.hoisted(() => ({
  init: vi.fn(), capture: vi.fn(), stopSessionRecording: vi.fn(), startSessionRecording: vi.fn(), opt_in_capturing: vi.fn(), opt_out_capturing: vi.fn(),
}));
vi.mock('posthog-js', () => ({ default: sdk }));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  sdk.init.mockImplementation(() => sdk);
  const storage = new Map<string, string>();
  vi.stubGlobal('window', {
    location: { pathname: '/components', href: 'https://rendyn.dev/components?token=secret#private' },
    localStorage: { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, value: string) => storage.set(key, value) },
    dispatchEvent: vi.fn(),
  });
  vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', 'phc_test123');
  vi.stubEnv('NEXT_PUBLIC_POSTHOG_REGION', 'eu');
});
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe('analytics privacy', () => {
  it('only accepts public content routes', () => {
    for (const path of ['/', '/components', '/components/tilt-card', '/guides/cursor-design', '/pricing']) expect(isAnalyticsPage(path)).toBe(true);
    for (const path of ['/login', '/account', '/auth/callback', '/api/components/x/code', '/component-preview/x', '/components/person@example.com']) expect(isAnalyticsPage(path)).toBe(false);
  });
  it('removes URL credentials, query strings, fragments and private paths', () => {
    expect(cleanAnalyticsUrl('https://u:secret@rendyn.dev/components?email=x#token')).toBe('https://rendyn.dev/components');
    expect(cleanAnalyticsUrl('https://rendyn.dev/auth/callback?code=abc')).toBe('https://rendyn.dev/[redacted]');
    expect(cleanAnalyticsUrl('mailto:person@example.com')).toBe('');
  });
  it('redacts pasted private values while retaining ordinary catalogue searches', () => {
    expect(cleanSearchQuery('  Animated   Button ')).toBe('animated button');
    for (const query of ['person@example.com', 'https://private.test', 'sk_secret123', '<script>', 'a'.repeat(81)]) expect(cleanSearchQuery(query)).toBe('[redacted]');
  });
  it('scrubs SDK URL and attribution properties', () => {
    expect(cleanEventProperties({ $current_url: 'https://rendyn.dev/?token=secret', $referrer: 'https://example.com/private?email=x', $set_once: { email: 'private' }, $initial_utm_source: 'private', result_count: 4 }))
      .toEqual({ $current_url: 'https://rendyn.dev/', $referrer: 'https://example.com/[redacted]', result_count: 4 });
  });
});

describe('capture lifecycle', () => {
  it('does not load or capture before consent or after decline', async () => {
    const analytics = await import('./analytics');
    await analytics.syncAnalytics();
    analytics.trackPageview();
    analytics.setAnalyticsConsent('declined');
    await analytics.syncAnalytics();
    analytics.trackCopy('code', 'button');
    expect(sdk.init).not.toHaveBeenCalled();
    expect(sdk.capture).not.toHaveBeenCalled();
  });
  it('remains disabled with a missing key', async () => {
    vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', '');
    const analytics = await import('./analytics');
    analytics.setAnalyticsConsent('accepted');
    await analytics.syncAnalytics();
    expect(sdk.init).not.toHaveBeenCalled();
  });
  it('captures accepted activity, starts replay, and stops on withdrawal', async () => {
    const analytics = await import('./analytics');
    analytics.setAnalyticsConsent('accepted');
    await analytics.syncAnalytics();
    analytics.trackPageview();
    analytics.trackSearch('button', 'all', 3);
    analytics.trackCopy('code', 'button');
    expect(sdk.capture.mock.calls).toEqual([
      ['$pageview', { $current_url: 'https://rendyn.dev/components' }],
      ['catalogue_searched', { query: 'button', category: 'all', result_count: 3 }],
      ['component_code_copied', { component_slug: 'button' }],
    ]);
    expect(sdk.startSessionRecording).toHaveBeenCalledOnce();
    const config = sdk.init.mock.calls[0][1];
    expect(config.session_recording.maskAllInputs).toBe(true);
    expect(config.session_recording.recordBody).toBe(false);
    analytics.setAnalyticsConsent('declined');
    analytics.trackCopy('code', 'button');
    expect(config.before_send({ event: '$snapshot', properties: {} })).toBeNull();
    expect(sdk.capture).toHaveBeenCalledTimes(3);
    expect(sdk.opt_out_capturing).toHaveBeenCalledOnce();
    expect(sdk.stopSessionRecording).toHaveBeenCalled();
  });
  it('drops events and stops replay on private routes', async () => {
    const analytics = await import('./analytics');
    analytics.setAnalyticsConsent('accepted');
    await analytics.syncAnalytics();
    window.location.pathname = '/account';
    analytics.trackPageview();
    await analytics.syncAnalytics();
    expect(sdk.capture).not.toHaveBeenCalled();
    expect(sdk.stopSessionRecording).toHaveBeenCalled();
  });
  it('does not initialize if consent changes while the import is pending', async () => {
    const analytics = await import('./analytics');
    analytics.setAnalyticsConsent('accepted');
    const pending = analytics.syncAnalytics();
    analytics.setAnalyticsConsent('declined');
    await pending;
    expect(sdk.init).not.toHaveBeenCalled();
  });
  it('never turns a successful clipboard action into a failure when analytics throws', async () => {
    const analytics = await import('./analytics');
    analytics.setAnalyticsConsent('accepted');
    await analytics.syncAnalytics();
    sdk.capture.mockImplementationOnce(() => { throw new Error('SDK unavailable'); });
    expect(() => analytics.trackCopy('code', 'button')).not.toThrow();
  });
});
