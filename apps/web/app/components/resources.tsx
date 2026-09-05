import { guides as resources } from '../../lib/guides';

function ResourceVisual({ accent }: { accent: string }) {
  if (accent === 'vibe-website') {
    return (
      <div className="vibe-website-blueprint">
        <span>Brief → build → test</span>
        <div><i>01</i><p>State the outcome</p><b>Intent</b></div>
        <div><i>02</i><p>Ship one path</p><b>Draft</b></div>
        <div><i>03</i><p>Use the result</p><b>Proof</b></div>
      </div>
    );
  }
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
    return <a className={className} data-resource-slug={resource.slug} href={resource.href}>{content}</a>;
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
            <span><i aria-hidden="true" /> Twelve field guides available</span>
          </div>
        </div>

        <div className="resources-grid" aria-label="Rendyn guides">
          {resources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
