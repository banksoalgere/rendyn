import { describe, expect, it } from 'vitest';
import robots from './robots';
import sitemap from './sitemap';
import { catalogueEntries } from '../lib/catalogue';
import { guides } from '../lib/guides';
import { componentMetadata, homeDescription, homeStructuredData, homeTitle, pageMetadata } from '../lib/seo';

const PUBLIC_ORIGIN = 'https://rendyn.dev';

describe('public search metadata', () => {
  it('advertises the canonical Rendyn sitemap', () => {
    const rules = robots();

    expect(rules.sitemap).toBe(`${PUBLIC_ORIGIN}/sitemap.xml`);
  });

  it('lists only canonical HTTPS Rendyn URLs', () => {
    const entries = sitemap();

    expect(entries.length).toBeGreaterThan(1);
    expect(entries.every(({ url }) => url.startsWith(`${PUBLIC_ORIGIN}/`))).toBe(true);
    expect(entries.some(({ url }) => url.includes('chatgpt.site'))).toBe(false);
    expect(entries.some(({ url }) => url.includes('/resources/how-to-design-a-website-with-chatgpt'))).toBe(false);
  });

  it('includes every public guide and component once, excluding private routes', () => {
    const urls = sitemap().map(({ url }) => url);
    const expectedPaths = [
      '/', '/components', '/libraries', '/pricing', '/guides',
      '/mcp', '/collections/ai-agent-ui', '/collections/animated-react-components',
      ...guides.map(({ href }) => href),
      ...catalogueEntries.map(({ publicSlug }) => `/components/${publicSlug}`),
    ];
    expect(urls.sort()).toEqual(expectedPaths.map((path) => `${PUBLIC_ORIGIN}${path}`).sort());
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('identifies the homepage as Rendyn with matching search and social metadata', () => {
    const metadata = pageMetadata(homeTitle, homeDescription, '/');
    expect(metadata.openGraph).toMatchObject({ title: homeTitle, description: homeDescription, siteName: 'Rendyn', url: '/' });
    expect(metadata.twitter).toMatchObject({ title: homeTitle, description: homeDescription });
    expect(homeStructuredData['@graph']).toContainEqual(expect.objectContaining({
      '@type': 'WebSite', name: 'Rendyn', alternateName: 'rendyn.dev', url: `${PUBLIC_ORIGIN}/`,
    }));
    expect(homeDescription).toContain(String(catalogueEntries.length));
  });

  it('distinguishes every component in search while preserving its canonical URL', () => {
    const entries = catalogueEntries.map(componentMetadata);
    expect(new Set(entries.map(({ title }) => title)).size).toBe(catalogueEntries.length);
    expect(new Set(entries.map(({ description }) => description)).size).toBe(catalogueEntries.length);
    for (const [index, metadata] of entries.entries()) {
      expect(metadata.alternates?.canonical).toBe(`/components/${catalogueEntries[index].publicSlug}`);
      expect(metadata.openGraph).toMatchObject({ title: metadata.title, description: metadata.description, siteName: 'Rendyn' });
    }
  });
});
