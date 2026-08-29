import type { Context, Hono } from "hono";
import type { AppConfig } from "../config.js";
import { jsonError } from "../http.js";
import { authorizationServerMetadata, resourceMetadata } from "../oauth.js";

export function registerOAuthRoutes(app: Hono, config: AppConfig): void {
  const protectedMetadata = resourceMetadata(config);
  const protectedResourceHandler = (context: Context) =>
    protectedMetadata
      ? context.json(protectedMetadata)
      : jsonError(context, 503, "oauth_not_configured");

  app.get("/.well-known/oauth-protected-resource", protectedResourceHandler);
  app.get("/.well-known/oauth-protected-resource/mcp", protectedResourceHandler);
  app.get("/.well-known/oauth-authorization-server", async (context) => {
    const metadata = await authorizationServerMetadata(config);
    return metadata
      ? context.json(metadata)
      : jsonError(context, 503, "oauth_not_configured");
  });
}
