import { CatalogStore } from "@designmcp/catalog";
import { describe, expect, it } from "vitest";
import { catalogSnapshot } from "./generated/catalog-data.js";

describe("Worker catalogue snapshot", () => {
  it("loads the complete validated catalogue without filesystem access", async () => {
    const store = CatalogStore.fromSnapshot(catalogSnapshot);
    const component = await store.get("button");

    expect(store.index.components).toHaveLength(189);
    expect(component?.id).toBe("beui:button");
    await expect(store.readLicenseText(component!)).resolves.toContain("MIT License");
  });
});
