/* eslint-disable @next/next/no-html-link-for-pages -- Vinext shared server navigation uses native links. */
import type { Metadata } from 'next';
import { ArticleProgress } from './article-progress';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

export const metadata: Metadata = {
  title: 'Cursor Website Design: How to Build a Good-Looking Site',
  description: 'A practical Cursor website design workflow: define your visual direction, build a design system, prompt in passes, and test the result in a real browser.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'How to Build a Good-Looking Website With Cursor',
    description: 'A practical workflow for giving a Cursor-built website clear art direction, consistent UI and a rigorous browser QA pass.',
    type: 'article',
    publishedTime: '2026-08-29T00:00:00+01:00',
    authors: ['DesignMCP Editorial'],
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'How to Build a Good-Looking Website With Cursor',
    description: 'A design-system-first workflow for polished, distinctive websites built with Cursor.',
    images: [],
  },
};

const designBrief = [
  ['Product', 'A focused description of what the site does and who it serves.'],
  ['Mood', 'Three useful tensions: calm but not cold; technical but approachable; spare but not empty.'],
  ['Reference', 'The principles to borrow—rhythm, density, framing—not somebody else’s identity.'],
  ['System', 'Type scale, spacing scale, palette, radius, borders, shadows and motion rules.'],
  ['Proof', 'The routes, viewports, states and accessibility checks that define “done.”'],
];

const makeoverPasses = [
  {
    number: '01',
    title: 'Fix hierarchy before decoration',
    copy: 'Decide what the eye should see first, second and third. Rewrite the hero, remove duplicate calls to action and group related content before touching gradients, shadows or animation.',
  },
  {
    number: '02',
    title: 'Choose a typographic voice',
    copy: 'Use one display face or weight strategy and one dependable text style. Define the heading scale, body measure and label treatment once, then reuse them. A clear type system does more visual work than a pile of effects.',
  },
  {
    number: '03',
    title: 'Make spacing a system',
    copy: 'Pick a small spacing scale and use it deliberately. Keep related items close, separate distinct ideas generously and use consistent section gutters. Random padding is one of the fastest ways to make a page feel generated.',
  },
  {
    number: '04',
    title: 'Reduce the palette',
    copy: 'Start with paper, ink, muted text, a border and one accent. Give each colour a job. Check text and control contrast instead of assuming that a tasteful-looking grey is readable.',
  },
  {
    number: '05',
    title: 'Standardise components and states',
    copy: 'Align button heights, corner logic, icon size, input treatment and card framing. Include hover, focus, disabled, loading, empty and error states where the product needs them.',
  },
  {
    number: '06',
    title: 'Add motion only where it explains',
    copy: 'Use motion to connect cause and effect, reveal hierarchy or preserve context. Prefer short transitions, support reduced motion and delete animation that merely proves animation exists.',
  },
  {
    number: '07',
    title: 'Verify in the browser',
    copy: 'Test the real route at desktop and mobile widths. Click every important control, navigate by keyboard, inspect focus, scan the console and network panel, and check slow or empty states—not just the ideal screenshot.',
  },
];

const qaItems = [
  ['Hierarchy', 'Can someone explain the page after a five-second scan?'],
  ['Responsive layout', 'Do 1440px, 1024px, 768px and 390px widths feel composed rather than merely unbroken?'],
  ['Keyboard', 'Can every action be reached and does focus remain visible?'],
  ['Contrast', 'Do text, controls and essential boundaries meet the contrast target you chose?'],
  ['States', 'Are hover, focus, loading, empty, error and disabled states intentional?'],
  ['Content', 'Are labels specific, paragraphs short and calls to action unambiguous?'],
  ['Performance', 'Are images sized, fonts restrained and scripts genuinely necessary?'],
  ['Resilience', 'What happens with long names, missing images, narrow screens and reduced motion?'],
];

function ArticleHeroVisual() {
  return (
    <div
      className="article-hero-visual"
      role="img"
      aria-label="A generic website treatment refined into a deliberate DesignMCP interface"
    >
      <div className="article-browser-bar">
        <div aria-hidden="true"><i /><i /><i /></div>
        <span>localhost:3000</span>
        <span>Preview</span>
      </div>
      <div className="article-visual-grid">
        <div className="article-visual-before">
          <p>Before</p>
          <div className="generic-nav" />
          <div className="generic-title" />
          <div className="generic-copy" />
          <div className="generic-button" />
          <div className="generic-cards"><i /><i /><i /></div>
        </div>
        <div className="article-visual-after grid-field">
          <p>After / directed</p>
          <span className="visual-kicker">A specific point of view</span>
          <strong>Good design is<br />a chain of decisions.</strong>
          <span className="visual-deck">Clear hierarchy. A small system. Proof in the browser.</span>
          <div className="visual-actions"><i>Explore the system</i><i>View the build</i></div>
          <div className="visual-system-note"><span>Type</span><span>Space</span><span>Colour</span><span>Motion</span></div>
        </div>
      </div>
      <div className="article-visual-caption">
        <span><i aria-hidden="true">✓</i> One system, not more decoration</span>
        <span>Design pass · 07</span>
      </div>
    </div>
  );
}

export default function CursorWebsiteDesignGuide() {
  return (
    <main className="article-page">
      <SiteHeader />

      <article>
        <header className="article-hero grid-field">
          <div className="article-hero-copy">
            <div className="article-meta">
              <span className="article-author"><b aria-hidden="true">D</b> By <strong>DesignMCP Editorial</strong></span><i aria-hidden="true" />
              <span>Design field guide</span><i aria-hidden="true" />
              <span>12 min read</span><i aria-hidden="true" />
              <time dateTime="2026-08-29">August 29, 2026</time>
            </div>
            <h1>How to Build a Good-Looking Website With Cursor</h1>
            <p className="article-deck">
              A strong Cursor website does not come from a more enthusiastic prompt. It comes from
              clear art direction, a compact design system and a browser loop that turns subjective
              feedback into specific, testable decisions.
            </p>
          </div>
          <ArticleHeroVisual />
        </header>

        <div className="article-frame">
          <aside className="article-sidebar">
            <ArticleProgress />
            <div className="article-side-cta">
              <span>Give your agent better ingredients</span>
              <p className="article-side-cta-title">Start with stronger UI choices.</p>
              <p>Explore polished components with previews, fit reasoning and complete source.</p>
              <a href="/#catalogue">Browse the catalogue <span aria-hidden="true">↗</span></a>
            </div>
          </aside>

          <div className="article-body">
            <p className="article-lede">
              If you are searching for <strong>cursor website design</strong>, this guide is about the
              Cursor coding editor—not a custom mouse pointer. The goal is not to ask AI for “premium”
              styling and hope. It is to give Cursor the same inputs a good product designer would need:
              intent, references, constraints, reusable primitives and a definition of quality.
            </p>
            <p>
              <a href="https://cursor.com/docs/agent/overview">Cursor can already inspect a codebase, edit files, run commands and read design images</a>.
              {' '}Its current <a href="https://cursor.com/docs/agent/tools/browser">Browser tooling can capture screenshots, interact with a
              page, and surface console and network evidence</a>. That makes it capable of a serious design
              feedback loop—but the taste and acceptance criteria still have to come from you.
            </p>

            <section id="why-cursor-sites-look-generic">
              <p className="article-section-label">01 · Diagnose</p>
              <h2>Why Cursor websites often look generic</h2>
              <p>
                A generic result is usually a brief problem before it is a model problem. “Make a modern
                SaaS landing page” leaves nearly every consequential decision open, so the agent reaches
                for familiar averages: a centred hero, gradient text, three feature cards, pill buttons
                and generous but arbitrary rounding.
              </p>
              <div className="article-callout article-callout--yellow">
                <span>The useful reframe</span>
                <p>Do not ask Cursor to make the page prettier. Ask it to make a defined visual idea more coherent.</p>
              </div>
              <p>
                “Good-looking” is not a style. It is the visible result of hierarchy, rhythm, contrast,
                proportion, consistency and restraint. Name those decisions. If you cannot explain why
                a reference feels right, Cursor can imitate its surface but will struggle to transfer its logic.
              </p>
              <h3>Audit the page before you prompt</h3>
              <ul>
                <li>What single action or idea should dominate the first viewport?</li>
                <li>Which sections repeat the same claim and can be removed?</li>
                <li>Where does the type scale lose hierarchy?</li>
                <li>Which spacing, radius or colour values appear only once?</li>
                <li>Does the mobile page have its own composition, or only a collapsed desktop layout?</li>
              </ul>
            </section>

            <section id="define-the-direction">
              <p className="article-section-label">02 · Direct</p>
              <h2>Define the visual direction in one page</h2>
              <p>
                Before implementation, create a short <code>design-direction.md</code> or add the same information
                to your project instructions. Keep it concrete enough to judge and short enough to remain
                useful. <a href="https://cursor.com/docs/rules">Cursor supports version-controlled Project Rules and plain <code>AGENTS.md</code> instructions</a>,
                so stable design constraints do not have to be repeated in every chat.
              </p>
              <div className="brief-table" role="list" aria-label="What to include in a visual direction brief">
                {designBrief.map(([title, description], index) => (
                  <div role="listitem" key={title}>
                    <span>0{index + 1}</span><strong>{title}</strong><p>{description}</p>
                  </div>
                ))}
              </div>
              <h3>Write tensions, not trend words</h3>
              <p>
                “Minimal, clean and premium” describes almost nothing. “Editorial spacing with technical
                details; warm paper surfaces; one sharp yellow accent; compact controls; no glassmorphism”
                creates boundaries. Productive tensions such as “confident, not loud” help the agent choose
                between plausible options.
              </p>
            </section>

            <section id="build-the-system">
              <p className="article-section-label">03 · Systemise</p>
              <h2>Build the small system before the full page</h2>
              <p>
                The fastest way to improve Cursor website design is to reduce the number of decisions made
                ad hoc. Ask Cursor to inspect existing tokens and shared components first. Then make one
                coherent pass across the foundations—not dozens of unrelated fixes in individual sections.
              </p>
              <div className="system-grid">
                <article><span>Aa</span><h3>Type</h3><p>One display strategy, one body style, a compact label style and readable line lengths.</p></article>
                <article><span>↔</span><h3>Space</h3><p>A small scale for gaps, insets, gutters and section rhythm—with clear grouping.</p></article>
                <article><span>●</span><h3>Colour</h3><p>Named roles for paper, ink, muted text, borders, success, danger and one accent.</p></article>
                <article><span>◫</span><h3>Shape</h3><p>A radius and border logic that matches the product instead of changing card by card.</p></article>
              </div>
              <div className="article-product-demo">
                <div className="product-demo-head">
                  <span>Illustrative product workflow</span><i>DesignMCP · concept</i>
                </div>
                <div className="product-demo-query">
                  <span aria-hidden="true">✦</span>
                  <p>“Find a calm primary action for a high-trust onboarding flow. Keyboard-ready, restrained motion.”</p>
                </div>
                <div className="product-demo-results">
                  <div><span>01</span><p><strong>Signal button</strong><small>Complete states · restrained motion</small></p><i>Closest fit</i></div>
                  <div><span>02</span><p><strong>Quiet action</strong><small>Lower emphasis · no motion</small></p><i>Quietest</i></div>
                  <div><span>03</span><p><strong>Split action</strong><small>Useful when a secondary path exists</small></p><i>Conditional</i></div>
                </div>
                <p>
                  The point is not to paste a fashionable button onto the page. It is to give the agent a
                  small, defensible set of components whose behaviour and visual weight match the product context.
                </p>
              </div>
              <p>
                Start with the header, one representative content section, a form control and a card. Those
                few elements expose most of the system. Once they agree, tell Cursor to extend the established
                primitives across the rest of the route.
              </p>
            </section>

            <section id="give-cursor-evidence">
              <p className="article-section-label">04 · Ground</p>
              <h2>Give Cursor evidence, not adjectives</h2>
              <p>
                <a href="https://cursor.com/docs/agent/overview">Cursor Agent can read common image formats</a>, and its{' '}
                <a href="https://cursor.com/docs/agent/tools/browser">Browser documentation explicitly supports
                design-to-code work and comparison against screenshots</a>. Attach a reference, but explain what
                it proves: the headline-to-deck ratio, the quiet borders, the column balance or the way a CTA
                stays useful while the article scrolls.
              </p>
              <div className="article-do-dont">
                <div>
                  <span>Weak direction</span>
                  <p>“Make this look like the screenshot. More premium, more modern.”</p>
                </div>
                <div>
                  <span>Useful direction</span>
                  <p>“Reuse our type and colours. Borrow the reference’s wide editorial measure, bordered content frame and sticky utility rail. Do not copy its assets, copy or brand shapes.”</p>
                </div>
              </div>
              <p>
                References work best as constraints, not as permission to clone. Ask Cursor to list the
                reusable principles first, map each principle to your existing primitives, and flag anything
                that would conflict with accessibility, performance or the product’s identity.
              </p>
            </section>

            <section id="prompt-in-passes">
              <p className="article-section-label">05 · Iterate</p>
              <h2>Prompt in passes that can be judged</h2>
              <p>
                One giant prompt makes it hard to distinguish a content problem from a layout problem. Use
                focused passes, keep the development route open and review a real viewport after each meaningful
                change. The sequence below prevents decoration from hiding structural flaws.
              </p>
              <div className="makeover-list">
                {makeoverPasses.map((pass) => (
                  <article key={pass.number}>
                    <span>{pass.number}</span>
                    <div><h3>{pass.title}</h3><p>{pass.copy}</p></div>
                  </article>
                ))}
              </div>
              <div className="prompt-card">
                <div><span>Prompt recipe</span><i>Copy, adapt, run</i></div>
                <pre><code>{`Inspect the current route and shared UI primitives before editing.

Goal: [the user outcome this page must achieve]
Direction: [three specific visual tensions]
Preserve: [brand, framework, content or components that stay]
Reference principles: [layout/rhythm/type ideas—not copied branding]

For this pass, change only [hierarchy / type / spacing / states].
Reuse existing primitives where they fit. Define shared tokens when a
decision repeats. Keep semantic HTML, visible focus, reduced motion and
mobile composition intact.

Then run the route, verify at [desktop width] and [mobile width], click
the primary interactions, and report console or network errors.`}</code></pre>
              </div>
            </section>

            <section id="use-cursor-tools">
              <p className="article-section-label">06 · Use the loop</p>
              <h2>Use Cursor’s current visual tools deliberately</h2>
              <p>
                The editor now has several ways to close the gap between code and the rendered interface. Use
                the lightest tool that gives the agent the evidence it needs.
              </p>
              <div className="tool-list">
                <article>
                  <span>01</span><div><h3>Attach images for direction</h3><p>Cursor Agent can read PNG, JPG, GIF, WebP and SVG files as visual context. Add the reference and state which relationships matter.</p></div>
                </article>
                <article>
                  <span>02</span><div><h3>Use Browser for proof</h3><p>Ask Cursor to navigate the real route, interact with it, capture screenshots and inspect console or network evidence. “It compiled” is not visual acceptance.</p></div>
                </article>
                <article>
                  <span>03</span><div><h3>Use Design Mode for spatial feedback</h3><p>Cursor’s Design Mode can include the selected element, its code, computed styles and a screenshot. Target the exact relationship that feels wrong instead of describing the whole page again.</p></div>
                </article>
                <article>
                  <span>04</span><div><h3>Encode repeated decisions</h3><p>Put stable product and design rules in Project Rules or <code>AGENTS.md</code>. Keep them focused, actionable and close to canonical component examples.</p></div>
                </article>
                <article>
                  <span>05</span><div><h3>Connect real design sources when needed</h3><p>Cursor supports MCP integrations, and its web development guide documents using the official Figma MCP server. Prefer source design data to reconstructed screenshots when a maintained file exists.</p></div>
                </article>
              </div>
              <p className="article-source-note">
                Current capability references: <a href="https://cursor.com/docs/agent/overview">Cursor Agent</a>,{' '}
                <a href="https://cursor.com/docs/agent/tools/browser">Browser</a>,{' '}
                <a href="https://cursor.com/docs/agent/design-mode">Design Mode</a>,{' '}
                <a href="https://cursor.com/docs/rules">Rules</a> and{' '}
                <a href="https://cursor.com/for/web-development">Web Development</a>.
              </p>
            </section>

            <section id="make-an-existing-site-better">
              <p className="article-section-label">07 · Repair</p>
              <h2>How to make a Cursor website look better without rebuilding it</h2>
              <p>
                If the site already works, do not start over. A full rewrite discards validated content,
                accessibility fixes and production behaviour while introducing a larger review surface. Ask
                Cursor to find the smallest shared causes of inconsistency first.
              </p>
              <ol className="repair-sequence">
                <li><span>01</span><div><strong>Inventory</strong><p>List the page sections, shared components, tokens and one-off values. Identify what is genuinely reused.</p></div></li>
                <li><span>02</span><div><strong>Prioritise</strong><p>Choose the three changes with the highest visual leverage—usually type, spacing and palette.</p></div></li>
                <li><span>03</span><div><strong>Prototype</strong><p>Apply the direction to one representative section and compare it at desktop and mobile widths.</p></div></li>
                <li><span>04</span><div><strong>Propagate</strong><p>Move repeated decisions into tokens or shared primitives, then extend them without changing unrelated behaviour.</p></div></li>
                <li><span>05</span><div><strong>Prove</strong><p>Run the complete interaction and accessibility pass before deleting the old styles.</p></div></li>
              </ol>
              <div className="article-callout article-callout--purple">
                <span>Highest-leverage instruction</span>
                <p>“Find the shared producer of this inconsistency and fix it at the narrowest reusable layer.”</p>
              </div>
            </section>

            <section id="quality-checklist">
              <p className="article-section-label">08 · Verify</p>
              <h2>The final quality checklist</h2>
              <p>
                A beautiful screenshot can still hide a poor website. Finish with observable criteria. The
                W3C’s WCAG guidance is the authority for accessibility details, while Core Web Vitals gives
                you practical performance signals for loading, responsiveness and visual stability.
              </p>
              <div className="qa-grid">
                {qaItems.map(([title, question], index) => (
                  <div key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{question}</p></div>
                ))}
              </div>
              <p className="article-source-note">
                Keep the acceptance criteria close: <a href="https://www.w3.org/WAI/WCAG22/quickref/">WCAG 2.2 Quick Reference</a> and{' '}
                <a href="https://web.dev/articles/vitals">Web Vitals</a>.
              </p>
            </section>

            <section className="article-related" aria-labelledby="related-guides-title">
              <p className="article-section-label">Coming next</p>
              <h2 id="related-guides-title">Explore what DesignMCP is covering next</h2>
              <div>
                <a href="/#choose-ui-components-by-product-intent">
                  <span>Planned guide · Component strategy</span>
                  <h3>How to choose UI components by product intent</h3>
                  <p>Move from a product outcome to a focused, defensible component choice.</p>
                  <i aria-hidden="true">Preview topic ↗</i>
                </a>
                <a href="/#what-coding-agents-need-from-component-libraries">
                  <span>Planned guide · MCP workflows</span>
                  <h3>What coding agents need from component libraries</h3>
                  <p>Give agents the previews, context and source files required to make reliable decisions.</p>
                  <i aria-hidden="true">Preview topic ↗</i>
                </a>
              </div>
            </section>

            <section className="article-conclusion">
              <p className="article-section-label">The short version</p>
              <h2>Better input. Smaller passes. Real proof.</h2>
              <p>
                The best Cursor website is not the one with the most elaborate prompt. It is the one built
                from a clear point of view, a small reusable system and an honest browser review. Give the agent
                concrete evidence, make one class of decision at a time, and keep the final code native to your product.
              </p>
              <div>
                <a className="button" href="/#catalogue">Give your agent better components <span aria-hidden="true">↗</span></a>
                <a className="button button--ghost" href="/#how-it-works">See how DesignMCP works</a>
              </div>
            </section>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
