import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type {
  CatalogCategory,
  CatalogComponentSummary,
  CatalogIndex,
  CatalogSource,
} from "../packages/catalog/src/types.js";
import { mapConcurrent } from "./lib/catalog-import/concurrency.js";
import { importComponent } from "./lib/catalog-import/component.js";
import { extractPinnedRepository, vendorPreviewRuntime } from "./lib/catalog-import/repository.js";
import {
  registryIndexSchema,
  sourceConfigSchema,
  type RegistryIndex,
  type SourceConfig,
} from "./lib/catalog-import/schemas.js";
import {
  assertAllowedUrl,
  fetchJson,
  invariant,
  parseJson,
  sha256,
} from "./lib/catalog-import/security.js";
import { assertStandardMitLicense } from "./lib/catalog-import/license.js";

const REPOSITORY_ROOT = resolve(import.meta.dirname, "..");
const SOURCE_CONFIG_PATH = resolve(REPOSITORY_ROOT, "sources/beui.json");
const OUTPUT_ROOT = process.env.CATALOG_IMPORT_ROOT ?? REPOSITORY_ROOT;
const CATALOG_ROOT = resolve(OUTPUT_ROOT, "catalog");
const PREVIEW_VENDOR_ROOT = resolve(OUTPUT_ROOT, "apps/preview/vendor-root");
const PREVIEW_PUBLIC_ROOT = resolve(OUTPUT_ROOT, "apps/preview/public");
const IMPORT_CONCURRENCY = 6;

async function readSourceConfig(): Promise<SourceConfig> {
  const rawConfig = await readFile(SOURCE_CONFIG_PATH, "utf8");
  return sourceConfigSchema.parse(parseJson(rawConfig, SOURCE_CONFIG_PATH));
}

async function readPinnedLicense(
  pinnedRoot: string,
  config: SourceConfig,
): Promise<string> {
  const license = await readFile(resolve(pinnedRoot, "LICENSE"), "utf8");
  assertStandardMitLicense(license, config.license);
  return license;
}

async function readPinnedRegistry(config: SourceConfig): Promise<RegistryIndex> {
  const registryUrl = assertAllowedUrl(config.registryUrl, "https://beui.dev");
  const { raw, value } = await fetchJson(registryUrl);
  const registry = registryIndexSchema.parse(value);

  invariant(
    sha256(raw) === config.registrySha256,
    "Registry changed; review it and update sources/beui.json deliberately",
  );
  invariant(
    registry.components.length === config.expectedComponentCount,
    "Unexpected registry component count",
  );

  const componentSlugs = registry.components.map((component) => component.slug);
  invariant(
    new Set(componentSlugs).size === componentSlugs.length,
    "Duplicate component slugs",
  );

  return registry;
}

function createCatalogSource(config: SourceConfig, importedAt: string): CatalogSource {
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
      textPath: "source/beui/LICENSE",
    },
  };
}

function createCatalogIndex(
  registry: RegistryIndex,
  source: CatalogSource,
  summaries: CatalogComponentSummary[],
): CatalogIndex {
  const categories: CatalogCategory[] = registry.categories.map((category) => ({
    ...category,
    count: summaries.filter((item) => item.category === category.slug).length,
  }));

  return {
    schemaVersion: 2,
    generatedAt: source.importedAt,
    sources: [source],
    categories,
    components: summaries,
  };
}

export async function runBeuiImport(): Promise<void> {
  invariant(resolve(OUTPUT_ROOT) !== REPOSITORY_ROOT, 'Use pnpm catalog:import to stage and validate catalogue changes');
  const config = await readSourceConfig();
  const temporaryRoot = await mkdtemp(resolve(tmpdir(), "rendyn-beui-"));

  try {
    const pinnedRoot = await extractPinnedRepository(config, temporaryRoot);
    const license = await readPinnedLicense(pinnedRoot, config);
    const registry = await readPinnedRegistry(config);
    const source = createCatalogSource(config, new Date().toISOString());

    await prepareCatalog(source.license.textPath, license);
    const summaries = await mapConcurrent(
      registry.components,
      IMPORT_CONCURRENCY,
      (entry, index) => importComponent({
        entry,
        index,
        total: registry.components.length,
        config,
        source,
        pinnedRoot,
        catalogRoot: CATALOG_ROOT,
      }),
    );
    const catalog = createCatalogIndex(registry, source, summaries);

    await writeCatalogOutputs(catalog, config.registryUrl);
    await vendorPreviewRuntime(pinnedRoot, PREVIEW_VENDOR_ROOT, PREVIEW_PUBLIC_ROOT);

    process.stdout.write(
      `Imported ${summaries.length} MIT components and pinned preview runtime from ` +
        `${basename(config.repository)}@${config.commit}.\n`,
    );
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

async function prepareCatalog(licensePath: string, licenseText: string): Promise<void> {
  await rm(resolve(CATALOG_ROOT, "components"), { recursive: true, force: true });
  await rm(resolve(CATALOG_ROOT, "source"), { recursive: true, force: true });
  await mkdir(resolve(CATALOG_ROOT, "components"), { recursive: true });
  await mkdir(resolve(CATALOG_ROOT, "source/beui"), { recursive: true });
  await writeFile(resolve(CATALOG_ROOT, licensePath), licenseText);
}

async function writeCatalogOutputs(catalog: CatalogIndex, registryUrl: string): Promise<void> {
  await writeFile(
    resolve(CATALOG_ROOT, "index.json"),
    `${JSON.stringify(catalog, null, 2)}\n`,
  );
  await writeFile(
    resolve(CATALOG_ROOT, "source/beui/PROVENANCE.json"),
    `${JSON.stringify({
      source: catalog.sources[0],
      registryUrl,
      componentCount: catalog.components.length,
      categories: catalog.categories,
      catalogIndexSha256: sha256(JSON.stringify(catalog)),
    }, null, 2)}\n`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  await runBeuiImport();
}
