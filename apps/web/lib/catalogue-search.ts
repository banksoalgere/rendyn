import type { ComponentPreviewData } from './component-preview';

export const categoryLabels = {
  motion: 'Interaction',
  agents: 'Agent UI',
  blocks: 'Product blocks',
} as const;

export interface CatalogueComponent extends ComponentPreviewData {
  category: keyof typeof categoryLabels;
  description: string;
  tags: string[];
  aliases?: string[];
}

export interface CatalogueFilters {
  query: string;
  category: 'all' | keyof typeof categoryLabels;
  page: number;
}

export const CATALOGUE_PAGE_SIZE = 6;
export const MAX_SEARCH_LENGTH = 120;

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

function normalize(value: string): string {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ').trim();
}

function tokens(value: string): string[] {
  return normalize(value).split(/\s+/).filter(Boolean)
    .map((word) => word.length > 3 && !word.endsWith('ss') ? word.replace(/s$/, '') : word);
}

// Normalize once per catalogue, rather than once per component on every keystroke.
export function createCatalogueSearchIndex(components: CatalogueComponent[]) {
  return components.map((component) => ({
    component,
    name: tokens(component.name),
    keywords: tokens([...component.tags, ...(component.aliases ?? [])].join(' ')),
    description: tokens(component.description),
    category: tokens(`${component.category} ${categoryLabels[component.category]}`),
  }));
}

type SearchIndex = ReturnType<typeof createCatalogueSearchIndex>;
const queryStopWords = new Set(['a', 'an', 'the', 'with', 'for', 'and', 'react', 'typescript', 'tailwind', 'css', 'ui', 'component']);

function matchScore(words: string[], term: string, weight: number): number {
  if (words.includes(term)) return weight;
  return term.length >= 3 && words.some((word) => word.startsWith(term)) ? weight / 2 : 0;
}

export function searchCatalogue(index: SearchIndex, query: string, category: CatalogueFilters['category']) {
  const terms = [...new Set(tokens(query.slice(0, MAX_SEARCH_LENGTH)).filter((term) => !queryStopWords.has(term)))];
  const candidates = index.filter(({ component }) => category === 'all' || component.category === category);
  if (terms.length === 0) return candidates.map(({ component }) => component);

  return candidates.map((entry) => {
    const scores = terms.map((term) => Math.max(
      matchScore(entry.name, term, 12),
      matchScore(entry.keywords, term, 6),
      matchScore(entry.description, term, 2),
      matchScore(entry.category, term, 1),
    ));
    // All words must match, but can appear in different fields or a different order.
    const score = scores.every((value) => value > 0)
      ? scores.reduce((total, value) => total + value, 0)
        + (entry.name.join(' ') === terms.join(' ') ? 24 : 0)
      : 0;
    return { component: entry.component, score };
  }).filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .map(({ component }) => component);
}

export function getCataloguePage(index: SearchIndex, filters: CatalogueFilters) {
  const matches = searchCatalogue(index, filters.query, filters.category);
  const pageCount = Math.max(1, Math.ceil(matches.length / CATALOGUE_PAGE_SIZE));
  const page = Math.min(filters.page, pageCount);
  const start = (page - 1) * CATALOGUE_PAGE_SIZE;
  return { components: matches.slice(start, start + CATALOGUE_PAGE_SIZE), total: matches.length, page, pageCount, start };
}
