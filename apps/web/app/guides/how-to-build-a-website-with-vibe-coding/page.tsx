/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim breaks client hydration. */
import type { Metadata } from 'next';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { CopyPromptButton } from './copy-prompt-button';

const starterPrompt = `Build a website for [business or product] that helps [specific audience] achieve [one primary outcome].

Success criteria
- A visitor understands the offer in five seconds.
- The primary action is [book / buy / join / contact].
- The complete journey works on mobile and desktop.

Pages and sections
- Home: [hero, proof, process, CTA]
- [Page two]: [purpose and required content]
- [Page three]: [purpose and required content]

Visual direction
- Feel: [three adjectives]
- References: [links or screenshots, plus what to borrow]
- Avoid: [generic gradients, fake metrics, excessive animation, etc.]

Content and data
- Use the supplied copy exactly where marked.
- Use realistic sample data labelled as sample data.
- Do not invent testimonials, customers, awards or statistics.

Technical constraints
- Preserve the existing framework and shared components.
- Use semantic HTML, visible keyboard focus and reduced-motion support.
- Keep secrets server-side and validate every user-controlled input.
- Do not add login, payments or a database in the first pass.

Before changing code, inspect the project and state the route, reusable components and a short implementation plan. Then build the smallest complete user journey and test it in a real browser.`;

const toc = [
  ['quick-answer', 'The short answer'],
  ['website-or-app', 'Website or app?'],
  ['before-you-prompt', 'Before you prompt'],
  ['step-by-step', 'Step-by-step workflow'],
  ['prompt-template', 'Starter prompt'],
  ['launch-checklist', 'Launch checklist'],
  ['common-mistakes', 'Common mistakes'],
  ['faq', 'FAQ'],
];

const buildSteps = [
  {
    title: 'Choose the build surface that matches the job',
    body: (
      <>
        <p>
          Start with the kind of control you need, not a leaderboard. A visual AI builder is useful when you want a hosted draft, direct manipulation and a short path to publishing. A repo-aware coding agent is stronger when you already have a codebase, need precise dependencies, or expect engineers to maintain the result.
        </p>
        <p>
          Whichever route you choose, confirm that you can inspect or export the code, restore an earlier version, preview at multiple widths and separate drafts from production. Current first-party workflows from <a className="vibe-website-source-link" href="https://docs.replit.com/build/your-first-app">Replit</a> and <a className="vibe-website-source-link" href="https://v0.dev/docs/full-stack-apps">v0</a> both emphasise incremental building instead of asking for an entire production system in one shot.
        </p>
      </>
    ),
  },
  {
    title: 'Write the one-page brief before the first prompt',
    body: (
      <>
        <p>
          A useful brief names one audience, one problem, one primary action and the evidence a visitor needs before taking that action. It also says what version one will not include. This is product work, not prompt decoration: every missing decision becomes a guess the agent has to make.
        </p>
        <div className="vibe-website-formula" role="note">
          <span>THE ONE-SENTENCE TEST</span>
          <p>This website helps <strong>[person]</strong> do <strong>[valuable thing]</strong> by <strong>[distinct approach]</strong>.</p>
        </div>
      </>
    ),
  },
  {
    title: 'Give the agent observable success criteria',
    body: (
      <>
        <p>
          “Make it modern” is subjective. “At 390px wide, the price, billing period and buy button are visible without horizontal scrolling” is testable. Describe the visitor journey as actions and outcomes: open the navigation, submit the form, see a confirmation, refresh the page and use the back button.
        </p>
        <p>
          Ask for boundaries too. If version one does not need accounts, payments or persistent data, say so. Replit’s current quickstart uses the same pattern: one outcome, observable success criteria, explicit exclusions, browser testing and one focused improvement at a time.
        </p>
      </>
    ),
  },
  {
    title: 'Build one complete vertical slice',
    body: (
      <>
        <p>
          Generate the smallest journey that proves the idea. For a service site, that might be home page → service detail → enquiry confirmation. For a small web app, it might be dashboard → create item → see the saved result. A finished path exposes more useful problems than six disconnected screens.
        </p>
        <ul className="vibe-website-check-list">
          <li><span aria-hidden="true">✓</span> Keep the existing project structure and working content.</li>
          <li><span aria-hidden="true">✓</span> Reuse shared buttons, cards, typography and layout primitives.</li>
          <li><span aria-hidden="true">✓</span> Use realistic sample content, clearly labelled when it is not real.</li>
          <li><span aria-hidden="true">✓</span> Defer secondary features until the primary path works.</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Turn “the vibe” into a small design system',
    body: (
      <>
        <p>
          Three adjectives are a start, but references make them operational. Supply two or three examples and annotate the quality you want from each: editorial spacing, compact navigation, tactile controls or restrained motion. Tell the agent what not to copy and what to avoid.
        </p>
        <p>
          Then lock a few decisions: type scale, content width, spacing rhythm, colour roles, border treatment, control shape and motion rules. Reusing a curated component system helps the page keep a point of view as it grows. That is the role of the <a className="vibe-website-source-link" href="/#catalogue">DesignMCP catalogue</a>: your agent can compare polished options and install the complete implementation instead of improvising every control.
        </p>
        <div className="vibe-website-product-demo" role="group" aria-label="Example DesignMCP component result">
          <div className="vibe-website-product-demo-bar"><span>DesignMCP</span><i>Component result</i></div>
          <p>“Find a compact, accessible progress pattern for a multi-step AI workflow.”</p>
          <div className="vibe-website-product-demo-result">
            <span aria-hidden="true">D</span>
            <div><strong>Agent activity steps</strong><small>Preview · fit reasoning · complete source</small></div>
            <i aria-hidden="true">↗</i>
          </div>
        </div>
      </>
    ),
  },
  {
    title: 'Replace generated filler with credible content',
    body: (
      <>
        <p>
          Generated drafts can invent the shape of trust—logos, testimonials, awards and percentage improvements—even when no evidence exists. Remove it. Use a direct value proposition, specific features, real screenshots, a concrete process and honest calls to action. If the product is pre-launch, say so.
        </p>
        <p>
          Write important copy before asking the agent to polish the layout. Content length affects hierarchy, card height, wrapping and mobile rhythm; placeholder text hides those problems until late in the build.
        </p>
      </>
    ),
  },
  {
    title: 'Add functionality in thin, testable layers',
    body: (
      <>
        <p>
          Add forms, data, authentication and payments only after the public experience is coherent. Each layer should have an explicit state model: empty, loading, success, validation error, server error and retry. For a vibe coding app, also define who owns each record and what every role can read or change.
        </p>
        <p>
          Keep credentials out of browser code. Validate input at the trusted boundary, authorise actions on the server and review database access rules. Lovable’s <a className="vibe-website-source-link" href="https://docs.lovable.dev/features/security">security documentation</a> makes the same distinction: built-in checks are useful, but they do not replace a review appropriate to the sensitivity of the app.
        </p>
      </>
    ),
  },
  {
    title: 'Use the site like a visitor, not a screenshot',
    body: (
      <>
        <p>
          A polished first viewport can still hide a broken product. Test at a desktop width and a narrow phone width. Click every primary link, submit each form, trigger errors, use the keyboard, zoom the page and watch for sideways scrolling. Check the browser console and failed network requests, but judge success by the rendered experience.
        </p>
        <div className="vibe-website-test-matrix">
          <div><span>Journey</span><strong>Can a new visitor finish the main task?</strong></div>
          <div><span>Responsive</span><strong>Does the hierarchy survive 390px and 1440px?</strong></div>
          <div><span>Keyboard</span><strong>Can every control be reached and identified?</strong></div>
          <div><span>Failure</span><strong>Are errors clear, safe and recoverable?</strong></div>
        </div>
      </>
    ),
  },
  {
    title: 'Save a known-good version before the next pass',
    body: (
      <>
        <p>
          AI iteration is fast enough to erase a working detail while fixing another. Keep changes small, review the diff and record a known-good version. If your builder supports Git sync, use a branch or pull request for meaningful changes. Lovable’s <a className="vibe-website-source-link" href="https://docs.lovable.dev/integrations/github">Git sync guide</a> explicitly positions version control as a route to backup, code review, branch testing and portability.
        </p>
        <p>
          When a change fails, describe the symptom and the expected behaviour. Ask the agent to find the underlying cause, preserve unrelated behaviour and prove the fix with the failing journey.
        </p>
      </>
    ),
  },
  {
    title: 'Finish the unglamorous launch work',
    body: (
      <>
        <p>
          Give each page a unique, descriptive title and meta description. Use one H1, semantic section headings, useful link text, descriptive alternative text and a canonical public URL. Google may use a meta description when it better represents the page, while title links can draw from several visible and metadata sources—so the on-page title and metadata should agree. See Google Search Central’s guidance on <a className="vibe-website-source-link" href="https://developers.google.com/search/docs/appearance/title-link">title links</a> and <a className="vibe-website-source-link" href="https://developers.google.com/search/docs/appearance/snippet">snippets</a>.
        </p>
        <p>
          Finally, connect the real domain, add analytics and error monitoring if appropriate, verify the production URL and retest the primary journey. Publishing is a separate step from proving that the live result works.
        </p>
      </>
    ),
  },
];

const faqs = [
  {
    question: 'Can a beginner build a website with vibe coding?',
    answer: 'Yes—especially a focused brochure site, landing page, portfolio or small workflow. The important skill is not syntax; it is defining the user, setting boundaries, recognising unsupported claims and testing every important action before publishing.',
  },
  {
    question: 'What is the best vibe coding website builder?',
    answer: 'There is no universal best choice. Pick a visual builder when hosted preview and direct editing matter most. Pick a repo-aware coding agent when you need control over an existing codebase, dependencies, testing and long-term maintenance. Confirm export, version history, responsive preview and deployment controls before committing.',
  },
  {
    question: 'How is a vibe coding website different from a vibe coding app?',
    answer: 'A website is usually content-led and optimised for discovery, trust and a small number of conversion actions. A vibe coding app is stateful: people sign in, create or change data, and expect permissions, error handling and persistence. The app needs a stricter data and security model.',
  },
  {
    question: 'Do I need to understand the generated code?',
    answer: 'You can build a first draft without reading every line, but production ownership still includes testing, security, accessibility, performance and future changes. For anything that handles money, personal data or critical decisions, involve someone qualified to review the implementation.',
  },
  {
    question: 'Can a vibe-coded website rank in search?',
    answer: 'A vibe-coded page still needs the same search foundations as any other page: useful and accurate content, crawlable links, clear headings, descriptive metadata and good performance. Generated filler and duplicated pages do not become useful merely because they were produced quickly.',
  },
];

export const metadata: Metadata = {
  title: 'How to Build a Website With Vibe Coding | DesignMCP',
  description: 'Build a distinctive vibe coding website with a practical brief, prompt template, testing loop and launch checklist for websites and web apps.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    title: 'How to Build a Website With Vibe Coding',
    description: 'A practical workflow for briefing, prompting, testing and shipping an AI-built website that still feels designed.',
    publishedTime: '2026-08-29T00:00:00.000Z',
    modifiedTime: '2026-08-29T00:00:00.000Z',
    authors: ['DesignMCP Editorial'],
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'How to Build a Website With Vibe Coding',
    description: 'A practical workflow for briefing, prompting, testing and shipping an AI-built website that still feels designed.',
    images: [],
  },
};

export default function VibeCodingWebsiteGuide() {
  return (
    <>
      <SiteHeader />
      <main className="vibe-website-page">
        <article>
          <header className="vibe-website-hero">
          <a className="vibe-website-back" href="/#resources">Resources <span aria-hidden="true">/</span> Guides</a>
          <div className="vibe-website-byline">
            <span className="vibe-website-author-mark" aria-hidden="true">DM</span>
            <p>By DesignMCP Editorial</p>
            <i aria-hidden="true">•</i>
            <time dateTime="2026-08-29">August 29, 2026</time>
            <i aria-hidden="true">•</i>
            <span>8 min read</span>
          </div>
          <h1>How to Build a Website With Vibe Coding</h1>
          <p className="vibe-website-deck">
            Turn a clear product idea into a responsive, credible vibe coding website by giving your AI better context—and reviewing the result like a product team.
          </p>
          </header>

        <section className="vibe-website-lead-frame" aria-label="The vibe coding website workflow">
          <div className="vibe-website-lead-main">
            <div className="vibe-website-lead-copy">
              <span>THE WORKING LOOP</span>
              <h2>Brief it. Build it.<br />Use it. Tighten it.</h2>
              <p>The first draft is the starting line. Quality comes from small passes with observable outcomes.</p>
            </div>
            <ol className="vibe-website-loop">
              <li><span>01</span><strong>Intent</strong><small>One user, one outcome</small></li>
              <li><span>02</span><strong>Draft</strong><small>A complete first path</small></li>
              <li><span>03</span><strong>Test</strong><small>Real actions, real widths</small></li>
              <li><span>04</span><strong>Refine</strong><small>One focused change</small></li>
            </ol>
          </div>
          <aside className="vibe-website-lead-aside" aria-label="Guide outcome">
            <span className="vibe-website-lead-icon" aria-hidden="true">D</span>
            <h2>Start with a brief, not a blank chat.</h2>
            <p>Use the copy-ready template in this guide to define the outcome, proof, visual direction and guardrails.</p>
            <a className="button" href="#prompt-template">Get the starter prompt <span aria-hidden="true">↓</span></a>
            <a className="vibe-website-quiet-link" href="#launch-checklist">Jump to the launch checklist <span aria-hidden="true">↘</span></a>
          </aside>
        </section>

        <div className="vibe-website-layout">
          <aside className="vibe-website-toc" aria-label="Table of contents">
            <p>On this page</p>
            <nav>
              {toc.map(([href, label], index) => (
                <a href={`#${href}`} key={href}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>
              ))}
            </nav>
            <div className="vibe-website-toc-note">
              <span>BEST FOR</span>
              <p>Landing pages, marketing sites, portfolios and small web apps.</p>
            </div>
          </aside>

          <div className="vibe-website-body">
            <section id="quick-answer">
              <p className="vibe-website-section-label">THE SHORT ANSWER</p>
              <h2>What is a vibe coding website?</h2>
              <p className="vibe-website-lede">
                A vibe coding website is built by describing an outcome to an AI system, reviewing the working result and refining it through conversation instead of writing every line by hand.
              </p>
              <p>
                The phrase grew from <a className="vibe-website-source-link" href="https://x.com/karpathy/status/1886192184808149383">Andrej Karpathy’s 2025 description</a> of letting an AI handle the code while he concentrated on what he could see, say and run. For a real public website, keep the speed but add the guardrails back in: a clear brief, version control, real content, browser testing, accessibility and a deliberate launch check.
              </p>
              <div className="vibe-website-callout vibe-website-callout--yellow">
                <span>THE USEFUL MINDSET</span>
                <p><strong>You own the intent and the acceptance test.</strong> The agent owns the first implementation. Neither side gets to skip verification.</p>
              </div>
            </section>

            <section id="website-or-app">
              <p className="vibe-website-section-label">CHOOSE THE RIGHT SCOPE</p>
              <h2>When your website becomes a vibe coding app</h2>
              <p>
                A marketing website communicates. An app remembers and acts. The moment visitors create accounts, save records, make payments or see private information, your build needs stronger architecture and review—not simply a longer prompt.
              </p>
              <div className="vibe-website-table-wrap" role="region" tabIndex={0} aria-label="Comparison of vibe coding websites and apps">
                <table>
                  <thead><tr><th>Question</th><th>Website</th><th>Vibe coding app</th></tr></thead>
                  <tbody>
                    <tr><th scope="row">Primary job</th><td>Explain, persuade, convert</td><td>Let a user complete a repeatable task</td></tr>
                    <tr><th scope="row">Typical state</th><td>Content, forms, preferences</td><td>Accounts, records, roles, workflows</td></tr>
                    <tr><th scope="row">Main risks</th><td>Weak content, broken links, poor discoverability</td><td>Data exposure, incorrect permissions, lost state</td></tr>
                    <tr><th scope="row">First proof</th><td>A visitor finds and completes the main CTA</td><td>One end-to-end workflow saves the correct result</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                If you are unsure, start with the public website and a waitlist or enquiry flow. You can learn what people want before committing to authentication, a database and operational complexity.
              </p>
            </section>

            <section id="before-you-prompt">
              <p className="vibe-website-section-label">PREP WORK</p>
              <h2>Five decisions to make before you prompt</h2>
              <div className="vibe-website-decision-grid">
                <div><span>01</span><h3>Who is it for?</h3><p>Name one primary visitor and the situation that brings them here.</p></div>
                <div><span>02</span><h3>What must they do?</h3><p>Choose one main action: book, buy, join, contact, compare or use.</p></div>
                <div><span>03</span><h3>Why believe you?</h3><p>List the real proof you can show—never the proof you wish you had.</p></div>
                <div><span>04</span><h3>What should it feel like?</h3><p>Pick three adjectives and two references, annotated by quality.</p></div>
                <div><span>05</span><h3>What is out of scope?</h3><p>Protect version one from accounts, integrations and decorative extras it does not need.</p></div>
              </div>
            </section>

            <section id="step-by-step">
              <p className="vibe-website-section-label">THE COMPLETE WORKFLOW</p>
              <h2>How to build a vibe coding website, step by step</h2>
              <p>
                Treat the process as a series of proofs. Each step should leave you with something observable: a decision, a working path, a test result or a recoverable version.
              </p>
              <div className="vibe-website-steps">
                {buildSteps.map((step, index) => (
                  <section className="vibe-website-step" key={step.title}>
                    <div className="vibe-website-step-number">{String(index + 1).padStart(2, '0')}</div>
                    <div>
                      <h3>{step.title}</h3>
                      {step.body}
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section id="prompt-template">
              <p className="vibe-website-section-label">COPY AND ADAPT</p>
              <h2>A prompt template that leaves less to chance</h2>
              <p>
                Replace every bracketed field. Remove any line that does not apply. For an existing repository, include the route you want and ask the agent to inspect shared components before it edits anything.
              </p>
              <div className="vibe-website-prompt">
                <div className="vibe-website-prompt-bar">
                  <div><i /><i /><i /></div>
                  <span>website-brief.txt</span>
                  <CopyPromptButton text={starterPrompt} />
                </div>
                <pre><code>{starterPrompt}</code></pre>
              </div>
            </section>

            <section id="launch-checklist">
              <p className="vibe-website-section-label">BEFORE YOU PUBLISH</p>
              <h2>The vibe coding website launch checklist</h2>
              <div className="vibe-website-launch-grid">
                <div>
                  <span>CONTENT</span>
                  <ul><li>One descriptive H1 per page</li><li>No invented customers, quotes or metrics</li><li>Real contact, pricing and policy details</li><li>Clear link and button labels</li></ul>
                </div>
                <div>
                  <span>EXPERIENCE</span>
                  <ul><li>Primary journey tested end to end</li><li>Desktop, mobile, zoom and keyboard checked</li><li>Loading, empty, success and error states</li><li>No obvious console or network failures</li></ul>
                </div>
                <div>
                  <span>TRUST</span>
                  <ul><li>Secrets kept out of client code</li><li>Inputs validated and actions authorised</li><li>Dependencies and data access reviewed</li><li>Known-good version saved before launch</li></ul>
                </div>
                <div>
                  <span>DISCOVERY</span>
                  <ul><li>Unique title and meta description</li><li>Useful alt text and semantic headings</li><li>Public URL, favicon and share metadata</li><li>Live page rechecked after publishing</li></ul>
                </div>
              </div>
            </section>

            <section id="common-mistakes">
              <p className="vibe-website-section-label">WHERE BUILDS DRIFT</p>
              <h2>Six common mistakes—and the better prompt</h2>
              <div className="vibe-website-mistakes">
                <div><span>“Make me a beautiful website.”</span><p>Define the audience, job, proof and visual constraints before asking for beauty.</p></div>
                <div><span>Generating every page at once.</span><p>Build one complete journey, test it, then expand the established system.</p></div>
                <div><span>Fixing symptoms with more UI.</span><p>Describe the failure and ask for its producer or event sequence to be traced.</p></div>
                <div><span>Accepting placeholder credibility.</span><p>Remove fictional logos, people, quotes, awards and statistics immediately.</p></div>
                <div><span>Reviewing only a screenshot.</span><p>Click, type, resize, refresh, use the keyboard and inspect failure states.</p></div>
                <div><span>Publishing the first working draft.</span><p>Save it, review security and metadata, then verify the live deployment separately.</p></div>
              </div>
            </section>

            <section id="faq">
              <p className="vibe-website-section-label">FREQUENTLY ASKED QUESTIONS</p>
              <h2>Questions about building with AI</h2>
              <div className="vibe-website-faq">
                {faqs.map((faq, index) => (
                  <details key={faq.question}>
                    <summary><span>{faq.question}</span><i aria-hidden="true">+</i></summary>
                    <p>{faq.answer}</p>
                    <span className="vibe-website-faq-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  </details>
                ))}
              </div>
            </section>

            <section className="vibe-website-sources" aria-labelledby="sources-title">
              <p className="vibe-website-section-label">RESEARCH NOTES</p>
              <h2 id="sources-title">Primary sources used for this guide</h2>
              <ul>
                <li><a href="https://x.com/karpathy/status/1886192184808149383">Andrej Karpathy — Original vibe coding post</a><span>The 2025 description that introduced the phrase and its conversational workflow.</span></li>
                <li><a href="https://docs.replit.com/build/your-first-app">Replit — Build your first app</a><span>Outcome-led prompts, explicit boundaries, preview testing and focused iteration.</span></li>
                <li><a href="https://v0.dev/docs/full-stack-apps">v0 — Full-stack apps</a><span>Incremental UI, data, feature and optimisation workflow.</span></li>
                <li><a href="https://docs.lovable.dev/features/security">Lovable — Security overview</a><span>Secrets, data access, dependencies and the limits of automated review.</span></li>
                <li><a href="https://docs.lovable.dev/integrations/github">Lovable — Git sync</a><span>Code ownership, backup, branches, review and portability.</span></li>
                <li><a href="https://developers.google.com/search/docs/appearance/title-link">Google Search Central — Title links</a><span>How clear visible and metadata titles support search presentation.</span></li>
                <li><a href="https://developers.google.com/search/docs/appearance/snippet">Google Search Central — Snippets</a><span>How page content and meta descriptions can shape a search result snippet.</span></li>
                <li><a href="https://www.w3.org/WAI/test-evaluate/preliminary/">W3C WAI — Easy accessibility checks</a><span>Keyboard access, focus, headings, alternatives and basic evaluation.</span></li>
              </ul>
            </section>

            <section className="vibe-website-related" aria-labelledby="related-title">
              <p className="vibe-website-section-label">KEEP BUILDING</p>
              <h2 id="related-title">More from the resource library</h2>
              <div>
                <a href="/#resources"><span>MCP workflows</span><h3>The component library built for coding agents</h3><i aria-hidden="true">↗</i></a>
                <a href="/#resources"><span>AI interface design</span><h3>Give AI-built interfaces a stronger point of view</h3><i aria-hidden="true">↗</i></a>
              </div>
            </section>
          </div>

          <aside className="vibe-website-rail" aria-label="Starter prompt shortcut">
            <div>
              <span className="vibe-website-rail-mark" aria-hidden="true">✦</span>
              <p>Ready to make the first pass?</p>
              <h2>Start with the prompt that protects the product.</h2>
              <CopyPromptButton text={starterPrompt} compact />
              <a href="#quick-answer">Back to the top <span aria-hidden="true">↑</span></a>
            </div>
          </aside>
        </div>

        <section className="vibe-website-end-cta grid-field">
          <div>
            <p className="eyebrow">Better ingredients for the next prompt</p>
            <h2>Give your agent<br />a stronger starting point.</h2>
            <p>DesignMCP gives coding agents polished component options, visual previews, product context and complete source.</p>
            <div>
              <a className="button" href="/#catalogue">Browse components <span aria-hidden="true">↗</span></a>
              <a className="button button--ghost" href="/#docs">Connect DesignMCP</a>
            </div>
          </div>
        </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
