import { access, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright-core";
import { CatalogStore } from "@designmcp/catalog";

const ROOT = resolve(import.meta.dirname, "..");
const PREVIEW_BASE_URL = process.env.PREVIEW_BASE_URL ?? "http://localhost:3100";
const configuredExecutable = process.env.CHROMIUM_EXECUTABLE_PATH;
const candidates = [
  configuredExecutable,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
].filter((value): value is string => Boolean(value));

let executablePath: string | undefined;
for (const candidate of candidates) {
  try {
    await access(candidate);
    executablePath = candidate;
    break;
  } catch {
    // Try the next explicitly bounded executable location.
  }
}
if (!executablePath) throw new Error("Set CHROMIUM_EXECUTABLE_PATH to a local Chromium-compatible browser");

const store = await CatalogStore.load(resolve(ROOT, "catalog"));
const requestedSlugs = new Set(
  (process.env.PREVIEW_SLUGS ?? "").split(",").map((value) => value.trim()).filter(Boolean),
);
const components = requestedSlugs.size
  ? store.index.components.filter((component) => requestedSlugs.has(component.slug))
  : store.index.components;
if (requestedSlugs.size && components.length !== requestedSlugs.size) {
  throw new Error("PREVIEW_SLUGS contains an unknown component slug");
}
const outputRoot = resolve(ROOT, "catalog/previews");
await mkdir(outputRoot, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
const failures: string[] = [];

try {
  for (const [position, component] of components.entries()) {
    const url = new URL(component.previewPath, PREVIEW_BASE_URL).toString();
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
      const preview = page.locator("[data-preview-root]");
      await preview.waitFor({ state: "visible", timeout: 10_000 });
      await page.waitForTimeout(750);
      await preview.screenshot({ path: resolve(outputRoot, `${component.slug}.png`) });
      process.stdout.write(`[${position + 1}/${components.length}] captured ${component.slug}\n`);
    } catch (error) {
      failures.push(`${component.slug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} finally {
  await browser.close();
}

if (failures.length) {
  throw new Error(`Preview capture failed for ${failures.length} components:\n${failures.join("\n")}`);
}
