import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { resolveCatalogPath } from "./path.js";
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
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

interface JsonFile {
  raw: string;
  value: unknown;
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
  private readonly summariesByCategory: Map<CatalogCategorySlug, CatalogComponentSummary[]>;

  private constructor(root: string, index: CatalogIndex, embeddings: EmbeddingIndex | null) {
    this.root = root;
    this.index = index;
    this.embeddings = embeddings;
    this.summariesBySlug = new Map(
      index.components.map((component) => [component.slug, component]),
    );
    this.summariesByCategory = indexByCategory(index);
  }

  static async load(root = resolve(process.cwd(), "catalog")): Promise<CatalogStore> {
    const indexPath = resolveCatalogPath(root, "index.json");
    const indexFile = await readJsonFile(indexPath);
    const index = parseCatalogIndex(indexFile.value);

    validateIndexConsistency(index);
    const embeddings = await loadOptionalEmbeddings(root, index, indexFile.raw);

    return new CatalogStore(root, index, embeddings);
  }

  has(slug: string): boolean {
    return SLUG_PATTERN.test(slug) && this.summariesBySlug.has(slug);
  }

  hasCategory(category: string): category is CatalogCategorySlug {
    return this.summariesByCategory.has(category as CatalogCategorySlug);
  }

  find(slug: string): CatalogComponentSummary | null {
    if (!SLUG_PATTERN.test(slug)) return null;
    return this.summariesBySlug.get(slug) ?? null;
  }

  async get(slug: string): Promise<CatalogComponent | null> {
    const summary = this.find(slug);
    if (!summary) return null;

    const manifestPath = resolveCatalogPath(this.root, summary.manifestPath);
    const manifestFile = await readJsonFile(manifestPath);
    const component = parseCatalogComponent(manifestFile.value);

    const matchesIndex =
      component.slug === summary.slug &&
      component.id === summary.id &&
      component.integrity === summary.integrity &&
      component.source.commit === this.index.source.commit;
    if (!matchesIndex) {
      throw new Error(`Catalogue manifest does not match its index entry: ${slug}`);
    }

    return component;
  }

  async readLicenseText(component: CatalogComponent): Promise<string> {
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
