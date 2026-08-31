'use client';

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim can hydrate from a second React context. */

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './components.module.css';

export interface CatalogueComponent {
  category: 'motion' | 'agents' | 'blocks';
  dependencies: string[];
  description: string;
  name: string;
  notIdealWhen: string;
  previewId: string;
  publicSlug: string;
  slug: string;
  tags: string[];
  useWhen: string;
}

interface ComponentExplorerProps {
  components: CatalogueComponent[];
  initialCategory: string;
  initialSelectedSlug: string | null;
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
  initialSelectedSlug,
}: ComponentExplorerProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [selectedSlug, setSelectedSlug] = useState(initialSelectedSlug ?? components[0]?.slug ?? null);
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

  const activeComponent = filteredComponents.find(({ slug }) => slug === selectedSlug)
    ?? filteredComponents[0]
    ?? null;

  const selectComponent = (component: CatalogueComponent) => {
    setSelectedSlug(component.slug);
  };

  const setCategoryFilter = (value: string) => {
    setCategory(value);
    const firstMatch = components.find((component) => value === 'all' || component.category === value);
    setSelectedSlug(firstMatch?.slug ?? null);
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

      <div className={styles.workspace}>
        <aside className={styles.resultRail} aria-label="Component results">
          <div className={styles.resultRailHeading} aria-live="polite">
            <span>{String(filteredComponents.length).padStart(3, '0')}</span>
            <p>Components</p>
            <small>Select one to render it live</small>
          </div>

          <div className={styles.resultList}>
            {filteredComponents.map((component, index) => {
              const active = activeComponent?.slug === component.slug;
              return (
                <div
                  aria-current={active ? 'true' : undefined}
                  className={styles.resultItem}
                  key={component.slug}
                >
                  <button
                    className={styles.resultSelect}
                    onClick={() => selectComponent(component)}
                    type="button"
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>
                      <strong>{component.name}</strong>
                      <small>{categoryLabels[component.category]}</small>
                    </span>
                  </button>
                  <a
                    aria-label={`Open ${component.name} component page`}
                    href={`/components/${component.publicSlug}`}
                    title={`${component.name} component page`}
                  >
                    {active ? '●' : '↗'}
                  </a>
                </div>
              );
            })}
          </div>

          {filteredComponents.length === 0 && (
            <div className={styles.emptyState}>
              <span>00</span>
              <strong>No matches</strong>
              <p>Try “navigation”, “data” or “motion”.</p>
              <button onClick={() => { setQuery(''); setCategoryFilter('all'); }} type="button">Clear search</button>
            </div>
          )}
        </aside>

        <div className={styles.liveStage}>
          {activeComponent ? (
            <>
              <div className={styles.stageBar}>
                <span className={styles.liveStatus}><i /> Live component</span>
                <span>{categoryLabels[activeComponent.category]}</span>
                <a
                  href={`/components/${activeComponent.publicSlug}`}
                >
                  Component page <b aria-hidden="true">↗</b>
                </a>
              </div>

              <div className={styles.stageFrame}>
                <iframe
                  key={activeComponent.slug}
                  loading="eager"
                  sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
                  src={`/component-preview/${activeComponent.previewId}`}
                  title={`${activeComponent.name} live component example`}
                />
              </div>

              <div className={styles.componentDetails}>
                <div className={styles.componentTitle}>
                  <span>Selected component</span>
                  <h2>{activeComponent.name}</h2>
                  <p>{activeComponent.description}</p>
                </div>

                <dl className={styles.detailGrid}>
                  <div><dt>Best for</dt><dd>{activeComponent.useWhen}</dd></div>
                  <div><dt>Think twice when</dt><dd>{activeComponent.notIdealWhen}</dd></div>
                  <div><dt>Dependencies</dt><dd>{activeComponent.dependencies.length > 0 ? activeComponent.dependencies.join(' · ') : 'No external packages'}</dd></div>
                  <div><dt>Licence</dt><dd>MIT licensed · complete editable source</dd></div>
                </dl>

                <div className={styles.detailFooter}>
                  <div className={styles.tags} aria-label="Component tags">
                    {activeComponent.tags.slice(0, 6).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <a className="button" href="/#docs">Use with DesignMCP <span aria-hidden="true">→</span></a>
                  <a className={styles.detailLink} href={`/components/${activeComponent.publicSlug}`}>
                    View docs <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.blankStage}>
              <span>⌕</span>
              <p>Choose a component to render it here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
