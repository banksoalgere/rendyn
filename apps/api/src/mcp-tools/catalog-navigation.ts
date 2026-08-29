import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";
import { presentBrowsePage } from "../catalog-presenter.js";
import type { McpDependencies } from "../mcp.js";
import { textContent } from "./response.js";

export function registerCatalogNavigationTools(
  server: McpServer,
  { catalog }: McpDependencies,
): void {
  server.registerTool(
    "list_categories",
    {
      description: "List catalogue categories and their current component counts.",
      inputSchema: z.object({}),
    },
    async () => ({
      content: [textContent({ categories: catalog.store.index.categories })],
    }),
  );

  server.registerTool(
    "browse_category",
    {
      description:
        "Browse a category in stable pages when broader exploration is more useful than search.",
      inputSchema: z.object({
        category: z.enum(["motion", "agents", "blocks"]),
        cursor: z.string().max(100).optional(),
        limit: z.number().int().min(1).max(50).default(20),
      }),
    },
    async ({ category, cursor, limit }) => {
      const page = catalog.browse(category, cursor, limit);
      return { content: [textContent(presentBrowsePage(page, catalog))] };
    },
  );
}
