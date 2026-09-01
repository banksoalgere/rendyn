import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { CatalogStore } from "@rendyn/catalog";

const catalogRoot = resolve(import.meta.dirname, "../catalog");
const store = await CatalogStore.load(catalogRoot);

if (store.index.components.length !== 189) {
  throw new Error(`Expected 189 components, found ${store.index.components.length}`);
}

if (store.index.sources.map((source) => source.id).join(",") !== "beui,magicui,kibo") {
  throw new Error("Catalogue sources do not match the reviewed import set");
}

for (const summary of store.index.components) {
  const manifest = await store.get(summary.slug);
  if (!manifest) throw new Error(`Missing component manifest: ${summary.slug}`);
  for (const file of manifest.files) {
    const hash = createHash("sha256").update(file.content).digest("hex");
    if (hash !== file.sha256) {
      throw new Error(`File integrity mismatch: ${summary.slug}/${file.path}`);
    }
  }
}

const firstComponent = await store.get(store.index.components[0].slug);
if (!firstComponent) throw new Error("Catalogue is missing its first component manifest");
await store.readLicenseText(firstComponent);
process.stdout.write(
  `Verified ${store.index.components.length} MIT components across ` +
    `${store.index.categories.length} categories.\n`,
);
