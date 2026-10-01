# Seven MIT library integrations

Verified on 1 October 2026. This integration adds 28 selected entries, four from each of shadcn/ui, Origin UI, Material UI, Mantine, Ant Design, Chakra UI and HeroUI. The catalogue now contains 217 components from ten sources.

The new entries appear in the website catalogue, component detail pages, search, the shared MCP catalogue and its generated Worker snapshot. `/libraries` groups them by library, links to the upstream projects and distinguishes copied primitives from examples using official packages. The footer and MCP guide link to that page; the sitemap includes it and all component pages.

## Source and installation

`sources/libraries.json` pins every upstream revision, MIT notice and imported file hash. The importer rejects changed bytes, undeclared package imports and incomplete copied aliases. Origin UI imports are confined to `apps/origin`, whose notice is MIT; the repository's AGPL directories are excluded.

shadcn/ui and Origin UI entries include their primitive dependency closure. The five package libraries include official examples, pinned dependency commands and provider setup. HeroUI uses the compatible 2.8.10 API and a direct 2.4.26 theme dependency. Its examples return a scoped stylesheet so shared Tailwind semantic tokens resolve to HeroUI colours inside that example. The preview shell scans the direct theme dependency and loads the official plugin.

`pnpm catalog:import:libraries` reimports these seven sources through transactional staging, preserves the other catalogue sources and regenerates the Worker snapshot. Repeated imports retained exactly 217 distinct components.

## Verification

- Full suite: 33 files, 413 tests passed (`tests.log`).
- Catalogue: 217 MIT components; new source revisions, upstream file hashes and notice hashes verified.
- Worker snapshot parity passed; source-bundle integration tests retrieve every new component with installation instructions and its MIT copyright notice.
- Production website build passed (`build.log`); no type check was run.
- Web lint passed with six existing image warnings (`lint.log`).
- Local workerd passed health, metadata, search, conditional caching, contact sheet and authentication-denial checks (`worker.log`). The harness explicitly disables unrelated dotenv loading while retaining production HTTPS and authentication validation.
- All 28 production previews rendered without fallback and were captured (`previews.json` and `catalog/previews`). All 217 delivery thumbnails were generated and verified.
- Representative interactions passed for each of the seven libraries (`interactions.json`).
- HeroUI primary button computed as rgb(0, 111, 238), with 12px corner radius after the theme fix.
- Library page at 390px: seven headings, 28 cards, no horizontal overflow (`mobile.json`, `libraries-mobile.png`).
- Existing Approval Card rendered and enabled its Next question action after selection (`legacy-preview.json`).

The build still reports some chunks over 500 kB. Initial development dependency optimization caused reloads and temporary hook errors; final browser checks used the production build. This is a local integration, not a deployment. The previous SEO release was deployed separately. No Git commit/push or database change was made for this integration. Owned preview servers and tabs were cleaned up.
