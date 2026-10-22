import codexLogo from '../public/agent-logos/codex.svg?raw';
import claudeLogo from '../public/agent-logos/claude-code.svg?raw';
import cursorLogo from '../public/agent-logos/cursor.svg?raw';
import clineLogo from '../public/agent-logos/cline.svg?raw';
import windsurfLogo from '../public/agent-logos/windsurf.svg?raw';
import './globals.css';
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim can hydrate from a second React context. */

import type { Metadata } from 'next';
import { SiteHeader } from './components/site-header';
import { SiteFooter } from './components/site-footer';
import { HomeDemo } from './components/home-demo';
import { catalogueEntries } from '../lib/catalogue';
import { getComponentPreview } from '../lib/component-preview';
import styles from './home.module.css';
import { HomeComponentPreview as ComponentPreview } from './components/home-component-preview';
import { HorizonWall } from './components/horizon-wall';
import { homeDescription, homeStructuredData, homeTitle, pageMetadata } from '../lib/seo';

export const metadata: Metadata = pageMetadata(homeTitle, homeDescription, '/');

const codingAgents = [
  { name: 'Codex', logo: codexLogo },
  { name: 'Claude Code', logo: claudeLogo },
  { name: 'Cursor', logo: cursorLogo },
  { name: 'Cline', logo: clineLogo },
  { name: 'Windsurf', logo: windsurfLogo },
  { name: 'GitHub Copilot', logo: '/agent-logos/github-copilot.svg' },
  { name: 'Gemini CLI', logo: '/agent-logos/gemini-cli.svg' },
  { name: 'OpenCode', logo: '/agent-logos/opencode.svg' },
];

const demoExamples = ['cylinder-carousel', 'shader-background', 'dock'].flatMap((slug) => {
  const entry = catalogueEntries.find((component) => component.slug === slug);
  return entry ? [getComponentPreview(entry)] : [];
});

const steps = [
  { title: 'Start with an idea', copy: 'Tell your agent what you’re building and how it should feel.' },
  { title: 'Find your favourite', copy: 'Explore working components and choose the details that fit.' },
  { title: 'Make it your own', copy: 'Get the source, dependencies and install steps. Build from there.' },
];

const featuredComponents = [
  { slug: 'magicui-animated-beam', copy: 'Flowing connections that bring integrations to life.' },
  { slug: 'magicui-globe', copy: 'A rotating globe that brings a global story to life.' },
  { slug: 'morphing-modal', copy: 'A compact trigger that opens into a fluid, animated dialog.' },
  { slug: 'tabs', copy: 'Smooth transitions between neatly organised views.' },
].flatMap(({ slug, copy }) => {
  const entry = catalogueEntries.find((component) => component.slug === slug);
  return entry ? [{ ...getComponentPreview(entry), copy }] : [];
});

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
      <SiteHeader activeSection="product" showArrows={false} />
      <section className={styles.hero} id="top">
        <div className={styles.copy}>
          <span className={styles.eyebrow}><i aria-hidden="true" /> React UI components for AI coding agents</span>
          <h1>Give your agent<br />taste.</h1>
          <p>Free components. Full source. Ready for your AI agent through MCP.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="/login?next=%2Fapp%2Fmcp">Connect to MCP</a>
            <a className={styles.textLink} href="/components">Browse components</a>
          </div>
        </div>
        <HorizonWall componentCount={catalogueEntries.length} />
      </section>

      <section className={styles.trust} aria-label="Compatible coding tools">
        <p>A little more design.<br /><strong>In the tools you already love.</strong></p>
        <div>
          {codingAgents.slice(0, 5).map((agent) => (
            <span key={agent.name}><i aria-hidden="true" dangerouslySetInnerHTML={{ __html: agent.logo }} />{agent.name}</span>
          ))}
        </div>
      </section>

      <section className={styles.playground} aria-labelledby="playground-heading">
        <div>
          <span className={styles.kicker}>The playground</span>
          <h2 id="playground-heading">Good design is<br />in the interaction.</h2>
          <p>Try a few favourites. Explore the states, feel the transitions, and find the details that belong in your next project.</p>
          <a className={styles.textLink} href="/components">Browse components</a>
        </div>
        <div className={styles.showcase}>
          <HomeDemo examples={demoExamples} />
        </div>
      </section>

      <section className={styles.collection} id="components">
        <div className={styles.sectionHeading}>
          <div><h2>Real components.<br />Ready for your project.</h2></div>
          <p>Rendyn is a library of React components for you and your AI agent. Try them here, then copy the source or add them to your project through MCP.</p>
        </div>
        <div className={styles.componentGrid}>
          {featuredComponents.map((component) => (
            <article className={styles.componentFeature} key={component.previewId}>
              <div className={styles.componentCanvas}>
                <ComponentPreview compact component={component} size="card" example="homepage" />
              </div>
              <div className={styles.componentCaption}>
                <div><h3><a href={`/components/${component.publicSlug}`}>{component.name}</a></h3><p>{component.copy}</p></div>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.collectionActions}>
          <a className={styles.primary} href="/login?next=%2Fapp%2Fmcp">Connect to MCP</a>
          <a className={styles.textLink} href="/components">Browse components</a>
        </div>
        <div className={styles.collectionStats}>
          {collectionStats.map(({ category, label, description }) => (
            <a href={`/components?category=${category}`} key={category}>
              <strong>{catalogueEntries.filter((entry) => entry.category === category).length}</strong>
              <div><h3>{label}</h3><p>{description}</p></div>

            </a>
          ))}
        </div>
      </section>

      <section className={styles.workflow} id="how-it-works">
        <div className={styles.sectionHeading}>
          <div><span className={styles.kicker}>From inspiration to implementation</span><h2>Less starting over.<br />More making it yours.</h2></div>
          <a className={styles.textLink} href="/components">Take a look around</a>
        </div>
        <div className={styles.steps}>
          {steps.map((step) => (
            <article key={step.title}>
              <span className={styles.stepPath} aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.connect} id="for-teams">
        <div id="docs">
          <h2>Great UI.<br />In your editor.</h2>
          <p>Give your agent components, previews and source through MCP.</p>
          <a className={styles.primary} href="/login?next=%2Fapp%2Fmcp">Connect to MCP</a>
        </div>
        <ul className={styles.tools} aria-label="MCP-compatible coding agents">
          {codingAgents.map((agent) => (
            <li key={agent.name}>{agent.name}</li>
          ))}
        </ul>
      </section>

      <section className={styles.closing} id="get-started">
        <span className={styles.kicker}>Your next great interface starts here</span>
        <h2>Make something<br />worth clicking.</h2>
        <div className={styles.actions}>
          <a className={styles.primary} href="/login?next=%2Fapp%2Fmcp">Connect to MCP</a>
          <a className={styles.textLink} href="/components">Browse components</a>
        </div>
        <p>{catalogueEntries.length} components. Endless possibilities.</p>
      </section>
      <SiteFooter />
    </main>
  );
}
