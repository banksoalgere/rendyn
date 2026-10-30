import { beforeEach, describe, expect, it, vi } from 'vitest';
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock('../../../../../lib/supabase/server', () => ({ createClient }));
import { GET } from './route';

const request = (slug = 'tooltip') => GET(new Request(`https://rendyn.dev/api/components/${slug}/code`), {
  params: Promise.resolve({ componentSlug: slug }),
});

describe('public component source', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    createClient.mockRejectedValue(new Error('Authentication unavailable'));
  });
  it('returns editable source, install instructions and licence without authentication or billing', async () => {
    const response = await request();
    expect(response.status).toBe(200);
    const code = await response.json();
    expect(code.allowed).toBe(true);
    expect(code).not.toHaveProperty('signedIn');
    expect(code.files.some((file: { path: string }) => file.path === 'components/motion/tooltip.tsx')).toBe(true);
    expect(code.install.instructions.length).toBeGreaterThan(0);
    expect(code.license).toContain('Permission is hereby granted');
    expect(createClient).not.toHaveBeenCalled();
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
  });
  it.each(['../tooltip', 'not-a-real-component', '%2e%2e%2ftooltip'])('rejects unknown or unsafe source paths: %s', async slug => {
    const response = await request(slug);
    expect(response.status).toBe(404);
    expect(await response.json()).not.toHaveProperty('files');
    expect(createClient).not.toHaveBeenCalled();
  });
});
