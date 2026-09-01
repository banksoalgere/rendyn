import { Buffer } from "node:buffer";
import { CatalogStore } from "@designmcp/catalog";
import type { AppConfig } from "./config.js";
import { readConfig } from "./config.js";
import { catalogSnapshot } from "./generated/catalog-data.js";
import type { PreviewImage, PreviewMedia } from "./preview-media.js";
import { buildApp } from "./server.js";

interface WorkerEnvironment {
  PREVIEW_ASSETS: Fetcher;
  PUBLIC_BASE_URL: string;
  PREVIEW_BASE_URL: string;
  ALLOWED_HOSTS: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  SUPABASE_JWT_AUDIENCE: string;
  MCP_REQUIRED_SCOPES: string;
  ANONYMOUS_COOKIE_SECRET: string;
  OPENAI_EMBEDDING_MODEL: string;
}

const store = CatalogStore.fromSnapshot(catalogSnapshot);
let appPromise: ReturnType<typeof buildApp> | undefined;

function escapeXml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&apos;",
    '"': "&quot;",
  })[character]!);
}

async function loadAsset(env: WorkerEnvironment, slug: string): Promise<Uint8Array | null> {
  const response = await env.PREVIEW_ASSETS.fetch(
    new Request(`https://preview-assets.invalid/${encodeURIComponent(slug)}.png`),
  );
  return response.ok ? new Uint8Array(await response.arrayBuffer()) : null;
}

function createWorkerPreviewMedia(env: WorkerEnvironment): PreviewMedia {
  return {
    async loadMcpImages(slugs): Promise<PreviewImage[]> {
      const images: PreviewImage[] = [];
      for (const slug of slugs.slice(0, 5)) {
        if (!store.has(slug)) continue;
        const data = await loadAsset(env, slug);
        if (data) images.push({ data, mimeType: "image/png" });
      }
      return images;
    },

    async buildContactSheet(slugs) {
      const images: Array<{ name: string; data: Uint8Array }> = [];
      for (const slug of slugs.slice(0, 5)) {
        const component = store.find(slug);
        if (!component) continue;
        const data = await loadAsset(env, slug);
        if (data) images.push({ name: component.name, data });
      }
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

function workerConfig(env: WorkerEnvironment): AppConfig {
  return readConfig({
    NODE_ENV: "production",
    PUBLIC_BASE_URL: env.PUBLIC_BASE_URL,
    PREVIEW_BASE_URL: env.PREVIEW_BASE_URL,
    ALLOWED_HOSTS: env.ALLOWED_HOSTS,
    SUPABASE_URL: env.SUPABASE_URL,
    SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_JWT_AUDIENCE: env.SUPABASE_JWT_AUDIENCE,
    MCP_REQUIRED_SCOPES: env.MCP_REQUIRED_SCOPES,
    ANONYMOUS_COOKIE_SECRET: env.ANONYMOUS_COOKIE_SECRET,
    OPENAI_EMBEDDING_MODEL: env.OPENAI_EMBEDDING_MODEL,
    ALLOW_INSECURE_DEV_AUTH: "false",
  });
}

export default {
  async fetch(request: Request, env: WorkerEnvironment): Promise<Response> {
    try {
      appPromise ??= buildApp(workerConfig(env), {
        store,
        previewMedia: createWorkerPreviewMedia(env),
      });
      const app = await appPromise;
      return app.fetch(request);
    } catch (error) {
      console.error(JSON.stringify({
        message: "worker_request_failed",
        path: new URL(request.url).pathname,
        error: error instanceof Error ? error.message : "unknown_error",
      }));
      return Response.json({ error: "service_unavailable" }, { status: 503 });
    }
  },
} satisfies ExportedHandler<WorkerEnvironment>;
