# White theme and Rendyn logo release

Published to https://rendyn.dev on 22 September 2026.

- Worker: `designmcp-web`
- Current version: `697e7918-cabd-4d56-a79b-c9c9b77e4716`
- Initial white-theme version: `713f250a-88a6-4585-8c32-50a0f89eaf57`
- Previous version: `92868fb8-96a4-489f-ab9e-c0ee4df156e5`
- Source baseline: deployed commit `7bf0b2d`
- Exact source change: `2026-09-22-white-theme-logo.patch` in this directory

The release was built in an isolated archive of the deployed commit with its
frozen lockfile. Only the theme, logo, favicon, logo references and mobile menu numbering were changed.
The shared checkout also contained pending billing, code-access, analytics,
dependency and preview changes; those were not included. Existing email login,
checkout and webhook behavior were preserved. No database changes were applied.

The generated Wrangler configuration had its obsolete `legacy_env: true` default
removed so the installed Wrangler 4.135.0 could preview and deploy the bundle.
Deployment used `--keep-vars`; existing runtime variables and secrets were retained.

## Verification

- 19 test files / 94 tests passed.
- Catalogue validation passed for 189 MIT components; Worker catalogue parity passed.
- Web lint: no errors, six existing image-element warnings.
- Production build and deployment dry run passed. No type checking was run.
- Built release visually checked on the homepage and authenticated account page.
- Live homepage confirmed white background and the new SVG mark.
- Live favicon bytes matched the replacement asset exactly.
- Live component search for `tabs`: 21 matches, with Tabs first.
- Live pricing switched from monthly to yearly ($150/year Pro).
- Live mobile menu opened correctly at 390px and closed successfully.
- A MutationObserver console error occurred during live catalogue browsing;
  search completed successfully. Its source was not established in this visual release.
- A supplemental Python HTTP check received 403; live browser checks above succeeded.

This verifies the visual release and representative navigation, not a new
end-to-end billing or MCP authorization test.

## Mobile menu follow-up

Published version `697e7918-cabd-4d56-a79b-c9c9b77e4716` removes the numeric
prefixes from primary navigation and component links, along with their unused
grid columns. Category counts remain visible. The patch above includes this update.

- Targeted ESLint, production build and deployment dry run passed.
- Built mobile menu verified at 390px; Pricing navigation worked.
- Live mobile menu visually and semantically verified with unnumbered links.
- No type checking or additional test suite run for this markup and spacing change.
