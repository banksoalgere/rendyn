import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { resolveCatalogPath } from "./path.js";
import { CatalogStore } from "./store.js";

describe("catalog data boundary", () => {
  it("loads and validates the checked-in catalogue", async () => {
    const store = await CatalogStore.load(resolve(import.meta.dirname, "../../../catalog"));

    expect(store.index.components).toHaveLength(80);
    expect(store.hasCategory("motion")).toBe(true);
    expect(store.hasCategory("unknown")).toBe(false);
  });

  it("resolves safe relative paths inside the catalogue root", () => {
    const root = resolve(import.meta.dirname, "../../../catalog");

    expect(resolveCatalogPath(root, "components/button/component.json")).toBe(
      resolve(root, "components/button/component.json"),
    );
  });

  it.each(["../outside.json", "/absolute.json", "nested\\windows.json", "nested/../../outside.json"])(
    "rejects unsafe catalogue path %s",
    (relativePath) => {
      expect(() => resolveCatalogPath("/tmp/catalog", relativePath)).toThrow(/catalogue path/i);
    },
  );
});
