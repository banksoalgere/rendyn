const outcomes = [
  ['Better first drafts', 'Choices matched to the product'],
  ['Faster component decisions', 'Three ranked options, not hundreds'],
  ['Complete implementations', 'No missing states, files or dependencies'],
  ['A more coherent product', 'One shared language across every screen'],
];

export function Comparison() {
  return (
    <section className="comparison-section">
      <div className="section-shell comparison-grid">
        <div className="comparison-copy">
          <p className="eyebrow">What changes after you connect</p>
          <h2>Less correction.<br /><span>More intentional UI.</span></h2>
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
