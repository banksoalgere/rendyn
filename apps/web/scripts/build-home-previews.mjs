import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const preview = resolve(web, '../preview');
let sources = [];
const buildOptions = {
  configFile: false,
  root: web,
  publicDir: false,
  logLevel: 'error',
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  resolve: { alias: { '@preview': resolve(preview, 'vendor-root') }, dedupe: ['react', 'react-dom'] },
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react(), {
    name: 'homepage-preview-styles',
    enforce: 'pre',
    transform(code, id) {
      if (id.split('?')[0] !== resolve(preview, 'app/globals.css') || !sources.length) return;
      return code.replace(/^@source .*;$/gm, '').replace(/^@import .*\/(?:external-styles|presentation)\.css["'];$/gm, '') + sources.map(path => `\n@source ${JSON.stringify(path)};`).join('');
    },
  }, {
    name: 'homepage-preview-alias',
    enforce: 'pre',
    transform(code, id) {
      if (id.split('?')[0].startsWith(preview) && code.includes('@/')) {
        return { code: code.replace(/(["'])@\//g, '$1@preview/'), map: null };
      }
    },
  }],
  build: {
    write: false,
    minify: true,
    cssCodeSplit: false,
    lib: { entry: resolve(web, 'home-previews/styles-entry.ts'), name: 'RendynHomePreview', formats: ['iife'] },
  },
};
// Use the bundled module graph to scan only classes used by homepage demos.
// The second pass compiles those styles without the full catalogue utilities.
const scan = await build(buildOptions);
sources = [...new Set((Array.isArray(scan) ? scan : [scan]).flatMap(result => result.output).filter(output => output.type === 'chunk').flatMap(chunk => Object.keys(chunk.modules)).filter(id => id.startsWith(preview) && /\.[jt]sx?$/.test(id)))];
const result = await build(buildOptions);
const outputs = (Array.isArray(result) ? result : [result]).flatMap(result => result.output);
const css = outputs.filter(output => output.type === 'asset' && output.fileName.endsWith('.css'));
if (css.length !== 1) throw new Error('Homepage previews must compile to one stylesheet');
// Font faces are copied from the already loaded parent document at runtime.
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${String(css[0].source).replace(/<\/style/gi, '<\\/style')}</style></head><body data-theme="white"><main class="preview-shell preview-shell--embedded"><section class="preview-frame" id="preview" data-preview-root></section></main></body></html>`;
await mkdir(resolve(web, 'public'), { recursive: true });
await writeFile(resolve(web, 'public/home-previews.txt'), html);
console.log(`Homepage preview styles: ${(Buffer.byteLength(html) / 1024).toFixed(0)} KiB, ${sources.length} source files`);
