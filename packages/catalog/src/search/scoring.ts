import { componentTokens, prepareSearchIndex, type PreparedQuery } from './prepared.js';
import type {
  SearchComponent,
  SearchIndex,
  EmbeddingIndex,
} from "../types.js";

export interface Candidate {
  component: SearchComponent;
  score: number;
  lexicalScore: number;
  vectorScore: number | null;
  reasons: string[];
  coverage: number;
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

function tokenOverlap(query: PreparedQuery, candidateTokens: Set<string>): number {
  const total = query.terms.reduce((sum, term) => sum + term.weight, 0);
  if (total === 0) return 0;
  return query.terms.reduce((sum, term) => {
    const strength = candidateTokens.has(term.token) ? 1
      : [...term.alternatives].some(token => candidateTokens.has(token)) ? 0.65 : 0;
    return sum + strength * term.weight;
  }, 0) / total;
}

function buildLexicalCandidate(
  component: SearchComponent,
  query: PreparedQuery,
): Candidate {
  const normalizedQuery = query.normalized;
  const prepared = componentTokens(component);

  const exactNameMatch =
    component.slug === normalizedQuery.replace(/\s+/g, "-") ||
    prepared.lowerName === normalizedQuery;
  const nameScore = tokenOverlap(query, prepared.name);
  const descriptionScore = tokenOverlap(query, prepared.description);
  const metadataScore = tokenOverlap(query, prepared.metadata);
  const coverage = tokenOverlap(query, new Set([...prepared.name, ...prepared.description, ...prepared.metadata]));
  const namedPattern = prepared.lowerName.split(/\W+/).filter(Boolean).length > 1
    && ` ${normalizedQuery.replace(/[^a-z0-9]+/g, " ")} `.includes(` ${prepared.lowerName.replace(/[^a-z0-9]+/g, " ")} `);
  const phraseMatch = prepared.searchText.includes(normalizedQuery);
  const score = clampScore(
    (exactNameMatch ? LEXICAL_WEIGHTS.exactName : 0) +
      nameScore * LEXICAL_WEIGHTS.name +
      descriptionScore * LEXICAL_WEIGHTS.description +
      metadataScore * LEXICAL_WEIGHTS.metadata +
      (namedPattern ? 0.3 : 0) +
      (phraseMatch ? LEXICAL_WEIGHTS.phrase : 0),
  );

  const reasons: string[] = [];
  if (exactNameMatch) reasons.push("exact component match");
  if (namedPattern) reasons.push(`matches the named ${component.name} pattern`);
  else if (nameScore > 0) reasons.push(`matches ${query.terms.filter(term => prepared.name.has(term.token)).map(term => term.token).join(", ") || "a related component pattern"}`);
  if (descriptionScore > 0.2) reasons.push("description matches the intended behavior");
  if (metadataScore > 0.2) reasons.push("use case and interaction metadata match");

  return { component, score, lexicalScore: score, vectorScore: null, reasons, coverage };
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
  component: SearchComponent,
  query: PreparedQuery,
  options: ScoringOptions,
): Candidate {
  const candidate = addSemanticScore(buildLexicalCandidate(component, query), options);
  if (query.restrained && /\b(rainbow|neon|pulsating|shimmer|shine|shiny|sparkles|warp|expressive|magnetic|metallic)\b/i.test(`${component.name} ${component.description}`)) {
    return { ...candidate, score: candidate.score * 0.75, lexicalScore: candidate.lexicalScore * 0.75 };
  }
  return candidate;
}

export function requestedComponentFamilies(catalog: SearchIndex, query: PreparedQuery): Set<string> {
  const knownFamilies = prepareSearchIndex(catalog);
  const normalized = ` ${query.normalized.replace(/[^a-z0-9]+/g, ' ')} `;
  const named = catalog.components.filter(component => {
    const name = component.name.toLowerCase().replace(/[^a-z0-9]+/g, ' ');
    return name.includes(' ') && normalized.includes(` ${name} `);
  });
  if (named.length) return new Set(named.map(component => component.metadata.family));
  const directMatches = query.direct.filter((token) => knownFamilies.has(token));
  const matches = directMatches.length > 0
    ? directMatches
    : [...query.tokens].filter((token) => knownFamilies.has(token));

  return new Set(matches);
}
