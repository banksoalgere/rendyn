/* eslint-disable @next/next/no-html-link-for-pages -- Vinext can hydrate next/link from a second React context; native anchors avoid that runtime failure. */
import { Brand } from './brand';

const footerGroups = [
  {
    title: 'Product',
    links: [['Product', '/#product'], ['Components', '/components'], ['What you get', '/#how-it-works']],
  },
  {
    title: 'Developers',
    links: [['Documentation', '/#docs'], ['MCP connection', '/#docs'], ['Component format', '/#docs']],
  },
  {
    title: 'Resources',
    links: [
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
  {
    title: 'Company',
    links: [['About', '/#top'], ['Early access', '/#early-access'], ['Contact', '/#top']],
  },
];

export function FinalCallToAction() {
  return (
    <section className="final-cta grid-field" id="early-access">
      <div className="final-cta-card">
        <p className="eyebrow">Your agent&apos;s design upgrade</p>
        <h2>Build your best<br />interface yet.</h2>
        <p>Connect DesignMCP and give every feature polished components, complete code and the context to choose well.</p>
        <div>
          <a className="button" href="/components">Browse the catalogue <span aria-hidden="true">↗</span></a>
          <a className="button button--cream" href="/#docs">Connect DesignMCP</a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Brand label="Back to DesignMCP home" />
        <p>A curated component catalogue for the coding agents you already use.</p>
      </div>
      <div className="footer-links">
        {footerGroups.map((group) => (
          <div key={group.title}>
            <span>{group.title}</span>
            {group.links.map(([label, href]) => (
              <a href={href} key={label}>{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom"><span>© 2026 DesignMCP</span><span>React · TypeScript · Tailwind</span></div>
    </footer>
  );
}
