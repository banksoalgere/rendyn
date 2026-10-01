import { describe, expect, it } from 'vitest';
import { librariesSchema, libraryConfigSchema } from './library-config';
import { transformLibraryFile, validateLibraryImports } from './library-files';
import { sha256 } from './security';
import libraries from '../../../sources/libraries.json';
import coverage from '../../../sources/discovery/coverage.json';
import inventories from '../../../sources/discovery/upstream-inventories.json';

describe('reviewed library import boundaries', () => {
  it('accounts for every pinned public upstream example and its complete source bundle', () => {
    const configs = librariesSchema.parse(libraries);
    for(const config of configs) {
      const report = coverage[config.id as keyof typeof coverage];
      const inventory = inventories[config.id as keyof typeof inventories];
      expect(report.commit).toBe(config.commit);
      expect(report.issues).toEqual([]);
      expect(report.classifications.map(c=>c.path).sort()).toEqual(inventory.candidates.map(c=>c.path).sort());
      expect(config.components.length).toBe(report.familyCount);
      expect(config.components.reduce((n,c)=>n+(c.examples?.length??0),0)).toBe(report.exampleCount);
      for(const entry of report.classifications) {
        expect(entry.status).not.toBe('pending');
        if(entry.status==='bundled') {
          const component=config.components.find(c=>c.slug===entry.family)!;
          expect(component.files.some(file=>file.upstreamPath===entry.path)).toBe(true);
        }
      }
      expect(config.components.flatMap(c=>c.dependencies??[]).some(dependency=>dependency.endsWith('@0.0.0'))).toBe(false);
    }
    const origin = configs.find(c => c.id === 'originui')!;
    expect(origin.allowedRoots).toEqual(['apps/origin']);
    expect(origin.license.path).toBe('apps/origin/LICENSE.md');
  });

  it('rejects an Origin file from an AGPL directory even when its hash is pinned', () => {
    const origin = structuredClone(libraries.find(c => c.id === 'originui')!);
    origin.components[0].files[0].upstreamPath = 'packages/ui/src/index.ts';
    expect(() => libraryConfigSchema.parse(origin)).toThrow('Source outside MIT-reviewed roots');
    origin.allowedRoots = ['packages/ui'];
    expect(() => libraryConfigSchema.parse(origin)).toThrow('Origin UI imports must stay in apps/origin');
  });

  it('rejects changed source bytes and missing transformations', () => {
    const raw = 'import { Input } from "@/upstream/input";';
    const file = { path: 'components/example.tsx', upstreamPath: 'apps/example.tsx', sha256: sha256(raw), transform: 'copy' as const,
      replacements: [['@/upstream/', '@/components/']] as [string, string][] };
    expect(() => transformLibraryFile(raw + ' ', file)).toThrow('integrity mismatch');
    expect(transformLibraryFile(raw, file)).toContain('@/components/input');
    expect(() => transformLibraryFile(raw, { ...file, replacements: [['missing', 'replacement']] })).toThrow('Missing import transformation');
  });

  it('requires every copied alias and external package to be supplied', () => {
    expect(() => validateLibraryImports([{ path: 'components/demo.tsx', content: 'import { Input } from "@/components/input";' }], [])).toThrow('Unresolved copied import');
    expect(() => validateLibraryImports([{ path: 'components/demo.tsx', content: 'import { Input } from "unexpected-package";' }], [])).toThrow('Undeclared package');
    expect(() => validateLibraryImports([{ path: 'components/demo.tsx', content: 'import { Input } from "@mui/material";' }], ['@mui/material@9.4.0'])).not.toThrow();
  });

  it('preserves server actions and keeps incompatible dependency versions isolated', () => {
    const raw = '"use server"; export async function action() { return {success:true}; }';
    expect(transformLibraryFile(raw,{path:'actions.ts',upstreamPath:'src/actions.ts',sha256:sha256(raw),transform:'copy',replacements:[]})).toBe(raw);
    expect(() => validateLibraryImports([{path:'demo.tsx',content:'import {Group} from "rendyn-resizable-v4";'}],['rendyn-resizable-v4@npm:react-resizable-panels@4.11.0'])).not.toThrow();
  });
});
