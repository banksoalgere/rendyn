import type { CatalogMetadata } from "../../../packages/catalog/src/types.js";
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
  const url = pageUrl.replace(/^https?:\/\//, "");
  const banner = filePath.endsWith(".css") ? `/* ${url} */` : `// ${url}`;
  const directive = content.match(/^\s*(["']use (?:client|server)["'];?[^\n]*\n)/);
  if (!directive) return `${banner}\n${content}`;
  const end = directive[0].length;
  return `${content.slice(0, end)}${banner}\n${content.slice(end)}`;
}

export function buildMetadata(detail: RegistryDetail, markdown: string): CatalogMetadata {
  const plainDocumentation = stripMarkdown(markdown).slice(0, 12_000);
  const haystack = `${detail.name} ${detail.slug} ${detail.description} ${plainDocumentation}`.toLowerCase();
  const tags = TAG_VOCABULARY.filter((tag) => haystack.includes(tag));
  const interactions = INTERACTION_VOCABULARY.filter((term) => haystack.includes(term));
  const identityText = `${detail.name} ${detail.slug.replaceAll("-", " ")}`.toLowerCase();
  const family =
    FAMILY_TERMS.find((term) => new RegExp(`\\b${term}s?\\b`).test(identityText)) ??
    FAMILY_TERMS.find((term) =>
      new RegExp(`\\b${term}s?\\b`).test(detail.description.toLowerCase()),
    ) ??
    detail.slug;
  const aliases = unique([
    detail.slug.replaceAll("-", " "),
    detail.name.toLowerCase(),
    family,
    ...(family === "button" ? ["cta", "action control"] : []),
    ...(family === "modal" ? ["dialog", "overlay"] : []),
    ...(family === "select" ? ["dropdown", "picker"] : []),
    ...(detail.category === "agents" ? ["ai interface", "llm interface"] : []),
  ]);
  const kind = detail.category === "agents"
    ? "agent-ui"
    : detail.category === "blocks"
      ? "block"
      : "component";
  const notIdealWhen = detail.category === "blocks"
    ? ["You need only a low-level primitive rather than a composed product pattern."]
    : detail.category === "agents"
      ? ["The interface does not communicate model, assistant, or agent activity."]
      : ["Motion would distract from a dense or deliberately static information task."];

  return {
    kind,
    family,
    tags: unique(tags),
    aliases,
    interactions: unique(interactions),
    useWhen: [detail.description],
    notIdealWhen,
    visualSignature: unique([family, ...tags.slice(0, 5), ...interactions.slice(0, 2)]).join(":"),
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
