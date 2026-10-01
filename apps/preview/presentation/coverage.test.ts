import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { externalRegistry } from '../generated/external-registry';
import { registry } from '../vendor-root/lib/registry';
import { getComponentExamples } from './examples';
import catalog from '../../../catalog/index.json';

const previewRoot = resolve(import.meta.dirname, '..');
const read = (path: string) => readFile(resolve(previewRoot, path), 'utf8');
const keys = (source: string) => [...source.matchAll(/["']([a-z0-9-]+(?:\/[a-z0-9-]+){1,2})["']\s*:/g)].map((match) => match[1]);

describe('live preview coverage', () => {
  it('resolves selectable variants to registered demos across the complete catalogue', async () => {
    const registered = new Set([
      ...keys(await read('presentation/index.tsx')),
      ...keys(await read('vendor-root/components/previews/index.tsx')),
      ...keys(await read('vendor-root/components/external-previews/index.tsx')),
    ]);
    for (const component of catalog.components) {
      const examples = getComponentExamples(component.category, component.slug);
      expect(examples.length).toBeGreaterThan(0);
      expect(new Set(examples.map((example) => example.slug)).size).toBe(examples.length);
      expect(examples.filter((example) => !registered.has(example.previewKey))).toEqual([]);
    }
    expect(getComponentExamples('blocks', 'kibo-stories').map((example) => example.slug)).toEqual(['images', 'videos']);
    expect(getComponentExamples('motion', 'button').map((example) => example.slug)).toEqual(['metallic', 'base', 'stateful', 'magnetic']);
  });
  it('registers a real demo for every external catalogue entry', async () => {
    const registered = new Set([
      ...keys(await read('presentation/index.tsx')),
      ...keys(await read('vendor-root/components/external-previews/index.tsx')),
    ]);
    const missing = externalRegistry.filter((entry) => !registered.has(entry.previewKey));
    expect(missing.map((entry) => entry.slug)).toEqual([]);
  });

  it('registers every named beUI example', async () => {
    const registered = new Set(keys(await read('vendor-root/components/previews/index.tsx')));
    const referenced = registry.flatMap((category) => category.components.flatMap((component) =>
      component.examples?.map((example) => example.previewKey) ?? [],
    ));
    expect(referenced.length).toBeGreaterThan(0);
    expect(referenced.filter((key) => !registered.has(key))).toEqual([]);
  });

  it('resolves the default live example for all 80 beUI component pages', async () => {
    const registered = new Set(keys(await read('vendor-root/components/previews/index.tsx')));
    const defaults = registry.flatMap((category) => category.components.map((component) =>
      component.examples?.[0]?.previewKey ?? `${category.slug}/${component.slug}`,
    ));
    expect(defaults).toHaveLength(80);
    expect(defaults.filter((key) => !registered.has(key))).toEqual([]);
  });
});
