import type { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";
import { componentPayload } from "../component-payload.js";
import type { McpDependencies } from "../mcp.js";
import { textContent } from "./response.js";

const COMPONENT_ID_PATTERN = /^(?:[a-z0-9]+:)?[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function registerGetComponentTool(
  server: McpServer,
  { catalog, entitlements }: McpDependencies,
): void {
  server.registerTool(
    "get_component",
    {
      description:
        "Unlock and return a complete component implementation: every source file, dependency, install instruction, integrity hash, and license notice.",
      inputSchema: z.object({
        id: z.string().trim().regex(COMPONENT_ID_PATTERN),
      }),
    },
    async ({ id }, context) => {
      const component = await catalog.store.get(id);
      if (!component) {
        return {
          isError: true,
          content: [textContent({ error: "component_not_found", id })],
        };
      }

      const token = context.http?.authInfo?.token;
      if (!token) {
        return {
          isError: true,
          content: [textContent({ error: "authentication_required" })],
        };
      }

      const entitlement = await entitlements.claimUser(token, component.slug);
      if (!entitlement.allowed) {
        return {
          isError: true,
          content: [textContent({
            error: "free_component_allowance_exhausted",
            message:
              "This component is not unlocked. Upgrade to the paid plan or wait for the next monthly allowance.",
            entitlement,
          })],
        };
      }

      const licenseText = await catalog.store.readLicenseText(component);
      return {
        content: [textContent({
          component: componentPayload(
            component,
            catalog.previewUrl(component.previewPath),
            licenseText,
          ),
          entitlement,
        })],
      };
    },
  );
}
