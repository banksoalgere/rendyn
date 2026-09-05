import type { CatalogueEntry } from './catalogue';

export interface ComponentPreviewData {
  name: string;
  publicSlug: string;
  previewId: string;
}

export function getComponentPreview(component: CatalogueEntry): ComponentPreviewData {
  return {
    name: component.name,
    publicSlug: component.publicSlug,
    previewId: component.previewId,
  };
}
