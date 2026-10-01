import { describe, expect, it, vi } from 'vitest';
import { CatalogStore } from '@rendyn/catalog';
import { catalogSnapshot } from './generated/catalog-data';
import { createWorkerPreviewMedia } from './worker-media';

const store = CatalogStore.fromSnapshot(catalogSnapshot);
describe('Worker asset delivery', () => {
  it('loads independently in parallel, preserving order and caching completed bytes', async () => {
    const finish = new Map<string, (response: Response) => void>();
    const fetch = vi.fn((request: Request) => new Promise<Response>(resolve => finish.set(new URL(request.url).pathname, resolve)));
    const media = createWorkerPreviewMedia({ PREVIEW_ASSETS: { fetch } }, store);
    const result = media.loadMcpImages(['button', 'tilt-card', 'not-a-component']);
    expect(fetch).toHaveBeenCalledTimes(2);
    finish.get('/delivery/tilt-card.png')!(new Response(new Uint8Array([2])));
    finish.get('/delivery/button.png')!(new Response(new Uint8Array([1])));
    expect((await result).map(item => [...item.data])).toEqual([[1], [2]]);
    await media.loadMcpImages(['button']); expect(fetch).toHaveBeenCalledTimes(2);
  });
  it('falls back to original images only when a delivery thumbnail is missing', async () => {
    const fetch = vi.fn(async (request: Request) => new URL(request.url).pathname.includes('/delivery/')
      ? new Response(null, { status: 404 }) : new Response(new Uint8Array([1, 2])));
    const media = createWorkerPreviewMedia({ PREVIEW_ASSETS: { fetch } }, store);
    const sheet = await media.buildContactSheet(['button', 'tilt-card']);
    expect(sheet?.mimeType).toBe('image/svg+xml');
    expect(new TextDecoder().decode(sheet?.data)).toContain('1. Button');
    expect(new TextDecoder().decode(sheet?.data)).toContain('2. Tilt Card');
    expect(fetch).toHaveBeenCalledTimes(4);
  });
  it('does not hide upstream errors as missing images', async () => {
    const media = createWorkerPreviewMedia({ PREVIEW_ASSETS: { fetch: async () => new Response(null, { status: 500 }) } }, store);
    await expect(media.loadMcpImages(['button'])).rejects.toThrow('500');
  });
});
