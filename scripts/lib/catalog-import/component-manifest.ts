import type {
  CatalogComponent,
  CatalogComponentSummary,
  CatalogFile,
  CatalogSource,
} from "../../../packages/catalog/src/types.js";
import { buildMetadata, unique } from "./metadata.js";
import type { RegistryDetail, SourceConfig } from "./schemas.js";
import { sha256 } from "./security.js";

function componentIntegrity(files: CatalogFile[]): string {
  const fileHashes = files.map(({ path, sha256: hash }) => ({ path, sha256: hash }));
  return `sha256:${sha256(JSON.stringify(fileHashes))}`;
}

export function createComponentSummary(
  detail: RegistryDetail,
  markdown: string,
  config: SourceConfig,
  files: CatalogFile[],
): CatalogComponentSummary {
  return {
    id: `${config.id}:${detail.slug}`,
    sourceId: config.id,
    slug: detail.slug,
    name: detail.name,
    description: detail.description,
    category: detail.category,
    publishedAt: detail.published_at,
    updatedAt: detail.updated_at,
    dependencies: unique(detail.dependencies).sort(),
    internalDependencies: unique(detail.internal).sort(),
    metadata: buildMetadata(detail, markdown),
    previewPath: `/preview/${detail.category}/${detail.slug}`,
    manifestPath: `components/${detail.slug}/component.json`,
    integrity: componentIntegrity(files),
  };
}

export function createComponentManifest(
  summary: CatalogComponentSummary,
  detail: RegistryDetail,
  markdown: string,
  files: CatalogFile[],
  source: CatalogSource,
): CatalogComponent {
  const dependencyCommand = summary.dependencies.length > 0
    ? `pnpm add ${summary.dependencies.join(" ")}`
    : null;
  const installDependencies = dependencyCommand
    ? [`Install external packages: ${dependencyCommand}`]
    : [];

  return {
    ...summary,
    source,
    files,
    install: {
      packageManager: "pnpm",
      dependencyCommand,
      registryDependencyCommand: null,
      stylePaths: [],
      instructions: [
        ...installDependencies,
        "Copy every returned file to its stated project-relative path.",
        "Preserve the MIT copyright and permission notice in your product notices.",
        "Review imports beginning with @/ and map them to your project alias if it differs.",
      ],
    },
    provenance: {
      upstreamSlug: detail.slug,
      upstreamPageUrl: detail.page_url,
      upstreamDetailUrl: detail.detail_url,
      upstreamMarkdownUrl: detail.markdown_url,
      transformations: [],
    },
    documentation: markdown,
  };
}
