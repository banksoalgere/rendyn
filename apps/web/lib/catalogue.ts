import catalog from '../../../catalog/index.json';
import pinnedPublicSlugs from '../../../catalog/public-slugs.json';
import { assignPublicSlugs } from '../../../packages/catalog/src/public-slugs';
import { toSearchComponent, type SearchComponent } from '../../../packages/catalog/src/types';

export const catalogueCategoryLabels = {
  agents: 'Agent UI',
  blocks: 'Components & blocks',
  motion: 'Interaction',
} as const;

export type CatalogueCategory = keyof typeof catalogueCategoryLabels;
type CatalogComponent = (typeof catalog.components)[number];

export interface CatalogueEntry extends CatalogComponent {
  category: CatalogueCategory;
  categoryLabel: string;
  previewId: string;
  publicSlug: string;
  search: SearchComponent;
}

function sanitisePublicText(value: string) {
  return value
    .replace(/\s+component from (?:beUI|Magic UI|Kibo UI)\.?$/i, ' component with a polished interactive treatment.')
    .replace(/\s+for (?:beUI|Magic UI|Kibo UI)\.?$/i, ' for polished interfaces.')
    .replace(/\b(?:beUI|Magic UI|Kibo UI)\b/gi, 'the catalogue');
}

const publicSlugs = assignPublicSlugs(catalog.components, pinnedPublicSlugs);

export const catalogueEntries: CatalogueEntry[] = catalog.components.map((component) => {
  const publicSlug = publicSlugs[component.id];

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
    previewId: component.slug,
    publicSlug,
    search: toSearchComponent({ ...component, category }),
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
