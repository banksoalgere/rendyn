import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type {
  CatalogComponentSummary,
  CatalogSource,
} from "../../../packages/catalog/src/types.js";
import { createComponentManifest, createComponentSummary } from "./component-manifest.js";
import { loadVerifiedComponent, writeComponentSource } from "./component-source.js";
import type { RegistryEntry, SourceConfig } from "./schemas.js";

interface ImportComponentOptions {
  entry: RegistryEntry;
  index: number;
  total: number;
  config: SourceConfig;
  source: CatalogSource;
  pinnedRoot: string;
  catalogRoot: string;
}

export async function importComponent({
  entry,
  index,
  total,
  config,
  source,
  pinnedRoot,
  catalogRoot,
}: ImportComponentOptions): Promise<CatalogComponentSummary> {
  const { detail, markdown, files } = await loadVerifiedComponent(entry, pinnedRoot);
  const componentRoot = resolve(catalogRoot, "components", entry.slug);

  await writeComponentSource(componentRoot, files, markdown);

  const summary = createComponentSummary(detail, markdown, config, files);
  const manifest = createComponentManifest(summary, detail, markdown, files, source);
  await writeFile(
    resolve(componentRoot, "component.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  process.stdout.write(`[${index + 1}/${total}] imported ${entry.slug}\n`);
  return summary;
}
