# Rendyn SEO expansion — shared coordination

## Sequential resumption — latest user instruction

Josh has now authorized resuming these four chats strictly ONE AT A TIME because concurrent work exhausted laptop RAM and CPU. The parent chat (01a0ed52-e140-7eb2-9bf5-e122d9708ab2, local) grants the active slot, waits for completion and cleanup, then starts the next chat. Order: templates, components, MCP, collections/final integration. Only the explicitly resumed chat may work; all others remain idle. Do not resume another chat yourself.

Each active chat may finish its remaining implementation and necessary verification. Reuse completed valid checks. Run only one expensive command at a time; no parallel processes or worker pools. Use one worker where supported, low process priority where practical, at most one owned local server and one browser tab. Stop preview servers before running the final build. Do not leave watch processes or servers running after completion. If resources become excessive, stop the heavy process and report the limitation instead of retrying or adding workers. No type checking. Only the last collections/integration chat may run the combined production build.

The user explicitly authorized each chat to report back after finishing. After updating your handoff and cleaning up owned processes/tabs, send one concise completion report to parent chat 01a0ed52-e140-7eb2-9bf5-e122d9708ab2 on host local, stating changes, verification, limitations and cleanup. End your turn. The parent must verify completion before granting the next slot. This sequential schedule supersedes the prior full resource hold and the original parallel integration schedule below.

Parent-managed queue (all on host local):

| Order | Workstream | Chat ID | State |
| --- | --- | --- | --- |
| 1 | Templates | 01a0ed84-497d-7a42-9607-23d27aecdb3e | Complete; handoff ready; chat idle; preview server and QA tab closed |
| 2 | Components | 01a0ed84-94b4-7951-a55d-e5d390eb8500 | Complete; handoff ready; chat idle; preview server and QA tab closed; console diagnostic passed to integration |
| 3 | MCP | 01a0ed84-d239-7eb0-adcf-4babc6caddfb | Complete; handoff ready; chat idle; preview server and QA tab closed |
| 4 | Collections and final integration | 01a0ed85-27f5-7543-b396-35eb3f4f095d | Complete and idle; combined build passed; owned servers and browser tabs closed |

The parent handles completion messages by reading the relevant handoff and checking the finishing chat is idle and its owned heavy processes have been cleaned up. Only then update this queue and send the next chat its explicit resumption prompt. Keep the same model and reasoning settings. A completion message by itself does not authorize any publication. If genuine unfinished implementation remains, keep the slot with the current chat; documented verification limitations should be assessed before progression rather than silently called passed.

Final integration outcome: all four chats finished serially, reported completion to the parent, and are idle. The combined production build passed with a 1GB Node heap and single-thread settings. Targeted development-server checks covered 16 pages, two filtered catalogue comparisons and the 208-URL sitemap. Owned servers and browser tabs are closed. Everything remains local; no commit, push or deployment was performed. See docs/seo-expansion/integration.md for evidence and limits.

The earlier MutationObserver.observe non-Node error on Kanban/bento did not recur in fresh settled Kanban, Bento Grid and Pricing checks. Its cause remains unresolved because no stack or source URL was exposed. No speculative patch or suppression was applied; a runtime fix or clean console across all journeys is not claimed.

The user authorized implementing all four recommendations in separate GPT-6 Sol chats with xhigh reasoning, and broadening the keyword targeting beyond terms already visible in Search Console. Work locally in /Users/josh/Documents/ChatGPT/designmcp. This is implementation work, not a plan-only request.

Read docs/keyword-research-2026-09-29.md and docs/keyword-research-2026-09-29-evidence.json. Existing GSC visibility is evidence about the current site, not a complete market-demand map. Research wider English-language, international intent using current search results and first-party sources. Do not invent search volumes, difficulty scores, measured conversions or competitor claims. Group synonymous phrases around useful pages rather than producing a page for each keyword. Distinguish researched intent from measured demand.

## Boundaries

The checkout was on main with 142 modified/untracked/deleted entries when coordinated. Preserve all existing changes. Do not reset, clean, stash, checkout branches, overwrite whole files from Git, commit, push, deploy or publish. No type checking. Do not weaken validation or alter auth, billing, entitlement or database behavior. Create migrations only with Supabase CLI if a later explicitly authorized requirement needs one; none is expected here. Read applicable AGENTS.md instructions. If GitHub tokens are unavailable, retry with elevated permissions.

Four chats share this checkout. Only edit your owned paths and your own handoff file. Read any files needed. Do not install packages or change lockfiles. Reuse the existing design and component conventions. Do not rewrite the initial keyword report/evidence. Each chat should write a concise handoff recording keyword groups, target pages, sources, actual changes, validation and limitations, followed by a standalone line "READY_FOR_INTEGRATION" when its owned implementation is finished.

## Ownership

1. Templates and website intent
Own apps/web/app/blog/best-cursor-templates/**, apps/web/app/blog/best-claude-code-templates/** and apps/web/lib/guides.ts (only matching template entries). Handoff: docs/seo-expansion/templates.md.
Improve both existing articles and broaden their website/starter/UI-build intent after current research. Preserve URLs. Do not add near-duplicate articles or imply Rendyn sells complete templates it does not provide.

2. Component search and practical examples
Own apps/web/app/components/[componentSlug]/**, the componentMetadata portion of apps/web/lib/seo.ts, and new apps/web/lib/component-editorial.ts or similarly task-specific component content files. Handoff: docs/seo-expansion/components.md.
Start with progressive blur, orbiting circles and dropzone; research animation, effects, component interaction and product-block phrases beyond existing impressions, then extend useful editorial coverage to a justified bounded set of additional existing components. Verify exact component APIs/source before writing examples. Preserve upstream attribution and variant URLs. Avoid changing source-access gates or implementing new component runtime behavior.

3. Collections and shared integration
Own apps/web/app/collections/**, apps/web/app/sitemap.ts, apps/web/app/components/site-footer.tsx and site-header.tsx if a small navigation change is useful. Handoff: docs/seo-expansion/collections.md. Integration handoff: docs/seo-expansion/integration.md.
Build /collections/ai-agent-ui around real catalogue capabilities. Also research an animated React components collection and implement /collections/animated-react-components if intent and actual catalogue support justify a useful independent page. This second collection is part of the requested expansion, not mandatory thin content. Keep filtered catalogue URLs noindex; add focused, self-canonical collection routes. Own shared registration and internal navigation for collections and /mcp. Add /mcp links/sitemap only once that page exists. Finish owned work first; read the other handoffs and perform one coordinated final integration/production build without typechecking once all four implementations are ready. Read-only thread status checks are acceptable; never reset anyone's changes. If another chat needs action or has a genuine blocker, report it instead of looping indefinitely.

4. MCP and coding-agent workflow intent
Own apps/web/app/mcp/** and, only where it materially supports the distinct MCP journey, content inside apps/web/app/guides/how-to-make-claude-code-better-at-design/**. Do not edit guides.ts, common SEO helpers, sitemap or navigation. Handoff: docs/seo-expansion/mcp.md.
Implement /mcp for UI component MCP server, React components MCP, and client-specific intent for Claude Code, Cursor and Codex. Research current official client setup documentation and verify actual Rendyn tools/endpoint/account boundaries. Distinguish finding components through MCP from building MCP Apps or running an agent backend. Include concrete examples and honest differentiation from current alternatives. Prefer sections on one useful page over thin client pages.

## Verification and completion

Use focused lint/tests where meaningful and real browser inspection of the changed UI. No type checking. Avoid parallel full builds, output-directory churn and restarting another chat's processes; the collection/integration chat owns the final combined build. Record exactly what you verified and what is pending. Publishing is not authorized. A local implementation is not a live release. Deliver the implementation in the shared checkout with its handoff, not merely a proposal.

When integrating, inspect the actual files and handoffs, ensure intended target pages render and are linked/discoverable, check canonical/robots/sitemap behavior, preserve visual quality and accessibility, and confirm no competing pages were created for the same intent. Shared file changes belong only to their designated owner.
