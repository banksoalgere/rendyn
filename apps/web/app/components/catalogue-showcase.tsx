const categories = [
  'Actions',
  'Navigation',
  'Commerce',
  'Onboarding',
  'Data display',
  'Feedback',
  'Marketing',
  'Motion',
];

export function CatalogueShowcase() {
  return (
    <section className="catalogue-section section-shell" id="catalogue">
      <div className="section-kicker"><span>01</span><p>The collection</p></div>
      <div className="catalogue-heading">
        <h2>Meet your agent&apos;s<br />new design library.</h2>
        <p>
          Actions, navigation, commerce, onboarding, data display and motion, ready for
          real products. Every component includes polished states, source files and setup details.
        </p>
      </div>

      <div className="catalogue-board" aria-hidden="true">
        <div className="board-grid" aria-hidden="true" />
        <article className="component-tile component-tile--command">
          <div className="tile-top"><span>Command menu</span><i>01</i></div>
          <div className="command-demo">
            <p><span>⌕</span> Search actions...</p>
            <div><span>New project</span><kbd>⌘ N</kbd></div>
            <div><span>Open catalogue</span><kbd>⌘ K</kbd></div>
          </div>
        </article>
        <article className="component-tile component-tile--pricing">
          <div className="tile-top"><span>Pricing action</span><i>02</i></div>
          <div className="price-demo"><span>Pro</span><strong>£24<small>/mo</small></strong><button type="button" tabIndex={-1}>Start building →</button></div>
        </article>
        <article className="component-tile component-tile--toast">
          <div className="tile-top"><span>Success feedback</span><i>03</i></div>
          <div className="toast-demo"><i>✓</i><div><strong>Changes deployed</strong><span>Production updated 12s ago</span></div></div>
        </article>
        <article className="component-tile component-tile--filter">
          <div className="tile-top"><span>Data filter</span><i>04</i></div>
          <div className="filter-demo"><button type="button" tabIndex={-1}>All components <span>84</span></button><button type="button" tabIndex={-1}>Accessible <span>61</span></button><button type="button" tabIndex={-1}>Low motion <span>38</span></button></div>
        </article>
        <div className="board-note board-note--one">Made for<br />real products <span>↗</span></div>
        <div className="board-note board-note--two">React / TS / Tailwind</div>
      </div>

      <div className="category-links">
        {categories.map((category, index) => (
          <a href="#product" key={category}>
            <span>0{index + 1}</span><p>{category}</p><i aria-hidden="true">↗</i>
          </a>
        ))}
      </div>
    </section>
  );
}
