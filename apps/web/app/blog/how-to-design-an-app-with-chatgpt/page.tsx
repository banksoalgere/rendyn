/* eslint-disable @next/next/no-html-link-for-pages -- Vinext can hydrate next/link from a second React context; native anchors avoid that runtime failure. */
import type { Metadata } from 'next';
import { Brand } from '../../components/brand';
import { SiteFooter } from '../../components/site-footer';
import { CopyPromptButton } from './copy-prompt-button';

const title = 'ChatGPT App Design: How to Design an App With ChatGPT';
const description =
  'Learn a practical ChatGPT app design workflow, from product brief and user flows to an accessible, tested prototype your team can build.';
const canonicalUrl =
  'https://designmcp.jneilbaker.chatgpt.site/blog/how-to-design-an-app-with-chatgpt';

export const metadata: Metadata = {
  title: `${title} | DesignMCP`,
  description,
  authors: [{ name: 'DesignMCP Editorial' }],
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    type: 'article',
    url: canonicalUrl,
    siteName: 'DesignMCP',
    locale: 'en_GB',
    publishedTime: '2026-08-29T00:00:00.000Z',
    modifiedTime: '2026-08-29T00:00:00.000Z',
    authors: ['DesignMCP Editorial'],
    section: 'Product design',
    tags: ['ChatGPT app design', 'app prototyping', 'product design'],
    images: [],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: [],
  },
};

const sections = [
  ['answer', 'The short answer'],
  ['brief', 'Write the brief'],
  ['workflow', 'Design workflow'],
  ['prompt', 'Prompt template'],
  ['build', 'Move into build'],
  ['test', 'Test the result'],
  ['mistakes', 'Common mistakes'],
  ['faq', 'FAQ'],
];

const designSteps = [
  {
    number: '01',
    title: 'Turn the idea into a decision-ready brief',
    body: 'Ask ChatGPT to expose what is still vague: the user, their triggering situation, the job they need done, the one action that matters, constraints, and the evidence that would make the first version worth keeping.',
    output: 'Output: a one-page brief with assumptions clearly labelled.',
  },
  {
    number: '02',
    title: 'Choose one critical journey',
    body: 'Map the shortest credible route from entry to success. Include the happy path, one recovery path, and the moments where the user needs confidence. A focused flow gives the interface a hierarchy; a feature list does not.',
    output: 'Output: 5–8 states linked by user decisions.',
  },
  {
    number: '03',
    title: 'Write the interface before styling it',
    body: 'Draft headings, labels, empty states, errors, confirmations, and destructive-action warnings. Ask for concrete product copy, not filler. Real language reveals whether a layout can hold the actual experience.',
    output: 'Output: a screen-by-screen content inventory.',
  },
  {
    number: '04',
    title: 'Explore distinct visual directions',
    body: 'Give ChatGPT reference images and describe what to learn from them: hierarchy, density, material, rhythm, or motion. Request a small set of meaningfully different directions, then select one using product-fit criteria.',
    output: 'Output: one chosen direction and a short design rationale.',
  },
  {
    number: '05',
    title: 'Define the system, not just the screen',
    body: 'Lock a type scale, spacing rhythm, colour roles, radii, elevation, component states, and responsive rules. Repetition is what turns an attractive mock-up into a coherent app.',
    output: 'Output: a compact token and component specification.',
  },
  {
    number: '06',
    title: 'Build the smallest useful prototype',
    body: 'Have ChatGPT or Codex implement one end-to-end slice with realistic data and working interactions. Keep the existing repository, framework, and design-system conventions in the prompt when you have them.',
    output: 'Output: a runnable flow, not a collection of static screens.',
  },
  {
    number: '07',
    title: 'Critique with evidence',
    body: 'Open the prototype at desktop and mobile widths. Complete the core task with keyboard and touch. Capture layout problems, confusing copy, missing states, console errors, and network failures, then fix the cause of each issue.',
    output: 'Output: observations tied to exact screens and actions.',
  },
  {
    number: '08',
    title: 'Prepare a buildable handoff',
    body: 'Record accepted decisions, flows, components, states, assets, breakpoints, and unresolved risks. Treat generated code as a starting point that still needs security, privacy, performance, and production review.',
    output: 'Output: an implementation-ready product slice and test checklist.',
  },
];

const prompt = `Help me design the first useful version of an app.

Product: [one-sentence idea]
Primary user: [specific user and situation]
Core outcome: [what they must accomplish]
Critical journey: [entry point → successful end state]
Constraints: [platform, stack, accessibility, brand, time]
Reference direction: [links or screenshots + what to learn from each]

Before designing:
1. List missing decisions and risky assumptions.
2. Recommend the smallest testable scope.
3. Map the happy path, one empty state, one error path, and one recovery path.

Then deliver:
- screen-by-screen content and interaction hierarchy
- 2 meaningfully different visual directions
- a compact design system with type, spacing, colour, and component states
- a responsive prototype of the selected direction
- keyboard, touch, loading, empty, error, success, and reduced-motion states
- a browser test checklist for the core journey

Do not invent research findings. Label assumptions, preserve my repository conventions,
and ask before making a decision that changes the product scope.`;

const buildPaths = [
  {
    label: 'Web product',
    title: 'Prototype in the real web stack',
    body: 'Best when the app will live in a browser or when a responsive prototype can answer the biggest product questions. Give the agent the repository, exact route, reference frames, and success criteria.',
    note: 'Good default: one route, one complete task, real browser checks.',
  },
  {
    label: 'Native mobile',
    title: 'Use platform conventions early',
    body: 'For iOS or Android, specify navigation, safe areas, keyboards, permissions, touch targets, offline behaviour, and device testing. A web mock-up is useful for direction, but it does not prove native behaviour.',
    note: 'For React Native, current OpenAI guidance documents an Expo-first path.',
  },
  {
    label: 'Inside ChatGPT',
    title: 'Design around a conversational outcome',
    body: 'An app that runs in ChatGPT is a separate product shape. Start with one narrow outcome, define the tools and structured results, then decide whether the flow needs an interactive widget.',
    note: 'This path uses an MCP server and the ChatGPT Apps SDK.',
  },
];

const testGroups = [
  ['Task', 'Can a new user complete the critical journey without explanation?', 'Are the next action and system status obvious?'],
  ['States', 'Do loading, empty, error, success, disabled, and destructive states exist?', 'Can the user recover without losing work?'],
  ['Access', 'Does keyboard order match the visual order?', 'Are focus, labels, contrast, touch targets, and reduced motion handled?'],
  ['Layout', 'Does real content survive narrow and wide screens?', 'Are long names, validation messages, and zoom resilient?'],
  ['Quality', 'Are there console errors or failed requests?', 'Do performance, privacy, and security assumptions have owners?'],
];

const mistakes = [
  ['Starting with “make it modern”', 'Style adjectives do not establish a user, outcome, hierarchy, or reason for a component choice.'],
  ['Asking for the entire app at once', 'A broad generation is hard to judge. Build one complete journey and expand only after it survives testing.'],
  ['Treating generated personas as research', 'ChatGPT can organise evidence and surface hypotheses; it cannot turn invented interviews into user truth.'],
  ['Using placeholder copy', 'Lorem ipsum hides hierarchy, overflow, validation, and trust problems that real interface language exposes.'],
  ['Reviewing only a screenshot', 'A polished frame says nothing about focus order, touch behaviour, loading, failure, or recovery.'],
  ['Shipping the first generated code', 'Generated code still needs review for correctness, accessibility, privacy, security, performance, and maintainability.'],
];

const faqs = [
  {
    question: 'Can ChatGPT design an app?',
    answer: 'Yes—ChatGPT can help shape a brief, map flows, draft interface copy, explore visual directions, generate prototypes, and critique results. You still own user research, product decisions, validation, and the standard required for release.',
  },
  {
    question: 'Can ChatGPT build an app from an idea?',
    answer: 'It can help turn a well-scoped idea into a working prototype and, with Codex in a code repository, implement and test a real product slice. A production release still requires infrastructure, data, security, store or deployment, and operational decisions.',
  },
  {
    question: 'Do I need to know how to code?',
    answer: 'Not to explore a concept or make a browser prototype. Technical knowledge becomes more important as the app handles accounts, payments, private data, native permissions, integrations, or production traffic.',
  },
  {
    question: 'Should I start in Figma or in code?',
    answer: 'Start where you can test the riskiest assumption fastest. Figma is strong for collaborative visual exploration; code is stronger when responsive behaviour, realistic data, or complex interaction determines whether the idea works. Many teams move between both.',
  },
  {
    question: 'What is the best first prompt for ChatGPT app design?',
    answer: 'Describe the user, desired outcome, critical journey, constraints, reference direction, and evidence of success. Ask ChatGPT to identify missing decisions before it designs anything, then request one testable slice with complete states.',
  },
];

function ArticleHeader() {
  return (
    <header className="chatgpt-app-header">
      <Brand href="/" label="DesignMCP home" />
      <nav className="chatgpt-app-header-nav" aria-label="Article navigation">
        <a href="#workflow">Workflow</a>
        <a href="#prompt">Prompt</a>
        <a href="#faq">FAQ</a>
      </nav>
      <a className="button button--small" href="/#early-access">Connect DesignMCP</a>
    </header>
  );
}

function HeroVisual() {
  return (
    <div className="chatgpt-app-hero-frame section-shell" aria-hidden="true">
      <div className="chatgpt-app-hero-board grid-field">
        <div className="chatgpt-app-hero-copy">
          <span>Design the outcome first</span>
          <p className="chatgpt-app-hero-visual-title">From loose idea to testable app.</p>
          <p>Brief → flows → interface → prototype → evidence</p>
        </div>
        <div className="chatgpt-app-flow-preview">
          <div><span>01</span><strong>Brief</strong><i>Who, why, constraint</i></div>
          <div><span>02</span><strong>Flow</strong><i>One critical journey</i></div>
          <div className="is-active"><span>03</span><strong>Prototype</strong><i>Real states, real copy</i></div>
          <div><span>04</span><strong>Evidence</strong><i>Browser, users, revision</i></div>
        </div>
      </div>
    </div>
  );
}

export default function ChatGPTAppDesignArticle() {
  return (
    <div className="chatgpt-app-page" id="top">
      <ArticleHeader />

      <main>
        <article>
          <header className="chatgpt-app-hero section-shell">
            <div className="chatgpt-app-meta">
              <span>Design workflow</span>
              <span aria-hidden="true">•</span>
              <span>By DesignMCP Editorial</span>
              <span aria-hidden="true">•</span>
              <time dateTime="2026-08-29">August 29, 2026</time>
              <span aria-hidden="true">•</span>
              <span>12 min read</span>
            </div>
            <h1>How to Design an App With ChatGPT</h1>
            <p>
              A practical <strong>ChatGPT app design</strong> workflow for turning a rough
              idea into clear user flows, an intentional interface, and a prototype you
              can actually test.
            </p>
          </header>

          <HeroVisual />

          <div className="chatgpt-app-layout section-shell">
            <aside className="chatgpt-app-sidebar">
              <nav aria-label="On this page">
                <p>On this page</p>
                {sections.map(([href, label]) => (
                  <a href={`#${href}`} key={href}>{label}</a>
                ))}
              </nav>
              <div className="chatgpt-app-side-cta">
                <span>Building in code?</span>
                <strong>Give your agent stronger interface choices.</strong>
                <a href="/#catalogue">Explore DesignMCP <i aria-hidden="true">↗</i></a>
              </div>
            </aside>

            <div className="chatgpt-app-content">
            <section id="answer">
              <p className="chatgpt-app-kicker">The short answer</p>
              <h2>Use ChatGPT to sharpen decisions—not to skip the design process.</h2>
              <p className="chatgpt-app-lede">
                A useful <strong>ChatGPT app design</strong> process moves through five
                things in order: a precise product brief, one critical user journey, real
                interface content, a coherent visual system, and a prototype tested with
                real interactions. ChatGPT can accelerate each step, but it should make
                assumptions visible rather than quietly inventing them.
              </p>
              <div className="chatgpt-app-answer-card">
                <span>In one sentence</span>
                <p>
                  Give ChatGPT the product outcome and constraints, ask it to expose gaps,
                  design one complete flow, build the smallest useful version, then iterate
                  from browser and user evidence.
                </p>
              </div>
              <p>
                There are also two different meanings behind this search. You may want to
                use ChatGPT to design and build your own web or mobile product. Or you may
                want to build an app that runs <em>inside</em> ChatGPT. This guide covers
                the first path and explains the separate Apps SDK path before the end.
              </p>
            </section>

            <section id="brief">
              <p className="chatgpt-app-kicker">Before the first mock-up</p>
              <h2>A better input creates a better interface.</h2>
              <p>
                Do not begin by asking for “a clean, modern app.” Begin with decisions.
                ChatGPT is far more useful when it can reason about a specific person in a
                specific situation, the job they are trying to finish, and what the product
                must protect along the way.
              </p>
              <div className="chatgpt-app-brief-grid">
                <div><span>01</span><strong>User</strong><p>Who is doing the task, and what do they already know?</p></div>
                <div><span>02</span><strong>Trigger</strong><p>What happened immediately before they opened the app?</p></div>
                <div><span>03</span><strong>Outcome</strong><p>What changes for them when the task is complete?</p></div>
                <div><span>04</span><strong>Constraint</strong><p>What must the design respect: time, trust, device, data, or brand?</p></div>
                <div><span>05</span><strong>Risk</strong><p>What mistake would be costly, confusing, unsafe, or irreversible?</p></div>
                <div><span>06</span><strong>Evidence</strong><p>What observation would tell you the first version works?</p></div>
              </div>
              <blockquote>
                <p>“Do not design screens yet. First list the decisions this brief has not made, then separate facts from assumptions.”</p>
                <cite>A strong opening instruction for ChatGPT</cite>
              </blockquote>
            </section>

            <section id="workflow">
              <p className="chatgpt-app-kicker">The end-to-end method</p>
              <h2>A ChatGPT app design workflow that holds up after the first prompt.</h2>
              <p>
                Current official OpenAI guidance describes a similar loop: use Codex and
                ImageGen to explore a direction, implement the smallest useful prototype,
                and verify it in a real browser. The steps below turn that loop into a
                repeatable product-design process.
              </p>
              <div className="chatgpt-app-design-steps">
                {designSteps.map((step) => (
                  <article key={step.number}>
                    <span>{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                      <em>{step.output}</em>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="prompt">
              <p className="chatgpt-app-kicker">A reusable starting point</p>
              <h2>Prompt ChatGPT like a product team, not a mood board.</h2>
              <p>
                This prompt makes scope, states, and validation part of the request. Adapt
                the bracketed fields and attach source material whenever you have it.
              </p>
              <div className="chatgpt-app-prompt-card">
                <div className="chatgpt-app-prompt-card-bar">
                  <span>chatgpt-app-design-prompt.txt</span>
                  <CopyPromptButton text={prompt} />
                </div>
                <pre><code>{prompt}</code></pre>
              </div>
              <div className="chatgpt-app-prompt-notes">
                <div><span>Keep</span><p>Specific users, real constraints, reference images, existing code conventions, and a measurable success condition.</p></div>
                <div><span>Avoid</span><p>“Best practice” without context, fabricated research, vague style words, or a request to build every feature in one pass.</p></div>
              </div>
            </section>

            <section id="build">
              <p className="chatgpt-app-kicker">From design to working software</p>
              <h2>Can ChatGPT build the app too?</h2>
              <p>
                Yes—with Codex and within a clear scope. If you typed{' '}
                <strong>“ChatGPT build app”</strong> into search, the important choice is
                not whether an AI can generate code. It is which product surface will let
                you test the idea honestly and what engineering work remains after the
                prototype.
              </p>
              <div className="chatgpt-app-build-paths">
                {buildPaths.map((path, index) => (
                  <article key={path.label}>
                    <div><span>0{index + 1}</span><i>{path.label}</i></div>
                    <h3>{path.title}</h3>
                    <p>{path.body}</p>
                    <strong>{path.note}</strong>
                  </article>
                ))}
              </div>
              <div className="chatgpt-app-separation-callout">
                <div>
                  <span>Design with ChatGPT</span>
                  <p>Your product runs on the web, mobile, or desktop. ChatGPT helps frame and critique it; Codex can help implement and test it.</p>
                </div>
                <i aria-hidden="true">≠</i>
                <div>
                  <span>Build for ChatGPT</span>
                  <p>Your product runs as a ChatGPT app, backed by tools from an MCP server and an optional interface.</p>
                </div>
              </div>
            </section>

            <aside className="chatgpt-app-product-demo" aria-labelledby="product-demo-heading">
              <div className="chatgpt-app-product-demo-copy">
                <p className="chatgpt-app-kicker">DesignMCP in the workflow</p>
                <h2 id="product-demo-heading">Give the agent product context before it chooses the component.</h2>
                <p>
                  Once the journey and states are clear, DesignMCP can help a coding agent
                  compare polished interface options by product intent, then deliver the
                  chosen source and setup details into the build.
                </p>
                <a href="/#how-it-works">How agent-ready delivery works <span aria-hidden="true">↗</span></a>
              </div>
              <div className="chatgpt-app-product-console" aria-hidden="true">
                <div><span>designmcp / component search</span><i>Live catalogue</i></div>
                <p><strong>Request</strong> “A calm confirmation action for a high-trust account change.”</p>
                <ol>
                  <li><span>01</span><div><strong>Signal button</strong><p>Clear hierarchy · low motion · complete states</p></div><i>Best fit</i></li>
                  <li><span>02</span><div><strong>Stateful button</strong><p>Built-in progress · compact feedback</p></div><i>Option</i></li>
                  <li><span>03</span><div><strong>Hold action</strong><p>Intentional friction · destructive flows</p></div><i>Option</i></li>
                </ol>
                <div className="chatgpt-app-product-files"><span>TSX</span><span>CSS</span><span>States</span><span>Install</span></div>
              </div>
            </aside>

            <section id="test">
              <p className="chatgpt-app-kicker">The quality gate</p>
              <h2>Test the experience, not the screenshot.</h2>
              <p>
                Ask ChatGPT to help form the checklist, but perform the critical journey in
                the real interface. A high-quality frame can still hide a broken focus
                order, missing error recovery, clipped content, or a failed request.
              </p>
              <dl className="chatgpt-app-test-table" aria-label="App design test checklist">
                {testGroups.map(([group, checkOne, checkTwo]) => (
                  <div key={group}>
                    <dt>{group}</dt>
                    <dd>{checkOne}</dd>
                    <dd>{checkTwo}</dd>
                  </div>
                ))}
              </dl>
              <div className="chatgpt-app-evidence-strip">
                <span>Useful evidence</span>
                <div><i>01</i>Exact route and viewport</div>
                <div><i>02</i>Actions and observed result</div>
                <div><i>03</i>Console and network state</div>
                <div><i>04</i>Open risks and next revision</div>
              </div>
            </section>

            <section id="mistakes">
              <p className="chatgpt-app-kicker">Where AI-assisted design goes wrong</p>
              <h2>Six shortcuts that make the result look finished before it is useful.</h2>
              <div className="chatgpt-app-mistake-list">
                {mistakes.map(([name, explanation], index) => (
                  <article key={name}>
                    <span>0{index + 1}</span>
                    <h3>{name}</h3>
                    <p>{explanation}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="chatgpt-app-source-section" aria-labelledby="source-heading">
              <p className="chatgpt-app-kicker">Current capability notes</p>
              <h2 id="source-heading">What official OpenAI guidance supports today.</h2>
              <p>
                OpenAI&apos;s current use cases document concept-to-prototype work with
                ImageGen and Codex, screenshot- and reference-led responsive implementation,
                Figma-to-code workflows with visual checks, React Native development with
                Expo, and the separate process for building apps that run in ChatGPT.
              </p>
              <ul className="chatgpt-app-source-links">
                <li><a href="https://learn.chatgpt.com/use-cases/idea-to-proof-of-concept">Idea to proof of concept <span aria-hidden="true">↗</span></a></li>
                <li><a href="https://learn.chatgpt.com/use-cases/frontend-designs">Responsive front-end designs <span aria-hidden="true">↗</span></a></li>
                <li><a href="https://learn.chatgpt.com/use-cases/figma-designs-to-code">Figma designs to code <span aria-hidden="true">↗</span></a></li>
                <li><a href="https://learn.chatgpt.com/use-cases/react-native-expo-apps">React Native apps with Expo <span aria-hidden="true">↗</span></a></li>
                <li><a href="https://learn.chatgpt.com/use-cases/chatgpt-apps">Apps that run in ChatGPT <span aria-hidden="true">↗</span></a></li>
              </ul>
            </section>

            <section id="faq">
              <p className="chatgpt-app-kicker">Frequently asked questions</p>
              <h2>ChatGPT app design, answered.</h2>
              <div className="chatgpt-app-faq-list">
                {faqs.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}<span aria-hidden="true">+</span></summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="chatgpt-app-related-guides" aria-labelledby="chatgpt-app-related-guides-heading">
              <p className="chatgpt-app-kicker">Continue exploring</p>
              <h2 id="chatgpt-app-related-guides-heading">Related DesignMCP resources.</h2>
              <div>
                <a href="/#product">
                  <span>Product overview</span>
                  <strong>See how DesignMCP improves an agent&apos;s interface choices</strong>
                  <i aria-hidden="true">↗</i>
                </a>
                <a href="/#catalogue">
                  <span>Component catalogue</span>
                  <strong>Explore components organised around product intent</strong>
                  <i aria-hidden="true">↗</i>
                </a>
                <a href="/#how-it-works">
                  <span>Agent delivery</span>
                  <strong>Learn what the agent receives after a component is chosen</strong>
                  <i aria-hidden="true">↗</i>
                </a>
              </div>
            </section>

            <section className="chatgpt-app-end-cta grid-field">
              <p className="chatgpt-app-kicker">Build with better ingredients</p>
              <h2>Give the prototype a point of view.</h2>
              <p>
                DesignMCP helps coding agents choose polished interface components with
                visual previews, product context, complete source, and install guidance.
              </p>
              <div>
                <a className="button" href="/#catalogue">Browse the catalogue <span aria-hidden="true">↗</span></a>
                <a className="button button--ghost" href="/#how-it-works">See what agents get</a>
              </div>
            </section>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
