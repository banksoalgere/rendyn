import { describe, expect, it } from 'vitest';
import { catalogueEntries } from './catalogue';
import {
  catalogueHref, createCatalogueSearchIndex, getCatalogueFilters, getCataloguePage,
  MAX_SEARCH_LENGTH, searchCatalogue, type CatalogueComponent,
} from './catalogue-search';

const components: CatalogueComponent[] = catalogueEntries.map((component) => ({
  ...component,
  tags: component.metadata.tags,
  aliases: component.metadata.aliases,
}));
const index = createCatalogueSearchIndex(components);

describe('catalogue discovery', () => {
  it('ranks exact names ahead of components that only mention the same word', () => {
    const results = searchCatalogue(index, 'button', 'all');
    expect(results[0].name).toBe('Button');
    expect(results.length).toBeGreaterThan(1);
  });

  it('matches plurals, prefixes and words across different fields', () => {
    const results = searchCatalogue(index, 'React data tables', 'all');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe('Table');
    expect(searchCatalogue(index, 'table data', 'all')).toEqual(results);
    expect(searchCatalogue(index, 'approv', 'all')[0].name).toBe('Approval Card');
  });

  it('uses aliases to find AI chat and requires every meaningful word to match', () => {
    expect(searchCatalogue(index, 'AI chat', 'all')[0].name).toBe('Chat App');
    expect(searchCatalogue(index, 'button nonexistentpattern', 'all')).toEqual([]);
  });

  it('applies category filters and exposes every entry through bounded pages', () => {
    const agents = searchCatalogue(index, '', 'agents');
    expect(agents.length).toBeGreaterThan(6);
    expect(agents.every((component) => component.category === 'agents')).toBe(true);
    const first = getCataloguePage(index, { query: '', category: 'all', page: 1 });
    const pages = Array.from({ length: first.pageCount }, (_, page) => (
      getCataloguePage(index, { query: '', category: 'all', page: page + 1 }).components
    ));
    expect(pages.every((page) => page.length <= 6)).toBe(true);
    expect(pages.flat().map((component) => component.publicSlug)).toEqual(components.map((component) => component.publicSlug));
    expect(getCataloguePage(index, { query: '', category: 'all', page: 999999 }).page).toBe(first.pageCount);
  });
});

describe('search URL validation', () => {
  it('bounds user input and falls back safely for malformed or repeated parameters', () => {
    expect(getCatalogueFilters({ q: ['button', 'chat'], category: '__proto__', page: '-1' }))
      .toEqual({ query: '', category: 'all', page: 1 });
    expect(getCatalogueFilters({ q: 'x'.repeat(1000), page: 'Infinity' }).query).toHaveLength(MAX_SEARCH_LENGTH);
    expect(getCatalogueFilters({ page: '2.5' }).page).toBe(1);
  });

  it('round-trips filters without allowing query text to inject URL parameters', () => {
    const filters = { query: 'chat &category=agents #<script>', category: 'motion' as const, page: 2 };
    const href = catalogueHref(filters);
    expect(href).not.toContain('<script>');
    expect(getCatalogueFilters(Object.fromEntries(new URL(href, 'https://rendyn.dev').searchParams))).toEqual(filters);
    expect(catalogueHref({ query: '', category: 'all', page: 1 })).toBe('/components');
  });
});
