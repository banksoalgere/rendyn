/* eslint-disable @next/next/no-html-link-for-pages -- Vinext can hydrate next/link from a second React context; native anchors avoid that runtime failure. */
import { Brand } from './brand';
import styles from './site-shell.module.css';

const footerGroups = [
  {
    title: 'Product',
    links: [['Overview', '/'], ['Components', '/components'], ['Component MCP server', '/mcp'], ['How it works', '/#how-it-works'], ['Pricing', '/pricing']],
  },
  {
    title: 'Explore',
    links: [['Component libraries', '/libraries'], ['AI agent UI', '/collections/ai-agent-ui'], ['Animated React components', '/collections/animated-react-components'], ['All interaction components', '/components?category=motion'], ['Components & blocks', '/components?category=blocks']],
  },
  {
    title: 'Resources',
    links: [
      ['All guides', '/guides'],
      ['ChatGPT app design', '/blog/how-to-design-an-app-with-chatgpt'],
      ['ChatGPT website design', '/guides/how-to-design-a-website-with-chatgpt'],
      ['Cursor website design', '/guides/how-to-build-a-good-looking-website-with-cursor'],
      ['Cursor design workflow', '/guides/cursor-design'],
      ['Cursor templates', '/blog/best-cursor-templates'],
      ['Claude Code design', '/guides/how-to-make-claude-code-better-at-design'],
      ['Claude Code website design', '/guides/how-to-design-a-website-with-claude-code'],
      ['Claude Code templates', '/blog/best-claude-code-templates'],
      ['Codex design', '/guides/how-to-make-codex-better-at-design'],
      ['Vibe coding design', '/guides/vibe-coding-design'],
      ['Vibe coding website', '/guides/how-to-build-a-website-with-vibe-coding'],
      ['Vibe coding templates', '/guides/vibe-coding-templates'],
    ],
  },
];

export function FinalCallToAction() {
  return (
    <section className="final-cta grid-field" id="start-trial">
      <div className="final-cta-card">
        <p className="eyebrow">Your agent&apos;s design upgrade</p>
        <h2>Build your best<br />interface yet.</h2>
        <p>Start with seven days of full access, then keep giving every feature polished components, complete code and the context to choose well.</p>
        <div>
          <a className="button" href="/components">Browse the catalogue <span aria-hidden="true">↗</span></a>
          <a className="button button--cream" href="/pricing">Start 7-day trial</a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
      <div className={styles.footerTop}>
        <Brand label="Back to Rendyn home" />
        <p>A curated component catalogue for the coding agents you already use.</p>
      </div>
      <div className={styles.footerLinks}>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <span>{group.title}</span>
            {group.links.map(([label, href]) => (
              <a href={href} key={label}>{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.footerBottom}><span>© 2026 Rendyn</span><span>React · TypeScript · Tailwind</span></div>
      </div>
    </footer>
  );
}
