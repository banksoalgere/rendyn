'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  catalogueHref, categoryLabels, createCatalogueSearchIndex, getCatalogueFilters,
  getCataloguePage, MAX_SEARCH_LENGTH, type CatalogueComponent, type CatalogueFilters,
} from '../../lib/catalogue-search';
import { trackSearch } from '../../lib/analytics';
import { ComponentPreview } from './component-preview';
import styles from './components.module.css';

export type { CatalogueComponent } from '../../lib/catalogue-search';

interface ComponentExplorerProps {
  components: CatalogueComponent[];
  initialCategory: string;
  initialQuery?: string;
  initialPage?: number;
}

const suggestedSearches = ['Subtle hover button', 'Keyboard command menu', 'AI chat', 'Data tables'];

export function ComponentExplorer({
  components, initialCategory, initialQuery = '', initialPage = 1,
}: ComponentExplorerProps) {
  const [filters, setFilters] = useState(() => getCatalogueFilters({
    q: initialQuery, category: initialCategory, page: String(initialPage),
  }));
  const explorerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchIndex = useMemo(() => createCatalogueSearchIndex(components), [components]);
  const results = useMemo(() => getCataloguePage(searchIndex, filters), [searchIndex, filters]);
  const isFiltered = Boolean(filters.query.trim()) || filters.category !== 'all';
  const isFeatured = !isFiltered && results.page === 1;
  const currentHref = catalogueHref({ ...filters, page: results.page });

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
            aria-describedby="component-search-hint"
            value={filters.query}
          />
          {filters.category !== 'all' && <input name="category" type="hidden" value={filters.category} />}
          <kbd aria-hidden="true">⌘ K</kbd>
          <button className={styles.searchSubmit} type="submit">Search</button>
        </form>

        <p className={styles.searchHint} id="component-search-hint">Describe the interaction you need, or search by name.</p>

        <div className={styles.suggestions} aria-label="Suggested searches">
          <span>Try</span>
          {suggestedSearches.map((query) => (
            <button key={query} type="button" onClick={() => updateFilters(query, 'all')}>{query}</button>
          ))}
        </div>

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
            <h2>{isFeatured ? 'A few favourites' : filters.query.trim() ? 'Search results' : filters.category === 'all' ? 'More to explore' : categoryLabels[filters.category]}</h2>
            <p role="status" aria-live="polite" aria-atomic="true">
              {isFeatured ? 'A small selection to get you started.' : `${results.total} ${results.total === 1 ? 'match' : 'matches'}${results.total ? ` · ${results.start + 1}–${results.start + results.components.length} shown` : ''}`}
            </p>
          </div>
          {isFiltered && <button className={styles.reset} data-analytics-action="clear-search" onClick={() => updateFilters('', 'all')} type="button">Reset filters <span aria-hidden="true">↗</span></button>}
        </div>

        <div className={styles.componentGrid} aria-label="Component results">
          {results.components.map((component, index) => (
            <article className={styles.componentLink} key={component.publicSlug}>
              <div className={styles.cardToolbar}>
                <span>{categoryLabels[component.category]}{filters.query.trim() && results.page === 1 && index === 0 && <span className={styles.bestMatch}>Best match</span>}</span>
                <a href={`/components/${component.publicSlug}`} aria-label={`Open ${component.name} details`}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 4h6v6M20 4l-8 8M10 4H4v16h16v-6" /></svg>
                </a>
              </div>
              <div className={styles.cardPreview}>
                <ComponentPreview component={component} size="card" priority={index === 0} />
              </div>
              <div className={styles.cardInfo}>
                <h3><a href={`/components/${component.publicSlug}`}>{component.name} <span aria-hidden="true">↗</span></a></h3>
                <p>{component.description}</p>
              </div>
            </article>
          ))}
        </div>

        {results.pageCount > 1 && (
          <nav className={styles.pagination} aria-label="Component pages">
            {results.page > 1 && <a href={catalogueHref({ ...filters, page: results.page - 1 })} rel="prev">← Previous</a>}
            <span>Page {results.page} of {results.pageCount}</span>
            {results.page < results.pageCount && <a href={catalogueHref({ ...filters, page: results.page + 1 })} rel="next">{isFeatured ? 'Explore more' : 'Next'} <span aria-hidden="true">→</span></a>}
          </nav>
        )}

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
