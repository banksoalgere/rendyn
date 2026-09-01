import { resolve } from "node:path";
import { CatalogStore } from "@rendyn/catalog";
import { readConfig, type AppConfig } from "./config.js";
import { createNodePreviewMedia } from "./contact-sheet.js";
import { buildApp } from "./server.js";

export async function buildNodeApp(config: AppConfig = readConfig()) {
  const store = await CatalogStore.load(resolve(import.meta.dirname, "../../../catalog"));
  return buildApp(config, { store, previewMedia: createNodePreviewMedia(store) });
}
