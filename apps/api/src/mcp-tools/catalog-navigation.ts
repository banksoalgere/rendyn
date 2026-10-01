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
      description: "Discover the catalogue: motion contains individual components including buttons, bento grids and hero video; agents contains AI interfaces; blocks contains composed UI. Categories describe packaging, not page sections. Search across all categories first.",
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
      inputSchema: z.object({}),
    },
    async () => ({
      content: [textContent({
        categories: catalog.store.index.categories.map(category => ({
          ...category,
          ...(category.slug === 'motion' ? { name: 'Components & motion', description: 'Individual UI pieces, from buttons and accordions to bento grids and hero video. This is not a motion-only filter.' } : {}),
        })),
        suggested_workflow: ['Search one UI need without a category filter.', 'Compare the preview links, or request include_previews=true.', 'Call get_component with a returned id to receive its source and setup instructions.'],
      })],
    }),
  );

  server.registerTool(
    "browse_category",
    {
      description:
        "Browse a category in stable pages when broader exploration is more useful than search.",
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
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
