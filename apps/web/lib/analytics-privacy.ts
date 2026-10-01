export function isAnalyticsPage(pathname: string): boolean {
  return /^\/(?:$|pricing\/?$|components(?:\/[a-z0-9-]+)?\/?$|(?:guides|blog)(?:\/[a-z0-9-]+)?\/?$)/.test(pathname);
}

export function cleanAnalyticsUrl(value: string): string {
  try {
    const url = new URL(value, 'https://rendyn.dev');
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    return `${url.origin}${isAnalyticsPage(url.pathname) ? url.pathname : '/[redacted]'}`;
  } catch {
    return '';
  }
}

// Search text is deliberately limited to short, ordinary catalogue terms.
// Never send emails, URLs, pasted code, identifiers or arbitrary form values.
export function cleanSearchQuery(value: string): string {
  const query = value.trim().toLowerCase().replace(/\s+/g, ' ');
  return /^[a-z][a-z -]{0,79}$/.test(query) && query.split(/[ -]/).every((word) => word.length <= 24)
    ? query : '[redacted]';
}

export function cleanEventProperties(properties: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(properties).flatMap(([key, value]) => {
    if (key === '$set' || key === '$set_once' || /\$(?:initial_)?(?:utm_|referring_domain|search_keyword)/.test(key)) return [];
    if (typeof value === 'string' && /url|referrer|href/i.test(key)) return [[key, cleanAnalyticsUrl(value)]];
    return [[key, value]];
  }));
}
