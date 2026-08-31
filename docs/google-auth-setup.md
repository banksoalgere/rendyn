# Google login setup

The website implements Google sign-in through Supabase Auth. It expects a cookie-based PKCE flow and never exposes the Supabase secret or service-role key.

## Google Cloud

1. Create or select a Google Cloud project.
2. Configure the Google Auth Platform branding, audience and the `openid`, `email` and `profile` scopes.
3. Create an OAuth client with application type **Web application**.
4. Add the website origins, including `http://localhost:3000` for local development and the production website origin.
5. Add the Supabase Auth callback shown on the Supabase Google provider page. Hosted projects normally use `https://<project-ref>.supabase.co/auth/v1/callback`. Local Supabase uses `http://127.0.0.1:54321/auth/v1/callback`.

## Supabase

1. Open **Authentication → Providers → Google**.
2. Enable Google and add the Google client ID and client secret.
3. Under **Authentication → URL Configuration**, set the production Site URL.
4. Add `http://localhost:3000/auth/callback` and the production `/auth/callback` URL to the redirect allow list.
5. Keep email identity linking automatic. Do not enable manual account linking for this flow.

For MCP login, also enable the Supabase OAuth 2.1 Server, use an asymmetric signing key, set the authorization path to `/oauth/consent`, and enable dynamic client registration only for environments that need MCP client interoperability.

## Website environment

Copy `apps/web/.env.example` to `apps/web/.env.local` for local development and set:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Add the same two public values to the website's deployment environment before publishing the authenticated flow. Never add `SUPABASE_SERVICE_ROLE_KEY` to the website environment.

## Verification

1. Open `/login` and continue with Google.
2. Confirm Google returns through `/auth/callback` and `/account` shows the signed-in email.
3. Sign out and confirm `/account` requires sign-in again.
4. Start an MCP connection and confirm `/oauth/consent` preserves the request, shows the client and scopes, and returns both allow and deny decisions to the registered client callback.
