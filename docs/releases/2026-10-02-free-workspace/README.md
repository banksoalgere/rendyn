# Free access and signed-in workspace release

Login now opens `/app`, with component discovery, source and previews, saved components, MCP setup and account settings. Prices are crossed out during the campaign and checkout sends users to login or their workspace. New access requires no card and does not create an automatically renewing subscription. Existing paid subscriptions continue on their current schedule.

The campaign grants every authenticated user complete MCP source access from 2 October through 1 November 2026, ending at midnight GMT on **2 November 2026**. Token verification, required OAuth scopes, origin checks and input validation remain enforced. The paid MCP entitlement boundary resumes at the exact end timestamp. Website source still requires verified login. Saved components are per account on the current device. No database migration or direct database mutation is required.

## Reproducing the production source

The Git branch contains the workspace implementation against the current 1,996-component development catalogue. Production deliberately retains its existing 189-component catalogue and public-page styling. The source archive in this directory contains the exact 37 changed and added files used for the production release, including compatibility with the production catalogue and its stricter existing tool validation.

1. Start with Git commit `6789dc17684eff13fa8bb3769b1322419122492b`.
2. Apply the tracked patch and extract the new-files archive from `../2026-09-30-seo-expansion`.
3. Extract `../2026-10-01-colour-only/source-changes.tar.gz`.
4. Extract `../2026-10-01-mcp-only/source-changes.tar.gz`.
5. Extract this directory's `source-changes.tar.gz`. Verify the archive and source hashes against `manifest.json`.
6. Configure the existing production public Supabase build variables without committing credentials. Run the documented release gates and build. Deploy to the existing `rendyn-mcp` and `designmcp-web` Workers with `--keep-vars`.

## Verification

All 394 production-source tests passed across 38 files. Catalogue integrity, generated Worker parity, all 189 delivery images, lint with no errors, isolated local workerd authentication denial, browser login build configuration and both deployment dry runs passed. Builds do not run type checks. Live deployment identities and behavioral checks are recorded in `manifest.json`.

Rollback targets are recorded in the manifest. No billing subscription was cancelled or modified.
