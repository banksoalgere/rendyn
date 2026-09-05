import { GuideHeading } from '../../components/guide-heading';
import type { Metadata } from 'next';
import Link from 'next/link';
import './page.css';

export const metadata: Metadata = {
  title: 'How to Make Codex Better at Design | Rendyn',
  description:
    'A practical Codex design workflow for building better websites and apps with stronger context, visual references, reusable rules, and browser QA.',
  alternates: { canonical: '/guides/how-to-make-codex-better-at-design' },
  authors: [{ name: 'Rendyn editorial' }],
  robots: {
    index: true,
    follow: true,
  },
  keywords: ['codex design', 'codex website', 'codex app', 'AI interface design'],
  openGraph: {
    siteName: 'Rendyn',
    locale: 'en_GB',
    title: 'How to Make Codex Better at Design',
    description:
      'Give Codex the product context, visual system, implementation ingredients, and review loop it needs to build polished interfaces.',
    url: '/guides/how-to-make-codex-better-at-design',
    type: 'article',
    publishedTime: '2026-08-29T00:00:00+01:00',
    modifiedTime: '2026-08-29T00:00:00+01:00',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'How to Make Codex Better at Design',
    description:
      'A practical workflow for more intentional Codex website and app design.',
    images: [],
  },
};

const workflowSteps = [
  {
    number: '01',
    title: 'Define the product outcome',
    copy: 'Start with the user, the moment, and the decision the interface must support. “Design a dashboard” leaves every important choice open. “Help an operations lead spot a delayed order and resolve it in under a minute” gives Codex a product problem to solve.',
  },
  {
    number: '02',
    title: 'Make the existing system legible',
    copy: 'Point Codex to the real route, shared primitives, tokens, icons, data shapes, and nearby screens. Ask it to inspect first and name what should be reused. A coherent extension of a modest system usually looks better than a beautiful one-off that ignores the rest of the product.',
  },
  {
    number: '03',
    title: 'Choose one visual direction',
    copy: 'Use a small, focused reference set: one page for information rhythm, one component for interaction, and one image for mood is often enough. Explain what to borrow—density, hierarchy, framing, motion—not simply which site to copy.',
  },
  {
    number: '04',
    title: 'Supply implementation ingredients',
    copy: 'Give the agent approved components, real assets, font rules, and interaction patterns it can actually ship. Figma context, an MCP component catalogue, and repository-native examples reduce the number of visual decisions Codex has to invent from scratch.',
  },
  {
    number: '05',
    title: 'Turn taste into durable rules',
    copy: 'Put stable repository constraints in AGENTS.md and keep evolving design criteria in a short design brief or skill. The useful rules are observable: target line lengths, spacing ranges, motion behavior, state coverage, breakpoints, and what the interface must never do.',
  },
  {
    number: '06',
    title: 'Define the proof before the build',
    copy: 'Name the routes, roles, data states, viewport widths, keyboard behavior, and performance expectations that count as done. This makes visual QA part of the task rather than a vague polish request at the end.',
  },
  {
    number: '07',
    title: 'Review the rendered product',
    copy: 'Have Codex run the actual app, use the real workflow, and inspect desktop and mobile views. Give feedback on the visible result—hierarchy, rhythm, awkward wrapping, focus, motion, and states—then ask it to fix the underlying system rather than nudging isolated pixels.',
  },
];

const failureModes = [
  {
    title: '“Make it modern”',
    symptom: 'Produces fashionable defaults with no product point of view.',
    fix: 'Name the user, emotional register, density, and visual references.',
  },
  {
    title: 'A giant inspiration dump',
    symptom: 'Creates mixed signals and a collage of unrelated patterns.',
    fix: 'Use a few references and assign one clear lesson to each.',
  },
  {
    title: 'Reviewing only the code',
    symptom: 'Misses wrapping, overflow, weak hierarchy, and broken states.',
    fix: 'Require rendered desktop and mobile evidence for the real route.',
  },
  {
    title: 'Polishing before structure',
    symptom: 'Spends time on shadows while the task flow remains unclear.',
    fix: 'Approve information architecture and interaction before decoration.',
  },
];

const qaChecks = [
  'The primary task is obvious within five seconds.',
  'The page has one clear H1 and a deliberate heading hierarchy.',
  'Realistic content does not overflow, clip, or create accidental gaps.',
  'Loading, empty, error, disabled, hover, focus, and success states are covered.',
  'The complete workflow works with a keyboard and visible focus.',
  'Touch targets, type size, and reading width remain usable on mobile.',
  'Animation explains change and respects reduced-motion preferences.',
  'Console errors and obvious failed network requests are resolved.',
];

const sources = [
  {
    label: 'Introducing the Codex app',
    detail: 'OpenAI on Codex surfaces, skills, worktrees, and design implementation workflows.',
    href: 'https://openai.com/index/introducing-the-codex-app/',
  },
  {
    label: 'OpenAI Codex and Figma',
    detail: 'OpenAI on moving between design context, editable Figma work, and implementation.',
    href: 'https://openai.com/index/figma-partnership/',
  },
  {
    label: 'Harness engineering',
    detail: 'OpenAI on making application UIs legible to Codex through browser-driven verification.',
    href: 'https://openai.com/index/harness-engineering/',
  },
  {
    label: 'Design context and iteration with Codex',
    detail: 'OpenAI Academy on reusable design guidance, screenshots, live URLs, and mood boards.',
    href: 'https://academy.openai.com/en/public/clubs/champions-ecqup/videos/design-context-and-iteration-with-codex-2026-07-09',
  },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function CodexDesignGuide() {
  return (
    <main className="codex-design-page codex-article-page">
      <a className="codex-article-skip-link" href="#article-content">Skip to article</a>

      <article>
        <header className="codex-article-masthead grid-field guide-hero-container" id="article-top">
          <div className="codex-article-shell">


            <GuideHeading slug="how-to-make-codex-better-at-design" id="guide-title" />

            <div className="codex-article-hero-frame guide-example" aria-label="A practical Codex design brief">
              <div className="codex-brief-window">
                <div className="codex-brief-toolbar">
                  <div><span /><span /><span /></div>
                  <p>codex-design.md</p>
                  <i>Ready</i>
                </div>
                <div className="codex-brief-content">
                  <div className="codex-brief-heading">
                    <span>Design brief / 01</span>
                    <strong>Give the agent{' '}<br />a direction it can test.</strong>
                  </div>
                  <div className="codex-brief-lines">
                    <p><span>01</span><strong>Outcome</strong><i>Help a new user reach value in under two minutes.</i></p>
                    <p><span>02</span><strong>Direction</strong><i>Editorial confidence, quiet surfaces, precise motion.</i></p>
                    <p><span>03</span><strong>Reuse</strong><i>Existing tokens, field patterns, and navigation shell.</i></p>
                    <p><span>04</span><strong>Verify</strong><i>1440px / 390px / keyboard / reduced motion.</i></p>
                  </div>
                </div>
              </div>

              <aside className="codex-hero-principle">
                <div className="codex-hero-principle-mark" aria-hidden="true">R</div>
                <p className="codex-hero-principle-label">The core principle</p>
                <h2>Make good decisions easier to retrieve.</h2>
                <p>
                  Codex can implement quickly. Your job is to make product intent,
                  visual taste, and proof of quality concrete enough to act on.
                </p>
                <a href="#workflow">Use the seven-step workflow <ArrowIcon /></a>
              </aside>
            </div>
          </div>
        </header>

        <div className="codex-article-layout codex-article-shell guide-reading-layout" id="article-content" tabIndex={-1}>
          <aside className="codex-article-rail guide-reading-sidebar">
            <nav aria-label="On this page">
              <p>On this page</p>
              <a href="#short-answer">The short answer</a>
              <a href="#context-gap">Close the context gap</a>
              <a href="#workflow">Seven-step workflow</a>
              <a href="#brief-template">Design brief template</a>
              <a href="#codex-app">Codex app workflow</a>
              <a href="#failure-modes">Failure modes</a>
              <a href="#qa-checklist">QA checklist</a>
            </nav>

            <div className="codex-rail-cta guide-callout">
              <span>Rendyn</span>
              <strong>Give Codex better interface ingredients.</strong>
              <p>Curated components, visual previews, fit notes, and complete source.</p>
              <Link href="/components">Explore the catalogue <ArrowIcon /></Link>
            </div>
          </aside>

          <div className="codex-article-body guide-reading-body">
            <section id="short-answer">
              <p className="codex-article-section-label">The short answer</p>
              <h2>Codex needs a design environment, not a magic prompt.</h2>
              <p className="codex-article-lede">
                A strong Codex website starts before the first component is written.
                The agent needs to understand what the product is, who the interface is
                for, which system it belongs to, what good looks like, and how the final
                result will be inspected.
              </p>
              <p>
                Codex is already capable of reading a repository, editing the real
                implementation, using images and skills, and working across the app, IDE,
                CLI, web, and cloud, as documented in{' '}
                <a
                  className="codex-article-citation"
                  href="https://openai.com/index/introducing-the-codex-app/"
                >
                  OpenAI&apos;s Codex app overview
                </a>
                . OpenAI also describes a round-trip workflow with Figma through MCP in
                its{' '}
                <a
                  className="codex-article-citation"
                  href="https://openai.com/index/figma-partnership/"
                >
                  Codex and Figma announcement
                </a>
                . Those capabilities improve execution; they do not replace the missing
                product decisions in an underspecified request.
              </p>

              <div className="codex-answer-card">
                <span>In one sentence</span>
                <p>
                  To make Codex better at design, reduce the number of important visual
                  decisions it has to guess—and make every remaining decision visible,
                  testable, and easy to revise.
                </p>
              </div>
            </section>

            <section id="context-gap">
              <p className="codex-article-section-label">01 / Context before code</p>
              <h2>Close the gap between “works” and “belongs.”</h2>
              <p>
                Most disappointing AI interfaces are not broken. They are context-poor.
                The layout is valid, the buttons work, and every section is technically
                present—but the result could belong to any product. That happens when
                the agent has code context without design context.
              </p>
              <p>
                OpenAI&apos;s{' '}
                <a
                  className="codex-article-citation"
                  href="https://openai.com/index/harness-engineering/"
                >
                  agent-first engineering report
                </a>{' '}
                describes a similar pattern: when a capability is missing, the answer is
                to make the required system more legible to the agent. For interface
                work, that means exposing three kinds of evidence together.
              </p>

              <div className="codex-context-cards">
                <article>
                  <span>01</span>
                  <h3>Product evidence</h3>
                  <p>User, task, business rule, real data, and the state before and after the action.</p>
                </article>
                <article>
                  <span>02</span>
                  <h3>Visual evidence</h3>
                  <p>Existing screens, selected references, tokens, type rules, assets, and motion language.</p>
                </article>
                <article>
                  <span>03</span>
                  <h3>Quality evidence</h3>
                  <p>Rendered routes, viewport checks, keyboard use, state coverage, console, and network health.</p>
                </article>
              </div>
            </section>

            <section id="workflow">
              <p className="codex-article-section-label">02 / The workflow</p>
              <h2>A seven-step Codex design workflow.</h2>
              <p>
                Use this sequence for a new page, a redesign, or a focused product flow.
                It works whether your Codex website lives in a mature design system or
                a small repository with only a few shared styles.
              </p>

              <div className="codex-workflow-list">
                {workflowSteps.map((step) => (
                  <article key={step.number}>
                    <span>{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="brief-template">
              <p className="codex-article-section-label">03 / A reusable input</p>
              <h2>Use a design brief Codex can execute.</h2>
              <p>
                The best brief is concise enough to stay in working context and specific
                enough to change the result. Put stable engineering rules in
                <code> AGENTS.md</code>; keep the task’s visual direction in the request
                or a focused design document. If a workflow repeats, package the method
                as a skill rather than pasting a giant instruction block into every task.
              </p>

              <div className="codex-template-card">
                <div className="codex-template-card-bar">
                  <span>Design task template</span>
                  <i>Copy into your Codex task</i>
                </div>
                <pre><code>{`Outcome
Build [route or flow] for [specific user] so they can [measurable task].

Product context
- Entry point and previous state:
- Primary action and success state:
- Business rules and permissions:
- Realistic data and edge cases:

Visual direction
- Desired character: [three precise adjectives]
- Reuse: [components, tokens, icons, type, layout]
- References: [URL/image] — use it for [specific principle]
- Avoid: [observable anti-patterns]

Interaction contract
- Required states:
- Keyboard and focus behavior:
- Motion and reduced-motion behavior:

Definition of done
- Verify at [desktop width] and [mobile width]
- Complete the real workflow in a browser
- Check links, console, and obvious network failures
- Preserve existing conventions and report evidence`}</code></pre>
              </div>

              <div className="codex-editorial-note">
                <span aria-hidden="true">✦</span>
                <p>
                  <strong>Write references as reasons.</strong> “Use this page for its
                  calm reading rhythm and sticky utility rail” is actionable. “Make it
                  like this site” encourages imitation without understanding.
                </p>
              </div>
            </section>

            <section id="codex-app">
              <p className="codex-article-section-label">04 / Pick the right surface</p>
              <h2>Use the Codex app when the feedback is visual.</h2>
              <p>
                The Codex app is especially useful for interface work because the task,
                local project, changes, and visual review can stay in one continuous
                loop. According to{' '}
                <a
                  className="codex-article-citation"
                  href="https://openai.com/index/introducing-the-codex-app/"
                >
                  OpenAI&apos;s Codex app overview
                </a>
                , the app supports parallel threads, worktrees, diff review, and skills.
                An{' '}
                <a
                  className="codex-article-citation"
                  href="https://academy.openai.com/en/public/clubs/champions-ecqup/videos/design-context-and-iteration-with-codex-2026-07-09"
                >
                  OpenAI Academy lesson
                </a>{' '}
                also demonstrates supplying live URLs, screenshots, mood boards, and
                reusable design guidance for iteration.
              </p>
              <p>
                The CLI and IDE extension remain excellent when your existing development
                flow already provides image context and browser evidence. Cloud tasks are
                useful for isolated work with a configured environment. The deciding
                factor is not which surface sounds most powerful—it is whether Codex can
                inspect the rendered state and receive precise feedback there.
              </p>

              <div className="codex-surface-table" role="table" aria-label="Codex surfaces for design work">
                <div className="codex-surface-row codex-surface-row--head" role="row">
                  <span role="columnheader">Surface</span>
                  <span role="columnheader">Best design use</span>
                  <span role="columnheader">Visual loop</span>
                </div>
                <div className="codex-surface-row" role="row">
                  <strong role="cell">Codex app</strong>
                  <span role="cell">Longer UI work, local routes, review, and iteration</span>
                  <i role="cell">Integrated</i>
                </div>
                <div className="codex-surface-row" role="row">
                  <strong role="cell">IDE extension</strong>
                  <span role="cell">Focused changes close to existing code and images</span>
                  <i role="cell">Editor-led</i>
                </div>
                <div className="codex-surface-row" role="row">
                  <strong role="cell">CLI</strong>
                  <span role="cell">Terminal-first work inside an established development flow</span>
                  <i role="cell">External</i>
                </div>
                <div className="codex-surface-row" role="row">
                  <strong role="cell">Cloud</strong>
                  <span role="cell">Configured, isolated tasks in a cloud environment</span>
                  <i role="cell">Environment-led</i>
                </div>
              </div>
            </section>

            <section id="failure-modes">
              <p className="codex-article-section-label">05 / What weakens the result</p>
              <h2>Common Codex website design failure modes.</h2>
              <div className="codex-failure-grid">
                {failureModes.map((failure, index) => (
                  <article key={failure.title}>
                    <span>0{index + 1}</span>
                    <h3>{failure.title}</h3>
                    <p>{failure.symptom}</p>
                    <div><strong>Better move</strong><i>{failure.fix}</i></div>
                  </article>
                ))}
              </div>
            </section>

            <section id="qa-checklist">
              <p className="codex-article-section-label">06 / Definition of done</p>
              <h2>The design QA checklist.</h2>
              <p>
                “Looks good” is not a test. Use a small, repeatable checklist so the Codex
                design loop ends with evidence rather than optimism.
              </p>
              <div className="codex-qa-list">
                {qaChecks.map((check, index) => (
                  <div key={check}>
                    <span aria-hidden="true">✓</span>
                    <p>{check}</p>
                    <i>0{index + 1}</i>
                  </div>
                ))}
              </div>
            </section>

            <section className="codex-rendyn-section" id="rendyn">
              <div>
                <p className="codex-article-section-label">Where Rendyn fits</p>
                <h2>Better output starts with better ingredients.</h2>
                <p>
                  Rendyn gives coding agents a curated catalogue of polished React,
                  TypeScript, and Tailwind components. Codex can search by product intent,
                  inspect visual options, understand fit, and retrieve complete source
                  with dependencies and setup details.
                </p>
                <p>
                  It does not replace the brief or the browser review. It makes the
                  implementation layer more legible—so the agent spends less time
                  inventing generic UI and more time composing a coherent product.
                </p>
                <div className="codex-rendyn-actions">
                  <Link className="button" href="/components">Browse components <ArrowIcon /></Link>
                  <Link className="button button--ghost" href="/#docs">Connect Rendyn</Link>
                </div>
              </div>
              <div className="codex-ingredient-stack" aria-label="What Rendyn gives a coding agent">
                <div><span>01</span><strong>Intent-ranked options</strong><i>Choose</i></div>
                <div><span>02</span><strong>Rendered previews</strong><i>Inspect</i></div>
                <div><span>03</span><strong>Fit reasoning</strong><i>Decide</i></div>
                <div><span>04</span><strong>Complete source</strong><i>Ship</i></div>
              </div>
            </section>

            <section className="codex-faq-section">
              <p className="codex-article-section-label">Frequently asked</p>
              <h2>Codex design questions, answered.</h2>
              <div className="codex-faq-list">
                <details>
                  <summary>Can Codex design a complete website?</summary>
                  <p>Yes. Codex can implement a complete website or app in a compatible repository. The quality improves when the task includes product context, a chosen visual direction, approved components and assets, responsive requirements, and a real rendered review loop.</p>
                </details>
                <details>
                  <summary>Should I make a design skill or use AGENTS.md?</summary>
                  <p>Use AGENTS.md for stable repository rules such as commands, architecture, accessibility requirements, and boundaries. Use a focused design document for evolving product criteria. Package a reusable design workflow as a skill when it applies across multiple tasks or repositories.</p>
                </details>
                <details>
                  <summary>Does a longer prompt produce better interface design?</summary>
                  <p>Not automatically. A short prompt with concrete outcome, context, references, constraints, and proof is more useful than a long list of decorative adjectives. Add detail only when it changes a decision or makes the result testable.</p>
                </details>
                <details>
                  <summary>What should I review after Codex builds the page?</summary>
                  <p>Complete the primary workflow at desktop and mobile widths. Check hierarchy, real content, responsive behavior, all important states, keyboard and focus behavior, reduced motion, links, console errors, and obvious failed requests.</p>
                </details>
              </div>
            </section>

            <section className="codex-sources-section" aria-labelledby="sources-title">
              <p className="codex-article-section-label">Primary research</p>
              <h2 id="sources-title">Official sources and further reading.</h2>
              <div className="codex-source-list">
                {sources.map((source, index) => (
                  <a
                    aria-label={`${source.label} (opens in a new tab)`}
                    href={source.href}
                    key={source.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>0{index + 1}</span>
                    <div><strong>{source.label}</strong><p>{source.detail}</p></div>
                    <ArrowIcon />
                  </a>
                ))}
              </div>
              <p className="codex-source-note">
                Product capabilities were checked against OpenAI sources on 29 August
                2026. This guide is independent editorial content by Rendyn.
              </p>
            </section>

            <section className="codex-related-section" aria-labelledby="related-title">
              <p className="codex-article-section-label">Continue the workflow</p>
              <h2 id="related-title">Put the guide into practice.</h2>
              <div className="codex-related-grid">
                <Link href="/components">
                  <span>Component catalogue</span>
                  <h3>Explore components by product intent</h3>
                  <p>Move from a product outcome to a focused, defensible component choice.</p>
                  <i>Browse the component catalogue ↗</i>
                </Link>
                <Link href="/#intelligence">
                  <span>Example output</span>
                  <h3>Inspect an agent-ready deliverable</h3>
                  <p>See how previews, context, fit notes, and source improve implementation decisions.</p>
                  <i>See the complete deliverable ↗</i>
                </Link>
              </div>
            </section>
          </div>
        </div>

        <section className="codex-article-final-cta grid-field guide-end" aria-labelledby="article-cta-title">
          <div className="codex-article-final-cta-card">
            <p className="eyebrow">The next Codex design task</p>
            <h2 id="article-cta-title">Give the agent{' '}<br />better ingredients.</h2>
            <p>Pair a clear design brief with curated components, visual previews, fit reasoning, and complete source code.</p>
            <div>
              <Link className="button" href="/components">Browse components <ArrowIcon /></Link>
              <Link className="button button--cream" href="/#docs">Connect Rendyn</Link>
            </div>
          </div>
        </section>

        <footer className="codex-article-end codex-article-shell">
          <span>Design better systems, not longer prompts.</span>
          <a href="#article-top" aria-label="Back to the top of this article">Back to top ↑</a>
        </footer>
      </article>

    </main>
  );
}
