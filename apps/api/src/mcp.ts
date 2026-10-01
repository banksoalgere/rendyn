import { McpServer } from "@modelcontextprotocol/server";
import type { AppConfig } from "./config.js";
import type { CatalogService } from "./catalog-service.js";
import type { EntitlementService } from "./entitlements.js";
import type { PreviewMedia } from "./preview-media.js";
import { registerCatalogNavigationTools } from "./mcp-tools/catalog-navigation.js";
import { registerGetComponentTool } from "./mcp-tools/get-component.js";
import { registerSearchComponentsTool } from "./mcp-tools/search-components.js";

export interface McpDependencies {
  config: AppConfig;
  catalog: CatalogService;
  entitlements: EntitlementService;
  previewMedia: PreviewMedia;
}

export function buildMcpServer(dependencies: McpDependencies): McpServer {
  const server = new McpServer({
    name: "rendyn",
    version: "0.1.0",
    title: "Rendyn",
    description: "Search and retrieve high-quality React, TypeScript, and Tailwind UI source.",
  }, {
    instructions: 'Use Rendyn to find and implement React UI from the existing catalogue. Search one UI need at a time using a natural design brief. Omit category initially: hero video and bento grids are individual components in motion. Search returns compact metadata by default; include_previews=true opts into images. Call get_component with the returned id for source. Respect no-match responses and explain catalogue gaps instead of choosing an unrelated result. Preserve all licence notices and verify fit in the target app.',
  });

  registerSearchComponentsTool(server, dependencies);
  registerGetComponentTool(server, dependencies);
  registerCatalogNavigationTools(server, dependencies);

  return server;
}
