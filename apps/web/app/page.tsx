import { isFreeAccessActive } from '../../../packages/catalog/src/free-access';
import './globals.css';
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim can hydrate from a second React context. */

import type { Metadata } from 'next';
import { SiteHeader } from './components/site-header';
import { SiteFooter } from './components/site-footer';
import { HomeDemo } from './components/home-demo';
import { catalogueEntries } from '../lib/catalogue';
import { getComponentPreview } from '../lib/component-preview';
import styles from './home.module.css';
import { CatalogueFeatureGrid } from './components/catalogue-feature-grid';
import { HorizonWall } from './components/horizon-wall';
import { homeDescription, homeStructuredData, homeTitle, pageMetadata } from '../lib/seo';

export const metadata: Metadata = pageMetadata(homeTitle, homeDescription, '/');

const codingAgents = [
  { name: 'Codex', logo: '/agent-logos/codex.svg' },
  { name: 'Claude Code', logo: '/agent-logos/claude-code.svg' },
  { name: 'Cursor', logo: '/agent-logos/cursor.svg' },
  { name: 'Cline', logo: '/agent-logos/cline.svg' },
  { name: 'Windsurf', logo: '/agent-logos/windsurf.svg' },
  { name: 'GitHub Copilot', logo: '/agent-logos/github-copilot.svg' },
  { name: 'Gemini CLI', logo: '/agent-logos/gemini-cli.svg' },
  { name: 'OpenCode', logo: '/agent-logos/opencode.svg' },
];

const demoExamples = ['cylinder-carousel', 'shader-background', 'dock'].flatMap((slug) => {
  const entry = catalogueEntries.find((component) => component.slug === slug);
  return entry ? [getComponentPreview(entry)] : [];
});

const steps = [
  { number: '01', title: 'Start with an idea', copy: 'Tell your agent what you’re building and how it should feel.' },
  { number: '02', title: 'Find your favourite', copy: 'Explore working components and choose the details that fit.' },
  { number: '03', title: 'Make it your own', copy: 'Get the source, dependencies and install steps. Build from there.' },
];

const collectionStats = [
  { category: 'motion', label: 'Interactions', description: 'The details that make it feel right.' },
  { category: 'agents', label: 'Agent interfaces', description: 'A human touch for AI products.' },
  { category: 'blocks', label: 'Components & blocks', description: 'Good foundations for big ideas.' },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData).replace(/</g, '\\u003c') }}
      />
      <SiteHeader activeSection="product" />
      <section className={styles.hero} id="top">
        <div className={styles.copy}>
          <span className={styles.eyebrow}><i aria-hidden="true" /> React UI components for AI coding agents</span>
          <h1>The details make<br />the difference.</h1>
          <p>Explore Rendyn’s React components with live previews and complete TypeScript source. Connect Claude Code, Codex or Cursor through MCP.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="/components">Explore the collection <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <HorizonWall componentCount={catalogueEntries.length} />
      </section>

      <section className={styles.trust} aria-label="Compatible coding tools">
        <p>A little more design.<br /><strong>In the tools you already love.</strong></p>
        <div>
          {codingAgents.slice(0, 5).map((agent) => (
            <span key={agent.name}><img src={agent.logo} alt="" />{agent.name}</span>
          ))}
        </div>
      </section>

      <section className={styles.playground} aria-labelledby="playground-heading">
        <div>
          <span className={styles.kicker}>The playground</span>
          <h2 id="playground-heading">Good design is<br />in the interaction.</h2>
          <p>Try a few favourites. Explore the states, feel the transitions, and find the details that belong in your next project.</p>
          <a className={styles.textLink} href="/components">Find your next component <span aria-hidden="true">↗</span></a>
          <div className={styles.notes}><span><b>{catalogueEntries.length}</b> components</span><span>MIT licensed</span><span>Built to be yours</span></div>
        </div>
        <div className={styles.showcase}>
          <HomeDemo examples={demoExamples} />
        </div>
      </section>

      <section className={styles.collection} id="components">
        <div className={styles.sectionHeading}>
          <div><span className={styles.kicker}>A considered collection</span><h2>Small details.<br />A big difference.</h2></div>
          <p>From the first click to the final state, find components with a little more care built in.</p>
        </div>
        <CatalogueFeatureGrid />
        <div className={styles.collectionStats}>
          {collectionStats.map(({ category, label, description }) => (
            <a href={`/components?category=${category}`} key={category}>
              <strong>{catalogueEntries.filter((entry) => entry.category === category).length}</strong>
              <div><h3>{label}</h3><p>{description}</p></div>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.workflow} id="how-it-works">
        <div className={styles.sectionHeading}>
          <div><span className={styles.kicker}>From inspiration to implementation</span><h2>Less starting over.<br />More making it yours.</h2></div>
          <a className={styles.textLink} href="/components">Take a look around <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.steps}>
          {steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.connect} id="for-teams">
        <div id="docs">
          <span className={styles.kicker}>Made for your workflow</span>
          <h2>Your favourite agent.<br />A better eye for design.</h2>
          <p>One connection gives you and your team the same considered collection. Complete source, ready to adapt to the way you build.</p>
          <a className={styles.primary} href={isFreeAccessActive() ? '/login?next=%2Fapp' : '/pricing'}>{isFreeAccessActive() ? 'Get started free' : 'Find your plan'} <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.tools} aria-label="MCP-compatible coding agents">
          {codingAgents.map((agent) => (
            <div key={agent.name}><img src={agent.logo} alt="" /><span>{agent.name}</span></div>
          ))}
        </div>
      </section>

      <section className={styles.closing} id="get-started">
        <span className={styles.kicker}>Your next great interface starts here</span>
        <h2>Make something<br />worth clicking.</h2>
        <a className={styles.primary} href="/components">Explore the collection <span aria-hidden="true">↗</span></a>
        <p>{catalogueEntries.length} components. Endless possibilities.</p>
      </section>
      <SiteFooter />
    </main>
  );
}
