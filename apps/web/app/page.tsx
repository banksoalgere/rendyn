/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim can hydrate from a second React context. */

import type { Metadata } from 'next';
import { SiteHeader } from './components/site-header';
import { SiteFooter } from './components/site-footer';
import { HomeDemo } from './components/home-demo';
import { catalogueEntries } from '../lib/catalogue';
import { getComponentPreview } from '../lib/component-preview';
import styles from './home.module.css';
import { CatalogueFeatureGrid } from './components/catalogue-feature-grid';

const title = 'React UI Components for AI Coding Agents | Rendyn';
const description = 'Browse 189 polished React UI components with live previews, complete TypeScript source, and MCP-ready context for Claude Code, Codex, Cursor, and other coding agents.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    locale: 'en_GB',
    siteName: 'Rendyn',
    type: 'website',
    url: '/',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.png'],
  },
};

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

const demoExamples = [
  { slug: 'approval-card', label: 'Agent workspace', description: 'A little human input. A much better outcome.' },
  { slug: 'table', label: 'Team dashboard', description: 'A clear view of your team, down to the last detail.' },
  { slug: 'signup-form', label: 'Onboarding', description: 'Make a great first impression, one field at a time.' },
].flatMap(({ slug, label, description }) => {
  const entry = catalogueEntries.find((component) => component.slug === slug);
  return entry ? [{ label, description, ...getComponentPreview(entry) }] : [];
});

const steps = [
  { number: '01', title: 'Start with an idea', copy: 'Tell your agent what you’re building and how it should feel.' },
  { number: '02', title: 'Find your favourite', copy: 'Explore working components and choose the details that fit.' },
  { number: '03', title: 'Make it your own', copy: 'Get the source, dependencies and install steps. Build from there.' },
];

const collectionStats = [
  { category: 'motion', label: 'Interactions', description: 'The details that make it feel right.' },
  { category: 'agents', label: 'Agent interfaces', description: 'A human touch for AI products.' },
  { category: 'blocks', label: 'Product blocks', description: 'Good foundations for big ideas.' },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <SiteHeader activeSection="product" />
      <section className={styles.hero} id="top">
        <div className={styles.copy}>
          <span className={styles.eyebrow}><i /> For people who care about the details</span>
          <h1>Good ideas.<br />Beautiful<br /><em>interfaces.</em></h1>
          <p>Give your coding agent a head start with thoughtfully crafted React components. Ready to explore. Yours to make your own.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="/components">Find your next component <span aria-hidden="true">↗</span></a>
            <a className={styles.secondary} href="/pricing">Start 7-day trial <span aria-hidden="true">→</span></a>
          </div>
          <div className={styles.notes}><span><b>{catalogueEntries.length}</b> components</span><span>MIT licensed</span><span>Built to be yours</span></div>
        </div>
        <div className={styles.showcase}>
          <div className={styles.showcaseLabel}><span>THE PLAYGROUND</span><span>Go on. Try it out ↘</span></div>
          <HomeDemo examples={demoExamples} componentCount={catalogueEntries.length} />
          <p className={styles.showcaseNote}><span aria-hidden="true">✳</span> Good design is in the interaction.</p>
        </div>
      </section>

      <section className={styles.trust} aria-label="Compatible coding tools">
        <p>A little more design.<br /><strong>In the tools you already love.</strong></p>
        <div>
          {codingAgents.slice(0, 5).map((agent) => (
            <span key={agent.name}><img src={agent.logo} alt="" />{agent.name}</span>
          ))}
        </div>
      </section>

      <section className={styles.collection} id="components">
        <div className={styles.sectionHeading}>
          <div><span className={styles.kicker}>A considered collection</span><h2>Small details.<br /><em>A big difference.</em></h2></div>
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
          <div><span className={styles.kicker}>From inspiration to implementation</span><h2>Less starting over.<br /><em>More making it yours.</em></h2></div>
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
          <h2>Your favourite agent.<br /><em>A better eye for design.</em></h2>
          <p>One connection gives you and your team the same considered collection. Complete source, ready to adapt to the way you build.</p>
          <a className={styles.primary} href="/pricing">Find your plan <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.tools} aria-label="MCP-compatible coding agents">
          {codingAgents.map((agent) => (
            <div key={agent.name}><img src={agent.logo} alt="" /><span>{agent.name}</span></div>
          ))}
        </div>
      </section>

      <section className={styles.closing} id="get-started">
        <span className={styles.kicker}>Your next great interface starts here</span>
        <h2>Make something<br /><em>worth clicking.</em></h2>
        <a className={styles.primary} href="/components">Explore the collection <span aria-hidden="true">↗</span></a>
        <p>{catalogueEntries.length} components. Endless possibilities.</p>
      </section>
      <SiteFooter />
    </main>
  );
}
