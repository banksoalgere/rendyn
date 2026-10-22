'use client';
/* eslint-disable @next/next/no-html-link-for-pages -- Match the site's native navigation to avoid Vinext Link hydration conflicts. */

import { useMemo, useState, type ReactNode } from 'react';
import { FileTree, FileTreeFile, FileTreeFolder } from './library/file-tree';
import type { CatalogueComponent } from '../../lib/catalogue-search';
import { getComponentUsage, groupComponentsByUsage } from '../../lib/catalogue-usage';
import { ComponentPreview } from './component-preview';
import styles from './catalogue-browser.module.css';

/** Uses the catalogue's beUI File Tree, including its arrow-key navigation. */
export function CatalogueBrowser({ components, basePath = '/components', action }: {
  components: CatalogueComponent[];
  basePath?: '/components' | '/app/components';
  action?: (component: CatalogueComponent) => ReactNode;
}) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = components.find(component => component.publicSlug === selectedSlug) ?? components[0];
  const folders = useMemo(() => groupComponentsByUsage(components), [components]);

  if (!selected) return null;
  return (
    <div className={styles.browser}>
      <aside className={styles.sidebar} aria-label="Component files">
        <div className={styles.heading}>Components <span>{components.length.toLocaleString('en-GB')}</span></div>
        <div className={styles.files}>
          <FileTree
            key={folders.map(([usage, entries]) => `${usage}:${entries.length}`).join(',')}
            value={selected.publicSlug}
            onValueChange={value => {
              if (components.some(component => component.publicSlug === value)) setSelectedSlug(value);
            }}
            defaultExpandedIds={[`usage:${getComponentUsage(selected)}`]}
            ariaLabel="Component library"
            classNames={{ item: styles.file, label: styles.label }}
          >
            {folders.map(([usage, entries]) => (
              <FileTreeFolder key={usage} value={`usage:${usage}`} name={`${usage} (${entries.length})`}>
                {entries.map(component => (
                  <FileTreeFile key={component.publicSlug} value={component.publicSlug} name={component.name} />
                ))}
              </FileTreeFolder>
            ))}
          </FileTree>
        </div>
        <a className={styles.attribution} href="/components/file-tree">Built with Rendyn File Tree ↗</a>
      </aside>
      <section className={styles.detail} aria-label="Selected component">
        <header className={styles.toolbar}>
          <div><span>{getComponentUsage(selected)} /</span><h2>{selected.name}</h2></div>
          {action?.(selected)}
          <a href={`${basePath}/${selected.publicSlug}#component-code`}>View code ↗</a>
        </header>
        <div className={styles.canvas}>
          <ComponentPreview key={selected.previewId} component={selected} />
        </div>
        <footer className={styles.description}>
          <p>{selected.description}</p>
          <a href={`${basePath}/${selected.publicSlug}`}>Open component details →</a>
        </footer>
      </section>
    </div>
  );
}
