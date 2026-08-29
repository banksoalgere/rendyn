import Link from 'next/link';

type Resource = {
  slug: string;
  href?: string;
  category: string;
  title: string;
  description: string;
  accent: string;
  readTime: string;
  status: string;
};

const resources: Resource[] = [
  {
    slug: 'how-to-make-claude-code-better-at-design',
    href: '/guides/how-to-make-claude-code-better-at-design',
    category: 'Claude Code design',
    title: 'How to make Claude Code better at design',
    description: 'A practical workflow for giving Claude visual direction, reusable design context and a real browser feedback loop.',
    accent: 'intent',
    readTime: '12 min read',
    status: 'Read the guide',
  },
  {
    slug: 'how-to-design-a-website-with-claude-code',
    href: '/guides/how-to-design-a-website-with-claude-code',
    category: 'Claude Code frontend',
    title: 'How to design a website with Claude Code',
    description: 'A practical workflow for briefing, building, testing and refining a distinctive website with Claude Code.',
    accent: 'generic',
    readTime: '12 min read',
    status: 'Read the guide',
  },
  {
    slug: 'what-coding-agents-need-from-component-libraries',
    category: 'MCP workflows',
    title: 'The component library built for coding agents',
    description: 'A guide to the previews, context and source files agents use to make reliable product decisions.',
    accent: 'delivery',
    readTime: '6 min read',
    status: 'Planned article',
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

function ResourceCard({ resource }: { resource: Resource }) {
  const content = (
    <>
      <div className="resource-visual" aria-hidden="true">
        <ResourceVisual accent={resource.accent} />
      </div>
      <div className="resource-meta"><span>{resource.category}</span><span>{resource.readTime}</span></div>
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      <div className="resource-status"><span>{resource.status}</span><i aria-hidden="true">{resource.href ? 'Read ↗' : 'Soon'}</i></div>
    </>
  );
  const className = `resource-card resource-card--${resource.accent}${resource.href ? ' resource-card--live' : ''}`;

  if (resource.href) {
    return <Link className={className} data-resource-slug={resource.slug} href={resource.href}>{content}</Link>;
  }

  return <article className={className} data-resource-slug={resource.slug}>{content}</article>;
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
            <span><i aria-hidden="true" /> Two Claude Code field guides available</span>
          </div>
        </div>

        <div className="resources-grid" aria-label="DesignMCP guides and planned articles">
          {resources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
