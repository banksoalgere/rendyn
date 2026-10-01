import { constants } from 'node:fs';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { parseCatalogComponent, parseCatalogIndex } from '../packages/catalog/src/schema.js';
import { assignPublicSlugs } from '../packages/catalog/src/public-slugs.js';
import { visualSearchTerms } from '../packages/catalog/src/visual.js';
import { loadLibraryConfigs } from './import-libraries.js';
import { buildLibraryLabels, observedInteractions } from './lib/catalog-import/library-labels.js';
import { buildMetadata, unique } from './lib/catalog-import/metadata.js';
import { buildVisualLabels } from './lib/catalog-import/visual-labels.js';
import { promoteOutputs } from './lib/catalog-import/promote.js';
import { runProcess, safeOutputPath } from './lib/catalog-import/security.js';

const projectRoot = resolve(import.meta.dirname, '..');
const lock = resolve(projectRoot, '.catalog-import-lock');
await mkdir(lock);
let stage: string | undefined;
let promoted = false;
try {
  stage = await mkdtemp(resolve(projectRoot, '.catalog-import-labels-'));
  await cp(resolve(projectRoot, 'catalog'), resolve(stage, 'catalog'), { recursive: true, mode: constants.COPYFILE_FICLONE });
  const catalogRoot = resolve(stage, 'catalog');
  const indexPath = resolve(catalogRoot, 'index.json');
  const index = parseCatalogIndex(JSON.parse(await readFile(indexPath, 'utf8')));
  const pinned = JSON.parse(await readFile(resolve(catalogRoot, 'public-slugs.json'), 'utf8'));
  // Allocate from the old names before changing display text.
  const publicSlugs = assignPublicSlugs(index.components, pinned);
  const configs = await loadLibraryConfigs();
  const reviewed = new Map(configs.flatMap(config => config.components.map(component => [`${config.id}:${component.slug}`, { config, component }] as const)));
  const reviewQueue: Array<{ id: string; name: string; evidence: string[] }> = [];
  const families: Record<string, number> = {};
  let renamed = 0;
  let renamedFromUpstream = 0;
  for (const summary of index.components) {
    const path = safeOutputPath(catalogRoot, summary.manifestPath);
    const manifest = parseCatalogComponent(JSON.parse(await readFile(path, 'utf8')));
    const entry = reviewed.get(summary.id);
    if (entry) {
      const labels = buildLibraryLabels(entry.config, entry.component, manifest.files);
      if (summary.name !== labels.name) renamed++;
      if (entry.component.name !== labels.name) renamedFromUpstream++;
      if (labels.reviewRequired) reviewQueue.push({ id: summary.id, name: labels.name, evidence: labels.evidence });
      Object.assign(summary, { name: labels.name, description: labels.description, metadata: labels.metadata });
      manifest.documentation = manifest.documentation.replace(/^# [^\n]+\n\n[^\n]+/, `# ${labels.name}\n\n${labels.description}`);
      await writeFile(resolve(dirname(path), 'README.md'), manifest.documentation);
    } else {
      const metadata = buildMetadata({ slug: manifest.provenance.upstreamSlug, name: summary.name,
        description: summary.description, category: summary.category } as Parameters<typeof buildMetadata>[0], manifest.documentation);
      metadata.visual = buildVisualLabels(manifest.files, 'component-source');
      metadata.interactions = observedInteractions(manifest.files);
      metadata.exampleCount = 1;
      metadata.labelStatus = 'source-labelled';
      metadata.searchText = unique([metadata.searchText, ...visualSearchTerms(metadata.visual)]).join('\n');
      summary.metadata = metadata;
    }
    Object.assign(manifest, summary);
    parseCatalogComponent(manifest);
    await writeFile(path, JSON.stringify(manifest, null, 2) + '\n');
    families[summary.metadata.family] = (families[summary.metadata.family] ?? 0) + 1;
  }
  index.categories = index.categories.map(category => category.slug === 'blocks'
    ? { ...category, name: 'Components & blocks', description: 'Individual interface controls and composed product patterns.' } : category);
  // Retain the source snapshot timestamp: a labelling pass does not import new source.
  parseCatalogIndex(index);
  await writeFile(indexPath, JSON.stringify(index, null, 2) + '\n');
  await writeFile(resolve(catalogRoot, 'public-slugs.json'), JSON.stringify(publicSlugs, null, 2) + '\n');
  await writeFile(resolve(catalogRoot, 'label-audit.json'), JSON.stringify({ schemaVersion: 1,
    method: 'Purpose profiles and static analysis of pinned source; visual arrays are observations, not exhaustive guarantees. Empty arrays mean unobserved.',
    total: index.components.length, libraryEntries: reviewed.size, renamedFromUpstream, families,
    sourceVisualLabels: index.components.length, renderedVisualReviews: 0, needsReview: reviewQueue }, null, 2) + '\n');
  const registryPath = 'apps/preview/generated/external-registry.ts';
  const registry = await readFile(resolve(projectRoot, registryPath), 'utf8');
  const entries = JSON.parse(registry.slice(registry.indexOf('['), registry.lastIndexOf(']') + 1));
  const summaries = new Map(index.components.map(component => [component.slug, component]));
  for (const entry of entries) {
    const summary = summaries.get(entry.slug);
    if (!summary) throw new Error(`Preview entry missing from catalogue: ${entry.slug}`);
    entry.name = summary.name;
    entry.description = summary.description;
  }
  await mkdir(dirname(resolve(stage, registryPath)), { recursive: true });
  await writeFile(resolve(stage, registryPath), `export const externalRegistry = ${JSON.stringify(entries, null, 2)} as const;\n`);
  process.env.CATALOG_IMPORT_ROOT = stage;
  await runProcess(process.execPath, ['--import', 'tsx', resolve(projectRoot, 'scripts/verify-catalog.ts')]);
  await runProcess(process.execPath, ['--import', 'tsx', resolve(projectRoot, 'scripts/generate-worker-catalog.ts')]);
  await promoteOutputs(stage, projectRoot, ['catalog', registryPath, 'apps/api/src/generated/catalog-data.ts']);
  promoted = true;
  console.log(`Labelled ${index.components.length} components; renamed ${renamed}; ${reviewQueue.length} need purpose review. All published URLs retained.`);
} finally {
  delete process.env.CATALOG_IMPORT_ROOT;
  if (stage && promoted) await rm(stage, { recursive: true, force: true });
  else if (stage) console.error(`Label pass failed; staging and backups retained: ${stage}`);
  await rm(lock, { recursive: true, force: true });
}
