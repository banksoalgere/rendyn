# Catalogue labels

The catalogue uses the same discovery labels on the website, in public HTTP responses, and through MCP. Names and descriptions identify the component's purpose. `kind` distinguishes a primitive/component, a composed block, and agent UI. `family` describes the pattern (for example `accordion`, `combobox`, `data-table`, or `file-upload`); it is independent of the broad category.

Search and browsing return a compact `labels` object containing kind, family, tags, aliases, interactions, example count, label status, and visual observations. Source retrieval returns these fields in `component.metadata` alongside usage guidance. Internal `searchText` is omitted from API and MCP metadata. Search/browse responses contain no implementation source; source retrieval retains its existing authentication and subscription checks.

## Visual observations

`visual` contains controlled arrays for layout, surface, shape, color, typography, motion, and states. For example, `rounded`, `bordered`, `muted`, `transition`, and `focus-state` describe styling found in source. Every visual record declares `evidence: "source"` and its scope:

- `bundled-examples`: observations across a library entry's example files and their direct local implementations. These may describe several variants or supporting controls.
- `component-source`: observations in the original component's source bundle.

These arrays describe available source treatments, rather than a screenshot, a fixed palette, or guarantees about every variant. Empty arrays mean no matching trait was observed. They do not certify the absence of animation, responsiveness, or accessibility behavior. External theme defaults may supply styling that is not visible in the returned source. Static-only search requests continue to require positive no-motion evidence; sparse labels do not satisfy that requirement.

`labelStatus: "source-labelled"` means the entry matched a purpose profile or a declared source identity. It does not mean a person reviewed the rendered component. `needs-review` marks an unclassified purpose. The audit separately records rendered visual reviews; this pass has none.

## Maintaining labels

Run `pnpm catalog:label` (or `node --import tsx scripts/label-catalog.ts`) after adjusting the profiles/extractors. The command holds the import lock, copies the catalogue into staging, updates the index, manifests, authored READMEs and preview registry, validates the pinned MIT bundles, generates the Worker snapshot, and promotes the outputs together. Failure retains staging for inspection and restores previous outputs if promotion fails. Upstream source, file hashes, license pins and snapshot dates remain unchanged.

Library imports use the same label builder, so importing a new pinned revision retains the taxonomy. Setup prose and package instructions do not generate behavioral tags. JSX roles distinguish searchable selectors from command menus; icon names do not determine component families. Visual observations come from styling expressions and props rather than prose.

`catalog/public-slugs.json` pins published website paths by component ID. Changing a display name cannot change its URL. New IDs receive unique paths; retired paths remain reserved. Verification rejects missing, unsafe or duplicate pinned paths.

`catalog/label-audit.json` records coverage, family counts, automated purpose review candidates, and the distinction between source observations and rendered review. An empty automated review queue is not a manual catalogue sign-off.
