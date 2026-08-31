import { ProductMenu } from './components/product-menu';
import { MobileMenu } from './components/mobile-menu';

const codingAgents = [
  { name: 'Codex', logo: '/agent-logos/codex.svg' },
  { name: 'Claude Code', logo: '/agent-logos/claude-code.svg' },
  { name: 'Cursor', logo: '/agent-logos/cursor.svg' },
  { name: 'Cline', logo: '/agent-logos/cline.svg' },
  { name: 'Windsurf', logo: '/agent-logos/windsurf.svg' },
  { name: 'GitHub Copilot', logo: '/agent-logos/github-copilot.svg' },
  { name: 'Gemini CLI', logo: '/agent-logos/gemini-cli.svg' },
  { name: 'OpenCode', logo: '/agent-logos/opencode.svg' },
];

const extras = [
  ['01', 'Ranked shortlists'],
  ['02', 'Interactive previews'],
  ['03', 'Complete states'],
  ['04', 'Fit reasoning'],
  ['05', 'Dependencies'],
  ['06', 'Install steps'],
  ['07', 'Source hashes'],
  ['08', 'Licence clarity'],
];

const scenarios = [
  ['Clinical workflow', 'Calm, explicit actions with every state included.', 'high trust'],
  ['Finance dashboard', 'Dense data patterns that stay easy to scan.', 'data rich'],
  ['Agent interface', 'Tool calls, streaming and approvals that feel native.', 'agentic'],
  ['Mobile product', 'Touch-ready controls with sensible constraints.', 'responsive'],
  ['Team workspace', 'Patterns that scale across repeated workflows.', 'system ready'],
  ['Developer tool', 'Keyboard-friendly UI with crisp feedback.', 'technical'],
  ['Consumer app', 'Distinctive motion without losing usability.', 'expressive'],
  ['Admin product', 'Useful density, clear hierarchy and safe actions.', 'operational'],
  ['New feature', 'A strong first draft without the generic AI look.', 'fast start'],
];

const footerGroups = [
  ['Product', ['Components', 'How it works', 'For teams', 'Pricing']],
  ['Developers', ['Documentation', 'MCP connection', 'Component format', 'Changelog']],
  ['Resources', ['Component guide', 'Agent workflows', 'Catalogue policy', 'Status']],
  ['Company', ['About', 'Contact', 'Privacy', 'Terms']],
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className="brand" href="#top" aria-label="DesignMCP home">
      <span className="brand-mark" aria-hidden="true">D</span>
      <span>DesignMCP</span>
      {!footer && <small>beta</small>}
    </a>
  );
}

function SectionHeading({ label, title, copy }: { label: string; title: React.ReactNode; copy: string }) {
  return (
    <div className="section-heading">
      <span className="pill pill--section">{label}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header page-width">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <ProductMenu />
          <a href="#how-it-works">How it works</a>
          <a href="/pricing">Pricing</a>
          <a href="#for-teams">For teams</a>
          <a href="#docs">Resources</a>
        </nav>
        <div className="header-actions">
          <a className="text-link" href="/login?next=%2Faccount">Sign in</a>
          <a className="button button--small" href="#get-started">Get started</a>
          <MobileMenu />
        </div>
      </header>

      <section className="hero page-width grid-surface" id="top">
        <div className="hero-copy">
          <span className="pill">Agent-ready UI source <b>↗</b></span>
          <h1>The better way<br />to build polished<br />interfaces.</h1>
          <p>
            A curated component catalogue that gives coding agents the right UI,
            complete source and the context to ship it well.
          </p>
          <div className="hero-actions">
            <a className="button button--wide" href="#components">Browse components <span>→</span></a>
            <a className="button button--secondary button--wide" href="#docs">Connect to your agent</a>
          </div>
        </div>

        <div className="hero-product" aria-label="DesignMCP component search example">
          <div className="product-window">
            <div className="window-bar">
              <div className="window-brand"><span>DM</span><strong>DesignMCP</strong></div>
              <div className="window-status"><i /> Connected</div>
            </div>
            <div className="agent-prompt">
              <span className="prompt-icon">✦</span>
              <div>
                <small>Agent request</small>
                <p>Find a calm approval flow for a high-trust product.</p>
              </div>
            </div>
            <div className="result-label"><span>3 matches</span><small>Ranked by product fit</small></div>
            <div className="result-card result-card--active">
              <div className="result-preview">
                <span className="approval-avatar">JD</span>
                <div><i /><i /><i /></div>
                <button type="button">Approve</button>
              </div>
              <div className="result-copy">
                <span><b>01</b> Approval card</span>
                <strong>Best match</strong>
              </div>
            </div>
            <div className="result-row"><span>02</span><p>Tool approval</p><small>Strong fit</small></div>
            <div className="result-row"><span>03</span><p>Confirmation modal</p><small>Good fit</small></div>
            <div className="source-ready"><span>✓</span><p><strong>Complete source ready</strong><small>TSX · CSS · dependencies · install steps</small></p></div>
          </div>
        </div>
      </section>

      <section className="trust-strip page-width" aria-label="Compatible coding tools">
        <p>Built for the agents you already use</p>
        <div>
          {codingAgents.slice(0, 5).map((agent) => (
            <span key={agent.name}><img src={agent.logo} alt="" />{agent.name}</span>
          ))}
        </div>
      </section>

      <section className="steps-section section-grid" id="how-it-works">
        <div className="content-width">
          <SectionHeading
            label="How it works"
            title={<>With us, finding the right UI is easy.</>}
            copy="From product intent to usable source in three focused steps."
          />
          <div className="steps-grid">
            <article className="step-card">
              <div className="step-copy"><span>01</span><h3>Describe the outcome</h3><p>Tell your agent what the interface needs to do.</p></div>
              <div className="step-prompt"><span>✦</span><p>A safe delete flow for a team workspace...</p><i>↵</i></div>
            </article>
            <article className="step-card">
              <div className="step-copy"><span>02</span><h3>Review the best fits</h3><p>Compare a small, ranked set with clear reasoning.</p></div>
              <div className="step-stack" aria-hidden="true"><i /><i className="chosen" /><i /></div>
            </article>
            <article className="step-card">
              <div className="step-copy"><span>03</span><h3>Ship complete source</h3><p>Copy the component, states and install steps.</p></div>
              <div className="step-files"><span><b>TSX</b> component.tsx <i>✓</i></span><span><b>CSS</b> styles.css <i>✓</i></span><span><b>DOC</b> install.md <i>✓</i></span></div>
            </article>
          </div>
        </div>
      </section>

      <section className="features-section section-grid" id="components">
        <div className="content-width">
          <SectionHeading
            label="The catalogue"
            title={<>Your all-purpose<br />interface source.</>}
            copy="Polished components, understood in context and delivered whole."
          />
          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-copy"><span>Search by intent</span><h3>Ask for the outcome, not a component name.</h3><p>DesignMCP reads product context, interaction needs and constraints.</p></div>
              <div className="search-demo">
                <div><span>⌕</span><p>Keyboard-first command menu for a dense admin tool</p><kbd>↵</kbd></div>
                <small><i>high density</i><i>keyboard</i><i>admin</i></small>
              </div>
            </article>
            <article className="feature-card">
              <div className="feature-copy"><span>Choose confidently</span><h3>See the strongest options, already ranked.</h3><p>Useful fit notes replace endless catalogue browsing.</p></div>
              <div className="rank-demo">
                <div><span>01</span><strong>Best fit</strong><p>Command palette</p><i>96%</i></div>
                <div><span>02</span><strong>Strong fit</strong><p>Morphing search</p><i>89%</i></div>
                <div><span>03</span><strong>Good fit</strong><p>Combobox</p><i>82%</i></div>
              </div>
            </article>
            <article className="feature-card feature-card--preview">
              <div className="feature-copy"><span>Preview the real thing</span><h3>Inspect a working component before choosing.</h3><p>See the interaction, states and finish—not a vague thumbnail.</p></div>
              <div className="preview-demo"><img src="/beui-showcase/table.png" alt="Preview of a refined data table component" /></div>
            </article>
            <article className="feature-card">
              <div className="feature-copy"><span>Own the result</span><h3>Complete implementation, ready to adapt.</h3><p>Source, dependencies, assets and exact setup arrive together.</p></div>
              <div className="delivery-demo">
                <div><span className="file-type file-type--tsx">TS</span><p><b>component.tsx</b><small>Complete source</small></p><i>2.4 KB</i></div>
                <div><span className="file-type file-type--css">CSS</span><p><b>styles.css</b><small>Every state</small></p><i>1.2 KB</i></div>
                <div><span className="file-type file-type--doc">DOC</span><p><b>install.md</b><small>Exact steps</small></p><i>0.8 KB</i></div>
              </div>
            </article>
          </div>

          <div className="more-section">
            <h2>...and so much more.</h2>
            <div className="more-grid">
              {extras.map(([number, label]) => (
                <div key={number}><span>{number}</span><i aria-hidden="true">✦</i><p>{label}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="proof-section section-grid">
        <div className="content-width">
          <SectionHeading
            label="In the catalogue today"
            title={<>The catalogue speaks for itself.</>}
            copy="A focused library, not an unfiltered component dump."
          />
          <div className="proof-grid">
            <article><span>80</span><p>interactive components</p><small>Every entry has an internal preview and complete source.</small></article>
            <article><span>41</span><p>motion components</p><small>Interaction patterns with the details agents usually miss.</small></article>
            <article><span>17</span><p>agent interfaces</p><small>Purpose-built patterns for tools, approvals and streaming.</small></article>
            <article><span>22</span><p>product blocks</p><small>Useful foundations for real product screens.</small></article>
          </div>
        </div>
      </section>

      <section className="connect-section section-grid" id="docs">
        <div className="connect-card content-width">
          <div className="connect-copy">
            <span className="pill pill--section">One connection</span>
            <h2>Connect to your favourite coding agent.</h2>
            <p>DesignMCP joins the workflow you already use.</p>
            <a className="button button--secondary" href="#get-started">Connect DesignMCP <span>→</span></a>
          </div>
          <div className="tool-grid" aria-label="MCP-compatible coding agents">
            {codingAgents.map((agent) => (
              <div className="tool-logo" key={agent.name}>
                <span><img src={agent.logo} alt="" /></span>
                <small>{agent.name}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="teams-section section-grid" id="for-teams">
        <div className="teams-grid content-width">
          <div className="teams-copy">
            <span className="pill pill--section">For teams</span>
            <h2>One visual standard. Every agent.</h2>
            <p>Give the whole team the same curated source and the same quality bar—without adding another design tool.</p>
            <a className="button" href="#get-started">Get started <span>→</span></a>
          </div>
          <div className="team-console" aria-label="Example DesignMCP tool response">
            <div className="console-top"><span>designmcp / search</span><i /><i /><i /></div>
            <div className="console-prompt"><span>›</span><p>approval flow · high trust · low motion</p></div>
            <div className="console-result">
              <div><span>01</span><p><b>approval-card</b><small>Strongest match for explicit review.</small></p><i>0.96</i></div>
              <div><span>02</span><p><b>tool-approval</b><small>Best for agent-led actions.</small></p><i>0.89</i></div>
              <div><span>03</span><p><b>confirmation-modal</b><small>Familiar fallback pattern.</small></p><i>0.82</i></div>
            </div>
            <div className="console-ready"><span>✓</span> Source and install steps ready</div>
          </div>
        </div>
      </section>

      <section className="scenarios-section section-grid">
        <div className="content-width">
          <SectionHeading
            label="Product-aware matching"
            title={<>See how DesignMCP reads the room.</>}
            copy="The right component changes with the product around it."
          />
          <div className="scenario-grid">
            {scenarios.map(([title, copy, tag], index) => (
              <article key={title}>
                <div><span className={`scenario-avatar avatar-${index + 1}`}>{title.charAt(0)}</span><p><b>{title}</b><small>{tag}</small></p></div>
                <p>{copy}</p>
                <a href="#components">Explore the fit <span>↗</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-strip trust-strip--lower page-width" aria-label="What every unlocked component includes">
        <p>Every unlocked component includes</p>
        <div>
          {['Complete source', 'Every state', 'Dependencies', 'Install steps', 'Editable code'].map((item) => (
            <span key={item}><i aria-hidden="true">✓</i>{item}</span>
          ))}
        </div>
      </section>

      <section className="closing-section section-grid" id="get-started">
        <div className="closing-card content-width grid-surface">
          <span className="pill pill--section">Ready when your agent is</span>
          <h2>Smarter, simpler<br />interface building.</h2>
          <a className="button" href="#components">Browse components <span>→</span></a>
          <p><span>80</span> curated components <i>·</i> <span>4</span> free unlocks <i>·</i> complete code you own</p>
        </div>
      </section>

      <footer className="site-footer page-width">
        <div className="footer-intro">
          <Brand footer />
          <p>Curated UI source for coding agents.</p>
          <div className="footer-stamps"><span>React</span><span>TS</span><span>MCP</span><span>MIT source</span></div>
        </div>
        <div className="footer-nav">
          {footerGroups.map(([title, links]) => (
            <div key={title as string}><strong>{title}</strong>{(links as string[]).map((link) => <a href={link === 'Pricing' ? '/pricing' : '#top'} key={link}>{link}</a>)}</div>
          ))}
        </div>
        <div className="footer-bottom"><span>© 2026 DesignMCP</span><span>Built for better product decisions.</span></div>
      </footer>
    </main>
  );
}
