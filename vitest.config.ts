import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      '@/lib/agent-guides': new URL('./apps/preview/vendor-root/lib/agent-guides.ts', import.meta.url).pathname,
    },
  },
  test: {
    include: ["packages/**/*.test.ts", "apps/**/*.test.ts", "scripts/**/*.test.ts"],
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
    },
  },
});
