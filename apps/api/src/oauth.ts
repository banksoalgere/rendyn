import type { AppConfig } from "./config.js";

interface CachedMetadata {
  expiresAt: number;
  value: Record<string, unknown>;
}

let metadataCache: CachedMetadata | null = null;

export function resourceMetadata(config: AppConfig) {
  if (!config.SUPABASE_URL) return null;
  return {
    resource: new URL("/mcp", config.publicBaseUrl).toString(),
    resource_name: "DesignMCP component catalogue",
    authorization_servers: [`${config.SUPABASE_URL.replace(/\/$/, "")}/auth/v1`],
    scopes_supported: config.requiredScopes,
    bearer_methods_supported: ["header"],
  };
}

export async function authorizationServerMetadata(config: AppConfig): Promise<Record<string, unknown> | null> {
  if (!config.SUPABASE_URL) return null;
  if (metadataCache && metadataCache.expiresAt > Date.now()) return metadataCache.value;
  const url = new URL("/.well-known/oauth-authorization-server/auth/v1", config.SUPABASE_URL);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) throw new Error(`Supabase OAuth discovery failed with status ${response.status}`);
  const value = (await response.json()) as Record<string, unknown>;
  if (typeof value.issuer !== "string" || typeof value.authorization_endpoint !== "string") {
    throw new Error("Supabase OAuth discovery returned malformed metadata");
  }
  metadataCache = { value, expiresAt: Date.now() + 60 * 60_000 };
  return value;
}

export function protectedResourceMetadataUrl(config: AppConfig): string {
  return new URL("/.well-known/oauth-protected-resource/mcp", config.publicBaseUrl).toString();
}
