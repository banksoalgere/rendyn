import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";
import {
  OAuthError,
  OAuthErrorCode,
  type AuthInfo,
} from "@modelcontextprotocol/server";
import type { AppConfig } from "./config.js";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function invalidToken(message: string): never {
  throw new OAuthError(OAuthErrorCode.InvalidToken, message);
}

function readScopes(payload: JWTPayload): string[] {
  const raw = payload.scope ?? payload.scopes;
  if (typeof raw === "string") return raw.split(" ").filter(Boolean);
  if (Array.isArray(raw)) return raw.filter((value): value is string => typeof value === "string");
  return [];
}

export class SupabaseTokenVerifier {
  private readonly jwks;
  private readonly issuer: string | null;

  constructor(private readonly config: AppConfig) {
    this.issuer = config.SUPABASE_URL ? `${config.SUPABASE_URL.replace(/\/$/, "")}/auth/v1` : null;
    this.jwks = this.issuer
      ? createRemoteJWKSet(new URL(`${this.issuer}/.well-known/jwks.json`), {
          cooldownDuration: 30_000,
          timeoutDuration: 5_000,
        })
      : null;
  }

  async verifyAccessToken(token: string): Promise<AuthInfo> {
    if (this.config.allowInsecureDevAuth && token.startsWith("dev:")) {
      const userId = token.slice(4);
      if (!UUID_PATTERN.test(userId)) invalidToken("Malformed development user ID");
      return {
        token,
        clientId: userId,
        scopes: this.config.requiredScopes,
        expiresAt: Math.floor(Date.now() / 1000) + 3_600,
      };
    }

    if (!this.jwks || !this.issuer) invalidToken("Supabase OAuth is not configured");
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
        audience: this.config.jwtAudiences,
        algorithms: ["RS256", "ES256"],
        clockTolerance: 5,
      });
      if (!payload.sub || !payload.exp) invalidToken("Token is missing required claims");
      const clientId = typeof payload.client_id === "string" ? payload.client_id : payload.sub;
      return {
        token,
        clientId,
        scopes: readScopes(payload),
        expiresAt: payload.exp,
      };
    } catch (error) {
      if (error instanceof OAuthError) throw error;
      invalidToken("Token signature or claims are invalid");
    }
  }
}

export function bearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header) return null;
  const match = /^Bearer ([^\s]+)$/i.exec(header);
  return match?.[1] ?? null;
}
