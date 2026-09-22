import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createClient, getUser } = vi.hoisted(() => ({ createClient: vi.fn(), getUser: vi.fn() }));
vi.mock('../../../../../lib/supabase/server', () => ({ createClient }));
import { GET } from './route';

const request = (slug = 'tooltip') => GET(new Request(`https://rendyn.dev/api/components/${slug}/code`), {
  params: Promise.resolve({ componentSlug: slug }),
});

describe('component code access', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    createClient.mockResolvedValue({ auth: { getUser } });
    getUser.mockResolvedValue({ data: { user: null }, error: null });
  });
  it('blocks source for a signed-out visitor', async () => {
    const response = await request();
    expect(response.status).toBe(401);
    expect(await response.json()).not.toHaveProperty('files');
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
  });
  it('rejects invalid sessions even if a user object is returned', async () => {
    getUser.mockResolvedValue({ data: { user: { id: 'user' } }, error: new Error('Invalid session') });
    expect((await request()).status).toBe(503);
  });
  it('returns editable source for a verified signed-in user without requiring billing', async () => {
    getUser.mockResolvedValue({ data: { user: { id: 'user' } }, error: null });
    const response = await request();
    expect(response.status).toBe(200);
    const code = await response.json();
    expect(code.signedIn).toBe(true);
    expect(code.files.some((file: { path: string }) => file.path === 'components/motion/tooltip.tsx')).toBe(true);
    expect(code.license).toContain('Permission is hereby granted');
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(response.headers.get('Vary')).toBe('Cookie');
  });
  it('fails closed during an authentication outage', async () => {
    getUser.mockRejectedValue(new Error('Unavailable'));
    const response = await request();
    expect(response.status).toBe(503);
    expect(await response.json()).not.toHaveProperty('files');
  });
  it('fails closed without authentication configuration', async () => {
    createClient.mockResolvedValue(null);
    expect((await request()).status).toBe(503);
  });
  it('rejects unrecognised component slugs', async () => {
    expect((await request('../tooltip')).status).toBe(404);
    expect(getUser).not.toHaveBeenCalled();
  });
});
