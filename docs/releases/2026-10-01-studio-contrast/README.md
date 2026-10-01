# Studio contrast website release

Reconstructed the deployed SEO release 87f47c94-ce9b-433d-a265-b76c142c70f3 from commit 6789dc17684eff13fa8bb3769b1322419122492b and its saved SEO release patch/archive, then applied only the 20 theme and MCP presentation files recorded in manifest.json. source-changes.tar.gz contains only these source files. Unrelated checkout changes are excluded.

Validation: 377 tests across 35 files passed; catalogue and Worker parity checks passed for the existing 189 components; 189 preview images verified; ESLint passed with existing image warnings; local Worker checks passed; production build, public login configuration verification, and Cloudflare deployment dry run passed. No type checking ran. Built MCP client switches to Cursor and Codex verified in the browser.

Deployment uses generated server wrangler config and --keep-vars. No database, billing, API/MCP Worker changes are included.

Published 2026-10-01: Cloudflare confirmed 100% on version d9c68e02-7ce7-4c7b-986c-65162cb016dc. Live homepage and MCP screenshots saved. Public MCP renders nine SVG illustrations with charcoal accent; Cursor/Codex switching and copy status verified. Public pricing, catalogue, Cursor guide and AI agent collection render one H1, expected canonical, charcoal accent and no desktop overflow. Existing signed-in browser login redirects to account as expected. Public login bundles match configured build values. Anonymous component source returns 401 and private, no-store.

Known limitation: the previously recorded intermittent MutationObserver non-Node console error recurred during live browser navigation. Verified page rendering and MCP client interactions still pass. The viewport override did not alter the browser width in this run, so live mobile verification is not claimed. Local responsive checks were recorded before release.
