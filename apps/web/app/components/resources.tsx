const resources = [
  {
    slug: 'choose-ui-components-by-product-intent',
    category: 'Component strategy',
    title: 'How to choose UI components by product intent',
    description: 'A practical framework for moving from a product outcome to a focused, defensible component choice.',
    accent: 'intent',
    readTime: '7 min read',
  },
  {
    slug: 'why-ai-generated-interfaces-feel-generic',
    category: 'AI interface design',
    title: 'Why AI-generated interfaces feel generic',
    description: 'The recurring causes of generic AI-built UI, plus a workflow for producing more intentional first drafts.',
    accent: 'generic',
    readTime: '8 min read',
  },
  {
    slug: 'what-coding-agents-need-from-component-libraries',
    category: 'MCP workflows',
    title: 'What coding agents need from a component library',
    description: 'Why previews and snippets are not enough when an agent needs to make a reliable product decision.',
    accent: 'delivery',
    readTime: '6 min read',
  },
];

function ResourceVisual({ accent }: { accent: string }) {
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
            <span><i aria-hidden="true" /> Article library coming soon</span>
          </div>
        </div>

        <div className="resources-grid" aria-label="Planned DesignMCP articles">
          {resources.map((resource) => (
            <article
              className={`resource-card resource-card--${resource.accent}`}
              data-resource-slug={resource.slug}
              key={resource.slug}
            >
              <div className="resource-visual" aria-hidden="true">
                <ResourceVisual accent={resource.accent} />
              </div>
              <div className="resource-meta"><span>{resource.category}</span><span>{resource.readTime}</span></div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <div className="resource-status"><span>Planned article</span><i aria-hidden="true">Soon</i></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
