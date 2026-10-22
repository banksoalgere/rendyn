'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { categoryLabels, createCatalogueSearchIndex, getCatalogueFilters, MAX_SEARCH_LENGTH, searchCatalogue, type CatalogueComponent, type CatalogueFilters } from '../../lib/catalogue-search';
import { CatalogueBrowser } from '../components/catalogue-browser';
import { useWorkspace, WorkspaceIcon } from './workspace-shell';
import styles from './workspace.module.css';


export function WorkspaceCatalogue({ components, initialFilters, savedOnly = false }: {
  components: CatalogueComponent[]; initialFilters: CatalogueFilters; savedOnly?: boolean;
}) {
  const { saved, toggleSaved, ready } = useWorkspace();
  const [filters, setFilters] = useState(initialFilters);
  const input = useRef<HTMLInputElement>(null);
  const index = useMemo(() => createCatalogueSearchIndex(components), [components]);
  const savedSet = useMemo(() => new Set(saved), [saved]);
  const matches = useMemo(() => searchCatalogue(index, filters.query, filters.category).filter(component => !savedOnly || savedSet.has(component.publicSlug)), [index, filters.query, filters.category, savedOnly, savedSet]);
  const base = savedOnly ? '/app/saved' : '/app';

  function update(next: CatalogueFilters) {
    setFilters(next);
    const parameters = new URLSearchParams();
    if (next.query) parameters.set('q', next.query);
    if (next.category !== 'all') parameters.set('category', next.category);
    if (next.page > 1) parameters.set('page', String(next.page));
    window.history.replaceState(window.history.state, '', `${base}${parameters.size ? `?${parameters}` : ''}`);
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); input.current?.focus(); }
    };
    const restore = () => setFilters(getCatalogueFilters(Object.fromEntries(new URLSearchParams(window.location.search))));
    document.addEventListener('keydown', onKey);
    window.addEventListener('popstate', restore);
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('popstate', restore); };
  }, []);

  return <section className={styles.catalogue}>
    <h1 className={styles.catalogueTitle}>{savedOnly ? 'Saved components' : 'Component library'}</h1>
    <form className={styles.search} role="search" onSubmit={event => event.preventDefault()}>
      <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" /></svg>
      <label htmlFor="workspace-search" className={styles.srOnly}>Search components</label>
      <input id="workspace-search" ref={input} value={filters.query} type="search" placeholder="Search by name, or describe what you need…" maxLength={MAX_SEARCH_LENGTH} autoComplete="off" aria-controls="workspace-results" onChange={event => update({ ...filters, query: event.target.value.slice(0, MAX_SEARCH_LENGTH), page: 1 })} />
      <kbd>⌘ K</kbd>
    </form>
    <div className={styles.filters} role="group" aria-label="Filter components">
      {[['all', 'All components'], ...Object.entries(categoryLabels)].map(([category, label]) => <button key={category} type="button" aria-pressed={filters.category === category} onClick={() => update({ ...filters, category: category as CatalogueFilters['category'], page: 1 })}>{label}</button>)}
      <span role="status" aria-live="polite">{savedOnly && !ready ? 'Loading saves…' : `${matches.length.toLocaleString('en-GB')} components`}</span>
    </div>
    <div id="workspace-results">
      <CatalogueBrowser components={matches} basePath="/app/components" action={component => <button type="button" className={styles.saveButton} disabled={!ready} aria-label={`${savedSet.has(component.publicSlug) ? 'Unsave' : 'Save'} ${component.name}`} aria-pressed={savedSet.has(component.publicSlug)} onClick={() => toggleSaved(component.publicSlug)}><WorkspaceIcon name="bookmark" /></button>} />
      {matches.length === 0 && (ready || !savedOnly) && <div className={styles.emptyState}><WorkspaceIcon name={savedOnly ? 'bookmark' : 'grid'} /><h2>{savedOnly && !filters.query && filters.category === 'all' ? 'Your next favourite goes here.' : 'No components found.'}</h2><p>{savedOnly ? 'Save components with the bookmark button, or try a different search.' : 'Try another component name or interaction, or search all categories.'}</p>{savedOnly ? <a className={styles.primaryButton} href="/app">Browse components</a> : <button className={styles.secondaryButton} type="button" onClick={() => update({ query: '', category: 'all', page: 1 })}>Reset search</button>}</div>}
    </div>

  </section>;
}
