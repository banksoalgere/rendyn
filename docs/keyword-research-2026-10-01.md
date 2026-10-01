# Additional keyword targets for Rendyn

Research date: 1 October 2026.

Rendyn should expand first into specific React implementation tasks: virtualized tables, command palettes, upload progress and retry, searchable multi-selects, AI citations, tool output, streaming file changes, and before-and-after sliders. These searches can lead directly to components already available on the live site. Add practical frontend-skill and design-system-rules coverage to the existing Claude Code and Cursor guides. A focused animated-background collection is the strongest new collection to test after those improvements.

This report extends the [29 September research](./keyword-research-2026-09-29.md). It separates new keyword focuses from variants of recommendations already made. The earlier MCP landing page, agent collection and animation collection are now live, so creating them again is not an additional opportunity.

The research screened **46 distinct query strings in 48 searches**, refreshed authenticated Search Console, inspected competitor and upstream documentation, checked the local catalogue and source interfaces, and verified HTTP status and metadata on 20 live Rendyn pages. The keyword bank contains **140 candidate phrases across 35 clusters**. Seed searches were inspected; every adjacent wording was not searched individually. The [evidence snapshot](./keyword-research-2026-10-01-evidence.json) records the query log, fresh Search Console rows, live scope and keyword-to-page assignments.

## What the current evidence establishes

The [authenticated Search Console report](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Arendyn.dev) was read on 1 October. It selected three months of Web text results with no query, page, country or device filter; the available chart covers **30 August to 28 September 2026**.

| Measurement | Current observation |
| --- | ---: |
| Property impressions | 717 |
| Property clicks | 32 |
| Average CTR | 4.5% |
| Average position | 28.7 |
| Disclosed query rows | 114 |
| Disclosed query impressions and clicks | 280 and 0 |
| Landing-page rows | 127 |
| Country rows | 84 |
| US, India and UK impressions | 237, 69 and 62 |

All disclosed queries have zero clicks. The 32 property clicks therefore cannot be assigned to the candidate phrases. Page impressions total 745 because aggregation differs; 717 remains the property total. A page receiving clicks is evidence about that page, not proof that a suggested keyword produced those clicks.

The available dates end **before the 30 September SEO release** recorded in [the release evidence](./releases/2026-09-30-seo-expansion/README.md). These figures cannot establish whether the released editorial content or collections improved rankings. Historical average position is not a current rank or a keyword-difficulty score.

The audience assumption remains English-speaking developers and founders worldwide. The country distribution supports international coverage; it does not justify a UK-only keyword plan.

| Relevant signal | Observation | How to use it |
| --- | --- | --- |
| virtual table react | 2 impressions, average position 37.5 | The exact query was filtered in Search Console and its Pages report resolves to `/components/table`. A small but direct relevance signal. |
| react combobox multiselect | 2 impressions, average position 60.0 | Supports a multi-select focus, with little current visibility. Its query-to-page relationship was not separately filtered. |
| javascript directory tree | 2 impressions, average position 58.0 | Supports investigating file-tree wording; it does not imply a filesystem-management product. |
| react progress bar circular | 2 impressions, average position 32.5 | Useful adjacent visibility for the progress-ring component. |
| circular progress bar | 2 impressions, average position 50.5 | Broader than React; qualify the page with the framework and implementation. |
| `/components/message-scroller` | 1 click, 1 impression, average position 5.0 | Very small page signal supporting a useful scrolling tutorial; the clicked query is undisclosed. |
| `/components/comparison` | 4 impressions, average position 5.8 | Existing visual-comparison page with room to explain its job more clearly. |
| `/components/image-generation` | 5 clicks, 12 impressions, average position 5.8 | Retain as an existing asset; do not present image-generation UI as a new discovery or attribute these clicks to a candidate phrase. |
| `/components/animated-circular-progress-bar` | 12 impressions, average position 35.2 | A relevant existing page whose description remains generic. |

The [live sitemap](https://rendyn.dev/sitemap.xml) has **208 URLs, including 189 component pages**. Those 189 URLs match the three original source catalogues. The local working catalogue has **1,996 entries across ten sources**; it is not the published catalogue. Library-specific pages and newly imported components should remain a conditional opportunity until their release and public URLs are verified.

The 20 checked live pages returned HTTP 200, used their own canonical URLs and declared index/follow. This establishes public delivery and metadata, not Google indexation, rankings, interactive correctness or parity between local and deployed source.

**Monthly search volume, CPC, paid SEO difficulty and conversion forecasts were unavailable.** Priorities below are editorial judgments based on product fit, intent, actual availability, existing site visibility and the useful content Rendyn could contribute. Search results were inspected through the web search tool, not a localized Google ranking tracker.

## The first twelve additional focuses

These are the strongest additions to the working keyword strategy. The order is a recommended production sequence, not a predicted traffic or revenue ranking. Related terms belong on the same useful page.

| Order | Keyword focus | Page to improve | What would make it useful | Evidence and competition |
| --- | --- | --- | --- | --- |
| 1 | react virtualized table; react table column resize | [Table](https://rendyn.dev/components/table) | An original data-table example with sorting, selection, resizing and sticky headers. Describe rendering and data responsibilities separately. | Exact query-to-page GSC evidence. [TanStack](https://tanstack.com/table/latest/docs/framework/react/guide/virtualization) and [MUI](https://mui.com/material-ui/react-table/) already provide virtualization documentation: competition is established. |
| 2 | react command palette; react cmd k menu | [Command Palette](https://rendyn.dev/components/command-palette) | A dashboard command example with Cmd/Ctrl+K, fuzzy matching, keyboard selection and an empty state. | Component-search results contain multiple direct implementations. Rendyn's inspected interface exposes items, shortcut, placeholder, empty message and controlled open state. |
| 3 | react file upload with progress; react file upload retry | [File Upload](https://rendyn.dev/components/file-upload) | Show queue, uploading, success and error states, controlled progress, retry and removal. Explain how the application's transport updates the UI. | [PrimeReact](https://primereact.dev/docs/primitive/components/fileupload) explicitly targets drag-and-drop, validation and progress. Rendyn's interface has file-added, retry and removal callbacks; it does not supply storage. |
| 4 | react combobox multiselect; react searchable multi select | [Multi Select](https://rendyn.dev/components/multi-select) | A searchable assignee/tag picker with controlled values, removable tokens, disabled options and keyboard interaction. | Two exact-query impressions. Dedicated [multi-select implementations](https://github.com/hc-oss/react-multi-select-component) and [combobox documentation](https://ui.ahmet.studio/docs/components/multiselect-combobox) establish clear implementation intent. |
| 5 | react citations component; react AI source references | [Citations](https://rendyn.dev/components/citations) | Connect inline markers to a supplied reference list; demonstrate progressively appended references and source navigation. | [AI Elements](https://elements.ai-sdk.dev/components/inline-citation) and [KendoReact](https://www.telerik.com/kendo-react-ui/components/conversationalui/llm-kit/citation) have dedicated citation UI. Exact candidate demand is unmeasured. |
| 6 | react tool result component; react agent tool output | [Tool Result](https://rendyn.dev/components/tool-result) | Render supplied terminal/API output through running, completed, failed and cancelled states, with appropriate disclosure and retry behavior. | [assistant-ui](https://www.assistant-ui.com/docs/tools/tool-ui) and [AI Elements](https://elements.ai-sdk.dev/components/tool) target tool-result presentation. Their runtime examples are not proof Rendyn is a drop-in SDK integration. |
| 7 | react streaming diff component; react file diff viewer | [File Diff](https://rendyn.dev/components/file-diff) | An AI coding-agent change preview with supplied added/removed lines, counts, syntax highlighting and completion collapse. | Generic [React diff viewers](https://github.com/praneshr/react-diff-viewer) compete on a broader feature set. Rendyn should emphasize streaming change display; the inspected component accepts lines rather than calculating a Git diff. |
| 8 | react before after slider; react image comparison slider | [Comparison](https://rendyn.dev/components/comparison) | A real image-edit or website-redesign comparison with responsive framing and clear interaction instructions. | The current name is vague. [Kibo](https://www.kibo-ui.com/components/comparison) documents the underlying overlay comparison, while [React Compare Slider](https://github.com/nerdyman/react-compare-slider) illustrates established specialist competition. |
| 9 | react circular progress bar; react animated progress ring | [Circular Progress](https://rendyn.dev/components/animated-circular-progress-bar) | Demonstrate percentage values and distinguish measured progress from indeterminate waiting. Explain sizing, labels and accessible alternatives after verifying the source. | Existing query/page visibility. [react-circular-progressbar](https://github.com/kevinsqi/react-circular-progressbar) is an established implementation. |
| 10 | react animated number counter; react rolling numbers | [Number Animation](https://rendyn.dev/components/number-animation) | Show a changing metric and rolling digits. Assign viewport-triggered, one-off count-up examples to [Number Ticker](https://rendyn.dev/components/number-ticker). | [Motion](https://motion.dev/docs/react-animate-number) targets number animations. A clear use-case distinction prevents two Rendyn pages competing for the same example. |
| 11 | Claude Code frontend design skill; Claude Code design system | [Existing Claude design guide](https://rendyn.dev/guides/how-to-make-claude-code-better-at-design) | Add an original walkthrough combining the frontend-design skill, project design tokens and verified components, with before/after screenshots. | [Anthropic's frontend-design article](https://claude.com/blog/improving-frontend-design-through-skills) and [plugin](https://claude.com/plugins/frontend-design) make this a current workflow topic with strong vendor competition. |
| 12 | Cursor design system rules; Cursor rules for UI design | [Existing Cursor design guide](https://rendyn.dev/guides/cursor-design) | A practical design-system rules example tied to a real component directory, token file and refinement workflow. | [Cursor's designer documentation](https://cursor.com/for/designers) contains design-system rules. Rendyn needs an original applied example beyond repeating configuration instructions. |

Orders 1–10 are newly emphasized component clusters. Orders 11–12 add more precise skill/rules intent to guides that already exist. Neither needs another general design essay.

## Practical briefs for the first publishing wave

**Table and command palette.** Use one small admin-screen example that combines a data table and keyboard commands. Table remains the owner of virtualization and resizing; Command Palette owns keyboard command search. Publish no “10,000 rows at 60 fps” claim without a repeatable browser benchmark. The catalogue description mentions 10k rows, but this research did not benchmark that claim.

**File Upload and Multi Select.** Show a concrete attachment queue and assignee picker. Give File Upload the progress/retry terms and keep TypeScript file selection, acceptance and rejection explanations on the existing [Dropzone](https://rendyn.dev/components/dropzone) page. UI accept settings and a file-size message are not server validation. The selected component's source should determine the example API.

**Citations and Tool Result.** Build a supplied search-result response with references and an expandable tool result. Demonstrate how the application maps its data into component props. These pages can link naturally from the existing [agent collection](https://rendyn.dev/collections/ai-agent-ui). A source reference display does not verify the truth of a citation, and a tool-result surface does not execute the tool.

**File Diff and Comparison.** Use different examples for different jobs: code changes on File Diff, visual changes on Comparison. Label File Diff as a viewer of supplied changes. Avoid claiming split-view editing, conflict resolution or Git patch parsing that the inspected interface does not provide.

**Progress rings and numbers.** Add short original examples for measured job completion and changing totals. Keep raw decorative animation distinct from a semantic progress indicator. Number Animation should focus on ongoing value changes; Number Ticker should focus on counting to a target when entering view.

**Chat scrolling.** This expands an earlier recommendation and deserves early attention despite being outside the first twelve new focuses. Explain how to follow streamed output while the reader stays near the bottom, release following when they scroll up, and resume it intentionally. The inspected MessageScroller interface exposes followOutput, followThreshold, smooth and onFollowChange. The upstream [use-stick-to-bottom project](https://github.com/stackblitz-labs/use-stick-to-bottom) and [MUI's scrolling documentation](https://mui.com/x/react-chat/behavior/scrolling/) confirm that this is a concrete interaction problem, not merely a component-name search.

For each page, a useful deliverable is a specific title and introduction, an original preview, a minimal source-accurate integration example, supported controls, honest limitations, relevant internal links and a clear path to retrieving source. Changing metadata alone would leave the main opportunity unresolved.

## New pages worth considering

### React animated backgrounds collection

Proposed URL: `/collections/react-animated-backgrounds`. It is not currently live.

Target the shared cluster “react animated backgrounds,” “react animated gradient background,” “react shader background” and “react particle background.” [21st](https://21st.dev/community/components/explore/react-animated-backgrounds) and [Aceternity](https://ui.aceternity.com/background) have dedicated background collections. That supports a distinct browsing job, though competition is substantial and monthly demand remains unmeasured.

Rendyn has existing shader, particle and grid components that can support a useful page. Compare them by visual density, content contrast, dependencies, supported controls and motion behavior, using original examples. Link to the existing Shader Background editorial for its specific implementation. The broad animated-components collection should retain text, cards, transitions and general interaction discovery; it should not become a second page with the same background-only content.

This is the first new collection I would test. It has a clearer distinct job than creating another general React-components page.

### UI component MCP comparison guide

Proposed URL: `/guides/best-ui-component-mcp-servers`. It is not currently live.

Candidate phrases include “best UI component MCP servers,” “React component MCP servers” and “best MCP servers for frontend development.” The last phrase is broader: title and introduction should qualify component discovery so readers seeking databases or deployment tools understand the scope.

[shadcn](https://ui.shadcn.com/docs/mcp), [Magic UI](https://magicui.design/docs/mcp) and [21st](https://docs.21st.dev/blog/mcp-ui-components) already document agent access to component catalogues. Having MCP is therefore insufficient differentiation. The existing [Rendyn MCP page](https://rendyn.dev/mcp) should remain the product/setup destination; a comparison guide would help people choose across providers.

Compare catalogue scope, preview behavior, source delivery, dependencies, authentication/access requirements and the job the agent performs. Check current provider terms at publication. Run the same practical component request through the compared services before discussing retrieval quality, installation reliability or time saved. This research verified documentation and search intent, not comparative authenticated tool execution.

This is a conversion-oriented hypothesis, not proof that comparison traffic will subscribe. Defer publication until the guide contains evidence beyond a self-serving ranking.

### React landing page components collection

Proposed URL: `/collections/react-landing-page-components`. It is not currently live.

“React landing page components,” “React SaaS landing page components” and “Tailwind landing page components” fit assembling verified pieces. [21st's landing-page collection](https://docs.21st.dev/community/components/s/landing-page) shows that competitors already cover this browsing intent.

Place this behind the background collection. A complete worked composition should justify it: feature grid, logos, CTA, media and selected interaction details. Rendyn supplies reusable components; it should not imply that a full SaaS website template or a ready-to-run application is included. The existing Cursor/Claude template articles can continue comparing complete starters.

## Complete candidate keyword bank

P1 means start with useful content on existing pages. P2 means follow after that work or validate as a distinct collection. Conditional and defer entries have an explicit content or capability dependency. These are planning priorities, not paid SEO difficulty ratings.

“New focus” identifies a cluster newly emphasized in this research. “Expanded previous recommendation” identifies adjacent terms for an earlier target. A proposed route is a page assignment, not a claim that the page exists.

| Priority | Candidate phrases grouped by intent | Owner page | Relationship to existing coverage |
| --- | --- | --- | --- |
| P1 | react virtualized table; virtual table react; react table column resize; react table sticky header | `/components/table` | new focus — proposed route |
| P1 | react command palette; react cmd k menu; react command palette keyboard shortcuts; react command palette fuzzy search | `/components/command-palette` | new focus — proposed route |
| P1 | react file upload with progress; react drag and drop file upload; react upload queue component; react file upload retry | `/components/file-upload` | new focus — proposed route |
| P1 | react combobox multiselect; react searchable multi select; react multi select with tags; react multi select dropdown typescript | `/components/multi-select` | new focus — proposed route |
| P1 | react citations component; react AI source references; react inline citations; RAG citations UI react | `/components/citations` | new focus — proposed route |
| P1 | react tool result component; react AI tool call UI; react agent tool output; react streaming terminal output UI | `/components/tool-result` | new focus — proposed route |
| P1 | react file diff viewer; react streaming diff component; react code diff UI; AI code review diff component react | `/components/file-diff` | new focus — proposed route |
| P1 | react before after slider; react image comparison slider; react comparison slider component; react before after image comparison | `/components/comparison` | new focus — proposed route |
| P1 | react circular progress bar; react animated progress ring; react circular progress with percentage; tailwind circular progress react | `/components/animated-circular-progress-bar` | new focus — proposed route |
| P1 | react animated number counter; react rolling numbers; react count up animation; react animated number component | `/components/number-animation` | new focus — proposed route |
| P1 | Claude Code frontend design skill; Claude Code UI design prompts; Claude Code design system; improve Claude Code frontend design | `/guides/how-to-make-claude-code-better-at-design` | expanded existing guide — proposed route |
| P1 | Cursor design system rules; Cursor rules for UI design; Cursor frontend design prompts; Cursor UI consistency | `/guides/cursor-design` | expanded existing guide — proposed route |
| P1 | react chat auto scroll; react streaming chat scroll to bottom; stop chat auto scroll when user scrolls up; react chat scroll anchoring | `/components/message-scroller` | expanded previous recommendation — proposed route |
| P2 | react AI prompt input; react chat input model selector; react auto growing chat input; react chat input send stop button | `/components/prompt-input` | expanded previous recommendation — proposed route |
| P2 | react tool approval UI; react AI confirmation component; human in the loop UI react; react agent permission dialog | `/components/tool-approval` | expanded previous recommendation — proposed route |
| P2 | react image generation UI; react AI image generation progress; react generated image result component; react image generation loading state | `/components/image-generation` | expanded previous recommendation — proposed route |
| P2 | react animated backgrounds; react animated gradient background; react shader background; react particle background | `/collections/react-animated-backgrounds` | new collection candidate — proposed route |
| P2 | react bottom sheet web; react bottom sheet snap points; react draggable bottom sheet; react mobile drawer | `/components/bottom-sheet` | new focus — proposed route |
| P2 | react file tree component; react file tree keyboard navigation; react directory tree; react file explorer tree | `/components/file-tree` | new focus — proposed route |
| P2 | react gantt chart component; react project timeline component; shadcn gantt chart; react draggable timeline | `/components/gantt` | expanded previous recommendation — proposed route |
| P2 | react kanban drag and drop; react kanban board typescript; shadcn kanban board; react task board component | `/components/kanban` | expanded previous recommendation — proposed route |
| P2 | react bento grid; tailwind bento grid; react responsive feature grid; react SaaS feature section | `/components/bento-grid` | expanded previous recommendation — proposed route |
| P2 | react scroll reveal animation; react animate on scroll component; react scroll animation reduced motion; react staggered scroll reveal | `/components/scroll-animation` | expanded previous recommendation — proposed route |
| P2 | react logo marquee; react marquee pause on hover; react infinite logo slider; react scrolling logo strip | `/components/marquee` | expanded previous recommendation — proposed route |
| P2 | react animated text; react word reveal animation; react text animation component; react text animation reduced motion | `/components/text-animation` | expanded previous recommendation — proposed route |
| P2 | react stacked toast notifications; react animated toast stack; react toast with undo; react notification stack component | `/components/animated-toast-stack` | new focus — proposed route |
| conditional | react avatar image crop; react image crop component; react image crop aspect ratio; react image crop upload UI | `/components/image-crop` | new focus — proposed route |
| P2 | react image zoom component; react image click to zoom; react image zoom modal; react image zoom gallery | `/components/image-zoom` | new focus — proposed route |
| P2 | react AI chat UI components; react chatbot UI component; react chat interface tailwind; react AI assistant sidebar | `/components/chat-app` | new focus — proposed route |
| conditional | best UI component MCP servers; best MCP servers for frontend development; UI design MCP server comparison; React component MCP servers | `/guides/best-ui-component-mcp-servers` | new guide candidate — proposed route |
| P2 | Codex frontend design skill; Codex UI design prompts; Codex design system; Codex React components | `/guides/how-to-make-codex-better-at-design` | expanded existing guide — proposed route |
| P2 | react landing page components; react SaaS landing page components; tailwind landing page components; react landing page UI blocks | `/collections/react-landing-page-components` | new collection candidate — proposed route |
| defer | React Bits alternative; React animation component libraries; animated React UI libraries; React Bits vs Magic UI | `/collections/animated-react-components` | new comparison candidate — proposed route |
| P2 | react AI loading states; react shimmer text component; react AI thinking indicator; react agent progress UI | `/components/agent-loading-states` | expanded previous recommendation — proposed route |
| P2 | react streaming response component; react streaming chat UI; react streaming markdown UI; react AI response renderer | `/components/streaming-response` | expanded previous recommendation — proposed route |

The bank's 140 phrases are candidates, not 140 independently validated search markets and not 140 proposed pages. The evidence file records exact disclosed-query matches where available. A null match means absent from this small disclosed table; it does not mean zero searches.

## Terms to defer or exclude from the immediate plan

**React floor planners, Venn diagrams and decision trees.** “react floor planner” has 31 impressions at average position 77.9; “react venn diagram” has 30 at 72.5; “react decision tree” has nine at 54.6. These are larger disclosed signals than most current component terms, but the live catalogue does not establish the specialized engines those searches can require. Do not build landing pages implying that Rendyn provides those capabilities merely to capture impressions.

**Broad component and animation-library searches.** “React components,” “best React UI library,” “Framer Motion” and generic “shadcn UI” face extensive specialist and upstream coverage and less specific buying intent. They can describe the product and organize internal links, but should not displace narrower implementation tasks in the first wave.

**Free source and complete-template searches.** Public Rendyn previews and metadata do not establish free unrestricted source access. Avoid “free React components” as a primary promise. Likewise, full dashboard templates, complete SaaS starters and hosted AI chatbots exceed the live catalogue's component-source proposition unless the page is explicitly a factual comparison of other products.

**React Native searches.** Bottom-sheet results include native packages. Rendyn's web components should use web/Tailwind modifiers and avoid native compatibility claims.

**Generic streaming-Markdown renderer searches.** The search landscape contains dedicated parsers and rendering packages. Keep streaming-response phrases on the current component page only where the pinned implementation handles the requested input. Do not imply arbitrary Markdown parsing, HTML sanitization, tables or mathematical rendering without verifying those capabilities.

**Broad design-MCP searches.** These can mean Figma inspection, design tokens, canvas editing or component installation. Qualify component-library intent. Rendyn should not imply that its component-retrieval server is a Figma editor, a generative-UI backend or an MCP Apps framework.

**React Bits, Magic UI and 21st alternatives.** Comparison intent exists, but Rendyn imports upstream components and cannot claim those sources are exclusive. An alternatives section can be useful if it explains curation, discovery and delivery accurately. Defer standalone alternative pages until meaningful differentiation is demonstrated. Competitor blog copy, counts and prices are not comparative performance evidence.

**New library keywords from the local import.** Treat shadcn login/sidebar blocks, Origin UI patterns, Mantine charts, MUI components, Ant Design components, Chakra UI and HeroUI source access as a later research wave. The local catalogue count and older integration notes have changed; current live availability is the gate.

**Image-crop size enforcement.** The candidate crop/ avatar cluster is real, but the inspected local Kibo image-crop helper retries oversized output without applying its changing scaleFactor to the canvas dimensions or draw operation. The retry appears not to converge. This is a local source observation, not a reproduced live incident. Review and verify that behavior before publishing maximum-output-size guarantees or a full upload recipe. No runtime change was made in this research.

## Page ownership and internal linking

Preserve the current public URLs. Group synonyms into the assigned pages rather than creating a page for each wording. Keep all query-string catalogue filters noindex with the existing canonical behavior; new collections should earn distinct, substantive content.

| Overlapping intent | Primary owner | Supporting page and distinction |
| --- | --- | --- |
| Upload queue, progress and retry | `/components/file-upload` | Dropzone owns file selection, acceptance and rejection. |
| Searchable multiple choices | `/components/multi-select` | Combobox pages own their actual single-selection/autocomplete variants. |
| Virtualized/resizable table | `/components/table` | `/components/table-example-2` remains the other data-table implementation; do not assign identical examples. |
| Live changes to numbers | `/components/number-animation` | Number Ticker owns viewport-triggered count-up to a target. |
| Keyboard file tree | `/components/file-tree` | File Tree Example 2 owns its different directory-display treatment. |
| Short transient result notifications | `/components/animated-toast-stack` | Notification Stack can focus on richer notification-card presentation. |
| Tool permission | `/components/tool-approval` | Approval Card owns its actual review/choice pattern; neither enforces server authorization. |
| Background comparison | Proposed background collection | Shader Background owns a specific shader integration; broad animation collection retains general discovery. |
| Rendyn connection and source retrieval | `/mcp` | Proposed MCP guide compares providers; existing agent-design guides explain applied workflows. |
| Claude skills and visual refinement | Existing Claude design guide | Claude website-design guide owns the complete website-building workflow. |
| Cursor rules and UI consistency | `/guides/cursor-design` | Cursor website-design guide owns its broader website workflow. |

Link the agent component articles from the live agent collection. Link table, command, upload and selection examples from appropriate product-block journeys. Connect visual-effect pages through the animation collection and any justified background collection. The coding-agent guides should point to real relevant components and the existing MCP setup page, giving readers a practical next step.

## Recommended work sequence and measurement

The following is a proposed four-wave sequence, not a deadline, automation or publishing authorization.

1. **Implementation tasks:** Table, Command Palette, File Upload, Multi Select, Comparison and Circular Progress. Use source-accurate examples on existing URLs.
2. **Agent interaction tasks:** Citations, Tool Result, File Diff and the expanded Message Scroller tutorial. Connect these to the existing agent collection.
3. **Applied design and motion:** Add tested Claude-skill and Cursor-rules walkthroughs; improve Number Animation and related existing visual pages.
4. **New editorial destinations:** Build the background comparison collection if the examples justify it. Prepare the MCP comparison only after original client tests. Reassess a landing-page-components collection after seeing useful discovery and engagement.

A suggested effort split is roughly 70% existing component pages, 20% existing workflow guides and 10% validating new collections/comparisons. This is a planning choice for a small, recently expanded site, not a measured optimal allocation.

Record each changed page's publish date and the phrases it owns. Compare equivalent Search Console periods after publication, allowing for crawling and reporting delay. Group queries by intent and use page-level results alongside disclosed queries. Report impressions, organic clicks and CTR without turning historical average position into a fixed rank.

If analytics are available, measure the proposed journey from organic landing to useful preview, source/MCP setup or pricing, trial start and successful source retrieval. Those events are recommended measurement points, not currently verified instrumentation or conversions. More impressions for irrelevant capabilities would not establish progress toward Rendyn's business goal.

Research output only: the application, production site and database were not changed. No type checking, commit, push or deployment was performed.

