/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors avoid the Vinext next/link hydration boundary. */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  catalogueCategoryLabels,
  catalogueEntries,
  findCatalogueEntry,
  getAgentPrompt,
  getRelatedCatalogueEntries,
} from '../../../lib/catalogue';
import { CopyPrompt } from './copy-prompt';
import { ComponentNavScroll } from './component-nav-scroll';
import { SiteHeader } from '../site-header';
import { SiteFooter } from '../site-footer';
import { PreviewWorkbench } from './preview-workbench';
import { getComponentExamples } from '../../../../preview/presentation/examples';
import { getComponentPreview } from '../../../lib/component-preview';
import styles from './component-page.module.css';

const siteUrl = 'https://rendyn.dev';

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

  const title = `${component.name} component example for Claude Code | Rendyn`;
  const description = `Try a live ${component.name} React component example. See usage guidance, dependencies, and a ready-to-copy prompt for Claude Code, Codex, Cursor, and other coding agents.`;
  const canonical = `/components/${component.publicSlug}`;

  return {
    title,
    description,
    alternates: { canonical },
    keywords: [
      `${component.name} component`,
      `${component.name} example`,
      `${component.name} React`,
      `${component.name} Claude Code`,
      `${component.name} Codex`,
      ...component.metadata.tags,
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      images: ['/og.png'],
    },
    robots: { index: true, follow: true },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.png'],
    },
  };
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { componentSlug } = await params;
  const component = findCatalogueEntry(componentSlug);
  if (!component) notFound();

  const relatedComponents = getRelatedCatalogueEntries(component);
  const prompt = getAgentPrompt(component);
  const displayDescription = component.publicSlug === 'stories'
    ? 'A swipeable carousel for images and video, with author details, overlays, and touch navigation.'
    : component.description;
  const canonicalUrl = `${siteUrl}/components/${component.publicSlug}`;
  const description = `A live ${component.name} React component example with usage guidance for Claude Code, Codex, Cursor, and other coding agents.`;
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
        headline: `${component.name} React component example`,
        description,
        datePublished: component.publishedAt,
        dateModified: component.updatedAt,
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
                      {entry.name}
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
              <h1>{component.name}</h1>
              <p>{displayDescription}</p>
            </div>
            <CopyPrompt prompt={prompt} />
          </header>

          <PreviewWorkbench
            component={getComponentPreview(component)}
            examples={getComponentExamples(component.category, component.slug)}
            kind={component.metadata.kind}
            useWhen={component.metadata.useWhen}
            notIdealWhen={component.metadata.notIdealWhen}
          />

          <section className={styles.contentSection} id="install">
            <div className={styles.sectionHeading}>
              <h2>Installation</h2>
              <p>Add {component.name} to your project with your coding agent.</p>
            </div>
            <div className={styles.promptBox}>
              <div><span><span aria-hidden="true">⌘</span> Agent prompt</span><CopyPrompt prompt={prompt} /></div>
              <pre><code>{prompt}</code></pre>
            </div>
          </section>

          <section className={styles.contentSection} id="implementation">
            <div className={styles.sectionHeading}>
              <h2>Component details</h2>
              <p>The essentials for working with this component.</p>
            </div>
            <dl className={styles.profileGrid}>
              <div><dt>Component type</dt><dd>{component.metadata.kind === 'block' ? 'Composed product block' : 'Reusable interface component'}</dd></div>
              <div><dt>Interaction</dt><dd>{component.metadata.interactions.length > 0 ? component.metadata.interactions.join(' · ') : 'Static presentation'}</dd></div>
              <div><dt>Dependencies</dt><dd>{component.dependencies.length > 0 ? component.dependencies.join(' · ') : 'See the component installation steps'}</dd></div>
              <div><dt>Licence</dt><dd>MIT licensed · complete editable source</dd></div>
            </dl>
            <div className={styles.tagRow} aria-label="Component characteristics">
              {component.metadata.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </section>

          <section className={styles.relatedSection} id="related">
            <div className={styles.sectionHeading}>
              <h2>Related components</h2>
            </div>
            <div className={styles.relatedGrid}>
              {relatedComponents.map((related) => (
                <a href={`/components/${related.publicSlug}`} key={related.publicSlug}>
                  <span>{related.categoryLabel}</span>
                  <strong>{related.name}</strong>
                  <p>{related.description}</p>
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
            <a href="#preview">Preview</a>
            <a href="#install">Installation</a>
            <a href="#implementation">Component details</a>
            <a href="#related">Related components</a>
          </nav>
          <div className={styles.agentNote}>
            <span aria-hidden="true">✳</span>
            <strong>From preview to product.</strong>
            <p>Let your agent bring this component into your codebase.</p>
            <a href="#install">Get the prompt <span aria-hidden="true">↗</span></a>
          </div>
        </aside>
      </div>
      <SiteFooter />
    </main>
  );
}
