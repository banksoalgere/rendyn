import { catalogueEntries } from './catalogue';
import { getComponentPreview } from './component-preview';
import type { CatalogueComponent } from './catalogue-search';

const featured = ['magicui-animated-beam', 'kibo-kanban', 'approval-card', 'magicui-bento-grid', 'wallet-card', 'morphing-modal', 'kibo-gantt', 'magicui-terminal', 'kibo-editor'];

// Pass discovery metadata to the browser; source is fetched through the authenticated API.
export const workspaceComponents: CatalogueComponent[] = [...catalogueEntries].sort((a, b) => {
  const left = featured.indexOf(a.slug);
  const right = featured.indexOf(b.slug);
  if (left >= 0 || right >= 0) return (left < 0 ? Infinity : left) - (right < 0 ? Infinity : right);
  return a.name.localeCompare(b.name);
}).map(component => ({
  ...getComponentPreview(component),
  category: component.category,
  description: component.description,
  tags: component.metadata.tags,
  family: component.metadata.family,
  aliases: component.metadata.aliases,
}));
