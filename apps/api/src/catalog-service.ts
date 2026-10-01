import {
  searchCatalog,
  type CatalogCategorySlug,
  type CatalogStore,
  type SearchResult,
} from "@rendyn/catalog";
import type { AppConfig } from "./config.js";
import { HostedEmbeddingProvider } from "./embeddings.js";

export class CatalogService {
  private readonly embeddings: HostedEmbeddingProvider;
  private readonly previewIds: Map<string, string>;
  private readonly searchCache = new Map<string, { expires: number; results: SearchResult[] }>();

  constructor(
    readonly store: CatalogStore,
    private readonly config: AppConfig,
  ) {
    this.embeddings = new HostedEmbeddingProvider(config);
    this.previewIds = new Map(
      store.index.components.map((component) => [
        component.previewPath,
        component.slug,
      ]),
    );
  }

  async search(
    query: string,
    limit = 5,
    category?: CatalogCategorySlug,
  ): Promise<SearchResult[]> {
    const cacheKey = JSON.stringify([query.trim(), limit, category ?? null]);
    const cached = this.searchCache.get(cacheKey);
    if (cached && cached.expires > Date.now()) {
      this.searchCache.delete(cacheKey);
      this.searchCache.set(cacheKey, cached);
      return cached.results;
    }
    let queryEmbedding: number[] | null = null;
    if (this.store.embeddings) {
      try {
        queryEmbedding = await this.embeddings.embedQuery(query, this.store.embeddings.dimensions);
      } catch (error) {
        console.warn("Hosted embedding search failed; using lexical fallback", error);
      }
    }
    const results = searchCatalog(this.store.index, query, {
      limit,
      category,
      queryEmbedding,
      embeddings: this.store.embeddings,
    });
    if (this.searchCache.size >= 100) this.searchCache.delete(this.searchCache.keys().next().value!);
    this.searchCache.set(cacheKey, { results, expires: Date.now() + 60_000 });
    return results;
  }

  previewUrl(path: string): string {
    const previewId = this.previewIds.get(path);
    if (!previewId) throw new Error(`Unknown catalogue preview path: ${path}`);
    return new URL(`/component-preview/${previewId}`, this.config.previewBaseUrl).toString();
  }

  browse(category: CatalogCategorySlug, cursor?: string, limit?: number) {
    return this.store.browse(category, cursor, limit);
  }
}
