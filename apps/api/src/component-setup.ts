import type { CatalogComponent } from '@rendyn/catalog';

const PACKAGE = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/i;
const IMPORT = /(?:\b(?:import|export)\s+(?:[\w$*,{}\s]+\s+from\s*)?|\bimport\s*\()\s*["']([^"'\n]+)["']/g;

/** Describe the actual returned files, including upstream dependencies missing from registry metadata. */
export function componentSetup(component: CatalogComponent) {
  const imports = new Set(component.files.flatMap(file => [...file.content.matchAll(IMPORT)].map(match => match[1])));
  const paths = new Set(component.files.map(file => file.path.replace(/\.(?:tsx?|jsx?)$/, '')));
  const packages = new Set(component.dependencies);
  for (const specifier of imports) {
    if (specifier.startsWith('.') || specifier.startsWith('@/') || specifier.startsWith('node:')) continue;
    const name = specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];
    if (PACKAGE.test(name)) packages.add(name);
  }
  const dependencies = [...packages].filter(name => PACKAGE.test(name)).sort();
  const projectImports = [...imports].filter(specifier => specifier.startsWith('@/')
    && !paths.has(specifier.slice(2)) && !paths.has(`${specifier.slice(2)}/index`)).sort();
  const entrypoints = component.files.filter(file => file.path.startsWith('components/') && !file.path.includes('/previews/')).map(file => ({
    path: file.path,
    import_from: `@/${file.path.replace(/\.(tsx?|jsx?)$/, '')}`,
  }));
  return {
    dependencies,
    install: {
      ...component.install,
      dependencyCommand: dependencies.length ? `pnpm add ${dependencies.join(' ')}` : null,
      instructions: [
        'Use an existing React project with Tailwind CSS and an @/ alias pointing to its source root.',
        ...(dependencies.length ? [`Install any missing packages from: pnpm add ${dependencies.join(' ')}`] : []),
        ...component.install.instructions.filter(instruction => !instruction.startsWith('Install external packages:')),
        ...(projectImports.length ? [`Provide these project imports before rendering: ${projectImports.join(', ')}.`] : []),
        ...(projectImports.includes('@/lib/utils') ? ['@/lib/utils must export cn (the standard shadcn clsx/tailwind-merge helper). Reuse it if your project already has it.'] : []),
      ],
    },
    entrypoints,
    required_project_imports: projectImports,
  };
}
