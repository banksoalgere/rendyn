/* eslint-disable @next/next/no-html-link-for-pages -- Vinext can hydrate next/link from a second React context; native anchors avoid that runtime failure. */
import type { Metadata } from 'next';
import { Brand } from '../../components/brand';
import styles from './page.module.css';

const pageTitle = 'Cursor Design: How to Make Cursor Better at UI | Rendyn';
const pageDescription = 'A practical Cursor design workflow for better UI: encode your design system, choose stronger components, prompt in passes, and verify in a real browser.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    title: pageTitle,
    description: pageDescription,
    publishedTime: '2026-08-29T00:00:00+01:00',
    modifiedTime: '2026-08-29T00:00:00+01:00',
  },
  twitter: {
    card: 'summary',
    title: pageTitle,
    description: pageDescription,
  },
};

const tableOfContents = [
  ['Why Cursor UI looks generic', '#why-generic'],
  ['The seven-step workflow', '#workflow'],
  ['Use Cursor’s tools well', '#cursor-tools'],
  ['The prompt template', '#prompt'],
  ['A reusable Cursor rule', '#rule'],
  ['Browser QA checklist', '#qa'],
  ['Frequently asked questions', '#faq'],
];

const workflowSteps = [
  {
    title: 'Write the interface brief first',
    body: 'State what the screen helps someone do, who they are, what must be visible, and what should feel distinctive. “Make it modern” is not a brief. “A calm operations dashboard for support leads who need to spot exceptions in ten seconds” is.',
    note: 'Outcome before aesthetics',
  },
  {
    title: 'Make Cursor inspect the product before it edits',
    body: 'Ask the agent to identify the current layout, shared components, tokens, breakpoints, and accessibility patterns. The best new UI usually extends the system that already exists. Rebuilding buttons and spacing scales creates drift, even when the first screenshot looks polished.',
    note: 'Reuse before invention',
  },
  {
    title: 'Encode the visual system as a project rule',
    body: 'Put durable decisions in a focused .cursor/rules file: where canonical components live, which tokens to use, how dense the interface should feel, and which patterns to avoid. Cursor’s own guidance recommends focused, actionable rules with concrete examples and file references.',
    note: 'Persistent design context',
  },
  {
    title: 'Use references as direction, not tracing paper',
    body: 'A reference frame is useful when you name the principles to borrow: headline scale, content rhythm, border treatment, hierarchy, or motion character. Also name what not to copy. That gives Cursor a design target while keeping the resulting product original.',
    note: 'Principles, not pixels',
  },
  {
    title: 'Choose components before composing the page',
    body: 'Component choice is a design decision. Search by intent, compare a small set of credible options, and choose the one whose states and behavior fit the product. A generic card cannot become a specific product surface through gradients alone.',
    note: 'Strong parts, fewer guesses',
  },
  {
    title: 'Prompt in passes with explicit acceptance criteria',
    body: 'Separate structure, system, states, and polish. Ask Cursor to preserve the working implementation between passes. At the end of each pass, require it to explain what changed and what remains unverified. This keeps visual iteration legible and limits accidental rewrites.',
    note: 'One decision layer at a time',
  },
  {
    title: 'Judge the running interface in a real browser',
    body: 'Render the route at desktop and mobile widths. Use the page, move through it with a keyboard, and inspect the console and failed requests. A component is not done because its JSX looks plausible; it is done when the product still works and the design holds together on screen.',
    note: 'Rendered proof, not source confidence',
  },
];

const cursorTools = [
  {
    label: 'Design Mode',
    title: 'Point at the visual problem',
    body: 'Select one or several elements, draw over a region, or narrate a change. Cursor carries the selected element, nearby layout, and code into the instruction.',
    href: 'https://cursor.com/docs/agent/design-mode',
  },
  {
    label: 'Browser',
    title: 'Close the implementation loop',
    body: 'Let Agent navigate, capture screenshots, test responsive states, and inspect console or network evidence instead of stopping after code generation.',
    href: 'https://cursor.com/docs/agent/tools/browser',
  },
  {
    label: 'Rules',
    title: 'Keep design decisions present',
    body: 'Store reusable, versioned direction in .cursor/rules and point to canonical files so later sessions start with the same constraints.',
    href: 'https://cursor.com/docs/rules',
  },
  {
    label: 'Figma + MCP',
    title: 'Bring real design context in',
    body: 'Cursor documents a Figma plugin for frames, tokens, and libraries. MCP can connect other tools and structured sources that the agent should consult.',
    href: 'https://cursor.com/for/designers',
  },
];

const mistakes = [
  ['One giant prompt', 'It mixes product architecture, page structure, visual system, copy, and polish into one opaque generation.'],
  ['Aesthetic adjectives only', 'Words like “premium” and “clean” need observable decisions: type scale, density, contrast, shape, and motion.'],
  ['Reference without boundaries', '“Copy this site” encourages imitation. Name the principles to adapt and the product constraints that must win.'],
  ['Polish before hierarchy', 'Decorative motion and gradients amplify weak structure. Fix priority, grouping, and reading order first.'],
  ['Source-only approval', 'A tidy diff says nothing about wrapping, focus order, overflow, broken requests, or whether the page actually feels coherent.'],
];

const faqs = [
  {
    question: 'Is Cursor good at UI design?',
    answer: 'Cursor is capable of implementing strong UI, especially when it can inspect a real codebase, visual references, and the running page. It is less reliable when it must invent the product strategy, design system, component library, and acceptance criteria from a vague prompt.',
  },
  {
    question: 'How do I make Cursor generate better UI?',
    answer: 'Give it a specific interface brief, make it reuse existing primitives, encode the design system in project rules, supply bounded visual references, work in passes, and require browser verification at representative widths. Better inputs and a visible review loop matter more than prompt length.',
  },
  {
    question: 'Can Cursor use Figma designs?',
    answer: 'Yes. Cursor’s current designer guidance describes a Figma plugin that can reference frames, extract design tokens, inspect published libraries, and generate code from that context. Pair the frame with your existing components and rules so the implementation fits the product rather than only matching a screenshot.',
  },
  {
    question: 'Can Cursor make a beautiful website from one prompt?',
    answer: 'It can produce an impressive first pass, but a beautiful website that stays coherent across states and breakpoints usually needs several deliberate passes. Treat the first prompt as direction, not final approval, and review the rendered experience before shipping.',
  },
  {
    question: 'Do I need MCP to improve Cursor design?',
    answer: 'No. A clear brief, strong rules, and browser QA already improve the result. MCP becomes useful when the agent needs structured access to a component catalogue, design system, or another external source instead of relying on pasted context.',
  },
  {
    question: 'Should I ask Cursor to copy another website?',
    answer: 'Use other work as a reference, not a source to reproduce. Identify the hierarchy, rhythm, interaction principle, or layout device that matters; then adapt those principles to your own brand, content, accessibility needs, and product constraints.',
  },
];

const relatedGuides = [
  { label: 'Component strategy', title: 'How to choose UI components by product intent', href: '/#resources' },
  { label: 'MCP workflows', title: 'What coding agents need from component libraries', href: '/#resources' },
];

const promptTemplate = `Build [route or screen] for [specific audience].

Outcome
- Help the user [complete one primary job].
- The page should feel [three concrete qualities].

Use the product system
- Inspect [shared component paths] and [token/style paths] first.
- Reuse existing primitives; do not create parallel buttons, inputs, or cards.
- Preserve the current framework, routing, and data behavior.

Visual direction
- Use [reference] for [hierarchy / rhythm / interaction principle] only.
- Do not copy its branding, copy, assets, or distinctive composition.
- Prioritize one clear H1, readable measure, visible states, and restrained motion.

Acceptance criteria
- Responsive at 375px, 768px, and 1440px.
- Keyboard usable with visible focus and semantic landmarks.
- No overflow, console errors, or failed first-party requests.
- Respect prefers-reduced-motion.

Work in this order: inspect → propose structure → implement → browser verify.
Report what you checked and anything still unverified.`;

const ruleTemplate = `---
description: Product UI and design-system rules
globs: ["src/**/*.tsx", "src/**/*.css"]
alwaysApply: false
---

# Product interface rules

- Reuse primitives from src/components/ui before creating a new component.
- Use color, spacing, radius, and type tokens from src/styles/tokens.css.
- Keep one primary action per surface; secondary actions stay visually quieter.
- Prefer 45–75 characters for long-form text and preserve semantic heading order.
- Define hover, focus-visible, active, disabled, loading, empty, and error states.
- Motion must explain change, remain subtle, and respect prefers-reduced-motion.
- Validate at mobile and desktop widths in the running app.

# Avoid

- Raw hex values when an appropriate token exists.
- Decorative gradients, glass effects, or excessive rounding without product purpose.
- New dependencies for a pattern already present in the repository.
- Rewriting working behavior as part of a visual-only task.`;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function CursorDesignGuide() {
  return (
    <main className={styles.page} id="top">
      <header className={styles.header}>
        <Brand href="/" label="Rendyn home" />
        <nav aria-label="Guide navigation">
          <a href="#workflow">Workflow</a>
          <a href="#prompt">Prompt</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className={styles.headerCta} href="/#catalogue">Browse components <Arrow /></a>
      </header>

      <article aria-labelledby="guide-title">
        <header className={styles.hero}>
          <div className={styles.meta}>
            <span>Cursor design guide</span>
            <span aria-hidden="true">•</span>
            <span>12 min read</span>
          </div>
          <h1 id="guide-title">How to Make Cursor Better at Design</h1>
          <p className={styles.deck}>
            Better Cursor UI does not come from a longer prompt. It comes from giving the agent
            a visual system, strong component choices, and a browser loop that makes taste testable.
          </p>
          <div className={styles.byline}>
            <span className={styles.authorMark} aria-hidden="true">R</span>
            <p>By <strong>Rendyn Editorial</strong></p>
            <span aria-hidden="true">•</span>
            <time dateTime="2026-08-29">29 August 2026</time>
          </div>
          <div className={styles.heroTags} aria-label="Guide topics">
            <span>Design systems</span><span>Agent prompting</span><span>Browser QA</span>
          </div>
        </header>

        <section className={styles.heroFrame} aria-label="The four-part Cursor design workflow">
          <div className={styles.frameCanvas}>
            <div className={styles.canvasBar}>
              <span><i aria-hidden="true" /> Design brief / support overview</span>
              <span>Ready for Cursor</span>
            </div>
            <div className={styles.frameIntro}>
              <span>Design direction</span>
              <h2>Turn “make it modern” into a system Cursor can follow.</h2>
              <p>Replace aesthetic adjectives with concrete decisions, reusable references, and visible acceptance criteria.</p>
            </div>
            <ol className={styles.workflowStrip}>
              <li><span>01</span><strong>Brief</strong><small>Outcome + audience</small></li>
              <li><span>02</span><strong>System</strong><small>Type + tokens</small></li>
              <li><span>03</span><strong>Choose</strong><small>Proven components</small></li>
              <li><span>04</span><strong>Verify</strong><small>Real browser QA</small></li>
            </ol>
          </div>
          <aside className={styles.frameCta}>
            <span className={styles.miniMark} aria-hidden="true">R</span>
            <h2>Start with better building blocks.</h2>
            <p>Give Cursor a small, relevant set of polished components instead of another blank canvas.</p>
            <a href="/#catalogue">Explore Rendyn <Arrow /></a>
            <small>React · TypeScript · complete source</small>
          </aside>
        </section>

        <div className={styles.contentGrid}>
          <aside className={styles.guideAside} aria-label="On this page">
            <div className={styles.asideInner}>
              <p>On this page</p>
              <ol>
                {tableOfContents.map(([label, href], index) => (
                  <li key={href}><a href={href}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a></li>
                ))}
              </ol>
              <div className={styles.asideCta}>
                <span>Rendyn</span>
                <strong>From interface intent to production-ready source.</strong>
                <a href="/pricing">Start 7-day trial <Arrow /></a>
              </div>
            </div>
          </aside>

          <div className={styles.articleBody}>
            <p className={styles.lede}>
              Cursor can write polished front-end code. But code generation is only the last part of design.
              The harder work is deciding what the interface should prioritize, how it should feel, which patterns fit,
              and how you will know the result is actually good.
            </p>
            <p>
              When that context is missing, the agent falls back to broadly familiar patterns. You get a technically tidy page
              with interchangeable cards, generic hierarchy, decorative gradients, and no strong relationship to the product.
              The fix is not to ask for “more beautiful” UI. The fix is to make the design process legible to the agent.
            </p>

            <section className={styles.answerCard} aria-labelledby="short-answer">
              <div>
                <p className={styles.eyebrow}>The short answer</p>
                <h2 id="short-answer">Give Cursor constraints it can see, reuse, and check.</h2>
              </div>
              <ul>
                <li><span>01</span>Write a product-specific interface brief.</li>
                <li><span>02</span>Point to canonical components and tokens.</li>
                <li><span>03</span>Encode durable decisions in Cursor rules.</li>
                <li><span>04</span>Work through structure, states, and polish separately.</li>
                <li><span>05</span>Approve the rendered UI, not just the diff.</li>
              </ul>
            </section>

            <section id="why-generic">
              <p className={styles.sectionLabel}>01 / Diagnose the problem</p>
              <h2>Why Cursor UI looks generic</h2>
              <p>
                An agent cannot infer a coherent visual language from a feature description alone. If you ask for a “beautiful SaaS
                dashboard,” it must invent the information architecture, density, typography, components, states, and brand character at
                the same time. A safe average is the predictable result.
              </p>
              <p>
                Current Cursor gives you better ways to supply that missing context. Its <a className={styles.inlineLink} href="https://cursor.com/docs/agent/design-mode">Design Mode</a> can
                target visible elements and regions; <a className={styles.inlineLink} href="https://cursor.com/docs/agent/tools/browser">Browser</a> can test the running app; project rules can preserve design-system decisions;
                and Figma or other tools can connect through plugins and MCP. Those capabilities improve the loop, but they still need a clear design direction.
              </p>
              <blockquote>
                <span aria-hidden="true">“</span>
                <p>Taste becomes useful to an agent when it is expressed as choices, references, and acceptance criteria.</p>
              </blockquote>
            </section>

            <section id="workflow">
              <p className={styles.sectionLabel}>02 / A repeatable method</p>
              <h2>The seven-step Cursor design workflow</h2>
              <p>
                Use this sequence for a new page, a redesign, or a focused UI repair. Each step removes a different kind of ambiguity before
                Cursor turns it into code.
              </p>

              <div className={styles.briefBoard} aria-label="Example interface brief">
                <div className={styles.briefBoardHead}><span>Interface brief</span><span>01 / before code</span></div>
                <dl>
                  <div><dt>Audience</dt><dd>Support leads managing a live queue</dd></div>
                  <div><dt>Primary job</dt><dd>Find exceptions and assign an owner quickly</dd></div>
                  <div><dt>Must feel</dt><dd>Calm, operational, precise</dd></div>
                  <div><dt>Avoid</dt><dd>Consumer-dashboard gloss and noisy status color</dd></div>
                </dl>
              </div>

              <ol className={styles.stepList}>
                {workflowSteps.map((step, index) => (
                  <li key={step.title}>
                    <div className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</div>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                      <span>{step.note}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className={styles.fullBleedSection} id="cursor-tools">
              <p className={styles.sectionLabel}>03 / Current capabilities</p>
              <h2>Use Cursor’s UI tools for the job they actually solve</h2>
              <p>
                More tooling is not automatically more design context. Give each capability a narrow responsibility in the workflow.
              </p>
              <div className={styles.toolGrid}>
                {cursorTools.map((tool) => (
                  <a href={tool.href} key={tool.label}>
                    <span>{tool.label}</span>
                    <h3>{tool.title}</h3>
                    <p>{tool.body}</p>
                    <i>Official Cursor documentation <Arrow /></i>
                  </a>
                ))}
              </div>
            </section>

            <section id="better-ui">
              <p className={styles.sectionLabel}>04 / Better inputs</p>
              <h2>Make Cursor better at UI with a component decision loop</h2>
              <p>
                Design systems answer “what is allowed.” A component catalogue can also answer “what is a strong fit for this exact job.”
                That matters when the agent needs to choose an interaction pattern, not merely reproduce a named component.
              </p>
              <div className={styles.decisionLoop}>
                <article><span>Search</span><h3>Describe the intent</h3><p>“A compact approval step for a high-trust finance workflow” carries more signal than “add a modal.”</p></article>
                <article><span>Compare</span><h3>Inspect a small shortlist</h3><p>Review visual previews, behavior, dependencies, and why each option fits before committing to one.</p></article>
                <article><span>Deliver</span><h3>Use the complete source</h3><p>Bring the chosen component, states, supporting files, and install instructions into the existing system.</p></article>
              </div>
              <div className={styles.productCta}>
                <div><span className={styles.miniMark} aria-hidden="true">R</span><p><strong>Rendyn</strong><small>A curated component catalogue for coding agents</small></p></div>
                <a href="/#product">See how it works <Arrow /></a>
              </div>
            </section>

            <section>
              <p className={styles.sectionLabel}>05 / Raise the bar</p>
              <h2>How to get a beautiful website out of Cursor</h2>
              <p>
                “Beautiful” should mean coherent, not decorated. A strong website has a clear reading order, deliberate proportions,
                consistent components, complete interaction states, and restraint. Cursor can implement all of that when you turn the word
                into observable criteria.
              </p>
              <div className={styles.comparisonPrompt}>
                <article>
                  <span>Vague request</span>
                  <p>“Make this landing page beautiful and premium. Add animations and improve the UI.”</p>
                  <small>Cursor must invent every important decision.</small>
                </article>
                <article>
                  <span>Useful direction</span>
                  <p>“Create one dominant reading path, use our editorial type scale, keep controls compact, and reserve motion for state changes. Validate the hero at 375px and 1440px.”</p>
                  <small>Cursor can implement and verify specific choices.</small>
                </article>
              </div>
            </section>

            <section id="prompt">
              <p className={styles.sectionLabel}>06 / Copy the framework</p>
              <h2>A Cursor UI prompt that leaves less to chance</h2>
              <p>
                Replace the brackets, remove anything that does not apply, and keep the instruction tied to the current repository. The order
                matters: inspect first, then build, then verify.
              </p>
              <div className={styles.codeBlock}>
                <div><span>cursor-ui-prompt.txt</span><span>Prompt template</span></div>
                <pre><code>{promptTemplate}</code></pre>
              </div>
            </section>

            <section id="rule">
              <p className={styles.sectionLabel}>07 / Preserve the system</p>
              <h2>A reusable Cursor design rule</h2>
              <p>
                Keep the rule focused and adapt the paths to your project. Reference canonical files instead of pasting their contents, so the
                guidance stays useful as the implementation changes.
              </p>
              <div className={styles.codeBlock}>
                <div><span>.cursor/rules/product-ui.mdc</span><span>Project rule</span></div>
                <pre><code>{ruleTemplate}</code></pre>
              </div>
              <p className={styles.sourceNote}>
                Cursor documents project rules in <code>.cursor/rules</code> and recommends focused, actionable guidance with concrete examples and file references. Read the <a href="https://cursor.com/docs/rules">current Rules documentation</a> before standardizing the format for your team.
              </p>
            </section>

            <section id="qa">
              <p className={styles.sectionLabel}>08 / Approval</p>
              <h2>The browser QA checklist</h2>
              <p>
                Finish the task in the product, not the editor. Cursor’s browser tooling is designed to navigate and test applications, capture
                visual state, and inspect console or network evidence. Ask for the exact checks that matter.
              </p>
              <div className={styles.qaGrid}>
                <div><span>Layout</span><ul><li>375px, 768px, and 1440px</li><li>No clipped or overflowing content</li><li>Readable line length and stable hierarchy</li></ul></div>
                <div><span>Interaction</span><ul><li>Keyboard order and visible focus</li><li>Hover, active, disabled, and loading states</li><li>Touch targets and working links</li></ul></div>
                <div><span>System</span><ul><li>No console errors</li><li>No obvious failed first-party requests</li><li>Existing behavior still works</li></ul></div>
                <div><span>Access</span><ul><li>One clear H1 and semantic headings</li><li>Labels and meaningful link text</li><li>Reduced-motion preference respected</li></ul></div>
              </div>
            </section>

            <section>
              <p className={styles.sectionLabel}>09 / Common failure modes</p>
              <h2>Five habits that keep Cursor design average</h2>
              <div className={styles.mistakeList}>
                {mistakes.map(([title, body], index) => (
                  <details key={title}>
                    <summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><i aria-hidden="true">+</i></summary>
                    <p>{body}</p>
                  </details>
                ))}
              </div>
            </section>

            <section>
              <p className={styles.sectionLabel}>10 / Put it into practice</p>
              <h2>A focused 60-minute Cursor design pass</h2>
              <div className={styles.timeline}>
                <div><span>00–10</span><p><strong>Inspect</strong>Map the route, primitives, tokens, and current constraints.</p></div>
                <div><span>10–20</span><p><strong>Direct</strong>Write the interface brief and pick the reference principles.</p></div>
                <div><span>20–40</span><p><strong>Build</strong>Implement hierarchy and real states with existing components.</p></div>
                <div><span>40–55</span><p><strong>Verify</strong>Use the browser at desktop and mobile widths; fix real findings.</p></div>
                <div><span>55–60</span><p><strong>Record</strong>Capture the durable decision in a rule or product-system note.</p></div>
              </div>
            </section>

            <section id="faq">
              <p className={styles.sectionLabel}>11 / Frequently asked questions</p>
              <h2>Cursor design FAQ</h2>
              <div className={styles.faqList}>
                {faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary><strong>{faq.question}</strong><span aria-hidden="true">+</span></summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className={styles.sources}>
              <p className={styles.sectionLabel}>Sources &amp; further reading</p>
              <h2>Current Cursor documentation used for this guide</h2>
              <p>Capabilities were reviewed against Cursor’s public documentation on 29 August 2026.</p>
              <ul>
                <li><a href="https://cursor.com/docs/agent/design-mode"><span>Design Mode</span><Arrow /></a></li>
                <li><a href="https://cursor.com/docs/agent/tools/browser"><span>Browser tools</span><Arrow /></a></li>
                <li><a href="https://cursor.com/docs/rules"><span>Project and team rules</span><Arrow /></a></li>
                <li><a href="https://cursor.com/docs/mcp"><span>Model Context Protocol</span><Arrow /></a></li>
                <li><a href="https://cursor.com/for/designers"><span>Cursor for designers</span><Arrow /></a></li>
              </ul>
            </section>
          </div>
        </div>
      </article>

      <section className={styles.related} aria-labelledby="related-title">
        <div><p>From the resource library</p><h2 id="related-title">Related Rendyn reading</h2></div>
        <div>
          {relatedGuides.map((guide) => (
            <a aria-label={`Find ${guide.title} in the resource library`} href={guide.href} key={guide.title}>
              <span>{guide.label}</span><strong>{guide.title}</strong><Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="final-cta-title">
        <p>Put the Cursor design workflow to work</p>
        <h2 id="final-cta-title">Give Cursor better<br />design context.</h2>
        <span>Rendyn helps Cursor find, compare, and implement polished interface components with the context to choose well.</span>
        <div><a href="/#catalogue">Browse the catalogue <Arrow /></a><a href="/pricing">Start 7-day trial</a></div>
      </section>

      <footer className={styles.footer}>
        <div><Brand href="/" label="Rendyn home" /><p>A curated component catalogue for the coding agents you already use.</p></div>
        <nav aria-label="Footer navigation"><a href="/#product">Product</a><a href="/#catalogue">Components</a><a href="/#resources">Resources</a><a href="#top">Back to top ↑</a></nav>
        <p>© 2026 Rendyn <span>Editorial guide · Cursor is a trademark of its respective owner.</span></p>
      </footer>
    </main>
  );
}
