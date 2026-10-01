import { cp, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { runProcess } from './lib/catalog-import/security.js';
import { promoteOutputs } from './lib/catalog-import/promote.js';

const projectRoot = resolve(import.meta.dirname, '..');
const lock = resolve(projectRoot, '.catalog-import-lock');
await mkdir(lock);
let stage: string | undefined;
let promoted = false;
try {
  stage = await mkdtemp(resolve(projectRoot, '.catalog-import-'));
  process.env.CATALOG_IMPORT_ROOT = stage;
  await cp(resolve(projectRoot, 'catalog'), resolve(stage, 'catalog'), { recursive: true });
  if (process.argv.includes('--libraries')) {
    for (const path of ['apps/preview/vendor-root', 'apps/preview/public', 'apps/preview/generated']) {
      await cp(resolve(projectRoot, path), resolve(stage, path), { recursive: true });
    }
  } else {
    const { runBeuiImport } = await import('./import-beui.js');
    const { runExternalImports } = await import('./import-external-sources.js');
    await runBeuiImport();
    await runExternalImports();
  }
  const { runLibraryImports } = await import('./import-libraries.js');
  await runLibraryImports();
  await runProcess(process.execPath, ['--import', 'tsx', resolve(projectRoot, 'scripts/verify-catalog.ts')]);
  await runProcess(process.execPath, ['--import', 'tsx', resolve(projectRoot, 'scripts/generate-worker-catalog.ts')]);
  await promoteOutputs(stage, projectRoot, ['catalog', 'apps/preview/vendor-root',
    'apps/preview/public', 'apps/preview/generated', 'apps/api/src/generated/catalog-data.ts']);
  promoted = true;
} finally {
  delete process.env.CATALOG_IMPORT_ROOT;
  if (stage && promoted) await rm(stage, { recursive: true, force: true });
  else if (stage) console.error(`Import failed; inspect retained staging/backup files: ${stage}`);
  await rm(lock, { recursive: true, force: true });
}
