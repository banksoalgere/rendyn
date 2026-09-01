import { z } from "zod";

const optionalUrl = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.url().optional(),
);

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65_535).default(8787),
  PUBLIC_BASE_URL: z.url().default("http://localhost:8787"),
  PREVIEW_BASE_URL: z.url().default("http://localhost:3100"),
  ALLOWED_HOSTS: z.string().default("localhost,127.0.0.1"),
  SUPABASE_URL: optionalUrl,
  SUPABASE_ANON_KEY: z.string().min(20).optional(),
  SUPABASE_JWT_AUDIENCE: z.string().default("authenticated"),
  MCP_REQUIRED_SCOPES: z.string().default("openid"),
  OPENAI_API_KEY: z.string().min(20).optional(),
  OPENAI_EMBEDDING_MODEL: z.string().regex(/^[a-zA-Z0-9._-]+$/).default("text-embedding-3-small"),
  ALLOW_INSECURE_DEV_AUTH: z.enum(["true", "false"]).default("false"),
});

export type AppConfig = ReturnType<typeof readConfig>;

export function readConfig(environment: NodeJS.ProcessEnv = process.env) {
  const parsed = schema.parse(environment);
  const publicBaseUrl = new URL(parsed.PUBLIC_BASE_URL);
  const previewBaseUrl = new URL(parsed.PREVIEW_BASE_URL);
  const allowInsecureDevAuth = parsed.ALLOW_INSECURE_DEV_AUTH === "true";
  const supabaseConfigured = Boolean(parsed.SUPABASE_URL && parsed.SUPABASE_ANON_KEY);

  if (parsed.NODE_ENV === "production") {
    if (publicBaseUrl.protocol !== "https:" || previewBaseUrl.protocol !== "https:") {
      throw new Error("Production public and preview URLs must use HTTPS");
    }
    if (!supabaseConfigured) {
      throw new Error("Production requires complete Supabase configuration");
    }
    if (allowInsecureDevAuth) throw new Error("Development authentication cannot be enabled in production");
  }

  return {
    ...parsed,
    publicBaseUrl,
    previewBaseUrl,
    allowedHosts: parsed.ALLOWED_HOSTS.split(",").map((value) => value.trim()).filter(Boolean),
    jwtAudiences: parsed.SUPABASE_JWT_AUDIENCE.split(",").map((value) => value.trim()).filter(Boolean),
    requiredScopes: parsed.MCP_REQUIRED_SCOPES.split(/[ ,]+/).map((value) => value.trim()).filter(Boolean),
    allowInsecureDevAuth,
    supabaseConfigured,
  };
}
