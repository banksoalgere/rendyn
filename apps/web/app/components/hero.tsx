export function Hero() {
  return (
    <section className="hero grid-field" id="top">
      <div className="hero-copy">
        <h1>Give your coding agent<br />great taste.</h1>
        <p className="hero-deck">
          DesignMCP is a curated catalogue of polished interface components. Your agent
          gets visual options, product context and complete code for every screen.
        </p>
        <div className="hero-actions">
          <a className="button" href="#catalogue">Browse components <span aria-hidden="true">↓</span></a>
          <a className="button button--ghost" href="#docs">Connect DesignMCP</a>
        </div>
        <p className="stack-note">Ranked choices <span>·</span> Complete source code <span>·</span> Agent-ready delivery</p>
      </div>

      <div className="component-stage" id="product" aria-label="A finance product composed with DesignMCP components">
        <div className="showcase-toolbar">
          <div className="showcase-product">
            <span className="showcase-product-mark" aria-hidden="true">O</span>
            <div><strong>Orbit</strong><span>Finance workspace</span></div>
          </div>
          <div className="showcase-tabs" aria-hidden="true">
            <span className="is-active">Overview</span>
            <span>Markets</span>
            <span>Activity</span>
          </div>
          <span className="showcase-avatar" aria-label="Signed in as JB">JB</span>
        </div>

        <div className="showcase-heading">
          <div><span>Portfolio overview</span><h2>Good morning, Jordan.</h2></div>
          <div className="showcase-actions" aria-hidden="true"><span>Export</span><span className="is-primary">Add funds <i>↗</i></span></div>
        </div>

        <div className="showcase-grid">
          <article className="showcase-panel showcase-panel--table">
            <div className="showcase-panel-head"><div><span>Portfolio</span><strong>Recent positions</strong></div><i>Live data</i></div>
            <div className="showcase-image showcase-image--table"><img src="/beui-showcase/table.png" alt="Refined data table with status badges and account values" /></div>
          </article>

          <div className="showcase-side">
            <article className="showcase-panel showcase-panel--wallet">
              <div className="showcase-panel-head"><div><span>Balance</span><strong>Wallet overview</strong></div><i>Interactive</i></div>
              <div className="showcase-image showcase-image--wallet"><img src="/beui-showcase/wallet-card.png" alt="Wallet component with balance, account controls, and transaction actions" /></div>
            </article>
            <article className="showcase-panel showcase-panel--market">
              <div className="showcase-panel-head"><div><span>Trade</span><strong>Market order</strong></div><i>Ready to use</i></div>
              <div className="showcase-image showcase-image--market"><img src="/beui-showcase/prediction-market.png" alt="Market trading component with outcome prices and an order ticket" /></div>
            </article>
          </div>
        </div>

        <div className="showcase-footer">
          <p><span aria-hidden="true">✓</span> Real components shown inside a finished product</p>
          <span>Built from the DesignMCP catalogue</span>
        </div>
      </div>
    </section>
  );
}
