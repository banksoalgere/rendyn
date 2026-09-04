import type { CatalogueEntry } from './catalogue';

export interface ComponentPreviewData {
  name: string;
  publicSlug: string;
  previewId: string;
  previewImage?: string;
}

// Keep static asset URLs and route IDs in one server-side adapter.
const images = import.meta.glob<string>('../../../catalog/previews/*.png', {
  eager: true,
  import: 'default',
  query: '?url',
});

export function getComponentPreview(component: CatalogueEntry): ComponentPreviewData {
  return {
    name: component.name,
    publicSlug: component.publicSlug,
    previewId: component.previewId,
    previewImage: images[`../../../catalog/previews/${component.slug}.png`],
  };
}
