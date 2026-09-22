import { parseCatalogComponent } from '../../../packages/catalog/src/schema';
import { findCatalogueEntry } from './catalogue';
import type { ComponentCode } from './component-code';

const componentSources = import.meta.glob<unknown>('../../../catalog/components/*/component.json', { import: 'default' });
const licenses = import.meta.glob<string>('../../../catalog/source/*/LICENSE', { query: '?raw', import: 'default', eager: true });

export async function getComponentCode(slug: string): Promise<ComponentCode | null> {
  const entry = findCatalogueEntry(slug);
  if (!entry) return null;
  const loadSource = componentSources[`../../../catalog/${entry.manifestPath}`];
  if (!loadSource) throw new Error('Component source is unavailable');
  const component = parseCatalogComponent(await loadSource());
  const license = licenses[`../../../catalog/${component.source.license.textPath}`];
  if (!license || component.files.length === 0) throw new Error('Incomplete component source');
  return {
    files: component.files.map(({ path, content, type }) => ({
      path,
      // Omit standalone upstream component links; retain copyright and licence notices.
      content: content.replace(/^[\t ]*\/\/[\t ]+(?:https?:\/\/)?beui\.dev\/components\/[a-z0-9/-]+[\t ]*\r?\n/gm, ''),
      type,
    })),
    install: component.install,
    license,
  };
}
