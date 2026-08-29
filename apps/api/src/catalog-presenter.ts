import type {
  BrowsePage,
  CatalogComponentSummary,
  SearchResult,
} from "@designmcp/catalog";
import type { CatalogService } from "./catalog-service.js";

export function presentSearchResults(
  query: string,
  results: SearchResult[],
  catalog: CatalogService,
  publicBaseUrl: URL,
) {
  return {
    query,
    count: results.length,
    results: results.map((result) => ({
      ...result,
      preview_url: catalog.previewUrl(result.previewPath),
    })),
    contact_sheet_url: results.length
      ? new URL(
          `/api/previews/contact-sheet?ids=${encodeURIComponent(results.map((result) => result.slug).join(","))}`,
          publicBaseUrl,
        ).toString()
      : null,
  };
}

export function presentBrowsePage(page: BrowsePage, catalog: CatalogService) {
  return {
    ...page,
    items: page.items.map((item) => presentComponentSummary(item, catalog)),
  };
}

export function presentComponentSummary(
  component: CatalogComponentSummary,
  catalog: CatalogService,
) {
  return {
    id: component.id,
    slug: component.slug,
    name: component.name,
    description: component.description,
    category: component.category,
    tags: component.metadata.tags,
    preview_url: catalog.previewUrl(component.previewPath),
  };
}

export function presentComponentMetadata(
  component: CatalogComponentSummary,
  catalog: CatalogService,
) {
  return {
    id: component.id,
    slug: component.slug,
    name: component.name,
    description: component.description,
    category: component.category,
    metadata: component.metadata,
    dependencies: component.dependencies,
    preview_url: catalog.previewUrl(component.previewPath),
  };
}
