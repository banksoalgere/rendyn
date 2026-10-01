import { expandedQueryTokens, tokenize } from '../text.js';
import type { SearchComponent, SearchIndex } from '../types.js';

const componentCache = new WeakMap<SearchComponent, ReturnType<typeof prepareComponent>>();
const familyCache = new WeakMap<SearchIndex, Set<string>>();
const vocabularyCache = new WeakMap<SearchIndex, Map<string, number>>();
const CONTEXT_WORDS = new Set(tokenize("please find show give want need build building use using component components ui react typescript tailwind application website page landing saas b2b clean modern nice restrained minimal simple polished elegant responsive white subtle calm"));

function prepareComponent(component: SearchComponent) {
  const searchText = [component.name, component.description, ...component.metadata.tags,
    ...component.metadata.aliases, ...component.metadata.interactions, ...component.metadata.useWhen].join(' ');
  return {
    name: new Set(tokenize(`${component.name} ${component.slug}`)),
    description: new Set(tokenize(component.description)),
    metadata: new Set(tokenize([
      ...component.metadata.tags, ...component.metadata.aliases,
      ...component.metadata.interactions, ...component.metadata.useWhen,
    ].join(' '))),
    diversity: new Set(tokenize(searchText)),
    searchText: searchText.toLowerCase(),
    lowerName: component.name.toLowerCase(),
  };
}

export function componentTokens(component: SearchComponent) {
  let prepared = componentCache.get(component);
  if (!prepared) { prepared = prepareComponent(component); componentCache.set(component, prepared); }
  return prepared;
}

/** Catalogue snapshots are immutable; derived data lives only as long as its snapshot. */
export function prepareSearchIndex(catalog: SearchIndex) {
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

// One insertion/deletion/substitution or adjacent transposition; never expand arbitrary substrings.
function nearWord(left: string, right: string): boolean {
  if (Math.abs(left.length - right.length) > 1) return false;
  let i = 0;
  while (i < left.length && left[i] === right[i]) i++;
  if (left.length === right.length) {
    return left.slice(i + 1) === right.slice(i + 1)
      || (left[i] === right[i + 1] && left[i + 1] === right[i] && left.slice(i + 2) === right.slice(i + 2));
  }
  return left.length > right.length ? left.slice(i + 1) === right.slice(i) : left.slice(i) === right.slice(i + 1);
}

export function prepareQuery(query: string, catalog: SearchIndex) {
  const excluded = new Set<string>();
  let positiveQuery = query.replace(/\b(?:without|avoid|excluding|exclude|not(?!\s+(?:found|only)\b)|no)\s+([^,.;]+)/gi, (_phrase, words: string) => {
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
  const nameVocabulary = new Set(catalog.components.flatMap(component => [...componentTokens(component).name]));
  positiveQuery = positiveQuery.replace(/[a-z]{5,}/gi, word => {
    const token = tokenize(word)[0];
    if (!token || vocabulary.has(token) || CONTEXT_WORDS.has(token)) return word;
    const corrections = [...nameVocabulary].filter(candidate => nearWord(token, candidate));
    return corrections.length === 1 ? corrections[0] : word;
  });
  const direct = [...new Set(tokenize(positiveQuery))];
  // Each requested concept contributes once; adding synonyms must not dilute it.
  const terms = direct.filter(token => !CONTEXT_WORDS.has(token)).map(token => {
    const alternatives = expandedQueryTokens(token);
    // Prefixes help while typing, but only on component names and only after three characters.
    if (token.length >= 3 && !vocabulary.has(token)) {
      for (const name of nameVocabulary) if (name.startsWith(token)) alternatives.add(name);
    }
    const frequency = Math.max(0, ...[...alternatives].map(term => vocabulary.get(term) ?? 0));
    return { token, alternatives, weight: frequency ? 1 + Math.log(1 + catalog.components.length / (1 + frequency)) : 1, known: frequency > 0 };
  });
  return { normalized: positiveQuery.trim().toLowerCase(), tokens: expandedQueryTokens(positiveQuery), direct, terms, excluded, excludesMotion,
    restrained: /\b(calm|restrained|subtle|minimal|quiet)\b/i.test(positiveQuery) };
}
export type PreparedQuery = ReturnType<typeof prepareQuery>;
