'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { categoryLabels, createCatalogueSearchIndex, getCatalogueFilters, MAX_SEARCH_LENGTH, searchCatalogue, type CatalogueComponent, type CatalogueFilters } from '../../lib/catalogue-search';
import { ComponentPreview } from '../components/component-preview';
import { useWorkspace, WorkspaceIcon } from './workspace-shell';
import styles from './workspace.module.css';

const PAGE_SIZE = 12;

export function WorkspaceCatalogue({ components, initialFilters, savedOnly = false }: {
  components: CatalogueComponent[]; initialFilters: CatalogueFilters; savedOnly?: boolean;
}) {
  const { saved, toggleSaved, ready } = useWorkspace();
  const [filters, setFilters] = useState(initialFilters);
  const input = useRef<HTMLInputElement>(null);
  const index = useMemo(() => createCatalogueSearchIndex(components), [components]);
  const savedSet = useMemo(() => new Set(saved), [saved]);
  const matches = useMemo(() => searchCatalogue(index, filters.query, filters.category).filter(component => !savedOnly || savedSet.has(component.publicSlug)), [index, filters.query, filters.category, savedOnly, savedSet]);
  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const page = Math.min(filters.page, pageCount);
  const visible = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
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

  return <>
    <div className={styles.pageHeading}><div><p className={styles.eyebrow}>{savedOnly ? 'Your shortlist' : 'The catalogue'}</p><h1>{savedOnly ? 'Saved components' : 'What are you building?'}</h1><p>{savedOnly ? 'Your favourites, saved on this device for this account.' : 'Find the right interaction. Try it live. Take the code.'}</p></div>{!savedOnly && <a className={styles.secondaryButton} href="/app/mcp"><WorkspaceIcon name="code" />Connect your agent</a>}</div>
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
      <div className={styles.componentGrid}>{visible.map(component => <article className={styles.componentCard} key={component.publicSlug}>
        <div className={styles.cardTop}><span>{categoryLabels[component.category]}</span><button type="button" className={styles.saveButton} disabled={!ready} aria-label={`${savedSet.has(component.publicSlug) ? 'Unsave' : 'Save'} ${component.name}`} aria-pressed={savedSet.has(component.publicSlug)} onClick={() => toggleSaved(component.publicSlug)}><WorkspaceIcon name="bookmark" /></button></div>
        <div className={styles.cardPreview}><ComponentPreview component={component} size="card" /></div>
        <div className={styles.cardDetails}><h2><a href={`/app/components/${component.publicSlug}`}>{component.name}<span aria-hidden="true">↗</span></a></h2><p>{component.description}</p><a className={styles.codeLink} href={`/app/components/${component.publicSlug}#component-code`}>View code <span aria-hidden="true">→</span></a></div>
      </article>)}</div>
      {matches.length === 0 && (ready || !savedOnly) && <div className={styles.emptyState}><WorkspaceIcon name={savedOnly ? 'bookmark' : 'grid'} /><h2>{savedOnly && !filters.query && filters.category === 'all' ? 'Your next favourite goes here.' : 'No components found.'}</h2><p>{savedOnly ? 'Save components with the bookmark button, or try a different search.' : 'Try another component name or interaction, or search all categories.'}</p>{savedOnly ? <a className={styles.primaryButton} href="/app">Explore components</a> : <button className={styles.secondaryButton} type="button" onClick={() => update({ query: '', category: 'all', page: 1 })}>Reset search</button>}</div>}
    </div>
    {pageCount > 1 && <nav className={styles.pagination} aria-label="Component pages"><button type="button" disabled={page === 1} onClick={() => { update({ ...filters, page: page - 1 }); input.current?.scrollIntoView({ block: 'center' }); }}>← Previous</button><span>Page {page} of {pageCount}</span><button type="button" disabled={page === pageCount} onClick={() => { update({ ...filters, page: page + 1 }); input.current?.scrollIntoView({ block: 'center' }); }}>Next →</button></nav>}
  </>;
}
