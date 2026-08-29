import { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";
import type { AppConfig } from "./config.js";
import type { CatalogService } from "./catalog-service.js";
import type { EntitlementService } from "./entitlements.js";
import { buildContactSheet } from "./contact-sheet.js";
import { componentPayload } from "./component-payload.js";
import { presentBrowsePage, presentSearchResults } from "./catalog-presenter.js";

interface McpDependencies {
  config: AppConfig;
  catalog: CatalogService;
  entitlements: EntitlementService;
}

function text(value: unknown) {
  return { type: "text" as const, text: JSON.stringify(value, null, 2) };
}

export function buildMcpServer({ config, catalog, entitlements }: McpDependencies): McpServer {
  const server = new McpServer({
    name: "designmcp",
    version: "0.1.0",
    title: "DesignMCP",
    description: "Search and retrieve high-quality React, TypeScript, and Tailwind UI source.",
  });

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
      const payload = presentSearchResults(query, results, catalog, config.publicBaseUrl);
      const content: Array<
        | { type: "text"; text: string }
        | { type: "image"; data: string; mimeType: string }
      > = [text(payload)];
      const contactSheet = await buildContactSheet(
        catalog.store,
        results.map((result) => result.slug),
      );
      if (contactSheet) {
        content.push({ type: "image", data: contactSheet.toString("base64"), mimeType: "image/png" });
      }
      return { content };
    },
  );

  server.registerTool(
    "get_component",
    {
      description:
        "Unlock and return a complete component implementation: every source file, dependency, install instruction, integrity hash, and license notice.",
      inputSchema: z.object({
        id: z.string().trim().regex(/^(?:beui:)?[a-z0-9]+(?:-[a-z0-9]+)*$/),
      }),
    },
    async ({ id }, context) => {
      const slug = id.startsWith("beui:") ? id.slice(5) : id;
      const component = await catalog.store.get(slug);
      if (!component) return { isError: true, content: [text({ error: "component_not_found", slug })] };
      const token = context.http?.authInfo?.token;
      if (!token) return { isError: true, content: [text({ error: "authentication_required" })] };
      const grant = await entitlements.claimUser(token, slug);
      if (!grant.allowed) {
        return {
          isError: true,
          content: [
            text({
              error: "free_component_allowance_exhausted",
              message: "This component is not unlocked. Upgrade to the paid plan or wait for the next monthly allowance.",
              entitlement: grant,
            }),
          ],
        };
      }
      const licenseText = await catalog.store.readLicenseText(component);
      return {
        content: [
          text({
            component: componentPayload(
              component,
              catalog.previewUrl(component.previewPath),
              licenseText,
            ),
            entitlement: grant,
          }),
        ],
      };
    },
  );

  server.registerTool(
    "list_categories",
    {
      description: "List catalogue categories and their current component counts.",
      inputSchema: z.object({}),
    },
    async () => ({ content: [text({ categories: catalog.store.index.categories })] }),
  );

  server.registerTool(
    "browse_category",
    {
      description: "Browse a category in stable pages when broader exploration is more useful than search.",
      inputSchema: z.object({
        category: z.enum(["motion", "agents", "blocks"]),
        cursor: z.string().max(100).optional(),
        limit: z.number().int().min(1).max(50).default(20),
      }),
    },
    async ({ category, cursor, limit }) => {
      const page = catalog.browse(category, cursor, limit);
      return {
        content: [text(presentBrowsePage(page, catalog))],
      };
    },
  );

  return server;
}
