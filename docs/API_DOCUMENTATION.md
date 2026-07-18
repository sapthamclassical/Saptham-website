# API_DOCUMENTATION.md — Saptham Website

> This project has **no backend and no internal API**. It is a static SPA. The only
> network calls are to two third-party services. This document catalogs them so a
> maintainer knows exactly what talks to the outside world.

## External integration 1 — Formspree (contact form)

**Where:** `src/components/ContactUs.jsx` → `handleSubmit()`

```
POST https://formspree.io/f/mojwgvjb
Content-Type: application/json

Body:
{
  "name":    "<string>",
  "email":   "<string>",
  "message": "<string>"
}
```

**Flow:**
```
User fills form ──submit──► fetch POST Formspree
                                   │
                     response.ok ? │
              ┌────────────────────┴────────────────────┐
        setStatus('success')                       setStatus('error')
        reset form fields                    (network error or non-2xx)
```

**Notes / caveats:**
- The form ID `mojwgvjb` is a **public** Formspree identifier baked into the client
  bundle. This is normal for Formspree, but it is **spammable** — anyone can POST to it.
  Formspree's free tier applies its own rate limiting; add a honeypot/reCAPTCHA to harden.
- No client-side email-format or length validation beyond `type="email"` + `required`.
- The Formspree account (owner, submission quota) is **external to this repo** — the new
  maintainer must obtain access to the Formspree dashboard to receive submissions.
- On success/error the UI shows a message; there is no retry or field-level error surfacing.

## External integration 2 — Google Maps embed

**Where:** `src/components/ContactUs.jsx` → `<iframe>`

```
GET https://www.google.com/maps/embed?pb=...CEG%20Square...
```
- Keyless Maps **embed** iframe (not the JavaScript API), so **no API key** is required
  and there is nothing secret to leak. Points at "CEG Square", Anna University.

## Third-party asset/CDN calls at runtime
None. All images are bundled locally (except the broken references documented in
DEPLOYMENT_GUIDE / SECURITY_REPORT, which simply 404).

## "API flow" diagram (whole app)

```
┌────────────┐        static files (HTML/JS/CSS/img)        ┌───────────────┐
│  Browser   │ ◄──────────────────────────────────────────  │  Static host  │
│  (React)   │                                               │ (CDN/dist/)   │
└─────┬──────┘                                               └───────────────┘
      │ POST /f/mojwgvjb (JSON)                 embed iframe
      ▼                                              │
┌────────────┐                               ┌───────▼────────┐
│  Formspree │ ──► email to club inbox       │  Google Maps   │
└────────────┘                               └────────────────┘
```

## For future API work
If the club later needs dynamic data (event RSVP, member signup, admin CMS), there is
currently **no** API layer, service module, fetch wrapper, or auth token handling to
build on. See IMPROVEMENT_ROADMAP.md for a suggested `src/services/` + serverless
function approach.
