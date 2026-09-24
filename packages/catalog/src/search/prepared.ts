import { expandedQueryTokens, tokenize } from '../text.js';
import type { CatalogComponentSummary, CatalogIndex } from '../types.js';

const componentCache = new WeakMap<CatalogComponentSummary, ReturnType<typeof prepareComponent>>();
const familyCache = new WeakMap<CatalogIndex, Set<string>>();
const vocabularyCache = new WeakMap<CatalogIndex, Map<string, number>>();
const CONTEXT_WORDS = new Set(tokenize("please find show give want need build building use using component components ui react typescript tailwind application website page landing saas b2b clean modern nice restrained minimal simple polished elegant responsive white subtle calm"));

function prepareComponent(component: CatalogComponentSummary) {
  return {
    name: new Set(tokenize(`${component.name} ${component.slug}`)),
    description: new Set(tokenize(component.description)),
    metadata: new Set(tokenize([
      ...component.metadata.tags, ...component.metadata.aliases,
      ...component.metadata.interactions, ...component.metadata.useWhen,
      component.metadata.searchText,
    ].join(' '))),
    diversity: new Set(tokenize(component.metadata.searchText)),
    searchText: component.metadata.searchText.toLowerCase(),
    lowerName: component.name.toLowerCase(),
  };
}

export function componentTokens(component: CatalogComponentSummary) {
  let prepared = componentCache.get(component);
  if (!prepared) { prepared = prepareComponent(component); componentCache.set(component, prepared); }
  return prepared;
}

/** Catalogue snapshots are immutable; derived data lives only as long as its snapshot. */
export function prepareSearchIndex(catalog: CatalogIndex) {
  let families = familyCache.get(catalog);
  if (!families) {
    families = new Set(catalog.components.map(component => {
      componentTokens(component);
      return component.metadata.family;
    }));
    familyCache.set(catalog, families);
  }
  return families;
}

export function prepareQuery(query: string, catalog: CatalogIndex) {
  const excluded = new Set<string>();
  const positiveQuery = query.replace(/\b(?:without|avoid|excluding|exclude|not(?!\s+(?:found|only)\b)|no)\s+([^,.;]+)/gi, (_phrase, words: string) => {
    for (const token of tokenize(words)) {
      if (!CONTEXT_WORDS.has(token) && !['any', 'too', 'just'].includes(token)) excluded.add(token);
    }
    return ' ';
  });
  const excludesMotion = excluded.has('animation') || excluded.has('motion');
  let vocabulary = vocabularyCache.get(catalog);
  if (!vocabulary) {
    vocabulary = new Map();
    for (const component of catalog.components) {
      const prepared = componentTokens(component);
      for (const token of new Set([...prepared.name, ...prepared.description, ...prepared.metadata])) {
        vocabulary.set(token, (vocabulary.get(token) ?? 0) + 1);
      }
    }
    vocabularyCache.set(catalog, vocabulary);
  }
  const direct = [...new Set(tokenize(positiveQuery))];
  // Each requested concept contributes once; adding synonyms must not dilute it.
  const terms = direct.filter(token => !CONTEXT_WORDS.has(token)).map(token => {
    const alternatives = expandedQueryTokens(token);
    const frequency = Math.max(...[...alternatives].map(term => vocabulary.get(term) ?? 0));
    return { token, alternatives, weight: 1 + Math.log(1 + catalog.components.length / (1 + frequency)), known: frequency > 0 };
  }).filter(term => term.known);
  return { normalized: positiveQuery.trim().toLowerCase(), tokens: expandedQueryTokens(positiveQuery), direct, terms, excluded, excludesMotion,
    restrained: /\b(calm|restrained|subtle|minimal|quiet)\b/i.test(positiveQuery) };
}
export type PreparedQuery = ReturnType<typeof prepareQuery>;
