/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim can hydrate from a second React context. */
import type { Metadata } from 'next';
import { catalogueEntries } from '../../lib/catalogue';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { ComponentExplorer, type CatalogueComponent } from './component-explorer';
import styles from './components.module.css';

export const metadata: Metadata = {
  title: 'Live component catalogue | DesignMCP',
  description: 'Explore 189 interactive React components in a live preview workspace, with fit guidance and complete editable source.',
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

const catalogueComponents: CatalogueComponent[] = catalogueEntries.map((component) => ({
  category: component.category as CatalogueComponent['category'],
  dependencies: component.dependencies,
  description: component.description,
  name: component.name,
  notIdealWhen: component.metadata.notIdealWhen[0] ?? 'A simpler static pattern would communicate the outcome more clearly.',
  previewId: component.previewId,
  publicSlug: component.publicSlug,
  slug: component.slug,
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

interface ComponentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ComponentsPage({ searchParams }: ComponentsPageProps) {
  const parameters = await searchParams;
  const requestedCategory = typeof parameters.category === 'string' ? parameters.category : 'all';
  const requestedComponent = typeof parameters.component === 'string' ? parameters.component : null;
  const initialCategory = ['motion', 'agents', 'blocks'].includes(requestedCategory) ? requestedCategory : 'all';
  const initialSelectedSlug = catalogueComponents.some(({ slug }) => slug === requestedComponent)
    ? requestedComponent
    : null;

  return (
    <main className={styles.page}>
      <div className={styles.headerShell}><SiteHeader activeSection="catalogue" /></div>
      <section className={styles.hero}>
        <div className={styles.heroIndex}><span>189</span><small>live components</small></div>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The component catalogue</p>
          <h1>Don&apos;t imagine it.<br />Try it.</h1>
          <p>
            Search by intent, choose a component, then use it in the live canvas. Every hover,
            press, drag and state change is here before your agent writes a line of product code.
          </p>
        </div>
        <div className={styles.heroNote}>
          <span>01</span>
          <p><strong>Rendered, not represented</strong>The catalogue runs the real React component inside an isolated interactive canvas.</p>
        </div>
      </section>

      <ComponentExplorer
        components={catalogueComponents}
        initialCategory={initialCategory}
        initialSelectedSlug={initialSelectedSlug}
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
