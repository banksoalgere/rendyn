# MCP workstream — 29 September 2026

Status: READY_FOR_INTEGRATION — owned implementation and necessary focused verification complete; preview server and QA tab closed

## Owned changes

- `apps/web/app/mcp/page.tsx`: substantial, self-canonical `/mcp` product and workflow page. It covers access requirements, a real search → preview → retrieval example, the four tools and parameter bounds, separate Claude Code / Cursor / Codex setup and task prompts, dependency integration, troubleshooting, factual alternatives and component/runtime boundaries.
- `apps/web/app/mcp/mcp.module.css`: route-local styling that reuses the existing fonts, colors, site shell and buttons, with responsive columns, contained horizontal code/table scrolling and visible keyboard focus.
- `apps/web/app/mcp/code-example.tsx`: copyable commands/prompts with accessible labels and status feedback, plus a selectable-code fallback when clipboard writes fail.
- `apps/web/app/guides/how-to-make-claude-code-better-at-design/page.tsx`: adds one distinct component-choice section and table-of-contents entry. Replaces the illustrative Signal Button panel with the verified Approval Card example, source paths and upstream credit. Adds practical state/API/browser guidance and direct `/mcp#claude-code` links. Newly added links use the site's existing native-anchor pattern.

The guide was already modified before this work. Its starting file was copied to `/private/tmp/rendyn-seo-mcp-claude-before.tsx`, and the incremental diff was reviewed. Existing unrelated work remains intact. Shared helpers, guide registry, sitemap, header and footer were not edited. No dependencies, type checking, commits, pushes or deployment.

## Keyword groups and page mapping

These are wider English-language intent groups researched from current results and first-party documentation, not measured monthly demand, numerical difficulty or a traffic forecast. The original report and JSON evidence were read; no exact MCP/Codex component query occurred among its 113 disclosed queries.

| Intent group | Representative phrases | Page/section |
| --- | --- | --- |
| Evaluate component access through MCP | UI component MCP server; React components MCP; React component library MCP | `/mcp` hero, workflow and tools |
| Discover UI inside an editor | UI components for Claude Code; Claude Code component library; Cursor UI component library; Codex React components | Three substantial client sections within `/mcp` |
| Set up and authenticate | Claude Code remote MCP setup; Cursor MCP OAuth; Codex MCP config.toml; component MCP subscription required | `/mcp#connect` and access/troubleshooting |
| Inspect before installing | component previews for coding agents; retrieve React source through MCP; component dependencies and install instructions | `/mcp#workflow` source/preview/dependency examples |
| Choose an appropriate component server | UI component MCP workflow; registry component search; source handoff for coding agents | `/mcp#choosing`, factual first-party alternatives |
| Improve design with real component context | Claude Code component discovery; reuse UI source in Claude Code | Existing Claude guide's new section linking into `/mcp#claude-code` |

No thin client pages, competitor-alternative landing pages or MCP Apps builder pages were created. The page addresses component retrieval; it does not claim Rendyn supplies agent execution, model APIs, persistence, server authorization or the MCP Apps extension.

## Research and capability evidence

Client setup instructions were checked against current official pages on 29 September 2026:

- Claude Code HTTP/project scope and OAuth: <https://code.claude.com/docs/en/mcp>
- Cursor remote URL config, project/global config locations and OAuth: <https://cursor.com/docs/mcp>
- Codex Streamable HTTP, project/user TOML and `codex mcp login`: <https://developers.openai.com/codex/mcp/> (fetched through the official OpenAI documentation connector)
- MCP Apps, a separate interactive-host extension: <https://modelcontextprotocol.io/extensions/apps/overview>

Wider intent and alternative capabilities were researched using current search results and first-party pages:

- shadcn registry browse/search/install: <https://ui.shadcn.com/docs/mcp>
- Magic UI's own component MCP: <https://magicui.design/docs/mcp>
- 21st's preview/source/installation workflow: <https://docs.21st.dev/blog/mcp-ui-components>
- Additional Codex/Claude/Cursor setup intent surfaced in Proper UI's first-party search result: <https://properui.dev/>. Direct web fetch failed; no Proper UI claim was added to the application page.

Actual Rendyn evidence:

- `apps/api/src/server.ts` gates all `/mcp` requests on bearer authentication and trial-or-paid access. `mcp-tools/get-component.ts` performs source entitlement checks. `apps/web/lib/code-access*`, the source route and `docs/guest-code-copies.md` establish separate free website source access after login.
- `mcp-tools/search-components.ts` and `catalog-presenter.ts` confirm bounded results, match reasons, preview URLs, returned retrieval IDs and optional preview images. `catalog-navigation.ts` confirms category semantics and paging. `component-payload.ts` confirms files, dependency/install fields, hashes, repository/commit and licence text.
- Existing authenticated Rendyn MCP connection: `search_components({query: 'approval card', limit: 2})` returned `beui:approval-card` and `beui:tool-approval` with preview links. `get_component({id: 'beui:approval-card'})` returned source, shared files, dependencies, install guidance and MIT attribution. No new login, OAuth grant, trial, card collection or subscription was initiated.
- Approval Card dependency and file examples were checked against that live payload and its local manifest. Bento Grid's separate external/registry dependency commands were checked against `catalog/components/magicui-bento-grid/component.json`.

The page makes the seven-day trial's card and conversion terms explicit and links to current pricing. It does not claim exclusive MCP capabilities or exclusive upstream component source.

## Verification

Passed:

- Focused ESLint on the two new TSX files and the modified Claude guide; rerun after final native-anchor changes.
- `pnpm exec vitest run apps/api/src/search-experience.test.ts`: 1 file, 6 tests passed. Existing tests cover transport-level UI search, returned retrieval IDs, strict category filtering/recovery, no-match behavior, validation and optional images.
- `git diff --check` for owned tracked paths and incremental guide diff review.
- Reused the templates chat's existing `http://localhost:4188` preview (IPv6 loopback). An attempted separate dev launch stopped at Vinext's existing-server guard; no process was killed or restarted.
- `/mcp` returned HTTP 200 and rendered in the real in-app browser. Title, description, canonical `https://rendyn.dev/mcp`, `index, follow`, one H1 and parseable WebPage/Breadcrumb JSON-LD were inspected.
- All `/mcp` section-anchor targets exist. Desktop 1440×1000 and phone 390×844 inspection showed no page-wide horizontal overflow. Code and the tools table scroll within their own containers.
- MCP hero/client anchors changed to the intended hashes. FAQ expansion showed the correct access terms. Copy controls displayed `Copied`; keyboard navigation reached a code block with a visible focus outline. The browser clipboard reader initially returned empty text. During sequential resumption, the native macOS clipboard was read successfully and exactly matched the copied Claude Code setup command; contents were compared without printing them.
- The guide rendered its new content and `/mcp#claude-code` hrefs with its established canonical. Desktop/default and phone inspection showed no page-wide overflow. Its new Approval Card section was visually inspected. No warning/error console entries were observed on either page during successful inspections.

Screenshots:

- `/private/tmp/rendyn-mcp-desktop.png`
- `/private/tmp/rendyn-mcp-mobile.png`
- `/private/tmp/rendyn-mcp-guide-mobile.png`
- `/private/tmp/rendyn-mcp-sequential-navigation.png` (successful guide → MCP setup navigation and copy status)

Limitations / integration follow-up:

- Initial parallel-session navigation checks timed out in browser control. This is resolved: sequential resumption successfully clicked the guide link, navigated to `/mcp#claude-code` and read the destination heading. No application change was needed during resumption. The earlier timeouts do not establish a root cause in Link or the application.
- The three complete client OAuth flows were not newly exercised. Setup syntax is grounded in official documentation; existing authenticated MCP search/retrieval was exercised. No paid trial was started for testing.
- No production build was run because the collection/integration chat owns the one combined build. No ranking, demand, conversion or deployed outcome is established by local content.

## Shared integration request

Add `/mcp` to the sitemap and shared discovery/navigation under the collection workstream's ownership now that the route exists. `/mcp` links to existing catalogue/detail/design-guide pages; it does not require a collection page to render. Existing template content may also link here. The sequentially authorized MCP checks are complete. The collections/integration owner may perform its coordinated final checks and the single combined build after the parent grants its slot. No type checking or publication is authorized.

## Earlier resource-stop update (superseded by sequential resumption)

Josh requested immediate CPU/RAM relief. All tests and lint processes started by this chat had already completed; the attempted standalone dev process exited at the existing-server guard. This chat did not start the shared port-4188 server, so its owner must stop it. My temporary browser tabs were closed. No further build, test, lint or browser QA will run under this request. The guide-to-MCP click and the combined production build remain unverified. Previously completed verification above remains accurate.

## Sequential resumption completion

The parent explicitly resumed this workstream as the sole active chat. One `nice -n 15` Vinext server used `UV_THREADPOOL_SIZE=1`, `GOMAXPROCS=1`, `RAYON_NUM_THREADS=1` and `NODE_OPTIONS=--max-old-space-size=1024` on `localhost:4188`; one browser tab was used. Existing lint, six MCP tests, metadata, desktop and mobile results were reused. No full build, test suite, lint rerun, dependency installation or external authentication/payment flow ran. No application code changes were necessary.

New verification: the Claude guide's native link navigated successfully to `http://localhost:4188/mcp#claude-code`, with the expected heading “Give Claude concrete UI ingredients.” The copy button showed `Copied`, and native macOS clipboard comparison confirmed the exact command `claude mcp add --transport http rendyn --scope project https://mcp.rendyn.dev/mcp`. The browser clipboard API continued to return empty text, so native comparison was used; no unrelated clipboard contents were printed. No browser warning/error entries were observed. The dev server emitted existing missing-secret and font/public-path notices; these checks did not exercise billing or authentication.

Cleanup completed before the completion report: viewport restored, only QA tab closed (browser tab list empty), owned server gracefully interrupted (exec session 79739 exited 130), and port 4188 checked for listeners. Remaining limitations are the intentionally unexercised new client OAuth flows and the combined production build reserved for final integration.

READY_FOR_INTEGRATION
