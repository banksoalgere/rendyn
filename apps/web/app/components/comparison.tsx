const outcomes = [
  ['Polished first drafts', 'Product-aware component choices'],
  ['Clear decisions', 'Three ranked options with fit notes'],
  ['Complete delivery', 'Source, states, dependencies and install steps'],
  ['A cohesive product', 'One visual language across every screen'],
];

export function Comparison() {
  return (
    <section className="comparison-section">
      <div className="section-shell comparison-grid">
        <div className="comparison-copy">
          <p className="eyebrow">The Rendyn effect</p>
          <h2>Better ingredients<br /><span>for every interface.</span></h2>
        </div>
        <div className="comparison-list">
          {outcomes.map(([result, detail], index) => (
            <div key={result}><span>0{index + 1}</span><p>{result}</p><i>{detail}</i></div>
          ))}
        </div>
      </div>
    </section>
  );
}
