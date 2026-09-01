import { Fragment } from 'react';

const includedResults = [
  'A ranked shortlist',
  'Visual previews',
  'Fit reasoning',
  'Complete source',
  'Install steps',
  'Code you own',
];

const outcomes = [
  ['Find the fit', 'Three options ranked for your product.'],
  ['Choose confidently', 'Visual previews and clear fit notes.'],
  ['Ship the whole thing', 'Source, states, dependencies and setup included.'],
];

export function ResultIncludesStrip() {
  return (
    <section className="category-strip" aria-label="What every Rendyn result includes">
      <p>Inside every result</p>
      <div>
        {includedResults.map((item, index) => (
          <Fragment key={item}>
            {index > 0 && <i aria-hidden="true">✦</i>}
            <span>{item}</span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export function ValueProposition() {
  return (
    <section className="problem-section section-shell" id="how-it-works">
      <div className="section-kicker"><span>02</span><p>What you get</p></div>
      <div className="problem-grid">
        <h2>Everything your agent needs<br />to build a polished interface.</h2>
        <div className="problem-copy">
          <p className="problem-lede">
            One search delivers a focused shortlist, visual previews, fit reasoning,
            complete source files and install steps.
          </p>
          <p>
            Choose a component, add it to your repository and keep building with editable
            code that belongs to your product.
          </p>
          <div className="outcome-points">
            {outcomes.map(([title, description]) => (
              <div key={title}><strong>{title}</strong><span>{description}</span></div>
            ))}
          </div>
          <a href="#intelligence">See the full deliverable <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}
