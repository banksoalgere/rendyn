import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { CatalogStore } from '@rendyn/catalog';
import { mapConcurrent } from './lib/catalog-import/concurrency.js';

const root = resolve(import.meta.dirname, '../catalog');
const output = resolve(root, 'previews/delivery');
await mkdir(output, { recursive: true });
const store = await CatalogStore.load(root);
const manifest: Record<string, string> = {};
await mapConcurrent(store.index.components, 3, async component => {
  const input = await readFile(resolve(root, 'previews', `${component.slug}.png`));
  const image = await sharp(input).resize({ width: 640, height: 400, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
  await writeFile(resolve(output, `${component.slug}.png`), image);
  manifest[component.slug] = createHash('sha256').update(input).digest('hex');
});
await writeFile(resolve(output, 'sources.json'), `${JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2)}\n`);
console.log(`Generated ${Object.keys(manifest).length} delivery previews; original images preserved`);
