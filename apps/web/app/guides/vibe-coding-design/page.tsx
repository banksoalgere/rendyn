/* eslint-disable @next/next/no-html-link-for-pages -- Vinext can hydrate next/link from a second React context; native anchors avoid that runtime failure. */
import type { Metadata } from 'next';
import './page.css';
import { Brand } from '../../components/brand';
import { SiteFooter } from '../../components/site-footer';
import { CopyPromptButton } from './copy-prompt-button';

export const metadata: Metadata = {
  title: 'Vibe Coding Design: How to Make Your App Look Good',
  description: 'A practical vibe coding design workflow for stronger hierarchy, typography, prompts, accessibility and a polished vibe coding UI.',
  alternates: { canonical: '/guides/vibe-coding-design' },
  authors: [{ name: 'Rendyn Editorial' }],
  openGraph: {
    title: 'Vibe Coding Design: How to Make Your App Look Good',
    description: 'Turn a functional AI-built app into a clear, coherent and polished product with this practical design workflow.',
    url: '/guides/vibe-coding-design',
    type: 'article',
    publishedTime: '2026-08-29T00:00:00+01:00',
    modifiedTime: '2026-08-29T00:00:00+01:00',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary',
    title: 'Vibe Coding Design: How to Make Your App Look Good',
    description: 'A practical workflow for making AI-built interfaces look intentional, accessible and complete.',
  },
};

const promptTemplate = `Act as a product designer working inside the existing codebase.

Goal
Improve the [SCREEN OR FLOW] for [PRIMARY USER] completing [PRIMARY TASK].

Preserve
- Existing behavior, data flow and validation
- Current component library and framework conventions
- Any working responsive and accessibility behavior

Design direction
- Tone: [3 SPECIFIC ADJECTIVES]
- Reference: [URL OR SCREENSHOT], used for hierarchy and rhythm—not copied branding
- Density: [COMPACT / BALANCED / RELAXED]
- One primary action per view

System constraints
- Reuse the current tokens; if missing, define a small type, space, colour and radius scale first
- Use real interface copy and realistic content lengths
- Include loading, empty, error, success, disabled, hover and focus states
- Support 360px mobile, tablet and desktop without horizontal overflow
- Respect reduced motion and visible keyboard focus

Before editing
1. Inspect the relevant routes, components and styles.
2. Identify the visual hierarchy and consistency problems.
3. Propose the smallest coherent set of changes.

After editing
Verify the primary flow in a real browser at mobile and desktop widths. Report what changed, what you tested and anything still uncertain.`;

const toc = [
  ['definition', 'What vibe coding design means'],
  ['why-generic', 'Why generated UI looks generic'],
  ['workflow', 'The seven-step workflow'],
  ['ui-system', 'The UI system to define'],
  ['repair', 'The 90-minute repair pass'],
  ['prompt', 'A better design prompt'],
  ['checklist', 'Quality checklist'],
  ['faq', 'Frequently asked questions'],
];

const workflowSteps = [
  {
    number: '01',
    title: 'Write the interface brief',
    body: 'Name the user, the moment they arrive, the job they need to finish and the one action that matters most. “Build a dashboard” is a feature list; “help a shop owner spot today’s late orders and resolve one” is a design brief.',
  },
  {
    number: '02',
    title: 'Collect references with a reason',
    body: 'Choose two or three references and annotate what you want from each: headline scale, information density, navigation model or motion restraint. Ask the agent to reuse the underlying principles, never the source’s identity or assets.',
  },
  {
    number: '03',
    title: 'Design one complete path',
    body: 'Start with the highest-value flow, not every route. Get the entry point, decision, action and confirmation right before generating a wider product. A coherent vertical slice gives later screens a pattern to follow.',
  },
  {
    number: '04',
    title: 'Turn choices into tokens',
    body: 'Define a short type scale, spacing scale, semantic colours, radii and surface rules. Put them in the repo. This converts taste from a one-off prompt into constraints the coding agent can reuse.',
  },
  {
    number: '05',
    title: 'Build with real content',
    body: 'Real names, labels, errors and long values expose layout decisions that placeholder copy hides. Prompt one component or section at a time, then inspect it in the full page before moving on.',
  },
  {
    number: '06',
    title: 'Add the missing states',
    body: 'Check loading, empty, error, success, disabled, hover and focus states. Then test short and long content, keyboard navigation, zoom and narrow screens. Finished UI is mostly what happens between ideal screenshots.',
  },
  {
    number: '07',
    title: 'Run a visual critique loop',
    body: 'Take a screenshot at a defined width. Ask what competes for attention, what feels inconsistent and what can be removed. Change one layer at a time—hierarchy, spacing, colour, then polish—and compare again.',
  },
];

const systemDecisions = [
  ['Hierarchy', 'Give every screen one obvious starting point, one primary action and a clear reading order. Size and placement should do more work than decoration.'],
  ['Typography', 'Use one interface family, a deliberate scale and comfortable line length. Reserve display sizes for true landmarks and keep body text calm.'],
  ['Colour', 'Choose neutrals first, then one accent and semantic feedback colours. A palette is not a rainbow; every colour needs a job.'],
  ['Spacing', 'Use a small repeatable scale. Keep related items close, separate different ideas generously and align edges before adding borders.'],
  ['Components', 'Reuse button, input, card and navigation primitives. Variants should communicate meaning, not become an excuse for a new style on every screen.'],
  ['Motion', 'Animate changes that help users understand cause and effect. Keep it brief, avoid layout shifts and provide a reduced-motion path.'],
];

const repairSteps = [
  ['0–10 min', 'Delete noise', 'Remove duplicate headings, ornamental gradients, unnecessary cards, excess badges and secondary actions that compete with the main task.'],
  ['10–25 min', 'Fix hierarchy', 'Choose one H1, one primary action and a clear content order. De-emphasise everything else with size, weight and tone.'],
  ['25–40 min', 'Normalise the system', 'Collapse near-duplicate colours, gaps, radii and shadows into a short token set. Standardise buttons, fields and surface treatments.'],
  ['40–55 min', 'Repair typography', 'Set a readable body size and line height, shorten line lengths and reduce the number of text styles. Use weight before adding more colour.'],
  ['55–70 min', 'Design the states', 'Add useful empty, loading, error and success states. Make labels, validation and disabled controls unambiguous.'],
  ['70–90 min', 'Verify reality', 'Use the primary flow at phone and desktop widths with realistic data. Check keyboard focus, zoom, overflow, console errors and slow-loading content.'],
];

const checklistGroups = [
  {
    title: 'Clarity',
    items: [
      'The screen has one obvious primary task.',
      'The first heading explains the user outcome.',
      'Primary and secondary actions are visually distinct.',
      'Real content still scans when values are long.',
    ],
  },
  {
    title: 'Consistency',
    items: [
      'Type, colour, spacing and radius values come from a small system.',
      'Equivalent components look and behave the same.',
      'Icons share one visual language and have accessible labels where needed.',
      'The mobile layout feels designed, not merely stacked.',
    ],
  },
  {
    title: 'Completeness',
    items: [
      'Loading, empty, error, success and disabled states are covered.',
      'Keyboard focus is visible and the reading order is logical.',
      'Motion explains change and respects reduced-motion preferences.',
      'The main flow works without console errors or obvious layout shifts.',
    ],
  },
];

export default function VibeCodingDesignPage() {
  return (
    <main className="vcd-page" id="top">
      <header className="vcd-header">
        <div className="vcd-header-inner">
          <Brand href="/" />
          <nav className="vcd-nav" aria-label="Guide navigation">
            <a href="#workflow">Workflow</a>
            <a href="#ui-system">UI system</a>
            <a href="#checklist">Checklist</a>
          </nav>
          <a className="button button--small" href="/#catalogue">Browse components <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <article className="vcd-document">
        <section className="vcd-hero grid-field" aria-labelledby="vcd-title">
        <div className="vcd-hero-copy">
          <nav className="vcd-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Rendyn</a><span aria-hidden="true">/</span><a href="/#resources">Resources</a><span aria-hidden="true">/</span><span>Vibe coding design</span>
          </nav>
          <p className="vcd-category"><span aria-hidden="true">✦</span> Vibe coding design</p>
          <h1 id="vcd-title">Vibe Coding Design:<br /><span>How to Make Your App Look Good</span></h1>
          <p className="vcd-deck">A practical system for turning a functional AI-built interface into a product that feels clear, coherent and finished—without throwing away working code.</p>
          <div className="vcd-byline">
            <span className="vcd-author-mark" aria-hidden="true">R</span>
            <span><strong>Rendyn Editorial</strong><time dateTime="2026-08-29">Updated 29 August 2026</time></span>
            <span className="vcd-byline-divider" aria-hidden="true" />
            <span className="vcd-read-time">12 min read</span>
          </div>
        </div>

        <div className="vcd-hero-frame">
          <figure className="vcd-comparison-stage" aria-label="A generic dashboard compared with a more intentional interface">
            <div className="vcd-window-bar" aria-hidden="true">
              <div><i /><i /><i /></div>
              <span>design-pass.fig</span>
              <small>100%</small>
            </div>
            <div className="vcd-comparison-grid">
              <div className="vcd-ui-panel vcd-ui-panel--before">
                <div className="vcd-ui-label"><span>Before</span><small>Default output</small></div>
                <div className="vcd-faux-nav"><i /><span /><span /><span /></div>
                <div className="vcd-faux-heading"><strong>Your Dashboard</strong><span /></div>
                <div className="vcd-faux-cards"><i /><i /><i /></div>
                <div className="vcd-faux-table"><span /><span /><span /><span /></div>
              </div>
              <div className="vcd-ui-panel vcd-ui-panel--after">
                <div className="vcd-ui-label"><span>After</span><small>Directed system</small></div>
                <div className="vcd-faux-nav"><i /><span /><span /><b /></div>
                <div className="vcd-faux-heading"><small>Friday, 29 August</small><strong>Three orders need you.</strong><span /></div>
                <div className="vcd-action-row"><b>Review late orders</b><span>View all</span></div>
                <div className="vcd-order-list"><i /><i /><i /></div>
              </div>
            </div>
            <figcaption className="vcd-stage-caption"><span>Same product</span><i aria-hidden="true">→</i><strong>Better decisions</strong></figcaption>
          </figure>

          <aside className="vcd-hero-card">
            <span className="vcd-hero-card-mark" aria-hidden="true">90</span>
            <p className="eyebrow">The fast rescue</p>
            <h2>A focused design pass beats another full rewrite.</h2>
            <p>Fix hierarchy first. Then normalise the system, design the missing states and verify the real flow.</p>
            <a href="#repair">Start the 90-minute pass <span aria-hidden="true">↓</span></a>
          </aside>
        </div>
        </section>

        <div className="vcd-content-shell">
        <aside className="vcd-sidebar" aria-label="On this page">
          <div className="vcd-sidebar-sticky">
            <p>In this guide</p>
            <ol>
              {toc.map(([href, label], index) => (
                <li key={href}><a href={`#${href}`}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a></li>
              ))}
            </ol>
            <div className="vcd-sidebar-cta">
              <span aria-hidden="true">R</span>
              <strong>Give your agent better visual choices.</strong>
              <p>Search polished components with previews, context and complete code.</p>
              <a href="/#catalogue">Explore Rendyn <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </aside>

        <div className="vcd-article">
          <section id="definition">
            <p className="vcd-lede">The fastest way to make a vibe coded app look better is not to ask for more polish. It is to give the agent fewer arbitrary choices and a clearer product problem.</p>
            <p>Vibe coding can get a working screen in front of you remarkably quickly. The visual quality often stalls because the initial request describes features but leaves hierarchy, tone, spacing, content and states undefined. The model fills those gaps with plausible defaults. The result works, yet it feels interchangeable.</p>
            <p><strong>Vibe coding design</strong> is the practice of directing those visual and interaction decisions with the same care you give the feature itself. You remain the creative director: you define intent, supply references, constrain the system, review the rendered result and keep iterating until the interface communicates clearly.</p>

            <div className="vcd-summary-card">
              <div>
                <span>Quick answer</span>
                <h2>How to make a vibe coded app look better</h2>
              </div>
              <ol>
                <li>Define the user, task and single primary action.</li>
                <li>Use references for hierarchy and rhythm, not imitation.</li>
                <li>Set a small design system before styling every screen.</li>
                <li>Prompt with real content, constraints and required states.</li>
                <li>Test the real flow at mobile and desktop widths.</li>
              </ol>
            </div>
          </section>

          <section id="why-generic">
            <p className="vcd-section-label">Diagnose the output</p>
            <h2>Why vibe coding UI often looks generic</h2>
            <p>Generated interfaces are usually not ugly because the model lacks CSS. They look generic because the product has not made enough decisions. When “modern and clean” is the entire direction, familiar patterns become the safest answer: a large gradient headline, a grid of equal cards, rounded containers around everything and an accent colour doing too many jobs.</p>

            <div className="vcd-diagnosis-grid">
              <div><span>01</span><h3>Everything has equal weight</h3><p>Cards, headings and buttons compete because the agent knows what exists, but not what matters most.</p></div>
              <div><span>02</span><h3>Every value is invented locally</h3><p>Near-duplicate gaps, greys, radii and shadows accumulate when no shared token system constrains them.</p></div>
              <div><span>03</span><h3>The happy path is the whole design</h3><p>The polished screenshot hides empty tables, long names, errors, loading delays and narrow screens.</p></div>
              <div><span>04</span><h3>Decoration arrives before structure</h3><p>Gradients and motion cannot rescue unclear navigation, weak copy or an action buried below secondary content.</p></div>
            </div>

            <blockquote>
              <span aria-hidden="true">“</span>
              <p>Do not prompt for beauty as an extra layer. Describe the decisions that would make the interface useful, recognisable and calm.</p>
            </blockquote>
          </section>

          <section id="workflow">
            <p className="vcd-section-label">The repeatable method</p>
            <h2>A seven-step vibe coding design workflow</h2>
            <p>The tools change quickly, but the effective loop is stable: plan, provide context, build a focused slice, inspect the rendered interface and give precise feedback. Current guidance from <a href="https://docs.replit.com/learn/build-with-agent" target="_blank" rel="noopener noreferrer">Replit</a> explicitly recommends plans, screenshots or sketches, review and testing; <a href="https://docs.lovable.dev/prompting/prompting-one" target="_blank" rel="noopener noreferrer">Lovable</a> similarly recommends real content and component-level prompting.</p>

            <div className="vcd-workflow-list">
              {workflowSteps.map((step) => (
                <section key={step.number}>
                  <span>{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.body}</p></div>
                </section>
              ))}
            </div>
          </section>

          <section id="ui-system">
            <p className="vcd-section-label">Constrain the choices</p>
            <h2>The six decisions that make a UI feel designed</h2>
            <p>A lightweight system is more valuable than a long style prompt. Put durable rules in the repository so the agent sees them on the next task. Many coding tools support project instructions; for example, <a href="https://docs.github.com/en/copilot/concepts/prompting/response-customization" target="_blank" rel="noopener noreferrer">GitHub documents repository and path-specific custom instructions</a>.</p>

            <div className="vcd-system-grid">
              {systemDecisions.map(([title, description], index) => (
                <section key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </section>
              ))}
            </div>

            <div className="vcd-token-strip" aria-label="An example compact token system">
              <div><span>TYPE</span><strong>48 / 32 / 20 / 16 / 14</strong></div>
              <div><span>SPACE</span><strong>4 / 8 / 12 / 16 / 24 / 40 / 64</strong></div>
              <div><span>RADIUS</span><strong>6 / 10 / 16 / pill</strong></div>
              <div className="vcd-swatches"><span>COLOUR</span><i /><i /><i /><i /></div>
            </div>

            <aside className="vcd-product-demo" aria-label="Rendyn component search example">
              <div className="vcd-product-preview" aria-hidden="true">
                <div><span>R</span><p>Search components</p><kbd>⌘ K</kbd></div>
                <small>Intent: make a status change clear without blocking the flow</small>
                <section><i>01</i><p><strong>Animated badge</strong><span>Compact status · motion</span></p><b>94%</b></section>
                <section><i>02</i><p><strong>Notification stack</strong><span>Async feedback · queue</span></p><b>88%</b></section>
                <section><i>03</i><p><strong>Stateful button</strong><span>Direct action · progress</span></p><b>84%</b></section>
              </div>
              <div>
                <p className="eyebrow">A practical shortcut</p>
                <h3>Let the agent compare real components before it invents another one.</h3>
                <p>Rendyn gives coding agents visual previews, product context and complete source files, so “find the right feedback pattern” becomes a concrete search instead of a vague styling request.</p>
                <a href="/#catalogue">Explore the component catalogue <span aria-hidden="true">↗</span></a>
              </div>
            </aside>
          </section>

          <section id="repair">
            <p className="vcd-section-label">Improve what already works</p>
            <h2>The 90-minute “make it look better” pass</h2>
            <p>Do not start by asking the agent to redesign the whole app. Protect the working behaviour and move from high-leverage structure to low-leverage polish. Stop after each pass and compare the same screens at the same widths.</p>

            <ol className="vcd-repair-list">
              {repairSteps.map(([time, title, description]) => (
                <li key={time}>
                  <span>{time}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>

            <div className="vcd-do-dont">
              <div className="vcd-do-dont--dont"><span>Weak feedback</span><p>“Make it more premium. Add some animations and improve the cards.”</p></div>
              <div className="vcd-do-dont--do"><span>Directed feedback</span><p>“The order list is the primary task. Remove the summary cards above it, reduce the header height and use one accent only for actions that resolve an order.”</p></div>
            </div>
          </section>

          <section id="prompt">
            <p className="vcd-section-label">Make the brief reusable</p>
            <h2>A better prompt for vibe coding UI</h2>
            <p>The useful prompt is not the longest one. It gives the agent product intent, visual direction, system constraints, scope boundaries and a definition of done. Replace the brackets, attach one or two annotated references and keep the request focused on a single flow.</p>

            <div className="vcd-prompt-card">
              <div className="vcd-prompt-toolbar">
                <div><span aria-hidden="true">✦</span><strong>UI direction prompt</strong></div>
                <CopyPromptButton text={promptTemplate} />
              </div>
              <pre><code>{promptTemplate}</code></pre>
            </div>

            <p className="vcd-note"><strong>Why this works:</strong> it tells the agent what success looks like and what must not regress. It also asks for inspection before editing and browser evidence afterwards, which keeps visual work connected to the actual product.</p>
          </section>

          <section id="checklist">
            <p className="vcd-section-label">Review the rendered product</p>
            <h2>The vibe coding design quality checklist</h2>
            <p>Use this after every substantial interface pass. Check the rendered app, not just the diff. The boxes are intentionally local to this page—refresh when you want a clean review.</p>

            <div className="vcd-checklist-grid">
              {checklistGroups.map((group, groupIndex) => (
                <fieldset key={group.title}>
                  <legend><span>{String(groupIndex + 1).padStart(2, '0')}</span>{group.title}</legend>
                  {group.items.map((item) => (
                    <label key={item}><input type="checkbox" /><span>{item}</span></label>
                  ))}
                </fieldset>
              ))}
            </div>

            <div className="vcd-standard-note">
              <span aria-hidden="true">AA</span>
              <div>
                <h3>Looking good includes working for more people.</h3>
                <p>Use semantic HTML, readable contrast, visible focus, useful labels and adequately sized targets. <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">WCAG 2.2</a> adds criteria including focus not obscured and minimum target size. Respect reduced motion, browser zoom and logical reading order.</p>
              </div>
            </div>

            <p>Performance is part of the visual experience too. A dramatic hero that appears late, a panel that shifts as data arrives or a control that responds slowly will feel unfinished. Measure the page in context; <a href="https://web.dev/performance" target="_blank" rel="noopener noreferrer">web.dev’s performance guidance</a> centres perceived load, layout stability and interaction responsiveness.</p>
          </section>

          <section id="faq">
            <p className="vcd-section-label">Common questions</p>
            <h2>Vibe coding design FAQ</h2>
            <div className="vcd-faq-list">
              <details>
                <summary>What is vibe coding design?<span aria-hidden="true">+</span></summary>
                <p>It is the visual and interaction-design layer of building software through conversation with an AI coding tool. You direct user goals, hierarchy, references, tokens, components and states, then judge the rendered product and iterate.</p>
              </details>
              <details>
                <summary>Do I need Figma before I vibe code an app?<span aria-hidden="true">+</span></summary>
                <p>No. A rough sketch, annotated screenshot or well-structured interface brief can be enough for an early product. Figma becomes useful when you need to explore several directions, align a team or specify complex flows before code changes.</p>
              </details>
              <details>
                <summary>Why does my AI-built app look like every other SaaS product?<span aria-hidden="true">+</span></summary>
                <p>Generic prompts produce safe, common patterns. Define a point of view through audience, tone, content, density, typography, colour and component rules. Then remove elements that do not help the primary task.</p>
              </details>
              <details>
                <summary>Should I redesign the whole app in one prompt?<span aria-hidden="true">+</span></summary>
                <p>Usually not. Start with the most important flow, preserve working behaviour and improve one design layer at a time. Smaller changes are easier to compare, verify and reverse.</p>
              </details>
              <details>
                <summary>What is the best way to make vibe coding UI consistent?<span aria-hidden="true">+</span></summary>
                <p>Use shared tokens and components, record durable rules in repository instructions and ask the agent to inspect existing primitives before creating new ones. Consistency comes from constrained choices, not from repeating “keep it consistent.”</p>
              </details>
            </div>
          </section>

          <section className="vcd-sources" aria-labelledby="sources-title">
            <p className="vcd-section-label">Further reading</p>
            <h2 id="sources-title">Primary sources behind the workflow</h2>
            <ul>
              <li><a href="https://docs.replit.com/learn/build-with-agent" target="_blank" rel="noopener noreferrer"><span>Replit</span>Build with Agent: planning, context, screenshots, review and testing ↗</a></li>
              <li><a href="https://docs.lovable.dev/prompting/prompting-one" target="_blank" rel="noopener noreferrer"><span>Lovable</span>Prompting best practices: systems, components and real content ↗</a></li>
              <li><a href="https://docs.github.com/en/copilot/concepts/prompting/response-customization" target="_blank" rel="noopener noreferrer"><span>GitHub</span>Repository and path-specific custom instructions for coding agents ↗</a></li>
              <li><a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer"><span>W3C</span>Web Content Accessibility Guidelines 2.2 ↗</a></li>
              <li><a href="https://web.dev/performance" target="_blank" rel="noopener noreferrer"><span>web.dev</span>Performance and Core Web Vitals guidance ↗</a></li>
            </ul>
          </section>

          <section className="vcd-related" aria-labelledby="related-title">
            <p className="vcd-section-label">Keep improving the system</p>
            <h2 id="related-title">Related Rendyn resources</h2>
            <div>
              <a href="/#catalogue"><span>Component strategy</span><h3>Choose UI components by product intent</h3><p>Start with the user outcome, compare likely patterns and make the choice defensible.</p><i aria-hidden="true">↗</i></a>
              <a href="/#how-it-works"><span>Agent workflow</span><h3>What coding agents need from component libraries</h3><p>See how previews, context and source files turn a vague request into a reliable implementation.</p><i aria-hidden="true">↗</i></a>
            </div>
          </section>
        </div>
        </div>
      </article>

      <section className="vcd-final-cta grid-field" aria-labelledby="vcd-cta-title">
        <div>
          <p className="eyebrow">Better inputs. Better interfaces.</p>
          <h2 id="vcd-cta-title">Give your coding agent<br />something good to choose.</h2>
          <p>Rendyn pairs visual previews with component context and complete code, so an agent can compare real options before it builds.</p>
          <div><a className="button" href="/#catalogue">Explore the catalogue <span aria-hidden="true">↗</span></a><a className="button button--cream" href="/#docs">See how it works</a></div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
