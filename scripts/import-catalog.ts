import { runBeuiImport } from "./import-beui.js";
import { runExternalImports } from "./import-external-sources.js";

await runBeuiImport();
await runExternalImports();
