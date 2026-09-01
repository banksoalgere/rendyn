import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parseCatalogIndex, type EmbeddingIndex } from "@rendyn/catalog";

const ROOT = resolve(import.meta.dirname, "..");
const MODEL = process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small";
const API_KEY = process.env.OPENAI_API_KEY;
const BATCH_SIZE = 80;

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

if (!API_KEY || API_KEY.length < 20) {
  throw new Error("OPENAI_API_KEY is required to build the hosted embedding index");
}

const catalogPath = resolve(ROOT, "catalog/index.json");
const rawCatalog = await readFile(catalogPath, "utf8");
const catalog = parseCatalogIndex(JSON.parse(rawCatalog));
const vectors: Record<string, number[]> = {};

for (let offset = 0; offset < catalog.components.length; offset += BATCH_SIZE) {
  const batch = catalog.components.slice(offset, offset + BATCH_SIZE);
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      input: batch.map((component) => component.metadata.searchText.slice(0, 24_000)),
      encoding_format: "float",
    }),
  });
  if (!response.ok) {
    throw new Error(`Embedding request failed (${response.status}): ${(await response.text()).slice(0, 500)}`);
  }
  const payload = (await response.json()) as {
    data?: Array<{ index: number; embedding: number[] }>;
  };
  if (!payload.data || payload.data.length !== batch.length) {
    throw new Error("Embedding provider returned an unexpected number of vectors");
  }
  for (const item of payload.data) {
    const component = batch[item.index];
    if (!component || !Array.isArray(item.embedding) || item.embedding.some((value) => !Number.isFinite(value))) {
      throw new Error("Embedding provider returned malformed vector data");
    }
    vectors[component.slug] = item.embedding;
  }
  process.stdout.write(`Embedded ${Math.min(offset + batch.length, catalog.components.length)}/${catalog.components.length}\n`);
}

const firstVector = Object.values(vectors)[0];
if (!firstVector) throw new Error("No vectors generated");
const output: EmbeddingIndex = {
  schemaVersion: 1,
  model: MODEL,
  dimensions: firstVector.length,
  generatedAt: new Date().toISOString(),
  catalogIntegrity: sha256(rawCatalog),
  vectors,
};
await writeFile(resolve(ROOT, "catalog/embeddings.json"), `${JSON.stringify(output)}\n`);
