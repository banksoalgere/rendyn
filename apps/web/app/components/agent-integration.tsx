const matches = [
  ['01', 'Signal button', 'best match'],
  ['02', 'Quiet action', '92% match'],
  ['03', 'Split action', '86% match'],
];

export function AgentIntegration() {
  return (
    <section className="agent-section section-shell" id="docs">
      <div className="agent-copy">
        <p className="eyebrow">Works with the agents you already use</p>
        <h2>One connection.<br />A design upgrade for every build.</h2>
        <p>
          DesignMCP joins your agent&apos;s existing workflow and supplies component choices,
          product-aware reasoning and complete implementation code.
        </p>
        <a className="button button--light" href="#early-access">Connect DesignMCP <span aria-hidden="true">↗</span></a>
      </div>

      <div className="agent-console" aria-label="Example DesignMCP tool response">
        <div className="console-bar"><span>designmcp</span><div><i /><i /><i /></div></div>
        <div className="console-body">
          <p className="console-comment">{'// Find the right component'}</p>
          <p><span className="code-purple">designmcp</span>.<span className="code-blue">search</span>{'({'}</p>
          <p className="indent">intent: <span className="code-green">&quot;primary CTA&quot;</span>,</p>
          <p className="indent">context: <span className="code-green">&quot;dark finance dashboard&quot;</span>,</p>
          <p className="indent">motion: <span className="code-green">&quot;subtle&quot;</span>,</p>
          <p className="indent">accessible: <span className="code-orange">true</span></p>
          <p>{'})'}</p>
          <div className="console-result">
            <div><span className="result-check">✓</span><p><strong>3 product-ready matches</strong><small>Ranked for your interface</small></p></div>
            {matches.map(([number, name, fit]) => (
              <div className="result-row" key={number}>
                <span>{number}</span><p>{name}</p><i>{fit}</i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
