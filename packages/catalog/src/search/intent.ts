import type { CatalogComponentSummary } from "../types.js";

// These are requests for a particular job, not promises about missing inventory.
// Match names/descriptions rather than incidental words in source documentation.
const intents = [
  { label: "pricing", query: /\b(pricing|price comparison|subscription plans?|paywall)\b/i, match: /\b(pricing|price comparison|subscription plans?|paywall)\b/i },
  { label: "testimonials", query: /\b(testimonials?|customer (quotes?|reviews?))\b/i, match: /\b(testimonials?|customer (quotes?|reviews?))\b/i },
  { label: "hero", query: /\bhero\b/i, match: /\bhero\b/i },
  { label: "product features", query: /\b(bento|features?|product features|showcase.{0,20}features)\b/i, match: /\b(bento|features)\b/i },
  { label: "customer logos", query: /\b((customer|client|brand|partner) logos?|logo (strip|wall|cloud)|marquee)\b/i, match: /\b(marquee|icon cloud)\b/i },
  { label: "command palette", query: /\b(command palette|command menu|cmd[ -]?k|ctrl[ -]?k)\b/i, match: /\bcommand.palette\b/i },
  { label: "multiple selection", query: /\b(multi.?select|(?:choos|select)\w*.{0,25}(multiple|several)|multiple.{0,25}(select|options))\b/i, match: /\bmulti.select\b/i },
  { label: "searchable selection", query: /\b(searchable.{0,20}(dropdown|select)|combobox)\b/i, match: /\bcombobox\b/i },
  { label: "hover card", query: /\bhover cards?\b/i, match: /\b(tilt.card|magic.card)\b/i },
  { label: "background", query: /\bbackgrounds?\b/i, match: /\b(background|pattern|particles|meteors|retro.grid)\b/i },
  { label: "skeleton", query: /\bskeletons?\b/i, match: /\bskeleton\b/i },
  { label: "AI activity", query: /\b(reasoning|thinking|tool calls?|agent activity)\b/i, match: /\b(agent.activity|loading.states|tool.result|streaming.response)\b/i },
  { label: "revenue chart", query: /\b((monthly )?revenue|bar chart|line chart|pie chart|area chart)\b/i, match: /\b(revenue|bar.chart|line.chart|pie.chart|area.chart)\b/i },
  { label: "FAQ", query: /\b(faq|frequently asked|accordion|collaps(?:e|ible))\b/i, match: /\b(accordion|disclosure|faq)\b/i },
  { label: "file upload", query: /\b(file upload|upload.{0,20}file|dropzone)\b/i, match: /\b(upload|dropzone)\b/i },
  { label: "data table", query: /\b(data table|table.{0,30}(sorting|pagination|filter)|spreadsheet)\b/i, match: /\b(table|spreadsheet)\b/i },
  { label: "kanban", query: /\b(kanban|task board)\b/i, match: /\bkanban\b/i },
  { label: "save feedback", query: /\b(notifications?|message|feedback).{0,30}(sav(?:e|ing|ed)|success)|\b(sav(?:e|ing|ed)|success).{0,30}(notifications?|message|feedback)\b/i, match: /\b(toast|snackbar)\b/i },
  { label: "notifications", query: /\b(toasts?|notifications?|snackbars?)\b/i, match: /\b(toast|notification|snackbar)\b/i },
  { label: "call to action", query: /\b(cta|call[- ]to[- ]action)\b/i, match: /\b(button|call[- ]to[- ]action)\b/i },
] as const;

export function searchIntent(query: string) {
  return intents.find((intent) => intent.query.test(query));
}

export function matchesIntent(component: CatalogComponentSummary, intent: ReturnType<typeof searchIntent>): boolean {
  return !intent || intent.match.test(`${component.name} ${component.metadata.family} ${component.metadata.aliases.join(" ")}`);
}
