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
        "Return a complete component implementation for a trialing or paid subscriber: every source file, dependency, install instruction, integrity hash, and license notice.",
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
      inputSchema: z.object({
        id: z.string().trim().max(160).regex(COMPONENT_ID_PATTERN).describe('Use the exact id or slug returned by search_components or browse_category.'),
      }),
    },
    async ({ id }, context) => {
      const component = await catalog.store.get(id);
      if (!component) {
        return {
          isError: true,
          content: [textContent({ error: "component_not_found", id, message: 'Search for the component and use its returned id or slug. Do not guess an identifier.' })],
        };
      }

      const token = context.http?.authInfo?.token;
      if (!token) {
        return {
          isError: true,
          content: [textContent({ error: "authentication_required" })],
        };
      }

      let entitlement;
      try {
        entitlement = await entitlements.claimUser(token, component.slug);
      } catch {
        console.error(JSON.stringify({ message: 'component_access_check_failed', component: component.slug }));
        return {
          isError: true,
          content: [textContent({
            error: 'access_check_unavailable',
            message: 'Rendyn could not verify source access. Retry once. If it persists, check your account; do not start another checkout for an existing subscription.',
            account_url: 'https://rendyn.dev/account',
          })],
        };
      }
      if (!entitlement.allowed) {
        return {
          isError: true,
          content: [textContent({
            error: "subscription_required",
            message: "Start a 7-day Rendyn trial or restore a paid subscription to get component source.",
            checkout_url: "https://rendyn.dev/pricing",
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
