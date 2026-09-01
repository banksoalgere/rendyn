import catalog from '../../../catalog/index.json';

export const catalogueCategoryLabels = {
  agents: 'Agent UI',
  blocks: 'Product blocks',
  motion: 'Interaction',
} as const;

export type CatalogueCategory = keyof typeof catalogueCategoryLabels;
type CatalogComponent = (typeof catalog.components)[number];

export interface CatalogueEntry extends CatalogComponent {
  category: CatalogueCategory;
  categoryLabel: string;
  previewId: string;
  publicSlug: string;
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function sanitisePublicText(value: string) {
  return value
    .replace(/\s+component from (?:beUI|Magic UI|Kibo UI)\.?$/i, ' component with a polished interactive treatment.')
    .replace(/\s+for (?:beUI|Magic UI|Kibo UI)\.?$/i, ' for polished interfaces.')
    .replace(/\b(?:beUI|Magic UI|Kibo UI)\b/gi, 'the catalogue');
}

const usedSlugs = new Set<string>();

export const catalogueEntries: CatalogueEntry[] = catalog.components.map((component, index) => {
  const baseSlug = slugify(component.name) || `component-${index + 1}`;
  let publicSlug = baseSlug;
  let alternative = 2;

  while (usedSlugs.has(publicSlug)) {
    publicSlug = `${baseSlug}-example-${alternative}`;
    alternative += 1;
  }
  usedSlugs.add(publicSlug);

  const category = component.category as CatalogueCategory;
  return {
    ...component,
    category,
    categoryLabel: catalogueCategoryLabels[category],
    description: sanitisePublicText(component.description),
    metadata: {
      ...component.metadata,
      notIdealWhen: component.metadata.notIdealWhen.map(sanitisePublicText),
      useWhen: component.metadata.useWhen.map(sanitisePublicText),
    },
    previewId: String(index + 1).padStart(3, '0'),
    publicSlug,
  };
});

export function findCatalogueEntry(publicSlug: string) {
  return catalogueEntries.find((component) => component.publicSlug === publicSlug);
}

export function getRelatedCatalogueEntries(component: CatalogueEntry, limit = 4) {
  return catalogueEntries
    .filter((candidate) => candidate.publicSlug !== component.publicSlug)
    .map((candidate) => {
      const sharedTags = candidate.metadata.tags.filter((tag) => component.metadata.tags.includes(tag)).length;
      const sharedInteractions = candidate.metadata.interactions.filter((interaction) => (
        component.metadata.interactions.includes(interaction)
      )).length;
      const score = sharedTags * 3
        + sharedInteractions * 2
        + Number(candidate.category === component.category)
        + Number(candidate.metadata.family === component.metadata.family);

      return { candidate, score };
    })
    .sort((left, right) => right.score - left.score || left.candidate.name.localeCompare(right.candidate.name))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function getAgentPrompt(component: CatalogueEntry) {
  return [
    `Use Rendyn to find the ${component.name} component.`,
    'Return the complete MIT-licensed React source, required dependencies, and installation steps.',
    `Adapt it for my product while preserving its ${component.metadata.interactions.join(', ') || 'core'} interaction behaviour, accessibility, responsive layout, and reduced-motion support.`,
  ].join(' ');
}
