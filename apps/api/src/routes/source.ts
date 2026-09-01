import type { CatalogStore } from "@rendyn/catalog";
import type { Hono } from "hono";
import { bearerToken, type SupabaseTokenVerifier } from "../auth.js";
import type { CatalogService } from "../catalog-service.js";
import { componentPayload } from "../component-payload.js";
import type { EntitlementService } from "../entitlements.js";
import { jsonError } from "../http.js";

interface SourceRouteDependencies {
  store: CatalogStore;
  catalog: CatalogService;
  entitlements: EntitlementService;
  tokenVerifier: SupabaseTokenVerifier;
}

export function registerSourceRoute(
  app: Hono,
  { store, catalog, entitlements, tokenVerifier }: SourceRouteDependencies,
): void {
  app.get("/api/components/:slug/source", async (context) => {
    const slug = context.req.param("slug");
    const component = await store.get(slug);
    if (!component) return jsonError(context, 404, "component_not_found");

    const token = bearerToken(context.req.raw);
    if (!token) return jsonError(context, 401, "authentication_required");

    try {
      await tokenVerifier.verifyAccessToken(token);
    } catch {
      return jsonError(context, 401, "invalid_token");
    }

    const entitlement = await entitlements.claimUser(token, slug);
    if (!entitlement.allowed) {
      return jsonError(
        context,
        402,
        "subscription_required",
        {
          ...entitlement,
          checkout_url: "https://rendyn.dev/pricing",
        },
      );
    }

    const licenseText = await store.readLicenseText(component);
    context.header("Cache-Control", "private, no-store");
    return context.json({
      component: componentPayload(
        component,
        catalog.previewUrl(component.previewPath),
        licenseText,
      ),
      entitlement,
    });
  });
}
