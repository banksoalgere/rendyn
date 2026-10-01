import { posix } from 'node:path';
import ts from '../../../apps/web/node_modules/typescript/lib/typescript.js';
import type { CatalogFile } from '../../../packages/catalog/src/types.js';

type File = Pick<CatalogFile, 'path' | 'content'>;

/** Include direct local implementations so default control styles are observable.
 * Do not pull every dependency into the label of its parent example. */
export function labelSourceFiles(primary: File[], bundle: File[]): File[] {
  const byPath = new Map(bundle.map(file => [file.path, file]));
  const selected = new Map(primary.map(file => [file.path, file]));
  for (const file of primary) {
    const source = ts.createSourceFile(file.path, file.content, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX);
    for (const node of source.statements) {
      if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) continue;
      const specifier = node.moduleSpecifier.text;
      const path = specifier.startsWith('@/') ? specifier.slice(2)
        : specifier.startsWith('.') ? posix.normalize(posix.join(posix.dirname(file.path), specifier)) : null;
      if (!path) continue;
      const match = [path, `${path}.tsx`, `${path}.ts`, `${path}.jsx`, `${path}.js`, `${path}/index.tsx`, `${path}/index.ts`]
        .map(candidate => byPath.get(candidate)).find(Boolean);
      if (match) selected.set(match.path, match);
    }
  }
  return [...selected.values()];
}
