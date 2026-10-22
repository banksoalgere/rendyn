import '../globals.css';
import { pageMetadata, siteOrigin } from '../../lib/seo';
import type { Metadata } from 'next';
import { catalogueEntries } from '../../lib/catalogue';
import { getComponentPreview } from '../../lib/component-preview';
import { catalogueHref, createCatalogueSearchIndex, getCatalogueFilters, getCataloguePage } from '../../lib/catalogue-search';
import { SiteHeader } from '../components/site-header';
import { ComponentExplorer, type CatalogueComponent } from './component-explorer';
import styles from './components.module.css';

const featuredComponents = [
  'magicui-animated-beam',
  'kibo-kanban',
  'approval-card',
  'magicui-bento-grid',
  'wallet-card',
  'morphing-modal',
  'kibo-gantt',
  'magicui-terminal',
  'kibo-editor',
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
  family: component.metadata.family,
  aliases: component.metadata.aliases,
}));

const searchIndex = createCatalogueSearchIndex(catalogueComponents);

interface ComponentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ComponentsPage({ searchParams }: ComponentsPageProps) {
  const filters = getCatalogueFilters(await searchParams);
  const results = getCataloguePage(searchIndex, filters);
  const pageUrl = `${siteOrigin}${catalogueHref({ ...filters, page: results.page })}`;

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${pageUrl}#catalogue`,
          name: 'Rendyn React UI component library',
          url: pageUrl,
          isPartOf: { '@id': `${siteOrigin}/#website` },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: results.components.length,
            itemListElement: results.components.map((component, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: component.name,
              url: `${siteOrigin}/components/${component.publicSlug}`,
            })),
          },
        }).replace(/</g, '\\u003c') }}
      />
      <div className={styles.headerShell}><SiteHeader activeSection="catalogue" showArrows={false} /></div>
      <ComponentExplorer
        components={catalogueComponents}
        initialCategory={filters.category}
        initialQuery={filters.query}
        initialPage={results.page}
      />

    </main>
  );
}

export async function generateMetadata({ searchParams }: ComponentsPageProps): Promise<Metadata> {
  const filters = getCatalogueFilters(await searchParams);
  const { page } = getCataloguePage(searchIndex, filters);
  const isFiltered = Boolean(filters.query) || filters.category !== 'all';
  const title = isFiltered ? 'React Component Search | Rendyn'
    : page > 1 ? `React UI Components – Page ${page} | Rendyn`
      : 'React UI Components & Live Previews | Rendyn';
  const metadata = pageMetadata(
    title,
    'Find React UI components with live previews, TypeScript and Tailwind CSS. Search buttons, navigation, AI chat and product blocks, then get the source.',
    isFiltered ? '/components' : catalogueHref({ ...filters, page }),
  );
  if (isFiltered) metadata.robots = { index: false, follow: true };
  return metadata;
}
