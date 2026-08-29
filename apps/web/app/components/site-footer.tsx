import Link from 'next/link';
import { Brand } from './brand';

const footerGroups = [
  {
    title: 'Product',
    links: [['Product', '/#product'], ['Components', '/#catalogue'], ['What you get', '/#how-it-works']],
  },
  {
    title: 'Developers',
    links: [['Documentation', '/#docs'], ['MCP connection', '/#docs'], ['Component format', '/#docs']],
  },
  {
    title: 'Resources',
    links: [['Articles', '/#resources'], ['Codex design guide', '/guides/how-to-make-codex-better-at-design'], ['Component strategy', '/#resources']],
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
          <Link className="button" href="/#catalogue">Browse the catalogue <span aria-hidden="true">↗</span></Link>
          <Link className="button button--cream" href="/#docs">Connect DesignMCP</Link>
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
              <Link href={href} key={label}>{label}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom"><span>© 2026 DesignMCP</span><span>React · TypeScript · Tailwind</span></div>
    </footer>
  );
}
