/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim can hydrate from a second React context. */
import type { Metadata } from 'next';
import catalog from '../../../../catalog/index.json';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { ComponentExplorer, type CatalogueComponent } from './component-explorer';
import styles from './components.module.css';

export const metadata: Metadata = {
  title: 'Component examples | DesignMCP',
  description: 'Browse 189 visual React component examples from beUI, Magic UI and Kibo UI, with fit guidance and MIT licence context.',
};

const featuredComponents = [
  'magicui-animated-beam',
  'kibo-kanban',
  'approval-card',
  'magicui-bento-grid',
  'kibo-gantt',
  'wallet-card',
  'magicui-terminal',
  'kibo-editor',
  'morphing-modal',
];

const sourceById = new Map(catalog.sources.map((source) => [source.id, source]));

const catalogueComponents: CatalogueComponent[] = catalog.components.map((component) => ({
  category: component.category as CatalogueComponent['category'],
  dependencies: component.dependencies,
  description: component.description,
  name: component.name,
  notIdealWhen: component.metadata.notIdealWhen[0] ?? 'A simpler static pattern would communicate the outcome more clearly.',
  slug: component.slug,
  sourceId: component.sourceId,
  sourceName: sourceById.get(component.sourceId)?.name ?? component.sourceId,
  tags: component.metadata.tags,
  useWhen: component.metadata.useWhen[0] ?? component.description,
})).sort((left, right) => {
  const leftPriority = featuredComponents.indexOf(left.slug);
  const rightPriority = featuredComponents.indexOf(right.slug);
  if (leftPriority >= 0 || rightPriority >= 0) {
    if (leftPriority < 0) return 1;
    if (rightPriority < 0) return -1;
    return leftPriority - rightPriority;
  }
  return left.name.localeCompare(right.name);
});

const sourceCounts = Object.fromEntries(
  catalog.sources.map((source) => [
    source.id,
    catalogueComponents.filter((component) => component.sourceId === source.id).length,
  ]),
);

interface ComponentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ComponentsPage({ searchParams }: ComponentsPageProps) {
  const parameters = await searchParams;
  const requestedCategory = typeof parameters.category === 'string' ? parameters.category : 'all';
  const requestedSource = typeof parameters.source === 'string' ? parameters.source : 'all';
  const requestedComponent = typeof parameters.component === 'string' ? parameters.component : null;
  const initialCategory = ['motion', 'agents', 'blocks'].includes(requestedCategory) ? requestedCategory : 'all';
  const initialSource = requestedSource in sourceCounts ? requestedSource : 'all';
  const initialSelectedSlug = catalogueComponents.some(({ slug }) => slug === requestedComponent)
    ? requestedComponent
    : null;

  return (
    <main className={styles.page}>
      <div className={styles.headerShell}><SiteHeader activeSection="catalogue" /></div>
      <section className={styles.hero}>
        <div className={styles.heroIndex}><span>189</span><small>verified examples</small></div>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The component catalogue</p>
          <h1>See the interface<br />before you ship it.</h1>
          <p>
            Browse every captured example from beUI, Magic UI and Kibo UI. Search by intent,
            compare the visual result, then open a component for its fit, dependencies and source context.
          </p>
        </div>
        <div className={styles.heroNote}>
          <span>01</span>
          <p><strong>Real component routes</strong>Each image is captured from the verified preview runtime at a pinned MIT source revision.</p>
        </div>
      </section>

      <ComponentExplorer
        components={catalogueComponents}
        initialCategory={initialCategory}
        initialSelectedSlug={initialSelectedSlug}
        initialSource={initialSource}
        sourceCounts={sourceCounts}
      />

      <section className={styles.catalogueCta}>
        <p>Found the right direction?</p>
        <h2>Let your coding agent<br />take it from here.</h2>
        <a className="button" href="/#docs">Connect DesignMCP <span aria-hidden="true">→</span></a>
      </section>
      <SiteFooter />
    </main>
  );
}
