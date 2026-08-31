import { z } from "zod";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const categorySchema = z.enum(["motion", "agents", "blocks"]);
const sha256Schema = z.string().regex(/^[a-f0-9]{64}$/);
const safeRelativePathSchema = z.string().min(1).max(240).refine(
  (value) =>
    !value.startsWith("/") &&
    !value.includes("\\") &&
    !value.includes("\0") &&
    !value.split("/").includes(".."),
  "Expected a safe source-relative path",
);

export const sourceConfigSchema = z.object({
  id: slugSchema,
  name: z.string().trim().min(1).max(200),
  repository: z.string().regex(/^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/),
  commit: z.string().regex(/^[a-f0-9]{40}$/),
  registryUrl: z.url(),
  registrySha256: sha256Schema,
  expectedComponentCount: z.number().int().positive().max(10_000),
  license: z.object({
    spdx: z.literal("MIT"),
    url: z.url(),
    sha256: sha256Schema,
    copyright: z.string().trim().min(1).max(500),
  }),
});

export const registryEntrySchema = z.object({
  slug: slugSchema,
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(2_000),
  category: categorySchema,
  published_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updated_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  detail_url: z.url(),
  markdown_url: z.url(),
  page_url: z.url(),
});

export const registryIndexSchema = z.object({
  categories: z.array(z.object({
    slug: categorySchema,
    name: z.string().trim().min(1).max(200),
    description: z.string().trim().min(1).max(2_000),
  })).length(3),
  components: z.array(registryEntrySchema).min(1).max(10_000),
}).superRefine((value, context) => {
  if (new Set(value.categories.map((category) => category.slug)).size !== value.categories.length) {
    context.addIssue({ code: "custom", path: ["categories"], message: "Duplicate categories" });
  }
});

export const registryDetailSchema = registryEntrySchema.extend({
  source_url: z.url(),
  raw_url: z.url(),
  dependencies: z.array(z.string().trim().min(1).max(200)).max(200),
  internal: z.array(z.string().trim().min(1).max(300)).max(200),
  files: z.array(z.object({
    path: safeRelativePathSchema,
    type: z.enum(["component", "util", "preview"]),
    content: z.string().max(2_000_000),
  })).min(1).max(1_000),
});

const externalSourceBase = {
  id: slugSchema,
  name: z.string().trim().min(1).max(200),
  repository: z.string().regex(/^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/),
  commit: z.string().regex(/^[a-f0-9]{40}$/),
  snapshotDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  registryPath: safeRelativePathSchema,
  registrySha256: sha256Schema,
  expectedComponentCount: z.number().int().positive().max(10_000),
  category: categorySchema,
  documentationPath: safeRelativePathSchema,
  examplePath: safeRelativePathSchema,
  pageBaseUrl: z.url(),
  license: z.object({
    spdx: z.literal("MIT"),
    path: safeRelativePathSchema,
    sha256: sha256Schema,
    copyright: z.string().trim().min(1).max(500),
  }).strict(),
  transformations: z.array(z.string().trim().min(1).max(2_000)).min(1).max(20),
};

export const externalSourceConfigSchema = z.discriminatedUnion("adapter", [
  z.object({
    adapter: z.literal("shadcn-registry"),
    ...externalSourceBase,
    itemType: z.literal("registry:ui"),
    registryBaseUrl: z.url(),
    excludedRegistryItems: z.array(slugSchema).max(100),
  }).strict(),
  z.object({
    adapter: z.literal("kibo-packages"),
    ...externalSourceBase,
    packagesPath: safeRelativePathSchema,
    excludedPackages: z.array(slugSchema).max(100),
  }).strict(),
]);

export type SourceConfig = z.infer<typeof sourceConfigSchema>;
export type RegistryEntry = z.infer<typeof registryEntrySchema>;
export type RegistryIndex = z.infer<typeof registryIndexSchema>;
export type RegistryDetail = z.infer<typeof registryDetailSchema>;
export type ExternalSourceConfig = z.infer<typeof externalSourceConfigSchema>;
