import { z } from 'zod';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const path = z.string().min(1).max(240).refine(value =>
  !value.startsWith('/') && !value.includes('\\') && !value.includes('\0') &&
  value.split('/').every(part => part !== '..' && part !== '.' && part !== ''), 'Unsafe source path');
const dependency = z.string().regex(/^(?:@[a-z0-9-]+\/)?[a-z0-9][a-z0-9._-]*@(?:npm:(?:@[a-z0-9-]+\/)?[a-z0-9][a-z0-9._-]*@)?\d+\.\d+\.\d+(?:-(?:alpha|beta|rc|canary)\.\d+)?$/);

export const libraryConfigSchema = z.object({
  id: slug, name: z.string().min(1).max(100),
  repository: z.string().regex(/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/),
  commit: z.string().regex(/^[a-f0-9]{40}$/),
  snapshotDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  allowedRoots: z.array(path).min(1),
  license: z.object({ path, sha256: hash, copyright: z.string().min(1) }).strict(),
  dependencies: z.array(dependency).max(200),
  provider: z.enum(['none', 'mantine', 'chakra', 'heroui']),
  setup: z.array(z.string().min(1).max(2000)).min(1).max(20),
  components: z.array(z.object({
    slug, name: z.string().min(1).max(100), description: z.string().min(1).max(2000),
    pageUrl: z.url().refine(value => new URL(value).protocol === 'https:', 'Upstream pages must use HTTPS'), exportName: z.string().regex(/^(?:default|[A-Za-z][A-Za-z0-9]*)$/),
    dependencies: z.array(dependency).max(200).optional(),
    examples: z.array(z.object({
      slug, name: z.string().min(1).max(100), path,
      exportName: z.string().regex(/^(?:default|[A-Za-z][A-Za-z0-9]*)$/),
      style: z.enum(['luma','lyra','maia','mira','nova','rhea','sera','vega']).optional(),
    }).strict()).max(500).optional(),
    files: z.array(z.object({
      upstreamPath: path, path, sha256: hash,
      transform: z.enum(['copy', 'mantine-example', 'mantine-template', 'mantine-runtime', 'shadcn-theme', 'shadcn-style']).default('copy'),
      templateName: z.string().regex(/^[A-Za-z][A-Za-z0-9]*$/).optional(),
      type: z.enum(['component', 'style', 'data']).optional(),
      replacements: z.array(z.tuple([z.string().min(1).max(2000), z.string().max(20000)])).max(200).default([]),
    }).strict()).min(1).max(1000),
  }).strict()).min(1).max(2000),
}).strict().superRefine((config, ctx) => {
  for (const component of config.components) for (const file of component.files) {
    if (!config.allowedRoots.some(root => file.upstreamPath.startsWith(`${root}/`))) {
      ctx.addIssue({ code: 'custom', message: 'Source outside MIT-reviewed roots', path: ['components'] });
    }
  }
  if (config.id === 'originui' && config.allowedRoots.some(root => root !== 'apps/origin')) {
    ctx.addIssue({ code: 'custom', message: 'Origin UI imports must stay in apps/origin', path: ['allowedRoots'] });
  }
  if (new Set(config.components.map(c => c.slug)).size !== config.components.length) {
    ctx.addIssue({ code: 'custom', message: 'Duplicate component slugs', path: ['components'] });
  }
  for (const component of config.components) {
    if (component.examples && new Set(component.examples.map(example => example.slug)).size !== component.examples.length) {
      ctx.addIssue({ code: 'custom', message: 'Duplicate example slugs', path: ['components'] });
    }
    for (const example of component.examples ?? []) if (!component.files.some(file => file.path === example.path)) {
      ctx.addIssue({ code: 'custom', message: 'Example source is missing from its complete bundle', path: ['components'] });
    }
  }
});

export const librariesSchema = z.array(libraryConfigSchema).length(7).superRefine((configs, ctx) => {
  if (configs.map(c => c.id).sort().join(',') !== 'antd,chakra,heroui,mantine,mui,originui,shadcn') {
    ctx.addIssue({ code: 'custom', message: 'Expected the seven reviewed MIT libraries' });
  }
});
export type LibraryConfig = z.infer<typeof libraryConfigSchema>;
