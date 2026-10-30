export type CatalogCategorySlug = "motion" | "agents" | "blocks";

export interface CatalogSource {
  id: string;
  name: string;
  repository: string;
  commit: string;
  registrySha256: string;
  importedAt: string;
  license: {
    spdx: "MIT";
    copyright: string;
    textPath: string;
  };
}

export interface CatalogCategory {
  slug: CatalogCategorySlug;
  name: string;
  description: string;
  count: number;
}

export interface CatalogMetadata {
  kind: "component" | "agent-ui" | "block";
  family: string;
  tags: string[];
  aliases: string[];
  interactions: string[];
  useWhen: string[];
  notIdealWhen: string[];
  visualSignature: string;
  searchText: string;
}

export interface CatalogFile {
  path: string;
  type: string;
  content: string;
  sha256: string;
  upstreamPath?: string;
  upstreamSha256?: string;
  transformation?: string;
}

export interface CatalogComponentSummary {
  id: string;
  sourceId: string;
  slug: string;
  name: string;
  description: string;
  category: CatalogCategorySlug;
  publishedAt: string;
  updatedAt: string;
  dependencies: string[];
  internalDependencies: string[];
  metadata: CatalogMetadata;
  previewPath: string;
  manifestPath: string;
  integrity: string;
}

export interface CatalogComponent extends CatalogComponentSummary {
  source: CatalogSource;
  files: CatalogFile[];
  install: {
    packageManager: "pnpm";
    dependencyCommand: string | null;
    registryDependencyCommand: string | null;
    stylePaths: string[];
    instructions: string[];
  };
  provenance: {
    upstreamSlug: string;
    upstreamPageUrl: string;
    upstreamDetailUrl: string;
    upstreamMarkdownUrl: string;
    transformations: string[];
  };
  documentation: string;
}

export interface CatalogIndex {
  schemaVersion: 2;
  generatedAt: string;
  sources: CatalogSource[];
  categories: CatalogCategory[];
  components: CatalogComponentSummary[];
}

export interface EmbeddingIndex {
  schemaVersion: 1;
  model: string;
  dimensions: number;
  generatedAt: string;
  catalogIntegrity: string;
  vectors: Record<string, number[]>;
}

export interface SearchResult {
  rank: number;
  id: string;
  sourceId: string;
  slug: string;
  name: string;
  description: string;
  category: CatalogCategorySlug;
  score: number;
  matchReasons: string[];
  useWhen: string[];
  notIdealWhen: string[];
  previewPath: string;
}

export interface BrowsePage {
  items: CatalogComponentSummary[];
  nextCursor: string | null;
  total: number;
}
