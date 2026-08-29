import { loadEnvFile } from "node:process";
import { resolve } from "node:path";
import { serve } from "@hono/node-server";

try {
  loadEnvFile(resolve(import.meta.dirname, "../../../.env"));
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
}

const [{ readConfig }, { buildApp }] = await Promise.all([
  import("./config.js"),
  import("./server.js"),
]);
const config = readConfig();
const app = await buildApp(config);

serve({ fetch: app.fetch, port: config.PORT, hostname: "0.0.0.0" }, (info) => {
  process.stdout.write(`DesignMCP API listening on http://localhost:${info.port}\n`);
});
