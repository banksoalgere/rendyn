import { pageMetadata, siteOrigin } from '../../lib/seo';
import type { Metadata } from 'next';
import { catalogueEntries } from '../../lib/catalogue';
import { getComponentPreview } from '../../lib/component-preview';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { ComponentExplorer, type CatalogueComponent } from './component-explorer';
import styles from './components.module.css';

export const metadata: Metadata = pageMetadata(
  'React UI Component Library & Live Previews | Rendyn',
  `Browse ${catalogueEntries.length} React UI components with interactive previews, TypeScript source and usage guidance for Claude Code, Codex and Cursor.`,
  '/components',
);

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

const catalogueComponents: CatalogueComponent[] = [...catalogueEntries].sort((left, right) => {
  const leftPriority = featuredComponents.indexOf(left.slug);
  const rightPriority = featuredComponents.indexOf(right.slug);
  if (leftPriority >= 0 || rightPriority >= 0) {
    if (leftPriority < 0) return 1;
    if (rightPriority < 0) return -1;
    return leftPriority - rightPriority;
  }
  return left.name.localeCompare(right.name);
}).map((component) => ({
  category: component.category as CatalogueComponent['category'],
  description: component.description,
  ...getComponentPreview(component),
  tags: component.metadata.tags,
}));

interface ComponentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ComponentsPage({ searchParams }: ComponentsPageProps) {
  const parameters = await searchParams;
  const requestedCategory = typeof parameters.category === 'string' ? parameters.category : 'all';
  const initialCategory = ['motion', 'agents', 'blocks'].includes(requestedCategory) ? requestedCategory : 'all';

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${siteOrigin}/components#catalogue`,
          name: 'Rendyn React UI component library',
          url: `${siteOrigin}/components`,
          isPartOf: { '@id': `${siteOrigin}/#website` },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: catalogueComponents.length,
            itemListElement: catalogueComponents.map((component, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: component.name,
              url: `${siteOrigin}/components/${component.publicSlug}`,
            })),
          },
        }).replace(/</g, '\\u003c') }}
      />
      <div className={styles.headerShell}><SiteHeader activeSection="catalogue" /></div>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The collection <span> / {catalogueComponents.length}</span></p>
          <h1>Components</h1>
          <p>Interactive previews. Ready to use in your project.</p>
        </div>
        <div className={styles.heroNote}>
          <span>React · TypeScript · Tailwind</span>
          <p>Free to explore. Complete source with your trial.</p>
        </div>
      </section>

      <ComponentExplorer
        components={catalogueComponents}
        initialCategory={initialCategory}
      />

      <section className={styles.catalogueCta}>
        <h2>Get the complete source.</h2>
        <p>Connect your coding agent and start building.</p>
        <a className="button" href="/pricing">Start 7-day trial <span aria-hidden="true">→</span></a>
      </section>
      <SiteFooter />
    </main>
  );
}
