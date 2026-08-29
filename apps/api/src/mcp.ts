import { McpServer } from "@modelcontextprotocol/server";
import type { AppConfig } from "./config.js";
import type { CatalogService } from "./catalog-service.js";
import type { EntitlementService } from "./entitlements.js";
import { registerCatalogNavigationTools } from "./mcp-tools/catalog-navigation.js";
import { registerGetComponentTool } from "./mcp-tools/get-component.js";
import { registerSearchComponentsTool } from "./mcp-tools/search-components.js";

export interface McpDependencies {
  config: AppConfig;
  catalog: CatalogService;
  entitlements: EntitlementService;
}

export function buildMcpServer(dependencies: McpDependencies): McpServer {
  const server = new McpServer({
    name: "designmcp",
    version: "0.1.0",
    title: "DesignMCP",
    description: "Search and retrieve high-quality React, TypeScript, and Tailwind UI source.",
  });

  registerSearchComponentsTool(server, dependencies);
  registerGetComponentTool(server, dependencies);
  registerCatalogNavigationTools(server, dependencies);

  return server;
}
