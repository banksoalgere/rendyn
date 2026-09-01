# HTTP and MCP surface

## Public HTTP

| Route | Purpose |
| --- | --- |
| `GET /health` | Catalogue, semantic-index, and OAuth readiness |
| `GET /api/search?q=...&limit=5&category=motion` | Unlimited search; maximum five relevant results |
| `GET /api/categories` | Categories and counts |
| `GET /api/browse/:category?cursor=...&limit=20` | Stable JSON pagination, maximum 50 |
| `GET /api/components/:slug` | Public metadata and internal preview URL |
| `GET /api/previews/contact-sheet?ids=a,b,c` | Numbered visual sheet for up to five cached previews (`image/svg+xml` in the production Worker, PNG in the local Node runtime) |
| `GET /api/components/:slug/source` | Anonymous-cookie or bearer-token quota claim and source |

Source responses use `Cache-Control: private, no-store`. Search responses never expose upstream preview/page URLs; returned previews are hosted by `PREVIEW_BASE_URL`.

## MCP

Connect an MCP host to:

```text
https://your-api.example/mcp
```

The initial unauthenticated request returns `401` with a `WWW-Authenticate` challenge pointing to `/.well-known/oauth-protected-resource/mcp`. The protected-resource document advertises Supabase Auth as the authorization server.

### `search_components`

Inputs: `query`, optional `limit` (1–5), optional `category`. Returns JSON plus cached component preview images when available.

### `get_component`

Input: catalogue ID or slug. Atomically claims access, then returns every file, external/internal dependencies, install steps, hashes, internal preview URL, exact upstream commit, and full MIT notice. The service does not inspect the agent's repository.

### `list_categories`

Returns category descriptions and counts.

### `browse_category`

Inputs: `category`, optional opaque `cursor`, optional `limit` (1–50). This is the broader JSON browse mode when the agent needs more than the default search set.
