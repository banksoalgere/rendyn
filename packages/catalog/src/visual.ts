/** Controlled source observations, not guarantees about a rendered theme. */
export const visualVocabulary = {
  layout: ['row', 'column', 'grid', 'inline', 'centered', 'absolute', 'fixed', 'sticky', 'scrollable'],
  surface: ['bordered', 'filled', 'transparent', 'shadow', 'gradient', 'blur'],
  shape: ['rounded', 'fully-rounded', 'square-corners'],
  color: ['primary', 'secondary', 'muted', 'accent', 'destructive', 'success', 'warning', 'neutral', 'white', 'black', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'amber', 'emerald', 'teal', 'cyan', 'indigo', 'violet', 'rose', 'lime', 'sky', 'slate', 'zinc', 'stone', 'gray'],
  typography: ['monospace', 'uppercase', 'truncated', 'line-clamped'],
  motion: ['animation', 'transition', 'spring', 'transform', 'marquee', 'reduced-motion-variant'],
  states: ['dark-mode-variant', 'responsive-variant', 'hover-state', 'focus-state', 'selected-state', 'disabled-state', 'error-state', 'loading-state'],
} as const;

export type CatalogVisual = {
  evidence: 'source';
  scope: 'bundled-examples' | 'component-source';
} & { [K in keyof typeof visualVocabulary]: Array<(typeof visualVocabulary)[K][number]> };

export function visualSearchTerms(visual?: CatalogVisual): string[] {
  return visual ? Object.keys(visualVocabulary).flatMap(key => visual[key as keyof typeof visualVocabulary]) : [];
}
