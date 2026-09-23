import { componentTokens, prepareSearchIndex, type PreparedQuery } from './prepared.js';
import type {
  CatalogComponentSummary,
  CatalogIndex,
  EmbeddingIndex,
} from "../types.js";

export interface Candidate {
  component: CatalogComponentSummary;
  score: number;
  lexicalScore: number;
  vectorScore: number | null;
  reasons: string[];
}

interface ScoringOptions {
  queryEmbedding?: number[] | null;
  embeddings?: EmbeddingIndex | null;
}

const LEXICAL_WEIGHTS = {
  exactName: 0.72,
  name: 0.46,
  description: 0.23,
  metadata: 0.19,
  phrase: 0.12,
} as const;

const HYBRID_WEIGHTS = {
  semantic: 0.72,
  lexical: 0.28,
} as const;

export function clampScore(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function cosineSimilarity(left: number[], right: number[]): number {
  if (left.length === 0 || left.length !== right.length) return 0;

  let dotProduct = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (let index = 0; index < left.length; index += 1) {
    dotProduct += left[index] * right[index];
    leftMagnitude += left[index] ** 2;
    rightMagnitude += right[index] ** 2;
  }

  if (leftMagnitude === 0 || rightMagnitude === 0) return 0;
  return dotProduct / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
}

function tokenOverlap(queryTokens: Set<string>, candidateTokens: Set<string>): number {
  if (queryTokens.size === 0) return 0;

  const availableTokens = candidateTokens;
  let matches = 0;
  for (const token of queryTokens) {
    if (availableTokens.has(token)) matches += 1;
  }
  return matches / queryTokens.size;
}

function buildLexicalCandidate(
  component: CatalogComponentSummary,
  query: PreparedQuery,
): Candidate {
  const normalizedQuery = query.normalized;
  const queryTokens = query.tokens;
  const prepared = componentTokens(component);

  const exactNameMatch =
    component.slug === normalizedQuery.replace(/\s+/g, "-") ||
    prepared.lowerName === normalizedQuery;
  const nameScore = tokenOverlap(queryTokens, prepared.name);
  const descriptionScore = tokenOverlap(queryTokens, prepared.description);
  const metadataScore = tokenOverlap(queryTokens, prepared.metadata);
  const phraseMatch = prepared.searchText.includes(normalizedQuery);
  const score = clampScore(
    (exactNameMatch ? LEXICAL_WEIGHTS.exactName : 0) +
      nameScore * LEXICAL_WEIGHTS.name +
      descriptionScore * LEXICAL_WEIGHTS.description +
      metadataScore * LEXICAL_WEIGHTS.metadata +
      (phraseMatch ? LEXICAL_WEIGHTS.phrase : 0),
  );

  const reasons: string[] = [];
  if (exactNameMatch) reasons.push("exact component match");
  if (nameScore > 0) reasons.push("name matches the requested pattern");
  if (descriptionScore > 0.2) reasons.push("description matches the intended behavior");
  if (metadataScore > 0.2) reasons.push("use case and interaction metadata match");

  return { component, score, lexicalScore: score, vectorScore: null, reasons };
}

function addSemanticScore(candidate: Candidate, options: ScoringOptions): Candidate {
  const componentVector = options.embeddings?.vectors[candidate.component.slug];
  if (!options.queryEmbedding || !componentVector) return candidate;

  // Unrelated catalogue vectors still have a positive cosine baseline.
  // Shift and scale it into a useful 0..1 relevance score.
  const cosine = cosineSimilarity(options.queryEmbedding, componentVector);
  const semanticScore = clampScore((cosine - 0.1) / 0.55);
  const score = clampScore(
    semanticScore * HYBRID_WEIGHTS.semantic +
      candidate.lexicalScore * HYBRID_WEIGHTS.lexical,
  );
  const reasons = semanticScore > 0.48
    ? [...candidate.reasons, "semantic intent is similar"]
    : candidate.reasons;

  return { ...candidate, score, vectorScore: semanticScore, reasons };
}

export function buildCandidate(
  component: CatalogComponentSummary,
  query: PreparedQuery,
  options: ScoringOptions,
): Candidate {
  return addSemanticScore(buildLexicalCandidate(component, query), options);
}

export function requestedComponentFamilies(catalog: CatalogIndex, query: PreparedQuery): Set<string> {
  const knownFamilies = prepareSearchIndex(catalog);
  const directMatches = query.direct.filter((token) => knownFamilies.has(token));
  const matches = directMatches.length > 0
    ? directMatches
    : [...query.tokens].filter((token) => knownFamilies.has(token));

  return new Set(matches);
}
