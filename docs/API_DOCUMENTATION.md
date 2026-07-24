# Saptham browser integrations

Saptham has no custom application server. The Cloudflare Pages SPA calls
Supabase and Formspree directly from the browser.

## Supabase

Client: `src/lib/supabase.ts`
Data access: `src/data/repositories/`
Configuration: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`

The publishable key is intentionally present in the built JavaScript. Postgres
grants and RLS define its authority. Never expose a service-role/secret key to
the browser.

Repositories read published CMS rows and use bundled fallbacks when Supabase is
unconfigured or unavailable. Calendar writes require:

1. password authentication of the fixed application identity;
2. a successful `public.is_admin()` RPC; and
3. the matching server-side RLS policy.

`detectSessionInUrl` is disabled because the application currently has no
OAuth, magic-link, or password-recovery redirect flow.

## Formspree

`src/components/ContactUs.jsx` sends JSON to:

```text
POST https://formspree.io/f/mojwgvjb
```

Fields are `name`, `email`, `message`, and the `_gotcha` honeypot. The endpoint
identifier is public by design. Spam filtering, quotas, reCAPTCHA, recipients,
and submission retention are controlled in the Formspree dashboard.

The repository also contains an optional Supabase contact repository. It is not
called by the active form. Choose one canonical inbox before wiring both.

## Google Maps

The contact page embeds a keyless Google Maps iframe for CEG Square. It does not
use a Maps JavaScript API key.

## Runtime source policy

`public/_headers` restricts scripts to the site origin, network connections to
Supabase and the exact Formspree endpoint, and frames to Google Maps. Any new
runtime integration must be reviewed in both application code and CSP.
