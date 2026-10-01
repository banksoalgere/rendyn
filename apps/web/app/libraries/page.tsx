/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors match the Vinext product shell. */
import '../globals.css';
import { catalogueEntries } from '../../lib/catalogue';
import { pageMetadata } from '../../lib/seo';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import libraries from '../../../preview/generated/library-summary.json';
import styles from '../collections/collections.module.css';
import libraryStyles from './libraries.module.css';

export const metadata = pageMetadata('MIT React component libraries', 'Explore components from shadcn/ui, Origin UI, MUI, Mantine, Ant Design, Chakra UI and HeroUI with previews, source and installation instructions.', '/libraries');

export default function LibrariesPage() {
  return <>
    <SiteHeader activeSection="catalogue" />
    <main className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><a href="/components">Components</a><span aria-hidden="true">/</span><span>Libraries</span></nav>
      <header className={`${styles.hero} ${libraryStyles.hero}`}><div className={styles.heroCopy}>
        <p className={styles.kicker}>Seven libraries · {libraries.reduce((n,library)=>n+library.familyCount,0).toLocaleString('en-GB')} entries · {libraries.reduce((n,library)=>n+library.exampleCount,0).toLocaleString('en-GB')} examples · MIT</p>
        <h1>Find the library that fits your interface.</h1>
        <p className={styles.intro}>Explore components, charts, blocks and published variants from seven established React libraries. Each entry includes its original MIT notice, a live preview and the source you need to get started.</p>
      </div></header>
      <nav className={styles.contents} aria-label="Component libraries">{libraries.map(library => <a key={library.id} href={`#${library.id}`}>{library.name}</a>)}</nav>
      <div className={styles.componentSections}>
        {libraries.map((library, index) => <section className={styles.group} key={library.id} id={library.id} aria-labelledby={`${library.id}-title`}>
          <div className={styles.sectionHeading}><span className={styles.number}>0{index + 1}</span><div>
            <h2 id={`${library.id}-title`}>{library.name}</h2>
            <p>{['shadcn', 'originui'].includes(library.id) ? 'Copy the component source into your application.' : 'Use the official package with a complete example and provider setup.'} <a href={library.repository} target="_blank" rel="noopener noreferrer">Upstream project ↗</a></p>
          </div></div>
          <div className={styles.cards}>{catalogueEntries.filter(entry => entry.sourceId === library.id).slice(0,4).map(entry => <article className={styles.card} key={entry.slug}>
            <p className={styles.cardPurpose}>MIT · React</p><h3><a href={`/components/${entry.publicSlug}`}>{entry.name} ↗</a></h3><p>{entry.description}</p><a className={styles.cardLink} href={`/components/${entry.publicSlug}`}>Preview, source &amp; installation →</a>
          </article>)}</div>
          <details className={libraryStyles.allEntries}><summary>Browse all {library.familyCount} entries and {library.exampleCount} examples from {library.name}</summary><div className={styles.cards}>{catalogueEntries.filter(entry=>entry.sourceId===library.id).map(entry=><article className={styles.card} key={entry.slug}><h3><a href={`/components/${entry.publicSlug}`}>{entry.name} ↗</a></h3><p>{entry.description}</p></article>)}</div></details>
        </section>)}
      </div>
      <p className={styles.heroNote}>This catalogue includes all eligible public examples at the pinned upstream revisions. Select variants on each component page. Origin UI entries come from the MIT-licensed apps/origin directory.</p>
    </main>
    <SiteFooter />
  </>;
}
