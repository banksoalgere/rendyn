import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type {
  CatalogComponent,
  CatalogComponentSummary,
  CatalogSource,
} from "../../../packages/catalog/src/types.js";
import { addRegistrySignature, buildMetadata, unique } from "./metadata.js";
import { readPinnedFile } from "./repository.js";
import { registryDetailSchema, type RegistryEntry, type SourceConfig } from "./schemas.js";
import {
  assertAllowedUrl,
  fetchJson,
  fetchText,
  invariant,
  MAX_MARKDOWN_BYTES,
  safeOutputPath,
  sha256,
} from "./security.js";

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
  const detailUrl = assertAllowedUrl(entry.detail_url, "https://beui.dev");
  const markdownUrl = assertAllowedUrl(entry.markdown_url, "https://beui.dev");
  const [{ value: detailValue }, markdown] = await Promise.all([
    fetchJson(detailUrl),
    fetchText(markdownUrl, MAX_MARKDOWN_BYTES),
  ]);
  const detail = registryDetailSchema.parse(detailValue);
  invariant(detail.slug === entry.slug, `Detail slug mismatch for ${entry.slug}`);
  invariant(detail.category === entry.category, `Detail category mismatch for ${entry.slug}`);

  const seenPaths = new Set<string>();
  const files = await Promise.all(
    detail.files.map(async (file) => {
      invariant(!seenPaths.has(file.path), `Duplicate file path in ${entry.slug}: ${file.path}`);
      seenPaths.add(file.path);
      const pinnedContent = await readPinnedFile(pinnedRoot, file.path);
      const expectedContent = file.type === "component"
        ? addRegistrySignature(pinnedContent, file.path, detail.page_url)
        : pinnedContent;
      invariant(
        expectedContent === file.content,
        `Registry content differs from pinned generator at commit: ${entry.slug}/${file.path}`,
      );
      return { ...file, sha256: sha256(file.content) };
    }),
  );

  const componentRoot = resolve(catalogRoot, "components", entry.slug);
  await mkdir(componentRoot, { recursive: true });
  for (const file of files) {
    const outputPath = safeOutputPath(resolve(componentRoot, "source"), file.path);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, file.content);
  }
  await writeFile(resolve(componentRoot, "README.md"), markdown);

  const integrity = `sha256:${sha256(JSON.stringify(
    files.map(({ path, sha256: hash }) => ({ path, sha256: hash })),
  ))}`;
  const summary: CatalogComponentSummary = {
    id: `${config.id}:${entry.slug}`,
    slug: entry.slug,
    name: detail.name,
    description: detail.description,
    category: detail.category,
    publishedAt: detail.published_at,
    updatedAt: detail.updated_at,
    dependencies: unique(detail.dependencies).sort(),
    internalDependencies: unique(detail.internal).sort(),
    metadata: buildMetadata(detail, markdown),
    previewPath: `/preview/${detail.category}/${entry.slug}`,
    manifestPath: `components/${entry.slug}/component.json`,
    integrity,
  };
  const dependencyCommand = summary.dependencies.length
    ? `pnpm add ${summary.dependencies.join(" ")}`
    : null;
  const manifest: CatalogComponent = {
    ...summary,
    source,
    files,
    install: {
      packageManager: "pnpm",
      dependencyCommand,
      instructions: [
        ...(dependencyCommand ? [`Install external packages: ${dependencyCommand}`] : []),
        "Copy every returned file to its stated project-relative path.",
        "Preserve the MIT copyright and permission notice in your product notices.",
        "Review imports beginning with @/ and map them to your project alias if it differs.",
      ],
    },
    provenance: {
      upstreamSlug: detail.slug,
      upstreamPageUrl: detail.page_url,
      upstreamDetailUrl: detail.detail_url,
      upstreamMarkdownUrl: detail.markdown_url,
    },
    documentation: markdown,
  };
  await writeFile(
    resolve(componentRoot, "component.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  process.stdout.write(`[${index + 1}/${total}] imported ${entry.slug}\n`);
  return summary;
}
