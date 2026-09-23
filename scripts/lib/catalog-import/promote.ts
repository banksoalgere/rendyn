import { mkdir, rename, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

/** All validation precedes promotion; restore prior outputs if a rename fails. */
export async function promoteOutputs(stagingRoot: string, projectRoot: string, paths: string[]) {
  const moved: Array<{ target: string; backup: string; hadPrevious: boolean; installed: boolean }> = [];
  try {
    for (const path of paths) {
      const target = resolve(projectRoot, path);
      const backup = resolve(stagingRoot, '.previous', path);
      await mkdir(dirname(backup), { recursive: true });
      await mkdir(dirname(target), { recursive: true });
      let hadPrevious = true;
      try { await rename(target, backup); } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
        hadPrevious = false;
      }
      const item = { target, backup, hadPrevious, installed: false };
      moved.push(item);
      await rename(resolve(stagingRoot, path), target);
      item.installed = true;
    }
  } catch (error) {
    for (const item of moved.reverse()) {
      if (item.installed) await rm(item.target, { recursive: true, force: true });
      if (item.hadPrevious) await rename(item.backup, item.target);
    }
    throw error;
  }
}
