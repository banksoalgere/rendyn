import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { CatalogStore } from '@rendyn/catalog';

const root = resolve(import.meta.dirname, '../catalog');
const manifest = JSON.parse(await readFile(resolve(root, 'previews/delivery/sources.json'), 'utf8')) as Record<string, string>;
const store = await CatalogStore.load(root);
for (const component of store.index.components) {
  const original = await readFile(resolve(root, 'previews', `${component.slug}.png`));
  if (manifest[component.slug] !== createHash('sha256').update(original).digest('hex')) {
    throw new Error(`Delivery preview is stale: ${component.slug}; run pnpm catalog:images`);
  }
  const delivery = await readFile(resolve(root, 'previews/delivery', `${component.slug}.png`));
  if (delivery.length < 24 || delivery.readUInt32BE(0) !== 0x89504e47
    || delivery.readUInt32BE(16) > 640 || delivery.readUInt32BE(20) > 400) {
    throw new Error(`Invalid delivery image: ${component.slug}`);
  }
}
console.log(`Verified ${store.index.components.length} delivery previews`);
