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
- Build command: `pnpm check`
- Deploy command: `pnpm cloudflare:deploy:mcp`
- Non-production branch builds: disabled

## Release verification

After the first successful builds, verify the website, pricing and login routes,
then run the hosted OAuth-to-tool check documented in `README.md`. A successful
Cloudflare build proves deployment, not signed-in MCP access or Stripe webhook
delivery.
