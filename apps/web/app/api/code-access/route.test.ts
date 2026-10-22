import { beforeEach, describe, expect, it, vi } from 'vitest';
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock('../../../lib/supabase/server', () => ({ createClient }));
import { GET } from './route';

beforeEach(() => {
  vi.resetAllMocks();
  createClient.mockRejectedValue(new Error('Authentication unavailable'));
});
describe('public code access', () => {
  it('allows access without a session or an available authentication service', async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ allowed: true });
    expect(createClient).not.toHaveBeenCalled();
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
  });
});
