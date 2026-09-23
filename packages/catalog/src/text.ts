const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "in",
  "into",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "this",
  "to",
  "with",
]);

const SYNONYMS: Record<string, string[]> = {
  accordion: ["collapse", "expand", "disclosure", "faq"],
  ai: ["agent", "assistant", "chat", "llm"],
  auth: ["login", "signup", "sign-in", "authentication"],
  button: ["cta", "action", "control", "press", "click"],
  card: ["panel", "surface", "tile"],
  chart: ["graph", "visualization", "data"],
  chat: ["message", "conversation", "assistant", "agent"],
  dropdown: ["select", "menu", "combobox", "popover"],
  error: ["failure", "invalid", "destructive"],
  form: ["input", "select", "checkbox", "radio", "signup"],
  loading: ["loader", "spinner", "progress", "skeleton", "pending"],
  menu: ["navigation", "actions", "command", "popover"],
  modal: ["dialog", "overlay", "drawer", "sheet"],
  nav: ["navigation", "sidebar", "tabs", "dock"],
  picker: ["select", "combobox", "choice", "wheel"],
  pricing: ["paywall", "subscription", "checkout", "plan"],
  search: ["find", "command", "combobox", "filter"],
  table: ["grid", "rows", "columns", "data"],
  toast: ["notification", "alert", "status"],
  toggle: ["switch", "checkbox", "theme"],
  upload: ["file", "attachment", "dropzone"],
};

function stem(token: string): string {
  if (token.length > 5 && token.endsWith("ing")) return token.slice(0, -3);
  if (token.length > 4 && token.endsWith("ies")) return `${token.slice(0, -3)}y`;
  if (token.length > 4 && token.endsWith("ed")) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith("s")) return token.slice(0, -1);
  return token;
}

export function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .map(stem)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

export function expandedQueryTokens(value: string): Set<string> {
  const tokens = new Set(tokenize(value));
  const originalTokens = [...tokens];
  for (const token of originalTokens) {
    for (const synonym of SYNONYMS[token] ?? []) {
      for (const expanded of tokenize(synonym)) tokens.add(expanded);
    }
    for (const [canonical, synonyms] of Object.entries(SYNONYMS)) {
      if (synonyms.some((synonym) => tokenize(synonym).includes(token))) tokens.add(canonical);
    }
  }
  return tokens;
}

export function jaccardSimilarity(left: Iterable<string>, right: Iterable<string>): number {
  const a = left instanceof Set ? left : new Set(left);
  const b = right instanceof Set ? right : new Set(right);
  if (a.size === 0 && b.size === 0) return 1;
  let intersection = 0;
  for (const value of a) if (b.has(value)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}
