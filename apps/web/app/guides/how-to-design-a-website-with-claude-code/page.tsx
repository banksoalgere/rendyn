import { GuideHeading } from '../../components/guide-heading';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PromptCopy } from './prompt-copy';

const title = 'How to Design a Website With Claude Code | Rendyn';
const description =
  'A practical Claude Code website design workflow for planning, building, testing and refining a distinctive, production-ready frontend.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/guides/how-to-design-a-website-with-claude-code' },
  authors: [{ name: 'Rendyn Editorial' }],
  category: 'AI interface design',
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    type: 'article',
    url: '/guides/how-to-design-a-website-with-claude-code',
    siteName: 'Rendyn',
    publishedTime: '2026-08-29T00:00:00+01:00',
    modifiedTime: '2026-08-29T00:00:00+01:00',
    authors: ['Rendyn Editorial'],
  },
  twitter: { card: 'summary', title, description },
};

const contents = [
  ['quick-answer', 'The short answer'],
  ['what-claude-code-does', 'What Claude Code does'],
  ['workflow', 'The 7-step workflow'],
  ['prompt-template', 'Prompt template'],
  ['distinctive-frontend', 'Make it distinctive'],
  ['failure-modes', 'Common failure modes'],
  ['checklist', 'Launch checklist'],
  ['faqs', 'FAQs'],
];

const workflowSteps = [
  {
    number: '01',
    id: 'audit',
    title: 'Start with the repository, not the prompt',
    body: (
      <>
        <p>
          Open Claude Code in the project directory and ask it to inspect before it edits. It
          should find the routing model, package scripts, global styles, design tokens, shared
          components, content patterns and any project instructions. On an existing website,
          this audit is what stops a new page from becoming a visually unrelated mini-site.
        </p>
        <div className="article-command"><span aria-hidden="true">›</span><code>Inspect this repo. Identify the page architecture, shared UI primitives, styling system and relevant verification commands. Do not edit yet.</code></div>
        <p>
          Put durable team conventions in <code>CLAUDE.md</code>. Anthropic recommends concise,
          specific project instructions; they can include build commands, architecture decisions,
          naming rules and expected checks. Keep visual direction for this page in the task brief,
          where it can be concrete and easy to revise.
        </p>
      </>
    ),
  },
  {
    number: '02',
    id: 'brief',
    title: 'Write a design brief with a point of view',
    body: (
      <>
        <p>
          “Make it modern” is not a direction. Give Claude the same decisions a good designer
          would establish before opening a canvas: audience, job to be done, primary action,
          information hierarchy, tone, reference principles, assets, constraints and what to avoid.
        </p>
        <div className="brief-grid" aria-label="The six parts of a useful website design brief">
          <div><span>01</span><strong>Audience</strong><p>Who arrives, and what do they already know?</p></div>
          <div><span>02</span><strong>Outcome</strong><p>What single action should the page make easier?</p></div>
          <div><span>03</span><strong>Hierarchy</strong><p>What must be understood in the first ten seconds?</p></div>
          <div><span>04</span><strong>Character</strong><p>Use precise adjectives and name the tension.</p></div>
          <div><span>05</span><strong>References</strong><p>Say which principles to borrow and which to ignore.</p></div>
          <div><span>06</span><strong>Boundaries</strong><p>Stack, accessibility, performance and content limits.</p></div>
        </div>
      </>
    ),
  },
  {
    number: '03',
    id: 'references',
    title: 'Give Claude visual evidence',
    body: (
      <>
        <p>
          Supply screenshots, local image paths or URLs when words would leave too much room for
          interpretation. Claude Code can analyse images you drag in, paste, or reference by path.
          Annotate what matters: “use the editorial spacing and framed content treatment,” not
          “copy this page.” That distinction produces an original system instead of a lookalike.
        </p>
        <aside className="article-note">
          <span>Reference rule</span>
          <p>Separate structure, rhythm, type scale, colour, imagery and interaction. Name the two or three qualities you want from each reference.</p>
        </aside>
      </>
    ),
  },
  {
    number: '04',
    id: 'system',
    title: 'Turn the direction into a small design system',
    body: (
      <>
        <p>
          Ask for a compact system before dozens of components: type roles, spacing rhythm,
          surface colours, borders, radii, buttons, links, focus treatment and motion rules. On an
          existing product, Claude should extend the current tokens rather than create a parallel
          palette. On a new build, it should encode the choices as variables or theme tokens so the
          page remains coherent when content changes.
        </p>
        <div className="token-strip" aria-label="Example website design tokens">
          <div><i className="token-swatch token-swatch--ink" /><span>Ink</span><code>#171716</code></div>
          <div><i className="token-swatch token-swatch--paper" /><span>Paper</span><code>#FBFAF7</code></div>
          <div><i className="token-swatch token-swatch--signal" /><span>Signal</span><code>#FFCF4A</code></div>
          <div><i className="token-type">Aa</i><span>Display</span><code>0.92 line</code></div>
        </div>
      </>
    ),
  },
  {
    number: '05',
    id: 'implementation',
    title: 'Implement the smallest recognisable slice',
    body: (
      <>
        <p>
          Build the route, metadata, header and first meaningful viewport first. Run the real app
          and confirm that this slice compiles before expanding into every section. This catches a
          wrong route, incompatible dependency or broken layout decision while the change is still
          cheap to correct.
        </p>
        <p>
          Then complete the page in one coherent pass. Reuse primitives; keep functions small;
          favour semantic HTML and CSS over new client state; and add a dependency only when the
          design genuinely needs it. A polished Claude Code website usually comes from stronger
          decisions and tighter feedback, not a larger package list.
        </p>
      </>
    ),
  },
  {
    number: '06',
    id: 'browser-loop',
    title: 'Give the frontend a visual feedback loop',
    body: (
      <>
        <p>
          A build passing is not visual proof. Ask Claude to open the exact route and inspect the
          rendered page at desktop and mobile widths. It should use the page like a visitor: follow
          navigation, trigger controls, tab through interactive elements and read the browser
          console. <a href="https://code.claude.com/docs/en/best-practices">Anthropic calls verification the highest-leverage way</a> to improve Claude Code’s
          work, and its browser integrations are designed for this build–inspect–fix loop.
        </p>
        <ol className="verification-list">
          <li><span>Render</span><p>Open the exact local route, not a static screenshot or different environment.</p></li>
          <li><span>Compare</span><p>Check hierarchy, spacing, wrapping, density and reference principles.</p></li>
          <li><span>Operate</span><p>Use links and controls with mouse, keyboard and touch-sized viewports.</p></li>
          <li><span>Inspect</span><p>Review console errors, obvious failed requests and layout overflow.</p></li>
          <li><span>Correct</span><p>Fix material differences, then repeat the same checks.</p></li>
        </ol>
      </>
    ),
  },
  {
    number: '07',
    id: 'finish',
    title: 'Finish like an engineer, edit like a designer',
    body: (
      <>
        <p>
          Once the whole page works, make a final pass for both disciplines. Engineering checks
          cover semantic structure, metadata, responsive behaviour, keyboard access, reduced
          motion, performance and tests. Editorial checks remove repetition, sharpen headings,
          shorten line lengths and make every call to action earn its place.
        </p>
        <p>
          Finally, inspect the diff. Claude Code can change files, run commands and use Git, but
          you still decide what is correct, what is in scope and what ships. Keep permissions
          narrow, review unfamiliar commands and never treat a plausible preview as proof that the
          implementation is safe or complete.
        </p>
      </>
    ),
  },
];

export default function ClaudeCodeWebsiteDesignGuide() {
  return (
    <div className="article-page" id="top">

      <main>
        <article>
        <header className="article-hero grid-field guide-hero-container">
          <GuideHeading slug="how-to-design-a-website-with-claude-code" id="guide-title" />

          <div className="article-hero-frame guide-example">
            <div className="article-workspace" aria-hidden="true">
              <div className="workspace-bar">
                <div aria-hidden="true"><i /><i /><i /></div>
                <span>localhost:3000 / studio</span>
                <b>Preview</b>
              </div>
              <div className="workspace-canvas">
                <div className="workspace-brief">
                  <div className="brief-head"><span>Creative brief</span><i>01 / 04</i></div>
                  <strong className="workspace-brief-title">Quiet confidence.<br />Useful motion.</strong>
                  <p>Editorial structure for a product that helps creative teams make stronger interface decisions.</p>
                  <div className="brief-tags"><span>Precise</span><span>Warm</span><span>Technical</span></div>
                  <div className="brief-rule"><span>Memorable move</span><p>Frame the working product like a page being art-directed.</p></div>
                </div>
                <div className="workspace-preview" aria-hidden="true">
                  <div className="preview-nav"><b>Northstar</b><span>Work</span><span>Method</span><i>Start a project ↗</i></div>
                  <div className="preview-copy"><small>Independent design studio</small><strong>Make the useful<br />feel inevitable.</strong><p>Strategy, product design and frontend systems for teams building the next important thing.</p><i>Explore selected work ↓</i></div>
                  <div className="preview-panels"><span /><span /><span /></div>
                </div>
              </div>
              <div className="workspace-status"><span><i /> Browser checked</span><span>1440</span><span>768</span><span>390</span></div>
            </div>
            <aside className="article-hero-cta">
              <span className="brand-mark" aria-hidden="true">R</span>
              <p className="article-cta-title">Give Claude Code better building blocks.</p>
              <p>Search polished components by product intent, compare visual options, then get the complete source.</p>
              <Link className="button" href="/pricing">Start Rendyn trial <span aria-hidden="true">↗</span></Link>
              <Link href="/components">Browse the component catalogue <span aria-hidden="true">→</span></Link>
            </aside>
          </div>
        </header>

        <div className="article-shell guide-reading-layout">
          <div className="article-content guide-reading-body">
            <details className="mobile-toc">
              <summary>On this page</summary>
              <nav aria-label="On this page">
                {contents.map(([id, label]) => <Link href={`#${id}`} key={id}>{label}</Link>)}
              </nav>
            </details>

            <section className="article-section article-intro" id="quick-answer">
              <p className="article-kicker">The short answer</p>
              <h2>Yes—Claude Code can build a website. The quality comes from the system around it.</h2>
              <p className="article-lede">
                A strong <strong>Claude Code website design</strong> workflow looks less like asking
                for a finished page in one sentence and more like directing a small product team.
                Give it the real repository, a specific brief, visual references, existing design
                constraints and an objective way to inspect the result. Then make it implement,
                render, compare and refine.
              </p>
              <div className="answer-grid">
                <div><span>Best input</span><strong>A precise creative brief</strong><p>Audience, outcome, hierarchy, art direction, references and constraints.</p></div>
                <div><span>Best process</span><strong>Build in visible stages</strong><p>Audit, system, first viewport, complete page, then browser review.</p></div>
                <div><span>Best safeguard</span><strong>Evidence, not confidence</strong><p>Run the app, use the interface, check errors and review the final diff.</p></div>
              </div>
            </section>

            <section className="article-section" id="what-claude-code-does">
              <p className="article-kicker">Know the tool</p>
              <h2>What Claude Code actually does for website design</h2>
              <p>
                Claude Code is an agentic coding tool, not a drag-and-drop canvas. In{' '}
                <a href="https://code.claude.com/docs/en/how-claude-code-works">Anthropic’s description</a>,
                it gathers context, takes action and verifies results using tools. It
                can read and edit files, search a codebase, run build commands and tests, use Git,
                fetch documentation and work across the connected project. That makes it useful for
                both a new <strong>Claude Code website</strong> and a new route inside a mature frontend.
              </p>
              <p>
                It can also <a href="https://code.claude.com/docs/en/tutorials">analyse screenshots and other images</a> supplied in the conversation. When
                connected to <a href="https://code.claude.com/docs/en/chrome">Chrome</a>, it can open
                the app, inspect the DOM, click controls and check console output. Those capabilities close a crucial
                gap: source code can be valid while the page is visually wrong.
              </p>
              <div className="capability-table" role="region" aria-label="What Claude Code can do and what still needs human judgment" tabIndex={0}>
                <table>
                  <thead><tr><th>Claude Code is strong at</th><th>You still need to decide</th></tr></thead>
                  <tbody>
                    <tr><td>Understanding an existing frontend architecture</td><td>What the product should say and feel like</td></tr>
                    <tr><td>Implementing coordinated component and style changes</td><td>Which creative direction is worth pursuing</td></tr>
                    <tr><td>Applying semantic, responsive and accessible patterns</td><td>Whether the rendered experience serves real users</td></tr>
                    <tr><td>Running repeatable technical and browser checks</td><td>What level of risk is acceptable before shipping</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                Claude Code becomes more useful when the environment is legible. A focused
                <a href="https://code.claude.com/docs/en/memory"><code>CLAUDE.md</code></a> can preserve team conventions;{' '}
                <a href="https://code.claude.com/docs/en/permissions">fine-grained permissions</a> can
                control its tools; skills can add repeatable workflows; and{' '}
                <a href="https://code.claude.com/docs/en/mcp">MCP can connect external tools or data</a>.
                Use those extensions to make a real constraint easier to follow—not
                to compensate for a vague product decision.
              </p>
            </section>

            <section className="article-section" id="workflow">
              <p className="article-kicker">From idea to browser</p>
              <h2>A seven-step Claude Code website design workflow</h2>
              <p>
                This sequence works for React, Next.js and other modern stacks because it is based on
                decision quality and feedback, not framework-specific prompt tricks.
              </p>
              <div className="workflow-article-list">
                {workflowSteps.map((step) => (
                  <section className="workflow-article-step" id={step.id} key={step.number}>
                    <div className="workflow-step-heading"><span>{step.number}</span><h3>{step.title}</h3></div>
                    <div className="workflow-step-body">{step.body}</div>
                  </section>
                ))}
              </div>
            </section>

            <section className="article-section" id="prompt-template">
              <p className="article-kicker">Use this as a starting point</p>
              <h2>A better Claude Code website prompt</h2>
              <p>
                Replace every bracketed field. The prompt deliberately asks for inspection and
                verification; remove constraints that do not apply, but do not replace concrete
                details with broad praise words.
              </p>
              <PromptCopy />
              <p className="prompt-aftercare">
                Follow the first pass with observations, not vibes: “The mobile H1 wraps to six
                lines and hides the primary action” is actionable. “Make it pop” is not.
              </p>
            </section>

            <section className="article-section" id="distinctive-frontend">
              <p className="article-kicker">Raise the quality ceiling</p>
              <h2>How to make a Claude Code frontend feel distinctive</h2>
              <p>
                Generic output is usually a generic-decision problem. Claude can generate elaborate
                CSS, but complexity is not character. The goal is a small number of intentional
                choices that reinforce the product.
              </p>
              <div className="distinction-list">
                <div><span>01</span><div><h3>Choose a tension, not a trend</h3><p>“Editorial restraint with utilitarian product details” gives the page something to resolve. “Clean SaaS” does not.</p></div></div>
                <div><span>02</span><div><h3>Give typography jobs</h3><p>Define display, body, label and code roles. Tune line length, leading and weight before adding decoration.</p></div></div>
                <div><span>03</span><div><h3>Design the content rhythm</h3><p>Alternate argument, evidence, visual explanation and action. A page made only of similarly sized cards has no editorial pace.</p></div></div>
                <div><span>04</span><div><h3>Use one memorable move</h3><p>A framed workspace, a precise transition or an asymmetric composition is more credible than effects on every element.</p></div></div>
                <div><span>05</span><div><h3>Specify the anti-brief</h3><p>Name the patterns that would betray the product: default gradients, vague icon grids, excessive pills or motion without meaning.</p></div></div>
              </div>
              <div className="rendyn-callout">
                <div>
                  <span className="article-kicker">Where Rendyn helps</span>
                  <h3>Move from “invent a component” to “choose the right component.”</h3>
                  <p>Rendyn lets coding agents search by product intent, inspect visual options and receive the source, states, dependencies and install steps for the selected component.</p>
                </div>
                <div className="callout-stack" aria-hidden="true">
                  <div><span>01</span><strong>Search by intent</strong><i>“A high-trust approval step”</i></div>
                  <div><span>02</span><strong>Compare the fit</strong><i>Ranked visual options</i></div>
                  <div><span>03</span><strong>Keep the code</strong><i>Complete editable source</i></div>
                </div>
                <Link className="button" href="/components">Explore Rendyn components <span aria-hidden="true">→</span></Link>
              </div>
            </section>

            <section className="article-section" id="failure-modes">
              <p className="article-kicker">Debug the process</p>
              <h2>Five common Claude Code frontend failure modes</h2>
              <div className="failure-list">
                <div><span>01</span><div><h3>The page looks generic</h3><p><strong>Cause:</strong> the brief describes quality but not character. <strong>Fix:</strong> define a visual tension, hierarchy, memorable move and anti-brief before asking for more polish.</p></div></div>
                <div><span>02</span><div><h3>It ignores the existing product</h3><p><strong>Cause:</strong> implementation started before repository inspection. <strong>Fix:</strong> ask Claude to identify the route, primitives, tokens and nearby page conventions first.</p></div></div>
                <div><span>03</span><div><h3>Desktop works; mobile collapses</h3><p><strong>Cause:</strong> responsive behaviour was implied rather than verified. <strong>Fix:</strong> name target widths and require browser checks for wrapping, overflow, tap targets and sticky elements.</p></div></div>
                <div><span>04</span><div><h3>The redesign breaks behaviour</h3><p><strong>Cause:</strong> visual change and functional rewrite were mixed together. <strong>Fix:</strong> preserve existing state and data flow, scope the visual change, and test the interactions that were touched.</p></div></div>
                <div><span>05</span><div><h3>The code passes, but the page still feels wrong</h3><p><strong>Cause:</strong> technical validation was mistaken for visual validation. <strong>Fix:</strong> inspect the rendered route, compare it with the brief and references, then iterate on the material differences.</p></div></div>
              </div>
            </section>

            <section className="article-section" id="checklist">
              <p className="article-kicker">Before you call it finished</p>
              <h2>Claude Code website launch checklist</h2>
              <div className="launch-checklist">
                <div><span>Strategy</span><ul><li>One audience and one primary page outcome</li><li>A named creative direction and anti-brief</li><li>Reference principles documented without copying</li></ul></div>
                <div><span>Structure</span><ul><li>Correct route and one clear H1</li><li>Semantic heading order and landmarks</li><li>Useful title, description and internal links</li></ul></div>
                <div><span>Interface</span><ul><li>Existing primitives and tokens reused</li><li>Keyboard focus and touch targets checked</li><li>Reduced-motion behaviour respected</li></ul></div>
                <div><span>Evidence</span><ul><li>Desktop and mobile routes used in a browser</li><li>Links and interactive states exercised</li><li>Console, failed requests, diff and build reviewed</li></ul></div>
              </div>
            </section>

            <section className="article-section" id="faqs">
              <p className="article-kicker">Frequently asked questions</p>
              <h2>Claude Code website design FAQs</h2>
              <div className="article-faqs">
                <details><summary>Can Claude Code build a complete website?</summary><p>Yes. It can create and edit the project files, run the development server, execute tests and inspect a rendered site through supported browser integrations. “Complete” still requires you to define the product, review the code, validate real behaviour and choose when to deploy.</p></details>
                <details><summary>Is Claude Code good for frontend design?</summary><p>It is strong at turning a clear direction into working frontend code and iterating across a repository. Its output improves materially when you provide visual evidence, existing design constraints and a browser feedback loop. It does not replace product judgment or user research.</p></details>
                <details><summary>Can Claude Code work from a screenshot?</summary><p>Yes. Anthropic documents support for images supplied by drag-and-drop, paste or file path. Explain which qualities to use, provide the surrounding product context, and ask for an original implementation rather than a direct copy.</p></details>
                <details><summary>Do I need to know how to code?</summary><p>You can get a first website running without writing every line yourself, but production work still benefits from someone who can review architecture, security, accessibility and deployment. Use narrow permissions, keep the project under version control and verify every consequential change.</p></details>
                <details><summary>How is Claude Code different from a visual website builder?</summary><p>Claude Code works directly with source files, terminal tools and the project’s existing stack. That makes the result portable and editable, but it also means the quality and safety of the repository remain your responsibility.</p></details>
                <details><summary>Can I use MCP for website design?</summary><p>Yes. Claude Code supports MCP connections to external tools and services. A design-oriented MCP server can give the agent structured access to component options, reference data or other workflows. Review each server’s scope and approve project configurations deliberately.</p></details>
              </div>
            </section>

            <section className="article-section article-sources" aria-labelledby="sources-heading">
              <p className="article-kicker">Primary references</p>
              <h2 id="sources-heading">Sources and further reading</h2>
              <p>Product capabilities and workflow recommendations in this guide were checked against Anthropic’s current documentation and official repository on August 29, 2026.</p>
              <ul>
                <li><a href="https://code.claude.com/docs/en/how-claude-code-works">How Claude Code works <span aria-hidden="true">↗</span></a></li>
                <li><a href="https://code.claude.com/docs/en/best-practices">Best practices for Claude Code <span aria-hidden="true">↗</span></a></li>
                <li><a href="https://code.claude.com/docs/en/tutorials">Common workflows, including working with images <span aria-hidden="true">↗</span></a></li>
                <li><a href="https://code.claude.com/docs/en/chrome">Use Claude Code with Chrome <span aria-hidden="true">↗</span></a></li>
                <li><a href="https://code.claude.com/docs/en/memory">How Claude remembers your project <span aria-hidden="true">↗</span></a></li>
                <li><a href="https://code.claude.com/docs/en/permissions">Claude Code permissions <span aria-hidden="true">↗</span></a></li>
                <li><a href="https://code.claude.com/docs/en/mcp">Connect Claude Code to tools with MCP <span aria-hidden="true">↗</span></a></li>
                <li><a href="https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design">Anthropic’s frontend design plugin source <span aria-hidden="true">↗</span></a></li>
              </ul>
            </section>
          </div>

          <aside className="article-sidebar guide-reading-sidebar">
            <nav aria-label="On this page">
              <span>On this page</span>
              {contents.map(([id, label]) => <Link href={`#${id}`} key={id}>{label}</Link>)}
            </nav>
            <div className="sidebar-cta guide-callout">
              <span className="brand-mark" aria-hidden="true">R</span>
              <p className="sidebar-cta-title">Better choices in, better interfaces out.</p>
              <p>Give your coding agent polished component options and complete code.</p>
              <Link className="button" href="/pricing">Start 7-day trial <span aria-hidden="true">↗</span></Link>
            </div>
          </aside>
        </div>

        <section className="article-bottom-cta grid-field">
          <div>
            <p className="eyebrow">Your next Claude Code frontend</p>
            <h2>Start with better<br />building blocks.</h2>
            <p>Search by product intent. Compare the strongest fits. Give your agent complete, editable interface source.</p>
            <div><Link className="button" href="/components">Browse components <span aria-hidden="true">→</span></Link><Link className="button button--ghost" href="/guides">Read more guides</Link></div>
          </div>
        </section>
        </article>
      </main>

    </div>
  );
}
