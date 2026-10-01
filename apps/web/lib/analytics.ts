import type { PostHog } from 'posthog-js';
import { cleanAnalyticsUrl, cleanEventProperties, cleanSearchQuery, isAnalyticsPage } from './analytics-privacy';

export type AnalyticsConsent = 'accepted' | 'declined';
export const CONSENT_KEY = 'rendyn-analytics-consent-v1';
export const CONSENT_EVENT = 'rendyn:analytics-consent';
let consent: AnalyticsConsent | null = null;
let client: PostHog | undefined;
let loading: Promise<void> | undefined;

export function analyticsConfigured(): boolean {
  return /^phc_[a-zA-Z0-9]+$/.test(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '')
    && ['eu', 'us'].includes(process.env.NEXT_PUBLIC_POSTHOG_REGION ?? 'eu');
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    return saved === 'accepted' || saved === 'declined' ? saved : null;
  } catch { return null; }
}

export function setAnalyticsConsent(value: AnalyticsConsent): void {
  consent = value;
  try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* Session-only choice if storage is blocked. */ }
  if (value === 'declined') {
    client?.stopSessionRecording();
    client?.opt_out_capturing();
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

function canCapture(): boolean {
  return typeof window !== 'undefined' && consent === 'accepted'
    && isAnalyticsPage(window.location.pathname);
}

export async function syncAnalytics(): Promise<void> {
  consent ??= readAnalyticsConsent();
  if (!analyticsConfigured() || !canCapture()) {
    client?.stopSessionRecording();
    return;
  }
  if (!client) {
    loading ??= import('posthog-js').then(({ default: posthog }) => {
      // Consent may have been withdrawn while the SDK chunk was loading.
      if (!canCapture()) return;
      client = posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_REGION === 'us' ? 'https://us.i.posthog.com' : 'https://eu.i.posthog.com',
        defaults: '2025-11-30',
        persistence: 'localStorage',
        person_profiles: 'never',
        capture_pageview: false,
        capture_pageleave: false,
        autocapture: false,
        capture_dead_clicks: false,
        capture_exceptions: false,
        capture_performance: false,
        capture_heatmaps: false,
        disable_surveys: true,
        enable_recording_console_log: false,
        mask_all_text: true,
        mask_all_element_attributes: true,
        session_recording: {
          maskAllInputs: true,
          maskTextSelector: '*',
          blockSelector: 'form, pre, code, iframe, [contenteditable], [data-analytics-private]',
          recordCrossOriginIframes: false,
          recordHeaders: false,
          recordBody: false,
          captureCanvas: { recordCanvas: false },
          captureJsonLd: false,
          maskAttributeFn: (name, value) => {
            if (['href', 'src', 'action'].includes(name)) return cleanAnalyticsUrl(value);
            if (['class', 'id', 'style', 'width', 'height', 'role', 'type'].includes(name)) return value;
            return '[redacted]';
          },
          maskCapturedNetworkRequestFn: (request) => ({ ...request, name: cleanAnalyticsUrl(request.name) }),
        },
        before_send: (event) => {
          if (!canCapture()) return null;
          if (event) event.properties = cleanEventProperties(event.properties);
          return event;
        },
      });
    }).catch(() => { /* Analytics must never interrupt browsing or copying. */ }).finally(() => { loading = undefined; });
    await loading;
  }
  if (canCapture()) {
    client?.opt_in_capturing();
    client?.startSessionRecording();
  }
}

function capture(event: string, properties: Record<string, unknown>): void {
  try { client?.capture(event, properties); } catch { /* Tracking cannot break product actions. */ }
}

export function trackPageview(): void {
  if (!canCapture()) return;
  capture('$pageview', { $current_url: cleanAnalyticsUrl(window.location.href) });
}

export function trackSearch(query: string, category: string, resultCount: number): void {
  if (!canCapture() || !query.trim() || !['all', 'motion', 'agents', 'blocks'].includes(category)) return;
  capture('catalogue_searched', {
    query: cleanSearchQuery(query), category,
    result_count: Math.max(0, Math.floor(resultCount)),
  });
}

export function trackCopy(kind: 'code' | 'prompt', componentSlug?: string): void {
  if (!canCapture()) return;
  capture(kind === 'code' ? 'component_code_copied' : 'prompt_copied', {
    ...(componentSlug && /^[a-z0-9-]{1,120}$/.test(componentSlug) ? { component_slug: componentSlug } : {}),
  });
}

export function trackClick(event: MouseEvent): void {
  if (!canCapture() || !(event.target instanceof Element)) return;
  const target = event.target.closest('a, button, summary, [role="button"]');
  if (!target || target.closest('form, pre, code, [contenteditable], [data-analytics-private]')) return;
  const action = target.getAttribute('data-analytics-action');
  capture('website_clicked', {
    element: target.tagName.toLowerCase(),
    ...(action && /^[a-z0-9_-]{1,64}$/.test(action) ? { action } : {}),
    ...(target instanceof HTMLAnchorElement ? { destination_url: cleanAnalyticsUrl(target.href) } : {}),
  });
}
