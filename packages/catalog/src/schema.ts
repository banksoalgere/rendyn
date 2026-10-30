import { z } from "zod";
import type { CatalogComponent, CatalogIndex, EmbeddingIndex } from "./types.js";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const categorySlugSchema = z.enum(["motion", "agents", "blocks"]);
const relativePathSchema = z.string().min(1).max(240).refine(
  (value) =>
    !value.startsWith("/") &&
    !value.includes("\\") &&
    !value.includes("\0") &&
    !value.split("/").includes(".."),
  "Expected a safe catalogue-relative path",
);
const sha256Schema = z.string().regex(/^[a-f0-9]{64}$/);

const catalogSourceSchema = z.object({
  id: slugSchema,
  name: z.string().trim().min(1).max(200),
  repository: z.url(),
  commit: z.string().regex(/^[a-f0-9]{40}$/),
  registrySha256: sha256Schema,
  importedAt: z.iso.datetime(),
  license: z.object({
    spdx: z.literal("MIT"),
    copyright: z.string().trim().min(1).max(500),
    textPath: relativePathSchema,
  }).strict(),
}).strict();

const catalogMetadataSchema = z.object({
  kind: z.enum(["component", "agent-ui", "block"]),
  family: slugSchema,
  tags: z.array(z.string().trim().min(1).max(100)).max(100),
  aliases: z.array(z.string().trim().min(1).max(200)).max(100),
  interactions: z.array(z.string().trim().min(1).max(100)).max(100),
  useWhen: z.array(z.string().trim().min(1).max(2_000)).max(100),
  notIdealWhen: z.array(z.string().trim().min(1).max(2_000)).max(100),
  visualSignature: z.string().max(1_000),
  searchText: z.string().max(100_000),
}).strict();

const catalogComponentSummaryShape = {
  id: z.string().regex(/^[a-z0-9]+:[a-z0-9]+(?:-[a-z0-9]+)*$/),
  sourceId: slugSchema,
  slug: slugSchema,
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(2_000),
  category: categorySlugSchema,
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dependencies: z.array(z.string().trim().min(1).max(200)).max(200),
  internalDependencies: z.array(z.string().trim().min(1).max(300)).max(200),
  metadata: catalogMetadataSchema,
  previewPath: z.string().regex(/^\/preview\/(?:motion|agents|blocks)\/[a-z0-9]+(?:-[a-z0-9]+)*$/),
  manifestPath: relativePathSchema,
  integrity: z.string().regex(/^sha256:[a-f0-9]{64}$/),
};

export const catalogIndexSchema = z.object({
  schemaVersion: z.literal(2),
  generatedAt: z.iso.datetime(),
  sources: z.array(catalogSourceSchema).min(1).max(100),
  categories: z.array(z.object({
    slug: categorySlugSchema,
    name: z.string().trim().min(1).max(200),
    description: z.string().trim().min(1).max(2_000),
    count: z.number().int().nonnegative(),
  }).strict()).length(3),
  components: z.array(z.object(catalogComponentSummaryShape).strict()).max(10_000),
}).strict();

export const catalogComponentSchema = z.object({
  ...catalogComponentSummaryShape,
  source: catalogSourceSchema,
  files: z.array(z.object({
    path: relativePathSchema,
    type: z.string().trim().min(1).max(100),
    content: z.string().max(2_000_000),
    sha256: sha256Schema,
    upstreamPath: relativePathSchema.optional(),
    upstreamSha256: sha256Schema.optional(),
    transformation: z.string().trim().min(1).max(2_000).optional(),
  }).strict()).min(1).max(1_000),
  install: z.object({
    packageManager: z.literal("pnpm"),
    dependencyCommand: z.string().max(10_000).nullable(),
    registryDependencyCommand: z.string().max(10_000).nullable(),
    stylePaths: z.array(relativePathSchema).max(100),
    instructions: z.array(z.string().trim().min(1).max(10_000)).max(100),
  }).strict(),
  provenance: z.object({
    upstreamSlug: slugSchema,
    upstreamPageUrl: z.url(),
    upstreamDetailUrl: z.url(),
    upstreamMarkdownUrl: z.url(),
    transformations: z.array(z.string().trim().min(1).max(2_000)).max(100),
  }).strict(),
  documentation: z.string().max(1_000_000),
}).strict();

export const embeddingIndexSchema = z.object({
  schemaVersion: z.literal(1),
  model: z.string().regex(/^[a-zA-Z0-9._-]+$/),
  dimensions: z.number().int().positive().max(100_000),
  generatedAt: z.iso.datetime(),
  catalogIntegrity: sha256Schema,
  vectors: z.record(slugSchema, z.array(z.number().finite()).max(100_000)),
}).strict().superRefine((value, context) => {
  for (const [slug, vector] of Object.entries(value.vectors)) {
    if (vector.length !== value.dimensions) {
      context.addIssue({
        code: "custom",
        path: ["vectors", slug],
        message: `Expected ${value.dimensions} embedding dimensions`,
      });
    }
  }
});

export function parseCatalogIndex(value: unknown): CatalogIndex {
  return catalogIndexSchema.parse(value) as CatalogIndex;
}

export function parseCatalogComponent(value: unknown): CatalogComponent {
  return catalogComponentSchema.parse(value) as CatalogComponent;
}

export function parseEmbeddingIndex(value: unknown): EmbeddingIndex {
  return embeddingIndexSchema.parse(value) as EmbeddingIndex;
}
