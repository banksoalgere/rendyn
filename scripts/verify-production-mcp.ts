import { createServer, type Server } from "node:http";
import {
  Client,
  StreamableHTTPClientTransport,
  UnauthorizedError,
  type CallToolResult,
} from "@modelcontextprotocol/client";
import { ProductionOAuthProvider } from "./production-mcp-oauth-provider.js";

const endpoint = new URL(process.env.RENDYN_MCP_URL ?? "https://mcp.rendyn.dev/mcp");
const callbackUrl = new URL(
  process.env.RENDYN_OAUTH_CALLBACK ?? "http://127.0.0.1:8090/callback",
);
const componentId = process.env.RENDYN_VERIFY_COMPONENT?.trim();

if (endpoint.protocol !== "https:") throw new Error("Production MCP URL must use HTTPS");
if (callbackUrl.protocol !== "http:" || callbackUrl.hostname !== "127.0.0.1") {
  throw new Error("OAuth callback must use the 127.0.0.1 loopback address");
}
if (!componentId || !/^(?:[a-z0-9]+:)?[a-z0-9]+(?:-[a-z0-9]+)*$/.test(componentId)) {
  throw new Error("Set RENDYN_VERIFY_COMPONENT to the component this check may unlock");
}

function callbackServer(provider: ProductionOAuthProvider): {
  server: Server;
  callback: Promise<URLSearchParams>;
} {
  let resolveCallback!: (params: URLSearchParams) => void;
  let rejectCallback!: (error: Error) => void;
  const callback = new Promise<URLSearchParams>((resolve, reject) => {
    resolveCallback = resolve;
    rejectCallback = reject;
  });
  const server = createServer((request, response) => {
    try {
      if (request.method !== "GET" || !request.url || request.url.length > 8_192) {
        response.writeHead(400).end("Invalid OAuth callback");
        return;
      }
      const url = new URL(request.url, callbackUrl);
      if (url.pathname !== callbackUrl.pathname) {
        response.writeHead(404).end("Not found");
        return;
      }
      provider.assertState(url.searchParams.get("state"));
      const oauthError = url.searchParams.get("error");
      if (oauthError) throw new Error(`OAuth authorization failed: ${oauthError}`);
      if (!url.searchParams.get("code")) throw new Error("OAuth callback omitted its code");
      response.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Security-Policy": "default-src 'none'",
        "Cache-Control": "no-store",
      }).end("Rendyn authorization succeeded. You can return to Codex.");
      resolveCallback(url.searchParams);
    } catch (error) {
      response.writeHead(400, {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      }).end("Rendyn authorization failed.");
      rejectCallback(error instanceof Error ? error : new Error("OAuth callback failed"));
    }
  });
  return { server, callback };
}

async function listen(server: Server): Promise<void> {
  const port = Number(callbackUrl.port);
  if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
    throw new Error("OAuth callback port is invalid");
  }
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });
}

function textJson(result: CallToolResult): Record<string, unknown> {
  const text = result.content.find((item) => item.type === "text");
  if (!text || text.type !== "text") throw new Error("Tool response omitted JSON text");
  const parsed: unknown = JSON.parse(text.text);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Tool response JSON was not an object");
  }
  return parsed as Record<string, unknown>;
}

function arrayField(value: Record<string, unknown>, key: string): unknown[] {
  const field = value[key];
  if (!Array.isArray(field)) throw new Error(`Tool response omitted ${key}`);
  return field;
}

const provider = new ProductionOAuthProvider(callbackUrl);
const client = new Client({ name: "rendyn-production-verifier", version: "1.0.0" });

async function connect(): Promise<void> {
  const transport = new StreamableHTTPClientTransport(endpoint, { authProvider: provider });
  try {
    await client.connect(transport);
  } catch (error) {
    if (!(error instanceof UnauthorizedError)) throw error;
    if (!provider.authorizationUrl) throw new Error("OAuth flow did not provide an authorization URL");
    const { server, callback } = callbackServer(provider);
    await listen(server);
    process.stdout.write(`CALLBACK_LISTENING=${callbackUrl.toString()}\n`);
    try {
      const callbackParams = await callback;
      await transport.finishAuth(callbackParams);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
    await client.connect(new StreamableHTTPClientTransport(endpoint, { authProvider: provider }));
  }
}

try {
  await connect();

  const tools = await client.listTools();
  const toolNames = tools.tools.map((tool) => tool.name).sort();
  const expectedTools = ["browse_category", "get_component", "list_categories", "search_components"];
  if (JSON.stringify(toolNames) !== JSON.stringify(expectedTools)) {
    throw new Error(`Unexpected MCP tools: ${toolNames.join(", ")}`);
  }

  const categoriesResult = await client.callTool({ name: "list_categories", arguments: {} });
  const categories = arrayField(textJson(categoriesResult), "categories");
  if (categories.length !== 3) throw new Error("list_categories did not return three categories");

  const browseResult = await client.callTool({
    name: "browse_category",
    arguments: { category: "motion", limit: 2 },
  });
  const browse = textJson(browseResult);
  if (arrayField(browse, "items").length !== 2) {
    throw new Error("browse_category did not return its requested page");
  }

  const searchResult = await client.callTool({
    name: "search_components",
    arguments: { query: "animated button", limit: 3, include_previews: true },
  });
  const search = textJson(searchResult);
  if (typeof search.count !== "number" || search.count < 1) {
    throw new Error("search_components returned no relevant results");
  }
  if (!searchResult.content.some((item) => item.type === "image")) {
    throw new Error("search_components omitted preview images");
  }

  const componentResult = await client.callTool({
    name: "get_component",
    arguments: { id: componentId },
  });
  if (componentResult.isError) throw new Error("get_component returned a tool error");
  const componentPayload = textJson(componentResult);
  const component = componentPayload.component;
  const entitlement = componentPayload.entitlement;
  if (!component || typeof component !== "object" || Array.isArray(component)) {
    throw new Error("get_component omitted its component payload");
  }
  if (!entitlement || typeof entitlement !== "object" || Array.isArray(entitlement)) {
    throw new Error("get_component omitted its entitlement payload");
  }
  const componentRecord = component as Record<string, unknown>;
  const entitlementRecord = entitlement as Record<string, unknown>;
  if (!Array.isArray(componentRecord.files) || componentRecord.files.length < 1) {
    throw new Error("get_component returned no source files");
  }
  const license = componentRecord.license;
  if (!license || typeof license !== 'object' || !('text' in license)
    || typeof license.text !== 'string' || !license.text.includes('MIT License')) {
    throw new Error("get_component omitted its MIT licence text");
  }
  if (entitlementRecord.allowed !== true) throw new Error("get_component entitlement was not allowed");

  process.stdout.write(`${JSON.stringify({
    endpoint: endpoint.toString(),
    oauth: {
      dynamically_registered: provider.dynamicallyRegistered,
      authenticated: provider.authenticated,
    },
    tools: toolNames,
    list_categories: { count: categories.length },
    browse_category: { returned: arrayField(browse, "items").length, total: browse.total },
    search_components: {
      count: search.count,
      preview_images: searchResult.content.filter((item) => item.type === "image").length,
    },
    get_component: {
      id: componentRecord.id,
      files: componentRecord.files.length,
      entitlement_allowed: entitlementRecord.allowed,
    },
  }, null, 2)}\n`);
} finally {
  await client.close();
}
