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
}));

describe('initial catalogue rendering', () => {
  it('renders six curated previews with a crawlable link to the next page', () => {
    const html = renderToStaticMarkup(createElement(ComponentExplorer, {
      components, initialCategory: 'all',
    }));

    expect(html.match(/<article\b/g)).toHaveLength(6);
    expect(html.match(/<iframe\b/g)).toHaveLength(1);
    expect(html).toContain('/component-preview/001?embed=1');
    expect(html).toContain('A few favourites');
    expect(html).toContain('href="/components?page=2" rel="next"');
    expect(html).not.toContain('Show more components');
  });

  it('filters the entire catalogue before selecting a page', () => {
    const html = renderToStaticMarkup(createElement(ComponentExplorer, {
      components, initialCategory: 'agents',
    }));

    expect(html.match(/<article\b/g)).toHaveLength(6);
    expect(html).toContain('/component-preview/021?embed=1');
    expect(html).toContain('href="/components?category=agents&amp;page=2" rel="next"');
    expect(html).toContain('10 matches');
  });

  it('renders a shared search in the initial HTML, including a result outside the featured selection', () => {
    const html = renderToStaticMarkup(createElement(ComponentExplorer, {
      components, initialCategory: 'all', initialQuery: 'Demo 29',
    }));

    expect(html.match(/<article\b/g)).toHaveLength(1);
    expect(html).toContain('/components/demo-29');
    expect(html).toContain('Example 29');
    expect(html).toContain('value="Demo 29"');
    expect(html).not.toContain('rel="next"');
  });

  it('renders the last page and preserves filters in its previous link', () => {
    const html = renderToStaticMarkup(createElement(ComponentExplorer, {
      components, initialCategory: 'agents', initialPage: 2,
    }));

    expect(html.match(/<article\b/g)).toHaveLength(4);
    expect(html).toContain('/components/demo-29');
    expect(html).toContain('href="/components?category=agents" rel="prev"');
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
