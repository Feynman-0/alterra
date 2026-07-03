# Alterra — Independent Commercial Banking Advisory

Marketing site for Alterra (Dana Swanson, Granite Bay, CA). Built with **Next.js 15 + React 19 + TypeScript**, animated with **Framer Motion** and **Lenis**, styled with hand-written CSS (no UI framework). Deployable as-is to **Vercel** or **Railway**.

## Pages

| Route | Purpose |
|---|---|
| `/` | Conversion homepage — hero, credo, problem→solution, services, process, outcomes, testimonials, FAQ, CTA |
| `/about` | Firm story, founder profile, values |
| `/services` | Financing Advisory · Treasury Management · Banking Transitions (deep-linkable: `#financing-advisory` etc.) |
| `/testimonials` | Quote ledger, anonymized case studies, sectors served |
| `/contact` | Contact form + discovery-call scheduler (`/contact#book`) |
| `/privacy-policy`, `/terms-of-use` | Legal |

## Editing the website text (no code knowledge needed)

**Every word on the site lives in one file: [`lib/content.ts`](lib/content.ts).**
Open it, change the text between quotes, save, redeploy. Headlines, services, FAQ answers, testimonials, legal copy — all of it is there, organized per page. This file is the "editable dashboard": nothing else needs touching for copy changes. (A visual CMS such as Sanity or Decap can be layered on later; the content is already centralized to make that a small job.)

> **⚠ Draft copy notice:** statistics, testimonials, case studies and Dana's biography are **placeholder draft copy** written from the intake form. They must be reviewed/confirmed by the client before launch.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy

- **Vercel:** import the repo → framework auto-detected → deploy. Done.
- **Railway:** new service from repo → build `npm run build`, start `npm start`.

After the domain is registered (client prefers `.com`), update `site.url` in `lib/content.ts` — canonical URLs, sitemap, robots and OpenGraph all read from it.

### Admin login env var

Set `ADMIN_PASSWORD` in your deployment environment before using `/admin`. The login cookie hash is derived from that value on the server, so the password no longer lives in source control.

Local development:

- Put the value in `.env.local` at the repo root.
- Copy `.env.example` if you want a template.

Vercel:

1. Open your project in the Vercel dashboard.
2. Go to Settings.
3. Open Environment Variables.
4. Add `ADMIN_PASSWORD` as the key and paste the same value you use locally.
5. Save, then redeploy.

## Lead capture & booking

The contact form and the scheduler both POST to `app/api/enquiry/route.ts`:

- Every enquiry is **logged** (visible in Vercel/Railway logs) and spam-filtered via honeypot.
- To receive enquiries **by email**, set env vars:
  - `RESEND_API_KEY` — from [resend.com](https://resend.com) (free tier is plenty)
  - `ENQUIRY_FORWARD_TO` — the inbox that should receive leads
- The scheduler sends *requested* times which you confirm by email. To switch to fully automated booking, replace `components/contact/BookingScheduler.tsx` with a Cal.com or Calendly embed — the section layout doesn't change.

## Analytics & conversion tracking

- Plausible: set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com` — script loads automatically.
- GA4/GTM: paste the GTM snippet into `app/layout.tsx`; events already flow to `window.dataLayer`.
- Conversion events fired: `enquiry_submitted`, `booking_requested` (see `lib/analytics.ts`).

## Imagery

Hero photographs live in `public/images/` and are referenced from `lib/content.ts` (each hero has a `image: { src, alt }` entry — swap the file or the path to change a photo). Current images are sourced from Unsplash under the [Unsplash License](https://unsplash.com/license) (free for commercial use, no attribution required). Every photo is graded into the navy brand palette by CSS scrims, so replacements don't need to be color-matched — pick good composition and the grade does the rest.

## Placeholders to finalize before launch

1. `site.email` — currently Dana's intake email; swap for a domain inbox.
2. `site.linkedin` — set Dana's LinkedIn URL (footer + contact page).
3. Founder portrait — drop Dana's photograph into the `about-portrait` figure (`app/about/page.tsx`).
4. Stats/testimonials/case studies in `lib/content.ts` — confirm or replace.
5. `site.url` — final registered domain.

## Design system

Tokens (colors, type, spacing) live in `app/globals.css`; per-section styles in `app/sections.css`, namespaced by prefix (`hero-`, `svc-`, `book-`…). Fonts: Fraunces (display serif) + Manrope (sans) via `next/font`. Motion primitives in `components/motion/` — all animations are transform/opacity only, IntersectionObserver-driven, and fully disabled under `prefers-reduced-motion`.
