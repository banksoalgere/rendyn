'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentPreviewData } from '../../lib/component-preview';
import { ComponentPreview } from './component-preview';
import styles from './components.module.css';

export interface CatalogueComponent extends ComponentPreviewData {
  category: 'motion' | 'agents' | 'blocks';
  description: string;
  tags: string[];
}

interface ComponentExplorerProps {
  components: CatalogueComponent[];
  initialCategory: string;
}

const categoryLabels = {
  motion: 'Interaction',
  agents: 'Agent UI',
  blocks: 'Product blocks',
} as const;

function matchesSearch(component: CatalogueComponent, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return [
    component.name,
    component.description,
    component.category,
    ...component.tags,
  ].some((value) => value.toLowerCase().includes(normalizedQuery));
}

export function ComponentExplorer({
  components,
  initialCategory,
}: ComponentExplorerProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const explorerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  function updateFilters(nextQuery: string, nextCategory: string) {
    // Keep the results visible when filtering from the sticky search bar.
    const explorer = explorerRef.current;
    if (explorer && explorer.getBoundingClientRect().top < 0) {
      explorer.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    setQuery(nextQuery);
    setCategory(nextCategory);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredComponents = useMemo(
    () => components.filter((component) => (
      (category === 'all' || component.category === category)
      && matchesSearch(component, query)
    )),
    [category, components, query],
  );

  return (
    <section className={styles.explorer} aria-label="Interactive component catalogue" ref={explorerRef}>
      <div className={styles.controlBar}>
        <label className={styles.search}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
          <span className={styles.visuallyHidden}>Search components</span>
          <input
            onChange={(event) => updateFilters(event.target.value, category)}
            placeholder="Search components, e.g. approval or navigation"
            ref={searchInputRef}
            type="search"
            value={query}
          />
          <kbd aria-hidden="true">⌘ K</kbd>
        </label>

        <div aria-label="Filter by category" className={styles.categoryDock} role="group">
          <button aria-pressed={category === 'all'} onClick={() => updateFilters(query, 'all')} type="button">
            <span>All</span><b>{components.length}</b>
          </button>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <button
              aria-pressed={category === value}
              key={value}
              onClick={() => updateFilters(query, value)}
              type="button"
            >
              <span>{label}</span>
              <b>{components.filter((component) => component.category === value).length}</b>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.results}>
        <div className={styles.resultsHeading} aria-live="polite">
          <div>
            <span>{String(filteredComponents.length).padStart(3, '0')}</span>
            <p>{filteredComponents.length === 1 ? 'component' : 'components'}</p>
          </div>
          <small>Explore a preview, or open it for a closer look.</small>
        </div>

        <div className={styles.componentGrid} aria-label="Component results">
          {filteredComponents.map((component) => (
            <article
              className={styles.componentLink}
              key={component.publicSlug}
            >
              <div className={styles.cardToolbar}>
                <span>{categoryLabels[component.category]}</span>
                <a href={`/components/${component.publicSlug}`} aria-label={`Open ${component.name} details`}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 4h6v6M20 4l-8 8M10 4H4v16h16v-6" /></svg>
                </a>
              </div>
              <div className={styles.cardPreview}>
                <ComponentPreview component={component} size="card" />
              </div>
              <div className={styles.cardInfo}>
                <h2><a href={`/components/${component.publicSlug}`}>{component.name} <span aria-hidden="true">↗</span></a></h2>
                <p>{component.description}</p>
                <div className={styles.componentLinkFooter}>
                  <div aria-label="Component tags">
                    {component.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className={styles.emptyState}>
            <span>00</span>
            <strong>No matches</strong>
            <p>Try “navigation”, “data” or “motion”.</p>
            <button onClick={() => updateFilters('', 'all')} type="button">Clear search</button>
          </div>
        )}
      </div>
    </section>
  );
}
