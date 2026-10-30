# Supabase OAuth setup for MCP

Supabase Auth is the authorization server; Rendyn is the protected resource server.

1. Create separate Supabase projects/clients for local, staging, and production.
2. Migrate JWT signing to RS256 or ES256. The API deliberately rejects symmetric JWTs.
3. Enable OAuth 2.1 Server and dynamic client registration.
4. Configure the Supabase authorization path, for example `https://app.example.com/oauth/consent`.
5. Build that page in the human-facing app. It must preserve `authorization_id`, require login, show the requesting client and scopes, and call `supabase.auth.oauth.approveAuthorization(...)` or `denyAuthorization(...)`.
6. Set the API and website authentication environment variables. Free MCP access needs no Stripe checkout, subscription entitlement or new migration. Retain existing billing configuration when supporting previous subscribers.
7. Deploy the API and confirm the protected-resource, authorization-server, `401` challenge, token refresh, revoke, and MCP tool flows from a real host.

Dynamic registration is useful for MCP interoperability but expands the set of clients that can ask users for consent. Keep explicit consent enabled, show the client name/redirect URI/scopes, monitor registrations, and rate-limit both discovery and authorization flows at the edge.

The website includes Google sign-in, the PKCE callback, cookie session refresh, account sign-out and explicit MCP consent. Components and website source are free without login. MCP is free for verified accounts and does not depend on subscription status. New paid checkout is disabled; the billing portal and signed webhooks remain for managing existing subscriptions. Deploy the website and MCP Workers together before treating this source behavior as live. See [Google login setup](google-auth-setup.md).
