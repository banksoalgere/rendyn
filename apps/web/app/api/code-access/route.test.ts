import { beforeEach, describe, expect, it, vi } from 'vitest';
const { createClient, getUser } = vi.hoisted(() => ({ createClient: vi.fn(), getUser: vi.fn() }));
vi.mock('../../../lib/supabase/server', () => ({ createClient }));
import { GET } from './route';

beforeEach(() => {
  vi.resetAllMocks();
  createClient.mockResolvedValue({ auth: { getUser } });
});
describe('login-based code access', () => {
  it('requires login for anonymous visitors', async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: { name: 'AuthSessionMissingError' } });
    const response = await GET();
    expect(await response.json()).toEqual({ signedIn: false });
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(response.headers.get('Vary')).toBe('Cookie');
  });
  it('grants access after verified login and revokes it after logout', async () => {
    getUser.mockResolvedValue({ data: { user: { id: 'verified-user' } }, error: null });
    expect(await (await GET()).json()).toEqual({ signedIn: true });
    getUser.mockResolvedValue({ data: { user: null }, error: null });
    expect(await (await GET()).json()).toEqual({ signedIn: false });
  });
  it('fails closed when authentication is unavailable', async () => {
    getUser.mockRejectedValue(new Error('Unavailable'));
    expect((await GET()).status).toBe(503);
    createClient.mockResolvedValue(null);
    expect((await GET()).status).toBe(503);
  });
});
