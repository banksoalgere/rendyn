import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ComponentExplorer, type CatalogueComponent } from './component-explorer';

const components: CatalogueComponent[] = Array.from({ length: 30 }, (_, index) => ({
  name: `Demo ${index}`,
  publicSlug: `demo-${index}`,
  previewId: String(index + 1).padStart(3, '0'),
  category: index < 20 ? 'motion' : 'agents',
  description: `Example ${index}`,
  tags: [],
  search: {
    id: `beui:demo-${index}`, sourceId: 'beui', slug: `demo-${index}`, name: `Demo ${index}`,
    description: `Example ${index}`, category: index < 20 ? 'motion' : 'agents', previewPath: `/preview/motion/demo-${index}`,
    metadata: { kind: 'component', family: `demo-${index}`, tags: [], aliases: [], interactions: [],
      useWhen: [], notIdealWhen: [], visualSignature: `demo-${index}` },
  },
}));

describe('initial catalogue rendering', () => {
  it('renders a library file tree and only one live preview', () => {
    const html = renderToStaticMarkup(createElement(ComponentExplorer, {
      components, initialCategory: 'all',
    }));

    expect(html).toContain('role="tree"');
    expect(html.match(/<iframe\b/g)).toHaveLength(1);
    expect(html).toContain('/component-preview/001?embed=1');
    expect(html).toContain('Component library');
    expect(html).not.toContain('rel="next"');
    expect(html).toContain('Demo 29');
    expect(html).not.toContain('Show more components');
  });

  it('filters the file tree across the entire catalogue', () => {
    const html = renderToStaticMarkup(createElement(ComponentExplorer, {
      components, initialCategory: 'agents',
    }));

    expect(html).toContain('role="tree"');
    expect(html).toContain('/component-preview/021?embed=1');
    expect(html.match(/<iframe\b/g)).toHaveLength(1);
    expect(html).toContain('10 components');
  });

  it('renders a shared search in the initial HTML, including a result outside the featured selection', () => {
    const html = renderToStaticMarkup(createElement(ComponentExplorer, {
      components, initialCategory: 'all', initialQuery: 'Demo 29',
    }));

    expect(html.match(/<iframe\b/g)).toHaveLength(1);
    expect(html).toContain('/components/demo-29');
    expect(html).toContain('Example 29');
    expect(html).toContain('value="Demo 29"');
    expect(html).not.toContain('rel="next"');
  });

  it('shows the full matching file list for legacy paginated URLs', () => {
    const html = renderToStaticMarkup(createElement(ComponentExplorer, {
      components, initialCategory: 'agents', initialPage: 2,
    }));

    expect(html.match(/<iframe\b/g)).toHaveLength(1);
    expect(html).toContain('Demo 29');
    expect(html).toContain('Demo 20');
    expect(html).not.toContain('rel="prev"');
    expect(html).not.toContain('rel="next"');
  });

  it('provides a recovery action when no components match', () => {
    const html = renderToStaticMarkup(createElement(ComponentExplorer, {
      components, initialCategory: 'all', initialQuery: 'no-such-component',
    }));

    expect(html).not.toContain('<article');
    expect(html).toContain('No components found');
    expect(html).toContain('Clear search and filters');
  });
});
