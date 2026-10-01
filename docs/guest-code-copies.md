# Free component code after login

Every component page offers Preview and Code tabs. The Code tab stays clickable
for visitors and shows “Log in to get this component free”. Login returns to the
same component with its Code tab open. A verified account unlocks all component
source files, copying, dependencies, installation instructions and MIT licences;
no subscription or payment is required.

The source endpoint verifies the session with Supabase before loading any source.
Anonymous requests receive 401. Authentication errors fail closed with 503.
Source and access responses use private/no-store caching and vary by Cookie.
Copying rechecks the session; focusing the page refreshes the visible source.

This replaces the unpublished two-copy guest allowance. No copy counter, signing
secret, database migration or billing change is needed. Existing Supabase login
configuration is required. Public interactive previews remain available.
