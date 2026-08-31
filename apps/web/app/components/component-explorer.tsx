'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './components.module.css';

export interface CatalogueComponent {
  category: 'motion' | 'agents' | 'blocks';
  description: string;
  name: string;
  publicSlug: string;
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
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const setCategoryFilter = (value: string) => {
    setCategory(value);
  };

  return (
    <section className={styles.explorer} aria-label="Interactive component catalogue">
      <div className={styles.controlBar}>
        <label className={styles.search}>
          <span aria-hidden="true">⌕</span>
          <span className={styles.visuallyHidden}>Search components</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by outcome, interaction or component..."
            ref={searchInputRef}
            type="search"
            value={query}
          />
          <kbd>⌘ K</kbd>
        </label>

        <div aria-label="Filter by category" className={styles.categoryDock} role="group">
          <button aria-pressed={category === 'all'} onClick={() => setCategoryFilter('all')} type="button">
            <span>All</span><b>{components.length}</b>
          </button>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <button
              aria-pressed={category === value}
              key={value}
              onClick={() => setCategoryFilter(value)}
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
            <p>component pages</p>
          </div>
          <small>Open one to see and use the full live example</small>
        </div>

        <div className={styles.componentGrid} aria-label="Component results">
          {filteredComponents.map((component, index) => (
            <a
              className={styles.componentLink}
              href={`/components/${component.publicSlug}`}
              key={component.publicSlug}
            >
              <div className={styles.componentLinkMeta}>
                <span>{String(index + 1).padStart(3, '0')}</span>
                <span>{categoryLabels[component.category]}</span>
              </div>
              <h2>{component.name}</h2>
              <p>{component.description}</p>
              <div className={styles.componentLinkFooter}>
                <div aria-label="Component tags">
                  {component.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <b aria-hidden="true">↗</b>
              </div>
            </a>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className={styles.emptyState}>
            <span>00</span>
            <strong>No matches</strong>
            <p>Try “navigation”, “data” or “motion”.</p>
            <button onClick={() => { setQuery(''); setCategoryFilter('all'); }} type="button">Clear search</button>
          </div>
        )}
      </div>
    </section>
  );
}
