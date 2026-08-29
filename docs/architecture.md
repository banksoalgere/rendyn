# Architecture and decisions

## Shape of the system

```text
AI coding agent
      |
      | OAuth 2.1 + MCP Streamable HTTP
      v
Hono API / MCP resource server --------> OpenAI Embeddings
      |                                  query vector only
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

- `packages/catalog` owns catalog types, runtime schemas, safe path resolution, indexed lookup, pagination, and search. Every catalog or embedding JSON file is validated before use.
- `apps/api/src/routes` owns HTTP transport only. Shared catalog response shaping lives in `catalog-presenter.ts`, so HTTP and MCP return the same public representation.
- `apps/api/src/entitlements.ts` owns Supabase quota claims and validates complete RPC responses before returning them to a route or MCP tool.
- `scripts/import-beui.ts` coordinates imports. Fetch limits, URL/path policy, external schemas, metadata extraction, concurrency, pinned-repository handling, and component assembly live in focused modules under `scripts/lib/catalog-import`.
- `apps/web/app/page.tsx` composes independent landing-page sections from `apps/web/app/components`. The Site is its own nested source repository because Sites publishes that application independently from the API monorepo.

Imported files under `catalog/components` and `apps/preview/vendor-root` are generated from the pinned upstream revision. Refactor the importer or preview shell, not the vendored implementation, unless the source revision is deliberately updated.

## Why catalogue files, not Postgres/pgvector

The first catalogue has 80 items. An exact scan of 80 vectors is negligible, while a database search layer adds migrations, network latency, operational state, and a second copy of the catalogue. Keeping the source, metadata, hashes, embeddings, and preview cache together makes each release atomic and reviewable.

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

## Why Hono, MCP SDK v2, and Node

The official MCP TypeScript SDK v2 provides the current Streamable HTTP protocol, tool validation, bearer challenges, and request-local auth context. Hono gives a small web-standard API surface and host/origin protection. Node is used because the service reads a versioned file catalogue and creates PNG contact sheets with Sharp.

## Why a separate preview renderer

Preview code is executable UI, while the API handles secrets and entitlements. Keeping them separate means:

- preview routes never receive Supabase service credentials;
- the preview service can have a stricter CSP and independent scaling;
- source/API deployments are not coupled to Next.js rendering;
- the human-facing site can embed the same internal preview URLs later.

The importer copies only the pinned component runtime, preview modules, shared libraries, CSS, and public assets. It excludes beUI's marketing pages, docs app, tests, build files, and MCP server.

## Commercial access model

Anonymous browser identity is a signed, HTTP-only cookie. It receives four unique lifetime component unlocks. Creating an account supplies four further signup unlocks. Recurring free allowance begins on the first day of the following calendar month and supplies four unique components each month. An unlock is permanent, so asking for the same component again never spends another allowance.

The database claim functions take a per-identity transaction lock before counting/inserting. Concurrent agent requests cannot exceed a quota. Active or trialing paid subscriptions bypass the free allowance; `$9/month` checkout and provider webhooks remain a frontend/billing integration.
