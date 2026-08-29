const steps = [
  {
    number: '01',
    title: 'State the outcome',
    description: 'Describe what the interface needs to achieve, where it lives and any technical constraints.',
    visual: (
      <div className="step-visual step-visual--describe">
        <span>✦</span><p>Describe the interface, intent and constraints...</p>
      </div>
    ),
  },
  {
    number: '02',
    title: 'Pick from strong options',
    description: 'Review a small ranked set with previews, fit reasoning and practical trade-offs.',
    visual: (
      <div className="step-visual step-visual--compare">
        <i /><i className="chosen" /><i />
      </div>
    ),
  },
  {
    number: '03',
    title: 'Ship the implementation',
    description: 'Receive complete source, supporting files, assets and exact installation steps.',
    visual: (
      <div className="step-visual step-visual--install">
        <div><span>✓</span><p>Component added</p></div>
        <code>src/components/signal-button.tsx</code>
      </div>
    ),
  },
];

export function Workflow() {
  return (
    <section className="workflow-section">
      <div className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">One request. A usable result.</p>
          <h2>Ask once. Choose confidently.<br />Keep building.</h2>
        </div>
        <div className="workflow-grid">
          {steps.map((step) => (
            <article key={step.number}>
              <span className="step-number">{step.number}</span>
              {step.visual}
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
