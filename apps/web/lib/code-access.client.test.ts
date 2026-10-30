import { afterEach, expect, it, vi } from 'vitest';
import { readCodeAccess } from './code-access.client';
afterEach(() => vi.unstubAllGlobals());
it('rejects failed and malformed access responses', async () => {
  for (const response of [Response.json({ allowed: true }, { status: 503 }), Response.json({ remainingCopies: 2 }), Response.json({ allowed: 'true' })]) {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response));
    await expect(readCodeAccess()).rejects.toThrow();
  }
});
it('reads public source access without caching', async () => {
  const fetch = vi.fn().mockResolvedValue(Response.json({ allowed: true }));
  vi.stubGlobal('fetch', fetch);
  expect(await readCodeAccess()).toEqual({ allowed: true });
  expect(fetch).toHaveBeenCalledWith('/api/code-access', { credentials: 'same-origin', cache: 'no-store', signal: undefined });
});
