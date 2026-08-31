const DEFAULT_RETURN_TO = '/account';
const MAX_RETURN_TO_LENGTH = 2_048;
const MAX_AUTHORIZATION_ID_LENGTH = 512;

export function firstQueryValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function safeReturnTo(
  value: string | null | undefined,
  fallback = DEFAULT_RETURN_TO,
): string {
  if (
    !value
    || value.length > MAX_RETURN_TO_LENGTH
    || !value.startsWith('/')
    || value.startsWith('//')
    || value.includes('\\')
    || /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return fallback;
  }

  try {
    const base = new URL('https://designmcp.invalid');
    const parsed = new URL(value, base);

    if (parsed.origin !== base.origin) return fallback;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}

export function safeAuthorizationId(value: FormDataEntryValue | string | null | undefined): string | null {
  if (typeof value !== 'string') return null;

  const normalized = value.trim();
  if (
    normalized.length < 8
    || normalized.length > MAX_AUTHORIZATION_ID_LENGTH
    || !/^[A-Za-z0-9._~-]+$/.test(normalized)
  ) {
    return null;
  }

  return normalized;
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function safeOAuthRedirect(value: string): URL | null {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:') return url;

    const isLoopback = url.hostname === 'localhost'
      || url.hostname === '127.0.0.1'
      || url.hostname === '[::1]';

    return url.protocol === 'http:' && isLoopback ? url : null;
  } catch {
    return null;
  }
}
