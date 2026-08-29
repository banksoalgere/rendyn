import type { Context } from "hono";
import { z } from "zod";

export const searchRequestSchema = z.object({
  q: z.string().trim().min(2).max(500),
  limit: z.coerce.number().int().min(1).max(5).default(5),
  category: z.enum(["motion", "agents", "blocks"]).optional(),
});

export const browseRequestSchema = z.object({
  cursor: z.string().max(100).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const contactSheetRequestSchema = z.object({
  ids: z.string().max(600).transform((value) =>
    value.split(",").map((slug) => slug.trim()).filter(Boolean).slice(0, 5),
  ),
});

export function jsonError(
  context: Context,
  status: 400 | 401 | 402 | 404 | 503,
  code: string,
  details?: unknown,
) {
  return context.json({ error: code, details }, status);
}
