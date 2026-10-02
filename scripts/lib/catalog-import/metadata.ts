import type {
  CatalogCategorySlug,
  CatalogMetadata,
} from "../../../packages/catalog/src/types.js";
import type { RegistryDetail } from "./schemas.js";

const TAG_VOCABULARY = [
  "accordion", "action", "agent", "animated", "approval", "attachment", "badge", "button",
  "card", "carousel", "chat", "checkbox", "code", "command", "context", "dark", "data",
  "dialog", "dock", "drag", "drawer", "dropdown", "error", "file", "form", "hover", "input",
  "layout", "list", "loader", "loading", "marquee", "menu", "message", "modal", "navigation",
  "notification", "number", "otp", "picker", "popover", "progress", "radio", "responsive",
  "search", "select", "shader", "sidebar", "signup", "slider", "spring", "streaming", "swipe",
  "table", "tabs", "text", "theme", "toast", "toggle", "tooltip", "touch", "upload", "wallet",
];

const INTERACTION_VOCABULARY = [
  "click", "drag", "focus", "hover", "keyboard", "press", "scroll", "swipe", "touch", "type",
];

const FAMILY_TERMS = [
  "accordion", "button", "card", "carousel", "checkbox", "drawer", "input", "list", "loader",
  "menu", "message", "modal", "notification", "picker", "popover", "radio", "search", "select",
  "sidebar", "slider", "table", "tabs", "toast", "toggle", "tooltip", "upload",
];

const KIND_BY_CATEGORY: Record<CatalogCategorySlug, CatalogMetadata["kind"]> = {
  agents: "agent-ui",
  blocks: "block",
  motion: "component",
};

const NOT_IDEAL_BY_CATEGORY: Record<CatalogCategorySlug, string> = {
  agents: "The interface does not communicate model, assistant, or agent activity.",
  blocks: "You need only a low-level primitive rather than a composed product pattern.",
  motion: "Motion would distract from a dense or deliberately static information task.",
};

const ALIASES_BY_FAMILY: Record<string, string[]> = {
  button: ["cta", "action control"],
  modal: ["dialog", "overlay"],
  select: ["dropdown", "picker"],
};

export function unique(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function addRegistrySignature(
  content: string,
  filePath: string,
  pageUrl: string,
): string {
  if (!/\.(?:tsx?|jsx?|css|mjs|cjs)$/.test(filePath)) return content;

  const sourceLabel = pageUrl.replace(/^https?:\/\//, "");
  const banner = filePath.endsWith(".css") ? `/* ${sourceLabel} */` : `// ${sourceLabel}`;
  const directive = content.match(/^\s*(["']use (?:client|server)["'];?[^\n]*\n)/);
  if (!directive) return `${banner}\n${content}`;

  const directiveEnd = directive[0].length;
  return `${content.slice(0, directiveEnd)}${banner}\n${content.slice(directiveEnd)}`;
}

function containsTerm(text: string, term: string): boolean {
  return new RegExp(`\\b${term}s?\\b`).test(text);
}

function detectFamily(detail: RegistryDetail): string {
  const identity = `${detail.name} ${detail.slug.replaceAll("-", " ")}`.toLowerCase();
  const namedFamilies: Array<[RegExp, string]> = [
    [/\bcommand palette\b/, 'command'], [/\b(?:file upload|dropzone)\b/, 'file-upload'],
    [/\bcolor picker\b/, 'color-picker'], [/\bpassword input\b/, 'password-input'],
    [/\bnumber input\b/, 'number-input'], [/\bdate picker\b/, 'date-picker'],
    [/\b(?:not found|404)\b/, 'error-page'], [/\bcode block\b/, 'code'],
  ];
  const namedFamily = namedFamilies.find(([pattern]) => pattern.test(identity))?.[1];
  if (namedFamily) return namedFamily;
  const family = FAMILY_TERMS.find((term) => containsTerm(identity, term))
    ?? FAMILY_TERMS.find((term) => containsTerm(detail.description.toLowerCase(), term))
    ?? detail.slug;
  return family === 'modal' ? 'dialog' : family;
}

function buildAliases(detail: RegistryDetail, family: string): string[] {
  const categoryAliases = detail.category === "agents"
    ? ["ai interface", "llm interface"]
    : [];

  return unique([
    detail.slug.replaceAll("-", " "),
    detail.name.toLowerCase(),
    family,
    ...(ALIASES_BY_FAMILY[family] ?? []),
    ...categoryAliases,
  ]);
}

export function buildMetadata(detail: RegistryDetail, markdown: string): CatalogMetadata {
  const plainDocumentation = stripMarkdown(markdown).slice(0, 12_000);
  const searchableText = [
    detail.name,
    detail.slug,
    detail.description,
  ].join(" ").toLowerCase();
  const tags = TAG_VOCABULARY.filter((tag) => containsTerm(searchableText, tag));
  const interactions = INTERACTION_VOCABULARY.filter((term) => containsTerm(searchableText, term));
  const family = detectFamily(detail);
  const aliases = buildAliases(detail, family);

  return {
    kind: KIND_BY_CATEGORY[detail.category],
    family,
    tags: unique(tags),
    aliases,
    interactions: unique(interactions),
    useWhen: [detail.description],
    notIdealWhen: [NOT_IDEAL_BY_CATEGORY[detail.category]],
    visualSignature: unique([
      family,
      ...tags.slice(0, 5),
      ...interactions.slice(0, 2),
    ]).join(":"),
    searchText: unique([
      detail.name,
      detail.slug.replaceAll("-", " "),
      detail.description,
      ...aliases,
      ...tags,
      ...interactions,
      plainDocumentation,
    ]).join("\n"),
  };
}
