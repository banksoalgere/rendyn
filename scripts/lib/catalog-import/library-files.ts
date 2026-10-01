import type { LibraryConfig } from './library-config.js';
import { invariant, sha256 } from './security.js';
import { imports, mantineRuntime, mantineTemplate, previewExport, sourceFile } from './source-ast.js';

export function transformLibraryFile(raw: string, file: LibraryConfig['components'][number]['files'][number]) {
  invariant(sha256(raw) === file.sha256, `Upstream integrity mismatch: ${file.upstreamPath}`);
  let content = raw;
  if(file.transform==='shadcn-style') content='@reference "./rendyn-theme.css";\n'+raw;
  if(file.transform==='shadcn-theme') {
    const theme=raw.match(/@theme inline \{[^}]+\}/)?.[0];
    const light=raw.match(/:root \{[^}]+\}/)?.[0];
    const dark=raw.match(/\.dark \{[^}]+\}/)?.[0];
    invariant(theme && light && dark,'Missing upstream theme declarations');
    content='@reference "tailwindcss";\n@reference "shadcn/tailwind.css";\n@reference "tw-animate-css";\n'
      + [...raw.matchAll(/@custom-variant [^;]+;/g)].map(match=>match[0]).join('\n')+'\n'+theme+'\n'
      +light.replace(':root','.rendyn-shadcn-base')+'\n'+dark.replace('.dark','.dark.rendyn-shadcn-base, .dark .rendyn-shadcn-base')+'\n';
  }
  if (file.transform === 'mantine-runtime') content = mantineRuntime(raw);
  if (file.transform === 'mantine-template') {
    content = mantineTemplate(raw, file.templateName);
    if (file.type !== 'style' && !previewExport(content)) {
      const source = sourceFile(content);
      invariant(source.statements.some(statement => /^(?:function|const) Demo\b/.test(statement.getText(source))), `Missing Demo in ${file.upstreamPath}`);
      content += '\nexport default Demo;\n';
    }
  }
  if (file.transform === 'mantine-example') {
    const example = raw.match(/const code = `([\s\S]*?)`;/);
    invariant(example, `Missing Mantine example: ${file.upstreamPath}`);
    content = example[1].replace(/\{\{props\}\}/g, '').replace('function Demo()', 'export default function Demo()');
  }
  for (const [from, to] of file.replacements) {
    invariant(content.includes(from), `Missing import transformation: ${file.upstreamPath}: ${from}`);
    content = content.replaceAll(from, to);
  }
  if (file.type === 'style' || file.type === 'data') return content;
  if (/^\s*["']use server["'];?/.test(content)) return content;
  return `"use client";\n\n${content.replace(/^['"]use client['"];?\s*/, '')}`;
}

export function validateLibraryImports(files: { path: string; content: string }[], dependencies: string[]) {
  const packages = new Set(['react', 'react-dom', ...dependencies.map(d => d.includes('@npm:') ? d.split('@npm:')[0] : d.slice(0, d.lastIndexOf('@')))]);
  const paths = new Set(files.flatMap(f => [f.path, f.path.replace(/\.(tsx?|jsx?)$/, '')]));
  for (const file of files) for (const {specifier: imported, typeOnly} of imports(file.content)) {
    if (typeOnly) continue;
    if (imported.startsWith('@/')) {
      invariant(paths.has(imported.slice(2)), `Unresolved copied import: ${file.path}: ${imported}`);
    } else {
      invariant(!imported.startsWith('.') && !imported.includes(':') && !imported.startsWith('/'), `Unsupported import: ${imported}`);
      const name = imported.startsWith('@') ? imported.split('/').slice(0, 2).join('/') : imported.split('/')[0];
      invariant(packages.has(name), `Undeclared package: ${name}`);
    }
  }
}
