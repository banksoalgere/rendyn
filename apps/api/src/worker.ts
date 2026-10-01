import { CatalogStore } from "@rendyn/catalog";
import type { AppConfig } from "./config.js";
import { readConfig } from "./config.js";
import { catalogSnapshot } from "./generated/catalog-data.js";
import { createWorkerPreviewMedia } from "./worker-media.js";
import { buildApp } from "./server.js";

interface WorkerEnvironment {
  PREVIEW_ASSETS: Fetcher;
  PUBLIC_BASE_URL: string;
  PREVIEW_BASE_URL: string;
  ALLOWED_HOSTS: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_JWT_AUDIENCE: string;
  MCP_REQUIRED_SCOPES: string;
  OPENAI_EMBEDDING_MODEL: string;
}

const store = CatalogStore.fromSnapshot(catalogSnapshot);
let appPromise: ReturnType<typeof buildApp> | undefined;


function workerConfig(env: WorkerEnvironment): AppConfig {
  return readConfig({
    NODE_ENV: "production",
    PUBLIC_BASE_URL: env.PUBLIC_BASE_URL,
    PREVIEW_BASE_URL: env.PREVIEW_BASE_URL,
    ALLOWED_HOSTS: env.ALLOWED_HOSTS,
    SUPABASE_URL: env.SUPABASE_URL,
    SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY,
    SUPABASE_JWT_AUDIENCE: env.SUPABASE_JWT_AUDIENCE,
    MCP_REQUIRED_SCOPES: env.MCP_REQUIRED_SCOPES,
    OPENAI_EMBEDDING_MODEL: env.OPENAI_EMBEDDING_MODEL,
    ALLOW_INSECURE_DEV_AUTH: "false",
  });
}

export default {
  async fetch(request: Request, env: WorkerEnvironment): Promise<Response> {
    try {
      appPromise ??= buildApp(workerConfig(env), {
        store,
        previewMedia: createWorkerPreviewMedia(env, store),
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
