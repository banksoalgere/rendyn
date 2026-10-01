import '../../globals.css';
import '../../styles/editorial-guides.css';
import '../../styles/editorial.css';
import '../../styles/cursor-templates.css';
import { GuideHeading } from '../../components/guide-heading';
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext can hydrate next/link from a second React context; native anchors avoid that runtime failure. */
import type { Metadata } from 'next';
import Image from 'next/image';
import bentoGridPreview from '../../../../../catalog/previews/delivery/magicui-bento-grid.png';
import styles from './templates.module.css';

const pageTitle = 'Cursor Website Templates: 7 Useful Starters (2026)';
const pageDescription =
  'Compare Cursor website templates for landing pages, SaaS dashboards and React apps, with starter trade-offs and practical component-based build recipes.';
const articleUrl = 'https://rendyn.dev/blog/best-cursor-templates';

export const metadata: Metadata = {
  title: `${pageTitle} | Rendyn`,
  description: pageDescription,
  keywords: [
    'cursor templates',
    'Cursor website templates',
    'website templates for Cursor',
    'Cursor landing page templates',
    'Cursor dashboard templates',
    'React starter for Cursor',
  ],
  authors: [{ name: 'Rendyn' }],
  creator: 'Rendyn',
  publisher: 'Rendyn',
  alternates: { canonical: articleUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    url: articleUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: 'Rendyn',
    publishedTime: '2026-08-29T00:00:00.000Z',
    modifiedTime: '2026-09-29T00:00:00.000Z',
    authors: ['Rendyn'],
    images: [],
  },
  twitter: {
    card: 'summary',
    title: pageTitle,
    description: pageDescription,
    images: [],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${articleUrl}#article`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': articleUrl,
  },
  headline: pageTitle,
  description: pageDescription,
  datePublished: '2026-08-29',
  dateModified: '2026-09-29',
  inLanguage: 'en',
  keywords: ['Cursor website templates', 'Cursor landing page templates', 'Cursor dashboard templates'],
  author: {
    '@type': 'Organization',
    name: 'Rendyn editorial',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Rendyn',
    url: 'https://rendyn.dev',
  },
};

type Pick = {
  id: string;
  name: string;
  bestFor: string;
  format: string;
  access: string;
  watchFor: string;
  url: string;
  summary: string;
  why: string;
  strengths: string[];
  tradeoffs: string[];
  prompt: string;
  accent: 'purple' | 'mint' | 'peach' | 'yellow';
};

const picks: Pick[] = [
  {
    id: 'vercel-templates',
    name: 'Vercel Templates',
    bestFor: 'Best overall template library',
    format: 'Git repositories',
    access: 'Free and partner starters',
    watchFor: 'Quality varies by publisher',
    url: 'https://vercel.com/templates?framework=next.js',
    summary:
      'A broad, filterable catalogue of working starters for marketing sites, SaaS, commerce, portfolios, blogs, documentation, and AI apps.',
    why:
      'It is the strongest first stop because the template is real source code, the stack is visible before you start, and many entries include a live demo and repository. Cursor can inspect the whole project instead of trying to infer an architecture from a screenshot.',
    strengths: [
      'Wide use-case and framework coverage',
      'Live demos make visual screening fast',
      'Direct access to the underlying repository',
    ],
    tradeoffs: [
      'Community entries are not all maintained to the same standard',
      'One-click deployment can hide environment and service dependencies',
    ],
    prompt:
      'Audit this starter before changing it. Map routes, dependencies, environment variables, data services, and test commands. Then propose the smallest plan for adapting the visual system to our brief.',
    accent: 'purple',
  },
  {
    id: 'next-saas-starter',
    name: 'Next.js SaaS Starter',
    bestFor: 'Best open-source SaaS foundation',
    format: 'Next.js application',
    access: 'Open-source starter',
    watchFor: 'Replace demo auth and seed data',
    url: 'https://vercel.com/templates/next.js/next-js-saas-starter',
    summary:
      'A focused SaaS codebase with a marketing site, pricing, authentication, team roles, a dashboard, activity logging, Postgres, Drizzle, Stripe, and shadcn/ui.',
    why:
      'Use it when the job is an application rather than a brochure site. It gives Cursor real routes and data flows to extend, while staying small enough to understand. Treat it as a learning foundation: review authentication, seeded users, billing, and authorization before production use.',
    strengths: [
      'Covers the common SaaS product loop',
      'Clear, conventional Next.js stack',
      'Useful reference for protected actions and team roles',
    ],
    tradeoffs: [
      'More infrastructure than a marketing-only project needs',
      'Demo credentials and sample data must never reach production',
    ],
    prompt:
      'Trace sign-up, session, team membership, billing, and authorization end to end. List every demo assumption that must be removed before we implement the new product flow.',
    accent: 'mint',
  },
  {
    id: 'supabase-nextjs',
    name: 'Supabase Next.js template',
    bestFor: 'Best for auth and database setup',
    format: 'create-next-app example',
    access: 'Free official quickstart',
    watchFor: 'Quickstart policies are not production policy',
    url: 'https://supabase.com/docs/guides/getting-started/quickstarts/nextjs',
    summary:
      'An official Next.js starting point preconfigured with cookie-based authentication, TypeScript, and Tailwind CSS, plus explicit production guidance for data access.',
    why:
      'It removes the most error-prone plumbing when your website needs accounts and data. Supabase explicitly frames the quickstart as a starting point, not a production security configuration, so it works best with a separate review of row-level security and environment handling.',
    strengths: [
      'Official framework-specific starter command',
      'Production RLS cautions are documented explicitly',
      'Small enough for Cursor to map quickly',
    ],
    tradeoffs: [
      'You still need to design the product and interface',
      'Sample row-level security must be replaced with your actual policy',
    ],
    prompt:
      'Keep the current server/client boundary. Model the data access needed for this feature, propose least-privilege RLS policies, and show how each user-visible action is authorized.',
    accent: 'mint',
  },
  {
    id: 'shadcn-blocks',
    name: 'shadcn/ui Blocks',
    bestFor: 'Best for an existing React app',
    format: 'Copy-owned React blocks',
    access: 'Free and open source',
    watchFor: 'A block is not a complete product',
    url: 'https://ui.shadcn.com/blocks',
    summary:
      'Composable page sections and application patterns you add to your own codebase, including authentication and sidebar layouts, with visible source rather than a black-box package.',
    why:
      'A smaller starting surface often produces a better result than a full theme. Cursor can adapt a block to the conventions already in your repo without inheriting an unrelated CMS, database, or routing model.',
    strengths: [
      'You own and can edit the installed source',
      'Good fit for incremental adoption',
      'Works across React frameworks',
    ],
    tradeoffs: [
      'You must create the cross-page visual system',
      'Examples may include placeholders that need accessible, real content',
    ],
    prompt:
      'Install only the block needed for this flow. Adapt it to our existing tokens and primitives, preserve keyboard behavior, and remove placeholder content and unused dependencies.',
    accent: 'peach',
  },
  {
    id: 'tailwind-plus',
    name: 'Tailwind Plus Templates',
    bestFor: 'Best premium visual foundation',
    format: 'React and Next.js source',
    access: 'Paid templates',
    watchFor: 'Confirm licence and stack fit',
    url: 'https://tailwindcss.com/plus/templates',
    summary:
      'A curated set of professionally designed website templates from the Tailwind CSS team, covering SaaS marketing, personal sites, agencies, documentation, changelogs, courses, and more.',
    why:
      'This is the strongest choice when the visual bar matters more than having every backend feature prewired. The source is designed to be customized, which gives Cursor concrete spacing, hierarchy, and interaction decisions to preserve while adapting the content.',
    strengths: [
      'Cohesive visual systems rather than isolated sections',
      'React and Next.js source using Tailwind CSS',
      'Clear template-specific previews before purchase',
    ],
    tradeoffs: [
      'Requires a paid licence',
      'You must verify permitted use before sharing or redistributing source',
    ],
    prompt:
      'Preserve the template’s spacing rhythm and responsive intent, but replace all sample copy, information architecture, imagery, and brand tokens with our product system.',
    accent: 'yellow',
  },
  {
    id: 'astro-themes',
    name: 'Astro Themes',
    bestFor: 'Best for content and marketing sites',
    format: 'Astro starter repositories',
    access: 'Free and paid themes',
    watchFor: 'Catalogue entries are community-submitted',
    url: 'https://astro.build/themes/',
    summary:
      'A large directory of themes for blogs, landing pages, portfolios, documentation, ecommerce, and editorial sites, filterable by technology and pricing.',
    why:
      'Astro is a practical fit when content, performance, and low client-side JavaScript matter more than an application dashboard. The catalogue offers much more stylistic range than most framework boilerplates, but every theme still needs an individual code and licence review.',
    strengths: [
      'Strong range for content-led websites',
      'Free and paid options in one directory',
      'Useful filters by category and technology',
    ],
    tradeoffs: [
      'Not every theme is maintained by the Astro team',
      'React-heavy product teams may prefer a Next.js base',
    ],
    prompt:
      'Inventory the theme’s content collections, integrations, client-side scripts, and build output. Keep only the parts needed for our content model and performance budget.',
    accent: 'purple',
  },
  {
    id: 'cursor-templates-cli',
    name: 'Cursor Templates CLI',
    bestFor: 'Best Cursor-specific experiment',
    format: 'Community CLI starters',
    access: 'Open-source community project',
    watchFor: 'Uses an older rules format',
    url: 'https://www.cursor-template.com/',
    summary:
      'A small Cursor-focused catalogue spanning React, Vue, full-stack, backend, mobile, and desktop starters, with a command-line initializer and bundled AI instructions.',
    why:
      'It is the only option here built specifically around the exact “Cursor templates” search. That makes it convenient for prototypes, but its emphasis on the older `.cursorrules` file is a signal to inspect and migrate the guidance to current `.cursor/rules/*.mdc` or `AGENTS.md` conventions.',
    strengths: [
      'Fast framework-specific initialization',
      'AI instructions are included with each starter',
      'Useful for experiments and learning',
    ],
    tradeoffs: [
      'Smaller ecosystem than framework-native catalogues',
      'Review dependencies, maintenance, and the bundled rules before use',
    ],
    prompt:
      'Before installing anything, inspect the template repository and dependency versions. Convert useful project guidance into current scoped rules or AGENTS.md, and discard generic or conflicting instructions.',
    accent: 'peach',
  },
];

const contents = [
  ['quick-answer', 'Quick answer'],
  ['what-counts', 'What counts as a template'],
  ['how-we-chose', 'How we chose'],
  ['comparison', 'Quick comparison'],
  ['website-starting-points', 'Landing page or dashboard?'],
  ['reviews', 'Seven detailed reviews'],
  ['component-builds', 'Two component build recipes'],
  ['adapt-template', 'Make a template Cursor-ready'],
  ['avoid', 'What to avoid'],
  ['faq', 'Frequently asked questions'],
  ['cursor-templates-related', 'Related reading'],
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

function TemplateHero() {
  return (
    <div className="cursor-templates-hero-frame guide-example" aria-hidden="true">
      <div className="cursor-templates-hero-toolbar">
        <span><i aria-hidden="true" /> Template review</span>
        <span>7 sources · 6 criteria</span>
      </div>
      <div className="cursor-templates-hero-stage">
        <div className="cursor-templates-hero-copy">
          <span className="cursor-templates-hero-label">Start with the job</span>
          <strong>Choose a foundation<br />your agent can understand.</strong>
          <p>Working source, clear ownership, current dependencies, and a visual system worth keeping.</p>
          <div className="cursor-templates-hero-score">
            <span>Selection rule</span>
            <b>Fit before feature count</b>
          </div>
        </div>
        <div className="cursor-templates-hero-picks">
          <div className="cursor-templates-pick-card is-featured">
            <span>01 · Overall</span>
            <strong>Vercel Templates</strong>
            <small>Broad, inspectable starters</small>
          </div>
          <div className="cursor-templates-pick-card">
            <span>02 · Full stack</span>
            <strong>Supabase + Next.js</strong>
            <small>Auth and data foundation</small>
          </div>
          <div className="cursor-templates-pick-card">
            <span>03 · Visual system</span>
            <strong>shadcn/ui Blocks</strong>
            <small>Own the source you add</small>
          </div>
        </div>
      </div>
      <div className="cursor-templates-hero-footer">
        <span>Editorial field guide · September 2026</span>
        <span>Independent selection · No affiliate links</span>
      </div>
    </div>
  );
}

export default function BestCursorTemplatesPage() {
  return (
    <div className="cursor-templates-page" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }}
      />
      <main>
        <article>
          <header className="cursor-templates-hero grid-field guide-hero-container">
            <div className="cursor-templates-hero-inner guide-hero-container">
              <GuideHeading slug="best-cursor-templates" id="guide-title" />
              <TemplateHero />
            </div>
          </header>

          <div className="cursor-templates-layout guide-reading-layout">
            <aside className="cursor-templates-sidebar guide-reading-sidebar" aria-label="Article navigation">
              <nav className="cursor-templates-toc">
                <p>In this guide</p>
                <ol>
                  {contents.map(([id, label]) => (
                    <li key={id}><a href={`#${id}`}>{label}</a></li>
                  ))}
                </ol>
              </nav>
              <div className="cursor-templates-sidebar-cta guide-callout">
                <span>Rendyn</span>
                <strong>Give Cursor a stronger visual vocabulary.</strong>
                <p>Browse polished, source-available interface components by product intent.</p>
                <a href="/components">Explore the catalogue <ExternalArrow /></a>
              </div>
            </aside>

            <div className="cursor-templates-body guide-reading-body">
              <section id="quick-answer">
                <p className="cursor-templates-lede">
                  <strong>Our quick answer:</strong> for a Cursor landing page template, start with a small marketing repository from Vercel Templates, a Tailwind Plus visual template, or an Astro theme for a content-led site. For a SaaS dashboard, inspect the Next.js SaaS Starter or Supabase&apos;s Next.js quickstart. For UI work inside an existing React app, add individual blocks and components that fit its design system.
                </p>
                <div className="cursor-templates-note">
                  <span>Important distinction</span>
                  <p>
                    Cursor&apos;s official Marketplace distributes plugins—rules, skills, agents, commands, MCP servers, and hooks. It is not a catalogue of ready-made websites. For a website, you typically open or clone a normal source repository in Cursor and then add project guidance.
                  </p>
                  <a href="https://cursor.com/docs/plugins" rel="external">Read the Cursor plugin documentation <ExternalArrow /></a>
                </div>
              </section>

              <section id="what-counts">
                <span className="cursor-templates-section-number">01 · Scope</span>
                <h2>What counts as a Cursor template?</h2>
                <p>
                  There is no special website file format that only Cursor can understand. In practice, the phrase covers three different starting points. Knowing which one you need prevents a lot of template debt.
                </p>
                <div className="cursor-templates-definition-grid">
                  <article>
                    <span>01</span>
                    <h3>Project starter</h3>
                    <p>A complete repository with routing, dependencies, scripts, and sometimes auth, data, or payments.</p>
                  </article>
                  <article>
                    <span>02</span>
                    <h3>Visual template</h3>
                    <p>A page or site system that gives Cursor real typography, spacing, layout, and interaction decisions to adapt.</p>
                  </article>
                  <article>
                    <span>03</span>
                    <h3>Agent guidance</h3>
                    <p>Rules or instructions that tell Cursor how the repo works and which conventions it must preserve.</p>
                  </article>
                </div>
                <p>
                  The strongest setup usually combines all three: a small starter that matches your runtime, a visual system with enough character to guide future work, and concise repository instructions. Cursor&apos;s current documentation places project rules in <code>.cursor/rules</code> as <code>.mdc</code> files and also supports <code>AGENTS.md</code> for plain-language instructions.
                </p>
                <a className="cursor-templates-source-link" href="https://cursor.com/docs/rules" rel="external">See current Cursor Rules guidance <ExternalArrow /></a>
              </section>

              <section id="how-we-chose">
                <span className="cursor-templates-section-number">02 · Method</span>
                <h2>How we chose the best options</h2>
                <p>
                  We refreshed the linked documentation and public catalogues on September 29, 2026. These are editorial recommendations by use case, not a benchmark of every starter or a promise of faster delivery. Inspect each repository, live demo and licence before choosing; paid source was not tested for this guide.
                </p>
                <div className="cursor-templates-criteria-list">
                  <div><span>01</span><p><strong>Source ownership</strong>Can you inspect and safely change the code?</p></div>
                  <div><span>02</span><p><strong>Stack clarity</strong>Are the framework, services, and requirements explicit?</p></div>
                  <div><span>03</span><p><strong>Visual leverage</strong>Does it contain design decisions worth preserving?</p></div>
                  <div><span>04</span><p><strong>Agent legibility</strong>Can Cursor map the routes, components, and boundaries?</p></div>
                  <div><span>05</span><p><strong>Maintenance</strong>Is there a credible owner or an active source catalogue?</p></div>
                  <div><span>06</span><p><strong>Safe adaptation</strong>Can you remove demo assumptions without weakening validation?</p></div>
                </div>
              </section>

              <section id="comparison">
                <span className="cursor-templates-section-number">03 · Compare</span>
                <h2>The best Cursor templates at a glance</h2>
                <p>
                  “Best” depends on what you are building. This comparison favors the smallest credible foundation for the job, because every unnecessary subsystem creates more code for you and Cursor to reason about.
                </p>
                <div className="cursor-templates-comparison-wrap" tabIndex={0} aria-label="Scrollable comparison table">
                  <table className="cursor-templates-comparison-table">
                    <caption className="cursor-templates-sr-only">Comparison of seven Cursor website template resources</caption>
                    <thead>
                      <tr><th>Template</th><th>Best for</th><th>Format</th><th>Access</th><th>Watch for</th></tr>
                    </thead>
                    <tbody>
                      {picks.map((pick, index) => (
                        <tr key={pick.id}>
                          <th scope="row"><a href={`#${pick.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{pick.name}</a></th>
                          <td>{pick.bestFor.replace(/^Best /, '')}</td>
                          <td>{pick.format}</td>
                          <td>{pick.access}</td>
                          <td>{pick.watchFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="website-starting-points">
                <span className="cursor-templates-section-number">Choose by website job</span>
                <h2>Cursor landing page templates and dashboard starters solve different jobs</h2>
                <p>A landing page needs a clear story, credible product evidence and a working next step. A dashboard needs navigation, data states and authorized actions. Compare the parts you will actually use before inheriting a complete SaaS boilerplate.</p>
                <div className="cursor-templates-definition-grid">
                  <article>
                    <span>Marketing website</span>
                    <h3>Landing page or portfolio</h3>
                    <p>Choose Vercel&apos;s marketing starters or a visual template such as <a href="https://tailwindcss.com/plus/templates/radiant/preview" rel="external">Tailwind Plus Radiant</a>. Astro Themes is another option for blogs, portfolios and documentation. Check mobile navigation, real CTA destinations and how you will edit content.</p>
                  </article>
                  <article>
                    <span>Product application</span>
                    <h3>SaaS or admin dashboard</h3>
                    <p>The Next.js SaaS Starter supplies an application foundation. Supabase&apos;s quickstart helps with accounts and data. In an existing React app, shadcn/ui sidebar blocks can supply a shell; you still implement loading, empty and error states around your data.</p>
                  </article>
                  <article>
                    <span>Small custom build</span>
                    <h3>React UI from a blank base</h3>
                    <p>Use the <a href="https://nextjs.org/docs/app/api-reference/cli/create-next-app" rel="external">official create-next-app scaffold</a> if no theme matches your scope. It gives you framework conventions rather than a finished design. Keep your existing framework when the project already has one.</p>
                  </article>
                </div>
                <p>For a free Cursor website template, check the selected repository&apos;s licence and service requirements. A free clone can still require paid hosting, email or payment services. For a paid template, verify that the source format and permitted use fit your product before purchase.</p>
              </section>

              <section id="reviews">
                <span className="cursor-templates-section-number">04 · Reviews</span>
                <h2>The 7 best Cursor templates and starter resources</h2>
                <p>
                  These are not interchangeable products. The verdict on each one explains when it earns its place—and when a smaller or more specialized option would be better.
                </p>
                <div className="cursor-templates-review-list">
                  {picks.map((pick, index) => (
                    <article className={`cursor-templates-review cursor-templates-review--${pick.accent}`} id={pick.id} key={pick.id}>
                      <div className="cursor-templates-review-heading">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <div>
                          <p>{pick.bestFor}</p>
                          <h3>{pick.name}</h3>
                        </div>
                        <a href={pick.url} rel="external" aria-label={`Visit ${pick.name}`}>Visit <ExternalArrow /></a>
                      </div>
                      <p className="cursor-templates-review-summary">{pick.summary}</p>
                      <div className="cursor-templates-facts">
                        <div><span>Format</span><strong>{pick.format}</strong></div>
                        <div><span>Access</span><strong>{pick.access}</strong></div>
                        <div><span>Watch for</span><strong>{pick.watchFor}</strong></div>
                      </div>
                      <h4>Why it ranks here</h4>
                      <p>{pick.why}</p>
                      <div className="cursor-templates-pros-cons">
                        <div>
                          <h4>Strengths</h4>
                          <ul>{pick.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
                        </div>
                        <div>
                          <h4>Trade-offs</h4>
                          <ul>{pick.tradeoffs.map((item) => <li key={item}>{item}</li>)}</ul>
                        </div>
                      </div>
                      <div className="cursor-templates-prompt-card">
                        <span>A useful first prompt</span>
                        <p>{pick.prompt}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section id="component-builds">
                <span className="cursor-templates-section-number">From starter to useful UI</span>
                <h2>Two website build recipes with real Rendyn components</h2>
                <p>Rendyn provides reusable React components, previews and source access. These recipes combine existing components inside your chosen starter; they are not downloadable full-site templates. Review each component&apos;s dependencies, upstream attribution and source-access terms on its detail page.</p>
                <div className={styles.recipes}>
                  <article>
                    <h3>1. A SaaS landing page that demonstrates the product</h3>
                    <p>Begin with a marketing starter and plain, readable hero copy. Use a <a href="/components/bento-grid">Bento Grid</a> for three concrete product capabilities. Add a <a href="/components/hero-video-dialog">Hero Video Dialog</a> only when you have a real demo to show. An <a href="/components/orbiting-circles">Orbiting Circles</a> visual can illustrate supported integrations; use genuine names and retain a readable static presentation when motion is reduced.</p>
                    <p>Replace stock testimonials and fabricated metrics with product evidence. Check that feature links work with touch and keyboard input, not just hover. A <a href="/components/marquee">Marquee</a> is an optional treatment for a logo strip, not a requirement for explaining your offer.</p>
                    <figure className={styles.preview}>
                      <Image src={bentoGridPreview} alt="Bento Grid catalogue demo showing feature cards for files, notifications, integrations and a calendar" width={640} height={400} unoptimized />
                      <figcaption>Example component: <a href="/components/bento-grid">Bento Grid</a>, imported from Magic UI. The catalogue demo contains sample copy and logos; replace them with your own verified product content.</figcaption>
                    </figure>
                    <div className="cursor-templates-prompt-card"><span>A landing-page brief for Cursor</span><p>Keep this starter&apos;s routing and design tokens. Build a hero with one primary action, three Bento Grid feature cards and a real product-demo link. Use only supplied claims and assets. Keep feature links visible on mobile and keyboard focus. Check the page at 390px and desktop width, including reduced motion.</p></div>
                  </article>
                  <article>
                    <h3>2. A dashboard for managing customer work</h3>
                    <p>Keep the starter&apos;s account and authorization flow. A <a href="/components/table">Virtualized Data Table</a> can organize records; a <a href="/components/command-palette">Command Palette</a> can expose actions and navigation. Use <a href="/components/kanban">Kanban</a> when work really moves through statuses, or a <a href="/components/dropzone">Dropzone</a> when the flow requires file selection.</p>
                    <p>These are interface pieces. Your server must authorize record changes, persist board moves and validate uploaded files. Decide what the UI shows while data is loading, when no records match, and when a save fails before connecting the happy path.</p>
                    <div className="cursor-templates-prompt-card"><span>A dashboard brief for Cursor</span><p>Adapt the existing dashboard shell. Add the selected table and Command Palette using our current tokens and data boundaries. Start with clearly labelled fixtures, loading, empty and failure states. Map actions to existing authorized routes. Report which interactions are still simulated before adding persistence.</p></div>
                  </article>
                </div>
                <p>For the broader visual workflow, continue with <a href="/guides/how-to-build-a-good-looking-website-with-cursor">building a good-looking website with Cursor</a>. If the brief is about agent access to the catalogue, use the <a href="/mcp">Rendyn MCP workflow</a>.</p>
              </section>

              <section id="adapt-template">
                <span className="cursor-templates-section-number">05 · Workflow</span>
                <h2>How to make any template work better in Cursor</h2>
                <p>
                  A template is a starting state, not a product strategy. Give Cursor an explicit evaluation job before asking it to redesign anything. That first pass should reduce risk and establish the boundaries future prompts must respect.
                </p>
                <ol className="cursor-templates-workflow-list">
                  <li><span>01</span><div><h3>Run it unchanged</h3><p>Install from the documented lockfile, start the project, and verify the original route before editing.</p></div></li>
                  <li><span>02</span><div><h3>Ask for a system map</h3><p>Have Cursor identify routes, data boundaries, environment variables, tests, external services, and the primary design tokens.</p></div></li>
                  <li><span>03</span><div><h3>Remove what the product does not need</h3><p>Delete demo integrations and sample features deliberately. Never weaken validation just to make a borrowed flow pass.</p></div></li>
                  <li><span>04</span><div><h3>Document the decisions</h3><p>Add focused <code>.cursor/rules/*.mdc</code> files or an <code>AGENTS.md</code> that describes the real architecture, visual constraints, and verification commands.</p></div></li>
                  <li><span>05</span><div><h3>Adapt one complete flow</h3><p>Finish a real user journey at desktop and mobile widths before multiplying the pattern across the site.</p></div></li>
                </ol>
                <div className="cursor-templates-inline-cta">
                  <div>
                    <span>Better inputs, better interface work</span>
                    <strong>Give your agent components with real interaction and source context.</strong>
                  </div>
                  <a className="button" href="/components">Browse Rendyn <ExternalArrow /></a>
                </div>
              </section>

              <section id="avoid">
                <span className="cursor-templates-section-number">06 · Guardrails</span>
                <h2>What to avoid in a Cursor website template</h2>
                <div className="cursor-templates-avoid-grid">
                  <article><span aria-hidden="true">×</span><div><h3>Screenshot-only “templates”</h3><p>They supply style inspiration but no component, responsive, or accessibility decisions for Cursor to preserve.</p></div></article>
                  <article><span aria-hidden="true">×</span><div><h3>Boilerplates larger than the product</h3><p>Unused billing, CMS, roles, queues, and analytics increase the surface area for bugs and security mistakes.</p></div></article>
                  <article><span aria-hidden="true">×</span><div><h3>Unreviewed agent rules</h3><p>Generic instructions can conflict with the repository and encourage broad, unsafe changes. Read them before they enter context.</p></div></article>
                  <article><span aria-hidden="true">×</span><div><h3>Hidden service assumptions</h3><p>A polished demo may depend on paid APIs, private assets, or deployment-specific environment variables.</p></div></article>
                  <article><span aria-hidden="true">×</span><div><h3>Copied licences and assets</h3><p>Source availability does not automatically grant the right to redistribute fonts, images, icons, or premium components.</p></div></article>
                  <article><span aria-hidden="true">×</span><div><h3>“Make it work” security changes</h3><p>Never disable authorization, validation, RLS, or webhook verification to fit a template&apos;s demo flow.</p></div></article>
                </div>
              </section>

              <section id="faq">
                <span className="cursor-templates-section-number">07 · FAQ</span>
                <h2>Frequently asked questions</h2>
                <div className="cursor-templates-faq-list">
                  <details>
                    <summary>Does Cursor have official website templates?<span aria-hidden="true">+</span></summary>
                    <p>Cursor has an official Marketplace for plugins and tooling, but its current documentation does not present a first-party website-template catalogue. The practical route is to clone a normal source repository, open it in Cursor, and add focused project guidance.</p>
                  </details>
                  <details>
                    <summary>Do I need a .cursorrules file?<span aria-hidden="true">+</span></summary>
                    <p>No. Current Cursor documentation describes project rules as <code>.mdc</code> files inside <code>.cursor/rules</code>, and supports <code>AGENTS.md</code> as a plain Markdown alternative. Review older starters that ship only a root <code>.cursorrules</code> file and migrate any useful guidance.</p>
                  </details>
                  <details>
                    <summary>Can Cursor turn any website template into React or Next.js?<span aria-hidden="true">+</span></summary>
                    <p>It can help adapt source you have the right to use, but conversion is not automatically faithful or production-ready. Verify layout at multiple widths, keyboard and screen-reader behavior, data boundaries, dependency choices, and the original licence.</p>
                  </details>
                  <details>
                    <summary>What is the safest template for a production app?<span aria-hidden="true">+</span></summary>
                    <p>The safest choice is usually the smallest maintained starter from the framework or service you already use. Treat every template as untrusted until you inspect dependencies, demo credentials, authorization, validation, environment variables, and deployment assumptions.</p>
                  </details>
                  <details>
                    <summary>Which option is best for a landing page?<span aria-hidden="true">+</span></summary>
                    <p>Start with Vercel Templates for range, Tailwind Plus when you want a premium visual system, Astro Themes for content-led performance, or shadcn/ui Blocks when the landing page must fit an existing React product.</p>
                  </details>
                  <details>
                    <summary>Can I use a Cursor dashboard template without its backend?<span aria-hidden="true">+</span></summary>
                    <p>Yes, if its licence permits adaptation, but trace what the UI depends on first. Keep your existing API and account system, remove unused demo integrations, and connect actions through your own validation and authorization. A sidebar or data table supplies UI; it does not supply your business rules.</p>
                  </details>
                  <details>
                    <summary>Does Rendyn offer complete Cursor website templates?<span aria-hidden="true">+</span></summary>
                    <p>Rendyn offers component building blocks with previews and source access. Choose a starter for routing and application structure, then use the catalogue to assemble the interface. The landing-page and dashboard recipes above show how those layers fit together.</p>
                  </details>
                </div>
              </section>

              <section className="cursor-templates-product-demo" aria-labelledby="product-demo-heading">
                <span className="cursor-templates-section-number">In practice · Rendyn</span>
                <h2 id="product-demo-heading">A template gives Cursor structure. Context helps it choose well.</h2>
                <p>
                  Once the starter is stable, the next problem is usually specificity: which component suits this product, this interaction, and this visual system? Rendyn lets an agent search by intent, compare a short list, inspect interactive previews, and retrieve the chosen source without treating the whole catalogue as prompt context.
                </p>
                <div className="cursor-templates-product-panel">
                  <div className="cursor-templates-product-bar" aria-hidden="true">
                    <span><i aria-hidden="true">R</i> Rendyn search</span>
                    <span>Intent-aware · 3 results</span>
                  </div>
                  <div className="cursor-templates-product-query" aria-hidden="true">
                    <span>Product request</span>
                    <p>“A compact command palette for a technical dashboard with clear keyboard states.”</p>
                  </div>
                  <div className="cursor-templates-product-results" aria-hidden="true">
                    <div className="cursor-templates-selected"><span>01</span><p><strong>Command palette</strong><small>Best fit · keyboard-first navigation</small></p><i>Preview</i></div>
                    <div><span>02</span><p><strong>Morphing search</strong><small>Alternative · compact discovery</small></p><i>Compare</i></div>
                    <div><span>03</span><p><strong>Expandable action bar</strong><small>Alternative · persistent actions</small></p><i>Compare</i></div>
                  </div>
                  <div className="cursor-templates-product-footer"><span aria-hidden="true">Source + dependencies + usage context</span><a href="/components">Explore the catalogue <ExternalArrow /></a></div>
                </div>
              </section>

              <section id="cursor-templates-related" className="cursor-templates-related" aria-labelledby="cursor-templates-related-heading">
                <span className="cursor-templates-section-number">Continue reading</span>
                <h2 id="cursor-templates-related-heading">Related guides and references</h2>
                <div className="cursor-templates-related-grid">
                  <a href="https://cursor.com/docs/rules" rel="external">
                    <span>Cursor documentation</span>
                    <strong>Set up scoped project rules and AGENTS.md</strong>
                    <i aria-hidden="true">↗</i>
                  </a>
                  <a href="https://nextjs.org/docs/app/getting-started/installation" rel="external">
                    <span>Next.js guide</span>
                    <strong>Start from the official create-next-app defaults</strong>
                    <i aria-hidden="true">↗</i>
                  </a>
                  <a href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs" rel="external">
                    <span>Supabase guide</span>
                    <strong>Build the auth and data foundation deliberately</strong>
                    <i aria-hidden="true">↗</i>
                  </a>
                </div>
              </section>

              <section className="cursor-templates-sources" aria-labelledby="sources-heading">
                <span className="cursor-templates-section-number">Sources</span>
                <h2 id="sources-heading">Primary sources checked</h2>
                <p>Public documentation and catalogue descriptions were checked on September 29, 2026. The recipes are suggested compositions of Rendyn&apos;s existing components, not measured builds or performance benchmarks. No placement in this guide was paid.</p>
                <ul>
                  <li><a href="https://cursor.com/docs/rules" rel="external">Cursor Rules documentation <ExternalArrow /></a></li>
                  <li><a href="https://cursor.com/docs/plugins" rel="external">Cursor Plugins and Marketplace documentation <ExternalArrow /></a></li>
                  <li><a href="https://vercel.com/templates?framework=next.js" rel="external">Vercel Templates <ExternalArrow /></a></li>
                  <li><a href="https://vercel.com/templates/next.js/next-js-saas-starter" rel="external">Next.js SaaS Starter <ExternalArrow /></a></li>
                  <li><a href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs" rel="external">Supabase Next.js quickstart <ExternalArrow /></a></li>
                  <li><a href="https://ui.shadcn.com/blocks" rel="external">shadcn/ui Blocks <ExternalArrow /></a></li>
                  <li><a href="https://tailwindcss.com/plus/templates" rel="external">Tailwind Plus Templates <ExternalArrow /></a></li>
                  <li><a href="https://astro.build/themes/" rel="external">Astro Themes <ExternalArrow /></a></li>
                  <li><a href="https://www.cursor-template.com/" rel="external">Cursor Templates CLI <ExternalArrow /></a></li>
                </ul>
              </section>
            </div>
          </div>
        </article>

        <section className="cursor-templates-final-cta grid-field" aria-labelledby="article-cta-title">
          <div>
            <p>From template to product</p>
            <h2 id="article-cta-title">Your starter has structure.<br />Give it better taste.</h2>
            <span>Rendyn helps coding agents find and implement polished components with the source and context to use them well.</span>
            <div>
              <a className="button" href="/components">Browse components <ExternalArrow /></a>
              <a className="button button--ghost" href="/#product">See how it works</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
