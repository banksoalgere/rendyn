# Architecture and decisions

## Shape of the system

```text
AI coding agent
      |
      | OAuth 2.1 + MCP Streamable HTTP
      v
Native Cloudflare Worker / MCP resource server ---> OpenAI Embeddings (optional)
      |                                               query vector only
      |
      +----> versioned catalogue files
      |       source, metadata, vectors, screenshots
      |
      +----> internal Next.js previews
      |
      +----> Supabase Auth + Postgres
              users, subscriptions, atomic unlocks
```

## Code boundaries

The repository keeps orchestration thin and puts behavior behind explicit module boundaries:

- `packages/catalog` owns catalog types, runtime schemas, safe path resolution, indexed lookup, pagination, search, and validated filesystem/snapshot loading. Every catalog or embedding JSON file is validated before use.
- `apps/api/src/routes` owns HTTP transport only. Shared catalog response shaping lives in `catalog-presenter.ts`, so HTTP and MCP return the same public representation.
- `apps/api/src/mcp.ts` only creates the MCP server. Each tool lives under `apps/api/src/mcp-tools`, grouped into search, source retrieval, and catalogue navigation.
- `apps/api/src/entitlements.ts` owns Supabase quota claims and validates complete RPC responses before returning them to a route or MCP tool.
- `scripts/import-catalog.ts` coordinates the beUI base import and the Magic UI/Kibo UI adapters. Fetch limits, URL/path policy, external schemas, metadata extraction, concurrency, pinned-repository handling, licence checks, and component assembly live in focused import modules.
- `apps/web/app/page.tsx` composes independent landing-page sections from `apps/web/app/components`. It stays an independent deployable package while its source is versioned with the rest of the monorepo.

Imported files under `catalog/components` and `apps/preview/vendor-root` are generated from the pinned upstream revision. Refactor the importer or preview shell, not the vendored implementation, unless the source revision is deliberately updated.

## Suggested reading order

Start with these files when tracing a request:

1. `apps/api/src/server.ts` creates the services and connects the HTTP and MCP transports.
2. `apps/api/src/routes` or `apps/api/src/mcp-tools` validates the incoming request.
3. `apps/api/src/catalog-service.ts` chooses semantic search or its lexical fallback.
4. `packages/catalog/src/search.ts` is the ranking pipeline. Its `search/scoring.ts` and `search/diversity.ts` modules own scoring and result variety; `packages/catalog/src/store.ts` reads validated catalogue data.
5. `apps/api/src/entitlements.ts` claims access before complete source is returned.

For catalogue updates, start at `scripts/import-catalog.ts`. `import-beui.ts` rebuilds the base snapshot; `import-external-sources.ts` applies the reviewed Magic UI and Kibo UI adapters; `component-source.ts` verifies beUI input; and `component-manifest.ts` builds shared catalogue records.

## Why catalogue files, not Postgres/pgvector

The catalogue has 189 items. An exact scan of 189 vectors is negligible, while a database search layer adds migrations, network latency, operational state, and a second copy of the catalogue. Keeping the source, metadata, hashes, embeddings, and preview cache together makes each release atomic and reviewable.

This changes when the data actually demands it. A move to pgvector or a hosted search service becomes sensible when the index grows into many thousands of items, multiple catalogue workers must update it independently, or per-user/private catalogue data appears. None is true for this MVP.

## Why Supabase remains the backend of record

Supabase solves the stateful commercial concerns cleanly:

- OAuth 2.1/OIDC authorization-code flow with PKCE for MCP browser login
- dynamic client registration for compatible MCP hosts
- asymmetric JWTs that the MCP service validates locally through JWKS
- row-level security for account data
- PostgreSQL transactions and advisory locks for quota claims

The MCP service is a protected resource server. It validates access tokens but never issues or refreshes them.

## Why no generative inference in search

The initial search path is:

1. Validate and normalize the natural-language query.
2. Ask the hosted embedding model for one query vector.
3. Combine cosine similarity with strong lexical/name/use-case signals.
4. Apply a component-family gate when the query names one.
5. Reject candidates below the relevance threshold.
6. Select up to five with maximal-marginal-relevance diversity.

There is no token-by-token generation or LLM reranker, so temperature and top-p do not apply. This keeps latency and cost predictable. A generative reranker can be added later if measured search failures justify it.

## Why Hono, MCP SDK v2, and a native Worker

The official MCP TypeScript SDK v2 provides the current Streamable HTTP protocol, tool validation, bearer challenges, and request-local auth context. Hono gives a small web-standard API surface and host/origin protection. Production runs directly in a Cloudflare Worker: a generated, validated catalogue snapshot ships in the Worker bundle and preview PNGs use a static-assets binding. The local Node runtime keeps filesystem loading and Sharp contact sheets for development without putting those dependencies in the production bundle.

## Why a separate preview renderer

Preview code is executable UI, while the API handles secrets and entitlements. Keeping them separate means:

- preview routes never receive Supabase service credentials;
- the preview service can have a stricter CSP and independent scaling;
- source/API deployments are not coupled to Next.js rendering;
- the human-facing site can embed the same internal preview URLs later.

The importer copies only the pinned component runtime, selected preview modules, shared libraries, CSS, and required public assets. It excludes marketing pages, documentation applications, tests, build files, MCP servers, and any registry item without source at the pinned commit.

## Commercial access model

Anonymous browser identity is a signed, HTTP-only cookie. It receives four unique lifetime component unlocks. Creating an account supplies four further signup unlocks. Recurring free allowance begins on the first day of the following calendar month and supplies four unique components each month. An unlock is permanent, so asking for the same component again never spends another allowance.

The database claim functions take a per-identity transaction lock before counting/inserting. Concurrent agent requests cannot exceed a quota. Active or trialing paid subscriptions bypass the free allowance; `$9/month` checkout and provider webhooks remain a frontend/billing integration.
