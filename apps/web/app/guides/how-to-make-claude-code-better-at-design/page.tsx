import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

const route = '/guides/how-to-make-claude-code-better-at-design';

export const metadata: Metadata = {
  title: 'How to Make Claude Code Better at Design | Rendyn',
  description: 'Make Claude Code better at design with a practical workflow for stronger prompts, persistent visual context, better components and browser-based UI review.',
  authors: [{ name: 'Rendyn Editorial' }],
  alternates: { canonical: route },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    title: 'How to Make Claude Code Better at Design',
    description: 'A practical workflow for turning generic Claude Code UI into coherent, product-ready interface work.',
    url: route,
    authors: ['Rendyn Editorial'],
    publishedTime: '2026-08-29T00:00:00.000Z',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'How to Make Claude Code Better at Design',
    description: 'A practical workflow for stronger Claude Code UI, from design context to browser verification.',
    images: [],
  },
};

const tableOfContents = [
  ['quick-answer', 'The short answer'],
  ['why-it-looks-generic', 'Why the UI looks generic'],
  ['better-design-workflow', 'The six-step workflow'],
  ['prompt-template', 'A prompt that works'],
  ['design-context-stack', 'What to put where'],
  ['review-loop', 'The browser review loop'],
  ['mistakes', 'Mistakes to avoid'],
  ['checklist', 'Ship checklist'],
  ['faq', 'FAQ'],
];

const workflow = [
  {
    number: '01',
    title: 'Audit before you style',
    body: 'Ask Claude to inspect the current page, shared components, tokens, fonts and responsive rules before editing. The goal is to find the product’s existing visual grammar—not to paint a new theme over it.',
    deliverable: 'A short inventory of what should be reused, what is inconsistent and what must remain unchanged.',
  },
  {
    number: '02',
    title: 'Write a design brief, not an adjective pile',
    body: '“Modern and beautiful” gives Claude almost no decision-making signal. Define the user, task, emotional tone, information density, hierarchy, interaction character and hard constraints instead.',
    deliverable: 'One paragraph that makes trade-offs explicit: editorial over app-like, calm over playful, dense over spacious, or vice versa.',
  },
  {
    number: '03',
    title: 'Give it evidence it can inspect',
    body: 'Provide screenshots, a live reference, existing product routes or a design file. Explain what to learn from each reference—rhythm, hierarchy, framing or motion—so Claude does not treat “inspired by” as “copy this page.”',
    deliverable: 'Two or three annotated references and the specific principles each one contributes.',
  },
  {
    number: '04',
    title: 'Make your taste persistent',
    body: 'Keep brief project invariants in CLAUDE.md. Put deeper, reusable design guidance in a skill or a dedicated design-system document, then point Claude to it for UI work. Keep page-specific direction in the task itself.',
    deliverable: 'A small context stack that loads the right design knowledge at the right time.',
  },
  {
    number: '05',
    title: 'Build one representative slice',
    body: 'Have Claude implement the header, first viewport and one real content pattern before expanding across the page. Review the direction while change is still cheap; then apply the approved system consistently.',
    deliverable: 'A coherent first viewport with real copy, real components and the intended visual direction.',
  },
  {
    number: '06',
    title: 'Close the loop in a real browser',
    body: 'A compiled page is not a designed page. Ask Claude to open the route, inspect it at desktop and mobile widths, use the interactions, review the console and compare screenshots against the brief. Fix what the browser proves, then repeat.',
    deliverable: 'Evidence for layout, behavior, accessibility basics and obvious runtime failures—not a claim that the code “should” look right.',
  },
];

const contextRows = [
  ['Project conventions', 'CLAUDE.md', 'Routes, commands, component rules, accessibility and non-negotiable product constraints.'],
  ['Reusable design judgment', 'A Claude Code skill', 'Visual principles, anti-patterns, review method and the vocabulary your team uses.'],
  ['Design system detail', 'Design document + code', 'Tokens, typography, spacing, component states, content rules and real examples.'],
  ['Current visual target', 'Screenshots or a live page', 'Composition, hierarchy, rhythm and interaction behavior for this specific task.'],
  ['External source of truth', 'MCP connection', 'Approved design files, component libraries or other tools Claude needs to query.'],
  ['Acceptance evidence', 'Browser verification', 'Rendered layouts, clicks, keyboard behavior, console output and network failures.'],
];

const checklist = [
  'There is one clear visual idea, not a collage of popular effects.',
  'The page reuses the product’s real components and tokens where they fit.',
  'Type scale, spacing, border radii and shadows follow a deliberate system.',
  'Primary and secondary actions are obvious without relying on decoration.',
  'Loading, empty, error, disabled, hover and focus states are accounted for.',
  'The layout has been inspected at a narrow mobile width and a wide desktop width.',
  'Keyboard focus is visible, headings are semantic and contrast is usable.',
  'The browser console is clean and important requests do not fail.',
  'Reduced-motion behavior is appropriate for non-essential animation.',
  'The final result was compared with the brief and references, not just the previous draft.',
];

export default function ClaudeCodeDesignGuide() {
  return (
    <div className="guide-page">
      <SiteHeader />

      <main id="top">
        <article>
        <header className="guide-hero grid-field">
          <div className="guide-hero-inner">
            <div className="guide-byline">
              <span className="guide-topic">By Rendyn Editorial</span>
              <span aria-hidden="true">•</span>
              <span>Field guide · Claude Code design</span>
              <span aria-hidden="true">•</span>
              <time dateTime="2026-08-29">August 29, 2026</time>
              <span aria-hidden="true">•</span>
              <span>12 min read</span>
            </div>
            <h1>How to Make Claude Code Better at Design</h1>
            <p className="guide-deck">
              Claude Code can build polished interfaces, but taste does not come from asking it to “make this look better.” It comes from giving the agent a visual system, concrete references and a browser loop that turns judgment into evidence.
            </p>
          </div>
        </header>

        <div className="guide-feature section-shell" aria-label="The shift from a vague prompt to a design-informed workflow">
          <div className="guide-feature-copy">
            <span className="guide-feature-label">The essential shift</span>
            <h2>Stop prompting for polish.<br />Start supplying direction.</h2>
            <p>A stronger result comes from a small chain of decisions: inspect the product, define the visual intent, show the target, reuse the system and verify the render.</p>
          </div>
          <div className="design-shift" aria-hidden="true">
            <div className="design-shift-card design-shift-card--before">
              <span>Vague request</span>
              <p>“Make the dashboard modern.”</p>
              <div className="generic-ui"><i /><i /><i /><i /></div>
              <small>Safe defaults · weak hierarchy · no proof</small>
            </div>
            <div className="design-shift-arrow">→</div>
            <div className="design-shift-card design-shift-card--after">
              <span>Directed workflow</span>
              <p>Intent + system + reference + review</p>
              <div className="directed-ui"><i /><i /><i /></div>
              <small>Coherent choices · product fit · verified UI</small>
            </div>
          </div>
        </div>

        <div className="guide-layout section-shell">
          <aside className="guide-sidebar">
            <nav className="guide-toc" aria-label="On this page">
              <p>On this page</p>
              {tableOfContents.map(([href, label], index) => (
                <a href={`#${href}`} key={href}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>
              ))}
            </nav>
            <div className="guide-sidebar-cta">
              <span className="brand-mark" aria-hidden="true">R</span>
              <p className="guide-sidebar-title">Give Claude better ingredients.</p>
              <p>Search polished interface components by product intent, then give your agent the source and context to ship them well.</p>
              <Link className="button" href="/#catalogue">Explore Rendyn <span aria-hidden="true">↗</span></Link>
            </div>
          </aside>

          <div className="guide-content">
            <section id="quick-answer">
              <p className="guide-section-label">The short answer</p>
              <h2>The fastest way to make Claude Code better at design</h2>
              <div className="guide-answer">
                <strong>Give it fewer open design decisions and a way to inspect the outcome.</strong>
                <p>Start with the existing product, state a clear visual direction, attach references, encode reusable rules, build a small slice and make Claude test the actual page. Better UI is mostly better context plus a tighter feedback loop.</p>
              </div>
              <p>
                That sounds simple because it is. The hard part is resisting a familiar workflow: ask for an entire page in one vague sentence, judge the first screenshot emotionally, then keep adding adjectives. Each revision may change the surface, but it rarely improves the underlying system.
              </p>
            </section>

            <section id="why-it-looks-generic">
              <p className="guide-section-label">Diagnose the pattern</p>
              <h2>Why Claude Code UI can look generic—even when the code is good</h2>
              <p>
                Claude is often solving an under-specified problem. If the request is only “build a clean SaaS dashboard,” many conventional answers are defensible: a neutral sans serif, a card grid, cool grey borders, a purple accent and generous rounding. The result is not necessarily broken. It is simply the average of too many possible products.
              </p>
              <div className="guide-pullquote">
                <span aria-hidden="true">“</span>
                <p>Generic UI is usually a context problem before it is a model problem.</p>
              </div>
              <p>
                Anthropic describes the same failure mode in its guide to <a href="https://claude.com/blog/improving-frontend-design-through-skills">improving frontend design through Skills</a>: common visual defaults converge when the model lacks more useful alternatives. The official frontend-design plugin responds by giving Claude stronger aesthetic heuristics without putting that context into every unrelated coding request.
              </p>
              <div className="cause-grid">
                <div className="cause-card"><span>01</span><h3>No product point of view</h3><p>The prompt says what to build, but not what the experience should communicate or prioritize.</p></div>
                <div className="cause-card"><span>02</span><h3>No stable design memory</h3><p>Typography, spacing and interaction decisions are re-invented in every session or page.</p></div>
                <div className="cause-card"><span>03</span><h3>No visual acceptance test</h3><p>The agent stops when code compiles instead of checking what users actually see and do.</p></div>
              </div>
            </section>

            <section id="better-design-workflow">
              <p className="guide-section-label">The working method</p>
              <h2>A six-step Claude Code design workflow</h2>
              <p>Use this sequence whether you are creating a landing page, improving an ugly app UI or extending an established product. It deliberately separates visual direction from implementation and implementation from proof.</p>
              <div className="workflow-list">
                {workflow.map((step) => (
                  <div className="workflow-item" key={step.number}>
                    <span className="workflow-number">{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                      <p className="workflow-deliverable"><strong>Output:</strong> {step.deliverable}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="guide-source-note">
                Claude Code currently supports persistent <a href="https://code.claude.com/docs/en/memory">CLAUDE.md instructions</a>, on-demand <a href="https://code.claude.com/docs/en/slash-commands">Skills</a>, external tools through <a href="https://code.claude.com/docs/en/mcp">MCP</a>, <a href="https://code.claude.com/docs/en/tutorials">image input</a> and <a href="https://code.claude.com/docs/en/chrome">browser verification</a>. The mechanisms are already there; the workflow connects them.
              </p>
            </section>

            <section id="prompt-template">
              <p className="guide-section-label">Copy and adapt</p>
              <h2>A prompt that produces better Claude Code design</h2>
              <p>A good prompt does not prescribe every pixel. It tells Claude what to learn, which decisions matter and how to prove the result.</p>
              <div className="prompt-card">
                <div className="prompt-card-top"><span>CLAUDE CODE PROMPT</span><span>DESIGN REVIEW LOOP</span></div>
                <pre><code>{`Inspect the existing page, shared components, tokens and responsive patterns before editing.

Goal: [what the page or flow must help the user do]
Audience: [who they are and what they already understand]
Direction: [3–5 specific qualities, with useful contrasts]
Example: editorial rather than dashboard-like; warm, precise and high-trust; compact navigation with generous reading rhythm.

Use [reference paths or URLs] for hierarchy, pacing and interaction principles. Do not copy their branding or assets. Reuse the product's existing primitives wherever they fit.

First implement the header, first viewport and one representative content pattern. Show me the rendered page before expanding the system.

Then complete the page and verify it in a real browser at desktop and mobile widths. Test the interactions and links, inspect focus behavior, console errors and obvious failed requests, and fix the issues you find.

Report the route, files changed, design decisions and browser evidence.`}</code></pre>
              </div>
              <h3>What makes this prompt work</h3>
              <ul>
                <li>It begins with the repository, so Claude’s design fits the product instead of replacing it.</li>
                <li>It uses contrasts—editorial versus dashboard-like—which are more decisive than adjectives alone.</li>
                <li>It names what to borrow from references and explicitly protects against copying.</li>
                <li>It creates a review point before the direction is repeated across the whole page.</li>
                <li>It defines browser evidence as part of “done.”</li>
              </ul>
            </section>

            <section id="design-context-stack">
              <p className="guide-section-label">Context architecture</p>
              <h2>Put each design instruction in the right place</h2>
              <p>
                Do not turn CLAUDE.md into a 1,000-line style guide. Anthropic’s <a href="https://code.claude.com/docs/en/memory">project-memory guidance</a> recommends keeping persistent instructions concise and moving multi-step or domain-specific procedures into Skills or scoped rules. A layered setup gives Claude the relevant information without burying the task.
              </p>
              <div className="context-table" role="table" aria-label="Where to store Claude Code design context">
                <div className="context-row context-row--head" role="row">
                  <span role="columnheader">Need</span><span role="columnheader">Best home</span><span role="columnheader">Include</span>
                </div>
                {contextRows.map(([need, home, include]) => (
                  <div className="context-row" role="row" key={need}>
                    <strong role="cell">{need}</strong><code role="cell">{home}</code><p role="cell">{include}</p>
                  </div>
                ))}
              </div>
              <div className="guide-callout">
                <span>Useful rule of thumb</span>
                <p>If every task needs the instruction, use CLAUDE.md. If only design work needs it, use a Skill. If only this page needs it, keep it in the prompt.</p>
              </div>
              <div className="article-product-demo" role="group" aria-label="Example of a Rendyn component result for Claude Code">
                <div className="article-product-demo-top">
                  <div><span className="brand-mark" aria-hidden="true">R</span><p><strong>Rendyn</strong><small>Component context for an agent</small></p></div>
                  <span>Example result</span>
                </div>
                <div className="article-product-query"><span aria-hidden="true">✦</span><p>“A calm confirmation action for a high-trust workflow”</p></div>
                <div className="article-product-result">
                  <span>01</span>
                  <div><strong>Signal button</strong><p>Quiet motion · clear focus · complete states</p></div>
                  <i>Best fit</i>
                </div>
                <div className="article-product-files"><span>signal-button.tsx</span><span>states.css</span><span>install.md</span></div>
                <div className="article-product-demo-bottom"><p>A useful component handoff gives Claude a visual choice, fit reasoning and the implementation—not another adjective.</p><Link href="/#catalogue">Explore the catalogue <span aria-hidden="true">↗</span></Link></div>
              </div>
            </section>

            <section id="review-loop">
              <p className="guide-section-label">From code to evidence</p>
              <h2>The browser loop that makes Claude Code UI look better</h2>
              <p>
                Visual quality is iterative. Anthropic’s current browser tooling can inspect rendered DOM state and console errors, exercise user flows and compare the implementation with a visual reference. <a href="https://code.claude.com/docs/en/desktop">Claude Code Desktop</a> can also open an embedded preview and iterate on what it sees. Use that capability deliberately.
              </p>
              <ol className="review-steps">
                <li><span>1</span><div><strong>Render the exact route</strong><p>Confirm the page—not just the dev server—loads without a blocking error.</p></div></li>
                <li><span>2</span><div><strong>Inspect the first viewport</strong><p>Check headline measure, hierarchy, framing, whitespace and whether the primary action is obvious.</p></div></li>
                <li><span>3</span><div><strong>Use the page</strong><p>Follow anchors, open controls, tab through focusable elements and check hover and active states.</p></div></li>
                <li><span>4</span><div><strong>Change the viewport</strong><p>Inspect a narrow phone width and a wide desktop. Look for clipped copy, dense tap targets, overflow and awkward line breaks.</p></div></li>
                <li><span>5</span><div><strong>Read the runtime evidence</strong><p>Review console messages and obvious failed network requests. A pretty screenshot can still hide a broken page.</p></div></li>
                <li><span>6</span><div><strong>Compare and refine</strong><p>Take a screenshot, compare it with the brief and reference principles, list concrete differences and fix the important ones.</p></div></li>
              </ol>
              <p>
                This is not theoretical: Anthropic’s <a href="https://code.claude.com/docs/en/chrome">Claude Code with Chrome</a> documentation explicitly lists design verification, console inspection, DOM inspection and web app testing as supported workflows, while its <a href="https://code.claude.com/docs/en/best-practices">best-practices guide</a> recommends giving Claude screenshots or expected output it can verify against.
              </p>
            </section>

            <section id="mistakes">
              <p className="guide-section-label">Common failure modes</p>
              <h2>What not to do when Claude Code makes ugly UI</h2>
              <div className="mistake-list">
                <div className="mistake-item"><span>Instead of</span><h3>“Make it pop”</h3><p>Name the hierarchy problem: “The primary action competes with three secondary cards; reduce their contrast and move the decision above the fold.”</p></div>
                <div className="mistake-item"><span>Instead of</span><h3>Adding more effects</h3><p>Choose one visual idea and remove decoration that does not clarify structure, affordance or brand character.</p></div>
                <div className="mistake-item"><span>Instead of</span><h3>Rebuilding every component</h3><p>Reuse accessible product primitives first. Change the shared system only when the task genuinely calls for a new pattern.</p></div>
                <div className="mistake-item"><span>Instead of</span><h3>Copying a reference literally</h3><p>Extract principles—headline scale, article rhythm, framed content, sticky navigation—then express them in your own identity.</p></div>
                <div className="mistake-item"><span>Instead of</span><h3>Stopping at “build passed”</h3><p>Judge the rendered interface. Compilation proves syntax and integration, not visual hierarchy, responsive fit or usability.</p></div>
              </div>
            </section>

            <section id="checklist">
              <p className="guide-section-label">Final review</p>
              <h2>Claude Code UI ship checklist</h2>
              <p>Give this list to Claude at the end of the task, or turn it into a reusable project Skill so the same standards travel across pages.</p>
              <div className="ship-checklist">
                {checklist.map((item, index) => (
                  <div key={item}><span aria-hidden="true">✓</span><p>{item}</p><i>{String(index + 1).padStart(2, '0')}</i></div>
                ))}
              </div>
            </section>

            <section id="faq">
              <p className="guide-section-label">Questions people ask</p>
              <h2>Claude Code design FAQ</h2>
              <div className="guide-faq">
                <details>
                  <summary>Is Claude Code bad at UI design?</summary>
                  <p>No. It can produce strong frontend work, and Anthropic now ships design-specific guidance and tooling. But Claude Code UI quality depends heavily on the context and feedback you supply. Vague prompts reliably produce conventional choices because conventional choices are usually safe.</p>
                </details>
                <details>
                  <summary>How do I make Claude Code look better without being a designer?</summary>
                  <p>Use two or three interfaces you already consider good, explain what you like about each, choose a few product qualities and ask Claude to build one small section first. You do not need to prescribe pixels; you do need to make preferences and trade-offs visible.</p>
                </details>
                <details>
                  <summary>Should design rules go in CLAUDE.md?</summary>
                  <p>Only the short, always-relevant rules. Put deeper aesthetic guidance and repeatable review workflows in a Skill or scoped design document. Keep the current page’s brief and references in the task.</p>
                </details>
                <details>
                  <summary>Does the frontend-design plugin fix every generic interface?</summary>
                  <p>It gives Claude better defaults and a stronger vocabulary, which is valuable. It cannot supply your product strategy, real component system or acceptance criteria. Treat it as one layer in the workflow, not a substitute for direction and review.</p>
                </details>
                <details>
                  <summary>Can Claude Code review its own design?</summary>
                  <p>Yes, when it can see the rendered page. Use Claude Code with Chrome or the Desktop preview to inspect the page, test it and compare screenshots. Give it explicit criteria so the review is more than a generic list of design tips.</p>
                </details>
              </div>
            </section>

            <section className="guide-related" aria-labelledby="related-title">
              <p className="guide-section-label">Put it into practice</p>
              <h2 id="related-title">Use the workflow with Rendyn</h2>
              <div className="guide-related-grid">
                <Link href="/#catalogue"><span>Component strategy</span><h3>Choose UI components by product intent</h3><p>Move from a product outcome to a focused, defensible component choice.</p><i aria-hidden="true">↗</i></Link>
                <Link href="/#intelligence"><span>Agent-ready UI</span><h3>What a complete component handoff includes</h3><p>See the previews, reasoning, states and source files that make a result usable.</p><i aria-hidden="true">↗</i></Link>
                <Link href="/#docs"><span>MCP workflow</span><h3>Connect design context to the coding agent</h3><p>Make interface knowledge available inside the build loop instead of another tab.</p><i aria-hidden="true">↗</i></Link>
              </div>
            </section>

            <section className="guide-sources" aria-labelledby="sources-title">
              <p className="guide-section-label">Primary references</p>
              <h2 id="sources-title">Further reading from Anthropic</h2>
              <div>
                <a href="https://claude.com/blog/improving-frontend-design-through-skills"><span>01</span><p>Improving frontend design through Skills</p><i aria-hidden="true">↗</i></a>
                <a href="https://code.claude.com/docs/en/best-practices"><span>02</span><p>Best practices for Claude Code</p><i aria-hidden="true">↗</i></a>
                <a href="https://code.claude.com/docs/en/memory"><span>03</span><p>How Claude remembers your project</p><i aria-hidden="true">↗</i></a>
                <a href="https://code.claude.com/docs/en/chrome"><span>04</span><p>Use Claude Code with Chrome</p><i aria-hidden="true">↗</i></a>
                <a href="https://code.claude.com/docs/en/features-overview"><span>05</span><p>Extend Claude Code</p><i aria-hidden="true">↗</i></a>
              </div>
            </section>
          </div>
        </div>

        <section className="guide-final-cta grid-field">
          <div>
            <p className="eyebrow">Better inputs. Better interfaces.</p>
            <h2>Give your agent<br />something worth building with.</h2>
            <p>Rendyn helps coding agents find polished, product-ready components with visual context, fit reasoning and complete source.</p>
            <Link className="button" href="/#catalogue">Browse the component catalogue <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
