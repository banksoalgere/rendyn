import { describe, expect, it } from 'vitest';
import { buildLibraryLabels } from './library-labels.js';
import { buildVisualLabels } from './visual-labels.js';
import { buildMetadata } from './metadata.js';
import { catalogVisualSchema } from '../../../packages/catalog/src/schema.js';
import type { LibraryConfig } from './library-config.js';
import type { RegistryDetail } from './schemas.js';

function component(slug: string) {
  return { slug, name: 'Unhelpful old label', files: [{ path: 'example.tsx' }], examples: [{ path: 'example.tsx' }] } as LibraryConfig['components'][number];
}
const file = (content: string) => [{ path: 'example.tsx', content }];

describe('catalogue source labels', () => {
  it('identifies numbered Origin UI patterns and ignores dependency controls', () => {
    const labels = buildLibraryLabels({ id: 'originui', name: 'Origin UI' }, component('comp-513'), [
      ...file('<Stepper><StepperItem /></Stepper>'), { path: 'dependency.tsx', content: '<Dialog><Input /></Dialog>' },
    ]);
    expect(labels.name).toBe('Origin UI Stepper (Example 513)');
    expect(labels.metadata.family).toBe('stepper');
    expect(labels.metadata.tags).not.toContain('dialog');
  });
  it('distinguishes primitives, composed blocks and shadcn implementations', () => {
    const primitive = buildLibraryLabels({ id: 'shadcn', name: 'shadcn/ui' }, component('base-button'), file('<Button />'));
    const block = buildLibraryLabels({ id: 'shadcn', name: 'shadcn/ui' }, component('aria-blocks-block-login-01'), file('<form><Input /></form>'));
    expect(primitive.metadata.kind).toBe('component');
    expect(primitive.name).toBe('shadcn/ui Button (Base UI)');
    expect(block.metadata).toMatchObject({ kind: 'block', family: 'login', interactions: ['type'] });
  });
  it('marks unknown purposes for review and fails on missing evidence', () => {
    const labels = buildLibraryLabels({ id: 'mui', name: 'MUI' }, component('unknown-pattern'), file('<div />'));
    expect(labels.metadata.labelStatus).toBe('needs-review');
    expect(() => buildLibraryLabels({ id: 'mui', name: 'MUI' }, component('unknown-pattern'), [])).toThrow(/Missing label evidence/);
  });
  it('uses the combobox role and ignores icon names when classifying a pattern', () => {
    const selector = buildLibraryLabels({ id: 'originui', name: 'Origin UI' }, component('comp-229'),
      file('<Popover><Button role="combobox" /><Command><CommandInput /></Command></Popover>'));
    expect(selector.metadata.family).toBe('combobox');
    expect(selector.metadata.aliases).not.toContain('command palette');
    const button = buildLibraryLabels({ id: 'originui', name: 'Origin UI' }, component('comp-100'),
      file('import { Calendar } from "lucide-react"; const Example = () => <button><Calendar /></button>;'));
    expect(button.metadata.family).toBe('button');
  });
  it('observes direct control styles without making dependency controls the family', () => {
    const labels = buildLibraryLabels({ id: 'originui', name: 'Origin UI' }, component('comp-01'), [
      ...file('import { Input } from "@/ui/input"; const Example = () => <Input />;'),
      { path: 'ui/input.tsx', content: 'const Input = () => <input className="rounded-md border bg-muted" />;' },
      { path: 'ui/dialog.tsx', content: 'const Dialog = () => <div className="rounded-full bg-blue-500" />;' },
    ]);
    expect(labels.metadata.family).toBe('input');
    expect(labels.metadata.visual?.shape).toEqual(['rounded']);
    expect(labels.metadata.visual?.color).toEqual(['muted']);
  });
  it('extracts styling and event evidence without claiming a rendered result', () => {
    const labels = buildLibraryLabels({ id: 'originui', name: 'Origin UI' }, component('comp-01'), file('<Input type="email" required className="rounded-md border bg-muted dark:bg-black md:w-full focus-visible:ring-2 transition-colors" onKeyDown={handleKey} />'));
    expect(labels.metadata.interactions).toEqual(['keyboard', 'type']);
    expect(labels.metadata.visual).toMatchObject({ evidence: 'source', scope: 'bundled-examples',
      surface: ['bordered', 'filled'], shape: ['rounded'], motion: ['transition'],
      states: ['dark-mode-variant', 'focus-state', 'responsive-variant'] });
    expect(labels.metadata.searchText).not.toContain('MIT attribution');
  });
  it('keeps prose, installations and absent styles out of visual and behavioral claims', () => {
    const visual = buildVisualLabels(file('<div>Rounded green animated profile</div>'), 'component-source');
    expect(visual.shape).toEqual([]);
    expect(visual.color).toEqual([]);
    expect(visual.motion).toEqual([]);
    expect(catalogVisualSchema.safeParse({ ...visual, motion: ['certified-static'] }).success).toBe(false);
    const metadata = buildMetadata({ slug: 'profile', name: 'Profile', description: 'Account details', category: 'blocks' } as RegistryDetail,
      'Install an expression parser, copy files and press enter.');
    expect(metadata.tags).not.toContain('file');
    expect(metadata.interactions).not.toContain('press');
  });
  it('observes event-driven hover and reduced-motion variants', () => {
    const visual = buildVisualLabels(file('const reduced = useReducedMotion(); const Button = () => <motion.button onMouseEnter={enter} onFocus={focus} />;'), 'component-source');
    expect(visual.states).toEqual(['focus-state', 'hover-state']);
    expect(visual.motion).toContain('reduced-motion-variant');
  });
});
