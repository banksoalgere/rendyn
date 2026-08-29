import type { AppConfig } from "./config.js";

interface CachedEmbedding {
  vector: number[];
  expiresAt: number;
}

export class HostedEmbeddingProvider {
  private readonly cache = new Map<string, CachedEmbedding>();

  constructor(private readonly config: AppConfig) {}

  async embedQuery(query: string, expectedDimensions?: number): Promise<number[] | null> {
    if (!this.config.OPENAI_API_KEY) return null;
    const cacheKey = `${this.config.OPENAI_EMBEDDING_MODEL}:${query.trim().toLowerCase()}`;
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) return cached.vector;

    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.config.OPENAI_EMBEDDING_MODEL,
        input: query,
        encoding_format: "float",
      }),
      signal: AbortSignal.timeout(7_000),
    });
    if (!response.ok) throw new Error(`Embedding provider failed with status ${response.status}`);
    const payload = (await response.json()) as { data?: Array<{ embedding?: number[] }> };
    const vector = payload.data?.[0]?.embedding;
    if (!vector || vector.some((value) => !Number.isFinite(value))) {
      throw new Error("Embedding provider returned malformed data");
    }
    if (expectedDimensions && vector.length !== expectedDimensions) {
      throw new Error("Query embedding dimensions do not match the catalogue index");
    }

    this.cache.set(cacheKey, { vector, expiresAt: Date.now() + 15 * 60_000 });
    if (this.cache.size > 500) this.cache.delete(this.cache.keys().next().value!);
    return vector;
  }
}
