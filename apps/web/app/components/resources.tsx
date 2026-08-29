import Link from 'next/link';

const resources = [
  {
    slug: 'vibe-coding-templates',
    category: 'Template strategy',
    title: 'Best templates for vibe coding',
    description: 'A researched comparison of public remixes, code-first UI blocks, premium starters, and reusable team foundations.',
    accent: 'intent',
    readTime: '12 min read',
    href: '/guides/vibe-coding-templates',
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
            <span><i aria-hidden="true" /> First editorial guide published</span>
          </div>
        </div>

        <div className="resources-grid" aria-label="DesignMCP editorial guides">
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
              {'href' in resource ? (
                <Link className="resource-status" href={resource.href}><span>Read guide</span><i aria-hidden="true">↗</i></Link>
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
