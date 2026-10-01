import ts from '../../../apps/web/node_modules/typescript/lib/typescript.js';
import { visualVocabulary, type CatalogVisual } from '../../../packages/catalog/src/visual.js';
import type { CatalogFile } from '../../../packages/catalog/src/types.js';

/** Observe styling in the requested files; dependency code is deliberately excluded. */
export function buildVisualLabels(files: Pick<CatalogFile, 'path' | 'content'>[], scope: CatalogVisual['scope']): CatalogVisual {
  const found = Object.fromEntries(Object.keys(visualVocabulary).map(key => [key, new Set<string>()])) as Record<keyof typeof visualVocabulary, Set<string>>;
  const classes: string[] = [];
  const properties: Array<[string, string]> = [];
  const identifiers = new Set<string>();
  for (const file of files) {
    if (!/\.[cm]?[jt]sx?$/.test(file.path)) continue;
    const source = ts.createSourceFile(file.path, file.content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function strings(node: ts.Node): string[] {
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return [node.text];
      const result: string[] = [];
      ts.forEachChild(node, child => { result.push(...strings(child)); });
      return result;
    }
    function visit(node: ts.Node) {
      if (ts.isJsxAttribute(node)) {
        const name = node.name.getText(source);
        const values = node.initializer ? strings(node.initializer) : [];
        if (name === 'className') classes.push(...values);
        else for (const value of values) properties.push([name, value]);
        if (['onMouseEnter', 'onPointerEnter', 'whileHover'].includes(name)) found.states.add('hover-state');
        if (['onFocus', 'onFocusCapture', 'whileFocus'].includes(name)) found.states.add('focus-state');
        if (name === 'disabled' || name === 'isDisabled') found.states.add('disabled-state');
        if (name === 'invalid' || name === 'isInvalid' || name === 'error') found.states.add('error-state');
        if (name === 'loading' || name === 'isLoading') found.states.add('loading-state');
      }
      if (ts.isPropertyAssignment(node)) {
        const name = node.name.getText(source).replace(/['"]/g, '');
        for (const value of strings(node.initializer)) properties.push([name, value]);
      }
      if (ts.isIdentifier(node)) identifiers.add(node.text);
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && ['cva', 'cn', 'clsx', 'classNames'].includes(node.expression.text)) classes.push(...strings(node));
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  for (const token of classes.flatMap(value => value.split(/\s+/))) {
    const base = token.split(':').at(-1)!;
    if (/^(?:sm|md|lg|xl|2xl):/.test(token)) found.states.add('responsive-variant');
    if (/(?:^|:)dark:/.test(token)) found.states.add('dark-mode-variant');
    if (/(?:^|:)(?:hover|group-hover|group-hover\/[^:]+):/.test(token)) found.states.add('hover-state');
    if (/(?:^|:)(?:focus|focus-visible|focus-within):/.test(token)) found.states.add('focus-state');
    if (/(?:^|:)disabled:/.test(token)) found.states.add('disabled-state');
    if (/data-\[state=(?:checked|selected|active)\]/.test(token)) found.states.add('selected-state');
    if (/motion-(?:reduce|safe):/.test(token)) found.motion.add('reduced-motion-variant');
    if (base === 'flex' || base === 'flex-row') found.layout.add('row');
    if (base === 'flex-col') found.layout.add('column');
    if (/^grid(?:-|$)/.test(base)) found.layout.add('grid');
    if (/^inline(?:-|$)/.test(base)) found.layout.add('inline');
    if (/^(?:items|justify|place-items)-center$/.test(base)) found.layout.add('centered');
    if (['absolute', 'fixed', 'sticky'].includes(base)) found.layout.add(base);
    if (/^overflow(?:-[xy])?-(?:auto|scroll)$/.test(base)) found.layout.add('scrollable');
    if (/^border(?:$|-[0-9]+$|-[trblxy]$)/.test(base)) found.surface.add('bordered');
    if (/^border-(?:primary|secondary|muted|accent|destructive|input|border|[a-z]+-[0-9]+)/.test(base)) found.surface.add('bordered');
    if (/^shadow(?:-|$)/.test(base) && base !== 'shadow-none') found.surface.add('shadow');
    if (/^bg-(?:linear|gradient)-/.test(base)) found.surface.add('gradient');
    if (/^(?:backdrop-)?blur(?:-|$)/.test(base) && !base.endsWith('-none')) found.surface.add('blur');
    if (base === 'bg-transparent') found.surface.add('transparent');
    else if (/^bg-/.test(base)) found.surface.add('filled');
    if (/^rounded(?:-|$)/.test(base)) found.shape.add(base === 'rounded-none' ? 'square-corners' : base === 'rounded-full' ? 'fully-rounded' : 'rounded');
    for (const color of visualVocabulary.color) if (new RegExp(`^(?:bg|text|border|ring|from|to|via)-${color}(?:-|/|$)`).test(base)) found.color.add(color);
    if (base === 'font-mono') found.typography.add('monospace');
    if (base === 'uppercase') found.typography.add('uppercase');
    if (base === 'truncate') found.typography.add('truncated');
    if (/^line-clamp-/.test(base)) found.typography.add('line-clamped');
    if (/^animate-/.test(base) && base !== 'animate-none') found.motion.add('animation');
    if (/^transition(?:-|$)/.test(base) && base !== 'transition-none') found.motion.add('transition');
    if (/^(?:scale|rotate|translate|transform)(?:-|$)/.test(base)) found.motion.add('transform');
  }
  for (const [name, value] of properties) {
    if (name === 'variant') {
      if (/^(?:outline|bordered)$/.test(value)) found.surface.add('bordered');
      if (/^(?:solid|filled|flat|soft|subtle|light)$/.test(value)) found.surface.add('filled');
      if (/^(?:ghost|transparent)$/.test(value)) found.surface.add('transparent');
      if (value === 'shadow') found.surface.add('shadow');
    }
    if (/^(?:radius|rounded|borderRadius)$/.test(name)) found.shape.add(/^(?:full|9999px)$/.test(value) ? 'fully-rounded' : /^(?:none|0)$/.test(value) ? 'square-corners' : 'rounded');
    if (/^(?:shadow|boxShadow)$/.test(name) && value !== 'none') found.surface.add('shadow');
    if (/^(?:color|colorPalette|colorScheme|bg|background|backgroundColor)$/.test(name)) {
      const color = value.split('.')[0];
      if ((visualVocabulary.color as readonly string[]).includes(color)) found.color.add(color);
    }
    if (name === 'orientation') found.layout.add(value === 'vertical' ? 'column' : 'row');
    if (name === 'flexDirection') found.layout.add(value.startsWith('column') ? 'column' : 'row');
    if (name === 'position' && ['absolute', 'fixed', 'sticky'].includes(value)) found.layout.add(value);
    if (name === 'fontFamily' && /mono/.test(value)) found.typography.add('monospace');
    if (name === 'transition' && value !== 'none') found.motion.add('transition');
    if (name === 'type' && value === 'spring') found.motion.add('spring');
  }
  if (identifiers.has('motion') || identifiers.has('AnimatePresence')) found.motion.add('animation');
  if (identifiers.has('useSpring')) found.motion.add('spring');
  if (identifiers.has('useReducedMotion')) found.motion.add('reduced-motion-variant');
  if (identifiers.has('Marquee')) found.motion.add('marquee');
  return { evidence: 'source', scope, ...Object.fromEntries(Object.entries(found).map(([key, values]) => [key, [...values].sort()])) } as CatalogVisual;
}
