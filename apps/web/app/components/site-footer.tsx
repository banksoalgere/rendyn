import { Brand } from './brand';

const footerGroups = [
  {
    title: 'Product',
    links: [['Search', '#product'], ['Components', '#catalogue'], ['How it works', '#how-it-works']],
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
        <p className="eyebrow">Get closer on the first pass</p>
        <h2>Ship the product<br />you pictured.</h2>
        <p>Give your agent the component choices and implementation detail it needs to build with intention.</p>
        <div>
          <a className="button" href="#product">Explore DesignMCP <span aria-hidden="true">↗</span></a>
          <a className="button button--cream" href="#docs">Connect your agent</a>
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
        <p>Ship more intentional interfaces with the agents you already use.</p>
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
