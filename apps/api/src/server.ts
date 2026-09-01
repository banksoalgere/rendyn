import { createMcpHonoApp } from "@modelcontextprotocol/hono";
import { createMcpHandler, requireBearerAuth } from "@modelcontextprotocol/server";
import type { CatalogStore } from "@designmcp/catalog";
import type { Context } from "hono";
import { SupabaseTokenVerifier } from "./auth.js";
import { CatalogService } from "./catalog-service.js";
import { readConfig, type AppConfig } from "./config.js";
import { EntitlementService } from "./entitlements.js";
import { jsonError } from "./http.js";
import { buildMcpServer } from "./mcp.js";
import { protectedResourceMetadataUrl } from "./oauth.js";
import type { PreviewMedia } from "./preview-media.js";
import { registerOAuthRoutes } from "./routes/oauth.js";
import { registerPublicRoutes } from "./routes/public.js";
import { registerSourceRoute } from "./routes/source.js";

export interface AppOptions {
  store: CatalogStore;
  previewMedia: PreviewMedia;
}

export async function buildApp(
  config: AppConfig = readConfig(),
  options: AppOptions,
) {
  const { store, previewMedia } = options;
  const catalog = new CatalogService(store, config);
  const entitlements = new EntitlementService(config);
  const tokenVerifier = new SupabaseTokenVerifier(config);
  const app = createMcpHonoApp({
    host: "0.0.0.0",
    allowedHosts: config.allowedHosts,
    allowedOrigins: [config.publicBaseUrl.hostname, config.previewBaseUrl.hostname],
  });

  registerPublicRoutes(app, { config, store, catalog, previewMedia });
  registerOAuthRoutes(app, config);
  registerSourceRoute(app, { config, store, catalog, entitlements, tokenVerifier });

  const mcpHandler = createMcpHandler(() =>
    buildMcpServer({ config, catalog, entitlements, previewMedia }),
  );
  const authGate = requireBearerAuth({
    verifier: { verifyAccessToken: (token: string) => tokenVerifier.verifyAccessToken(token) },
    requiredScopes: config.requiredScopes,
    resourceMetadataUrl: protectedResourceMetadataUrl(config),
  });
  app.all("/mcp", async (context: Context) => {
    const auth = await authGate(context.req.raw);
    if (auth instanceof Response) return auth;
    return mcpHandler.fetch(context.req.raw, {
      authInfo: auth,
      parsedBody: context.get("parsedBody"),
    });
  });

  app.notFound((context) => jsonError(context, 404, "not_found"));
  app.onError((error, context) => {
    console.error(error);
    return jsonError(context, 503, "service_error");
  });
  return app;
}
