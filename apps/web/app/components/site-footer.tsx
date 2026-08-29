import { Brand } from './brand';

const footerGroups = [
  {
    title: 'Product',
    links: [['Product', '#product'], ['Components', '#catalogue'], ['What you get', '#how-it-works']],
  },
  {
    title: 'Developers',
    links: [['Documentation', '#docs'], ['MCP connection', '#docs'], ['Component format', '#docs']],
  },
  {
    title: 'Resources',
    links: [['Articles', '#resources'], ['Guides', '#resources'], ['Component strategy', '#resources']],
  },
  {
    title: 'Company',
    links: [['About', '#top'], ['Early access', '#early-access'], ['Contact', '#top']],
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
          <a className="button" href="#catalogue">Browse the catalogue <span aria-hidden="true">↗</span></a>
          <a className="button button--cream" href="#docs">Connect DesignMCP</a>
        </div>
      </div>
    </section>
  );
}

interface SiteFooterProps {
  homeHref?: string;
  linkPrefix?: string;
}

export function SiteFooter({ homeHref = '#top', linkPrefix = '' }: SiteFooterProps = {}) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Brand href={homeHref} label="Back to DesignMCP home" />
        <p>A curated component catalogue for the coding agents you already use.</p>
      </div>
      <div className="footer-links">
        {footerGroups.map((group) => (
          <div key={group.title}>
            <span>{group.title}</span>
            {group.links.map(([label, href]) => (
              <a href={`${linkPrefix}${href}`} key={label}>{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom"><span>© 2026 DesignMCP</span><span>React · TypeScript · Tailwind</span></div>
    </footer>
  );
}
