import type { CatalogComponent } from "@rendyn/catalog";
import { componentSetup } from './component-setup.js';

export function componentPayload(component: CatalogComponent, previewUrl: string, licenseText: string) {
  const { searchText: _searchText, ...metadata } = component.metadata;
  const setup = componentSetup(component);
  return {
    id: component.id,
    slug: component.slug,
    name: component.name,
    description: component.description,
    category: component.category,
    metadata,
    preview_url: previewUrl,
    dependencies: setup.dependencies,
    internal_dependencies: component.internalDependencies,
    files: component.files,
    install: setup.install,
    entrypoints: setup.entrypoints,
    required_project_imports: setup.required_project_imports,
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
