# Cloudflare Workers Builds

Rendyn deploys from this monorepo to two existing Cloudflare Workers. Connect
the repository to each Worker separately and promote only pushes to `main`.
Keep non-production branch builds disabled unless preview versions are wanted.

## Production prerequisites

Do not enable the production triggers until all of these are true:

- `supabase/migrations/20260901142848_enforce_paid_trial_access.sql` is applied
  to the production Supabase project.
- The `designmcp-web` Worker has these runtime secrets:
  `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
  `STRIPE_PRO_MONTHLY_PRICE_ID`, `STRIPE_PRO_YEARLY_PRICE_ID`,
  `STRIPE_TEAM_MONTHLY_PRICE_ID`, and `STRIPE_TEAM_YEARLY_PRICE_ID`.
- The website build has `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` as Cloudflare build variables. The
  publishable key is safe for browser use, but it must still be the intended
  production project value.
- The `rendyn-mcp` Worker retains its existing `SUPABASE_ANON_KEY` secret.

Runtime secrets belong in **Worker > Settings > Variables & Secrets**. Website
build variables belong in **Worker > Settings > Builds**. Do not commit either
set to Git.

## Website Worker

Connect the Git repository to the existing `designmcp-web` Worker with:

- Production branch: `main`
- Root directory: `/`
- Build command: `pnpm cloudflare:build:web`
- Deploy command: `pnpm cloudflare:deploy:web`
- Non-production branch builds: disabled

The build generates `apps/web/dist/server/wrangler.json`. The deploy command
uses that exact output and preserves dashboard-managed variables.

## MCP Worker

Connect the same repository to the existing `rendyn-mcp` Worker with:

- Production branch: `main`
- Root directory: `/`
- Build command: `pnpm release:check`
- Deploy command: `pnpm cloudflare:deploy:mcp`
- Non-production branch builds: disabled

## Release verification

After the first successful builds, verify the website, pricing and login routes,
then run the hosted OAuth-to-tool check documented in `README.md`. A successful
Cloudflare build proves deployment, not signed-in MCP access or Stripe webhook
delivery.

## Review-fix release prerequisites

Apply migration `20260921111026_harden_billing_attempts_and_events.sql` through the normal migration pipeline before releasing the billing routes. It adds server-only checkout attempts and webhook event leases; it does not modify existing subscriptions.

Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for the website. The release guard validates this login configuration without printing values. Code access requires a verified login; no guest-copy signing secret is needed. Both Workers now use the shared tests, catalogue integrity, delivery-image and lint gates. Builds do not run type checks.

An uncertain Checkout creation is replayed with its original parameters and key. If its session ID was never recorded and its fixed expiry has passed, the route fails closed rather than risking a second trial. Reconcile that attempt with Stripe and record the verified session ID using an approved server-side operation before retrying. Never clear an unresolved attempt blindly.

Catalogue imports now stage all sources and the preview runtime, validate them, and promote outputs with rollback on rename failure. Use `pnpm catalog:import`; direct source importer entry points deliberately refuse to replace the live catalogue. Failed staging directories are retained for inspection. After an interrupted import, check the retained `.previous` outputs before removing its `.catalog-import-lock`.

`pnpm catalog:screenshots` waits for the actual loaded demo and captures at most three pages concurrently, then generates optimised delivery PNGs. Set `PREVIEW_SLUGS` to capture only changed components. `pnpm catalog:images` can regenerate delivery PNGs from existing originals without opening a browser. Preview runtime transformations are reproducible in `scripts/lib/catalog-import/preview-transforms.ts`; installable catalogue source and licence hashes are unchanged.

`pnpm test:worker` starts an isolated local workerd instance with dummy authentication configuration, verifies public metadata/search, conditional responses, contact-sheet delivery and authentication denial, then stops it. It is included in both release gates and makes no deployment or authenticated provider request.
