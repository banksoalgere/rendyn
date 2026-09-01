import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { resolve, sep } from "node:path";

export const MAX_JSON_BYTES = 4 * 1024 * 1024;
export const MAX_MARKDOWN_BYTES = 1 * 1024 * 1024;
export const MAX_TARBALL_BYTES = 80 * 1024 * 1024;

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function sha256(value: string | Uint8Array): string {
  return createHash("sha256").update(value).digest("hex");
}

export function assertAllowedUrl(rawUrl: string, expectedOrigin: string): URL {
  const url = new URL(rawUrl);
  invariant(url.protocol === "https:", `Refusing non-HTTPS URL: ${rawUrl}`);
  invariant(url.origin === expectedOrigin, `Refusing unexpected origin: ${url.origin}`);
  return url;
}

export async function fetchBytes(url: URL, maximumBytes: number): Promise<Uint8Array> {
  const response = await fetch(url, {
    redirect: "error",
    headers: { "User-Agent": "rendyn-catalog-importer/0.1" },
  });
  invariant(response.ok, `Fetch failed (${response.status}) for ${url}`);
  const declaredLength = Number(response.headers.get("content-length") ?? 0);
  invariant(
    Number.isFinite(declaredLength) && declaredLength >= 0,
    `Invalid content length for ${url}`,
  );
  invariant(
    declaredLength === 0 || declaredLength <= maximumBytes,
    `Response too large for ${url}`,
  );
  const bytes = new Uint8Array(await response.arrayBuffer());
  invariant(bytes.byteLength <= maximumBytes, `Response exceeded size limit for ${url}`);
  return bytes;
}

export async function fetchText(url: URL, maximumBytes: number): Promise<string> {
  return new TextDecoder().decode(await fetchBytes(url, maximumBytes));
}

export async function fetchJson(url: URL): Promise<{ raw: string; value: unknown }> {
  const raw = await fetchText(url, MAX_JSON_BYTES);
  return { raw, value: parseJson(raw, url.toString()) };
}

export function parseJson(raw: string, source: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`Invalid JSON from ${source}`);
  }
}

export function safeOutputPath(root: string, relativePath: string): string {
  invariant(
    relativePath.length > 0 && relativePath.length <= 240,
    `Invalid file path: ${relativePath}`,
  );
  invariant(!relativePath.includes("\\"), `Backslash paths are not allowed: ${relativePath}`);
  invariant(!relativePath.includes("\0"), `Null bytes are not allowed in paths: ${relativePath}`);
  invariant(
    !relativePath.startsWith("/") && !relativePath.split("/").includes(".."),
    `Unsafe path: ${relativePath}`,
  );
  const resolvedRoot = resolve(root);
  const outputPath = resolve(resolvedRoot, relativePath);
  invariant(outputPath.startsWith(`${resolvedRoot}${sep}`), `Path escaped root: ${relativePath}`);
  return outputPath;
}

export async function runProcess(command: string, args: string[]): Promise<void> {
  await new Promise<void>((resolvePromise, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`${command} exited with status ${String(code)}`));
    });
  });
}
