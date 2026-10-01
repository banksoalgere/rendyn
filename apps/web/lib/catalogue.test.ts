import libraries from '../../../sources/libraries.json';
import { describe, expect, it } from 'vitest';
import { catalogueEntries, findCatalogueEntry, getRelatedCatalogueEntries } from './catalogue';

const expectedCatalogueCount = 189 + libraries.reduce((n,c)=>n+c.components.length,0);

describe('public component catalogue', () => {
  it('creates one unique, source-neutral page slug per component', () => {
    const slugs = catalogueEntries.map((component) => component.publicSlug);

    expect(slugs).toHaveLength(expectedCatalogueCount);
    expect(new Set(slugs).size).toBe(expectedCatalogueCount);
    expect(slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))).toBe(true);
    expect(slugs.some((slug) => /^(beui|kibo|magicui)-/.test(slug))).toBe(false);
  });

  it('provides crawlable pages for representative catalogue entries', () => {
    expect(findCatalogueEntry('approval-card')?.name).toBe('Approval Card');
    expect(findCatalogueEntry('kanban')?.name).toBe('Kanban');
    expect(findCatalogueEntry('animated-beam')?.name).toBe('Animated Beam');
  });

  it('returns related components without returning the current component', () => {
    const component = findCatalogueEntry('approval-card');
    expect(component).toBeDefined();

    const related = getRelatedCatalogueEntries(component!);
    expect(related).toHaveLength(4);
    expect(related.every((candidate) => candidate.publicSlug !== component!.publicSlug)).toBe(true);
  });
});
