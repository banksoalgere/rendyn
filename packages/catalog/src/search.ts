import { selectDiverseCandidates } from "./search/diversity.js";
import {
  buildCandidate,
  requestedComponentFamilies,
  type Candidate,
} from "./search/scoring.js";
import type {
  CatalogIndex,
  EmbeddingIndex,
  SearchResult,
} from "./types.js";

export { cosineSimilarity } from "./search/scoring.js";

export interface SearchOptions {
  limit?: number;
  category?: string;
  queryEmbedding?: number[] | null;
  embeddings?: EmbeddingIndex | null;
  minimumScore?: number;
}

const MAX_QUERY_LENGTH = 500;
const MAX_RESULTS = 5;
const CANDIDATE_POOL_SIZE = 25;
const LEXICAL_MINIMUM_SCORE = 0.16;
const HYBRID_MINIMUM_SCORE = 0.3;
const STRONG_LEXICAL_SCORE = 0.42;

function toSearchResult(candidate: Candidate, rank: number): SearchResult {
  return {
    rank,
    id: candidate.component.id,
    sourceId: candidate.component.sourceId,
    slug: candidate.component.slug,
    name: candidate.component.name,
    description: candidate.component.description,
    category: candidate.component.category,
    score: Number(candidate.score.toFixed(4)),
    matchReasons: candidate.reasons.length
      ? candidate.reasons
      : ["closest relevant catalogue match"],
    useWhen: candidate.component.metadata.useWhen,
    notIdealWhen: candidate.component.metadata.notIdealWhen,
    previewPath: candidate.component.previewPath,
  };
}

export function searchCatalog(
  catalog: CatalogIndex,
  query: string,
  options: SearchOptions = {},
): SearchResult[] {
  const normalizedQuery = query.trim();
  if (normalizedQuery.length < 2 || normalizedQuery.length > MAX_QUERY_LENGTH) return [];

  const resultLimit = Math.min(MAX_RESULTS, Math.max(1, options.limit ?? MAX_RESULTS));
  const usesSemanticSearch = Boolean(options.queryEmbedding && options.embeddings);
  const minimumScore = options.minimumScore ?? (
    usesSemanticSearch ? HYBRID_MINIMUM_SCORE : LEXICAL_MINIMUM_SCORE
  );
  const requestedFamilies = requestedComponentFamilies(catalog, normalizedQuery);

  const candidates = catalog.components
    .filter((component) => !options.category || component.category === options.category)
    .filter((component) =>
      requestedFamilies.size === 0 || requestedFamilies.has(component.metadata.family),
    )
    .map((component) => buildCandidate(component, normalizedQuery, options))
    .filter((candidate) =>
      candidate.score >= minimumScore || candidate.lexicalScore >= STRONG_LEXICAL_SCORE,
    )
    .sort((left, right) => right.score - left.score)
    .slice(0, CANDIDATE_POOL_SIZE);

  return selectDiverseCandidates(candidates, resultLimit, options.embeddings)
    .map((candidate, index) => toSearchResult(candidate, index + 1));
}
