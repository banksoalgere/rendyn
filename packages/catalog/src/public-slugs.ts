import { z } from 'zod';

const id = z.string().regex(/^[a-z0-9]+:[a-z0-9]+(?:-[a-z0-9]+)*$/);
const slug = z.string().max(240).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const publicSlugMapSchema = z.record(id, slug).superRefine((map, context) => {
  if (new Set(Object.values(map)).size !== Object.keys(map).length) {
    context.addIssue({ code: 'custom', message: 'Public component URLs must be unique' });
  }
});

function slugify(value: string) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** Reserve published paths, including retired entries, before allocating new ones. */
export function assignPublicSlugs(components: Array<{ id: string; name: string }>, pinned: unknown = {}): Record<string, string> {
  const result = publicSlugMapSchema.parse(pinned);
  const used = new Set(Object.values(result));
  for (const [index, component] of components.entries()) {
    id.parse(component.id);
    if (result[component.id]) continue;
    const base = slugify(component.name) || `component-${index + 1}`;
    let next = base;
    let alternative = 2;
    while (used.has(next)) next = `${base}-example-${alternative++}`;
    result[component.id] = slug.parse(next);
    used.add(next);
  }
  return result;
}
