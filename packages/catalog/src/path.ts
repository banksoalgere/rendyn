import { resolve, sep } from "node:path";

const MAX_RELATIVE_PATH_LENGTH = 240;

export function resolveCatalogPath(root: string, relativePath: string): string {
  if (
    relativePath.length === 0 ||
    relativePath.length > MAX_RELATIVE_PATH_LENGTH ||
    relativePath.includes("\\") ||
    relativePath.includes("\0") ||
    relativePath.startsWith("/") ||
    relativePath.split("/").includes("..")
  ) {
    throw new Error(`Unsafe catalogue path: ${relativePath}`);
  }

  const resolvedRoot = resolve(root);
  const outputPath = resolve(resolvedRoot, relativePath);
  if (!outputPath.startsWith(`${resolvedRoot}${sep}`)) {
    throw new Error(`Catalogue path escaped its root: ${relativePath}`);
  }
  return outputPath;
}
