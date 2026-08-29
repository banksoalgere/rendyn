import type { Metadata } from 'next';
import Link from 'next/link';
import { FinalCallToAction, SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { CopyTemplate } from './copy-template';

export const metadata: Metadata = {
  title: 'Best Claude Code Templates: 6 Practical Picks (2026)',
  description: 'Compare the best Claude Code templates for project instructions, skills, agents, plugins and website UI—plus a safe starter CLAUDE.md.',
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    title: 'Best Claude Code Templates: 6 Practical Picks (2026)',
    description: 'A practical comparison of Claude Code templates, from CLAUDE.md foundations to reusable skills and website UI resources.',
    authors: ['DesignMCP editorial'],
    images: ['/og.png'],
    modifiedTime: '2026-08-29',
    publishedTime: '2026-08-29',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Claude Code Templates: 6 Practical Picks (2026)',
    description: 'A practical comparison of Claude Code templates, skills, agents, plugins and website UI resources.',
    images: ['/og.png'],
  },
};

const picks = [
  {
    number: '01',
    label: 'Best default',
    name: 'A tailored CLAUDE.md + rules',
    source: 'Anthropic documentation',
    href: 'https://code.claude.com/docs/en/features-overview',
    summary: 'The right starting point for build commands, architecture, conventions and constraints Claude should know in every session.',
    fit: 'Established repositories and teams',
    format: 'Markdown',
    strength: 'Small, native and easy to review',
    limitation: 'Instructions guide behaviour; they do not enforce a hard security boundary.',
  },
  {
    number: '02',
    label: 'Best official skill starter',
    name: 'Anthropic Agent Skills',
    source: 'anthropics/skills',
    href: 'https://github.com/anthropics/skills',
    summary: 'Official examples and a minimal SKILL.md template for repeatable workflows, reference material and task-specific expertise.',
    fit: 'Workflows you reuse but do not need always loaded',
    format: 'SKILL.md + optional resources',
    strength: 'Clear structure and progressive disclosure',
    limitation: 'The repository is educational; test examples and check each item’s licence before critical use.',
  },
  {
    number: '03',
    label: 'Best official install route',
    name: 'Claude plugin marketplace',
    source: 'Claude Code plugins',
    href: 'https://code.claude.com/docs/en/discover-plugins',
    summary: 'Anthropic’s built-in discovery route for installable plugins that can bundle skills, agents, hooks, MCP servers and code intelligence.',
    fit: 'Supported integrations and shareable bundles',
    format: 'Versioned plugin',
    strength: 'Upstream-aligned discovery and updates',
    limitation: 'A marketplace listing is not a security guarantee; inspect permissions, hooks, MCP servers and scripts.',
  },
  {
    number: '04',
    label: 'Best broad catalogue',
    name: 'Claude Code Templates / aitmpl',
    source: 'davila7/claude-code-templates',
    href: 'https://github.com/davila7/claude-code-templates',
    summary: 'A large community catalogue with component-level browsing and installation across agents, skills, hooks, settings, MCPs and commands.',
    fit: 'Exploring a wide range of configurations',
    format: 'CLI-installed components',
    strength: 'Breadth and a consistent discovery path',
    limitation: 'Treat the installer and every selected component as third-party code; review before running.',
  },
  {
    number: '05',
    label: 'Best research index',
    name: 'Awesome Claude Code',
    source: 'hesreallyhim/awesome-claude-code',
    href: 'https://github.com/hesreallyhim/awesome-claude-code',
    summary: 'A curated map of skills, agents, tooling, plugins and configuration projects when you want to survey the ecosystem before choosing.',
    fit: 'Discovery and comparison',
    format: 'Linked directory',
    strength: 'Useful coverage without forcing one installer',
    limitation: 'Each linked project has separate maintenance, provenance, permissions and licensing.',
  },
  {
    number: '06',
    label: 'Best website workflow',
    name: 'Web Design skill',
    source: 'xiaopu-ai/web-design',
    href: 'https://github.com/xiaopu-ai/web-design',
    summary: 'A focused, spec-first skill that can turn a brief, URL or screenshot into an editable design specification, code and an audit loop.',
    fit: 'Creating or translating visual direction',
    format: 'Claude Code skill',
    strength: 'Separates design intent from implementation',
    limitation: 'It is a young community project with crawler and image-fetching scripts that deserve inspection.',
  },
];

const starter = `# Project guide

## Product
- Purpose: [one sentence]
- Users: [primary audience]
- Non-goals: [what this project deliberately does not do]

## Architecture
- App entry: [path]
- Shared UI: [path]
- Data boundary: [path or service]
- Prefer existing patterns before introducing abstractions.

## Commands
- Install: [command]
- Develop: [command]
- Test: [command]
- Build: [command]

## Working agreement
- Validate external input at the system boundary.
- Never read, print, edit or commit secrets or environment files.
- Preserve unrelated working-tree changes.
- Keep changes scoped; explain any necessary expansion first.
- Add focused tests for changed behaviour using existing patterns.
- Report the route or behaviour tested and any remaining uncertainty.

## Definition of done
- Requested behaviour works from the user-facing surface.
- Relevant tests and the production build pass.
- Accessibility and responsive states are checked for UI work.`;

const toc = [
  ['comparison', 'Quick picks'],
  ['meaning', 'What “template” means'],
  ['criteria', 'How we chose'],
  ['reviews', 'Detailed reviews'],
  ['starter', 'Starter CLAUDE.md'],
  ['website-templates', 'Website templates'],
  ['safety', 'Safe adoption'],
  ['faq', 'Questions answered'],
];

export default function BestClaudeCodeTemplatesPage() {
  return (
    <div className="editorial-page" id="top">
      <SiteHeader activeSection="resources" homeHref="/" />
      <main>
        <article>
        <header className="editorial-hero section-shell">
          <div className="editorial-meta">
            <span>By DesignMCP editorial</span>
            <i aria-hidden="true">•</i>
            <time dateTime="2026-08-29">Updated August 29, 2026</time>
            <i aria-hidden="true">•</i>
            <span>12 min read</span>
          </div>
          <p className="eyebrow">Field guide / Claude Code</p>
          <h1>Best Claude Code Templates</h1>
          <p className="editorial-deck">Six genuinely useful starting points for project instructions, reusable skills, specialist agents and better Claude-built websites—compared by scope, safety, maintainability and speed to first value.</p>
        </header>

        <section className="editorial-summary section-shell" aria-labelledby="short-answer-heading">
          <div className="editorial-summary-art grid-field" aria-hidden="true">
            <div className="template-orbit template-orbit--one" />
            <div className="template-orbit template-orbit--two" />
            <span>CLAUDE.md</span>
            <span>SKILL.md</span>
            <span>agents/</span>
            <small>Choose by job, not by size</small>
          </div>
          <div className="editorial-summary-copy">
            <p className="editorial-label">The short answer</p>
            <h2 id="short-answer-heading">Start with the smallest template that fixes a repeated problem.</h2>
            <p>Use <code>CLAUDE.md</code> for always-on project context, a skill for a repeatable workflow, a subagent for isolated specialist work, and a plugin only when the bundle needs to travel between projects or teams.</p>
            <a href="#comparison">See the six picks <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <div className="editorial-layout section-shell">
          <aside className="editorial-sidebar" aria-label="Article tools">
            <div className="sidebar-card sidebar-card--toc">
              <p>In this guide</p>
              <nav aria-label="Table of contents">
                {toc.map(([href, label], index) => (
                  <a href={`#${href}`} key={href}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{label}</a>
                ))}
              </nav>
            </div>
            <div className="sidebar-card sidebar-card--cta">
              <span className="sidebar-mark" aria-hidden="true">D</span>
              <p>Better ingredients for AI-built interfaces.</p>
              <small>Give your coding agent polished components, visual previews and complete source.</small>
              <Link className="button" href="/#catalogue">Browse DesignMCP <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="sidebar-research"><i aria-hidden="true" /> <time dateTime="2026-08-29">Current as of August 2026</time></div>
          </aside>

          <div className="editorial-body">
            <section className="article-section article-intro" aria-labelledby="overview-heading">
              <p className="article-overline">The practical view</p>
              <h2 id="overview-heading">The best Claude Code templates are systems, not magic prompts.</h2>
              <p className="article-lede">The phrase can mean a project instruction file, a reusable workflow, a specialist agent, an automation hook, an integration bundle or an entire starter repository. That ambiguity is why giant “ultimate” setups often disappoint: they solve a different layer than the one slowing your project down.</p>
              <p>Our default recommendation is deliberately unglamorous. Begin with a short, repository-specific <code>CLAUDE.md</code>. Add a skill after a workflow repeats. Add a hook when a deterministic action must fire every time. Reach for a plugin only when the tested bundle is worth distributing. This matches <a href="https://code.claude.com/docs/en/features-overview">Anthropic’s current extension guidance</a>.</p>
              <div className="editorial-callout">
                <span aria-hidden="true">✦</span>
                <p><strong>One important update:</strong> custom commands now live under the skills model. Existing <code>.claude/commands/</code> files still work, but Anthropic recommends skills for new workflows because they can include supporting files and load when relevant.</p>
              </div>
            </section>

            <section className="article-section" id="comparison" aria-labelledby="comparison-heading">
              <div className="article-heading-row">
                <div>
                  <p className="article-overline">At a glance</p>
                  <h2 id="comparison-heading">Six useful picks, each for a different job</h2>
                </div>
                <time className="research-stamp" dateTime="2026-08-29">Reviewed 29.08.26</time>
              </div>
              <div aria-label="Template comparison" className="comparison-table-wrap" role="region" tabIndex={0}>
                <table className="template-table">
                  <caption>Best Claude Code template approaches and resources by use case</caption>
                  <thead>
                    <tr><th scope="col">Pick</th><th scope="col">Best for</th><th scope="col">Format</th></tr>
                  </thead>
                  <tbody>
                    {picks.map((pick) => (
                      <tr key={pick.number}>
                        <th scope="row"><span aria-hidden="true">{pick.number}</span><a href={`#pick-${pick.number}`}>{pick.name}</a></th>
                        <td>{pick.fit}</td>
                        <td>{pick.format}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="table-note">We rank fit, inspectability and maintainability—not stars, download counters or self-reported “verified” badges.</p>
            </section>

            <section className="article-section" id="meaning" aria-labelledby="meaning-heading">
              <p className="article-overline">The taxonomy</p>
              <h2 id="meaning-heading">What are Claude Code templates?</h2>
              <p>There is no official <code>.claude/templates/</code> folder. “Claude templates” is an ecosystem label for several reusable layers. Pick the layer that owns the behaviour you want:</p>
              <div className="type-grid">
                <article><span>Always on</span><h3>CLAUDE.md + rules</h3><p>Project context, commands, architecture and conventions. Path-scoped rules keep specialist guidance out of unrelated work.</p></article>
                <article><span>On demand</span><h3>Skills</h3><p>Repeatable prompts, checklists, knowledge and multi-step workflows stored in a <code>SKILL.md</code>.</p></article>
                <article><span>Isolated</span><h3>Subagents</h3><p>Focused workers with their own context and tool access—useful when research or logs would swamp the main conversation.</p></article>
                <article><span>Deterministic</span><h3>Hooks + settings</h3><p>Event-driven scripts and permissions for checks or boundaries that should not depend on model judgement.</p></article>
                <article><span>Connected</span><h3>MCP configuration</h3><p>Live access to external systems such as source control, databases, browsers and design tools.</p></article>
                <article><span>Distributed</span><h3>Plugins</h3><p>Versioned bundles of skills, agents, hooks, MCP servers and related assets that can travel between projects.</p></article>
              </div>
            </section>

            <section className="article-section" id="criteria" aria-labelledby="criteria-heading">
              <p className="article-overline">Selection criteria</p>
              <h2 id="criteria-heading">How we chose the shortlist</h2>
              <p>We read the current Anthropic documentation first, then inspected primary repositories and live discovery surfaces. A resource moved up the list when it was easy to understand before installation and narrow enough to adapt.</p>
              <ol className="criteria-list">
                <li><span aria-hidden="true">01</span><div><strong>Current fit</strong><p>Uses modern Claude Code concepts, paths and terminology rather than deprecated conventions.</p></div></li>
                <li><span aria-hidden="true">02</span><div><strong>Inspectable source</strong><p>Lets you read the Markdown, JSON and scripts that will influence or execute on your machine.</p></div></li>
                <li><span aria-hidden="true">03</span><div><strong>Narrow authority</strong><p>Requests only the tools and permissions its job requires, with clear limits and human checkpoints.</p></div></li>
                <li><span aria-hidden="true">04</span><div><strong>Adaptability</strong><p>Encourages project-specific commands, architecture and verification instead of generic persona theatre.</p></div></li>
                <li><span aria-hidden="true">05</span><div><strong>Maintenance evidence</strong><p>Has understandable ownership, recent work, documentation and limitations—but no popularity metric substitutes for review.</p></div></li>
                <li><span aria-hidden="true">06</span><div><strong>Production discipline</strong><p>For website starters: sensible dependencies, accessibility, responsive behaviour and a real build path.</p></div></li>
              </ol>
            </section>

            <section className="article-section" id="reviews" aria-labelledby="reviews-heading">
              <p className="article-overline">The reviews</p>
              <h2 id="reviews-heading">The best resources, in detail</h2>
              <div className="pick-list">
                {picks.map((pick) => (
                  <article className="pick-card" id={`pick-${pick.number}`} key={pick.number}>
                    <div aria-hidden="true" className="pick-card-number">{pick.number}</div>
                    <div className="pick-card-content">
                      <div className="pick-card-topline"><span>{pick.label}</span><span>{pick.format}</span></div>
                      <h3>{pick.name}</h3>
                      <p className="pick-summary">{pick.summary}</p>
                      <dl>
                        <div><dt>Best fit</dt><dd>{pick.fit}</dd></div>
                        <div><dt>Why it stands out</dt><dd>{pick.strength}</dd></div>
                        <div><dt>Watch for</dt><dd>{pick.limitation}</dd></div>
                      </dl>
                      <a className="source-link" href={pick.href}>Inspect {pick.source} <span aria-hidden="true">↗</span></a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="article-section" id="starter" aria-labelledby="starter-heading">
              <p className="article-overline">Copy, then tailor</p>
              <h2 id="starter-heading">A lean CLAUDE.md starter</h2>
              <p>This starter is intentionally short. Replace every bracketed value, remove irrelevant rules and add only conventions Claude repeatedly misses. Never use prompt instructions as the sole protection for secrets or dangerous actions—configure permissions or hooks when a boundary must be enforced.</p>
              <div className="starter-card">
                <div className="starter-toolbar"><span>CLAUDE.md</span><CopyTemplate value={starter} /></div>
                <pre><code>{starter}</code></pre>
              </div>
              <div className="starter-aftercare">
                <h3>Make it yours in three passes</h3>
                <ol>
                  <li><span aria-hidden="true">1</span><p><strong>Replace placeholders.</strong> Real paths and commands beat broad advice.</p></li>
                  <li><span aria-hidden="true">2</span><p><strong>Delete generic rules.</strong> Every always-on line spends attention; keep only project truth.</p></li>
                  <li><span aria-hidden="true">3</span><p><strong>Promote repeated procedures.</strong> Move long workflows into skills and enforced boundaries into permissions or hooks.</p></li>
                </ol>
              </div>
            </section>

            <section className="article-section" id="website-templates" aria-labelledby="website-heading">
              <p className="article-overline">For visual projects</p>
              <h2 id="website-heading">Claude website templates: skill, starter or design system?</h2>
              <p className="article-lede">“Claude website templates” usually hides three different needs: a fresh codebase, a reusable design process, or good components inside an existing product. Choosing the wrong one creates more cleanup than momentum.</p>
              <div className="website-choice-grid">
                <article className="website-choice website-choice--purple">
                  <span>New project</span><h3>Use a code starter</h3>
                  <p>Choose this when you genuinely need framework, routing, dependencies and deployment conventions. Inspect the full stack before inheriting it.</p>
                  <small>Example to inspect: <a href="https://github.com/textura-agency/next16-claude-starter">next16-claude-starter ↗</a></small>
                </article>
                <article className="website-choice website-choice--mint">
                  <span>Visual brief</span><h3>Use a design skill</h3>
                  <p>Best when you have a screenshot, URL or product brief and need a repeatable specification-to-code workflow without replacing the repo.</p>
                  <small>Our pick: <a href="#pick-06">Web Design skill ↓</a></small>
                </article>
                <article className="website-choice website-choice--peach">
                  <span>Existing product</span><h3>Use the design system</h3>
                  <p>Preserve the architecture. Give Claude proven components, visual previews and implementation context rather than a second competing scaffold.</p>
                  <small>Explore: <Link href="/#catalogue">DesignMCP components ↗</Link></small>
                </article>
              </div>
              <p><a href="https://code.claude.com/docs/en/best-practices">Anthropic’s workflow guidance</a> supports screenshots and mockups as visual context, while <a href="https://code.claude.com/docs/en/desktop">Claude Code Desktop previews</a> can run an app, inspect its DOM and iterate in an embedded browser. The durable advantage is not the screenshot itself; it is pairing visual intent with the existing product’s constraints and verifying the result in a real browser.</p>
            </section>

            <section className="article-section" id="safety" aria-labelledby="safety-heading">
              <div className="safety-panel">
                <p className="article-overline">Before you install</p>
                <h2 id="safety-heading">A five-minute safe adoption check</h2>
                <p>Templates can influence tool use; hooks, MCP servers and installers can execute code. “Markdown” does not automatically mean harmless.</p>
                <ul>
                  <li><span aria-hidden="true">✓</span><p>Read every instruction, executable script, hook and MCP command.</p></li>
                  <li><span aria-hidden="true">✓</span><p>Check requested tools, permission mode, environment access and network destinations.</p></li>
                  <li><span aria-hidden="true">✓</span><p>Inspect dependency and lockfile changes before accepting them.</p></li>
                  <li><span aria-hidden="true">✓</span><p>Pin or review updates for shared plugins; do not rely on popularity counters.</p></li>
                  <li><span aria-hidden="true">✓</span><p>Try third-party configurations in a disposable repository with no secrets first.</p></li>
                  <li><span aria-hidden="true">✓</span><p>Keep human review around destructive, release, payment and production actions.</p></li>
                </ul>
                <a href="https://code.claude.com/docs/en/security">Read Claude Code security guidance <span aria-hidden="true">↗</span></a>
              </div>
            </section>

            <section className="article-section" id="faq" aria-labelledby="faq-heading">
              <p className="article-overline">Questions answered</p>
              <h2 id="faq-heading">Claude template FAQ</h2>
              <div className="faq-list">
                <details>
                  <summary>Does Claude Code have an official templates folder?<span aria-hidden="true">+</span></summary>
                  <p>No. Current project customisation uses specific locations such as <code>CLAUDE.md</code>, <code>.claude/rules/</code>, <code>.claude/skills/</code>, <code>.claude/agents/</code>, settings and <code>.mcp.json</code>. “Template” is a useful ecosystem label, not a native folder name.</p>
                </details>
                <details>
                  <summary>What is the difference between CLAUDE.md and a skill?<span aria-hidden="true">+</span></summary>
                  <p><code>CLAUDE.md</code> loads every session and should hold concise project truths. A skill loads on demand or when relevant and is better for procedures, checklists and reference material.</p>
                </details>
                <details>
                  <summary>Where should personal and project Claude templates live?<span aria-hidden="true">+</span></summary>
                  <p>Put shared project configuration in the repository. Personal configuration belongs under <code>~/.claude/</code>. Use project scope when teammates need the same behaviour, and personal scope for preferences that should follow you between projects.</p>
                </details>
                <details>
                  <summary>Are third-party Claude templates safe to install?<span aria-hidden="true">+</span></summary>
                  <p>Do not assume so. Read the source and inspect scripts, hooks, MCP servers, permissions and dependencies. Test unfamiliar bundles away from secrets and production access.</p>
                </details>
                <details>
                  <summary>Can Claude Code build a website from a screenshot?<span aria-hidden="true">+</span></summary>
                  <p>A screenshot can provide visual context, and Claude Code can help translate it into HTML and CSS. Quality still depends on product context, interaction states, accessibility, responsiveness and browser verification—not visual resemblance alone.</p>
                </details>
                <details>
                  <summary>Should I use a Claude website template for an existing app?<span aria-hidden="true">+</span></summary>
                  <p>Usually not as a wholesale scaffold. Preserve the app’s architecture and give Claude the existing design system, components and constraints. A focused design skill can add a repeatable workflow without creating a competing stack.</p>
                </details>
              </div>
            </section>

            <section className="article-section" aria-labelledby="related-heading">
              <p className="article-overline">Keep reading</p>
              <h2 id="related-heading">Related guides and references</h2>
              <div className="related-guides">
                <a href="https://code.claude.com/docs/en/best-practices">
                  <span>Claude Code docs</span>
                  <h3>Best practices for working with Claude Code</h3>
                  <i aria-hidden="true">↗</i>
                </a>
                <a href="https://code.claude.com/docs/en/common-workflows">
                  <span>Claude Code docs</span>
                  <h3>Common workflows and visual iteration</h3>
                  <i aria-hidden="true">↗</i>
                </a>
                <Link href="/#resources">
                  <span>DesignMCP resources</span>
                  <h3>Guides for better AI-built products</h3>
                  <i aria-hidden="true">↗</i>
                </Link>
              </div>
            </section>

            <footer className="article-sources">
              <p className="article-overline">Research note</p>
              <h2>Primary sources first</h2>
              <p>This guide was checked against current Anthropic documentation and the linked project repositories on August 29, 2026. Community catalogues change quickly; inspect their current source before installing.</p>
              <div>
                <a href="https://code.claude.com/docs/en/claude-directory">Claude directory reference ↗</a>
                <a href="https://code.claude.com/docs/en/slash-commands">Skills documentation ↗</a>
                <a href="https://code.claude.com/docs/en/subagents">Subagents documentation ↗</a>
                <a href="https://code.claude.com/docs/en/hooks-guide">Hooks guide ↗</a>
                <a href="https://code.claude.com/docs/en/discover-plugins">Plugin marketplace guidance ↗</a>
              </div>
            </footer>
          </div>

        </div>
        </article>
        <FinalCallToAction />
      </main>
      <SiteFooter />
    </div>
  );
}
