'use client';

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Vinext's next/link shim can hydrate from a second React context, and these generated local previews do not need the Next image service. */

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './components.module.css';

export interface CatalogueComponent {
  category: 'motion' | 'agents' | 'blocks';
  dependencies: string[];
  description: string;
  name: string;
  notIdealWhen: string;
  slug: string;
  sourceId: string;
  sourceName: string;
  tags: string[];
  useWhen: string;
}

interface ComponentExplorerProps {
  components: CatalogueComponent[];
  initialCategory: string;
  initialSelectedSlug: string | null;
  initialSource: string;
  sourceCounts: Record<string, number>;
}

const categoryLabels = {
  motion: 'Motion',
  agents: 'Agent UI',
  blocks: 'Product blocks',
} as const;

const sourceLabels: Record<string, string> = {
  beui: 'beUI',
  magicui: 'Magic UI',
  kibo: 'Kibo UI',
};

function matchesSearch(component: CatalogueComponent, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return [
    component.name,
    component.description,
    component.sourceName,
    component.category,
    ...component.tags,
  ].some((value) => value.toLowerCase().includes(normalizedQuery));
}

function withQuery(component?: string, category?: string, source?: string) {
  const parameters = new URLSearchParams();
  if (component) parameters.set('component', component);
  if (category && category !== 'all') parameters.set('category', category);
  if (source && source !== 'all') parameters.set('source', source);
  const query = parameters.toString();
  return query ? `/components?${query}` : '/components';
}

export function ComponentExplorer({
  components,
  initialCategory,
  initialSelectedSlug,
  initialSource,
  sourceCounts,
}: ComponentExplorerProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [source, setSource] = useState(initialSource);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSelectedSlug);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const selectedComponent = components.find(({ slug }) => slug === selectedSlug) ?? null;

  useEffect(() => {
    if (!selectedComponent) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedSlug(null);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedComponent]);

  const filteredComponents = useMemo(
    () => components.filter((component) => (
      (category === 'all' || component.category === category)
      && (source === 'all' || component.sourceId === source)
      && matchesSearch(component, query)
    )),
    [category, components, query, source],
  );

  const openPreview = (slug: string) => {
    setSelectedSlug(slug);
    window.history.replaceState(null, '', withQuery(slug, category, source));
  };

  const closePreview = () => {
    setSelectedSlug(null);
    window.history.replaceState(null, '', withQuery(undefined, category, source));
  };

  const setCategoryFilter = (value: string) => {
    setCategory(value);
    window.history.replaceState(null, '', withQuery(undefined, value, source));
  };

  const setSourceFilter = (value: string) => {
    setSource(value);
    window.history.replaceState(null, '', withQuery(undefined, category, value));
  };

  return (
    <>
      <section className={styles.explorer} aria-label="Component catalogue">
        <div className={styles.toolbar}>
          <label className={styles.search}>
            <span aria-hidden="true">⌕</span>
            <span className={styles.visuallyHidden}>Search components</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, use case or interaction..."
              type="search"
              value={query}
            />
            <kbd>⌘ K</kbd>
          </label>

          <div className={styles.filterRow}>
            <div aria-label="Filter by source" className={styles.filters} role="group">
              <button aria-pressed={source === 'all'} onClick={() => setSourceFilter('all')} type="button">
                All sources <b>{components.length}</b>
              </button>
              {Object.entries(sourceCounts).map(([sourceId, count]) => (
                <button
                  aria-pressed={source === sourceId}
                  key={sourceId}
                  onClick={() => setSourceFilter(sourceId)}
                  type="button"
                >
                  {sourceLabels[sourceId] ?? sourceId} <b>{count}</b>
                </button>
              ))}
            </div>

            <div aria-label="Filter by category" className={styles.categoryFilters} role="group">
              <button aria-pressed={category === 'all'} onClick={() => setCategoryFilter('all')} type="button">Everything</button>
              {Object.entries(categoryLabels).map(([value, label]) => (
                <button
                  aria-pressed={category === value}
                  key={value}
                  onClick={() => setCategoryFilter(value)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.resultsHeading} aria-live="polite">
          <p><strong>{filteredComponents.length}</strong> examples</p>
          <span>Open a card for the full preview and implementation context.</span>
        </div>

        {filteredComponents.length > 0 ? (
          <div className={styles.grid}>
            {filteredComponents.map((component, index) => (
              <button
                className={styles.card}
                key={component.slug}
                onClick={() => openPreview(component.slug)}
                type="button"
              >
                <span className={styles.previewFrame}>
                  <img
                    alt={`${component.name} component example`}
                    decoding="async"
                    loading={index < 6 ? 'eager' : 'lazy'}
                    src={`/component-previews/${component.slug}.png`}
                  />
                  <span className={styles.openHint}>View example <b aria-hidden="true">↗</b></span>
                </span>
                <span className={styles.cardBody}>
                  <span className={styles.cardMeta}>
                    <i data-source={component.sourceId}>{component.sourceName}</i>
                    <small>{categoryLabels[component.category]}</small>
                  </span>
                  <strong>{component.name}</strong>
                  <span>{component.description}</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span>00</span>
            <h2>No components match that search.</h2>
            <p>Try a broader outcome such as “navigation”, “data” or “motion”.</p>
            <button onClick={() => { setQuery(''); setCategoryFilter('all'); setSourceFilter('all'); }} type="button">Clear filters</button>
          </div>
        )}
      </section>

      {selectedComponent && (
        <div className={styles.modalBackdrop} onMouseDown={(event) => {
          if (event.currentTarget === event.target) closePreview();
        }}>
          <section
            aria-labelledby="component-preview-title"
            aria-modal="true"
            className={styles.modal}
            role="dialog"
          >
            <div className={styles.modalTopbar}>
              <span><i>{selectedComponent.sourceName}</i> / {categoryLabels[selectedComponent.category]}</span>
              <button aria-label="Close component preview" onClick={closePreview} ref={closeButtonRef} type="button">Close <b aria-hidden="true">×</b></button>
            </div>
            <div className={styles.modalLayout}>
              <div className={styles.modalPreview}>
                <div>
                  <span>Captured example</span>
                  <small>From the verified component route</small>
                </div>
                <img
                  alt={`${selectedComponent.name} component example at full size`}
                  src={`/component-previews/${selectedComponent.slug}.png`}
                />
              </div>
              <aside className={styles.modalDetails}>
                <div>
                  <span className={styles.modalEyebrow}>Component example</span>
                  <h2 id="component-preview-title">{selectedComponent.name}</h2>
                  <p>{selectedComponent.description}</p>
                </div>

                <dl className={styles.detailList}>
                  <div><dt>Best for</dt><dd>{selectedComponent.useWhen}</dd></div>
                  <div><dt>Not ideal when</dt><dd>{selectedComponent.notIdealWhen}</dd></div>
                  <div><dt>Dependencies</dt><dd>{selectedComponent.dependencies.length > 0 ? selectedComponent.dependencies.join(' · ') : 'No external packages'}</dd></div>
                  <div><dt>Licence</dt><dd>MIT · source retained from {selectedComponent.sourceName}</dd></div>
                </dl>

                {selectedComponent.tags.length > 0 && (
                  <div className={styles.tags} aria-label="Component tags">
                    {selectedComponent.tags.slice(0, 6).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                )}

                <div className={styles.modalActions}>
                  <a className="button" href="/#docs">Use with DesignMCP <span aria-hidden="true">→</span></a>
                  <button onClick={() => navigator.clipboard.writeText(`Find the ${selectedComponent.name} component in DesignMCP and return its complete source and install steps.`)} type="button">Copy agent prompt</button>
                </div>
              </aside>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
