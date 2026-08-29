# DesignMCP

DesignMCP is a commercial, agent-first catalogue of high-quality React, TypeScript, and Tailwind UI source. Agents search by intent, inspect internally hosted previews, and unlock complete copy-paste implementations without reading or modifying the user's repository.

The current snapshot contains every one of beUI's 80 free MIT registry entries at commit `afba7fa055ddc589823d658f300a3b2b9fa7b305`:

- 41 motion components
- 17 agent-interface components
- 22 product blocks
- 80 interactive internal preview routes and cached preview images

## What is built

- Remote MCP over Streamable HTTP at `/mcp` with `search_components`, `get_component`, `list_categories`, and `browse_category`.
- OAuth 2.1 protected-resource discovery for browser-based MCP login through Supabase Auth.
- Hybrid lexical/vector search with a relevance cutoff, maximum five results, and MMR-style diversity.
- Hosted OpenAI embeddings. The provider performs tokenization/vectorization; no local model or vector database is required.
- Public search, category browsing, component metadata, interactive previews, and numbered PNG contact sheets.
- Complete source retrieval with dependencies, install instructions, content hashes, source revision, and the full MIT notice.
- Transaction-safe quota claims: four anonymous lifetime unlocks, four account signup unlocks, then four unique components per calendar month starting the next month. Existing unlocks remain accessible. Active paid subscriptions are unrestricted.
- A pinned importer that rejects registry drift, non-MIT input, unsafe paths, and source that does not match the exact Git revision plus beUI's own provenance-banner transform.

## Why this backend

The catalogue is versioned data in Git, not a database table. With roughly 100 items, loading the index in memory and calculating exact cosine similarity is faster, simpler, and easier to audit than operating a vector database. Supabase is used where a database is genuinely useful: OAuth identities, subscription state, and atomic entitlement accounting. Hono and the official MCP TypeScript SDK provide the remote HTTP service; Next.js hosts the internal interactive previews.

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

Before authenticated source retrieval works, fill the Supabase variables in `.env`. For deployed MCP login, enable Supabase's OAuth 2.1 Server and dynamic client registration, configure an asymmetric signing key, and point its authorization path at the consent screen described in [OAuth setup](docs/oauth-setup.md).

To create the semantic component index:

```bash
OPENAI_API_KEY=... pnpm catalog:embed
```

The static index is generated once per catalogue revision. Runtime search sends only the user's short search query for embedding. If the key or static vector index is absent, search falls back to deterministic lexical matching.

## Catalogue operations

```bash
pnpm catalog:import       # pinned import; fails if upstream drifted
pnpm catalog:verify       # integrity, count, path, and licence checks
pnpm catalog:screenshots  # refresh all internal preview PNGs
pnpm test
```

Updating beUI is intentionally manual: review the new upstream commit and registry, update [sources/beui.json](sources/beui.json), then run the import, verification, preview capture, and tests. The importer never silently follows `main`.

## Remaining integration work

The backend seams are ready, but these intentionally belong to the separate human-facing application task:

- Supabase login and OAuth consent pages
- pricing/checkout and the billing webhook that writes `subscriptions`
- the public landing page and component gallery
- production hosting, edge rate limits, analytics, and alerts

Do not expose `SUPABASE_SERVICE_ROLE_KEY` to either browser application.

## Licence

DesignMCP's own code has not yet been assigned a distribution licence. Imported beUI files retain the upstream MIT notice in [catalog/source/beui/LICENSE](catalog/source/beui/LICENSE). See [Catalogue policy](docs/catalog-policy.md) before adding another source.
