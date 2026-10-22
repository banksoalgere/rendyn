import { sites } from '@openai/sites-vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vinext from 'vinext';
import { defineConfig } from 'vite';
import hostingConfig from './.openai/hosting.json';

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  '00000000-0000-4000-8000-000000000000';

const { d1, r2 } = hostingConfig;
const webDirectory = dirname(fileURLToPath(import.meta.url));
const previewDirectory = resolve(webDirectory, '../preview');
const previewVendorRoot = resolve(previewDirectory, 'vendor-root');

function previewAlias() {
  return {
    name: 'rendyn-preview-alias',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      const modulePath = id.split('?')[0];
      if (!modulePath.startsWith(previewDirectory) || !code.includes('@/')) return null;

      return {
        code: code.replace(/(["'])@\//g, '$1@preview/'),
        map: null,
      };
    },
  };
}

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';

const localBindingConfig = {
  // Keep this aligned with the existing production Worker. Cloudflare Workers
  // Builds rejects a connected repository when the configured name differs.
  name: 'designmcp-web',
  main: 'vinext/server/app-router-entry',
  compatibility_date: '2026-09-01',
  compatibility_flags: ['nodejs_compat'],
  secrets: {
    required: [
      'SUPABASE_SERVICE_ROLE_KEY',
      'STRIPE_SECRET_KEY',
      'STRIPE_WEBHOOK_SECRET',
      'STRIPE_PRO_MONTHLY_PRICE_ID',
      'STRIPE_PRO_YEARLY_PRICE_ID',
      'STRIPE_TEAM_MONTHLY_PRICE_ID',
      'STRIPE_TEAM_YEARLY_PRICE_ID',
    ],
  },
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: 'site-creator-d1',
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: 'site-creator-r2',
        },
      ]
    : [],
};

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import('@cloudflare/vite-plugin');

  return {
    css: { postcss: { plugins: [tailwindcss()] } },
    resolve: {
      alias: { '@preview': previewVendorRoot },
      dedupe: ['react', 'react-dom'],
    },
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      previewAlias(),
      {
        name: 'rendyn-motion-bundle',
        configEnvironment(name) {
          if (name !== 'client') return;
          // The navigation drawer shares Motion with many demos. Keep its
          // runtime together instead of fetching a dozen small shared chunks.
          return { build: { rolldownOptions: { output: { codeSplitting: { groups: [{
            name: 'motion-runtime',
            test: /\/node_modules\/(?:framer-motion|motion-dom|motion-utils|motion)\//,
            priority: 20,
          }, {
            name: 'home-ui',
            test: /\/(?:app\/components\/(?:mobile-menu|website-analytics|horizon-wall|component-preview)\.tsx|lib\/(?:analytics|analytics-privacy|preview-ready)\.ts)$/,
            priority: 30,
          }, {
            name: 'home-demos',
            test: /\/(?:app\/components\/(?:home-demo|home-component-preview)\.tsx|home-previews\/entry\.tsx)$/,
            priority: 30,
          }] } } } } };
        },
      },
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        config: localBindingConfig,
      }),
    ],
  };
});
