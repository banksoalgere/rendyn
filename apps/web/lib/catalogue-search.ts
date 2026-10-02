import type { ComponentPreviewData } from './component-preview';
import { MAX_QUERY_LENGTH, rankCatalog } from '../../../packages/catalog/src/search';
import type { SearchComponent } from '../../../packages/catalog/src/types';

export const categoryLabels = {
  motion: 'Interaction',
  agents: 'Agent UI',
  blocks: 'Components & blocks',
} as const;

export interface CatalogueComponent extends ComponentPreviewData {
  category: keyof typeof categoryLabels;
  description: string;
  tags: string[];
  aliases?: string[];
  search: SearchComponent;
}

export interface CatalogueFilters {
  query: string;
  category: 'all' | keyof typeof categoryLabels;
  page: number;
}

export const CATALOGUE_PAGE_SIZE = 6;
export const MAX_SEARCH_LENGTH = MAX_QUERY_LENGTH;

type SearchParameters = Record<string, string | string[] | undefined>;

export function getCatalogueFilters(parameters: SearchParameters): CatalogueFilters {
  const query = typeof parameters.q === 'string' ? parameters.q.slice(0, MAX_SEARCH_LENGTH).trim() : '';
  const category = parameters.category;
  const page = typeof parameters.page === 'string' && /^[1-9]\d{0,5}$/.test(parameters.page)
    ? Number(parameters.page) : 1;

  return {
    query,
    category: category === 'motion' || category === 'agents' || category === 'blocks' ? category : 'all',
    page,
  };
}

export function catalogueHref({ query, category, page }: CatalogueFilters): string {
  const parameters = new URLSearchParams();
  if (query.trim()) parameters.set('q', query.trim());
  if (category !== 'all') parameters.set('category', category);
  if (page > 1) parameters.set('page', String(page));
  const search = parameters.toString();
  return `/components${search ? `?${search}` : ''}`;
}

export function createCatalogueSearchIndex(components: CatalogueComponent[]) {
  return {
    components,
    catalog: { components: components.map(component => component.search) },
    bySlug: new Map(components.map(component => [component.search.slug, component])),
  };
}

type SearchIndex = ReturnType<typeof createCatalogueSearchIndex>;

export function searchCatalogue(index: SearchIndex, query: string, category: CatalogueFilters['category']) {
  if (!query.trim()) return index.components.filter(component => category === 'all' || component.category === category);
  return rankCatalog(index.catalog, query.slice(0, MAX_SEARCH_LENGTH), {
    category: category === 'all' ? undefined : category,
  }).flatMap(result => {
    const component = index.bySlug.get(result.slug);
    return component ? [component] : [];
  });
}

export function getCataloguePage(index: SearchIndex, filters: CatalogueFilters) {
  const matches = searchCatalogue(index, filters.query, filters.category);
  const pageCount = Math.max(1, Math.ceil(matches.length / CATALOGUE_PAGE_SIZE));
  const page = Math.min(filters.page, pageCount);
  const start = (page - 1) * CATALOGUE_PAGE_SIZE;
  const otherCategoryMatches = matches.length === 0 && filters.category !== 'all'
    ? searchCatalogue(index, filters.query, 'all').length : 0;
  return { components: matches.slice(start, start + CATALOGUE_PAGE_SIZE), total: matches.length, page, pageCount, start, otherCategoryMatches };
}
