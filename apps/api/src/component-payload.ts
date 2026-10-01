import type { CatalogComponent } from "@rendyn/catalog";
import { discoveryLabels } from '@rendyn/catalog';

export function componentPayload(component: CatalogComponent, previewUrl: string, licenseText: string) {
  return {
    id: component.id,
    slug: component.slug,
    name: component.name,
    description: component.description,
    category: component.category,
    metadata: { ...discoveryLabels(component.metadata), useWhen: component.metadata.useWhen,
      notIdealWhen: component.metadata.notIdealWhen, visualSignature: component.metadata.visualSignature },
    preview_url: previewUrl,
    dependencies: component.dependencies,
    internal_dependencies: component.internalDependencies,
    files: component.files,
    install: component.install,
    integrity: component.integrity,
    source: {
      repository: component.source.repository,
      commit: component.source.commit,
    },
    license: {
      spdx: component.source.license.spdx,
      copyright: component.source.license.copyright,
      text: licenseText,
    },
  };
}
