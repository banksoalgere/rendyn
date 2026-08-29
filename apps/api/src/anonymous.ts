import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import type { AppConfig } from "./config.js";

const COOKIE_NAME = "designmcp_anon";
const ID_PATTERN = /^[A-Za-z0-9_-]{32,64}$/;

function sign(id: string, secret: string): string {
  return createHmac("sha256", secret).update(id).digest("base64url");
}

function verify(value: string, secret: string): string | null {
  const [id, signature, ...rest] = value.split(".");
  if (rest.length || !id || !signature || !ID_PATTERN.test(id)) return null;
  const expected = Buffer.from(sign(id, secret));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
  return id;
}

export function anonymousIdentity(c: Context, config: AppConfig): string {
  const secret = config.ANONYMOUS_COOKIE_SECRET;
  if (!secret) throw new Error("Anonymous browser access is not configured");
  const current = getCookie(c, COOKIE_NAME);
  const existingId = current ? verify(current, secret) : null;
  const id = existingId ?? randomBytes(24).toString("base64url");
  if (!existingId) {
    setCookie(c, COOKIE_NAME, `${id}.${sign(id, secret)}`, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 2,
    });
  }
  return createHmac("sha256", secret).update(id).digest("hex");
}
