import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { SourceConfig } from "./schemas.js";
import {
  assertAllowedUrl,
  fetchBytes,
  invariant,
  MAX_TARBALL_BYTES,
  runProcess,
  safeOutputPath,
} from "./security.js";

export async function extractPinnedRepository(
  config: SourceConfig,
  temporaryRoot: string,
): Promise<string> {
  const repositoryUrl = new URL(config.repository);
  const tarballUrl = new URL(
    `https://codeload.github.com${repositoryUrl.pathname}/tar.gz/${config.commit}`,
  );
  assertAllowedUrl(tarballUrl.toString(), "https://codeload.github.com");
  const archive = await fetchBytes(tarballUrl, MAX_TARBALL_BYTES);
  const archivePath = resolve(temporaryRoot, "source.tar.gz");
  const extractedPath = resolve(temporaryRoot, "source");
  await writeFile(archivePath, archive);
  await mkdir(extractedPath);
  await runProcess("tar", ["-xzf", archivePath, "-C", extractedPath]);
  const entries = (await readdir(extractedPath, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory());
  invariant(entries.length === 1, "Expected one directory in the pinned source archive");
  return resolve(extractedPath, entries[0].name);
}

export function readPinnedFile(pinnedRoot: string, relativePath: string): Promise<string> {
  return readFile(safeOutputPath(pinnedRoot, relativePath), "utf8");
}

export async function vendorPreviewRuntime(
  pinnedRoot: string,
  vendorRoot: string,
  publicRoot: string,
): Promise<void> {
  await rm(vendorRoot, { recursive: true, force: true });
  await mkdir(vendorRoot, { recursive: true });
  await cp(resolve(pinnedRoot, "components"), resolve(vendorRoot, "components"), {
    recursive: true,
  });
  await cp(resolve(pinnedRoot, "lib"), resolve(vendorRoot, "lib"), { recursive: true });
  await cp(resolve(pinnedRoot, "app/globals.css"), resolve(vendorRoot, "globals.css"));
  await cp(resolve(pinnedRoot, "LICENSE"), resolve(vendorRoot, "LICENSE"));

  await rm(publicRoot, { recursive: true, force: true });
  await cp(resolve(pinnedRoot, "public"), publicRoot, { recursive: true });
}
