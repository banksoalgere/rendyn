'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  catalogueHref, categoryLabels, createCatalogueSearchIndex, getCatalogueFilters,
  searchCatalogue, MAX_SEARCH_LENGTH, type CatalogueComponent, type CatalogueFilters,
} from '../../lib/catalogue-search';
import { trackSearch } from '../../lib/analytics';
import { CatalogueBrowser } from './catalogue-browser';
import styles from './components.module.css';

export type { CatalogueComponent } from '../../lib/catalogue-search';

interface ComponentExplorerProps {
  components: CatalogueComponent[];
  initialCategory: string;
  initialQuery?: string;
  initialPage?: number;
}


export function ComponentExplorer({
  components, initialCategory, initialQuery = '', initialPage = 1,
}: ComponentExplorerProps) {
  const [filters, setFilters] = useState(() => getCatalogueFilters({
    q: initialQuery, category: initialCategory, page: String(initialPage),
  }));
  const explorerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchIndex = useMemo(() => createCatalogueSearchIndex(components), [components]);
  const matches = useMemo(() => searchCatalogue(searchIndex, filters.query, filters.category), [searchIndex, filters]);
  const results = {
    total: matches.length,
    otherCategoryMatches: matches.length === 0 && filters.category !== 'all'
      ? searchCatalogue(searchIndex, filters.query, 'all').length : 0,
  };
  const isFiltered = Boolean(filters.query.trim()) || filters.category !== 'all';
  const currentHref = catalogueHref({ ...filters, page: 1 });

  function updateFilters(query: string, category: CatalogueFilters['category']) {
    const explorer = explorerRef.current;
    if (explorer && explorer.getBoundingClientRect().top < 0) {
      explorer.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    setFilters({ query: query.slice(0, MAX_SEARCH_LENGTH), category, page: 1 });
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    const restoreFilters = () => setFilters(getCatalogueFilters(
      Object.fromEntries(new URLSearchParams(window.location.search)),
    ));
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', restoreFilters);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', restoreFilters);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.history.replaceState(window.history.state, '', `${currentHref}${window.location.hash}`);
    }, 200);
    return () => window.clearTimeout(timer);
  }, [currentHref]);

  useEffect(() => {
    const timer = window.setTimeout(() => trackSearch(filters.query, filters.category, results.total), 600);
    return () => window.clearTimeout(timer);
  }, [filters.query, filters.category, results.total]);

  return (
    <section className={styles.explorer} aria-label="Interactive component catalogue" ref={explorerRef}>
      <div className={styles.controlBar}>
        <h1 className={styles.libraryTitle}>Component library</h1>
        <form action="/components" method="get" role="search" className={styles.search} onSubmit={(event) => {
          event.preventDefault();
          window.history.replaceState(window.history.state, '', currentHref);
        }}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
          <label className={styles.visuallyHidden} htmlFor="component-search">Search components</label>
          <input
            id="component-search"
            name="q"
            maxLength={MAX_SEARCH_LENGTH}
            onChange={(event) => updateFilters(event.target.value, filters.category)}
            placeholder="What are you building?"
            ref={searchInputRef}
            type="search"
            autoComplete="off"
            spellCheck={false}
            aria-controls="component-results"
            value={filters.query}
          />
          {filters.category !== 'all' && <input name="category" type="hidden" value={filters.category} />}
          <kbd aria-hidden="true">⌘ K</kbd>
          <button className={styles.searchSubmit} type="submit">Search</button>
        </form>

        <div aria-label="Filter by category" className={styles.categoryDock} role="group">
          <button data-analytics-action="filter-all" aria-pressed={filters.category === 'all'} onClick={() => updateFilters(filters.query, 'all')} type="button">All</button>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <button
              data-analytics-action={`filter-${value}`}
              aria-pressed={filters.category === value}
              key={value}
              onClick={() => updateFilters(filters.query, value as CatalogueFilters['category'])}
              type="button"
            >{label}</button>
          ))}
        </div>
      </div>

      <div className={styles.results} id="component-results">
        <div className={styles.resultsHeading}>
          <div>
            <p role="status" aria-live="polite">{results.total} components · Choose a component to preview.</p>
          </div>
          {isFiltered && <button className={styles.reset} data-analytics-action="clear-search" onClick={() => updateFilters('', 'all')} type="button">Reset filters</button>}
        </div>

        <CatalogueBrowser components={matches} />

        {results.total === 0 && (
          <div className={styles.emptyState}>
            <h3>No components found</h3>
            <p>{results.otherCategoryMatches
              ? `${results.otherCategoryMatches} ${results.otherCategoryMatches === 1 ? 'match is' : 'matches are'} available in other categories.`
              : 'Try a component name or a single interaction, such as “approval before an agent acts”. Some patterns are not in the collection yet.'}</p>
            {results.otherCategoryMatches > 0
              ? <button onClick={() => updateFilters(filters.query, 'all')} type="button">Search all categories</button>
              : <button data-analytics-action="clear-search" onClick={() => updateFilters('', 'all')} type="button">Clear search and filters</button>}
          </div>
        )}
      </div>
    </section>
  );
}
