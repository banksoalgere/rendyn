import type { CatalogStore } from "@designmcp/catalog";
import type { Context, Hono } from "hono";
import { anonymousIdentity } from "../anonymous.js";
import { bearerToken, type SupabaseTokenVerifier } from "../auth.js";
import type { CatalogService } from "../catalog-service.js";
import { componentPayload } from "../component-payload.js";
import type { AppConfig } from "../config.js";
import type { EntitlementService } from "../entitlements.js";
import { jsonError } from "../http.js";

interface SourceRouteDependencies {
  config: AppConfig;
  store: CatalogStore;
  catalog: CatalogService;
  entitlements: EntitlementService;
  tokenVerifier: SupabaseTokenVerifier;
}

export function registerSourceRoute(
  app: Hono,
  { config, store, catalog, entitlements, tokenVerifier }: SourceRouteDependencies,
): void {
  app.get("/api/components/:slug/source", async (context) => {
    const slug = context.req.param("slug");
    const component = await store.get(slug);
    if (!component) return jsonError(context, 404, "component_not_found");

    const token = bearerToken(context.req.raw);
    const entitlement = token
      ? await claimAuthenticatedComponent(token, slug, tokenVerifier, entitlements)
      : await claimAnonymousComponent(context, slug, config, entitlements);

    if (entitlement instanceof Response) return entitlement;
    if (!entitlement.allowed) {
      return jsonError(
        context,
        402,
        "free_component_allowance_exhausted",
        entitlement,
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

async function claimAuthenticatedComponent(
  token: string,
  slug: string,
  tokenVerifier: SupabaseTokenVerifier,
  entitlements: EntitlementService,
) {
  await tokenVerifier.verifyAccessToken(token);
  return entitlements.claimUser(token, slug);
}

async function claimAnonymousComponent(
  context: Context,
  slug: string,
  config: AppConfig,
  entitlements: EntitlementService,
) {
  if (!config.supabaseConfigured || !config.ANONYMOUS_COOKIE_SECRET) {
    return jsonError(context, 503, "entitlements_not_configured");
  }
  return entitlements.claimAnonymous(anonymousIdentity(context, config), slug);
}
