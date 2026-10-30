import type { CatalogStore } from "@rendyn/catalog";
import type { Hono } from "hono";
import type { CatalogService } from "../catalog-service.js";
import { componentPayload } from "../component-payload.js";
import { jsonError } from "../http.js";

interface SourceRouteDependencies {
  store: CatalogStore;
  catalog: CatalogService;
}

export function registerSourceRoute(
  app: Hono,
  { store, catalog }: SourceRouteDependencies,
): void {
  app.get("/api/components/:slug/source", async (context) => {
    const slug = context.req.param("slug");
    const component = await store.get(slug);
    if (!component) return jsonError(context, 404, "component_not_found");

    const licenseText = await store.readLicenseText(component);
    context.header("Cache-Control", "private, no-store");
    return context.json({
      component: componentPayload(
        component,
        catalog.previewUrl(component.previewPath),
        licenseText,
      ),
    });
  });
}
