# Visual MCP page only

User scope: keep the updated visual MCP page; preserve the homepage exactly as it is now.

Reconstructed production version 1f521a3b-fa39-4ce2-a294-91b8d417d5bf from the saved SEO and colour-only release artifacts. Restored only apps/web/app/mcp/page.tsx, mcp.module.css, illustrations.tsx and client-setup.tsx from the saved visual design. Existing neutral shared tokens retained. Homepage page.tsx, home.module.css, globals.css and every other source file outside MCP remain byte-identical to the current release. Manifest records source hashes.

Validation: web lint passed with existing image warnings; five SEO tests passed; production build and built public login configuration verification passed. No type checking, database changes or backend deployment. Deploy uses --keep-vars.

Live version c85b9904-48ba-4c5d-bf15-c6d4439fc043 confirmed serving 100% of traffic. Live MCP has restored heading, nine SVG illustrations, neutral accent and no horizontal overflow. Cursor and Codex setup switches and copy status pass. Homepage heading and seven of eight generated stylesheet URLs are identical; generated globals stylesheet hash changed during the build although its source is byte-identical, so exact generated stylesheet URL parity is not claimed. Homepage source, styles and shared code remained byte-identical, and live homepage screenshot matches its existing design.
