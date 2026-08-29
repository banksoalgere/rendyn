const resources = [
  {
    slug: 'how-to-build-a-website-with-vibe-coding',
    category: 'Vibe coding',
    title: 'How to Build a Website With Vibe Coding',
    description: 'A practical brief, prompt template, testing loop and launch checklist for a website that feels designed.',
    accent: 'vibe',
    readTime: '8 min read',
    href: '/guides/how-to-build-a-website-with-vibe-coding',
  },
  {
    slug: 'give-ai-built-interfaces-a-point-of-view',
    category: 'AI interface design',
    title: 'How to give AI-built interfaces a stronger point of view',
    description: 'A practical approach to product context, component selection and more distinctive first drafts.',
    accent: 'generic',
    readTime: '8 min read',
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
  if (accent === 'vibe') {
    return (
      <div className="vibe-blueprint">
        <span>Brief → build → test</span>
        <div><i>01</i><p>State the outcome</p><b>Intent</b></div>
        <div><i>02</i><p>Ship one path</p><b>Draft</b></div>
        <div><i>03</i><p>Use the result</p><b>Proof</b></div>
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
            <span><i aria-hidden="true" /> New guide available</span>
          </div>
        </div>

        <div className="resources-grid" aria-label="DesignMCP articles and guides">
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
              {'href' in resource && resource.href ? (
                <a className="resource-status" href={resource.href}><span>Read the guide</span><i aria-hidden="true">↗</i></a>
              ) : (
                <div className="resource-status"><span>Planned article</span><i aria-hidden="true">Soon</i></div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
