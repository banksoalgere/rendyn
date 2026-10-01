import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { expect, it } from 'vitest';
import { promoteOutputs } from './promote';

it('restores every prior output if promotion fails part way through', async () => {
  const root = await mkdtemp(join(tmpdir(), 'catalog-promotion-'));
  try {
    const stage = join(root, 'stage'); const project = join(root, 'project');
    await mkdir(stage); await mkdir(project);
    await writeFile(join(project, 'catalog'), 'original catalogue');
    await writeFile(join(project, 'runtime'), 'original runtime');
    await writeFile(join(stage, 'catalog'), 'new catalogue');
    await expect(promoteOutputs(stage, project, ['catalog', 'runtime'])).rejects.toThrow();
    expect(await readFile(join(project, 'catalog'), 'utf8')).toBe('original catalogue');
    expect(await readFile(join(project, 'runtime'), 'utf8')).toBe('original runtime');
  } finally { await rm(root, { recursive: true, force: true }); }
});
