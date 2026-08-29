const suggestions = [
  {
    name: 'Quiet action',
    fit: '92% match',
    tone: 'Restrained',
    action: 'Continue',
    className: 'suggestion-card suggestion-card--quiet',
  },
  {
    name: 'Signal button',
    fit: 'Best match',
    tone: 'Subtle motion',
    action: 'Deploy changes',
    className: 'suggestion-card suggestion-card--selected',
  },
  {
    name: 'Split action',
    fit: '86% match',
    tone: 'High intent',
    action: 'Create project',
    className: 'suggestion-card suggestion-card--split',
  },
];

export function Hero() {
  return (
    <section className="hero grid-field" id="top">
      <div className="hero-copy">
        <h1>Ship a product that feels<br />designed, not generated.</h1>
        <p className="hero-deck">
          Give your coding agent the right component for every moment. Get a ranked
          shortlist, complete implementation-ready code, and fewer design revisions.
        </p>
        <div className="hero-actions">
          <a className="button" href="#how-it-works">See what you get <span aria-hidden="true">↓</span></a>
          <a className="button button--ghost" href="#docs">Connect your agent</a>
        </div>
        <p className="stack-note">Matched options <span>·</span> Complete code <span>·</span> No missing dependencies</p>
      </div>

      <div className="product-stage" id="product" aria-label="DesignMCP component search example">
        <div className="window-bar">
          <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
          <span>designmcp / search</span>
          <span className="live-pill"><i /> Connected</span>
        </div>

        <div className="query-panel">
          <div className="query-heading">
            <span className="query-icon" aria-hidden="true">✦</span>
            <div>
              <p>Ask DesignMCP</p>
              <span>Describe the interface, intent and constraints.</span>
            </div>
          </div>
          <blockquote>
            “I need a restrained primary CTA for a dark finance dashboard. Subtle
            motion, accessible loading feedback, no extra UI framework.”
          </blockquote>
          <div className="query-tags">
            <span>Primary action</span><span>Dark UI</span><span>Accessible</span><span>Low motion</span>
          </div>
        </div>

        <div className="results-heading">
          <div><span>03</span><p>Ready-to-use options</p></div>
          <p>Already ranked for this product</p>
        </div>

        <div className="suggestion-grid" aria-hidden="true">
          {suggestions.map((item, index) => (
            <article className={item.className} key={item.name}>
              <div className="suggestion-meta">
                <span>{item.fit}</span><span>0{index + 1}</span>
              </div>
              <div className="component-preview">
                <button type="button" tabIndex={-1}>
                  <span>{item.action}</span>
                  <i aria-hidden="true">{index === 1 ? '↗' : '→'}</i>
                </button>
              </div>
              <div className="suggestion-copy">
                <div><h2>{item.name}</h2><p>{item.tone}</p></div>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </div>
            </article>
          ))}
        </div>

        <div className="stage-footer">
          <p><span aria-hidden="true">✓</span> Selected component arrives complete and ready to add</p>
          <span className="stage-link">Get the implementation <span aria-hidden="true">→</span></span>
        </div>
      </div>
    </section>
  );
}
