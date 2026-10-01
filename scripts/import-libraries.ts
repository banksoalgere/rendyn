import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { librariesSchema, type LibraryConfig } from './lib/catalog-import/library-config.js';
import { transformLibraryFile, validateLibraryImports } from './lib/catalog-import/library-files.js';
import { assertStandardMitLicense } from './lib/catalog-import/license.js';
import { buildMetadata } from './lib/catalog-import/metadata.js';
import { createComponentManifest } from './lib/catalog-import/component-manifest.js';
import { writeComponentSource } from './lib/catalog-import/component-source.js';
import { fetchText, invariant, MAX_MARKDOWN_BYTES, safeOutputPath, sha256 } from './lib/catalog-import/security.js';
import { parseCatalogIndex } from '../packages/catalog/src/schema.js';
import type { CatalogComponentSummary, CatalogFile, CatalogSource } from '../packages/catalog/src/types.js';
import type { RegistryDetail } from './lib/catalog-import/schemas.js';

const projectRoot = resolve(import.meta.dirname, '..');
const heroThemePath = 'components/rendyn-libraries/heroui/theme.css';
const heroThemeCss = `.heroui-preview {\n  --primary: hsl(var(--heroui-primary));\n  --primary-foreground: hsl(var(--heroui-primary-foreground));\n  --background: hsl(var(--heroui-background));\n  --foreground: hsl(var(--heroui-foreground));\n  --border: hsl(var(--heroui-divider));\n}\n`;

export async function loadLibraryConfigs() {
  return librariesSchema.parse(JSON.parse(await readFile(resolve(projectRoot, 'sources/libraries.json'), 'utf8')));
}

function providerExample(config: LibraryConfig, examplePath: string, exportName: string, dependencies: string[], style?: string) {
  const imports = [`import ${exportName === 'default' ? 'Example' : `{ ${exportName} as Example }`} from "@/${examplePath.replace(/\.(tsx?|jsx?)$/, '')}";`];
  let element = '<Example />';
  if (config.provider === 'mantine') {
    imports.push('import { MantineProvider } from "@mantine/core";', 'import "@mantine/core/styles.css";');
    const names = new Set(dependencies.map(value=>value.slice(0,value.lastIndexOf('@'))));
    for(const extension of ['dates','charts','carousel','code-highlight','dropzone','notifications','nprogress','spotlight','tiptap','lightbox','schedule']) if(names.has('@mantine/'+extension)) imports.push(`import "@mantine/${extension}/styles.css";`);
    element = '<Example />';
    if(names.has('@mantine/modals')) {imports.push('import {ModalsProvider} from "@mantine/modals";');element='<ModalsProvider>'+element+'</ModalsProvider>';}
    if(names.has('@mantine/notifications')) {imports.push('import {Notifications} from "@mantine/notifications";');element='<><Notifications />'+element+'</>';}
    element='<MantineProvider>'+element+'</MantineProvider>'; 
  } else if (config.provider === 'chakra') {
    imports.push('import { ChakraProvider, defaultSystem } from "@chakra-ui/react";');
    element = '<ChakraProvider value={defaultSystem}><Example /></ChakraProvider>';
  } else if (config.provider === 'heroui') {
    imports.push('import { HeroUIProvider } from "@heroui/react";', `import "@/${heroThemePath}";`);
    element = '<HeroUIProvider><Example /></HeroUIProvider>';
  }
  if(config.id==='shadcn' && style) {imports.push(`import "@/components/rendyn-libraries/shadcn/upstream/registry/styles/style-${style}.css";`);imports.push('import {NuqsAdapter} from "nuqs/adapters/react";');element='<NuqsAdapter>'+element+'</NuqsAdapter>';}
  const themeClass = config.id==='shadcn' && style ? ` className="rendyn-shadcn-base style-${style}"` : config.provider === 'heroui' ? ' className="heroui-preview"' : '';
  let styleEffect='';
  if(config.id==='shadcn' && style) {imports.push('import {useEffect} from "react";');styleEffect=`useEffect(() => { const root=document.documentElement;root.classList.add("rendyn-shadcn-base","style-${style}");return()=>root.classList.remove("rendyn-shadcn-base","style-${style}"); }, []);`;}
  return `"use client";\n\n${imports.join('\n')}\n\nexport default function Preview() {\n  ${styleEffect}\n  return <div${themeClass} style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}>${element}</div>;\n}\n`;
}

export async function runLibraryImports() {
  const outputRoot = resolve(process.env.CATALOG_IMPORT_ROOT ?? projectRoot);
  invariant(outputRoot !== projectRoot, 'Library imports must run through the staged catalogue importer');
  const catalogRoot = resolve(outputRoot, 'catalog');
  const indexPath = resolve(catalogRoot, 'index.json');
  const existing = parseCatalogIndex(JSON.parse(await readFile(indexPath, 'utf8')));
  const configs = await loadLibraryConfigs();
  const ids = new Set(configs.map(config => config.id));
  for (const component of existing.components.filter(c => ids.has(c.sourceId))) {
    invariant(component.slug.startsWith(`${component.sourceId}-`), 'Unexpected existing library slug');
    await rm(safeOutputPath(resolve(catalogRoot, 'components'), component.slug), { recursive: true, force: true });
  }
  const catalog = { ...existing, sources: existing.sources.filter(source => !ids.has(source.id)),
    components: existing.components.filter(component => !ids.has(component.sourceId)) };
  const importedAt = new Date().toISOString();
  const summaries: CatalogComponentSummary[] = [];
  const previews: object[] = [];
  const previewMappings: string[] = [];
  const sources: CatalogSource[] = [];

  for (const config of configs) {
    const baseUrl = `https://raw.githubusercontent.com/${new URL(config.repository).pathname.slice(1)}/${config.commit}/`;
    let license = await readFile(resolve(catalogRoot,'source',config.id,'LICENSE'),'utf8').catch(()=> undefined);
    if(license===undefined || sha256(license)!==config.license.sha256) license=process.env.CATALOG_LIBRARY_CACHE ? await readFile(safeOutputPath(resolve(process.env.CATALOG_LIBRARY_CACHE,'raw',config.id),config.license.path),'utf8') : await fetchText(new URL(config.license.path,baseUrl),MAX_MARKDOWN_BYTES);
    assertStandardMitLicense(license, config.license);
    const source: CatalogSource = { id: config.id, name: config.name, repository: config.repository,
      commit: config.commit, registrySha256: sha256(JSON.stringify(config.components)), importedAt,
      license: { spdx: 'MIT', copyright: config.license.copyright, textPath: `source/${config.id}/LICENSE` } };
    const sourceRoot = resolve(catalogRoot, 'source', config.id);
    await mkdir(sourceRoot, { recursive: true });
    await writeFile(resolve(sourceRoot, 'LICENSE'), license);
    await writeFile(resolve(sourceRoot, 'PROVENANCE.json'), JSON.stringify({ source, allowedRoots: config.allowedRoots,
      files: config.components.flatMap(component => component.files), setup: config.setup }, null, 2) + '\n');
    sources.push(source);
    const cache = new Map<string, string>();
    for (const component of config.components) {
      const slug = `${config.id}-${component.slug}`;
      const files: CatalogFile[] = [];
      for (const file of component.files) {
        let raw = cache.get(file.upstreamPath);
        if (raw === undefined) {
          if (process.env.CATALOG_LIBRARY_CACHE) raw = await readFile(safeOutputPath(resolve(process.env.CATALOG_LIBRARY_CACHE, 'raw', config.id), file.upstreamPath), 'utf8');
          else raw = await fetchText(new URL(file.upstreamPath, baseUrl), MAX_MARKDOWN_BYTES);
          cache.set(file.upstreamPath, raw);
        }
        const content = transformLibraryFile(raw, file);
        files.push({ path: file.path, type: file.type ?? 'component', content, sha256: sha256(content), upstreamPath: file.upstreamPath,
          upstreamSha256: file.sha256, transformation: `Pinned ${file.transform}; exact import rewrites recorded in source/${config.id}/PROVENANCE.json.` });
      }
      const dependencies = component.dependencies ?? config.dependencies;
      const examples = component.examples ?? [{slug:'default',name:'Default',path:component.files[0].path,exportName:component.exportName}];
      const previewKey = `${config.id}/${slug}`;
      const registeredExamples: object[] = [];
      for (const [index,example] of examples.entries()) {
        const previewPath = `components/rendyn-libraries/${config.id}/${component.slug}/${index ? 'previews/'+example.slug : 'preview'}.tsx`;
        const content = providerExample(config, example.path, example.exportName, dependencies, 'style' in example ? example.style : undefined);
        files.push({path:previewPath,type:'preview',content,sha256:sha256(content),transformation:'Authored standalone provider and layout composition.'});
        const key = index ? `${previewKey}/${example.slug}` : previewKey;
        registeredExamples.push({slug:example.slug,name:example.name,previewKey:key});
        previewMappings.push(`${JSON.stringify(key)}: dynamic(() => import(${JSON.stringify('@/'+previewPath.replace(/\.tsx$/,''))}), { ssr: false }),`);
      }
      if (config.provider === 'heroui') files.push({ path: heroThemePath, type: 'style', content: heroThemeCss,
        sha256: sha256(heroThemeCss), transformation: 'Authored scoped mapping to official HeroUI semantic tokens.' });
      validateLibraryImports(files, dependencies);
      const detail: RegistryDetail = { slug: component.slug, name: component.name, description: component.description,
        category: 'blocks', published_at: config.snapshotDate, updated_at: config.snapshotDate,
        dependencies, internal: [], files: [], page_url: component.pageUrl,
        detail_url: `${config.repository}/blob/${config.commit}/${component.files[0].upstreamPath}`,
        markdown_url: `${baseUrl}${component.files[0].upstreamPath}`, source_url: config.repository, raw_url: baseUrl };
      const documentation = `# ${component.name}\n\n${component.description}\n\n## Installation\n\n${config.setup.map(step => `- ${step}`).join('\n')}\n\n- Copy every returned file and preserve the MIT licence notice.\n- Render the returned preview.tsx example, or integrate the example into your existing provider.\n\nUpstream: ${component.pageUrl}\nPinned source: ${detail.detail_url}\n`;
      const summary: CatalogComponentSummary = { id: `${config.id}:${component.slug}`, sourceId: config.id, slug,
        name: component.name, description: component.description, category: 'blocks', publishedAt: config.snapshotDate,
        updatedAt: config.snapshotDate, dependencies, internalDependencies: [],
        metadata: buildMetadata(detail, documentation), previewPath: `/preview/blocks/${slug}`,
        manifestPath: `components/${slug}/component.json`,
        integrity: `sha256:${sha256(JSON.stringify(files.map(({ path, sha256: hash }) => ({ path, sha256: hash }))))}` };
      const manifest = createComponentManifest(summary, detail, documentation, files, source);
      manifest.install.instructions.push(...config.setup);
      manifest.install.stylePaths = files.filter(file => file.type === 'style').map(file => file.path);
      manifest.provenance.transformations = [...new Set(files.map(file => file.transformation ?? 'Copied verified upstream source'))];
      const componentRoot = resolve(catalogRoot, 'components', slug);
      await writeComponentSource(componentRoot, files, documentation);
      await writeFile(resolve(componentRoot, 'component.json'), JSON.stringify(manifest, null, 2) + '\n');
      for (const file of files) {
        const target = safeOutputPath(resolve(outputRoot, 'apps/preview/vendor-root'), file.path);
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, file.content);
      }
      summaries.push(summary);
      previews.push({ sourceId: config.id, slug, name: component.name, description: component.description, category: 'blocks', previewKey, examples: registeredExamples });

    }
    console.log(`Imported ${config.components.length} verified MIT entries from ${config.name}`);
  }
  const all = [...catalog.components, ...summaries];
  invariant(new Set(all.map(component => component.slug)).size === all.length, 'Duplicate catalogue slugs');
  await writeFile(indexPath, JSON.stringify({ ...catalog, generatedAt: importedAt, sources: [...catalog.sources, ...sources],
    categories: catalog.categories.map(category => ({ ...category, count: all.filter(c => c.category === category.slug).length })), components: all }, null, 2) + '\n');
  await writeFile(resolve(outputRoot,'apps/preview/generated/library-summary.json'),JSON.stringify(configs.map(config=>({id:config.id,name:config.name,repository:config.repository,snapshotDate:config.snapshotDate,familyCount:config.components.length,exampleCount:config.components.reduce((n,c)=>n+(c.examples?.length??1),0)})),null,2)+'\n');
  const registryPath = resolve(outputRoot, 'apps/preview/generated/external-registry.ts');
  const registry = await readFile(registryPath, 'utf8');
  const entries = JSON.parse(registry.slice(registry.indexOf('['), registry.lastIndexOf(']') + 1))
    .filter((entry: { sourceId: string }) => !ids.has(entry.sourceId));
  await writeFile(registryPath, `export const externalRegistry = ${JSON.stringify([...entries, ...previews], null, 2)} as const;\n`);
  const mapPath = resolve(outputRoot, 'apps/preview/vendor-root/components/external-previews/index.tsx');
  const map = (await readFile(mapPath, 'utf8')).split('\n').filter(line => {
    const key = line.match(/^\s*"([a-z0-9-]+)\//);
    return !key || !ids.has(key[1]);
  }).join('\n');
  invariant(map.includes('export const externalPreviews'), 'Unexpected preview map');
  await writeFile(mapPath, map.replace(/\n};\s*$/, `\n${previewMappings.join('\n')}\n};\n`));
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await runLibraryImports();
