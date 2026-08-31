import { copyFile, mkdir, readFile, readdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

interface CatalogIndex {
  components: Array<{ slug: string }>;
}

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalogPreviewDirectory = resolve(repositoryRoot, 'catalog/previews');
const publicDirectory = resolve(repositoryRoot, 'apps/web/public');
const publicPreviewDirectory = resolve(publicDirectory, 'component-previews');
const catalogIndexPath = resolve(repositoryRoot, 'catalog/index.json');

if (dirname(publicPreviewDirectory) !== publicDirectory) {
  throw new Error('Refusing to sync previews outside apps/web/public.');
}

const catalog = JSON.parse(await readFile(catalogIndexPath, 'utf8')) as CatalogIndex;
const expectedPreviewNames = new Set(catalog.components.map(({ slug }) => `${slug}.png`));
const availablePreviewNames = new Set(
  (await readdir(catalogPreviewDirectory)).filter((name) => name.endsWith('.png')),
);

const missingPreviews = [...expectedPreviewNames].filter((name) => !availablePreviewNames.has(name));
if (missingPreviews.length > 0) {
  throw new Error(`Missing ${missingPreviews.length} catalogue previews: ${missingPreviews.join(', ')}`);
}

await rm(publicPreviewDirectory, { recursive: true, force: true });
await mkdir(publicPreviewDirectory, { recursive: true });

await Promise.all(
  [...expectedPreviewNames].map((name) =>
    copyFile(resolve(catalogPreviewDirectory, name), resolve(publicPreviewDirectory, name)),
  ),
);

console.log(`Synced ${expectedPreviewNames.size} component previews for the website.`);
