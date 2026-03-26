# tonymars.me — Project Context

## What This Is

Personal brand website for Tony Mars at `tonymars.me`. Brand hub + blog + funnel hosting platform.
Tony is NOT technical — explain things simply, execute commands yourself.

## Current Status

- **Infrastructure:** Built and deployed on Vercel
- **Design Phase:** Phase 1 (wireframe) DONE. Phase 2 (visual direction) is NEXT.
- **Wireframe approved:** Option A — editorial left-aligned, hero 88px headline, section headlines 48px, router cards with 01/02/03 numbers + bordered buttons + hover lift, proof strip with vertical dividers, about photo 4:5 ratio
- **Wireframe file:** `wireframes/option-a.html` (approved version)

### Design Phases
1. ~~Wireframe/sketch~~ — DONE
2. Visual direction — 2-3 color/font/vibe options → pick one — NEXT
3. High-fidelity draft — full design in browser, iterate
4. Production build — apply to live Next.js site

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Blog CMS:** Sanity v3 (headless, free tier)
- **i18n:** next-intl — Russian at launch, no URL prefix for default locale
- **Hosting:** Vercel (auto-deploy on push to main)
- **Repo:** https://github.com/thetonymars/tonymars.me
- **Domain:** tonymars.me

## Architecture

### URL Structure
- Site pages: flat at root (`/about`, `/privacy-policy`, `/terms`, `/oferta`)
- Blog: `/blog`, `/blog/[slug]`
- Funnels: `/go/[funnel-name]/[page-type]` (e.g., `/go/avatar-passport/reg-a`)
- Funnels are noindex (`robots.txt` disallows `/go/`)

### Funnel Page Types
| Type | Purpose | Versioned |
|---|---|---|
| `reg-a/b` | Opt-in form | Yes |
| `confirmation` | "Check your email" (double opt-in) | No |
| `registered` | "You're confirmed" | No |
| `details-a/b` | Sales page | Yes |
| `order-a/b` | Checkout | Yes |
| `thank-you` | Purchase done | No |
| `upsell-a/b` | Upsell | Yes |
| `downsell-a/b` | Downsell | Yes |
| `replay` | Webinar replay | No |
| `attend` | Webinar attend | No |

### Layout System (Route Groups)
- `app/[locale]/(site)/` — site pages with SiteHeader + SiteFooter
- `app/[locale]/(funnel)/` — funnel pages with FunnelFooter only (no header)
- Layout preset is determined by route group, any page can override

### Homepage Sections
Modular, config-driven. Order defined in `lib/site-config.ts`:
```ts
homeSections: ["hero", "router", "proof", "about", "blog-preview", "cta"]
```
Add/remove/reorder by changing the array.

### i18n
- Default locale (Russian) has NO URL prefix
- Adding English: create `messages/en.json`, English pages appear at `/en/...`
- `Link` must be imported from `@/i18n/navigation` (next-intl v4 pattern)
- Next.js 16 uses `proxy.ts` instead of `middleware.ts`

### Tracking Scripts
Config-driven loader at `lib/scripts.config.ts`. Add scripts by adding entries to the config + env vars on Vercel. No external tag manager (GTM blocked in Russia).

### AXL Integration
Script-based popup. Tony provides the AXL embed script per funnel. Button click triggers AXL popup form. No API.

### Blog (Sanity)
- Sanity project ID: `2xpze0f8`, dataset: `production`
- Schema reference at `sanity/schemas/post.ts`
- Queries at `lib/sanity/queries.ts`
- BlogPreview on homepage auto-hides when no posts
- RSS feed at `/blog/feed.xml`

## Key Files
- `lib/site-config.ts` — social links, nav, section registry
- `lib/scripts.config.ts` — tracking scripts config
- `messages/ru.json` — all Russian locale strings
- `components/sections/` — homepage section components
- `components/funnel/` — funnel building blocks (FunnelHeadline, FunnelCTA, VideoEmbed)
- `components/layout/` — SiteHeader, SiteFooter, FunnelFooter, SkipToContent

## Social Links
- YouTube: https://www.youtube.com/@the-tony-mars
- Telegram: https://t.me/thetonymars

## Environment Variables (Vercel)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = `2xpze0f8`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SITE_URL` = `https://tonymars.me`
- `NEXT_PUBLIC_YOUTUBE_URL` = `https://www.youtube.com/@the-tony-mars`

## Design Decisions Made
- Clean premium aesthetic — NOT techy/hacker, NOT loud DR, NOT corporate
- Target audience: Russian-speaking business owners, coaches, psychologists (not developers)
- No terminal aesthetic, no code vibes — scares the audience
- Confident, calm, authoritative feel
- Golden ratio, rule of thirds, 8px grid, 1.25 typographic scale
- Minimal animations: scroll reveal (once), hover lifts, no parallax
- Mobile-first: 60%+ audience is mobile

## Specs & Plans
- Design spec: `docs/superpowers/specs/2026-03-26-tonymars-me-mvp-design.md`
- Implementation plan: `docs/superpowers/plans/2026-03-26-tonymars-me-mvp.md`
