import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { CatalogFile } from "../../../packages/catalog/src/types.js";
import { addRegistrySignature } from "./metadata.js";
import { readPinnedFile } from "./repository.js";
import {
  registryDetailSchema,
  type RegistryDetail,
  type RegistryEntry,
} from "./schemas.js";
import {
  assertAllowedUrl,
  fetchJson,
  fetchText,
  invariant,
  MAX_MARKDOWN_BYTES,
  safeOutputPath,
  sha256,
} from "./security.js";

interface VerifiedComponent {
  detail: RegistryDetail;
  markdown: string;
  files: CatalogFile[];
}

async function fetchUpstreamComponent(
  entry: RegistryEntry,
): Promise<{ detail: RegistryDetail; markdown: string }> {
  const detailUrl = assertAllowedUrl(entry.detail_url, "https://beui.dev");
  const markdownUrl = assertAllowedUrl(entry.markdown_url, "https://beui.dev");
  const [{ value: detailValue }, markdown] = await Promise.all([
    fetchJson(detailUrl),
    fetchText(markdownUrl, MAX_MARKDOWN_BYTES),
  ]);
  const detail = registryDetailSchema.parse(detailValue);

  invariant(detail.slug === entry.slug, `Detail slug mismatch for ${entry.slug}`);
  invariant(detail.category === entry.category, `Detail category mismatch for ${entry.slug}`);

  return { detail, markdown };
}

async function verifyFiles(
  detail: RegistryDetail,
  pinnedRoot: string,
): Promise<CatalogFile[]> {
  const paths = detail.files.map((file) => file.path);
  invariant(new Set(paths).size === paths.length, `Duplicate file path in ${detail.slug}`);

  return Promise.all(
    detail.files.map(async (file) => {
      const pinnedContent = await readPinnedFile(pinnedRoot, file.path);
      const expectedContent = file.type === "component"
        ? addRegistrySignature(pinnedContent, file.path, detail.page_url)
        : pinnedContent;

      invariant(
        expectedContent === file.content,
        `Registry content differs from pinned generator at commit: ${detail.slug}/${file.path}`,
      );

      return { ...file, sha256: sha256(file.content) };
    }),
  );
}

export async function loadVerifiedComponent(
  entry: RegistryEntry,
  pinnedRoot: string,
): Promise<VerifiedComponent> {
  const { detail, markdown } = await fetchUpstreamComponent(entry);
  const files = await verifyFiles(detail, pinnedRoot);
  return { detail, markdown, files };
}

export async function writeComponentSource(
  componentRoot: string,
  files: CatalogFile[],
  markdown: string,
): Promise<void> {
  await mkdir(componentRoot, { recursive: true });

  for (const file of files) {
    const outputPath = safeOutputPath(resolve(componentRoot, "source"), file.path);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, file.content);
  }

  await writeFile(resolve(componentRoot, "README.md"), markdown);
}
