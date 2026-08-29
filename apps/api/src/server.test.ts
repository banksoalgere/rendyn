import { beforeAll, describe, expect, it } from "vitest";
import { readConfig } from "./config.js";
import { buildApp } from "./server.js";

describe("HTTP API", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;
  const requestHeaders = { Host: "localhost", Origin: "http://localhost:8787" };

  beforeAll(async () => {
    app = await buildApp(readConfig({ NODE_ENV: "test" }));
  });

  it("reports catalogue readiness", async () => {
    const response = await app.request("http://localhost/health", { headers: requestHeaders });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      status: "ok",
      catalog_components: 80,
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
      preview_url: "http://localhost:3100/preview/motion/button",
    });
  });

  it("keeps source retrieval unavailable when entitlements are not configured", async () => {
    const response = await app.request("http://localhost/api/components/button/source", {
      headers: requestHeaders,
    });

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      error: "entitlements_not_configured",
    });
  });
});
