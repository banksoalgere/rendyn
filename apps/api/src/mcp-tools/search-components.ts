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
        "Find the most relevant, visually diverse UI implementations for a natural-language design request. Returns at most five and omits unrelated results.",
      inputSchema: z.object({
        query: z.string().trim().min(2).max(500),
        limit: z.number().int().min(1).max(5).default(5),
        category: z.enum(["motion", "agents", "blocks"]).optional(),
      }),
    },
    async ({ query, limit, category }) => {
      const results = await catalog.search(query, limit, category);
      const response = presentSearchResults(
        query,
        results,
        catalog,
        config.publicBaseUrl,
      );
      const content: SearchContent[] = [textContent(response)];
      const images = await previewMedia.loadMcpImages(
        results.map((result) => result.slug),
      );
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
