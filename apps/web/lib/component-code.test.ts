import { describe, expect, it } from 'vitest';
import { catalogueEntries } from './catalogue';
import { getComponentCode } from './component-code.server';

describe('component code catalogue', () => {
  it.each(catalogueEntries)('provides source, installation, and original licence for $publicSlug', async (entry) => {
    const code = await getComponentCode(entry.publicSlug);
    expect(code).not.toBeNull();
    expect(code!.files.length).toBeGreaterThan(0);
    expect(code!.files.every((file) => file.path && file.content)).toBe(true);
    expect(code!.license).toContain('Permission is hereby granted');
    expect(code!.install.instructions.length).toBeGreaterThan(0);
  });
  it.each(['missing-component', '../tooltip', '__proto__', 'components/tooltip'])('rejects unknown or path-like slugs: %s', async (slug) => {
    expect(await getComponentCode(slug)).toBeNull();
  });
});
