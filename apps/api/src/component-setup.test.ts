import { CatalogStore } from '@rendyn/catalog';
import { describe, expect, it } from 'vitest';
import { componentSetup } from './component-setup.js';
import { catalogSnapshot } from './generated/catalog-data.js';

const store = CatalogStore.fromSnapshot(catalogSnapshot);
describe('source handoff', () => {
  it('includes packages used by the source but missing in upstream registry metadata', async () => {
    const component = (await store.get('magicui:hero-video-dialog'))!;
    const setup = componentSetup(component);
    expect(setup.dependencies).toContain('lucide-react');
    expect(setup.dependencies).toContain('motion');
    expect(setup.required_project_imports).toContain('@/lib/utils');
    expect(setup.install.instructions.some(line => line.includes('cn'))).toBe(true);
    expect(component.dependencies).not.toContain('lucide-react'); // Original integrity/provenance remains unchanged.
  });
  it('recognises bundled helpers rather than requesting them again', async () => {
    const component = (await store.get('expanding-arrow-button'))!;
    const setup = componentSetup(component);
    expect(setup.required_project_imports).not.toContain('@/lib/utils');
    expect(setup.entrypoints.every(entry => !entry.path.includes('/previews/'))).toBe(true);
  });
  it('does not place shell syntax or package-manager flags in dependency commands', async () => {
    const component = (await store.get('magicui:hero-video-dialog'))!;
    const setup = componentSetup({ ...component, dependencies: ['--ignore-scripts', '-g', '.hidden', 'react;echo unsafe', '@radix-ui/react-dialog', 'react'] });
    expect(setup.dependencies).toContain('@radix-ui/react-dialog');
    expect(setup.dependencies).toContain('react');
    expect(setup.dependencies).not.toContain('--ignore-scripts');
    expect(setup.dependencies).not.toContain('-g');
    expect(setup.dependencies).not.toContain('.hidden');
    expect(setup.dependencies).not.toContain('react;echo unsafe');
  });
});
