# SECURITY_REPORT.md — Saptham Website

**Overall risk: LOW.** This is a static, read-only brochure SPA with no backend, no auth,
no database, and no user data at rest. The attack surface is small. No hard secrets are
exposed. Findings below are mostly hardening opportunities.

## Summary table
| Severity | Finding |
|----------|---------|
| Low | Formspree form ID is public & spammable (no anti-bot) |
| Low | Footer external links missing `rel="noopener noreferrer"` (`target` also absent) |
| Low | No SEO/security meta; no CSP header (host-level) |
| Info | No `.env`, no API keys, no tokens committed — clean |
| Info | Google Maps embed is keyless — nothing to leak |
| Info | Dependencies modern; run `npm audit` in CI to stay current |

## 1. Exposed secrets / API keys
**None found.** No `.env` file, no hardcoded credentials, tokens, or private keys in the
repo or the built bundle. The only "identifiers" present are:
- **Formspree form ID `mojwgvjb`** — a *public* endpoint ID (by design). Not a secret, but
  see #2.
- **Google Maps embed URL** — keyless embed; no secret.
- **Public contact info** (club emails/phones) — intentionally public.

## 2. Contact form abuse (Low)
`POST https://formspree.io/f/mojwgvjb` is callable by anyone who reads the bundle. There is
**no honeypot, no CAPTCHA, and no client rate limiting**, so the form is spammable.
- **Mitigation:** enable Formspree's built-in reCAPTCHA/honeypot, or add a hidden
  honeypot field, and rely on Formspree's server-side spam filtering & quotas.

## 3. Cross-site scripting (XSS) — LOW
- **No `dangerouslySetInnerHTML`** anywhere. React escapes interpolated content by default.
- All rendered content is **static, developer-authored** literals — no user-generated HTML
  is rendered back. Contact form input is sent to Formspree, never echoed into the DOM.
- **Verdict:** no practical XSS vector in current code.

## 4. CSRF — Not applicable
No authenticated session, no cookies, no state-changing same-origin endpoints. The form
posts cross-origin to Formspree, which handles its own request validation.

## 5. Injection (SQL/command/template) — Not applicable
No backend, no database, no server-side query construction.

## 6. Insecure external links (Low)
- `ContactUs.jsx` social links correctly use `target="_blank" rel="noopener noreferrer"`.
- **`Footer.jsx` social links use neither `target` nor `rel`** — add
  `rel="noopener noreferrer"` (and `target="_blank"`) to prevent reverse-tabnabbing and
  match the contact page behavior.

## 7. Authentication / authorization
None exists and none is required for a public brochure site. If an admin/CMS area is added
later (see roadmap), it must introduce proper auth — do **not** ship an unauthenticated
edit surface.

## 8. Dependency vulnerabilities
- Stack is current (React 19.1, Vite 6.2, Tailwind 4.1, react-router 7.8). No known-critical
  advisories were introduced by choice of versions.
- **Action:** add `npm audit --production` (or Dependabot/Renovate) to CI and review
  periodically. Remove unused deps (`swiper`, `@emailjs/browser`) to shrink surface.

## 9. Transport / headers (host-level)
- Serve exclusively over **HTTPS** (Netlify/Vercel do this automatically).
- Consider adding security headers at the host: `Content-Security-Policy` (allow self +
  Formspree + Google Maps embed frame), `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options`/`frame-ancestors`.

## Recommended actions (priority order)
1. Add `rel="noopener noreferrer"` (+`target="_blank"`) to Footer social links.
2. Turn on Formspree spam protection (reCAPTCHA/honeypot).
3. Add host security headers + enforce HTTPS.
4. Add `npm audit` / Dependabot to CI; prune unused dependencies.
5. If a CMS/admin is ever added, design authentication before exposing any write path.
