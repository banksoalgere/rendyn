/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors follow the existing Vinext site shell. */
import '../globals.css';
import { pageMetadata, siteOrigin } from '../../lib/seo';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { CodeExample } from './code-example';
import { ClientSetup } from './client-setup';
import { ComponentIllustration, ToolIcon, WorkflowIllustration } from './illustrations';
import Image from 'next/image';
import styles from './mcp.module.css';

export const metadata = pageMetadata(
  'UI Component MCP Server for Claude Code, Cursor & Codex | Rendyn',
  'Find React UI components through MCP. Compare previews, retrieve TypeScript source and dependencies, and connect Rendyn to Claude Code, Cursor or Codex.',
  '/mcp',
);

const tools = [
  ['search_components', 'Find your shortlist', 'Describe one UI need. Get ranked matches and preview links.'],
  ['get_component', 'Bring home the source', 'Retrieve files, dependencies, install steps and licence notices by ID.'],
  ['list_categories', 'See the possibilities', 'Discover the available component categories.'],
  ['browse_category', 'Explore a little further', 'Browse a category with stable, paginated results.'],
];
const examples = [
  { kind: 'approval' as const, title: 'A decision, beautifully presented.', label: 'Agent interfaces', href: '/components/approval-card', name: 'Approval Card' },
  { kind: 'bento' as const, title: 'Give your features room to shine.', label: 'Layouts & motion', href: '/components/bento-grid', name: 'Bento Grid' },
  { kind: 'command' as const, title: 'A shortcut to every action.', label: 'App building blocks', href: '/components', name: 'Explore the catalogue' },
];
const structuredData = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Rendyn UI component MCP server', url: `${siteOrigin}/mcp`, description: metadata.description, isPartOf: { '@id': `${siteOrigin}/#website` }, breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Rendyn', item: siteOrigin }, { '@type': 'ListItem', position: 2, name: 'MCP', item: `${siteOrigin}/mcp` }] } };

export default function McpPage() {
  return <div className={styles.page}>
    <SiteHeader />
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <section className={`${styles.shell} ${styles.hero}`} aria-labelledby="mcp-title">
        <div>
          <p className={styles.eyebrow}><span className={styles.liveDot} aria-hidden="true" /> UI component MCP server</p>
          <h1 id="mcp-title">Less guessing.<br />More <span>great UI.</span></h1>
          <p className={styles.lead}>Show your agent what good looks like. Find React components, compare previews, and bring the source into your app.</p>
          <div className={styles.actions}><a className="button" href="#connect">Connect your agent <span aria-hidden="true">↗</span></a><a className={styles.textLink} href="/components">Explore components →</a></div>
          <div className={styles.agentStrip}>{['claude-code', 'cursor', 'codex'].map((id, index) => <span key={id}><Image src={`/agent-logos/${id}.svg`} alt="" width="19" height="19" />{['Claude Code', 'Cursor', 'Codex'][index]}</span>)}</div>
          <p className={styles.accessNote}>MCP requires an active trial or paid plan. <a href="/pricing">View plans ↗</a></p>
        </div>
        <div className={styles.heroVisual}><WorkflowIllustration /><span className={styles.visualCaption}>Illustrated workflow · your agent makes the project edits</span></div>
      </section>
      <nav className={`${styles.shell} ${styles.contents}`} aria-label="On this page"><a href="#workflow">How it works</a><a href="#components">What you can build</a><a href="#tools">The tools</a><a href="#connect">Connect</a><a href="#faq">Questions</a></nav>
      <div className={styles.shell}>
        <section className={styles.section} id="workflow" aria-labelledby="workflow-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>From idea to interface</p><h2 id="workflow-title">Your brief. A preview. Real code.</h2></div><p>Three steps to better ingredients for your next build.</p></div>
          <div className={styles.walkthrough}>
            <article className={styles.step}><div className={`${styles.stepVisual} ${styles.searchVisual}`} aria-hidden="true"><div className={styles.promptBubble}>Find an approval card <span>↵</span></div><div className={styles.searchResult}><span>✦</span><div><b>Approval Card</b><small>Decision flows · React</small></div><span>↗</span></div><div className={styles.searchResult}><span>⌘</span><div><b>Tool Approval</b><small>Tool permissions · React</small></div><span>↗</span></div></div><span className={styles.stepNumber}>01 / DISCOVER</span><h3>Describe the interaction.</h3><p>Ask for one UI need. Your agent searches Rendyn for a small shortlist.</p></article>
            <article className={styles.step}><div className={styles.stepVisual}><ComponentIllustration kind="approval" /></div><span className={styles.stepNumber}>02 / COMPARE</span><h3>See it before you choose.</h3><p>Open the working previews. Compare the layout and interaction with your brief.</p></article>
            <article className={styles.step}><div className={`${styles.stepVisual} ${styles.filesVisual}`} aria-hidden="true"><div className={styles.fileWindow}><div><span>↳</span> Your component</div><p><span>TSX</span> approval-card.tsx <b>✓</b></p><p><span>TS</span> types.ts <b>✓</b></p><p><span>↗</span> Dependencies <b>✓</b></p><p><span>©</span> Licence notice <b>✓</b></p></div></div><span className={styles.stepNumber}>03 / BUILD</span><h3>Make it yours.</h3><p>Retrieve the source and setup context. Your agent adapts it to your app’s design system.</p></article>
          </div>
        </section>
        <section className={styles.section} id="components" aria-labelledby="components-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>A catalogue of possibilities</p><h2 id="components-title">Small pieces. A better whole.</h2></div><a className={styles.textLink} href="/components">Browse the catalogue ↗</a></div>
          <div className={styles.exampleGrid}>{examples.map(example => <a href={example.href} className={styles.exampleCard} key={example.kind}><div className={styles.exampleArt}><ComponentIllustration kind={example.kind} /></div><div className={styles.exampleCopy}><small>{example.label}</small><h3>{example.title}</h3><span>{example.name} <span aria-hidden="true">↗</span></span></div></a>)}</div>
          <p className={styles.visualCaption}>Schematic illustrations. Open the catalogue to try the actual components.</p>
        </section>
        <section className={styles.section} id="tools" aria-labelledby="tools-title">
          <p className={styles.eyebrow}>Under the hood</p><h2 id="tools-title">Four tools. One creative workflow.</h2>
          <div className={styles.toolGrid}>{tools.map(([name, title, description], index) => <article className={styles.toolCard} key={name}><ToolIcon index={index} /><h3>{title}</h3><p>{description}</p><code>{name}</code></article>)}</div>
          <details className={styles.technicalDetails}><summary>See an example tool call and source handoff</summary><div className={styles.twoColumns}><CodeExample label="Search for a component" code={'{\n  "query": "approval card",\n  "limit": 2,\n  "include_previews": true\n}'} /><CodeExample label="Retrieve the returned component ID" code={'{\n  "id": "beui:approval-card"\n}'} /></div><p>Search returns metadata and preview links; include_previews requests available images. Retrieve by the returned ID, then review all files, imports, dependencies and licence notices before integrating. Your application supplies state, APIs and server authorization.</p></details>
        </section>
        <section className={`${styles.section} ${styles.connectSection}`} id="connect" aria-labelledby="connect-title">
          <div><p className={styles.eyebrow}>Meet your agent where it works</p><h2 id="connect-title">Your editor.<br />Now with better UI.</h2><p>Choose your client, add Rendyn, and authorize your account.</p><div className={styles.endpoint}><span>REMOTE MCP ENDPOINT</span><code>https://mcp.rendyn.dev/mcp</code></div><div className={styles.accessCard} id="access"><b>A quick note on access</b><p>Website previews are public; website source is free after login. MCP requires OAuth and an active trial or paid plan.</p><p>The seven-day trial collects a card and converts to paid access unless cancelled.</p><a href="/pricing" className={styles.textLink}>Plans & trial terms ↗</a></div></div>
          <ClientSetup />
        </section>
        <section className={styles.section} id="faq" aria-labelledby="faq-title"><p className={styles.eyebrow}>The useful details</p><h2 id="faq-title">A few things to know.</h2><div className={styles.faq}>
          <details><summary>Does Rendyn install the components for me?</summary><p>Rendyn returns source, dependencies and install instructions. Your coding agent writes files and runs approved commands in your project.</p></details>
          <details><summary>Can I use these components in Next.js?</summary><p>Review the component’s client boundary, imports, Tailwind setup and dependency versions. Compatibility depends on the chosen source and your app; test the rendered result after integration.</p></details>
          <details><summary>What if my agent cannot connect?</summary><p>Confirm the endpoint ends in /mcp, enable the server in your client, and complete OAuth. Check <a href="/account">your account</a> for an active trial or subscription.</p></details>
          <details><summary>What if there is no matching component?</summary><p>Try a narrower interaction, remove a category filter, or browse a category. Choose a component that fits your feature and existing design system.</p></details>
          <details><summary>What comes with the source?</summary><p>Source files, dependencies, install steps, source hashes and licence details. Catalogue entries include components from beUI, Magic UI and Kibo UI, with their attribution and notices.</p></details>
          <details><summary>Are agent UI components a complete AI backend?</summary><p>They provide interface pieces. Your application supplies model calls, streaming, persistence and server authorization. Rendyn’s catalogue tools deliver components for your app; they do not implement the MCP Apps extension.</p></details>
        </div></section>
        <section className={styles.finalCta} aria-labelledby="next-title"><div className={styles.ctaSymbol} aria-hidden="true">✦</div><p className={styles.eyebrow}>Make something worth looking at</p><h2 id="next-title">Great UI starts with<br />better ingredients.</h2><div className={styles.actions}><a className="button" href="#connect">Connect your agent ↗</a><a className={styles.textLink} href="/components">Find your first component →</a></div></section>
      </div>
    </main><SiteFooter />
  </div>;
}
