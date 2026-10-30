import type { CatalogueComponent } from './catalogue-search';

// Group by the catalogue's reviewed component family, independent of source library.
const usageGroups = [
  ['Buttons & actions', 'button link expandable-action-bar overflow-actions toolbar clipboard download'],
  ['Forms & inputs', 'editor input select combobox checkbox radio toggle switch slider picker color-picker rating form textarea label input-otp number-input transfer password-input segmented-control mentions editable feedback-form shipping-address'],
  ['Navigation & menus', 'tabs sidebar dock menu context-menu dropdown-menu command-palette command search breadcrumb pagination navigation stepper tree file-tree project-folder'],
  ['Dialogs & overlays', 'bottom-sheet tooltip popover modal dialog drawer dialog-stack alert-dialog hover-card overlay glimpse tour'],
  ['Tables & data', 'table data-table chart statistic contribution-graph prediction-market number number-ticker ticker'],
  ['Cards & layouts', 'card list accordion disclosure bento-grid layout resizable scroll-area separator product-panel dashboard'],
  ['Chat & AI', 'message chat code-block code file-diff tool-result streaming-response image-generation citations agent-activity loading-states terminal sandbox snippet code-comparison'],
  ['Status & feedback', 'loader spinner skeleton progress animated-circular-progress-bar banner toast notification alert announcement animated-badge badge pill status tags empty-state error-page result pull-to-refresh dynamic-island confetti'],
  ['Dates & planning', 'calendar date-picker time-picker schedule appointment gantt kanban mini-calendar relative-time timeline knockout-bracket'],
  ['Images & media', 'carousel preview-rail gallery image video-player hero-video-dialog image-crop image-zoom cropper lightbox reel pixel-image android safari qr-code watermark'],
  ['Files & uploads', 'file-upload upload'],
  ['Accounts & billing', 'login signup signup-form payment pricing billing-period settings'],
  ['People & avatars', 'avatar avatar-stack avatar-circles'],
  ['Text & typography', 'typography text-animation line-shadow-text aurora-text morphing-text animated-shiny-text text-reveal hyper-text animated-gradient-text word-rotate typing-animation sparkles-text spinning-text comic-text text-animate scroll-based-velocity video-text highlighter'],
  ['Backgrounds & effects', 'marquee shared-layout-bg scroll-animation shader-background scroll-progress lens pointer smooth-cursor progressive-blur meteors grid-pattern striped-pattern interactive-grid-pattern dot-pattern flickering-grid glyph-matrix globe particles ripple retro-grid animated-grid-pattern border-beam animated-beam orbiting-circles icon-cloud shine-border blur-fade cursor swap animation'],
  ['Theme & accessibility', 'animated-theme-toggler theme-switcher theme accessibility keyboard-hint utility icon'],
] as const;

const usageByFamily = new Map<string, string>(usageGroups.flatMap(([label, families]) =>
  families.split(' ').map(family => [family, label] as const),
));

export function getComponentUsage(component: CatalogueComponent): string {
  return usageByFamily.get(component.family ?? '') ?? 'Other components';
}

export function groupComponentsByUsage(components: CatalogueComponent[]) {
  const groups = new Map<string, CatalogueComponent[]>();
  for (const component of components) {
    const usage = getComponentUsage(component);
    const entries = groups.get(usage) ?? [];
    entries.push(component);
    groups.set(usage, entries);
  }
  return [...groups].sort(([left], [right]) => left.localeCompare(right));
}
