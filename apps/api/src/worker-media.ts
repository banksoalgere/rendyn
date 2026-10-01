import { Buffer } from "node:buffer";
import type { CatalogStore } from "@rendyn/catalog";
import type { PreviewImage, PreviewMedia } from "./preview-media.js";
interface WorkerEnvironment { PREVIEW_ASSETS: { fetch(request: Request): Promise<Response> } }

function escapeXml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&apos;",
    '"': "&quot;",
  })[character]!);
}

async function loadAsset(env: Pick<WorkerEnvironment, "PREVIEW_ASSETS">, slug: string): Promise<Uint8Array | null> {
  let response = await env.PREVIEW_ASSETS.fetch(new Request(`https://preview-assets.invalid/delivery/${encodeURIComponent(slug)}.png`));
  if (response.status === 404) response = await env.PREVIEW_ASSETS.fetch(
    new Request(`https://preview-assets.invalid/${encodeURIComponent(slug)}.png`));
  if (!response.ok && response.status !== 404) throw new Error(`Preview asset failed: ${response.status}`);
  return response.ok ? new Uint8Array(await response.arrayBuffer()) : null;
}

export function createWorkerPreviewMedia(env: Pick<WorkerEnvironment, "PREVIEW_ASSETS">, store: CatalogStore): PreviewMedia {
  const cache = new Map<string, { data: Uint8Array; expires: number }>();
  let cachedBytes = 0;
  async function asset(slug: string) {
    const item = cache.get(slug);
    if (item && item.expires > Date.now()) return item.data;
    if (item) { cache.delete(slug); cachedBytes -= item.data.byteLength; }
    const data = await loadAsset(env, slug);
    if (data && data.byteLength <= 1_048_576) {
      while (cachedBytes + data.byteLength > 4_194_304 && cache.size) {
        const key = cache.keys().next().value!;
        cachedBytes -= cache.get(key)!.data.byteLength;
        cache.delete(key);
      }
      // Another concurrent call may have populated this same entry while we awaited I/O.
      cachedBytes -= cache.get(slug)?.data.byteLength ?? 0;
      cache.set(slug, { data, expires: Date.now() + 300_000 });
      cachedBytes += data.byteLength;
    }
    return data;
  }
  return {
    async loadMcpImages(slugs): Promise<PreviewImage[]> {
      const selected = slugs.slice(0, 5).flatMap(slug => { const component = store.find(slug); return component ? [component.slug] : []; });
      const images = await Promise.all(selected.map(async slug => {
        const data = await asset(slug);
        return data ? { data, mimeType: 'image/png' } : null;
      }));
      return images.filter((image): image is PreviewImage => image !== null);
    },

    async buildContactSheet(slugs) {
      const selected = slugs.slice(0, 5).flatMap(slug => { const component = store.find(slug); return component ? [component] : []; });
      const loaded = await Promise.all(selected.map(async component => {
        const data = await asset(component.slug);
        return data ? { name: component.name, data } : null;
      }));
      const images = loaded.filter((image): image is { name: string; data: Uint8Array } => image !== null);
      if (!images.length) return null;

      const columns = Math.min(2, images.length);
      const rows = Math.ceil(images.length / columns);
      const width = columns * 620 + 20;
      const height = rows * 400 + 20;
      const cells = images.map((image, index) => {
        const left = 20 + (index % columns) * 620;
        const top = 20 + Math.floor(index / columns) * 400;
        const encoded = Buffer.from(image.data).toString("base64");
        return [
          `<rect x="${left}" y="${top}" width="600" height="380" rx="8" fill="#f5f5f5"/>`,
          `<image x="${left}" y="${top}" width="600" height="330" href="data:image/png;base64,${encoded}" preserveAspectRatio="xMidYMid meet"/>`,
          `<rect x="${left}" y="${top + 330}" width="600" height="50" fill="#111"/>`,
          `<text x="${left + 18}" y="${top + 363}" fill="white" font-size="20" font-family="Arial, sans-serif">${index + 1}. ${escapeXml(image.name)}</text>`,
        ].join("");
      }).join("");
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#e8e8e8"/>${cells}</svg>`;
      return { data: new TextEncoder().encode(svg), mimeType: "image/svg+xml" };
    },
  };
}
