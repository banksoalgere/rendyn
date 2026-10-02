import type { McpServer } from "@modelcontextprotocol/server";
import { Buffer } from "node:buffer";
import * as z from "zod/v4";
import { presentSearchResults } from "../catalog-presenter.js";
import type { McpDependencies } from "../mcp.js";
import { textContent, type TextContent } from "./response.js";

type SearchContent =
  | TextContent
  | { type: "image"; data: string; mimeType: string };

export function registerSearchComponentsTool(
  server: McpServer,
  { config, catalog, previewMedia }: McpDependencies,
): void {
  server.registerTool(
    "search_components",
    {
      description:
        "Find UI components for a design brief, such as 'a calm CTA button with hover feedback' or 'an FAQ accordion'. Search one UI need at a time; omit category unless you need a strict filter. Returns ranked matches with purpose, kind, family, tags, aliases, interactions, example count, source-derived visual traits, preview links and the next retrieval call. Visual traits describe source observations across examples, not a verified screenshot or guarantees about every variant. No match means the catalogue may not cover that need. Set include_previews=true to see images after narrowing your choices.",
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
      inputSchema: z.object({
        query: z.string().trim().min(2).max(500),
        limit: z.number().int().min(1).max(5).default(5),
        category: z.enum(["motion", "agents", "blocks"]).optional(),
        include_previews: z.boolean().default(false),
      }),
    },
    async ({ query, limit, category, include_previews }) => {
      const results = await catalog.search(query, limit, category);
      const response = presentSearchResults(
        query,
        results,
        catalog,
        config.publicBaseUrl,
      );
      const unfiltered = category && results.length === 0 ? await catalog.search(query, limit) : [];
      const content: SearchContent[] = [textContent({
        ...response,
        ...(!results.length ? {
          message: unfiltered.length
            ? `No close matches in ${category}; relevant components exist in other categories. Remove the category filter.`
            : 'No close match in the current catalogue. Do not substitute an unrelated component. Browse categories for alternatives, or compose this section using the available building blocks.',
          ...(unfiltered.length ? { suggested_search: { tool: 'search_components', arguments: { query, limit } } } : {}),
        } : {}),
      })];
      const images = include_previews ? await previewMedia.loadMcpImages(
        results.map((result) => result.slug),
      ) : [];
      for (const image of images) {
        content.push({
          type: "image",
          data: Buffer.from(image.data).toString("base64"),
          mimeType: image.mimeType,
        });
      }

      return { content };
    },
  );
}
