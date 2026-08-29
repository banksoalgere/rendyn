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
  ['Decide faster', 'Three ranked fits instead of an endless gallery.'],
  ['Revise less', 'Trade-offs are clear before the code lands.'],
  ['Keep control', 'The finished implementation lives in your product.'],
];

export function ResultIncludesStrip() {
  return (
    <section className="category-strip" aria-label="What every DesignMCP result includes">
      <p>Every search gives you</p>
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
        <h2>A product that looks considered.<br />Without you designing every screen.</h2>
        <div className="problem-copy">
          <p className="problem-lede">
            Stronger UI choices on the first pass, so you spend less time correcting
            generic layouts and more time shipping the product.
          </p>
          <p>
            DesignMCP turns one product brief into a few relevant options, then turns the
            selected option into complete, editable code inside your repository.
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
