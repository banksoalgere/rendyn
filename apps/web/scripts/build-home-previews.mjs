import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const preview = resolve(web, '../preview');
const result = await build({
  configFile: false,
  root: web,
  publicDir: false,
  logLevel: 'error',
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  resolve: { alias: { '@preview': resolve(preview, 'vendor-root') }, dedupe: ['react', 'react-dom'] },
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react(), {
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
    lib: { entry: resolve(web, 'home-previews/entry.tsx'), name: 'RendynHomePreview', formats: ['iife'] },
  },
});
const outputs = (Array.isArray(result) ? result : [result]).flatMap(result => result.output);
const scripts = outputs.filter(output => output.type === 'chunk');
const css = outputs.filter(output => output.type === 'asset' && output.fileName.endsWith('.css'));
if (scripts.length !== 1 || css.length !== 1) throw new Error('Homepage previews must be one self-contained script and stylesheet');
const font = (await readFile(resolve(web, 'public/fonts/dm-sans-latin.woff2'))).toString('base64');
const mono = (await readFile(resolve(web, 'public/fonts/geist-mono-latin.woff2'))).toString('base64');
const fonts = `@font-face{font-family:RendynSans;src:url(data:font/woff2;base64,${font});font-weight:100 1000;font-display:swap}@font-face{font-family:RendynMono;src:url(data:font/woff2;base64,${mono});font-weight:100 900;font-display:swap}body{--font-rendyn-sans:RendynSans;--font-geist-mono:RendynMono;font-family:RendynSans,sans-serif}`;
// Escaping closing tags prevents bundled strings from terminating raw HTML elements.
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${String(css[0].source).replace(/<\/style/gi, '<\\/style')}${fonts}</style></head><body data-theme="white"><main class="preview-shell preview-shell--embedded"><section class="preview-frame" id="preview" data-preview-root></section></main><script>${scripts[0].code.replace(/<\/script/gi, '<\\/script')}</script></body></html>`;
await mkdir(resolve(web, 'public'), { recursive: true });
await writeFile(resolve(web, 'public/home-previews.txt'), html);
console.log(`Homepage previews: ${(Buffer.byteLength(html) / 1024).toFixed(0)} KiB, one shared request`);
