import { selectDiverseCandidates } from "./search/diversity.js";
import { componentTokens, prepareQuery } from './search/prepared.js';
import { matchesIntent, searchIntent } from './search/intent.js';
import {
  buildCandidate,
  requestedComponentFamilies,
  type Candidate,
} from "./search/scoring.js";
import type {
  SearchIndex,
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

export const MAX_QUERY_LENGTH = 500;
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
  catalog: SearchIndex,
  query: string,
  options: SearchOptions = {},
): SearchResult[] {
  const resultLimit = Number.isFinite(options.limit) ? Math.min(MAX_RESULTS, Math.max(1, Math.floor(options.limit!))) : MAX_RESULTS;
  return rankCatalog(catalog, query, options).slice(0, resultLimit);
}

/** Same ranking for paginated website results and the bounded MCP shortlist. */
export function rankCatalog(
  catalog: SearchIndex,
  query: string,
  options: SearchOptions = {},
): SearchResult[] {
  const normalizedQuery = query.trim();
  if (normalizedQuery.length < 2 || normalizedQuery.length > MAX_QUERY_LENGTH) return [];

  const usesSemanticSearch = Boolean(options.queryEmbedding && options.embeddings);
  const minimumScore = options.minimumScore ?? (
    usesSemanticSearch ? HYBRID_MINIMUM_SCORE : LEXICAL_MINIMUM_SCORE
  );
  const preparedQuery = prepareQuery(normalizedQuery, catalog);
  const exactMatches = catalog.components.filter(component => component.name.toLowerCase() === normalizedQuery.toLowerCase() || component.name.toLowerCase() === preparedQuery.normalized
    || component.slug === preparedQuery.normalized || component.id === preparedQuery.normalized);
  const exactIds = new Set(exactMatches.map(component => component.id));
  const intent = exactMatches.length ? undefined : searchIntent(preparedQuery.normalized);
  if (!exactMatches.length && !intent) {
    if (!preparedQuery.terms.some(term => term.known)) return [];
    if (preparedQuery.terms.length <= 2 && preparedQuery.terms.some(term => !term.known)) return [];
    if (preparedQuery.terms.filter(term => term.known).length / preparedQuery.terms.length < 0.5) return [];
  }
  const requestedFamilies = exactMatches.length ? new Set(exactMatches.map(component => component.metadata.family))
    : intent ? new Set<string>() : requestedComponentFamilies(catalog, preparedQuery);

  const candidates = catalog.components
    .filter((component) => !options.category || component.category === options.category)
    .filter((component) => matchesIntent(component, intent))
    .filter((component) => {
      if (exactIds.has(component.id)) return true;
      const prepared = componentTokens(component);
      // A static-only request needs positive evidence of no motion. This catalogue
      // does not yet certify that property; do not promise it based on a sparse label.
      if (preparedQuery.excludesMotion) return false;
      return ![...preparedQuery.excluded].some(token => prepared.name.has(token) || prepared.description.has(token));
    })
    .filter((component) =>
      requestedFamilies.size === 0 || requestedFamilies.has(component.metadata.family),
    )
    .map((component) => buildCandidate(component, preparedQuery, options))
    .filter(candidate => exactIds.has(candidate.component.id) || intent || usesSemanticSearch
      || candidate.coverage >= 0.5 || candidate.lexicalScore >= STRONG_LEXICAL_SCORE)
    .map((candidate) => exactIds.has(candidate.component.id) ? { ...candidate, score: 1 }
      : intent ? { ...candidate, score: 0.22 + 0.78 * candidate.score, reasons: [...candidate.reasons, `suited to ${intent.label}`] } : candidate)
    .filter((candidate) =>
      candidate.score >= minimumScore || candidate.lexicalScore >= STRONG_LEXICAL_SCORE,
    )
    .sort((left, right) => Number(exactIds.has(right.component.id)) - Number(exactIds.has(left.component.id))
      || right.score - left.score || left.component.slug.localeCompare(right.component.slug));

  const shortlist = selectDiverseCandidates(candidates.slice(0, CANDIDATE_POOL_SIZE), MAX_RESULTS, options.embeddings);
  const selected = new Set(shortlist.map(candidate => candidate.component.id));
  return [...shortlist, ...candidates.filter(candidate => !selected.has(candidate.component.id))]
    .map((candidate, index) => toSearchResult(candidate, index + 1));
}
