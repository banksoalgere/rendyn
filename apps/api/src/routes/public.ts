import type { CatalogStore } from "@rendyn/catalog";
import type { Hono } from "hono";
import type { AppConfig } from "../config.js";
import type { CatalogService } from "../catalog-service.js";
import {
  presentBrowsePage,
  presentComponentMetadata,
  presentSearchResults,
} from "../catalog-presenter.js";
import {
  browseRequestSchema,
  contactSheetRequestSchema,
  jsonError,
  searchRequestSchema,
} from "../http.js";
import type { PreviewMedia } from "../preview-media.js";
import { publicJson } from '../public-cache.js';

interface PublicRouteDependencies {
  config: AppConfig;
  store: CatalogStore;
  catalog: CatalogService;
  previewMedia: PreviewMedia;
}

export function registerPublicRoutes(
  app: Hono,
  { config, store, catalog, previewMedia }: PublicRouteDependencies,
): void {
  app.get("/health", (context) =>
    context.json({
      status: "ok",
      catalog_components: store.index.components.length,
      source_commits: Object.fromEntries(
        store.index.sources.map((source) => [source.id, source.commit]),
      ),
      semantic_index: Boolean(store.embeddings),
      oauth_configured: config.supabaseConfigured,
    }),
  );

  app.get("/api/categories", (context) =>
    publicJson(context, { categories: store.index.categories }),
  );

  app.get("/api/search", async (context) => {
    const input = searchRequestSchema.safeParse(context.req.query());
    if (!input.success) {
      return jsonError(context, 400, "invalid_search", input.error.flatten());
    }
    const results = await catalog.search(
      input.data.q,
      input.data.limit,
      input.data.category,
    );
    return publicJson(context,
      presentSearchResults(input.data.q, results, catalog, config.publicBaseUrl),
    );
  });

  app.get("/api/browse/:category", (context) => {
    const category = context.req.param("category");
    if (!store.hasCategory(category)) {
      return jsonError(context, 404, "category_not_found");
    }
    const input = browseRequestSchema.safeParse(context.req.query());
    if (!input.success) {
      return jsonError(context, 400, "invalid_browse_request", input.error.flatten());
    }
    return publicJson(context,
      presentBrowsePage(
        catalog.browse(category, input.data.cursor, input.data.limit),
        catalog,
      ),
    );
  });

  app.get("/api/components/:slug", (context) => {
    const component = store.find(context.req.param("slug"));
    return component
      ? publicJson(context, presentComponentMetadata(component, catalog))
      : jsonError(context, 404, "component_not_found");
  });

  app.get("/api/previews/contact-sheet", async (context) => {
    const input = contactSheetRequestSchema.safeParse(context.req.query());
    if (!input.success || input.data.ids.some((slug) => !store.has(slug))) {
      return jsonError(context, 400, "invalid_component_ids");
    }
    const image = await previewMedia.buildContactSheet(input.data.ids);
    if (!image) return jsonError(context, 404, "preview_images_not_generated");
    return new Response(image.data, {
      headers: {
        "Content-Type": image.mimeType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  });
}
