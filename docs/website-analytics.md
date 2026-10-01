# Website analytics

Rendyn uses PostHog for public website events, anonymous visitor journeys, and masked session replay. Nothing is loaded or sent until a visitor chooses **Allow analytics**. With no project key, both tracking and the preferences UI are disabled.

## Activate

1. Create or select your PostHog project. Use an EU project if you keep the default region.
2. Set these public **build environment** variables for the web app:

   ```dotenv
   NEXT_PUBLIC_POSTHOG_KEY=phc_your_public_project_key
   NEXT_PUBLIC_POSTHOG_REGION=eu
   ```

   Region must be `eu` or `us` and match your project. Never put a personal API key here. For local development, put these in `apps/web/.env.local` and restart the web app.
3. Enable web session replay in that project's settings. Select the recording sample rate, minimum duration and retention appropriate to your plan. The SDK respects those project controls.
4. Rebuild and deploy the web app through the normal release process. A runtime-only variable change cannot configure a previously built browser bundle.
5. Open the site, allow analytics, visit a component, search, open its code and copy it. Check the events in PostHog and then play the corresponding recording. This is the remaining end-to-end ingestion check; local tests alone cannot prove delivery.

## Events and reporting

| Event | Properties | Suggested report |
| --- | --- | --- |
| `$pageview` | Clean page URL; SDK anonymous visitor/session IDs | Visitors and popular pages |
| `catalogue_searched` | Sanitized query, category, result count | Popular terms; searches with no results |
| `website_clicked` | Element tag; clean link destination; named action on catalogue controls | Navigation, filters, preview controls, code-tab opens |
| `component_code_copied` | Component slug | Most copied components |
| `prompt_copied` | Page context | Guide/template prompt use |
| Session replay | Masked browser recording | Inspect the session behind a drop-off |

In PostHog, use a Paths insight for event sequences, a funnel from component page to code tab (`website_clicked`, action `tab-code`) to `component_code_copied`, and a trend broken down by component slug for popular copies. No reporting dashboard is embedded in Rendyn. Dashboard creation requires access to the PostHog project.

Searches fire after 600 ms without another query/category change. Empty queries are skipped. Copy events fire only after clipboard success, including when the guest allowance update fails after copying. Events don't prove an install or usage outside the website. Most clicks include only their tag and destination; selected catalogue controls also have a readable action name.

## Privacy and coverage

- Visitors can decline or reopen **Analytics preferences** to withdraw. Withdrawal stops replay and capture; changes propagate between tabs. Withdrawal does not delete previously ingested records.
- Anonymous IDs persist in browser local storage after consent, allowing repeat visits and event sequences to be joined. We do not identify visitors by account, email, or name.
- Only home, pricing, catalogue and editorial routes are eligible. Login, account, API and embedded preview routes are excluded.
- Query strings and fragments are stripped from event and replay URLs. External/private destination paths are redacted where they do not match public route patterns.
- Search terms are restricted to short alphabetic phrases and hyphens; other input is recorded as `[redacted]`. Even ordinary words can contain personal information, so access to analytics should remain limited.
- Replay masks all text and form inputs, blocks forms, code, editable content, embedded previews and explicitly private regions. Console, network body/header, canvas and cross-origin iframe recording are disabled. Masking reduces visual detail; embedded component interactions are not individually recorded.
- Click capture does not scrape labels, form values, or clipboard contents. `data-analytics-action` is only for static action names, never user data.
- Missing/invalid configuration, denied consent, blockers and project sampling mean coverage is intentionally incomplete. Nothing is backfilled for earlier visits.

References: [PostHog JavaScript configuration](https://posthog.com/docs/libraries/js/config), [replay privacy controls](https://posthog.com/docs/session-replay/privacy), [Next.js setup](https://posthog.com/docs/libraries/next-js).

## Local verification

- 17 focused tests passed across analytics privacy/lifecycle, guest clipboard behaviour, and the catalogue checks.
- ESLint passed for the added analytics modules and edited components. No type check was run.
- The normal production build completed.
- Browser checks confirmed consent decline, persistence after reload, reopening preferences, catalogue search and desktop panel layout. These used a temporary Node/Vite configuration because the installed Workers emulator only supports compatibility dates through 2026-05-22 while the project specifies 2026-09-01. The temporary configuration was removed afterward.
- A MutationObserver error appeared in the catalogue before the analytics SDK was loaded; this was not an all-clear for the existing preview code.
- Accepted-event/replay lifecycle was verified with a mocked SDK. Actual PostHog ingestion and replay playback still require a real project key and project settings.
