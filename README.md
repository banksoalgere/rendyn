# Rendyn

Rendyn is a commercial, agent-first catalogue of high-quality React, TypeScript, and Tailwind UI source. Agents search by intent, inspect internally hosted previews, and unlock complete copy-paste implementations without reading or modifying the user's repository.

The current snapshot contains 189 verified MIT components from three immutable sources:

- 80 beUI entries at `afba7fa055ddc589823d658f300a3b2b9fa7b305`
- 68 source-backed Magic UI entries at `2d671cc6c0e0f40e28682c9cbddd16694dcfe627`
- 41 Kibo UI packages at `3d63cdb15b79d972e3dc38a10997987672f9b263`
- 109 motion components
- 17 agent-interface components
- 63 product blocks
- 189 internal preview routes and cached preview images

Seven Magic UI registry records are deliberately excluded because their files are absent from the pinned commit. Animate UI was reviewed but not imported: its pinned licence adds the Commons Clause and prohibits the source redistribution this product performs. Both decisions are recorded under `sources/` and fail closed if upstream state changes.

## What is built

- Remote MCP over Streamable HTTP at `/mcp` with `search_components`, `get_component`, `list_categories`, and `browse_category`.
- OAuth 2.1 protected-resource discovery for browser-based MCP login through Supabase Auth.
- Hybrid lexical/vector search with a relevance cutoff, maximum five results, and MMR-style diversity.
- Deterministic lexical search, with optional hosted OpenAI query embeddings when a matching generated embedding snapshot is present. No vector database is required.
- Public search, category browsing, component metadata, interactive previews, and numbered visual contact sheets.
- Complete source retrieval with dependencies, install instructions, content hashes, source revision, and the full MIT notice.
- Free public component source, previews and installation instructions without sign-up.
- Free MCP access with a verified OAuth account, required scopes and explicit client consent. No payment or expiry date.
- New paid checkout is disabled. Signature-verified webhooks and the billing portal remain available for managing existing subscriptions; those subscriptions are not automatically cancelled.
- A pinned multi-source importer that rejects registry drift, modified MIT grants, Commons Clause input, unsafe paths, missing source, and unreviewed transformations.

## Why this backend

The catalogue is versioned data in Git, not a database table. With 189 items, loading the index in memory and calculating exact cosine similarity is faster, simpler, and easier to audit than operating a vector database. Supabase is used where a database is genuinely useful: OAuth identities and legacy subscription state. Free component and MCP access does not query or mutate billing entitlements. Hono and the official MCP TypeScript SDK provide the remote HTTP service; Next.js hosts the internal interactive previews.

See [Architecture](docs/architecture.md) for the full decision record.

## Local setup

```bash
pnpm install
cp .env.example .env
supabase start
supabase db reset
pnpm dev
```

The API runs on `http://localhost:8787`; the internal preview renderer runs on `http://localhost:3100`.

Public source retrieval needs no authentication configuration. Before MCP login works, fill the Supabase variables in `.env`. For deployed MCP login, enable Supabase's OAuth 2.1 Server and dynamic client registration, configure an asymmetric signing key, and point its authorization path at the consent screen described in [OAuth setup](docs/oauth-setup.md).

To create the semantic component index:

```bash
OPENAI_API_KEY=... pnpm catalog:embed
```

The static index is generated once per catalogue revision. Runtime search sends only the user's short search query for embedding. If the key or static vector index is absent, search falls back to deterministic lexical matching.

## Catalogue operations

```bash
pnpm catalog:import       # pinned import; fails if upstream drifted
pnpm catalog:verify       # integrity, count, path, and licence checks
pnpm catalog:worker:generate # refresh the native Worker catalogue snapshot
pnpm catalog:screenshots  # refresh all internal preview PNGs
pnpm test
```

Updating any source is intentionally manual: review its new commit, registry or package inventory, licence, missing-file set, and transformations; update the matching file under `sources/`; then run import, verification, preview capture, and tests. The importer never silently follows a default branch.

## Production status

The website is public at `https://rendyn.dev`, and the native Cloudflare MCP service is live at `https://mcp.rendyn.dev/mcp`. Production health, catalogue search, preview media, protected-resource discovery, Google provider configuration, ES256 signing, and dynamic client registration are live.

The free-access changes described above are local source changes until both the website and MCP Workers are deployed. Release verification still needs:

- complete one real hosted MCP authorization/tool run from a signed-in account
- edge rate limits, analytics, and alerts

The website Worker uses `SUPABASE_SERVICE_ROLE_KEY` only in its server-side, signature-verified Stripe webhook. Never expose it through a `NEXT_PUBLIC_` variable or browser bundle. The MCP Worker does not receive a service-role key.

Production pushes are configured through [Cloudflare Workers Builds](docs/cloudflare-builds.md). Keep the production branch limited to `main` and satisfy the documented database and secret prerequisites before enabling its first deployment.

## Licence

Rendyn's own code has not yet been assigned a distribution licence. Imported files retain the separate beUI, Magic UI, and Kibo UI notices under `catalog/source/`. See [Catalogue policy](docs/catalog-policy.md) before adding another source.
