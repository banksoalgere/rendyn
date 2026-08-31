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
import styles from './component-page.module.css';

const siteUrl = 'https://designmcp.jneilbaker.chatgpt.site';

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

  const title = `${component.name} component example for Claude Code | DesignMCP`;
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
          { '@type': 'ListItem', position: 1, name: 'DesignMCP', item: siteUrl },
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

      <header className={styles.topbar}>
        <a className={styles.brand} href="/" aria-label="DesignMCP home">
          <span>D</span><strong>DesignMCP</strong>
        </a>
        <nav aria-label="Component page navigation">
          <a href="/components">All components</a>
          <a href="/#docs">Connect</a>
        </nav>
      </header>

      <div className={styles.docsShell}>
        <aside className={styles.componentNav}>
          <a className={styles.catalogueBack} href="/components">
            <span aria-hidden="true">←</span> Component catalogue
          </a>
          <div className={styles.navScroll}>
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
          </div>
        </aside>

        <article className={styles.article}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
            <a href="/components">Components</a>
            <span aria-hidden="true">›</span>
            <span>{component.name}</span>
          </nav>

          <header className={styles.componentHeader}>
            <div>
              <span className={styles.category}>{component.categoryLabel}</span>
              <h1>{component.name}</h1>
              <p>{component.description}</p>
            </div>
            <CopyPrompt prompt={prompt} />
          </header>

          <section aria-label={`${component.name} live example`} className={styles.previewSection} id="preview">
            <div className={styles.previewCanvas}>
              <iframe
                loading="eager"
                sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
                src={`/component-preview/${component.previewId}`}
                title={`${component.name} interactive React component example`}
              />
            </div>
          </section>

          <section className={styles.contentSection} id="usage">
            <div className={styles.sectionHeading}>
              <span>01</span>
              <div><p>Usage guidance</p><h2>When to use {component.name}</h2></div>
            </div>
            <div className={styles.guidanceGrid}>
              <article>
                <span>Use it when</span>
                <p>{component.metadata.useWhen[0] ?? component.description}</p>
              </article>
              <article>
                <span>Choose another pattern when</span>
                <p>{component.metadata.notIdealWhen[0] ?? 'A simpler interface would communicate the outcome more clearly.'}</p>
              </article>
            </div>
          </section>

          <section className={styles.contentSection} id="install">
            <div className={styles.sectionHeading}>
              <span>02</span>
              <div><p>Agent install</p><h2>Add the complete component</h2></div>
            </div>
            <div className={styles.promptBox}>
              <div><span>Agent prompt</span><CopyPrompt prompt={prompt} /></div>
              <pre><code>{prompt}</code></pre>
            </div>
          </section>

          <section className={styles.contentSection} id="implementation">
            <div className={styles.sectionHeading}>
              <span>03</span>
              <div><p>Implementation profile</p><h2>What your agent should preserve</h2></div>
            </div>
            <dl className={styles.profileGrid}>
              <div><dt>Component type</dt><dd>{component.metadata.kind === 'block' ? 'Composed product block' : 'Reusable interface component'}</dd></div>
              <div><dt>Interaction</dt><dd>{component.metadata.interactions.length > 0 ? component.metadata.interactions.join(' · ') : 'Static presentation'}</dd></div>
              <div><dt>Dependencies</dt><dd>{component.dependencies.length > 0 ? component.dependencies.join(' · ') : 'No external packages'}</dd></div>
              <div><dt>Licence</dt><dd>MIT licensed · complete editable source</dd></div>
            </dl>
            <div className={styles.tagRow} aria-label="Component characteristics">
              {component.metadata.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </section>

          <section className={styles.relatedSection} id="related">
            <div className={styles.sectionHeading}>
              <span>04</span>
              <div><p>Keep exploring</p><h2>Related components</h2></div>
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
            <a href="/components"><span aria-hidden="true">←</span> Browse all 189 components</a>
            <a href="/#docs">Connect DesignMCP <span aria-hidden="true">→</span></a>
          </footer>
        </article>

      </div>
    </main>
  );
}
