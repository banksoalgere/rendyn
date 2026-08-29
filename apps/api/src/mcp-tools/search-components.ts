import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";
import { presentSearchResults } from "../catalog-presenter.js";
import { buildContactSheet } from "../contact-sheet.js";
import type { McpDependencies } from "../mcp.js";
import { textContent, type TextContent } from "./response.js";

type SearchContent =
  | TextContent
  | { type: "image"; data: string; mimeType: "image/png" };

export function registerSearchComponentsTool(
  server: McpServer,
  { config, catalog }: McpDependencies,
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
      const contactSheet = await buildContactSheet(
        catalog.store,
        results.map((result) => result.slug),
      );

      if (contactSheet) {
        content.push({
          type: "image",
          data: contactSheet.toString("base64"),
          mimeType: "image/png",
        });
      }

      return { content };
    },
  );
}
