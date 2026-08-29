import { describe, expect, it } from "vitest";
import { searchCatalog } from "./search.js";
import type { CatalogComponentSummary, CatalogIndex } from "./types.js";

function component(
  slug: string,
  name: string,
  description: string,
  tags: string[],
  family = slug,
): CatalogComponentSummary {
  return {
    id: `beui:${slug}`,
    slug,
    name,
    description,
    category: "motion",
    publishedAt: "2026-01-01",
    updatedAt: "2026-01-01",
    dependencies: [],
    internalDependencies: [],
    metadata: {
      kind: "component",
      family,
      tags,
      aliases: [],
      interactions: [],
      useWhen: [description],
      notIdealWhen: [],
      visualSignature: tags.join(":"),
      searchText: `${name} ${description} ${tags.join(" ")}`,
    },
    previewPath: `/preview/motion/${slug}`,
    manifestPath: `components/${slug}/component.json`,
    integrity: "sha256:test",
  };
}

const index: CatalogIndex = {
  schemaVersion: 1,
  generatedAt: "2026-01-01T00:00:00.000Z",
  source: {
    id: "beui",
    name: "beUI",
    repository: "https://example.com",
    commit: "abc",
    registrySha256: "abc",
    importedAt: "2026-01-01T00:00:00.000Z",
    license: { spdx: "MIT", copyright: "Example", textPath: "LICENSE" },
  },
  categories: [],
  components: [
    component("bouncy-accordion", "Bouncy Accordion", "Spring disclosure rows", ["accordion", "spring"]),
    component("button", "Button", "Pressed action control", ["button", "action"]),
    component("animated-toast-stack", "Toast Stack", "Layered notifications", ["toast", "notification"]),
    component("context-menu", "Context Menu", "Right-click menu with action rows", ["menu", "action", "button"], "menu"),
  ],
};

describe("searchCatalog", () => {
  it("matches synonyms without an embedding index", () => {
    const results = searchCatalog(index, "collapsible FAQ with slow spring release");
    expect(results[0]?.slug).toBe("bouncy-accordion");
  });

  it("returns fewer than five when the rest are unrelated", () => {
    const results = searchCatalog(index, "notification toast");
    expect(results.map((item) => item.slug)).toContain("animated-toast-stack");
    expect(results.length).toBeLessThan(3);
  });

  it("does not admit another component family just because its docs mention buttons", () => {
    const results = searchCatalog(index, "button");
    expect(results.map((item) => item.slug)).toContain("button");
    expect(results.map((item) => item.slug)).not.toContain("context-menu");
  });

  it("rejects empty and oversized queries", () => {
    expect(searchCatalog(index, " ")).toEqual([]);
    expect(searchCatalog(index, "x".repeat(501))).toEqual([]);
  });
});
