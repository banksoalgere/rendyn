/** Discover every public example at immutable MIT-reviewed source revisions.
 * CATALOG_LIBRARY_CACHE is an input cache, never a trust boundary: every file is
 * hashed here and re-verified by the staged importer before publication.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, posix, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { imports, literalValues, previewExport, mantineRuntime, sourceFile, templateImports } from './lib/catalog-import/source-ast.js';
import { fetchText, MAX_MARKDOWN_BYTES, sha256, invariant, safeOutputPath } from './lib/catalog-import/security.js';
import { librariesSchema } from './lib/catalog-import/library-config.js';
import type { LibraryConfig } from './lib/catalog-import/library-config.js';

const root = resolve(import.meta.dirname, '..');
const cacheRoot = resolve(process.env.CATALOG_LIBRARY_CACHE ?? '/private/tmp/rendyn-complete-libraries');
const require = createRequire(resolve(root, 'apps/preview/package.json'));
const slugify = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const title = (name: string) => name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_.]/g, ' ');

// Only preserve old public routes/file paths; this seed never limits discovery.
const legacy: LibraryConfig[] = JSON.parse(await readFile(resolve(root,'sources/discovery/legacy-compatibility.json'),'utf8'));
const definitions = librariesSchema.parse(JSON.parse(await readFile(resolve(root,'sources/libraries.json'),'utf8')).map((config: LibraryConfig)=>({...config,components:legacy.find(source=>source.id===config.id)!.components})));  
const report: Record<string, unknown> = {};
const inventories: Record<string,unknown> = {};
const allPackages = new Set<string>();
const output: LibraryConfig[] = [];
const pins: Record<string,string> = JSON.parse(await readFile(resolve(root,'sources/discovery/package-pins.json'),'utf8').catch(()=> '{}')); 
for (const original of definitions) {
  original.components = legacy.find(config=>config.id===original.id)!.components;
  const id = original.id;
  const paths: string[] = JSON.parse(await readFile(resolve(cacheRoot, `${id}-paths.json`), 'utf8'));
  const inventory = JSON.parse(await readFile(resolve(cacheRoot,`${id}-tree.json`),'utf8'));
  invariant(inventory.truncated===false,'Truncated upstream tree');
  const blobs = new Map<string,string>(inventory.tree.filter((entry:{type:string})=>entry.type==='blob').map((entry:{path:string;sha:string})=>[entry.path,entry.sha]));
  const tree = new Set(paths);
  const textCache = new Map<string, string>();
  const read = async (path: string) => {
    let text = textCache.get(path);
    if (text === undefined) { const cachedPath=safeOutputPath(resolve(cacheRoot,'raw',id),path);
      text = await readFile(cachedPath,'utf8').catch(async error=>{
        if(error.code!=='ENOENT' || process.env.CATALOG_LIBRARY_FETCH!=='1')throw error;
        invariant(blobs.has(path),'Unlisted upstream blob');
        const url=new URL(`https://raw.githubusercontent.com/${new URL(original.repository).pathname.slice(1)}/${original.commit}/${path}`);
        const value=await fetchText(url,MAX_MARKDOWN_BYTES);
        await mkdir(dirname(cachedPath),{recursive:true});await writeFile(cachedPath,value);return value;
      }); const bytes=Buffer.from(text);
      invariant(blobs.get(path)===createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),`Pinned Git blob mismatch: ${id}/${path}`);
      textCache.set(path, text); }
    return text;
  };
  const roots = ({shadcn:['apps/v4'],originui:['apps/origin'],mui:['docs','packages/mui-docs','packages-internal/core-docs'],mantine:['packages/@docs/demos','packages/@docs/shared','packages/@docs/styles-api'],antd:['components','docs','.dumi'],chakra:['apps/compositions/src'],heroui:['apps/docs/content/components','apps/docs/components','apps/docs/utils','apps/docs/hooks','apps/docs/config','apps/docs/lib']} as Record<string, string[]>)[id];
  const candidates = paths.filter(path => {
    if(id==='shadcn' && /^apps\/v4\/registry\/bases\/(radix|base|aria)\//.test(path)) return path.endsWith('.tsx') && (path.includes('/examples/') || path.includes('/blocks/') && !path.includes('/components/')); 
    if (id === 'shadcn') return /^apps\/v4\/registry\/new-york-v4\/(examples|charts)\/[^/]+\.tsx$/.test(path) || /^apps\/v4\/registry\/new-york-v4\/blocks\/[^/]+\.tsx$/.test(path) || /^apps\/v4\/registry\/new-york-v4\/blocks\/[^/]+\/page\.tsx$/.test(path);
    if (id === 'originui') return /^apps\/origin\/registry\/default\/components\/[^/]+\.tsx$/.test(path);
    if (id === 'mui') return /^docs\/data\/(material|system)\/.*\.(tsx|js)$/.test(path) && (!path.endsWith('.js') || !tree.has(path.replace(/\.js$/, '.tsx')));
    if (id === 'mantine') return /^packages\/@docs\/demos\/src\/demos\/.*\.demo\.[^/]+\.tsx$/.test(path);
    if (id === 'antd') return /^components\/[^/]+\/demo\/[^/]+\.(tsx|jsx)$/.test(path) && !posix.basename(path).startsWith('_');
    if (id === 'chakra') return /^apps\/compositions\/src\/examples\/.*\.tsx$/.test(path);
    return /^apps\/docs\/content\/components\/[^/]+\/[^/]+\.raw\.(jsx|tsx)$/.test(path) && (!path.endsWith('.raw.jsx') || !tree.has(path.replace(/\.jsx$/, '.tsx')));
  });
  const originItems = id==='originui' ? JSON.parse(await read('apps/origin/registry.json')).items as {name:string;meta?:{tags?:string[]}}[] : [];
  if(id==='mantine') for(const path of paths.filter(p=>p.startsWith('packages/@docs/demos/src/demos/dates/') && p.endsWith('/index.ts') && !p.includes('/_shared/'))) { if(/getSharedPicker(?:Input)?Demos/.test(await read(path))) candidates.push(path); }
  if(id==='mantine') candidates.push(...paths.filter(p=>p.startsWith('packages/@docs/demos/src/demos/hooks/') && p.endsWith('.demo.tsx')));
  const oldPath = new Map(original.components.flatMap(component => component.files.map(file => [file.upstreamPath, file.path] as const)));
  const oldPrimary = new Map(original.components.map(component => [component.files[0].upstreamPath, component]));
  const localPath = (upstream: string) => id==='shadcn' && upstream==='apps/v4/app/globals.css' ? 'components/rendyn-libraries/shadcn/upstream/registry/styles/rendyn-theme.css' : oldPath.get(upstream) ?? `components/rendyn-libraries/${id}/upstream/${upstream.replace(roots.find(r => upstream.startsWith(r + '/'))! + '/', '').replace(id==='mantine' && candidates.includes(upstream) && upstream.endsWith('/index.ts') ? /\.ts$/ : /$^/, '.tsx')}`;
  const groups = new Map<string, {path: string; exportName: string; variant: string}[]>();
  const issues: {path: string; error: string}[] = [];
  const classifications: {path: string; family?: string; variant?: string; status: string; reason?: string}[] = [];
  const chakraFamilies = paths.filter(p => /^apps\/www\/content\/docs\/components\/[^/]+\.mdx$/.test(p)).map(p=>posix.basename(p,'.mdx')).sort((a,b)=>b.length-a.length);
  const shadcnFamilies = paths.filter(p=>/^apps\/v4\/registry\/new-york-v4\/ui\/[^/]+\.tsx$/.test(p)).map(p=>posix.basename(p,'.tsx')).sort((a,b)=>b.length-a.length);
  for (const path of candidates.sort()) {
    try {
      const raw = await read(path);
      const runtime = id === 'mantine' ? mantineRuntime(raw) : raw;
      const exported = previewExport(runtime);
      if(id==='mui' && path.includes('/templates/') && (path.includes('/components/') || path.includes('/shared-theme/'))) {classifications.push({path,status:'support-module',reason:'Template helper; shipped with the complete template rather than rendered without its required props.'});continue;}
      if (!exported) { classifications.push({path,status:'support-module',reason:'No exported renderable component; retained when referenced by a public example.'}); continue; }
      const base = posix.basename(path).replace(/\.raw\.(jsx|tsx)$|\.(tsx?|jsx|js)$/g,'');
      let family = base;
      let variant = base;
      if (id === 'shadcn') {
        if (path.includes('/examples/')) family = shadcnFamilies.find(name=>base === name || base.startsWith(name+'-')) ?? base.replace(/-demo$/,'');
        else if(path.includes('/charts/')) family = 'chart';
        else family = 'block-' + (['page','index'].includes(base) ? posix.basename(posix.dirname(path)) : base);
      } else if (id === 'mui') family = path.split('/')[4];
      else if (id === 'mantine') { const match = base.split('.demo.'); family = base==='index' ? slugify(posix.basename(posix.dirname(path))) : slugify(match[0].replace(/\.demo$/,'')); variant = slugify(match[1] ?? 'usage'); }
      else if (id === 'antd') family = path.split('/')[1];
      else if (id === 'chakra') family = chakraFamilies.find(name=>base===name || base.startsWith(name+'-')) ?? base.split('-')[0];
      else if (id === 'heroui') family = path.split('/')[4];
      const old = oldPrimary.get(path);
      if (old) { family = old.slug; variant = 'default'; }
      if(id==='shadcn' && path.includes('/bases/')) {const baseId=path.split('/')[4]; const section=path.split('/')[5]; family=baseId+'-'+(section==='examples' ? family : section+'-'+family); variant=base;}
      if(id==='mui' && path.startsWith('docs/data/system/') && path.includes('/components/')) family='system-'+family;
      if(id==='mui' && !path.includes('/components/')) family=''+path.split('/')[2]+'-'+path.split('/').slice(3,-1).join('-');
      family = slugify(family); variant = slugify(variant);
      const group = groups.get(family) ?? [];
      const exportNames = id === 'mantine' ? [...runtime.matchAll(/export function (RendynExample\d*)\(/g)].map(m=>m[1]) : [exported];
      const factoryVariants=[...runtime.matchAll(/Rendyn variant: (\w+)/g)].map(m=>slugify(m[1]));
      for (const [index,exportName] of exportNames.entries()) group.push({path,exportName,variant:factoryVariants[index] ?? (index ? variant+'-'+(index+1) : variant)}); groups.set(family,group);
      classifications.push({path,family,variant,status:'discovered'});
    } catch(error) { issues.push({path,error:String(error)}); classifications.push({path,status:'pending',reason:String(error)}); }
  }
  if(['shadcn','originui'].includes(id)) {
    const first = [...groups.values()][0][0];
    groups.set('complete-primitives',[{...first,variant:'overview'}]);
  }
  const resolveImport = (from: string, specifier: string) => {
    let base: string | undefined;
    if (specifier.startsWith('.')) base = posix.normalize(posix.join(posix.dirname(from), specifier));
    else if (id === 'shadcn' && specifier.startsWith('@/')) base = 'apps/v4/' + specifier.slice(2);
    else if (id === 'originui' && specifier.startsWith('@/')) base = 'apps/origin/' + specifier.slice(2);
    else if (id === 'chakra' && specifier.startsWith('compositions/')) base = 'apps/compositions/src/' + specifier.slice(13);
    else if (id === 'chakra' && specifier.startsWith('@/')) base = 'apps/compositions/src/' + specifier.slice(2).replace(/^components\//,'');
    else if (id === 'heroui' && specifier.startsWith('@/')) base = 'apps/docs/' + specifier.slice(2);
    else if (id === 'mui' && specifier.startsWith('docs/')) base = specifier;
    else if (id === 'mui' && specifier.startsWith('@mui/internal-core-docs')) base = 'packages-internal/core-docs/src/' + specifier.slice('@mui/internal-core-docs/'.length);
    else if (id === 'mantine' && specifier.startsWith('@docs/shared')) base = ('packages/@docs/shared/src/' + specifier.slice('@docs/shared'.length).replace(/^\//,'')).replace(/\/$/,'');
    else if (id === 'mantine' && specifier.startsWith('@docs/styles-api')) base = ('packages/@docs/styles-api/src/' + specifier.slice('@docs/styles-api'.length).replace(/^\//,'')).replace(/\/$/,'');
    if (!base) return undefined;
    if(id==='shadcn') base=base.replace('apps/v4/app/(create)/','apps/v4/app/(app)/(create)/').replace('apps/v4/app/(app)/create/','apps/v4/app/(app)/(create)/');
    if (!roots.some(r=>base!.startsWith(r+'/'))) throw new Error(`Import outside reviewed MIT roots: ${specifier} (${base})`);
    const found = [base, ...['.tsx','.ts','.jsx','.js','.json','.css','/index.tsx','/index.ts','/index.jsx','/index.js'].map(suffix=>base+suffix)].find(p=>tree.has(p));
    if (!found) throw new Error(`Unresolved upstream module: ${specifier} (${base})`);
    return found;
  };
  const components: LibraryConfig['components'] = [];
  for (const [family, demos] of groups) {
    demos.sort((a,b)=>(a.variant==='default' ? -1 : b.variant==='default' ? 1 : a.variant.localeCompare(b.variant))); 
    const files = new Map<string, LibraryConfig['components'][number]['files'][number]>();
    const packages = new Set<string>(id==='mantine' ? ['@mantine/core'] : id==='chakra' ? ['@chakra-ui/react'] : id==='heroui' ? ['@heroui/react','@heroui/theme'] : []);
    const visit = async (path: string): Promise<void> => {
      if (files.has(path)) return;
      const raw = await read(path);
      const replacements: [string,string][] = [];
      const transform = id==='shadcn' && path==='apps/v4/app/globals.css' ? 'shadcn-theme' : id==='shadcn' && /^apps\/v4\/registry\/styles\/style-.*\.css$/.test(path) ? 'shadcn-style' : id === 'mantine' && candidates.includes(path) ? 'mantine-runtime' : 'copy';
      if(id==='heroui' && path==='apps/docs/content/components/popover/custom-trigger.raw.jsx') replacements.push(['  PopoverContent,\n  Button,','  PopoverContent,']);
      let content = transform === 'mantine-runtime' ? mantineRuntime(raw) : raw;
      if (id==='heroui' && content.includes('@heroui-org/react')) { replacements.push(['@heroui-org/react','@heroui/react']); content=content.replaceAll('@heroui-org/react','@heroui/react'); }
      if(path.endsWith('.css') || path.endsWith('.json')) {files.set(path,{upstreamPath:path,path:localPath(path),sha256:sha256(raw),transform,type:path.endsWith('.css')?'style':'data',replacements});return;}
      const closedAliases=new Set<string>();
      for(const template of templateImports(content)) {
        const directory=posix.dirname(path);
        const prefix=posix.normalize(posix.join(directory,template.prefix));
        const matches=paths.filter(candidate=>candidate.startsWith(prefix) && candidate.replace(/\.(tsx?|jsx?)$/,'').endsWith(template.suffix) && /\.(tsx?|jsx?)$/.test(candidate));
        invariant(matches.length>0 && matches.length<=200,'Unbounded dynamic module inventory');
        const choices=matches.map(target=>{const name=target.replace(/\.(tsx?|jsx?)$/,'').slice(prefix.length,-template.suffix.length || undefined);const alias='@/'+localPath(target).replace(/\.(tsx?|jsx?)$/,'');closedAliases.add(alias);return JSON.stringify(name)+':()=>import('+JSON.stringify(alias)+')';});
        const rewritten='({'+choices.join(',')+'})['+template.variable+']()';
        replacements.push([template.expression,rewritten]);content=content.replaceAll(template.expression,rewritten);
        for(const target of matches) await visit(target);
      }
      const file: LibraryConfig['components'][number]['files'][number] = { upstreamPath:path, path:localPath(path),sha256:sha256(raw), transform, type: path.endsWith('.css') ? 'style' : path.endsWith('.json') ? 'data':'component', replacements };
      files.set(path,file);
      for (const statement of sourceFile(content).statements) {
        const text = statement.getText();
        if (id==='mantine' && /^import .*from ['"]@mantinex\/demo['"]/.test(text)) replacements.push([text,text.replace(/^import /,'import type ')]);
      }
      for (const {specifier, typeOnly} of imports(content)) {
        if(closedAliases.has(specifier))continue;
        if (id==='mantine' && specifier==='@mantinex/demo') { packages.add('@mantinex/demo'); continue; }
        if(id==='shadcn' && specifier==='react-resizable-panels') {replacements.push([specifier,'rendyn-resizable-v4']);packages.add('rendyn-resizable-v4');continue;}
        const target = resolveImport(path,specifier);
        if (target) {
          replacements.push([specifier,'@/'+localPath(target).replace(/\.(tsx?|jsx?)$/,'')]);
          await visit(target);
        } else {
          invariant(!specifier.startsWith('.') && !specifier.startsWith('@/') && !specifier.includes(':'), `Unsupported module ${specifier}`);
          const name = specifier.startsWith('@') ? specifier.split('/').slice(0,2).join('/') : specifier.split('/')[0];
          if (!['react','react-dom'].includes(name)) packages.add(name);
        }
      }
    };
    try {
      for (const demo of demos) await visit(demo.path);
      if(id==='shadcn' && (family==='complete-primitives' || demos.some(d=>d.path.includes('/bases/')))) {await visit('apps/v4/app/globals.css');for(const style of ['luma','lyra','maia','mira','nova','rhea','sera','vega']) await visit('apps/v4/registry/styles/style-'+style+'.css');packages.add('shadcn');packages.add('tw-animate-css');packages.add('nuqs');}
      if(family==='complete-primitives') for(const path of paths.filter(p=>(id==='shadcn' ? /^apps\/v4\/registry\/(new-york-v4|bases\/(radix|base|aria))\/ui\//.test(p) : p.startsWith('apps/origin/registry/default/ui/')) && /\.(tsx?|jsx?)$/.test(p) && !posix.basename(p).startsWith('_'))) await visit(path);
      if(id==='chakra') for(const path of candidates.filter(p=>posix.basename(p,'.tsx')===family+'-closed-component')) await visit(path);
      for(const file of files.values()) file.replacements=[...new Map(file.replacements.map(pair=>[pair[0],pair])).values()].sort((a,b)=>b[0].length-a[0].length);
      if ([...packages].some(name=>/@mui\/x-.*-(pro|premium)$/.test(name))) throw new Error('Commercial MUI X Pro/Premium dependency; not covered by MIT');
      if(packages.has('@mantine/charts') || packages.has('@chakra-ui/charts')) packages.add('recharts');
      if(packages.has('@mantine/carousel')) packages.add('embla-carousel');
      if(packages.has('@mantine/core')) {packages.add('@mantine/hooks');}
      if(packages.has('@mui/material')) {packages.add('@emotion/react');packages.add('@emotion/styled');}
      const deps = [...packages].sort().map(name=>{
        allPackages.add(name==='rendyn-resizable-v4' ? 'react-resizable-panels' : name);
        try { if(name==='rendyn-resizable-v4')return name+'@npm:react-resizable-panels@'+pins[name]; if(pins[name])return name+'@'+pins[name]; const pkg = require(require.resolve(name+'/package.json')); return name+'@'+pkg.version; }
        catch { return name+'@0.0.0'; }
      });
      const old = original.components.find(c=>c.slug===family);
      const tags = originItems.find(item=>item.name===family)?.meta?.tags??[];
      const familyTitle = tags.length ? title(tags.slice(0,3).join(' '))+' '+family : title(family);
      components.push({ slug:family, name:old?.name ?? `${original.name} ${familyTitle}`.slice(0,100),
        description:`${demos.reduce((n,d)=>n+(id==='shadcn' && d.path.includes('/bases/') ? 8 : 1),0)} published ${original.name} ${familyTitle} examples with complete pinned source and MIT attribution.`,
        pageUrl:old?.pageUrl ?? `${original.repository}/tree/${original.commit}/${posix.dirname(demos[0].path)}`,
        exportName:demos[0].exportName, dependencies:deps,
        examples:demos.flatMap(d=>d.path.includes('/bases/') && id==='shadcn' ? ['nova','luma','lyra','maia','mira','rhea','sera','vega'].map(style=>({slug:d.variant+'-'+style,name:(title(d.variant)+' · '+title(style)).slice(0,100),path:localPath(d.path),exportName:d.exportName,style:style as 'nova'})) : [{slug:d.variant,name:title(d.variant).slice(0,100),path:localPath(d.path),exportName:d.exportName}]),files:[...files.values()] });
      for (const classification of classifications.filter(c=>c.family===family)) classification.status='bundled';
      for (const classification of classifications.filter(c=>c.status==='support-module' && files.has(c.path))) classification.status='bundled-support-module';
    } catch(error) { if(String(error).includes('Commercial MUI X Pro/Premium')) {for(const classification of classifications.filter(c=>c.family===family)) {classification.status='excluded-non-mit';classification.reason=String(error);} continue;} issues.push({path:family,error:String(error)}); for(const classification of classifications.filter(c=>c.family===family)) {classification.status='pending';classification.reason=String(error);} }
  }
  inventories[id]={commit:original.commit,tree:inventory.sha,candidates:candidates.map(path=>({path,blob:blobs.get(path)}))};
  report[id] = {commit:original.commit,inventory:sha256(JSON.stringify(paths)),candidateCount:candidates.length,familyCount:components.length,exampleCount:components.reduce((n,c)=>n+(c.examples?.length??0),0),classifications,issues};
  output.push({...original,allowedRoots:roots,dependencies:[...new Set(components.flatMap(c=>c.dependencies??[]))].sort(),components});
  console.log(id, candidates.length, components.length, 'families', components.reduce((n,c)=>n+(c.examples?.length??0),0),'examples',issues.length,'pending');
}
await mkdir(resolve(root,'sources/discovery'),{recursive:true});
await writeFile(resolve(root,'sources/discovery/libraries.draft.json'),JSON.stringify(output,null,2)+'\n');
await writeFile(resolve(root,'sources/discovery/upstream-inventories.json'),JSON.stringify(inventories,null,2)+'\n');
await writeFile(resolve(root,'sources/discovery/coverage.json'),JSON.stringify(report,null,2)+'\n');
await writeFile(resolve(root,'sources/discovery/packages.json'),JSON.stringify([...allPackages].sort(),null,2)+'\n');
