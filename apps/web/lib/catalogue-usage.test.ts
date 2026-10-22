import { describe, expect, it } from 'vitest';
import { getComponentUsage, groupComponentsByUsage } from './catalogue-usage';
import { workspaceComponents } from './workspace-catalogue';

describe('catalogue usage folders', () => {
  it('places every current component in exactly one named usage folder', () => {
    const groups = groupComponentsByUsage(workspaceComponents);
    expect(groups.some(([label]) => label === 'Other components')).toBe(false);
    const slugs = groups.flatMap(([, entries]) => entries.map(entry => entry.publicSlug));
    expect(slugs).toHaveLength(workspaceComponents.length);
    expect(new Set(slugs).size).toBe(workspaceComponents.length);
  });

  it('groups buttons from different libraries together', () => {
    const buttons = workspaceComponents.filter(component => component.family === 'button');
    expect(new Set(buttons.map(component => component.previewId.split('-')[0])).size).toBeGreaterThan(1);
    expect(new Set(buttons.map(getComponentUsage))).toEqual(new Set(['Buttons & actions']));
  });
});
