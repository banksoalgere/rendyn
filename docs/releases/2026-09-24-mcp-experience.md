# Rendyn release — 24 September 2026

## Scope

Released only to the personal Rendyn resources:

- GitHub: `banksoalgere/rendyn`, branch `release/rendyn-mcp-20260924`.
- Cloudflare account: `cc93f4df3977dcdc3791e18a5214dc9c`.
- Supabase: `vgihvrqelwuenfumnugw`, organisation `xbmwqzcungyqaprziljx`.

The shared dirty checkout was preserved. No work projects, authentication-provider
settings, or MFA settings were changed. The release branch was pushed; `main`
was not merged or deployed through a Git build trigger.

## Production versions

| Surface | Source commit | Active Worker version | Previous version for rollback |
| --- | --- | --- | --- |
| Website, `designmcp-web` | `6789dc17684eff13fa8bb3769b1322419122492b` | `37899002-4ca0-4cd8-8937-5e2bf8449136` | `faf19abe-f87f-4198-9f3a-aa465f7128e0` |
| MCP, `rendyn-mcp` | `e57d569e8cdac9a23901cf65c57db3374c6168e6` | `0bfd3f90-3956-4f0d-8036-bfdcbfe3695b` | `f1aa47f9-f98e-409a-9a58-99d8d71035b5` |

Website deployment `12997a3c-6f21-4920-b44c-b1a20c3151bc` became active at
`2026-09-24T21:33:42.994496Z`, with 100% traffic. MCP deployment
`bdd0bc0e-1b60-4523-9786-b59e67063cd7` remained active at 100% after the database
migration. Both used the existing personal account and preserved runtime secrets.

## Database migration

After explicit approval and a dry run showing exactly one pending migration,
Supabase CLI applied `20260921111026_harden_billing_attempts_and_events.sql`.
Reviewed SHA-256:
`d8455e27a576dafcd7f56ea84b210a465aa9c96315680e0bca17c583566368f7`.

Read-only SQL subsequently verified:

- All three migration versions are recorded: `20260829195538`,
  `20260901142848`, and `20260921111026`.
- Checkout attempts, webhook leases, and webhook events have RLS enabled and no
  direct `anon` or `authenticated` table access.
- All six new billing functions, plus `sync_stripe_subscription`, deny browser
  roles and allow `service_role`, with an empty function search path.

The migration adds durable coordination state; it does not change existing
subscription rows or prices. CLI reported a local migration-catalogue cache
warning because Docker was stopped; remote application and schema verification
succeeded. Docker was not started.

## Website release fix

The final artifact check caught a dynamic `process.env` alias preventing public
Supabase configuration from being inlined into browser code. Commit `6789dc1`
uses direct references while retaining validation, and adds a post-build guard
that requires the intended public configuration in the actual client bundles.
The new guard rejected the old artifact before the corrected build passed.

## Verification

- `pnpm cloudflare:build:web`: 35 test files, 377 tests passed; 189 MIT components,
  Worker catalogue, and delivery previews verified; local workerd checks passed.
- No typechecking. ESLint had zero errors and six existing image warnings.
- Deployment dry run passed. The deployed login JavaScript exactly matched the
  tested local artifact by SHA-256.
- Live homepage, pricing, login, Bento Grid detail, and preview routes returned
  200. The white/charcoal homepage was visually checked before and after release.
- The website detail/source slug is `bento-grid`; its separate preview ID is
  `magicui-bento-grid`.
- Anonymous source retrieval returned 401 with `private, no-store` and
  `Vary: Cookie`. Invalid-origin checkout returned 403; unauthenticated checkout
  redirected to login; unsigned webhook requests returned 400.
- In-browser Start trial navigated to pricing. The personal signed-in account's
  Pro button rejected a second trial with `trial_used`; the account page showed
  its existing active Pro trial and first charge on 30 September 2026.
- The signed-in Bento Grid Code tab loaded source, installation instructions,
  and MIT licence controls. No browser console errors were recorded in that tab.
- Native MCP search selected `magicui:bento-grid` for a responsive product-feature
  grid brief. Authenticated `get_component` returned its source with allowed
  access and `newly_unlocked: false` after the migration.

No new Checkout session, subscription, charge, or live Stripe webhook replay was
deliberately created during verification. Successful deployment and these checks
do not constitute a fresh end-to-end payment test.

## Rollback

If a website regression requires rollback, deploy the previous website Worker
version listed above on the same personal account. Keep the additive billing
migration in place; do not drop its tables, repair migration history, or clear
checkout attempts as part of a website rollback.
