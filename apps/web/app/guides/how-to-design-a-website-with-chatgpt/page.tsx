/* eslint-disable @next/next/no-html-link-for-pages -- Vinext must perform native navigation for reliable cross-route fragment scrolling. */
import type { Metadata } from 'next';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { CopyPrompt } from './copy-prompt';

const title = 'How to Design a Website With ChatGPT | DesignMCP';
const description =
  'Learn a practical ChatGPT website design workflow—from a sharp brief and visual direction to responsive code, review, and launch.';

const briefPrompt = `Act as a senior web designer and content strategist.

Project: [business, product, or idea]
Audience: [who the site is for and what they need]
Primary action: [the one action the site should drive]
Pages or sections: [required information in priority order]
Brand character: [three specific traits]
Visual references: [links, screenshots, or named qualities]
Constraints: [framework, CMS, assets, deadline, accessibility]

Before designing, identify missing decisions and ask no more than five focused questions. Then return:
1. a one-sentence creative direction;
2. the page hierarchy and purpose of each section;
3. a concise visual system (type, colour, spacing, imagery, motion);
4. risks, assumptions, and what a human must verify.`;

const buildPrompt = `Build the approved homepage in my existing project.

Use the repository's current framework, shared components, tokens, and file conventions. Do not replace working architecture or add dependencies unless they are essential.

Requirements:
- one clear H1 and semantic heading order;
- responsive layouts at 360px, 768px, and 1440px;
- keyboard-visible focus states and reduced-motion support;
- real supplied content and assets, with useful alt text;
- no placeholder links, invented claims, or decorative interactions;
- preserve performance and validate all inputs at trust boundaries.

First inspect the project and explain the route and files you will change. Then implement, run the established checks, and verify the result in a real browser on desktop and mobile. Report console errors, failed network requests, and anything that still needs human approval.`;

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: 'DesignMCP Editorial' }],
  alternates: { canonical: '/guides/how-to-design-a-website-with-chatgpt' },
  openGraph: {
    title,
    description,
    type: 'article',
    publishedTime: '2026-08-29T00:00:00.000Z',
    modifiedTime: '2026-08-29T00:00:00.000Z',
    authors: ['DesignMCP Editorial'],
    images: [],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: [],
  },
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}<span className="external-mark" aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span></a>;
}

export default function ChatGPTWebsiteDesignGuide() {
  return (
    <main className="article-page" id="top">
      <SiteHeader homeHref="/" navPrefix="/" />

      <header className="article-hero">
        <nav className="article-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><a href="/#resources">Resources</a><span aria-hidden="true">/</span><span aria-current="page">Website design</span>
        </nav>
        <div className="article-hero__meta">
          <span>Field guide</span>
          <span>13 min read</span>
          <time dateTime="2026-08-29">Updated Aug 29, 2026</time>
        </div>
        <h1>How to Design a Website With ChatGPT</h1>
        <p>
          A practical, design-led workflow for turning a precise brief into a
          responsive website people can actually use—not another generic AI template.
        </p>
        <div className="article-author">
          <span className="article-author__mark" aria-hidden="true">D</span>
          <span>By DesignMCP Editorial</span>
          <i aria-hidden="true" />
          <span>Planning, prompting, production, and QA</span>
        </div>
      </header>

      <section className="article-frame" aria-label="ChatGPT website design guide">
        <div className="article-cover grid-field">
          <div className="article-cover__copy">
            <span>01 / Brief before build</span>
            <p className="article-cover__title">Give the model a point of view.</p>
            <p>Audience, outcome, content, visual rules, constraints, and proof.</p>
          </div>
          <div className="article-cover__preview" aria-hidden="true">
            <div className="mini-browser-bar"><i /><i /><i /><span>northstar.studio</span></div>
            <div className="mini-site-copy">
              <span>Independent design practice</span>
              <strong>Make useful things feel inevitable.</strong>
              <i>Start a project&nbsp; ↗</i>
            </div>
            <div className="mini-prompt-card">
              <span>Direction</span>
              <p>Editorial, assured, tactile. No stock gradients.</p>
            </div>
          </div>
        </div>

        <aside className="article-frame__aside">
          <span className="article-aside__mark" aria-hidden="true">D</span>
          <p className="article-aside__eyebrow">DesignMCP</p>
          <p className="article-aside__title">Build with better ingredients.</p>
          <p>Give your coding agent polished components, complete source, and the context to choose well.</p>
          <a className="button" href="/#catalogue">Browse components <span aria-hidden="true">↗</span></a>
          <a className="article-aside__link" href="/#how-it-works">See how it works <span aria-hidden="true">→</span></a>
        </aside>

        <article className="article-body">
          <p className="article-lede">
            If you want ChatGPT to build a website, use it as a design and engineering
            collaborator—not a one-click substitute for judgment. A strong ChatGPT website
            design process can accelerate research, information architecture, copy, visual
            exploration, code, and critique while you set the direction, supply the truth,
            and decide what is ready to ship.
          </p>

          <section className="article-answer" id="what-chatgpt-can-do" aria-labelledby="what-chatgpt-can-do-heading">
            <span>Short answer</span>
            <h2 id="what-chatgpt-can-do-heading">Can ChatGPT build a website?</h2>
            <p>
              Yes. It can create and refine website code, work inside a compatible existing
              project, or use ChatGPT Sites to create, host, and share a site. The right path
              depends on how much control, custom functionality, and ongoing engineering your
              project needs.
            </p>
          </section>

          <section className="article-section" aria-labelledby="choose-path">
            <p className="article-step">01 · Choose the working mode</p>
            <h2 id="choose-path">Decide how ChatGPT should help before you prompt it.</h2>
            <p>
              Search results often collapse planning, visual design, code generation, and hosting
              into one promise. They are separate jobs. Pick the lane that matches the outcome.
            </p>

            <div className="path-grid">
              <div>
                <span>Fastest start</span>
                <h3>ChatGPT Sites</h3>
                <p>Best for focused websites, prototypes, internal tools, dashboards, and lightweight apps when Sites is available on your account.</p>
                <ul>
                  <li>Prompt-to-preview workflow</li>
                  <li>Managed hosting and sharing</li>
                  <li>Refine through conversation</li>
                </ul>
              </div>
              <div>
                <span>Most control</span>
                <h3>Codex + an existing project</h3>
                <p>Best when you already have a repository, design system, framework, tests, deployment process, or complex product behavior.</p>
                <ul>
                  <li>Works with project conventions</li>
                  <li>Reviewable source changes</li>
                  <li>Real browser and build checks</li>
                </ul>
              </div>
              <div>
                <span>Lightweight</span>
                <h3>Chat-generated code</h3>
                <p>Best for learning, one-off static pages, or producing a portable HTML/CSS/JavaScript starting point you will host elsewhere.</p>
                <ul>
                  <li>Simple, portable files</li>
                  <li>Easy to inspect and learn from</li>
                  <li>You own hosting and QA</li>
                </ul>
              </div>
            </div>

            <div className="source-note">
              <span aria-hidden="true">↗</span>
              <p>
                Current capability note: OpenAI describes Sites as a public-beta workflow for
                creating, hosting, refining, and sharing websites, web apps, and games. It is listed
                for Plus, Pro, Business, Enterprise, and Edu plans, with plan-specific usage limits.
                Every deployment URL is production, so save and review a version before publishing.
                See the <ExternalLink href="https://learn.chatgpt.com/docs/sites">official OpenAI Sites documentation</ExternalLink>.
              </p>
            </div>
          </section>

          <section className="article-section" aria-labelledby="write-brief">
            <p className="article-step">02 · Write the brief</p>
            <h2 id="write-brief">Start with decisions, not adjectives.</h2>
            <p>
              “Modern, clean, and professional” describes almost every generic template. A useful
              brief tells ChatGPT who must be persuaded, what they should do, which content is true,
              and which constraints cannot move.
            </p>

            <div className="brief-anatomy" aria-label="Six parts of a useful website brief">
              <div><span>01</span><strong>Audience</strong><p>Who arrives, what they know, and what is making them hesitate.</p></div>
              <div><span>02</span><strong>Outcome</strong><p>The single action or understanding the page should create.</p></div>
              <div><span>03</span><strong>Content</strong><p>Real claims, proof, offers, objections, and required information.</p></div>
              <div><span>04</span><strong>Character</strong><p>Specific traits such as precise, warm, editorial—not vague “premium.”</p></div>
              <div><span>05</span><strong>References</strong><p>What to learn from each example: rhythm, type, density, motion, or tone.</p></div>
              <div><span>06</span><strong>Constraints</strong><p>Stack, breakpoints, CMS, accessibility, performance, and delivery rules.</p></div>
            </div>

            <CopyPrompt label="Website strategy prompt">{briefPrompt}</CopyPrompt>
            <p className="article-caption">
              Ask for questions first. It is cheaper to correct an assumption in the brief than in a finished interface.
            </p>
          </section>

          <section className="article-section" aria-labelledby="shape-structure">
            <p className="article-step">03 · Shape the page</p>
            <h2 id="shape-structure">Turn the visitor&apos;s decision into a content hierarchy.</h2>
            <p>
              Do not begin with a list of fashionable sections. Begin with the questions a visitor
              needs answered in order. A landing page often has to establish relevance, explain the
              mechanism, prove the claim, reduce risk, and make the next step obvious.
            </p>

            <div className="decision-flow" aria-label="Recommended landing page decision flow">
              <div><span>01</span><p><strong>Relevance</strong> Is this for me?</p></div>
              <i aria-hidden="true">→</i>
              <div><span>02</span><p><strong>Value</strong> Why should I care?</p></div>
              <i aria-hidden="true">→</i>
              <div><span>03</span><p><strong>Proof</strong> Why believe it?</p></div>
              <i aria-hidden="true">→</i>
              <div><span>04</span><p><strong>Action</strong> What happens next?</p></div>
            </div>

            <h3>Make ChatGPT defend the outline.</h3>
            <p>
              Ask it to state the job of every section in one sentence and remove anything that does
              not help the primary audience decide. Then write the content before polishing the visual
              surface. Layout cannot rescue a page with no argument.
            </p>
          </section>

          <section className="article-section" aria-labelledby="visual-direction">
            <p className="article-step">04 · Direct the visual system</p>
            <h2 id="visual-direction">Describe relationships, not just colours.</h2>
            <p>
              ChatGPT responds better when visual references come with an explanation. “Use this site”
              invites imitation. “Use its generous headline scale, framed article body, restrained
              palette, and sticky utility rail—but keep our brand and content” identifies reusable
              principles without copying someone else&apos;s work.
            </p>

            <div className="direction-pair">
              <div className="direction-card direction-card--weak">
                <span>Too vague</span>
                <p>“Make it sleek, premium, and futuristic with a purple gradient.”</p>
              </div>
              <div className="direction-card direction-card--strong">
                <span>Useful direction</span>
                <p>“Editorial confidence, warm paper tones, compact mono labels, oversized type, visible grid logic, and motion only where it clarifies state.”</p>
              </div>
            </div>

            <h3>Give it components with a point of view.</h3>
            <p>
              A model is more consistent when it can reuse proven primitives instead of inventing every
              card, menu, input, and animation from scratch. A curated component source such as
              <a href="/#catalogue"> DesignMCP&apos;s catalogue</a> gives a coding agent visual previews,
              implementation context, and complete source to adapt to the product.
            </p>
          </section>

          <section className="article-section" aria-labelledby="build-stages">
            <p className="article-step">05 · Build in stages</p>
            <h2 id="build-stages">Ask for a coherent first slice, then iterate with evidence.</h2>
            <p>
              A one-shot request can produce a complete-looking page while hiding wrong assumptions,
              brittle code, and broken mobile behavior. Build the smallest representative viewport
              first. Confirm the direction in a browser. Then complete the remaining sections, states,
              and breakpoints.
            </p>

            <ol className="build-sequence">
              <li><span>01</span><div><strong>Inspect</strong><p>Find the correct route, shared components, tokens, metadata pattern, and established checks.</p></div></li>
              <li><span>02</span><div><strong>Implement the slice</strong><p>Build the header, hero, primary action, and one representative content treatment.</p></div></li>
              <li><span>03</span><div><strong>Review the direction</strong><p>Check actual content, hierarchy, spacing, contrast, and behavior in the rendered page.</p></div></li>
              <li><span>04</span><div><strong>Complete and verify</strong><p>Finish responsive states, interactions, metadata, links, performance, and browser QA.</p></div></li>
            </ol>

            <CopyPrompt label="Production build prompt">{buildPrompt}</CopyPrompt>
          </section>

          <section className="article-section" aria-labelledby="review-output">
            <p className="article-step">06 · Review the output</p>
            <h2 id="review-output">Critique the website like a designer and test it like a developer.</h2>
            <p>
              “Looks good” is not a test. Review the page at the level where visitors experience it,
              and ask ChatGPT to fix the underlying rule rather than patching one screenshot.
            </p>

            <div className="review-grid">
              <div><span aria-hidden="true">A</span><h3>Content</h3><ul><li>Claims are sourced and current</li><li>Headings form a useful outline</li><li>Labels say what actions do</li><li>No placeholders or invented proof</li></ul></div>
              <div><span aria-hidden="true">B</span><h3>Visual system</h3><ul><li>Hierarchy is clear without decoration</li><li>Spacing follows a repeatable rhythm</li><li>Type and colour fit the brand</li><li>Mobile is composed, not compressed</li></ul></div>
              <div><span aria-hidden="true">C</span><h3>Interaction</h3><ul><li>Keyboard focus is visible</li><li>Controls have usable names</li><li>Motion explains state and can reduce</li><li>Touch targets have breathing room</li></ul></div>
              <div><span aria-hidden="true">D</span><h3>Engineering</h3><ul><li>Links and forms really work</li><li>Console and network are clean</li><li>Images do not shift the layout</li><li>Inputs and trust boundaries validate</li></ul></div>
            </div>

            <div className="article-quote">
              <p>Do not prompt “make mobile better.” Say what failed: “At 360px the CTA wraps under the navigation and the headline leaves one orphaned word. Preserve the hierarchy, reduce the type scale smoothly, and keep both actions reachable.”</p>
            </div>
          </section>

          <section className="article-section" aria-labelledby="launch-checklist">
            <p className="article-step">07 · Launch deliberately</p>
            <h2 id="launch-checklist">A ChatGPT-built website still needs human approval.</h2>
            <p>
              Generated output is not proof that a claim is true, a photograph is licensed, a
              tracking setup is lawful, or a business process is ready for public traffic. Treat
              generation as a capable draft and the launch as your responsibility.
            </p>

            <div className="launch-list">
              <div><span>✓</span><p><strong>Content</strong> Fact-check names, prices, dates, policies, testimonials, and contact details.</p></div>
              <div><span>✓</span><p><strong>SEO</strong> Confirm one descriptive H1, a useful title and meta description, indexable content, canonical URLs, and share previews where supported.</p></div>
              <div><span>✓</span><p><strong>Accessibility</strong> Test keyboard flow, focus, landmarks, labels, contrast, zoom, reduced motion, and meaningful image alternatives.</p></div>
              <div><span>✓</span><p><strong>Responsive behavior</strong> Check real content at narrow mobile, tablet, laptop, and wide desktop sizes.</p></div>
              <div><span>✓</span><p><strong>Functionality</strong> Submit forms safely, follow every link, test empty/error states, and confirm integrations in the intended environment.</p></div>
              <div><span>✓</span><p><strong>Performance and privacy</strong> Compress assets, remove unnecessary scripts, protect secrets, disclose data collection, and use the narrowest permissions.</p></div>
            </div>

            <div className="warning-card">
              <span>Know the boundary</span>
              <h3>Do not turn a prototype into a high-risk product by accident.</h3>
              <p>
                Authentication, payments, personal data, medical or financial workflows, and
                user-generated content introduce security, privacy, legal, and operational work. Use
                qualified review and a platform that supports the full requirement. OpenAI&apos;s current
                Sites documentation also lists unsupported uses and runtime limits; check it before you publish.
              </p>
            </div>
          </section>

          <section className="article-section article-faq" aria-labelledby="faq">
            <p className="article-step">08 · Common questions</p>
            <h2 id="faq">ChatGPT website design FAQ</h2>
            <details>
              <summary>Can ChatGPT build a complete website?</summary>
              <p>Yes, for many focused sites. ChatGPT can generate the content and code, Codex can implement work in a compatible repository, and ChatGPT Sites can create and host supported experiences. Complex commerce, regulated data, custom infrastructure, and large products still need appropriate engineering and specialist review.</p>
            </details>
            <details>
              <summary>Do I need to know how to code?</summary>
              <p>Not for every path. A hosted prompt-to-site workflow can produce a useful result without manual coding. Basic knowledge helps you judge generated code, while an existing production repository should be reviewed by someone who understands its architecture, security, and deployment process.</p>
            </details>
            <details>
              <summary>What is the best prompt for ChatGPT to build a website?</summary>
              <p>The best prompt is a structured brief: audience, primary outcome, real content, page hierarchy, visual character, references, technical constraints, and verification requirements. Use the copyable prompts in this guide as a starting point and replace every bracketed assumption.</p>
            </details>
            <details>
              <summary>How do I stop an AI-generated website looking generic?</summary>
              <p>Use distinctive source material, explain why references work, define a small visual system, reuse strong components, and critique the rendered result. Remove default gradients, empty feature-card grids, invented social proof, and motion that does not communicate state.</p>
            </details>
            <details>
              <summary>Is ChatGPT Sites available to everyone?</summary>
              <p>No. OpenAI currently describes Sites as a public beta for Plus, Pro, Business, Enterprise, and Edu plans, with plan-specific usage limits. Workspace settings can also affect how a Site is shared. Check the <ExternalLink href="https://learn.chatgpt.com/docs/sites">current Sites documentation</ExternalLink> before choosing this path.</p>
            </details>
          </section>

          <section className="article-related" aria-labelledby="keep-exploring">
            <p className="article-step">Continue designing</p>
            <h2 id="keep-exploring">Keep exploring DesignMCP</h2>
            <div className="article-related__grid">
              <a href="/#catalogue">
                <span>Component catalogue</span>
                <h3>Browse interface patterns by product intent</h3>
              </a>
              <a href="/#how-it-works">
                <span>MCP workflow</span>
                <h3>See what your coding agent receives</h3>
              </a>
            </div>
          </section>

          <section className="article-conclusion">
            <p className="article-step">The principle to keep</p>
            <h2>Use ChatGPT for range and speed. Keep judgment in the loop.</h2>
            <p>
              The durable advantage is not a magic prompt. It is a clear sequence: understand the
              visitor, commit to a direction, build from reliable primitives, inspect the real page,
              and refine the rule that caused the problem.
            </p>
            <div>
              <a className="button" href="/#catalogue">Explore the component catalogue <span aria-hidden="true">↗</span></a>
              <a className="article-text-button" href="/#how-it-works">How DesignMCP works <span aria-hidden="true">→</span></a>
            </div>
          </section>
        </article>

        <aside className="article-rail" aria-label="On this page">
          <div className="article-rail__inner">
            <p>On this page</p>
            <nav>
              <a href="#what-chatgpt-can-do">What ChatGPT can do</a>
              <a href="#choose-path">Choose your path</a>
              <a href="#write-brief">Write the brief</a>
              <a href="#shape-structure">Shape the page</a>
              <a href="#visual-direction">Direct the visuals</a>
              <a href="#build-stages">Build in stages</a>
              <a href="#review-output">Review the output</a>
              <a href="#launch-checklist">Launch checklist</a>
              <a href="#faq">FAQ</a>
            </nav>
            <div className="article-rail__note">
              <span>Better inputs, better interface</span>
              <p>Search by product intent. Give your agent the component source and context to finish the job.</p>
              <a href="/#catalogue">Browse DesignMCP <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </aside>
      </section>

      <SiteFooter linkPrefix="/" />
    </main>
  );
}
