# Restore original layout, remove purple

User correction: keep the old design and change only purple colours. Reconstructed previous production release 87f47c94-ce9b-433d-a265-b76c142c70f3, restored its original MCP page and every website layout, and applied colour replacements in 17 CSS files. All non-CSS app source is byte-identical to that baseline; every CSS difference is a colour replacement. No dark feature panels, rewritten copy, layout, type sizing or spacing changes remain from the Studio contrast release.

Reproduce: reconstruct the SEO release using docs/releases/2026-09-30-seo-expansion and extract source-changes.tar.gz. Source hashes in manifest.json. Existing backend, billing and authentication retained. No type checking. Web lint, SEO tests, production build and built login config verification passed.

Published 2026-10-01: 100% on version 1f521a3b-fa39-4ce2-a294-91b8d417d5bf. Live browser confirms original MCP heading and workflow card, charcoal accent, neutral tint tokens and no horizontal overflow. Homepage retains original heading and no Studio dark tokens. Login build config matches live browser bundles.
