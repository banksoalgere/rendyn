# SEO expansion release — 30 September 2026

Published to https://rendyn.dev on the existing `designmcp-web` Worker.

- Version: `87f47c94-ce9b-433d-a265-b76c142c70f3`
- Previous version: `37899002-4ca0-4cd8-8937-5e2bf8449136`
- Source baseline: deployed commit `6789dc17684eff13fa8bb3769b1322419122492b`
- Reproduction: apply `tracked.patch` to that baseline and extract `new-files.tar.gz` into the repository root. `manifest.json` lists the exact included files.

Includes the MCP landing page, AI agent UI and animated React collections, expanded Cursor and Claude Code template articles, ten component editorials, supporting Claude design guidance, navigation and sitemap registration. Updates the existing sitemap test's expected URLs to include the three new routes without relaxing its checks.

Built in an isolated archive of the deployed source. Dependencies were reused from the existing installation after confirming identical lockfiles. Existing deployed authentication, billing, code-access and preview behavior was preserved. The shared dirty checkout was not committed, pushed or reset. No database changes or MCP deployment occurred. Deployment used `--keep-vars`.

## Verification

- 35 test files, 377 tests passed.
- Catalogue, Worker catalogue parity and delivery-image checks passed.
- Web lint passed with six existing image-element warnings.
- Local Worker checks passed: metadata, search, conditional responses, contact sheet and anonymous access denial.
- Production build, build-time public login configuration checks and deployment dry run passed. No type checking ran.
- Built HTTP checks passed for 18 routes and 208 unique sitemap URLs.
- Live browser DOM verified metadata on the same 18 routes: one H1, expected canonical and index/follow or filtered noindex/follow directives.
- Live sitemap fetched with curl HTTP 200: 208 unique URLs, no query URLs.
- Site navigation opened the MCP and AI agent collection pages. The live approval preview loaded, accepted a selection and advanced to question two. Desktop collection had no page-wide overflow. `live-collection.png` records the settled page.

The existing intermittent MutationObserver non-Node console error recurred without a stack/source URL. Rendering and the tested interaction succeeded; its cause remains unresolved. Supplemental Python HTTP requests returned 403 and the in-app browser could not reach the local server; live verification used the browser and curl instead. No new payment or OAuth transaction was exercised, and no search-ranking improvement is claimed.

Source and verification evidence are in this directory. Local preview process was stopped after checks. GitHub fetch returned repository-not-found with the active account even under elevated access; this release was deployed directly through authenticated Cloudflare from the verified live baseline.
