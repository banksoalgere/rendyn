import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { resolveCatalogPath } from "./path.js";
import { parseCatalogComponent, parseCatalogIndex, parseEmbeddingIndex } from "./schema.js";
import type {
  BrowsePage,
  CatalogCategorySlug,
  CatalogComponent,
  CatalogIndex,
  EmbeddingIndex,
} from "./types.js";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseJson(raw: string, fileName: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`Catalogue file is not valid JSON: ${fileName}`);
  }
}

function decodeCursor(cursor?: string): number {
  if (!cursor) return 0;
  try {
    const decoded = Buffer.from(cursor, "base64url").toString("utf8");
    const parsed = Number.parseInt(decoded, 10);
    return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : 0;
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
  private readonly summariesBySlug: Map<string, CatalogIndex["components"][number]>;
  private readonly summariesByCategory: Map<CatalogCategorySlug, CatalogIndex["components"]>;

  private constructor(root: string, index: CatalogIndex, embeddings: EmbeddingIndex | null) {
    this.root = root;
    this.index = index;
    this.embeddings = embeddings;
    this.summariesBySlug = new Map(index.components.map((component) => [component.slug, component]));
    this.summariesByCategory = new Map(
      index.categories.map((category) => [
        category.slug,
        index.components.filter((component) => component.category === category.slug),
      ]),
    );
  }

  static async load(root = resolve(process.cwd(), "catalog")): Promise<CatalogStore> {
    const indexPath = resolveCatalogPath(root, "index.json");
    const rawIndex = await readFile(indexPath, "utf8");
    const index = parseCatalogIndex(parseJson(rawIndex, indexPath));
    const uniqueSlugs = new Set(index.components.map((component) => component.slug));
    if (uniqueSlugs.size !== index.components.length) {
      throw new Error("Catalogue index contains duplicate component slugs");
    }
    const uniqueCategories = new Set(index.categories.map((category) => category.slug));
    if (uniqueCategories.size !== index.categories.length) {
      throw new Error("Catalogue index contains duplicate categories");
    }
    for (const category of index.categories) {
      const actualCount = index.components.filter((component) => component.category === category.slug).length;
      if (actualCount !== category.count) {
        throw new Error(`Catalogue category count is incorrect: ${category.slug}`);
      }
    }

    let embeddings: EmbeddingIndex | null = null;
    try {
      const embeddingPath = resolveCatalogPath(root, "embeddings.json");
      const rawEmbeddings = await readFile(embeddingPath, "utf8");
      embeddings = parseEmbeddingIndex(parseJson(rawEmbeddings, embeddingPath));
      const catalogIntegrity = createHash("sha256").update(rawIndex).digest("hex");
      if (embeddings.catalogIntegrity !== catalogIntegrity) {
        throw new Error("Embedding index was generated for a different catalogue index");
      }
      if (index.components.some((component) => !embeddings?.vectors[component.slug])) {
        throw new Error("Embedding index is missing one or more catalogue components");
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    return new CatalogStore(root, index, embeddings);
  }

  has(slug: string): boolean {
    return SLUG_PATTERN.test(slug) && this.summariesBySlug.has(slug);
  }

  hasCategory(category: string): category is CatalogCategorySlug {
    return this.summariesByCategory.has(category as CatalogCategorySlug);
  }

  find(slug: string) {
    if (!SLUG_PATTERN.test(slug)) return null;
    return this.summariesBySlug.get(slug) ?? null;
  }

  async get(slug: string): Promise<CatalogComponent | null> {
    const summary = this.find(slug);
    if (!summary) return null;
    const manifestPath = resolveCatalogPath(this.root, summary.manifestPath);
    const rawManifest = await readFile(manifestPath, "utf8");
    const component = parseCatalogComponent(parseJson(rawManifest, manifestPath));
    if (
      component.slug !== summary.slug ||
      component.id !== summary.id ||
      component.integrity !== summary.integrity ||
      component.source.commit !== this.index.source.commit
    ) {
      throw new Error(`Catalogue manifest does not match its index entry: ${slug}`);
    }
    return component;
  }

  async readLicenseText(component: CatalogComponent): Promise<string> {
    return readFile(resolveCatalogPath(this.root, component.source.license.textPath), "utf8");
  }

  browse(category: CatalogCategorySlug, cursor?: string, requestedLimit = 20): BrowsePage {
    const limit = Math.min(50, Math.max(1, requestedLimit));
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
