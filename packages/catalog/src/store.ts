import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { resolveCatalogPath } from "./path.js";
import { prepareSearchIndex } from './search/prepared.js';
import { parseCatalogComponent, parseCatalogIndex, parseEmbeddingIndex } from "./schema.js";
import type {
  BrowsePage,
  CatalogCategorySlug,
  CatalogComponent,
  CatalogComponentSummary,
  CatalogIndex,
  EmbeddingIndex,
} from "./types.js";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COMPONENT_ID_PATTERN = /^[a-z0-9]+:[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

interface JsonFile {
  raw: string;
  value: unknown;
}

export interface CatalogSnapshot {
  rawIndex: string;
  components: Record<string, unknown>;
  licenses: Record<string, string>;
  rawEmbeddings?: string;
}

async function readJsonFile(filePath: string): Promise<JsonFile> {
  const raw = await readFile(filePath, "utf8");
  try {
    return { raw, value: JSON.parse(raw) };
  } catch {
    throw new Error(`Catalogue file is not valid JSON: ${filePath}`);
  }
}

function validateIndexConsistency(index: CatalogIndex): void {
  const componentSlugs = index.components.map((component) => component.slug);
  if (new Set(componentSlugs).size !== componentSlugs.length) {
    throw new Error("Catalogue index contains duplicate component slugs");
  }

  const sourceIds = index.sources.map((source) => source.id);
  if (new Set(sourceIds).size !== sourceIds.length) {
    throw new Error("Catalogue index contains duplicate sources");
  }
  const knownSourceIds = new Set(sourceIds);
  const unknownSource = index.components.find(
    (component) => !knownSourceIds.has(component.sourceId),
  );
  if (unknownSource) {
    throw new Error(`Catalogue component references an unknown source: ${unknownSource.slug}`);
  }

  const categorySlugs = index.categories.map((category) => category.slug);
  if (new Set(categorySlugs).size !== categorySlugs.length) {
    throw new Error("Catalogue index contains duplicate categories");
  }

  for (const category of index.categories) {
    const actualCount = index.components.filter(
      (component) => component.category === category.slug,
    ).length;
    if (actualCount !== category.count) {
      throw new Error(`Catalogue category count is incorrect: ${category.slug}`);
    }
  }
}

function validateEmbeddings(
  embeddings: EmbeddingIndex,
  index: CatalogIndex,
  rawIndex: string,
): void {
  const catalogIntegrity = createHash("sha256").update(rawIndex).digest("hex");
  if (embeddings.catalogIntegrity !== catalogIntegrity) {
    throw new Error("Embedding index was generated for a different catalogue index");
  }

  const missingComponent = index.components.find(
    (component) => !embeddings.vectors[component.slug],
  );
  if (missingComponent) {
    throw new Error(`Embedding index is missing catalogue component: ${missingComponent.slug}`);
  }
}

async function loadOptionalEmbeddings(
  root: string,
  index: CatalogIndex,
  rawIndex: string,
): Promise<EmbeddingIndex | null> {
  const embeddingPath = resolveCatalogPath(root, "embeddings.json");

  try {
    const embeddingFile = await readJsonFile(embeddingPath);
    const embeddings = parseEmbeddingIndex(embeddingFile.value);
    validateEmbeddings(embeddings, index, rawIndex);
    return embeddings;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function indexByCategory(
  index: CatalogIndex,
): Map<CatalogCategorySlug, CatalogComponentSummary[]> {
  return new Map(
    index.categories.map((category) => [
      category.slug,
      index.components.filter((component) => component.category === category.slug),
    ]),
  );
}

function decodeCursor(cursor?: string): number {
  if (!cursor) return 0;

  try {
    const decoded = Buffer.from(cursor, "base64url").toString("utf8");
    const offset = Number.parseInt(decoded, 10);
    return Number.isSafeInteger(offset) && offset >= 0 ? offset : 0;
  } catch {
    return 0;
  }
}

function encodeCursor(offset: number): string {
  return Buffer.from(String(offset), "utf8").toString("base64url");
}

export class CatalogStore {
  readonly root: string;
  readonly index: CatalogIndex;
  readonly embeddings: EmbeddingIndex | null;
  private readonly summariesBySlug: Map<string, CatalogComponentSummary>;
  private readonly summariesById: Map<string, CatalogComponentSummary>;
  private readonly summariesByCategory: Map<CatalogCategorySlug, CatalogComponentSummary[]>;
  private readonly snapshotComponents: Map<string, CatalogComponent> | null;
  private readonly snapshotLicenses: Map<string, string> | null;

  private constructor(
    root: string,
    index: CatalogIndex,
    embeddings: EmbeddingIndex | null,
    snapshotComponents: Map<string, CatalogComponent> | null = null,
    snapshotLicenses: Map<string, string> | null = null,
  ) {
    this.root = root;
    this.index = index;
    prepareSearchIndex(index);
    this.embeddings = embeddings;
    this.summariesBySlug = new Map(
      index.components.map((component) => [component.slug, component]),
    );
    this.summariesById = new Map(
      index.components.map((component) => [component.id, component]),
    );
    this.summariesByCategory = indexByCategory(index);
    this.snapshotComponents = snapshotComponents;
    this.snapshotLicenses = snapshotLicenses;
  }

  static async load(root = resolve(process.cwd(), "catalog")): Promise<CatalogStore> {
    const indexPath = resolveCatalogPath(root, "index.json");
    const indexFile = await readJsonFile(indexPath);
    const index = parseCatalogIndex(indexFile.value);

    validateIndexConsistency(index);
    const embeddings = await loadOptionalEmbeddings(root, index, indexFile.raw);

    return new CatalogStore(root, index, embeddings);
  }

  static fromSnapshot(snapshot: CatalogSnapshot): CatalogStore {
    let indexValue: unknown;
    try {
      indexValue = JSON.parse(snapshot.rawIndex);
    } catch {
      throw new Error("Catalogue snapshot index is not valid JSON");
    }
    const index = parseCatalogIndex(indexValue);
    validateIndexConsistency(index);

    let embeddings: EmbeddingIndex | null = null;
    if (snapshot.rawEmbeddings) {
      let embeddingValue: unknown;
      try {
        embeddingValue = JSON.parse(snapshot.rawEmbeddings);
      } catch {
        throw new Error("Catalogue snapshot embeddings are not valid JSON");
      }
      embeddings = parseEmbeddingIndex(embeddingValue);
      validateEmbeddings(embeddings, index, snapshot.rawIndex);
    }

    const components = new Map<string, CatalogComponent>();
    for (const summary of index.components) {
      const value = snapshot.components[summary.manifestPath];
      if (!value) throw new Error(`Catalogue snapshot is missing: ${summary.manifestPath}`);
      const component = parseCatalogComponent(value);
      const indexedSource = index.sources.find((source) => source.id === summary.sourceId);
      const matchesIndex =
        component.slug === summary.slug &&
        component.id === summary.id &&
        component.sourceId === summary.sourceId &&
        component.integrity === summary.integrity &&
        indexedSource?.commit === component.source.commit;
      if (!matchesIndex) {
        throw new Error(`Catalogue snapshot manifest does not match its index: ${summary.slug}`);
      }
      components.set(summary.manifestPath, component);
    }

    const licenses = new Map(Object.entries(snapshot.licenses));
    for (const source of index.sources) {
      if (!licenses.has(source.license.textPath)) {
        throw new Error(`Catalogue snapshot is missing: ${source.license.textPath}`);
      }
    }

    return new CatalogStore("/catalog", index, embeddings, components, licenses);
  }

  has(identifier: string): boolean {
    return this.find(identifier) !== null;
  }

  hasCategory(category: string): category is CatalogCategorySlug {
    return this.summariesByCategory.has(category as CatalogCategorySlug);
  }

  find(identifier: string): CatalogComponentSummary | null {
    if (SLUG_PATTERN.test(identifier)) return this.summariesBySlug.get(identifier) ?? null;
    if (COMPONENT_ID_PATTERN.test(identifier)) return this.summariesById.get(identifier) ?? null;
    return null;
  }

  async get(identifier: string): Promise<CatalogComponent | null> {
    const summary = this.find(identifier);
    if (!summary) return null;

    const snapshotComponent = this.snapshotComponents?.get(summary.manifestPath);
    if (snapshotComponent) return snapshotComponent;

    const manifestPath = resolveCatalogPath(this.root, summary.manifestPath);
    const manifestFile = await readJsonFile(manifestPath);
    const component = parseCatalogComponent(manifestFile.value);
    const indexedSource = this.index.sources.find((source) => source.id === summary.sourceId);

    const matchesIndex =
      component.slug === summary.slug &&
      component.id === summary.id &&
      component.sourceId === summary.sourceId &&
      component.integrity === summary.integrity &&
      indexedSource?.commit === component.source.commit;
    if (!matchesIndex) {
      throw new Error(`Catalogue manifest does not match its index entry: ${identifier}`);
    }

    return component;
  }

  async readLicenseText(component: CatalogComponent): Promise<string> {
    const snapshotLicense = this.snapshotLicenses?.get(component.source.license.textPath);
    if (snapshotLicense) return snapshotLicense;
    const licensePath = resolveCatalogPath(this.root, component.source.license.textPath);
    return readFile(licensePath, "utf8");
  }

  browse(
    category: CatalogCategorySlug,
    cursor?: string,
    requestedLimit = DEFAULT_PAGE_SIZE,
  ): BrowsePage {
    const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, requestedLimit));
    const offset = decodeCursor(cursor);
    const matches = this.summariesByCategory.get(category) ?? [];
    const items = matches.slice(offset, offset + limit);
    const nextOffset = offset + items.length;

    return {
      items,
      nextCursor: nextOffset < matches.length ? encodeCursor(nextOffset) : null,
      total: matches.length,
    };
  }
}
