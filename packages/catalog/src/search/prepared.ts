import { expandedQueryTokens, tokenize } from '../text.js';
import type { CatalogComponentSummary, CatalogIndex } from '../types.js';

const componentCache = new WeakMap<CatalogComponentSummary, ReturnType<typeof prepareComponent>>();
const familyCache = new WeakMap<CatalogIndex, Set<string>>();

function prepareComponent(component: CatalogComponentSummary) {
  return {
    name: new Set(tokenize(`${component.name} ${component.slug}`)),
    description: new Set(tokenize(component.description)),
    metadata: new Set(tokenize([
      ...component.metadata.tags, ...component.metadata.aliases,
      ...component.metadata.interactions, ...component.metadata.useWhen,
      component.metadata.searchText,
    ].join(' '))),
    diversity: new Set(tokenize(component.metadata.searchText)),
    searchText: component.metadata.searchText.toLowerCase(),
    lowerName: component.name.toLowerCase(),
  };
}

export function componentTokens(component: CatalogComponentSummary) {
  let prepared = componentCache.get(component);
  if (!prepared) { prepared = prepareComponent(component); componentCache.set(component, prepared); }
  return prepared;
}

/** Catalogue snapshots are immutable; derived data lives only as long as its snapshot. */
export function prepareSearchIndex(catalog: CatalogIndex) {
  let families = familyCache.get(catalog);
  if (!families) {
    families = new Set(catalog.components.map(component => {
      componentTokens(component);
      return component.metadata.family;
    }));
    familyCache.set(catalog, families);
  }
  return families;
}

export function prepareQuery(query: string) {
  return { normalized: query.trim().toLowerCase(), tokens: expandedQueryTokens(query), direct: tokenize(query) };
}
export type PreparedQuery = ReturnType<typeof prepareQuery>;
