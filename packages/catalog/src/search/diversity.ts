import { jaccardSimilarity } from "../text.js";
import { componentTokens } from './prepared.js';
import type { EmbeddingIndex } from "../types.js";
import { clampScore, cosineSimilarity, type Candidate } from "./scoring.js";

const RELEVANCE_WEIGHT = 0.78;
const SAME_VISUAL_FAMILY_SIMILARITY = 0.25;

function candidateSimilarity(
  left: Candidate,
  right: Candidate,
  embeddings?: EmbeddingIndex | null,
): number {
  const leftVector = embeddings?.vectors[left.component.slug];
  const rightVector = embeddings?.vectors[right.component.slug];
  if (leftVector && rightVector) {
    return clampScore(cosineSimilarity(leftVector, rightVector));
  }

  const tokenSimilarity = jaccardSimilarity(
    componentTokens(left.component).diversity,
    componentTokens(right.component).diversity,
  );
  const sameVisualFamily =
    left.component.metadata.visualSignature === right.component.metadata.visualSignature
      ? SAME_VISUAL_FAMILY_SIMILARITY
      : 0;

  return clampScore(tokenSimilarity + sameVisualFamily);
}

export function selectDiverseCandidates(
  candidates: Candidate[],
  limit: number,
  embeddings?: EmbeddingIndex | null,
): Candidate[] {
  if (candidates.length <= 1) return candidates.slice(0, limit);

  const selected: Candidate[] = [];
  const remaining = [...candidates];
  const similarities = new Map<string, number>();
  const similarity = (left: Candidate, right: Candidate) => {
    const key = [left.component.id, right.component.id].sort().join('\0');
    let score = similarities.get(key);
    if (score === undefined) { score = candidateSimilarity(left, right, embeddings); similarities.set(key, score); }
    return score;
  };

  while (selected.length < limit && remaining.length > 0) {
    let bestIndex = 0;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (let index = 0; index < remaining.length; index += 1) {
      const candidate = remaining[index];
      const redundancy = selected.length === 0
        ? 0
        : Math.max(
            ...selected.map((item) => similarity(candidate, item)),
          );
      const score =
        RELEVANCE_WEIGHT * candidate.score -
        (1 - RELEVANCE_WEIGHT) * redundancy;

      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    }

    selected.push(remaining.splice(bestIndex, 1)[0]);
  }

  return selected;
}
