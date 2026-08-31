import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, extname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { parseCatalogIndex } from "../packages/catalog/src/schema.js";
import type {
  CatalogCategorySlug,
  CatalogComponent,
  CatalogComponentSummary,
  CatalogFile,
  CatalogIndex,
  CatalogSource,
} from "../packages/catalog/src/types.js";
import { z } from "zod";
import { createComponentManifest } from "./lib/catalog-import/component-manifest.js";
import { writeComponentSource } from "./lib/catalog-import/component-source.js";
import { assertStandardMitLicense } from "./lib/catalog-import/license.js";
import { buildMetadata, unique } from "./lib/catalog-import/metadata.js";
import { extractPinnedRepository, readPinnedFile } from "./lib/catalog-import/repository.js";
import {
  externalSourceConfigSchema,
  type ExternalSourceConfig,
  type RegistryDetail,
} from "./lib/catalog-import/schemas.js";
import { invariant, parseJson, safeOutputPath, sha256 } from "./lib/catalog-import/security.js";

const REPOSITORY_ROOT = resolve(import.meta.dirname, "..");
const CATALOG_ROOT = resolve(REPOSITORY_ROOT, "catalog");
const PREVIEW_VENDOR_ROOT = resolve(REPOSITORY_ROOT, "apps/preview/vendor-root");
const PREVIEW_GENERATED_ROOT = resolve(REPOSITORY_ROOT, "apps/preview/generated");
const SOURCE_CONFIG_PATHS = [
  resolve(REPOSITORY_ROOT, "sources/magicui.json"),
  resolve(REPOSITORY_ROOT, "sources/kibo.json"),
];

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const relativePathSchema = z.string().min(1).max(240).refine(
  (value) =>
    !value.startsWith("/") &&
    !value.includes("\\") &&
    !value.includes("\0") &&
    !value.split("/").includes(".."),
  "Expected a safe source-relative path",
);

const magicFileSchema = z.object({
  path: relativePathSchema,
  type: z.string().trim().min(1).max(100),
  target: relativePathSchema.optional(),
}).strict();

const magicItemSchema = z.object({
  name: slugSchema,
  type: z.enum(["registry:ui", "registry:example", "registry:style", "registry:lib"]),
  title: z.string().trim().max(200).optional(),
  description: z.string().trim().max(2_000).optional(),
  dependencies: z.array(z.string().trim().min(1).max(200)).max(200).optional(),
  registryDependencies: z.array(z.string().trim().min(1).max(500)).max(200).optional(),
  files: z.array(magicFileSchema).max(1_000).default([]),
  css: z.record(z.string(), z.unknown()).optional(),
  cssVars: z.record(z.string(), z.unknown()).optional(),
}).strict();

const magicRegistrySchema = z.object({
  name: z.string().trim().min(1).max(200),
  homepage: z.url(),
  items: z.array(magicItemSchema).min(1).max(10_000),
}).strict();

const packageSchema = z.object({
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(2_000),
  dependencies: z.record(z.string(), z.string()).optional(),
}).passthrough();

interface PreviewEntry {
  sourceId: string;
  slug: string;
  name: string;
  description: string;
  category: CatalogCategorySlug;
  previewKey: string;
  modulePath: string | null;
}

interface ImportedSource {
  source: CatalogSource;
  summaries: CatalogComponentSummary[];
  previews: PreviewEntry[];
  styles: string[];
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ");
}

async function readConfig(path: string): Promise<ExternalSourceConfig> {
  const raw = await readFile(path, "utf8");
  return externalSourceConfigSchema.parse(parseJson(raw, path));
}

async function readOptionalFile(path: string): Promise<string | null> {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function createSource(config: ExternalSourceConfig, importedAt: string): CatalogSource {
  return {
    id: config.id,
    name: config.name,
    repository: config.repository,
    commit: config.commit,
    registrySha256: config.registrySha256,
    importedAt,
    license: {
      spdx: "MIT",
      copyright: config.license.copyright,
      textPath: `source/${config.id}/LICENSE`,
    },
  };
}

function createDetail(
  config: ExternalSourceConfig,
  upstreamSlug: string,
  name: string,
  description: string,
  dependencies: string[],
  internal: string[],
): RegistryDetail {
  const pageUrl = `${config.pageBaseUrl}/${upstreamSlug}`;
  const sourceUrl = `${config.repository}/tree/${config.commit}`;
  const markdownUrl = `https://raw.githubusercontent.com/${new URL(config.repository).pathname.slice(1)}/${config.commit}/${config.documentationPath}/${upstreamSlug}.mdx`;
  return {
    slug: upstreamSlug,
    name,
    description,
    category: config.category,
    published_at: config.snapshotDate,
    updated_at: config.snapshotDate,
    detail_url: sourceUrl,
    markdown_url: markdownUrl,
    page_url: pageUrl,
    source_url: sourceUrl,
    raw_url: sourceUrl,
    dependencies,
    internal,
    files: [],
  };
}

function componentIntegrity(files: CatalogFile[]): string {
  return `sha256:${sha256(JSON.stringify(
    files.map(({ path, sha256: hash }) => ({ path, sha256: hash })),
  ))}`;
}

function createSummary(
  config: ExternalSourceConfig,
  detail: RegistryDetail,
  documentation: string,
  files: CatalogFile[],
  canonicalSlug: string,
): CatalogComponentSummary {
  return {
    id: `${config.id}:${detail.slug}`,
    sourceId: config.id,
    slug: canonicalSlug,
    name: detail.name,
    description: detail.description,
    category: config.category,
    publishedAt: config.snapshotDate,
    updatedAt: config.snapshotDate,
    dependencies: unique(detail.dependencies).sort(),
    internalDependencies: unique(detail.internal).sort(),
    metadata: buildMetadata(detail, documentation),
    previewPath: `/preview/${config.category}/${canonicalSlug}`,
    manifestPath: `components/${canonicalSlug}/component.json`,
    integrity: componentIntegrity(files),
  };
}

async function writeExternalComponent(
  config: ExternalSourceConfig,
  source: CatalogSource,
  detail: RegistryDetail,
  documentation: string,
  files: CatalogFile[],
  canonicalSlug: string,
  registryDependencyCommand: string | null,
  stylePaths: string[],
): Promise<CatalogComponentSummary> {
  const componentRoot = resolve(CATALOG_ROOT, "components", canonicalSlug);
  const summary = createSummary(config, detail, documentation, files, canonicalSlug);
  await writeComponentSource(componentRoot, files, documentation);
  const manifest = createComponentManifest(
    summary,
    detail,
    documentation,
    files,
    source,
  ) as CatalogComponent;
  manifest.install.registryDependencyCommand = registryDependencyCommand;
  manifest.install.stylePaths = stylePaths;
  manifest.install.instructions = [
    ...(manifest.install.instructions),
    ...(registryDependencyCommand
      ? [`Install the required shadcn primitives: ${registryDependencyCommand}`]
      : []),
    ...(stylePaths.length
      ? [`Include the returned styles: ${stylePaths.join(", ")}`]
      : []),
  ];
  manifest.provenance.transformations = config.transformations;
  await writeFile(
    resolve(componentRoot, "component.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  return summary;
}

function transformMagicSource(content: string): string {
  return content
    .replaceAll("@/registry/magicui/", "@/components/magicui/")
    .replaceAll("@/registry/example/", "@/components/external-previews/magicui/upstream/");
}

function transformKiboSource(content: string): string {
  return content
    .replace(/import\s+["']@repo\/typography["'];?\s*/, "")
    .replaceAll("@repo/shadcn-ui/components/ui/", "@/components/ui/")
    .replaceAll("@repo/shadcn-ui/lib/utils", "@/lib/utils")
    .replaceAll("@repo/shadcn-ui/hooks/", "@/hooks/")
    .replace(/@repo\/([a-z0-9-]+)\/server/g, "@/components/kibo-ui/$1/server")
    .replace(/@repo\/([a-z0-9-]+)/g, "@/components/kibo-ui/$1");
}

function registryDependencyNames(values: string[]): string[] {
  return unique(values.map((value) => {
    if (!value.startsWith("http")) return value;
    return new URL(value).pathname.split("/").filter(Boolean).at(-1) ?? value;
  })).sort();
}

function extractShadcnDependencies(contents: string[]): string[] {
  const dependencies = new Set<string>();
  const pattern = /(?:@\/components\/ui\/|@repo\/shadcn-ui\/components\/ui\/)([a-z0-9-]+)/g;
  for (const content of contents) {
    for (const match of content.matchAll(pattern)) dependencies.add(match[1]);
  }
  return [...dependencies].sort();
}

function cssDeclarations(value: unknown, indent: string): string {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  return Object.entries(value as Record<string, unknown>)
    .map(([property, declaration]) => `${indent}${property}: ${String(declaration)};`)
    .join("\n");
}

function registryCss(value: Record<string, unknown> | undefined): string {
  if (!value) return "";
  return Object.entries(value).map(([selector, declarations]) => {
    if (selector.startsWith("@keyframes") && declarations && typeof declarations === "object") {
      const frames = Object.entries(declarations as Record<string, unknown>)
        .map(([frame, frameDeclarations]) =>
          `  ${frame} {\n${cssDeclarations(frameDeclarations, "    ")}\n  }`,
        )
        .join("\n");
      return `${selector} {\n${frames}\n}`;
    }
    return `${selector} {\n${cssDeclarations(declarations, "  ")}\n}`;
  }).join("\n\n");
}

function registryCssVars(value: Record<string, unknown> | undefined): string {
  const theme = value?.theme;
  if (!theme || typeof theme !== "object" || Array.isArray(theme)) return "";
  const declarations = Object.entries(theme as Record<string, unknown>)
    .map(([property, declaration]) => `  --${property}: ${String(declaration)};`)
    .join("\n");
  return `@theme inline {\n${declarations}\n}`;
}

function magicStyles(item: z.infer<typeof magicItemSchema>): string | null {
  const sections = [registryCssVars(item.cssVars), registryCss(item.css)].filter(Boolean);
  return sections.length ? `${sections.join("\n\n")}\n` : null;
}

function magicExampleFor(
  componentName: string,
  examples: z.infer<typeof magicItemSchema>[],
): z.infer<typeof magicItemSchema> | null {
  const exact = examples.find((item) => item.name === `${componentName}-demo`);
  if (exact) return exact;
  if (componentName === "client-tweet-card") {
    return examples.find((item) => item.name === "tweet-card-demo") ?? null;
  }
  return examples.find((item) =>
    (item.registryDependencies ?? []).some((dependency) =>
      dependency === componentName || dependency.endsWith(`/${componentName}`),
    ),
  ) ?? null;
}

async function importMagic(
  config: Extract<ExternalSourceConfig, { adapter: "shadcn-registry" }>,
  pinnedRoot: string,
  source: CatalogSource,
): Promise<ImportedSource> {
  const registryRaw = await readPinnedFile(pinnedRoot, config.registryPath);
  invariant(sha256(registryRaw) === config.registrySha256, "Magic UI registry hash changed");
  const registry = magicRegistrySchema.parse(parseJson(registryRaw, config.registryPath));
  const registryComponents = registry.items.filter((item) => item.type === config.itemType);
  const components = registryComponents.filter(
    (item) => !config.excludedRegistryItems.includes(item.name),
  );
  const examples = registry.items.filter((item) => item.type === "registry:example");
  invariant(
    components.length === config.expectedComponentCount,
    `Expected ${config.expectedComponentCount} Magic UI components, found ${components.length}`,
  );
  const excludedItems = registryComponents
    .filter((item) => config.excludedRegistryItems.includes(item.name));
  invariant(
    excludedItems.length === config.excludedRegistryItems.length,
    "Magic UI excluded registry item list does not match the pinned registry",
  );
  for (const item of excludedItems) {
    const missingFiles = await Promise.all(item.files.map(async (file) =>
      (await readOptionalFile(safeOutputPath(pinnedRoot, `apps/www/${file.path}`))) === null,
    ));
    invariant(
      missingFiles.some(Boolean),
      `Excluded Magic UI item now has source and must be reviewed: ${item.name}`,
    );
  }
  invariant(
    new Set(components.map((item) => item.name)).size === components.length,
    "Magic UI registry contains duplicate component names",
  );

  const previewRoot = resolve(PREVIEW_VENDOR_ROOT, "components/external-previews/magicui/upstream");
  const availableExampleModules = new Set<string>();
  await mkdir(previewRoot, { recursive: true });
  for (const example of examples) {
    for (const file of example.files) {
      const upstreamContent = await readOptionalFile(
        safeOutputPath(pinnedRoot, `apps/www/${file.path}`),
      );
      if (upstreamContent === null) continue;
      const content = transformMagicSource(upstreamContent);
      const outputName = basename(file.target ?? file.path);
      await writeFile(safeOutputPath(previewRoot, outputName), content);
      availableExampleModules.add(outputName.replace(/\.tsx?$/, ""));
    }
  }

  const summaries: CatalogComponentSummary[] = [];
  const previews: PreviewEntry[] = [];
  const previewStyles: string[] = [];
  for (const [index, item] of components.entries()) {
    const canonicalSlug = `magicui-${item.name}`;
    const upstreamContents: string[] = [];
    const files: CatalogFile[] = [];
    for (const file of item.files) {
      const upstreamContent = await readPinnedFile(pinnedRoot, `apps/www/${file.path}`);
      const content = transformMagicSource(upstreamContent);
      const target = file.target ?? `components/magicui/${basename(file.path)}`;
      upstreamContents.push(upstreamContent);
      files.push({
        path: target,
        type: "component",
        content,
        sha256: sha256(content),
        upstreamPath: `apps/www/${file.path}`,
        upstreamSha256: sha256(upstreamContent),
        transformation: config.transformations[0],
      });
      const previewTarget = safeOutputPath(PREVIEW_VENDOR_ROOT, target);
      await mkdir(resolve(previewTarget, ".."), { recursive: true });
      await writeFile(previewTarget, content);
    }
    const styles = magicStyles(item);
    const stylePaths: string[] = [];
    if (styles) {
      previewStyles.push(styles);
      const stylePath = `components/magicui/${item.name}.css`;
      stylePaths.push(stylePath);
      files.push({
        path: stylePath,
        type: "style",
        content: styles,
        sha256: sha256(styles),
        transformation: config.transformations[1],
      });
      await writeFile(safeOutputPath(PREVIEW_VENDOR_ROOT, stylePath), styles);
    }
    const registryDependencies = registryDependencyNames(item.registryDependencies ?? []);
    const internal = unique([
      ...registryDependencies,
      ...extractShadcnDependencies(upstreamContents),
    ]).sort();
    const name = item.title || titleCase(item.name);
    const description = item.description || `${name} component from Magic UI.`;
    const documentation = await readOptionalFile(
      safeOutputPath(pinnedRoot, `${config.documentationPath}/${item.name}.mdx`),
    ) ?? `# ${name}\n\n${description}\n`;
    const detail = createDetail(
      config,
      item.name,
      name,
      description,
      item.dependencies ?? [],
      internal,
    );
    const registryCommand = internal.length
      ? `pnpm dlx shadcn@latest add ${internal.join(" ")}`
      : null;
    summaries.push(await writeExternalComponent(
      config,
      source,
      detail,
      documentation,
      files,
      canonicalSlug,
      registryCommand,
      stylePaths,
    ));
    const example = magicExampleFor(item.name, examples);
    const exampleFile = example?.files[0];
    const exampleModule = exampleFile
      ? basename(exampleFile.target ?? exampleFile.path).replace(/\.tsx?$/, "")
      : null;
    previews.push({
      sourceId: config.id,
      slug: canonicalSlug,
      name,
      description,
      category: config.category,
      previewKey: `${config.id}/${canonicalSlug}`,
      modulePath: exampleModule && availableExampleModules.has(exampleModule)
        ? `@/components/external-previews/magicui/upstream/${exampleModule}`
        : null,
    });
    process.stdout.write(`[${index + 1}/${components.length}] imported ${canonicalSlug}\n`);
  }
  return { source, summaries, previews, styles: previewStyles };
}

function packageDependencies(
  dependencies: Record<string, string> | undefined,
): string[] {
  return Object.keys(dependencies ?? {})
    .filter((dependency) =>
      dependency !== "react" &&
      dependency !== "react-dom" &&
      !dependency.startsWith("@repo/"),
    )
    .sort();
}

function createKiboPreview(packageName: string, upstreamContent: string): string {
  if (packageName === "glimpse") {
    return `export default function Example() {\n  return <div className="rounded-xl border p-8 text-center">Glimpse link preview</div>;\n}\n`;
  }
  if (packageName === "ticker") {
    return `"use client";\n\nimport { Ticker, TickerIcon, TickerPrice, TickerPriceChange, TickerSymbol } from "@/components/kibo-ui/ticker";\n\nexport default function Example() {\n  return (\n    <Ticker>\n      <TickerIcon symbol="GOOG" />\n      <TickerSymbol symbol="GOOG" />\n      <TickerPrice price={175.41} />\n      <TickerPriceChange change={2.13} />\n    </Ticker>\n  );\n}\n`;
  }
  if (packageName === "marquee") {
    return `"use client";\n\nimport { Marquee, MarqueeFade, MarqueeItem } from "@/components/kibo-ui/marquee";\n\nexport default function Example() {\n  return (\n    <Marquee className="max-w-2xl">\n      <MarqueeFade side="left" />\n      <MarqueeFade side="right" />\n      <div className="flex justify-center">\n        {[1, 2, 3, 4, 5].map((item) => (\n          <MarqueeItem className="grid size-24 place-items-center rounded-full bg-muted text-xl font-semibold" key={item}>\n            {item}\n          </MarqueeItem>\n        ))}\n      </div>\n    </Marquee>\n  );\n}\n`;
  }

  let content = transformKiboSource(upstreamContent);
  if (content.includes('from "@faker-js/faker"')) {
    content = content.replace(
      'import { faker } from "@faker-js/faker";',
      'import { faker } from "@faker-js/faker";\n\nfaker.seed(42);',
    );
    content = content
      .replaceAll(
        "faker.date.past({ years: 0.5, refDate: new Date() })",
        'new Date("2026-02-01T00:00:00.000Z")',
      )
      .replaceAll(
        "faker.date.future({ years: 0.5, refDate: new Date() })",
        'new Date("2026-05-01T00:00:00.000Z")',
      );
  }
  return content;
}

async function copyKiboPreviewSupport(pinnedRoot: string): Promise<void> {
  const shadcnRoot = resolve(pinnedRoot, "packages/shadcn-ui");
  for (const [sourceDirectory, outputDirectory] of [
    [resolve(shadcnRoot, "components/ui"), resolve(PREVIEW_VENDOR_ROOT, "components/ui")],
    [resolve(shadcnRoot, "hooks"), resolve(PREVIEW_VENDOR_ROOT, "hooks")],
  ] as const) {
    await mkdir(outputDirectory, { recursive: true });
    const files = (await readdir(sourceDirectory, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && [".ts", ".tsx"].includes(extname(entry.name)));
    for (const file of files) {
      const content = transformKiboSource(await readFile(resolve(sourceDirectory, file.name), "utf8"));
      await writeFile(resolve(outputDirectory, file.name), content);
    }
  }
}

async function importKibo(
  config: Extract<ExternalSourceConfig, { adapter: "kibo-packages" }>,
  pinnedRoot: string,
  source: CatalogSource,
): Promise<ImportedSource> {
  const inventoryRaw = await readPinnedFile(pinnedRoot, config.registryPath);
  invariant(sha256(inventoryRaw) === config.registrySha256, "Kibo lockfile hash changed");
  const packageRoot = safeOutputPath(pinnedRoot, config.packagesPath);
  const entries = await readdir(packageRoot, { withFileTypes: true });
  const packageNames = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !config.excludedPackages.includes(name))
    .sort();
  invariant(
    packageNames.length === config.expectedComponentCount,
    `Expected ${config.expectedComponentCount} Kibo packages, found ${packageNames.length}`,
  );
  for (const name of packageNames) slugSchema.parse(name);
  await copyKiboPreviewSupport(pinnedRoot);

  const summaries: CatalogComponentSummary[] = [];
  const previews: PreviewEntry[] = [];
  const previewStyles: string[] = [];
  for (const [index, packageName] of packageNames.entries()) {
    const packagePath = safeOutputPath(packageRoot, packageName);
    const packageJsonRaw = await readFile(resolve(packagePath, "package.json"), "utf8");
    const packageJson = packageSchema.parse(parseJson(packageJsonRaw, `${packageName}/package.json`));
    invariant(packageJson.name === `@repo/${packageName}`, `Unexpected Kibo package name: ${packageName}`);
    const sourceEntries = (await readdir(packagePath, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && [".tsx", ".css"].includes(extname(entry.name)))
      .sort((left, right) => left.name.localeCompare(right.name));
    invariant(sourceEntries.length > 0, `Kibo package has no component source: ${packageName}`);
    const rawContents: string[] = [];
    const files: CatalogFile[] = [];
    for (const entry of sourceEntries) {
      const upstreamPath = `${config.packagesPath}/${packageName}/${entry.name}`;
      const upstreamContent = await readPinnedFile(pinnedRoot, upstreamPath);
      const content = transformKiboSource(upstreamContent);
      const target = `components/kibo-ui/${packageName}/${entry.name}`;
      rawContents.push(upstreamContent);
      files.push({
        path: target,
        type: entry.name.endsWith(".css") ? "style" : "component",
        content,
        sha256: sha256(content),
        upstreamPath,
        upstreamSha256: sha256(upstreamContent),
        transformation: config.transformations.join(" "),
      });
      if (entry.name.endsWith(".css")) previewStyles.push(content);
      const previewTarget = safeOutputPath(PREVIEW_VENDOR_ROOT, target);
      await mkdir(resolve(previewTarget, ".."), { recursive: true });
      await writeFile(previewTarget, content);
    }
    const documentation = await readFile(
      safeOutputPath(pinnedRoot, `${config.documentationPath}/${packageName}.mdx`),
      "utf8",
    );
    const external = packageDependencies(packageJson.dependencies);
    const internal = extractShadcnDependencies(rawContents);
    const detail = createDetail(
      config,
      packageName,
      titleCase(packageName),
      packageJson.description,
      external,
      internal,
    );
    const canonicalSlug = `kibo-${packageName}`;
    const registryCommand = internal.length
      ? `pnpm dlx shadcn@latest add ${internal.join(" ")}`
      : null;
    const stylePaths = files.filter((file) => file.type === "style").map((file) => file.path);
    summaries.push(await writeExternalComponent(
      config,
      source,
      detail,
      documentation,
      files,
      canonicalSlug,
      registryCommand,
      stylePaths,
    ));

    const previewSource = createKiboPreview(
      packageName,
      await readFile(
        safeOutputPath(pinnedRoot, `${config.examplePath}/${packageName}.tsx`),
        "utf8",
      ),
    );
    const previewModulePath = `components/external-previews/kibo/${canonicalSlug}.tsx`;
    const previewTarget = safeOutputPath(PREVIEW_VENDOR_ROOT, previewModulePath);
    await mkdir(resolve(previewTarget, ".."), { recursive: true });
    await writeFile(previewTarget, previewSource);
    previews.push({
      sourceId: config.id,
      slug: canonicalSlug,
      name: titleCase(packageName),
      description: packageJson.description,
      category: config.category,
      previewKey: `${config.id}/${canonicalSlug}`,
      modulePath: `@/${previewModulePath.replace(/\.tsx$/, "")}`,
    });
    process.stdout.write(`[${index + 1}/${packageNames.length}] imported ${canonicalSlug}\n`);
  }
  return { source, summaries, previews, styles: previewStyles };
}

async function writeSourceEvidence(
  config: ExternalSourceConfig,
  source: CatalogSource,
  license: string,
  count: number,
): Promise<void> {
  const outputRoot = resolve(CATALOG_ROOT, "source", config.id);
  await mkdir(outputRoot, { recursive: true });
  await writeFile(resolve(outputRoot, "LICENSE"), license);
  await writeFile(
    resolve(outputRoot, "PROVENANCE.json"),
    `${JSON.stringify({
      source,
      adapter: config.adapter,
      registryPath: config.registryPath,
      componentCount: count,
      excludedRegistryItems: config.adapter === "shadcn-registry"
        ? config.excludedRegistryItems
        : undefined,
      excludedPackages: config.adapter === "kibo-packages"
        ? config.excludedPackages
        : undefined,
      transformations: config.transformations,
      previewTransformations: config.adapter === "kibo-packages"
        ? [
            "Seed Faker-based demos and use fixed dates for deterministic server/client rendering.",
            "Replace network-dependent or continuously moving demo state with local deterministic preview state.",
          ]
        : undefined,
    }, null, 2)}\n`,
  );
}

function generatedPreviewMap(previews: PreviewEntry[]): string {
  const mappings = previews
    .filter((preview) => preview.modulePath)
    .map((preview) =>
      `  ${JSON.stringify(preview.previewKey)}: dynamic(() => import(${JSON.stringify(preview.modulePath)}), { ssr: false }),`,
    )
    .join("\n");
  return `"use client";\n\nimport dynamic from "next/dynamic";\nimport type { ComponentType } from "react";\n\nexport const externalPreviews: Record<string, ComponentType> = {\n${mappings}\n};\n`;
}

async function writePreviewRegistry(previews: PreviewEntry[], styles: string[]): Promise<void> {
  await mkdir(PREVIEW_GENERATED_ROOT, { recursive: true });
  await writeFile(
    resolve(PREVIEW_GENERATED_ROOT, "external-registry.ts"),
    `export const externalRegistry = ${JSON.stringify(previews.map(({ modulePath: _modulePath, ...preview }) => preview), null, 2)} as const;\n`,
  );
  const mapRoot = resolve(PREVIEW_VENDOR_ROOT, "components/external-previews");
  await mkdir(mapRoot, { recursive: true });
  await writeFile(resolve(mapRoot, "index.tsx"), generatedPreviewMap(previews));
  await writeFile(
    resolve(PREVIEW_VENDOR_ROOT, "external-styles.css"),
    `${styles.join("\n")}\n`,
  );
}

export async function runExternalImports(): Promise<void> {
  const indexPath = resolve(CATALOG_ROOT, "index.json");
  const catalog = parseCatalogIndex(parseJson(await readFile(indexPath, "utf8"), indexPath));
  invariant(
    catalog.sources.length === 1 && catalog.sources[0]?.id === "beui",
    "External imports require a fresh beUI base catalogue",
  );
  const importedAt = new Date().toISOString();
  const imports: ImportedSource[] = [];

  for (const configPath of SOURCE_CONFIG_PATHS) {
    const config = await readConfig(configPath);
    const temporaryRoot = await mkdtemp(resolve(tmpdir(), `designmcp-${config.id}-`));
    try {
      const pinnedRoot = await extractPinnedRepository(config, temporaryRoot);
      const license = await readPinnedFile(pinnedRoot, config.license.path);
      assertStandardMitLicense(license, config.license);
      const source = createSource(config, importedAt);
      const imported = config.adapter === "shadcn-registry"
        ? await importMagic(config, pinnedRoot, source)
        : await importKibo(config, pinnedRoot, source);
      await writeSourceEvidence(config, source, license, imported.summaries.length);
      imports.push(imported);
    } finally {
      await rm(temporaryRoot, { recursive: true, force: true });
    }
  }

  const summaries = [
    ...catalog.components,
    ...imports.flatMap((item) => item.summaries),
  ];
  invariant(
    new Set(summaries.map((component) => component.slug)).size === summaries.length,
    "Imported sources produced duplicate canonical slugs",
  );
  const output: CatalogIndex = {
    ...catalog,
    generatedAt: importedAt,
    sources: [...catalog.sources, ...imports.map((item) => item.source)],
    categories: catalog.categories.map((category) => ({
      ...category,
      count: summaries.filter((component) => component.category === category.slug).length,
    })),
    components: summaries,
  };
  await writeFile(indexPath, `${JSON.stringify(output, null, 2)}\n`);
  await writePreviewRegistry(
    imports.flatMap((item) => item.previews),
    imports.flatMap((item) => item.styles),
  );
  process.stdout.write(
    `Imported ${imports.flatMap((item) => item.summaries).length} external MIT components from ` +
      `${imports.map((item) => item.source.name).join(" and ")}.\n`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  await runExternalImports();
}
