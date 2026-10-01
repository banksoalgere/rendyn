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
  ['keyboard-first command menu for a dense admin tool', 'command-palette'],
  ['human approval before an AI agent publishes changes', 'approval-card'],
  ['approval before an agent acts', 'approval-card'],
  ['approval card for human in the loop agent action', 'approval-card'],
  ['command', 'command-palette'],
  ['commmand palete', 'command-palette'],
  ['AI chat', 'chat-app'],
  ['approv', 'approval-card'],
  ['a place to type a message to an AI assistant', 'prompt-input'],
] as const;

describe('real catalogue design briefs', () => {
  it('puts every exact catalogue name first, including Tabs, Select and Tweet Card', () => {
    for (const component of catalog.components) {
      expect(searchCatalog(catalog, component.name)[0]?.name, component.name).toBe(component.name);
    }
  });
  it('recognizes exact identifiers and keeps tabs separate from switches and sidebars', () => {
    expect(searchCatalog(catalog, 'beui:button')[0]?.id).toBe('beui:button');
    for (const query of ['tabs with icons', 'tabs for switching sections']) {
      const results = searchCatalog(catalog, query);
      expect(results.length).toBeGreaterThan(0);
      expect(results.every(result => /tabs/i.test(result.name))).toBe(true);
    }
    expect(searchCatalog(catalog, 'nothing related exists qwxplz')).toEqual([]);
  });
  it('finds short requests for agent activity and confirmation', () => {
    const activity = searchCatalog(catalog, 'show the agent thinking');
    expect(activity.length).toBeGreaterThan(0);
    expect(activity.every(result => result.category === 'agents')).toBe(true);
    const approval = searchCatalog(catalog, 'confirm before deleting a file');
    expect(approval.length).toBeGreaterThan(0);
    expect(approval.every(result => ['approval-card', 'tool-approval'].includes(result.slug))).toBe(true);
  });
  it('keeps contextual table queries focused on tables', () => {
    const results = searchCatalog(catalog, 'dashboard table for reviewing user status and roles');
    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(results.every(result => /table/i.test(result.name))).toBe(true);
  });
  it('does not substitute generic cards for a human approval flow', () => {
    const results = searchCatalog(catalog, 'approval card for human in the loop agent action');
    expect(results.map(result => result.slug)).toEqual(['approval-card', 'tool-approval']);
  });
  it.each(['button nonexistentpattern', 'solar orbital trajectories visualization', 'zzzzzzzzzz', '<script>alert(1)</script>'])('keeps unrelated or malformed queries empty: %s', query => {
    expect(searchCatalog(catalog, query)).toEqual([]);
  });
  it.each(cases)('finds a useful first choice for %s', (query, slug) => {
    const actual=searchCatalog(catalog,query)[0];
    if(slug==='animated-toast-stack') expect(actual?.labels.family).toMatch(/^toast$/);
    else if(slug==='bouncy-accordion') expect(actual?.labels.family).toBe('accordion');
    else if(slug==='not-found') expect(actual?.name).toMatch(/not found/i);
    else if(slug==='command-palette' && !/palete|command palette/.test(query)) expect(actual?.labels.family).toMatch(/^command(?:-palette)?$/);
    else if(slug==='magicui-interactive-hover-button') {
      expect(actual?.labels.family).toBe('button');
      expect(actual?.labels.visual?.states).toContain('hover-state');
      expect(actual?.labels.visual?.motion.length).toBeGreaterThan(0);
    }
    else if(slug==='multi-select') expect(actual?.name).toMatch(/multi.?select/i);
    else expect(actual?.slug).toBe(slug);
  });
  it.each(['Customer testimonials with quotes and avatars', 'quantum teleportation simulator'])('does not fill an unsupported request with unrelated cards: %s', query => {
    expect(searchCatalog(catalog, query)).toEqual([]);
  });
  it('finds newly imported pricing patterns',()=>{
    const results=searchCatalog(catalog,'pricing tiers cards');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(result=>result.labels.family==='pricing')).toBe(true);
  });
  it('keeps secondary mentions of buttons from hiding a hero', () => {
    expect(searchCatalog(catalog, 'a hero video with a play button')[0]?.slug).toBe('magicui-hero-video-dialog');
  });
  it('keeps FAQ results focused on accordions rather than code disclosures', () => {
    const results = searchCatalog(catalog, 'FAQ with expandable answers');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(result => result.labels.family === 'accordion')).toBe(true);
  });
  it.each([
    ['password input', 'password-input'], ['number input', 'number-input'],
    ['date picker', 'date-picker'], ['color picker', 'color-picker'],
  ])('finds the specific control family for %s', (query, family) => {
    const results = searchCatalog(catalog, query);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(result => result.labels.family === family)).toBe(true);
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
