import { CatalogStore } from "@rendyn/catalog";
import { describe, expect, it } from "vitest";
import { catalogSnapshot } from "./generated/catalog-data.js";
import libraries from '../../../sources/libraries.json';

const expectedCatalogueCount = 189 + libraries.reduce((n,c)=>n+c.components.length,0);

describe("Worker catalogue snapshot", () => {
  it("loads the complete validated catalogue without filesystem access", async () => {
    const store = CatalogStore.fromSnapshot(catalogSnapshot);
    const component = await store.get("button");

    expect(store.index.components).toHaveLength(expectedCatalogueCount);
    expect(component?.id).toBe("beui:button");
    await expect(store.readLicenseText(component!)).resolves.toContain("MIT License");
  });

  it('serves each new library with its complete source bundle, installation and MIT notice', async () => {
    const store = CatalogStore.fromSnapshot(catalogSnapshot);
    for (const library of libraries) {
      for (const example of library.components) {
        const component = await store.get(`${library.id}:${example.slug}`);
        for (const dependency of example.dependencies ?? library.dependencies) expect(component?.install.dependencyCommand).toContain(dependency);
        expect(component?.files.map(file => file.path)).toEqual(expect.arrayContaining(example.files.map(file => file.path)));
        expect(component?.files.some(file => file.type === 'preview')).toBe(true);
        await expect(store.readLicenseText(component!)).resolves.toContain(library.license.copyright);
      }
    }
  });
});
