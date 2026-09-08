# Website login setup

The website offers Google and passwordless email sign-in through Supabase Auth. Google uses the existing cookie-based PKCE callback. Email uses a six-digit code verified through `verifyOtp({ email, token, type: "email" })`. Both retain Supabase SSR cookies and never expose the Supabase secret or service-role key.

## Google Cloud

1. Create or select a Google Cloud project.
2. Configure the Google Auth Platform branding, audience and the `openid`, `email` and `profile` scopes.
3. Create an OAuth client with application type **Web application**.
4. Add `http://localhost:3000` and `https://rendyn.dev` as authorized JavaScript origins.
5. Add `https://vgihvrqelwuenfumnugw.supabase.co/auth/v1/callback` as the hosted Supabase Auth redirect URI. Local Supabase uses `http://127.0.0.1:54321/auth/v1/callback`.

## Supabase

1. Open **Authentication → Providers → Google**.
2. Enable Google and add the Google client ID and client secret.
3. Under **Authentication → URL Configuration**, set the Site URL to `https://rendyn.dev`.
4. Add `http://localhost:3000/auth/callback`, `http://127.0.0.1:3000/auth/callback`, and `https://rendyn.dev/auth/callback` to the redirect allow list.
5. Keep email identity linking automatic. Do not enable manual account linking for this flow.

## Email sign-in

1. Keep the Email provider enabled and email confirmation required.
2. Configure production SMTP delivery. The default Supabase mail service is not a production delivery solution for arbitrary users.
3. Apply `supabase/templates/email-code.html` to both **Magic Link** and **Confirm Signup** in the hosted project, with subject **Your Rendyn login code**. The template renders `{{ .Token }}`; the form verifies that six-digit code. Keep OTP length at six. The checked-in template configuration applies to local Supabase; it does not update hosted settings.
4. Retain Supabase email rate limits. The UI adds a 60-second resend cooldown; the provider remains authoritative for throttling, expiry and verification.
5. Verify delivery and login for both an existing email and a new email before release; enabling the provider alone does not prove SMTP delivery.

For MCP login, also enable the Supabase OAuth 2.1 Server, use an asymmetric signing key, set the authorization path to `/oauth/consent`, and enable dynamic client registration only for environments that need MCP client interoperability.

## Website environment

Copy `apps/web/.env.example` to `apps/web/.env.local` for local development and set:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Add the same two public values to the website's deployment environment before publishing the authenticated flow. Billing also requires server-only Stripe values and `SUPABASE_SERVICE_ROLE_KEY`; never prefix those secrets with `NEXT_PUBLIC_` or reference them from a Client Component.

## Verification

1. Open `/login` and continue with Google.
2. Confirm Google returns through `/auth/callback` and `/account` shows the signed-in email.
3. Sign out and confirm `/account` requires sign-in again.
   Confirm sign-out returns to `/login`, both login options appear, and email sign-in preserves a `next` destination such as `/oauth/consent?authorization_id=...`.
4. Start the card-backed seven-day trial and confirm `/account` shows the future trial end.
5. Start an MCP connection and confirm `/oauth/consent` preserves the request, requires trial-or-paid access, shows the client and scopes, and returns both allow and deny decisions to the registered client callback.

## Login design

The login adopts the selected Quiet layout, with input focus treatment and code slots inspired by the catalogue’s `input` and `otp-input` components. It uses the existing `EASE_OUT` motion token for field expansion and screen transitions, respects reduced motion, and keeps native email input, keyboard editing, paste and one-time-code autofill.
