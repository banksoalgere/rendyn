import '../../globals.css';
import { componentMetadata, siteOrigin } from '../../../lib/seo';
/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors avoid the Vinext next/link hydration boundary. */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  catalogueCategoryLabels,
  catalogueEntries,
  findCatalogueEntry,
  getRelatedCatalogueEntries,
} from '../../../lib/catalogue';
import { ComponentNavScroll } from './component-nav-scroll';
import { SiteHeader } from '../site-header';
import { SiteFooter } from '../site-footer';
import { PreviewWorkbench } from './preview-workbench';
import { getComponentExamples } from '../../../../preview/presentation/examples';
import { getComponentPreview } from '../../../lib/component-preview';
import { componentEditorialUpdatedAt, getComponentEditorial } from '../../../lib/component-editorial';
import { ComponentUsage } from './component-usage';
import styles from './component-page.module.css';

const siteUrl = siteOrigin;

interface ComponentPageProps {
  params: Promise<{ componentSlug: string }>;
}

export function generateStaticParams() {
  return catalogueEntries.map((component) => ({ componentSlug: component.publicSlug }));
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const { componentSlug } = await params;
  const component = findCatalogueEntry(componentSlug);
  if (!component) return {};

  return componentMetadata(component);
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { componentSlug } = await params;
  const component = findCatalogueEntry(componentSlug);
  if (!component) notFound();

  const editorial = getComponentEditorial(component.slug);
  const suggestedComponents = (editorial?.relatedSlugs ?? []).flatMap((slug) => {
    const entry = catalogueEntries.find((candidate) => candidate.slug === slug);
    return entry ? [entry] : [];
  });
  const relatedComponents = [...suggestedComponents, ...getRelatedCatalogueEntries(component)]
    .filter((entry, index, entries) => entries.findIndex((candidate) => candidate.slug === entry.slug) === index)
    .slice(0, 4);
  const displayDescription = editorial?.intro ?? (component.publicSlug === 'stories'
    ? 'A swipeable carousel for images and video, with author details, overlays, and touch navigation.'
    : component.description);
  const canonicalUrl = `${siteUrl}/components/${component.publicSlug}`;
  const description = editorial?.description ?? `A live ${component.name} React component example with copyable source code and installation instructions.`;
  const groupedComponents = Object.entries(catalogueCategoryLabels).map(([category, label]) => ({
    category,
    label,
    components: catalogueEntries.filter((entry) => entry.category === category),
  }));
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${canonicalUrl}#article`,
        headline: editorial?.title.replace(' | Rendyn', '') ?? `${component.name} React component example`,
        description,
        datePublished: component.publishedAt,
        dateModified: editorial ? componentEditorialUpdatedAt : component.updatedAt,
        inLanguage: 'en-GB',
        keywords: [component.name, ...component.metadata.tags, ...component.metadata.interactions].join(', '),
        license: 'https://opensource.org/license/mit',
        mainEntityOfPage: canonicalUrl,
        isPartOf: { '@id': `${siteUrl}/components#catalogue` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Rendyn', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Components', item: `${siteUrl}/components` },
          { '@type': 'ListItem', position: 3, name: component.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        type="application/ld+json"
      />

      <div className={styles.headerShell}><SiteHeader activeSection="catalogue" /></div>

      <div className={styles.docsShell}>
        <aside className={styles.componentNav}>
          <a className={styles.catalogueBack} href="/components">
            <span aria-hidden="true">←</span> Component catalogue
          </a>
          <ComponentNavScroll>
            {groupedComponents.map((group) => (
              <section key={group.category}>
                <h2>{group.label} <span>{group.components.length}</span></h2>
                <nav aria-label={`${group.label} components`}>
                  {group.components.map((entry) => (
                    <a
                      aria-current={entry.publicSlug === component.publicSlug ? 'page' : undefined}
                      href={`/components/${entry.publicSlug}`}
                      key={entry.publicSlug}
                    >
                      {getComponentEditorial(entry.slug)?.displayName ?? entry.name}
                    </a>
                  ))}
                </nav>
              </section>
            ))}
          </ComponentNavScroll>
        </aside>

        <article className={styles.article}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
            <a href="/components">Components</a>
            <span aria-hidden="true">›</span>
            <span>{component.categoryLabel}</span>
          </nav>

          <header className={styles.componentHeader} id="overview">
            <div>
              <h1>{editorial?.displayName ?? component.name}</h1>
              <p>{displayDescription}</p>
            </div>
          </header>

          <PreviewWorkbench
            component={getComponentPreview(component)}
            examples={getComponentExamples(component.category, component.slug)}
            kind={component.metadata.kind}
          />

          {editorial && <ComponentUsage content={editorial} dependencies={component.dependencies} />}

          <section className={styles.relatedSection} id="related">
            <div className={styles.sectionHeading}>
              <h2>Related components</h2>
            </div>
            <div className={styles.relatedGrid}>
              {relatedComponents.map((related) => (
                <a href={`/components/${related.publicSlug}`} key={related.publicSlug}>
                  <span>{related.categoryLabel}</span>
                  <strong>{getComponentEditorial(related.slug)?.displayName ?? related.name}</strong>
                  <p>{getComponentEditorial(related.slug)?.intro ?? related.description}</p>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          </section>

          <footer className={styles.articleFooter}>
            <a href="/components"><span aria-hidden="true">←</span> Browse all {catalogueEntries.length} components</a>
            <a href="/pricing">Start 7-day trial <span aria-hidden="true">→</span></a>
          </footer>
        </article>

        <aside className={styles.pageNav} aria-label="On this page">
          <p>On this page</p>
          <nav>
            <a href="#overview">Overview</a>
            <a href="#preview">Preview &amp; code</a>
            {editorial && <>
              <a href="#usage">Practical example</a>
              <a href="#customization">Customization</a>
              <a href="#integration-notes">Integration notes</a>
            </>}
            <a href="#related">Related components</a>
          </nav>
        </aside>
      </div>
      <SiteFooter />
    </main>
  );
}
