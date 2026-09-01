import { beforeAll, describe, expect, it } from "vitest";
import { readConfig } from "./config.js";
import { buildNodeApp } from "./node-app.js";

describe("HTTP API", () => {
  let app: Awaited<ReturnType<typeof buildNodeApp>>;
  const requestHeaders = { Host: "localhost", Origin: "http://localhost:8787" };

  beforeAll(async () => {
    app = await buildNodeApp(readConfig({ NODE_ENV: "test" }));
  });

  it("reports catalogue readiness", async () => {
    const response = await app.request("http://localhost/health", { headers: requestHeaders });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      status: "ok",
      catalog_components: 189,
    });
  });

  it("rejects malformed search requests at the route boundary", async () => {
    const response = await app.request("http://localhost/api/search?q=x&limit=99", {
      headers: requestHeaders,
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ error: "invalid_search" });
  });

  it("returns normalized public component metadata", async () => {
    const response = await app.request("http://localhost/api/components/button", {
      headers: requestHeaders,
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      id: "beui:button",
      slug: "button",
      preview_url: "http://localhost:3100/component-preview/002",
    });
  });

  it("requires authentication before source retrieval", async () => {
    const response = await app.request("http://localhost/api/components/button/source", {
      headers: requestHeaders,
    });

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toMatchObject({
      error: "authentication_required",
    });
  });

  it("requires bearer authentication before any MCP request is dispatched", async () => {
    const response = await app.request("http://localhost/mcp", {
      method: "POST",
      headers: {
        ...requestHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/list",
        params: {},
      }),
    });

    expect(response.status).toBe(401);
    expect(response.headers.get("www-authenticate")).toContain("Bearer");
  });
});
