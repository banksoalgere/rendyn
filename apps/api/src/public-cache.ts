import { createHash } from 'node:crypto';
import type { Context } from 'hono';

/** Only for anonymous catalogue metadata, never code, billing or account data. */
export function publicJson(context: Context, value: unknown, seconds = 300) {
  const body = JSON.stringify(value);
  const tag = `W/"${createHash('sha256').update(body).digest('hex')}"`;
  const headers = { 'Content-Type': 'application/json; charset=UTF-8', ETag: tag,
    'Cache-Control': `public, max-age=${seconds}, stale-while-revalidate=600` };
  const matches = (context.req.header('If-None-Match') ?? '').split(',').map(value => value.trim());
  if (matches.includes(tag) || matches.includes('*')) return new Response(null, { status: 304, headers });
  return new Response(body, { headers });
}
