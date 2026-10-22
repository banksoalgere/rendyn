import '../../globals.css';
import '../../styles/editorial-guides.css';
import '../../styles/editorial.css';
import { GuideHeading } from '../../components/guide-heading';
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext can hydrate next/link from a second React context; native anchors avoid that runtime failure. */
import type { Metadata } from 'next';
import Image from 'next/image';
import bentoGridPreview from '../../../../../catalog/previews/delivery/magicui-bento-grid.png';
import styles from './templates.module.css';
import { FinalCallToAction } from '../../components/site-footer';
import { CopyTemplate } from './copy-template';

const pageTitle = 'Claude Code Website Templates & UI Starters (2026)';
const pageDescription = 'Choose Claude Code website templates for landing pages, SaaS dashboards and React UI, with source comparisons, build recipes and a starter CLAUDE.md.';
const articleUrl = 'https://rendyn.dev/blog/best-claude-code-templates';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ['Claude Code website templates', 'Claude Code landing page templates', 'Claude Code dashboard starter', 'Claude Code React UI', 'CLAUDE.md template'],
  alternates: { canonical: '/blog/best-claude-code-templates' },
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    siteName: 'Rendyn',
    locale: 'en_GB',
    title: pageTitle,
    description: pageDescription,
    authors: ['Rendyn editorial'],
    images: ['/og.png'],
    modifiedTime: '2026-09-29',
    publishedTime: '2026-08-29',
    type: 'article',
    url: '/blog/best-claude-code-templates',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/og.png'],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${articleUrl}#article`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
  headline: pageTitle,
  description: pageDescription,
  datePublished: '2026-08-29',
  dateModified: '2026-09-29',
  inLanguage: 'en',
  author: { '@type': 'Organization', name: 'Rendyn editorial' },
  publisher: { '@type': 'Organization', name: 'Rendyn', url: 'https://rendyn.dev' },
};

const websiteStarters = [
  {
    name: 'Vercel Templates',
    href: 'https://vercel.com/templates',
    fit: 'Landing pages, portfolios and framework examples',
    format: 'Starter repositories; inspect the chosen stack',
    limitation: 'Individual publishers set the licence and service requirements.',
  },
  {
    name: 'Next.js SaaS Starter',
    href: 'https://vercel.com/templates/next.js/next-js-saas-starter',
    fit: 'An account-based product with a dashboard',
    format: 'Next.js, Postgres, Drizzle, Stripe and shadcn/ui',
    limitation: 'A learning foundation with demo assumptions to review, not a finished production app.',
  },
  {
    name: 'Tailwind Plus Radiant',
    href: 'https://tailwindcss.com/plus/templates/radiant/preview',
    fit: 'A cohesive SaaS marketing website',
    format: 'Paid Tailwind CSS and React website template',
    limitation: 'Check the current licence and source requirements before purchasing.',
  },
  {
    name: 'Astro Themes',
    href: 'https://astro.build/themes/',
    fit: 'Content-led websites, blogs and documentation',
    format: 'Free and paid Astro themes',
    limitation: 'Review each theme; React components require the appropriate integration.',
  },
  {
    name: 'shadcn/ui Blocks',
    href: 'https://ui.shadcn.com/blocks',
    fit: 'A dashboard or account flow inside an existing React app',
    format: 'Open-source page blocks with editable source',
    limitation: 'A block supplies a UI pattern; your app supplies data and authorization.',
  },
];

const picks = [
  {
    number: '01',
    label: 'Best default',
    name: 'A tailored CLAUDE.md + rules',
    source: 'Anthropic documentation',
    href: 'https://code.claude.com/docs/en/features-overview',
    summary: 'The right starting point for build commands, architecture, conventions and constraints Claude should know in every session.',
    fit: 'Established repositories and teams',
    format: 'Markdown',
    strength: 'Small, native and easy to review',
    limitation: 'Instructions guide behaviour; they do not enforce a hard security boundary.',
  },
  {
    number: '02',
    label: 'Best official skill starter',
    name: 'Anthropic Agent Skills',
    source: 'anthropics/skills',
    href: 'https://github.com/anthropics/skills',
    summary: 'Official examples and a minimal SKILL.md template for repeatable workflows, reference material and task-specific expertise.',
    fit: 'Workflows you reuse but do not need always loaded',
    format: 'SKILL.md + optional resources',
    strength: 'Clear structure and progressive disclosure',
    limitation: 'The repository is educational; test examples and check each item’s licence before critical use.',
  },
  {
    number: '03',
    label: 'Best official install route',
    name: 'Claude plugin marketplace',
    source: 'Claude Code plugins',
    href: 'https://code.claude.com/docs/en/discover-plugins',
    summary: 'Anthropic’s built-in discovery route for installable plugins that can bundle skills, agents, hooks, MCP servers and code intelligence.',
    fit: 'Supported integrations and shareable bundles',
    format: 'Versioned plugin',
    strength: 'Upstream-aligned discovery and updates',
    limitation: 'A marketplace listing is not a security guarantee; inspect permissions, hooks, MCP servers and scripts.',
  },
  {
    number: '04',
    label: 'Best broad catalogue',
    name: 'Claude Code Templates / aitmpl',
    source: 'davila7/claude-code-templates',
    href: 'https://github.com/davila7/claude-code-templates',
    summary: 'A large community catalogue with component-level browsing and installation across agents, skills, hooks, settings, MCPs and commands.',
    fit: 'Exploring a wide range of configurations',
    format: 'CLI-installed components',
    strength: 'Breadth and a consistent discovery path',
    limitation: 'Treat the installer and every selected component as third-party code; review before running.',
  },
  {
    number: '05',
    label: 'Best research index',
    name: 'Awesome Claude Code',
    source: 'hesreallyhim/awesome-claude-code',
    href: 'https://github.com/hesreallyhim/awesome-claude-code',
    summary: 'A curated map of skills, agents, tooling, plugins and configuration projects when you want to survey the ecosystem before choosing.',
    fit: 'Discovery and comparison',
    format: 'Linked directory',
    strength: 'Useful coverage without forcing one installer',
    limitation: 'Each linked project has separate maintenance, provenance, permissions and licensing.',
  },
  {
    number: '06',
    label: 'Best website workflow',
    name: 'Web Design skill',
    source: 'xiaopu-ai/web-design',
    href: 'https://github.com/xiaopu-ai/web-design',
    summary: 'A focused, spec-first skill that can turn a brief, URL or screenshot into an editable design specification, code and an audit loop.',
    fit: 'Creating or translating visual direction',
    format: 'Claude Code skill',
    strength: 'Separates design intent from implementation',
    limitation: 'Its crawler and image-fetching scripts need review; a design workflow does not supply your application backend.',
  },
];

const starter = `# Project guide

## Product
- Purpose: [one sentence]
- Users: [primary audience]
- Non-goals: [what this project deliberately does not do]

## Architecture
- App entry: [path]
- Shared UI: [path]
- Data boundary: [path or service]
- Prefer existing patterns before introducing abstractions.

## Commands
- Install: [command]
- Develop: [command]
- Test: [command]
- Build: [command]

## Working agreement
- Validate external input at the system boundary.
- Never read, print, edit or commit secrets or environment files.
- Preserve unrelated working-tree changes.
- Keep changes scoped; explain any necessary expansion first.
- Add focused tests for changed behaviour using existing patterns.
- Report the route or behaviour tested and any remaining uncertainty.

## Definition of done
- Requested behaviour works from the user-facing surface.
- Relevant tests and the production build pass.
- Accessibility and responsive states are checked for UI work.`;

const websiteBrief = `Adapt this existing starter into a website for [product] used by [audience].
Primary action: [real destination or user flow].
Pages in scope: [landing page, pricing, dashboard, or named routes].
Use only the supplied product facts and assets; ask when content is missing.
Preserve routing, existing design tokens, account boundaries and validation.

First inspect the project and propose the smallest page composition.
For a marketing page, evaluate Bento Grid and Hero Video Dialog from Rendyn.
For a dashboard, evaluate its Table, Command Palette and Kanban components.
Read the selected component's source, dependencies and attribution before adapting it.
Use only components needed for this flow; do not install every candidate.
Keep placeholders and simulated interactions clearly labelled.

Build loading, empty and error states where relevant.
Check 390px and desktop layouts, keyboard access, focus and reduced motion.
Report the exact routes and interactions verified, plus what still needs backend work.
Do not publish or deploy without approval.`;

const toc = [
  ['website-templates', 'Website starter comparison'],
  ['website-builds', 'Landing page and dashboard'],
  ['website-brief', 'Copy a website brief'],
  ['comparison', 'Skills and instruction picks'],
  ['meaning', 'What “template” means'],
  ['criteria', 'How we chose'],
  ['reviews', 'Detailed reviews'],
  ['starter', 'Starter CLAUDE.md'],
  ['safety', 'Safe adoption'],
  ['faq', 'Questions answered'],
];

export default function BestClaudeCodeTemplatesPage() {
  return (
    <div className="editorial-page" id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }} />
      <main>
        <article>
        <GuideHeading slug="best-claude-code-templates" id="guide-title" />

        <section className="editorial-summary section-shell guide-example" aria-labelledby="short-answer-heading">
          <div className="editorial-summary-art grid-field" aria-hidden="true">
            <div className="template-orbit template-orbit--one" />
            <div className="template-orbit template-orbit--two" />
            <span>Landing page</span>
            <span>Dashboard</span>
            <span>React UI</span>
            <small>Source + project context + browser checks</small>
          </div>
          <div className="editorial-summary-copy">
            <p className="editorial-label">The short answer</p>
            <h2 id="short-answer-heading">Choose a website starter for the page you need to build.</h2>
            <p>Use a marketing template for a landing page, a SaaS starter for an account-based dashboard, or individual components inside an existing React app. Add a concise <code>CLAUDE.md</code> so Claude understands that codebase.</p>
            <a href="#website-templates">Compare website starting points <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <div className="editorial-layout section-shell guide-reading-layout">
          <aside className="editorial-sidebar guide-reading-sidebar" aria-label="Article tools">
            <div className="sidebar-card sidebar-card--toc">
              <p>In this guide</p>
              <nav aria-label="Table of contents">
                {toc.map(([href, label], index) => (
                  <a href={`#${href}`} key={href}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{label}</a>
                ))}
              </nav>
            </div>
            <div className="sidebar-card sidebar-card--cta guide-callout">
              <span className="sidebar-mark" aria-hidden="true">R</span>
              <p>Better ingredients for AI-built interfaces.</p>
              <small>Give your coding agent polished components, visual previews and complete source.</small>
              <a className="button" href="/components">Browse Rendyn <span aria-hidden="true">↗</span></a>
            </div>
            <div className="sidebar-research"><i aria-hidden="true" /> <time dateTime="2026-09-29">Updated 29 September 2026</time></div>
          </aside>

          <div className="editorial-body guide-reading-body">
            <section className="article-section article-intro" aria-labelledby="overview-heading">
              <p className="article-overline">The practical view</p>
              <h2 id="overview-heading">What should a Claude Code website template actually give you?</h2>
              <p className="article-lede">Working routes, a visible design direction and source you can inspect. Claude Code can work with a normal website repository; it does not require a special Claude-branded theme. A landing-page starter and an application dashboard have different requirements, so choose by product scope and stack before adding agent configuration.</p>
              <p>If you searched for a <code>CLAUDE.md</code> template, reusable skills or the Claude Code Templates CLI, go to the <a href="#comparison">six configuration resources</a> below. Those tools guide Claude&apos;s work; a source-code starter supplies the website. <a href="https://code.claude.com/docs/en/features-overview">Anthropic&apos;s feature overview</a> explains how project context, skills and plugins fit together.</p>
              <div className="editorial-callout">
                <span aria-hidden="true">✦</span>
                <p><strong>One important update:</strong> custom commands now live under the skills model. Existing <code>.claude/commands/</code> files still work, but Anthropic recommends skills for new workflows because they can include supporting files and load when relevant.</p>
              </div>
            </section>

            <section className="article-section" id="website-templates" aria-labelledby="website-heading">
              <p className="article-overline">Source-code starting points</p>
              <h2 id="website-heading">Compare Claude Code website templates by use case</h2>
              <p className="article-lede">For a new website, shortlist a source repository that fits your framework, pages and data requirements. None of these needs a Claude-specific installer. Open the chosen project in Claude Code, run its documented development command, and map the architecture before adapting the UI.</p>
              <div aria-label="Website starter comparison" className="comparison-table-wrap" role="region" tabIndex={0}>
                <table className="template-table">
                  <caption>Website source and page-block options for Claude Code</caption>
                  <thead><tr><th scope="col">Starting point</th><th scope="col">Website job</th><th scope="col">Stack and access</th><th scope="col">What remains</th></tr></thead>
                  <tbody>
                    {websiteStarters.map((entry) => (
                      <tr key={entry.name}>
                        <th scope="row"><a href={entry.href}>{entry.name}</a></th>
                        <td>{entry.fit}</td><td>{entry.format}</td><td>{entry.limitation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="table-note">Public documentation and demos checked on 29 September 2026. These are source and scope comparisons; paid template source was not tested.</p>
              <div className="website-choice-grid">
                <article className="website-choice website-choice--purple">
                  <span>Landing page</span><h3>Start with the story</h3>
                  <p>Choose a marketing starter with the right visual rhythm. Verify the headline, real product demonstration and primary action before adding effects. A brochure site may not need database or billing setup.</p>
                  <small>Preview: <a href="https://tailwindcss.com/plus/templates/radiant/preview">Tailwind Plus Radiant ↗</a></small>
                </article>
                <article className="website-choice website-choice--mint">
                  <span>Dashboard</span><h3>Start with the flow</h3>
                  <p>Choose a starter with the account and data model you need. Inspect roles, record actions and failure states. If you need Supabase accounts, its official Next.js quickstart is another foundation to review.</p>
                  <small>Inspect: <a href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs">Supabase Next.js quickstart ↗</a></small>
                </article>
                <article className="website-choice website-choice--peach">
                  <span>Existing React app</span><h3>Extend its UI system</h3>
                  <p>Preserve routing and shared tokens. Give Claude a small selection of components and examples from the app. A design skill can guide the procedure without introducing another application scaffold.</p>
                  <small>Explore: <a href="/components">Rendyn React components ↗</a></small>
                </article>
              </div>
              <p>A free Claude Code website template may still depend on paid services. Inspect the repository licence, dependency versions and content rights separately. If no visual template fits, begin with a framework scaffold and choose components deliberately rather than adapting a large starter around one attractive screenshot.</p>
            </section>

            <section className="article-section" id="website-builds" aria-labelledby="website-builds-heading">
              <p className="article-overline">Compose the interface</p>
              <h2 id="website-builds-heading">Build a landing page or dashboard from real components</h2>
              <p>Rendyn supplies React component previews and source access, rather than a complete Claude Code website template. These are suggested compositions inside your chosen starter. Inspect the source, dependencies, attribution and current access terms for each component before bringing it into the project.</p>
              <div className="pick-list">
                <article className="pick-card">
                  <div aria-hidden="true" className="pick-card-number">01</div>
                  <div className="pick-card-content">
                    <div className="pick-card-topline"><span>SaaS marketing website</span><span>Explain the product</span></div>
                    <h3>A landing page with product evidence</h3>
                    <p>Keep the starter&apos;s header, footer and responsive rhythm. Put the primary action beside a clear promise, then use a <a href="/components/bento-grid">Bento Grid</a> to explain three specific capabilities. A <a href="/components/hero-video-dialog">Hero Video Dialog</a> can open a real product walkthrough; use <a href="/components/marquee">Marquee</a> only for a justified logo or content strip.</p>
                    <figure className={styles.preview}>
                      <Image src={bentoGridPreview} alt="Bento Grid catalogue demo with file, notification, integration and calendar feature cards" width={640} height={400} unoptimized />
                      <figcaption>Existing <a href="/components/bento-grid">Bento Grid</a> component from Magic UI. This is catalogue demo content, not a complete website; replace sample claims and logos before publishing.</figcaption>
                    </figure>
                    <dl>
                      <div><dt>Give Claude</dt><dd>Approved product facts, real assets, the CTA destination and a visual reference you have permission to use.</dd></div>
                      <div><dt>Verify</dt><dd>Readable mobile ordering, visible feature links, keyboard focus and reduced-motion behavior. Remove any fabricated testimonials or conversion claims.</dd></div>
                    </dl>
                    <a className="source-link" href="/components/bento-grid">Preview the feature-grid component <span aria-hidden="true">↗</span></a>
                  </div>
                </article>
                <article className="pick-card">
                  <div aria-hidden="true" className="pick-card-number">02</div>
                  <div className="pick-card-content">
                    <div className="pick-card-topline"><span>Product dashboard</span><span>Finish one user flow</span></div>
                    <h3>A dashboard for tracking and acting on work</h3>
                    <p>Keep the starter&apos;s navigation and account boundary. Use the <a href="/components/table">Virtualized Data Table</a> for records and a <a href="/components/command-palette">Command Palette</a> for navigation or actions. Pick <a href="/components/kanban">Kanban</a> when statuses are central, or <a href="/components/dropzone">Dropzone</a> when users must select files.</p>
                    <dl>
                      <div><dt>Give Claude</dt><dd>Your record schema, allowed actions and examples of loading, empty and failed-save states.</dd></div>
                      <div><dt>Implement</dt><dd>Server authorization, persistence and file validation. The components supply interface behavior; your backend remains responsible for the actions.</dd></div>
                    </dl>
                    <a className="source-link" href="/components/command-palette">Preview keyboard navigation <span aria-hidden="true">↗</span></a>
                  </div>
                </article>
              </div>
              <p><a href="https://code.claude.com/docs/en/best-practices">Anthropic&apos;s best-practice guidance</a> recommends giving Claude screenshots or mockups and a way to verify the result. Attach a reference with the product constraints, build one complete flow, then inspect the actual browser result before repeating the pattern across more pages.</p>
              <p>For an AI product interface, <a href="/components/prompt-input">Prompt Input</a> and <a href="/components/streaming-response">Streaming Response</a> are useful adjacent components. They do not provide a model API, streaming transport or an agent backend.</p>
            </section>

            <section className="article-section" id="website-brief" aria-labelledby="website-brief-heading">
              <p className="article-overline">Make the starter specific</p>
              <h2 id="website-brief-heading">A Claude Code website brief you can adapt</h2>
              <p>Replace the bracketed fields and remove the recipe that does not fit your project. Provide component source through the access route available to you; naming a component in a prompt does not install it. Put durable repository facts in the <a href="#starter">CLAUDE.md starter</a> below.</p>
              <div className="starter-card">
                <div className="starter-toolbar"><span>Website adaptation brief</span><CopyTemplate value={websiteBrief} label="Copy website brief" /></div>
                <pre><code>{websiteBrief}</code></pre>
              </div>
              <p>Continue with <a href="/guides/how-to-design-a-website-with-claude-code">designing a website with Claude Code</a> for the full build workflow, or <a href="/guides/how-to-make-claude-code-better-at-design">improving Claude&apos;s design output</a> when your existing UI needs refinement.</p>
            </section>

            <section className="article-section" id="comparison" aria-labelledby="comparison-heading">
              <div className="article-heading-row">
                <div>
                  <p className="article-overline">At a glance</p>
                  <h2 id="comparison-heading">Six useful picks, each for a different job</h2>
                </div>
                <time className="research-stamp" dateTime="2026-09-29">Reviewed 29.09.26</time>
              </div>
              <div aria-label="Template comparison" className="comparison-table-wrap" role="region" tabIndex={0}>
                <table className="template-table">
                  <caption>Best Claude Code template approaches and resources by use case</caption>
                  <thead>
                    <tr><th scope="col">Pick</th><th scope="col">Best for</th><th scope="col">Format</th></tr>
                  </thead>
                  <tbody>
                    {picks.map((pick) => (
                      <tr key={pick.number}>
                        <th scope="row"><span aria-hidden="true">{pick.number}</span><a href={`#pick-${pick.number}`}>{pick.name}</a></th>
                        <td>{pick.fit}</td>
                        <td>{pick.format}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="table-note">We rank fit, inspectability and maintainability—not stars, download counters or self-reported “verified” badges.</p>
            </section>

            <section className="article-section" id="meaning" aria-labelledby="meaning-heading">
              <p className="article-overline">The taxonomy</p>
              <h2 id="meaning-heading">What are Claude Code templates?</h2>
              <p>There is no official <code>.claude/templates/</code> folder. “Claude templates” is an ecosystem label for several reusable layers. Pick the layer that owns the behaviour you want:</p>
              <div className="type-grid">
                <article><span>Always on</span><h3>CLAUDE.md + rules</h3><p>Project context, commands, architecture and conventions. Path-scoped rules keep specialist guidance out of unrelated work.</p></article>
                <article><span>On demand</span><h3>Skills</h3><p>Repeatable prompts, checklists, knowledge and multi-step workflows stored in a <code>SKILL.md</code>.</p></article>
                <article><span>Isolated</span><h3>Subagents</h3><p>Focused workers with their own context and tool access—useful when research or logs would swamp the main conversation.</p></article>
                <article><span>Deterministic</span><h3>Hooks + settings</h3><p>Event-driven scripts and permissions for checks or boundaries that should not depend on model judgement.</p></article>
                <article><span>Connected</span><h3>MCP configuration</h3><p>Live access to external systems such as source control, databases, browsers and design tools.</p></article>
                <article><span>Distributed</span><h3>Plugins</h3><p>Versioned bundles of skills, agents, hooks, MCP servers and related assets that can travel between projects.</p></article>
              </div>
            </section>

            <section className="article-section" id="criteria" aria-labelledby="criteria-heading">
              <p className="article-overline">Selection criteria</p>
              <h2 id="criteria-heading">How we chose the shortlist</h2>
              <p>We read the current Anthropic documentation first, then inspected primary repositories and live discovery surfaces. A resource moved up the list when it was easy to understand before installation and narrow enough to adapt.</p>
              <ol className="criteria-list">
                <li><span aria-hidden="true">01</span><div><strong>Current fit</strong><p>Uses modern Claude Code concepts, paths and terminology rather than deprecated conventions.</p></div></li>
                <li><span aria-hidden="true">02</span><div><strong>Inspectable source</strong><p>Lets you read the Markdown, JSON and scripts that will influence or execute on your machine.</p></div></li>
                <li><span aria-hidden="true">03</span><div><strong>Narrow authority</strong><p>Requests only the tools and permissions its job requires, with clear limits and human checkpoints.</p></div></li>
                <li><span aria-hidden="true">04</span><div><strong>Adaptability</strong><p>Encourages project-specific commands, architecture and verification instead of generic persona theatre.</p></div></li>
                <li><span aria-hidden="true">05</span><div><strong>Maintenance evidence</strong><p>Has understandable ownership, recent work, documentation and limitations—but no popularity metric substitutes for review.</p></div></li>
                <li><span aria-hidden="true">06</span><div><strong>Production discipline</strong><p>For website starters: sensible dependencies, accessibility, responsive behaviour and a real build path.</p></div></li>
              </ol>
            </section>

            <section className="article-section" id="reviews" aria-labelledby="reviews-heading">
              <p className="article-overline">The reviews</p>
              <h2 id="reviews-heading">The best resources, in detail</h2>
              <div className="pick-list">
                {picks.map((pick) => (
                  <article className="pick-card" id={`pick-${pick.number}`} key={pick.number}>
                    <div aria-hidden="true" className="pick-card-number">{pick.number}</div>
                    <div className="pick-card-content">
                      <div className="pick-card-topline"><span>{pick.label}</span><span>{pick.format}</span></div>
                      <h3>{pick.name}</h3>
                      <p className="pick-summary">{pick.summary}</p>
                      <dl>
                        <div><dt>Best fit</dt><dd>{pick.fit}</dd></div>
                        <div><dt>Why it stands out</dt><dd>{pick.strength}</dd></div>
                        <div><dt>Watch for</dt><dd>{pick.limitation}</dd></div>
                      </dl>
                      <a className="source-link" href={pick.href}>Inspect {pick.source} <span aria-hidden="true">↗</span></a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="article-section" id="starter" aria-labelledby="starter-heading">
              <p className="article-overline">Copy, then tailor</p>
              <h2 id="starter-heading">A lean CLAUDE.md starter</h2>
              <p>This starter is intentionally short. Replace every bracketed value, remove irrelevant rules and add only conventions Claude repeatedly misses. Never use prompt instructions as the sole protection for secrets or dangerous actions—configure permissions or hooks when a boundary must be enforced.</p>
              <div className="starter-card">
                <div className="starter-toolbar"><span>CLAUDE.md</span><CopyTemplate value={starter} /></div>
                <pre><code>{starter}</code></pre>
              </div>
              <div className="starter-aftercare">
                <h3>Make it yours in three passes</h3>
                <ol>
                  <li><span aria-hidden="true">1</span><p><strong>Replace placeholders.</strong> Real paths and commands beat broad advice.</p></li>
                  <li><span aria-hidden="true">2</span><p><strong>Delete generic rules.</strong> Every always-on line spends attention; keep only project truth.</p></li>
                  <li><span aria-hidden="true">3</span><p><strong>Promote repeated procedures.</strong> Move long workflows into skills and enforced boundaries into permissions or hooks.</p></li>
                </ol>
              </div>
            </section>

            <section className="article-section" id="safety" aria-labelledby="safety-heading">
              <div className="safety-panel">
                <p className="article-overline">Before you install</p>
                <h2 id="safety-heading">A five-minute safe adoption check</h2>
                <p>Templates can influence tool use; hooks, MCP servers and installers can execute code. “Markdown” does not automatically mean harmless.</p>
                <ul>
                  <li><span aria-hidden="true">✓</span><p>Read every instruction, executable script, hook and MCP command.</p></li>
                  <li><span aria-hidden="true">✓</span><p>Check requested tools, permission mode, environment access and network destinations.</p></li>
                  <li><span aria-hidden="true">✓</span><p>Inspect dependency and lockfile changes before accepting them.</p></li>
                  <li><span aria-hidden="true">✓</span><p>Pin or review updates for shared plugins; do not rely on popularity counters.</p></li>
                  <li><span aria-hidden="true">✓</span><p>Try third-party configurations in a disposable repository with no secrets first.</p></li>
                  <li><span aria-hidden="true">✓</span><p>Keep human review around destructive, release, payment and production actions.</p></li>
                </ul>
                <a href="https://code.claude.com/docs/en/security">Read Claude Code security guidance <span aria-hidden="true">↗</span></a>
              </div>
            </section>

            <section className="article-section" id="faq" aria-labelledby="faq-heading">
              <p className="article-overline">Questions answered</p>
              <h2 id="faq-heading">Claude template FAQ</h2>
              <div className="faq-list">
                <details>
                  <summary>What is a good Claude Code landing page template?<span aria-hidden="true">+</span></summary>
                  <p>Choose a small marketing repository with source you can inspect and a visual system that fits your product. Vercel Templates, Tailwind Plus Radiant and Astro Themes are starting points to compare. Real copy, assets, CTA destinations and browser checks matter more than whether the template includes Claude branding.</p>
                </details>
                <details>
                  <summary>Which Claude Code template should I use for a dashboard?<span aria-hidden="true">+</span></summary>
                  <p>Inspect the Next.js SaaS Starter if you need a new account-based application. In an existing React product, use a sidebar or page block and selected data components while preserving your backend. Confirm loading, empty, failed-save and permission states before calling the flow complete.</p>
                </details>
                <details>
                  <summary>Does Claude Code have an official templates folder?<span aria-hidden="true">+</span></summary>
                  <p>No. Current project customisation uses specific locations such as <code>CLAUDE.md</code>, <code>.claude/rules/</code>, <code>.claude/skills/</code>, <code>.claude/agents/</code>, settings and <code>.mcp.json</code>. “Template” is a useful ecosystem label, not a native folder name.</p>
                </details>
                <details>
                  <summary>What is the difference between CLAUDE.md and a skill?<span aria-hidden="true">+</span></summary>
                  <p><code>CLAUDE.md</code> loads every session and should hold concise project truths. A skill loads on demand or when relevant and is better for procedures, checklists and reference material.</p>
                </details>
                <details>
                  <summary>Where should personal and project Claude templates live?<span aria-hidden="true">+</span></summary>
                  <p>Put shared project configuration in the repository. Personal configuration belongs under <code>~/.claude/</code>. Use project scope when teammates need the same behaviour, and personal scope for preferences that should follow you between projects.</p>
                </details>
                <details>
                  <summary>Are third-party Claude templates safe to install?<span aria-hidden="true">+</span></summary>
                  <p>Do not assume so. Read the source and inspect scripts, hooks, MCP servers, permissions and dependencies. Test unfamiliar bundles away from secrets and production access.</p>
                </details>
                <details>
                  <summary>Can Claude Code build a website from a screenshot?<span aria-hidden="true">+</span></summary>
                  <p>A screenshot can provide visual context, and Claude Code can help translate it into HTML and CSS. Quality still depends on product context, interaction states, accessibility, responsiveness and browser verification—not visual resemblance alone.</p>
                </details>
                <details>
                  <summary>Should I use a Claude website template for an existing app?<span aria-hidden="true">+</span></summary>
                  <p>Usually not as a wholesale scaffold. Preserve the app’s architecture and give Claude the existing design system, components and constraints. A focused design skill can add a repeatable workflow without creating a competing stack.</p>
                </details>
              </div>
            </section>

            <section className="article-section" aria-labelledby="related-heading">
              <p className="article-overline">Keep reading</p>
              <h2 id="related-heading">Related guides and references</h2>
              <div className="related-guides">
                <a href="https://code.claude.com/docs/en/best-practices">
                  <span>Claude Code docs</span>
                  <h3>Best practices for working with Claude Code</h3>
                  <i aria-hidden="true">↗</i>
                </a>
                <a href="https://code.claude.com/docs/en/common-workflows">
                  <span>Claude Code docs</span>
                  <h3>Common workflows and visual iteration</h3>
                  <i aria-hidden="true">↗</i>
                </a>
                <a href="/guides">
                  <span>Rendyn resources</span>
                  <h3>Guides for better AI-built products</h3>
                  <i aria-hidden="true">↗</i>
                </a>
              </div>
            </section>

            <footer className="article-sources">
              <p className="article-overline">Research note</p>
              <h2>Primary sources first</h2>
              <p>Public Anthropic documentation, the linked resource pages and starter descriptions were reviewed on September 29, 2026. The component recipes are editorial suggestions, not performance benchmarks or completed customer builds. Paid template source was not tested. Community catalogues change quickly; inspect their current source before installing.</p>
              <div>
                <a href="https://code.claude.com/docs/en/claude-directory">Claude directory reference ↗</a>
                <a href="https://code.claude.com/docs/en/skills">Skills documentation ↗</a>
                <a href="https://code.claude.com/docs/en/subagents">Subagents documentation ↗</a>
                <a href="https://code.claude.com/docs/en/hooks-guide">Hooks guide ↗</a>
                <a href="https://code.claude.com/docs/en/discover-plugins">Plugin marketplace guidance ↗</a>
              </div>
            </footer>
          </div>

        </div>
        </article>
        <FinalCallToAction />
      </main>
    </div>
  );
}
