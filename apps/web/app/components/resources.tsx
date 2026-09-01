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
    slug: 'vibe-coding-templates',
    href: '/guides/vibe-coding-templates',
    category: 'Template strategy',
    title: 'Best templates for vibe coding',
    description: 'A researched comparison of public remixes, code-first UI blocks, premium starters, and reusable team foundations.',
    accent: 'intent',
    readTime: '12 min read',
    status: 'Read the guide',
  },
  {
    slug: 'how-to-build-a-website-with-vibe-coding',
    href: '/guides/how-to-build-a-website-with-vibe-coding',
    category: 'Vibe coding',
    title: 'How to Build a Website With Vibe Coding',
    description: 'A practical brief, prompt template, testing loop and launch checklist for a website that feels designed.',
    accent: 'vibe-website',
    readTime: '8 min read',
    status: 'Read the guide',
  },
  {
    slug: 'how-to-design-an-app-with-chatgpt',
    href: '/blog/how-to-design-an-app-with-chatgpt',
    category: 'ChatGPT app design',
    title: 'How to design an app with ChatGPT',
    description: 'A practical workflow from product brief and user flows to an intentional, browser-tested prototype.',
    accent: 'intent',
    readTime: '12 min read',
    status: 'Read the guide',
  },
  {
    slug: 'how-to-design-a-website-with-chatgpt',
    href: '/guides/how-to-design-a-website-with-chatgpt',
    category: 'ChatGPT website design',
    title: 'How to design a website with ChatGPT',
    description: 'A complete design-led workflow for sharper briefs, distinctive visual direction, production code and real browser QA.',
    accent: 'generic',
    readTime: '13 min read',
    status: 'Read the guide',
  },
  {
    slug: 'vibe-coding-design',
    href: '/guides/vibe-coding-design',
    category: 'AI interface design',
    title: 'Vibe Coding Design: How to Make Your App Look Good',
    description: 'A practical workflow for hierarchy, design systems, better prompts and a more polished vibe coding UI.',
    accent: 'generic',
    readTime: '12 min read',
    status: 'Read the guide',
  },
  {
    slug: 'how-to-build-a-good-looking-website-with-cursor',
    href: '/guides/how-to-build-a-good-looking-website-with-cursor',
    category: 'Cursor website design',
    title: 'How to build a good-looking website with Cursor',
    description: 'A practical, design-system-first workflow for turning a functional Cursor build into a polished, distinctive website.',
    accent: 'cursor',
    readTime: '12 min read',
    status: 'Read the guide',
  },
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
    slug: 'best-claude-code-templates',
    href: '/blog/best-claude-code-templates',
    category: 'Claude Code templates',
    title: 'Best Claude Code templates for skills, agents and websites',
    description: 'Six useful starting points compared by scope, safety, maintainability and speed to first value.',
    accent: 'delivery',
    readTime: '12 min read',
    status: 'Read the guide',
  },
  {
    slug: 'best-cursor-templates',
    href: '/blog/best-cursor-templates',
    category: 'Cursor templates',
    title: 'The 7 best Cursor templates for building better websites',
    description: 'A researched comparison of source-code starters, visual systems and practical ways to make any template work better in Cursor.',
    accent: 'delivery',
    readTime: '15 min read',
    status: 'Read the guide',
  },
  {
    slug: 'how-to-make-codex-better-at-design',
    href: '/guides/how-to-make-codex-better-at-design',
    category: 'Codex design',
    title: 'How to make Codex better at design',
    description: 'A practical workflow for giving Codex stronger context, visual direction, interface ingredients, and browser QA.',
    accent: 'intent',
    readTime: '12 min read',
    status: 'Read the guide',
  },
  {
    slug: 'cursor-design',
    href: '/guides/cursor-design',
    category: 'Cursor design',
    title: 'How to make Cursor better at design',
    description: 'A practical workflow for giving Cursor stronger visual context, component choices, prompts, and browser QA.',
    accent: 'generic',
    readTime: '12 min read',
    status: 'Read the guide',
  },
];

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
