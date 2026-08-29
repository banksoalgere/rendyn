export function FeatureShowcase() {
  return (
    <section className="intelligence-section" id="intelligence">
      <div className="section-shell">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">From one request to a shippable component</p>
          <h2>Less prompting.<br /><span>Less rework. Better output.</span></h2>
          <p>You get the right options, the reasoning to choose between them, and everything required to ship the winner.</p>
        </div>

        <div className="feature-grid">
          <article className="feature-card feature-card--search">
            <div className="feature-label"><span>Get the right fit</span><i>01</i></div>
            <h3>A component matched to the product, not merely the keyword.</h3>
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
            <h3>Choose with confidence before code enters the project.</h3>
            <div className="reason-list">
              <p><span>✓</span> Matches a low-motion product</p>
              <p><span>✓</span> Works on light and dark surfaces</p>
              <p><span>✓</span> Includes loading and disabled states</p>
              <p className="negative"><span>×</span> Not suited to playful consumer flows</p>
            </div>
          </article>

          <article className="feature-card feature-card--delivery">
            <div className="feature-label"><span>Get shippable code</span><i>04</i></div>
            <h3>Every file. Every dependency. No scavenger hunt.</h3>
            <div className="file-stack" aria-label="Files included with a component">
              <div><span className="file-icon">TS</span><p>signal-button.tsx</p><i>2.4 KB</i></div>
              <div><span className="file-icon file-icon--css">CSS</span><p>signal-button.css</p><i>1.1 KB</i></div>
              <div><span className="file-icon file-icon--json">{'{}'}</span><p>dependencies.json</p><i>0.6 KB</i></div>
            </div>
          </article>

          <article className="feature-card feature-card--stack">
            <div className="feature-label"><span>Keep the result</span><i>05</i></div>
            <h3>Editable code that lives in your product and grows with it.</h3>
            <div className="stack-visual">
              <div className="stack-ring"><span>TSX</span></div>
              <div className="stack-copy"><p>Yours from day one</p><span>Ready to inspect, adapt and maintain.</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
