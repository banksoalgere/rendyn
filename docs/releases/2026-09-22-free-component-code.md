# Free component code after login

Published to https://rendyn.dev on 22 September 2026.

- Worker: `designmcp-web`
- Current version: `acc545d6-c495-495f-9075-018596d8a9ff`
- Initial code-access version: `15c8ce9d-37d9-4626-8e37-e0b388f79028`
- Previous version: `697e7918-cabd-4d56-a79b-c9c9b77e4716`
- Source baseline: `7bf0b2d` plus the previous white-theme/logo/menu release
- Reproducible source patch from `7bf0b2d`: `2026-09-22-free-component-code.patch`

The Code tab is available beside Preview. Signed-out visitors see “Log in to get
this component free”. Login returns to that component with Code selected. Verified
accounts can view and copy all component source without a subscription. The API
verifies the user before loading source and returns private/no-store responses.
Authentication failures deny source access. The unpublished guest-copy quota is
superseded by mandatory login; no new secret or database change is needed.

Built using the same isolated release archive and frozen dependencies as the
previous release. Pending billing, analytics, dependency and preview changes in
the shared checkout were excluded. Existing email/Google login and billing were
preserved. Deployment retained runtime configuration with `--keep-vars`.

## Verification

- Isolated release: 204 tests passed, including source and MIT licences for all
  189 components, anonymous denial, verified access, invalid sessions and outages.
- Shared checkout: those tests plus authentication release-configuration validation
  passed (205 total). Targeted ESLint and diff whitespace checks passed.
- Production build and deployment dry run passed; no type checking was run.
- Built browser: signed-out login prompt checked at 390px; login link preserves
  the component, `tab=code` and `#preview`.
- Existing authenticated browser session displayed source and copied successfully.
- Already-signed-in login redirect returned to the same component's Code tab.
- Live Animated Beam source displayed and Copy code reported “Copied”.
- Live anonymous source request returned 401 with no files, private/no-store caching
  and Vary: Cookie.

No fresh email-code or Google consent flow was initiated; existing authenticated
sessions and the existing login return path were used for browser verification.

## Source comment cleanup

Version `acc545d6-c495-495f-9075-018596d8a9ff` removes standalone
`// beui.dev/components/...` comments from source served to the Code tab and
clipboard. Original imported manifests and licence notices remain intact.
The source patch above includes this follow-up.

- 126 matching comment lines removed across the catalogue.
- Copyright and permission lines preserved by a catalogue-wide comparison.
- 199 existing source catalogue and access tests passed; targeted lint, build and
  deployment dry run passed. No type checking was run.
- Live Todo List source confirmed free of the URL comment; original copyright
  and MIT permission notice remain, and Copy code reported “Copied”.
