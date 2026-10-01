/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors match the existing Vinext product shell. */
import { catalogueEntries } from '../../lib/catalogue';
import { getComponentPreview } from '../../lib/component-preview';
import { siteOrigin } from '../../lib/seo';
import { ComponentPreview } from '../components/component-preview';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import type { CollectionContent } from './collection-content';
import styles from './collections.module.css';

function collectionEntry(slug: string) {
  const component = catalogueEntries.find((entry) => entry.slug === slug);
  if (!component) throw new Error(`Collection references an unknown catalogue component: ${slug}`);
  return component;
}

export function CollectionPage({ collection }: { collection: CollectionContent }) {
  const items = collection.groups.flatMap((group) => group.items);
  const preview = collectionEntry(collection.previewSlug);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteOrigin}${collection.path}`,
        url: `${siteOrigin}${collection.path}`,
        name: collection.heading,
        description: collection.description,
        mainEntity: { '@id': `${siteOrigin}${collection.path}#component-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${siteOrigin}${collection.path}#component-list`,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => {
          const entry = collectionEntry(item.slug);
          return { '@type': 'ListItem', position: index + 1, name: entry.name, url: `${siteOrigin}/components/${entry.publicSlug}` };
        }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Rendyn', item: `${siteOrigin}/` },
          { '@type': 'ListItem', position: 2, name: 'Components', item: `${siteOrigin}/components` },
          { '@type': 'ListItem', position: 3, name: collection.heading, item: `${siteOrigin}${collection.path}` },
        ],
      },
    ],
  };

  return (
    <>
      <SiteHeader activeSection="catalogue" />
      <main className={styles.page} id="collection-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <a href="/components">Components</a><span aria-hidden="true">/</span><span>Collections</span>
        </nav>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>The Rendyn collection · {items.length} selected components</p>
            <h1>{collection.heading}</h1>
            <p className={styles.intro}>{collection.intro}</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#components">Find your component <span aria-hidden="true">↓</span></a>
              <a className={styles.secondary} href="#examples">Explore the examples</a>
            </div>
            <p className={styles.heroNote}>React · TypeScript · Live previews · Component source</p>
          </div>
          <figure className={styles.heroPreview}>
            <div className={styles.previewBar}><span>Live from the catalogue</span><a href={`/components/${preview.publicSlug}`}>{preview.name} <span aria-hidden="true">↗</span></a></div>
            <div className={styles.previewStage}><ComponentPreview component={getComponentPreview(preview)} size="hero" priority /></div>
            <figcaption>{collection.previewCaption}</figcaption>
          </figure>
        </header>

        <nav className={styles.contents} aria-label="In this collection">
          {collection.groups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.title}</a>)}
          <a href="#examples">Examples</a>
          <a href="#questions">Questions</a>
        </nav>

        <div id="components" className={styles.componentSections}>
          {collection.groups.map((group, groupIndex) => (
            <section className={styles.group} id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
              <div className={styles.sectionHeading}>
                <span className={styles.number}>0{groupIndex + 1}</span>
                <div><h2 id={`${group.id}-title`}>{group.title}</h2><p>{group.description}</p></div>
              </div>
              <div className={styles.cards}>
                {group.items.map((item) => {
                  const component = collectionEntry(item.slug);
                  return (
                    <article className={styles.card} key={item.slug}>
                      <p className={styles.cardPurpose}>{item.purpose}</p>
                      <h3><a href={`/components/${component.publicSlug}`}>{component.name} <span aria-hidden="true">↗</span></a></h3>
                      <p>{item.detail}</p>
                      <a className={styles.cardLink} href={`/components/${component.publicSlug}`}>Preview, API &amp; source <span className={styles.srOnly}>for {component.name}</span><span aria-hidden="true">→</span></a>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className={styles.examples} id="examples" aria-labelledby="examples-title">
          <div className={styles.sectionIntro}><p className={styles.kicker}>From components to a product</p><h2 id="examples-title">Three ways to put them to work</h2><p>Start with the user’s task, then choose the smallest set of components that makes it clear.</p></div>
          <div className={styles.recipes}>
            {collection.recipes.map((recipe) => (
              <article className={styles.recipe} key={recipe.title}>
                <h3>{recipe.title}</h3><p>{recipe.description}</p>
                <ol>
                  {recipe.steps.map((step) => {
                    const component = collectionEntry(step.slug);
                    return <li key={step.slug}><a href={`/components/${component.publicSlug}`}>{component.name}</a><p>{step.text}</p></li>;
                  })}
                </ol>
                <p className={styles.boundary}>{recipe.boundary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.codeExample} aria-labelledby="code-title">
          <div><p className={styles.kicker}>A small implementation example</p><h2 id="code-title">{collection.example.title}</h2><p>{collection.example.description}</p><p className={styles.exampleNote}>{collection.example.note}</p></div>
          <pre tabIndex={0} aria-label={`${collection.example.title} code`}><code>{collection.example.code}</code></pre>
        </section>

        <section className={styles.implementation} aria-labelledby="implementation-title">
          <div className={styles.sectionIntro}><p className={styles.kicker}>Make it fit your application</p><h2 id="implementation-title">Before you ship</h2></div>
          <div className={styles.notes}>{collection.implementation.map((note) => <article key={note.title}><h3>{note.title}</h3><p>{note.text}</p></article>)}</div>
          {collection.path === '/collections/ai-agent-ui' && <p className={styles.inlineLink}>See the full interface composition in <a href={`/components/${collectionEntry('chat-app').publicSlug}`}>Chat App</a>.</p>}
        </section>

        <section className={styles.questions} id="questions" aria-labelledby="questions-title">
          <h2 id="questions-title">Common questions</h2>
          <div>{collection.questions.map((question) => <details key={question.question}><summary>{question.question}</summary><p>{question.answer}</p></details>)}</div>
        </section>

        <aside className={styles.references} aria-label="Further reading">
          <h2>Further reading</h2><p>First-party references for the implementation patterns discussed here. Component-specific source and attribution are on each catalogue page.</p>
          <ul>{collection.sources.map((source) => <li key={source.href}><a href={source.href}>{source.label} <span aria-hidden="true">↗</span></a><span>{source.description}</span></li>)}</ul>
        </aside>

        <p className={styles.inlineLink}>Prefer choosing components with your coding agent? <a href="/mcp">Connect Rendyn through MCP</a> to search and retrieve implementation context.</p>
        <section className={styles.explore} aria-label="Keep exploring">
          <div><p className={styles.kicker}>Keep exploring</p><h2>{collection.related.label}</h2><p>{collection.related.description}</p><a href={collection.related.href}>Explore the collection <span aria-hidden="true">↗</span></a></div>
          <div><p className={styles.kicker}>Choose your next component</p><h2>Try it in the catalogue</h2><p>Inspect the live preview, usage, dependencies and upstream attribution before adapting it to your app.</p><a href={collection.catalogueHref}>{collection.catalogueLabel} <span aria-hidden="true">↗</span></a><a className={styles.pricingLink} href="/pricing">See source access and pricing</a></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
