export function FeatureShowcase() {
  return (
    <section className="intelligence-section" id="intelligence">
      <div className="section-shell">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">The complete component</p>
          <h2>One prompt.<br />Ready-to-ship UI.</h2>
          <p>A clear choice, a polished preview and every file your agent needs to add it to the product.</p>
        </div>

        <div className="feature-grid">
          <article className="feature-card feature-card--search">
            <div className="feature-label"><span>Get the right fit</span><i>01</i></div>
            <h3>Matched to the product behind the request.</h3>
            <div className="mini-search">
              <span aria-hidden="true">✦</span>
              <p>“A calm confirmation action for a clinical workflow...”</p>
              <kbd>↵</kbd>
            </div>
            <div className="search-signals"><span>calm</span><span>high trust</span><span>keyboard ready</span></div>
          </article>

          <article className="feature-card feature-card--shortlist">
            <div className="feature-label"><span>Reach a decision quickly</span><i>02</i></div>
            <h3>Three strong options, already ranked for the job.</h3>
            <div className="shortlist-visual" aria-hidden="true">
              <div><span>01</span><i /></div><div className="active"><span>02</span><i /></div><div><span>03</span><i /></div>
            </div>
          </article>

          <article className="feature-card feature-card--reasoning">
            <div className="feature-label"><span>Know the trade-offs</span><i>03</i></div>
            <h3>See why each option fits your product.</h3>
            <div className="reason-list">
              <p><span>✓</span> Supports low-motion products</p>
              <p><span>✓</span> Balances light and dark surfaces</p>
              <p><span>✓</span> Includes loading and disabled states</p>
              <p><span>✓</span> Fits high-trust workflows</p>
            </div>
          </article>

          <article className="feature-card feature-card--delivery">
            <div className="feature-label"><span>Get shippable code</span><i>04</i></div>
            <h3>Source files, styles and dependencies arrive together.</h3>
            <div className="file-stack" aria-label="Files included with a component">
              <div><span className="file-icon">TS</span><p>signal-button.tsx</p><i>2.4 KB</i></div>
              <div><span className="file-icon file-icon--css">CSS</span><p>signal-button.css</p><i>1.1 KB</i></div>
              <div><span className="file-icon file-icon--json">{'{}'}</span><p>dependencies.json</p><i>0.6 KB</i></div>
            </div>
          </article>

          <article className="feature-card feature-card--stack">
            <div className="feature-label"><span>Keep the result</span><i>05</i></div>
            <h3>Editable code becomes part of your product.</h3>
            <div className="stack-visual">
              <div className="stack-ring"><span>TSX</span></div>
              <div className="stack-copy"><p>Built to keep</p><span>Ready to inspect, adapt and maintain.</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
