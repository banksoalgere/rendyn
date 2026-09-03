import { describe, expect, it } from 'vitest';
import robots from './robots';
import sitemap from './sitemap';

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
});
