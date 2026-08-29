import {
  searchCatalog,
  type CatalogCategorySlug,
  type CatalogStore,
  type SearchResult,
} from "@designmcp/catalog";
import type { AppConfig } from "./config.js";
import { HostedEmbeddingProvider } from "./embeddings.js";

export class CatalogService {
  private readonly embeddings: HostedEmbeddingProvider;

  constructor(
    readonly store: CatalogStore,
    private readonly config: AppConfig,
  ) {
    this.embeddings = new HostedEmbeddingProvider(config);
  }

  async search(
    query: string,
    limit = 5,
    category?: CatalogCategorySlug,
  ): Promise<SearchResult[]> {
    let queryEmbedding: number[] | null = null;
    if (this.store.embeddings) {
      try {
        queryEmbedding = await this.embeddings.embedQuery(query, this.store.embeddings.dimensions);
      } catch (error) {
        console.warn("Hosted embedding search failed; using lexical fallback", error);
      }
    }
    return searchCatalog(this.store.index, query, {
      limit,
      category,
      queryEmbedding,
      embeddings: this.store.embeddings,
    });
  }

  previewUrl(path: string): string {
    return new URL(path, this.config.previewBaseUrl).toString();
  }

  browse(category: CatalogCategorySlug, cursor?: string, limit?: number) {
    return this.store.browse(category, cursor, limit);
  }
}
