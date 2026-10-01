import { createHash } from "node:crypto";
import { readFile } from 'node:fs/promises';
import { resolve } from "node:path";
import { CatalogStore } from "@rendyn/catalog";
import { loadLibraryConfigs } from './import-libraries.js';
import { assertStandardMitLicense } from './lib/catalog-import/license.js';

const catalogRoot = resolve(process.env.CATALOG_IMPORT_ROOT ?? resolve(import.meta.dirname, '..'), 'catalog');
const store = await CatalogStore.load(catalogRoot);

const libraryConfigs = await loadLibraryConfigs();
const expectedCount = 189 + libraryConfigs.reduce((count, config) => count + config.components.length, 0);
if (store.index.components.length !== expectedCount) {
  throw new Error(`Expected ${expectedCount} reviewed components, found ${store.index.components.length}`);
}

if (store.index.sources.map((source) => source.id).join(",") !== ['beui', 'magicui', 'kibo', ...libraryConfigs.map(c => c.id)].join(',')) {
  throw new Error("Catalogue sources do not match the reviewed import set");
}

for (const config of libraryConfigs) {
  const components = store.index.components.filter(component => component.sourceId === config.id);
  if (components.map(c => c.slug).sort().join(',') !== config.components.map(c => `${config.id}-${c.slug}`).sort().join(',')) {
    throw new Error(`Reviewed library component set differs: ${config.id}`);
  }
  const source = store.index.sources.find(source => source.id === config.id);
  if (source?.commit !== config.commit) throw new Error(`Unreviewed library revision: ${config.id}`);
  const license = await readFile(resolve(catalogRoot, 'source', config.id, 'LICENSE'), 'utf8');
  assertStandardMitLicense(license, config.license);
  for (const reviewed of config.components) {
    const manifest = await store.get(`${config.id}-${reviewed.slug}`);
    if (!manifest) throw new Error(`Missing reviewed component: ${reviewed.slug}`);
    for (const file of reviewed.files) {
      const imported = manifest.files.find(candidate => candidate.path === file.path);
      if (imported?.upstreamPath !== file.upstreamPath || imported.upstreamSha256 !== file.sha256) {
        throw new Error(`Unreviewed upstream file: ${config.id}/${file.path}`);
      }
    }
  }
}

for (const summary of store.index.components) {
  const manifest = await store.get(summary.slug);
  if (!manifest) throw new Error(`Missing component manifest: ${summary.slug}`);
  for (const file of manifest.files) {
    const hash = createHash("sha256").update(file.content).digest("hex");
    if (hash !== file.sha256) {
      throw new Error(`File integrity mismatch: ${summary.slug}/${file.path}`);
    }
  }
}

const firstComponent = await store.get(store.index.components[0].slug);
if (!firstComponent) throw new Error("Catalogue is missing its first component manifest");
await store.readLicenseText(firstComponent);
process.stdout.write(
  `Verified ${store.index.components.length} MIT components across ` +
    `${store.index.categories.length} categories.\n`,
);
