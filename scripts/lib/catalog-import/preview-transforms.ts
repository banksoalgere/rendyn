import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/** Runtime-only adaptations. Redistributed catalogue source and hashes stay intact. */
export async function optimisePreviewRuntime(vendorRoot: string) {
  for (const name of ['previews', 'external-previews']) {
    const path = resolve(vendorRoot, `components/${name}/index.tsx`);
    try {
      const source = await readFile(path, 'utf8');
      await writeFile(path, source.replace(/from (["'])next\/dynamic\1/, 'from "../../../runtime/preview-dynamic"'));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
  }
  const editor = resolve(vendorRoot, 'components/kibo-ui/editor/index.tsx');
  try {
    const source = await readFile(editor, 'utf8');
    if (!source.includes('import { all, createLowlight } from "lowlight";')
      && !source.includes('import { common as all, createLowlight } from "lowlight";')) {
      throw new Error('Editor highlighting import changed; review preview adaptation');
    }
    await writeFile(editor, source.replace('import { all, createLowlight } from "lowlight";',
      'import { common as all, createLowlight } from "lowlight";')
      .replace('// Create a lowlight instance with all languages loaded', '// Preview runtime: load the common grammars; catalogue source remains unchanged.'));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
  const css = resolve(vendorRoot, 'globals.css');
  const styles = await readFile(css, 'utf8');
  await writeFile(css, styles.replace('@import "tailwindcss";', '@import "tailwindcss" source(none);'));
}
