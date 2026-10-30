import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { searchCatalog } from './search.js';
import { parseCatalogIndex } from './schema.js';

const catalog = parseCatalogIndex(JSON.parse(readFileSync(new URL('../../../catalog/index.json', import.meta.url), 'utf8')));
const cases = [
  ['A clean restrained B2B SaaS hero with a product demo video and a clear call to action', 'magicui-hero-video-dialog'],
  ['A responsive bento grid for presenting product features on a minimal white landing page', 'magicui-bento-grid'],
  ['A calm call to action button with a subtle hover animation for a B2B SaaS landing page', 'magicui-interactive-hover-button'],
  ['Drag and drop file upload with progress', 'file-upload'],
  ['Data table with sorting filtering and pagination', 'table'],
  ['An FAQ where only one answer expands at a time', 'bouncy-accordion'],
  ['Show a notification after saving settings', 'animated-toast-stack'],
  ['A kanban board for moving tasks between columns', 'kibo-kanban'],
  ['feature cards for my product', 'magicui-bento-grid'],
  ['command palette for keyboard navigation', 'command-palette'],
  ['subtle animated gradient background', 'shader-background'],
  ['a dropdown for choosing multiple countries', 'multi-select'],
  ['searchable dropdown with keyboard navigation', 'combobox'],
  ['not found page', 'not-found'],
] as const;

describe('real catalogue design briefs', () => {
  it.each(cases)('finds a useful first choice for %s', (query, slug) => {
    expect(searchCatalog(catalog, query)[0]?.slug).toBe(slug);
  });
  it.each(['pricing tiers cards', 'Customer testimonials with quotes and avatars', 'quantum teleportation simulator'])('does not fill an unsupported request with unrelated cards: %s', query => {
    expect(searchCatalog(catalog, query)).toEqual([]);
  });
  it('keeps secondary mentions of buttons from hiding a hero', () => {
    expect(searchCatalog(catalog, 'a hero video with a play button')[0]?.slug).toBe('magicui-hero-video-dialog');
  });
  it('keeps FAQ results focused on accordions rather than code disclosures', () => {
    const results = searchCatalog(catalog, 'FAQ with expandable answers');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(result => /accordion/.test(result.slug))).toBe(true);
  });
  it('respects an explicit category rather than silently ignoring it', () => {
    expect(searchCatalog(catalog, 'bento grid', {category:'blocks'})).toEqual([]);
  });
  it('finds logo strips without confusing them with striped backgrounds', () => {
    const results = searchCatalog(catalog, 'a moving strip of customer logos');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].slug).toContain('marquee');
    expect(results.every(result => result.slug.includes('marquee') || result.slug.includes('icon-cloud'))).toBe(true);
  });
  it('respects exclusions rather than ranking excluded styles first', () => {
    const results = searchCatalog(catalog, 'A button, no rainbow or neon, just a quiet hover');
    expect(results[0]?.slug).toBe('magicui-interactive-hover-button');
    expect(results.every(result => !/rainbow|neon/.test(result.slug))).toBe(true);
    expect(searchCatalog(catalog, 'I need an accordion without any spring or bounce animation')).toEqual([]);
    expect(searchCatalog(catalog, 'A button with no animation')).toEqual([]);
  });
  it('finds AI activity without letting the generic assistant synonym hide it', () => {
    const results = searchCatalog(catalog, 'an AI assistant showing its thinking and tool calls');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(result => result.category === 'agents')).toBe(true);
  });
  it('still finds an exact component by name', () => {
    expect(searchCatalog(catalog, 'Hero Video Dialog')[0]?.slug).toBe('magicui-hero-video-dialog');
    expect(searchCatalog(catalog, 'Animated CTA Buttons')[0]?.slug).toBe('expanding-arrow-button');
  });
});
