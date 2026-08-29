import type {
  CatalogComponentSummary,
  CatalogIndex,
  EmbeddingIndex,
  SearchResult,
} from "./types.js";
import { expandedQueryTokens, jaccardSimilarity, tokenize } from "./text.js";

interface SearchOptions {
  limit?: number;
  category?: string;
  queryEmbedding?: number[] | null;
  embeddings?: EmbeddingIndex | null;
  minimumScore?: number;
}

interface Candidate {
  component: CatalogComponentSummary;
  score: number;
  lexicalScore: number;
  vectorScore: number | null;
  reasons: string[];
}

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function cosineSimilarity(left: number[], right: number[]): number {
  if (left.length === 0 || left.length !== right.length) return 0;
  let dot = 0;
  let leftNorm = 0;
  let rightNorm = 0;
  for (let index = 0; index < left.length; index += 1) {
    dot += left[index] * right[index];
    leftNorm += left[index] ** 2;
    rightNorm += right[index] ** 2;
  }
  if (leftNorm === 0 || rightNorm === 0) return 0;
  return dot / (Math.sqrt(leftNorm) * Math.sqrt(rightNorm));
}

function overlapScore(query: Set<string>, values: Iterable<string>): number {
  const tokens = new Set(values);
  if (query.size === 0) return 0;
  let matches = 0;
  for (const token of query) if (tokens.has(token)) matches += 1;
  return matches / query.size;
}

function lexicalMatch(component: CatalogComponentSummary, rawQuery: string): Candidate {
  const normalizedQuery = rawQuery.trim().toLowerCase();
  const query = expandedQueryTokens(rawQuery);
  const nameTokens = tokenize(`${component.name} ${component.slug}`);
  const descriptionTokens = tokenize(component.description);
  const metadataTokens = tokenize(
    [
      ...component.metadata.tags,
      ...component.metadata.aliases,
      ...component.metadata.interactions,
      ...component.metadata.useWhen,
      component.metadata.searchText,
    ].join(" "),
  );

  const exactSlug = component.slug === normalizedQuery.replace(/\s+/g, "-");
  const exactName = component.name.toLowerCase() === normalizedQuery;
  const nameOverlap = overlapScore(query, nameTokens);
  const descriptionOverlap = overlapScore(query, descriptionTokens);
  const metadataOverlap = overlapScore(query, metadataTokens);
  const phraseMatch = component.metadata.searchText.toLowerCase().includes(normalizedQuery);

  const score = clamp(
    (exactSlug || exactName ? 0.72 : 0) +
      nameOverlap * 0.46 +
      descriptionOverlap * 0.23 +
      metadataOverlap * 0.19 +
      (phraseMatch ? 0.12 : 0),
  );

  const reasons: string[] = [];
  if (exactSlug || exactName) reasons.push("exact component match");
  if (nameOverlap > 0) reasons.push("name matches the requested pattern");
  if (descriptionOverlap > 0.2) reasons.push("description matches the intended behavior");
  if (metadataOverlap > 0.2) reasons.push("use case and interaction metadata match");

  return {
    component,
    score,
    lexicalScore: score,
    vectorScore: null,
    reasons,
  };
}

function candidateSimilarity(
  left: Candidate,
  right: Candidate,
  embeddings?: EmbeddingIndex | null,
): number {
  const leftVector = embeddings?.vectors[left.component.slug];
  const rightVector = embeddings?.vectors[right.component.slug];
  if (leftVector && rightVector) return clamp(cosineSimilarity(leftVector, rightVector));

  const tokenSimilarity = jaccardSimilarity(
    tokenize(left.component.metadata.searchText),
    tokenize(right.component.metadata.searchText),
  );
  const sameSignature =
    left.component.metadata.visualSignature === right.component.metadata.visualSignature ? 0.25 : 0;
  return clamp(tokenSimilarity + sameSignature);
}

function diversify(
  candidates: Candidate[],
  limit: number,
  embeddings?: EmbeddingIndex | null,
): Candidate[] {
  if (candidates.length <= 1) return candidates.slice(0, limit);
  const selected: Candidate[] = [];
  const remaining = [...candidates];
  const relevanceWeight = 0.78;

  while (selected.length < limit && remaining.length > 0) {
    let bestIndex = 0;
    let bestMmr = Number.NEGATIVE_INFINITY;
    for (let index = 0; index < remaining.length; index += 1) {
      const candidate = remaining[index];
      const redundancy = selected.length
        ? Math.max(...selected.map((item) => candidateSimilarity(candidate, item, embeddings)))
        : 0;
      const mmr = relevanceWeight * candidate.score - (1 - relevanceWeight) * redundancy;
      if (mmr > bestMmr) {
        bestMmr = mmr;
        bestIndex = index;
      }
    }
    selected.push(remaining.splice(bestIndex, 1)[0]);
  }

  return selected;
}

export function searchCatalog(
  catalog: CatalogIndex,
  query: string,
  options: SearchOptions = {},
): SearchResult[] {
  const trimmed = query.trim();
  if (trimmed.length < 2 || trimmed.length > 500) return [];
  const limit = Math.min(5, Math.max(1, options.limit ?? 5));
  const hasQueryVector = Boolean(options.queryEmbedding && options.embeddings);
  const minimumScore = options.minimumScore ?? (hasQueryVector ? 0.3 : 0.16);
  const queryTokens = expandedQueryTokens(trimmed);
  const knownFamilies = new Set(catalog.components.map((component) => component.metadata.family));
  const explicitFamilies = new Set(tokenize(trimmed).filter((token) => knownFamilies.has(token)));
  const requestedFamilies = explicitFamilies.size
    ? explicitFamilies
    : new Set([...queryTokens].filter((token) => knownFamilies.has(token)));

  const candidates = catalog.components
    .filter((component) => !options.category || component.category === options.category)
    .filter((component) => {
      if (!requestedFamilies.size) return true;
      return requestedFamilies.has(component.metadata.family);
    })
    .map((component) => {
      const candidate = lexicalMatch(component, trimmed);
      const componentVector = options.embeddings?.vectors[component.slug];
      if (options.queryEmbedding && componentVector) {
        const cosine = cosineSimilarity(options.queryEmbedding, componentVector);
        const semantic = clamp((cosine - 0.1) / 0.55);
        candidate.vectorScore = semantic;
        candidate.score = clamp(semantic * 0.72 + candidate.lexicalScore * 0.28);
        if (semantic > 0.48) candidate.reasons.push("semantic intent is similar");
      }
      return candidate;
    })
    .filter((candidate) => candidate.score >= minimumScore || candidate.lexicalScore >= 0.42)
    .sort((left, right) => right.score - left.score)
    .slice(0, 25);

  return diversify(candidates, limit, options.embeddings).map((candidate, index) => ({
    rank: index + 1,
    id: candidate.component.id,
    slug: candidate.component.slug,
    name: candidate.component.name,
    description: candidate.component.description,
    category: candidate.component.category,
    score: Number(candidate.score.toFixed(4)),
    matchReasons: candidate.reasons.length ? candidate.reasons : ["closest relevant catalogue match"],
    useWhen: candidate.component.metadata.useWhen,
    notIdealWhen: candidate.component.metadata.notIdealWhen,
    previewPath: candidate.component.previewPath,
  }));
}
