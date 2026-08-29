const resources = [
  {
    slug: 'how-to-build-a-good-looking-website-with-cursor',
    category: 'Cursor website design',
    title: 'How to build a good-looking website with Cursor',
    description: 'A practical, design-system-first workflow for turning a functional Cursor build into a polished, distinctive website.',
    accent: 'cursor',
    readTime: '12 min read',
    href: '/guides/how-to-build-a-good-looking-website-with-cursor',
  },
  {
    slug: 'choose-ui-components-by-product-intent',
    category: 'Component strategy',
    title: 'How to choose UI components by product intent',
    description: 'A practical framework for moving from a product outcome to a focused, defensible component choice.',
    accent: 'intent',
    readTime: '7 min read',
  },
  {
    slug: 'what-coding-agents-need-from-component-libraries',
    category: 'MCP workflows',
    title: 'The component library built for coding agents',
    description: 'A guide to the previews, context and source files agents use to make reliable product decisions.',
    accent: 'delivery',
    readTime: '6 min read',
  },
];

function ResourceVisual({ accent }: { accent: string }) {
  if (accent === 'cursor') {
    return (
      <div className="cursor-article-visual">
        <div className="cursor-visual-bar"><i /><i /><i /><span>localhost:3000</span></div>
        <div className="cursor-visual-canvas">
          <span>From generic</span>
          <strong>to intentional.</strong>
          <div><i /><i /><i /></div>
        </div>
        <p>Design direction applied <span>✓</span></p>
      </div>
    );
  }
  if (accent === 'intent') {
    return (
      <div className="intent-map">
        <span>Product intent</span>
        <div><i>01</i><p>Outcome</p></div>
        <div><i>02</i><p>Context</p></div>
        <div><i>03</i><p>Best fit</p></div>
      </div>
    );
  }
  if (accent === 'generic') {
    return (
      <div className="pattern-grid">
        <i /><i /><i /><i /><i /><i />
        <span>Break the pattern</span>
      </div>
    );
  }
  return (
    <div className="delivery-stack">
      <div><span>TSX</span><p>component.tsx</p></div>
      <div><span>CSS</span><p>states.css</p></div>
      <div><span>DOC</span><p>install.md</p></div>
    </div>
  );
}

export function Resources() {
  return (
    <section className="resources-section" id="resources">
      <div className="section-shell">
        <div className="section-kicker"><span>03</span><p>Resources</p></div>
        <div className="resources-heading">
          <div>
            <p className="eyebrow">Build with more context</p>
            <h2>Guides for better<br />AI-built products.</h2>
          </div>
          <div className="resources-intro">
            <p>Practical thinking on component decisions, agent workflows, and producing interface work that feels intentional.</p>
            <span><i aria-hidden="true" /> New field guide available</span>
          </div>
        </div>

        <div className="resources-grid" aria-label="DesignMCP articles">
          {resources.map((resource) => {
            const content = (
              <>
                <div className="resource-visual" aria-hidden="true">
                  <ResourceVisual accent={resource.accent} />
                </div>
                <div className="resource-meta"><span>{resource.category}</span><span>{resource.readTime}</span></div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <div className="resource-status">
                  <span>{resource.href ? 'Read the guide' : 'Planned article'}</span>
                  <i aria-hidden="true">{resource.href ? 'Open ↗' : 'Soon'}</i>
                </div>
              </>
            );

            return resource.href ? (
              <a
                className={`resource-card resource-card--${resource.accent}`}
                data-resource-slug={resource.slug}
                href={resource.href}
                id={resource.slug}
                key={resource.slug}
              >
                {content}
              </a>
            ) : (
              <article
                className={`resource-card resource-card--${resource.accent}`}
                data-resource-slug={resource.slug}
                id={resource.slug}
                key={resource.slug}
              >
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
