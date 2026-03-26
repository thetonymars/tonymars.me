# tonymars.me — MVP Website Design Spec

## Overview

Personal brand website for Tony Mars at `tonymars.me`. Serves as brand hub, blog, and funnel hosting platform. Deployed on Vercel via GitHub.

**Design phase approach:** Wireframe sketches → visual direction options → high-fidelity drafts → production build. Iterative, not waterfall.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 (utility classes, no UI library)
- **Blog CMS:** Sanity v3 (blog content only, free tier)
- **i18n:** `next-intl` — Russian at launch, English-ready architecture
- **Hosting:** Vercel
- **Repo:** GitHub
- **Domain:** tonymars.me

---

## URL Structure

Based on `AI url-structure-best-practices-yellows.md` (P0047), adapted for tonymars.me.

### Site pages (flat at root)

```
tonymars.me/                          ← Homepage
tonymars.me/about                     ← About (if expanded later)
tonymars.me/privacy-policy            ← Privacy policy
tonymars.me/terms                     ← Terms & conditions
tonymars.me/oferta                    ← Public offer agreement
tonymars.me/personal-data-agreement   ← Personal data agreement
tonymars.me/expired                   ← Generic expired offer page
```

### Blog (subdirectory)

```
tonymars.me/blog                      ← Blog listing
tonymars.me/blog/[slug]               ← Blog post
```

No dates, no categories in URLs. Flat under `/blog/`.

### Funnel pages (hierarchical under /go/)

```
tonymars.me/go/[funnel-name]/[page-type]
```

Route in Next.js: `app/(locale)/go/[funnel]/[page]/page.tsx` (locale handling via `next-intl` middleware, not path segment)

**Page type vocabulary (reserved keywords):**

| Keyword | Purpose | Versioned | Example |
|---|---|---|---|
| `reg-a`, `reg-b` | Opt-in / registration form | Yes | `/go/avatar-passport/reg-a` |
| `confirmation` | Double opt-in "check your email" | No | `/go/avatar-passport/confirmation` |
| `registered` | Post-confirm "you're in" | No | `/go/avatar-passport/registered` |
| `details-a`, `details-b` | Sales / offer page | Yes | `/go/avatar-passport/details-a` |
| `order-a` | Checkout / order page | Yes | `/go/avatar-passport/order-a` |
| `thank-you` | Purchase completion | No | `/go/avatar-passport/thank-you` |
| `upsell-a` | Upsell page | Yes | `/go/avatar-passport/upsell-a` |
| `downsell-a` | Downsell page | Yes | `/go/avatar-passport/downsell-a` |
| `replay` | Webinar replay | No | `/go/avatar-passport/replay` |
| `attend` | Webinar/event attend | No | `/go/avatar-passport/attend` |

**Version convention:** Suffix `-a`, `-b`, `-c` on the page type keyword. No separate path segment. Pages that don't need A/B testing (confirmation, registered, thank-you) have no version suffix.

### Technical standards

- All lowercase URLs
- No trailing slashes (redirect `/about/` → `/about`)
- HTTPS only (redirect HTTP → HTTPS)
- Non-www (redirect `www.` → root)
- `rel="canonical"` on every page
- Hyphens only for word separation (no underscores, spaces, camelCase)
- `robots.txt`: `Disallow: /go/` (funnel pages are paid traffic, no SEO value)

### Analytics filtering (clean by construction)

| What to filter | GA4 / Meta / Google Ads rule |
|---|---|
| All opt-ins | `contains /reg-` |
| All "check email" pages | `contains /confirmation` |
| All confirmed opt-ins | `contains /registered` |
| All sales pages | `contains /details-` |
| All purchases | `contains /thank-you` |
| All pages for one funnel | `begins with /go/avatar-passport/` |
| All funnel traffic | `begins with /go/` |

No collisions between any filter patterns.

---

## Homepage Structure

Six modular sections. Each is an independent React component. Sections are configured via an array — reorder, add, or remove without touching component code.

```ts
const homeSections = ["hero", "router", "proof", "about", "blog-preview", "cta"]
```

### 1. Hero

- Tony Mars name + one-line positioning statement
- Short supporting paragraph (2-3 sentences)
- Two buttons: YouTube channel + Telegram channel
- Clean, generous whitespace. Statement does the work.

### 2. Router ("What are you looking for?")

- 3-5 cards framed around visitor's problem or desired outcome
- Each card: headline + one sentence + button → links to relevant funnel page or lead magnet
- Cards defined in a data file — add/remove/edit without touching component code
- Examples (copy TBD): "Research your market", "Understand your customer without interviews", "Create a converting offer"

### 3. Proof strip

- Horizontal row of key numbers (years of experience, AI agents, client results)
- Compact, one visual line. No fluff.

### 4. About

- Photo (tony-portrait.png or updated photo) + short bio paragraph
- 3-4 differentiator tags (e.g., "19 years direct marketing", "Solo + AI", "Builder not teacher")
- Builds authority, not autobiography

### 5. Blog preview

- Heading + 3 most recent post cards from Sanity
- Each card: title + date + excerpt
- "All posts" link to `/blog`

### 6. CTA footer

- Simple closer line + YouTube and Telegram buttons
- Not aggressive — just available

---

## Funnel Page Architecture

- Each funnel is a directory under `app/(locale)/go/[funnel-name]/`
- Pages are React components — fully code-based, no CMS
- Each funnel page is self-contained: its own layout, copy, design
- Reusable building blocks available (headline, CTA button, testimonial block, pricing card, etc.) but not forced
- Claude Code creates and edits funnel pages directly in the codebase
- New funnel = new folder + page components

---

## Blog Architecture

- **Sanity v3** as headless CMS (free tier, hosted by Sanity)
- Blog listing at `/blog`, posts at `/blog/[slug]`
- **Post schema:** title, slug, body (Portable Text / rich text), excerpt, cover image, published date, tags
- Static generation at build time with ISR (Incremental Static Regeneration)
- Sanity webhook triggers Vercel rebuild on publish — no manual deploys
- Homepage blog preview pulls 3 latest posts automatically
- Claude Code can create/edit posts via Sanity API

---

## Internationalization

- All UI text and page content in locale files (JSON)
- `ru.json` at launch — only Russian content
- URL strategy: **default locale (Russian) has no prefix.** Non-default locales get a prefix (e.g., `/en/about`, `/en/blog`). This means all URL examples in this spec are the actual production URLs — no `/ru/` prefix needed.
- Adding English later = create `en.json` + translate content. English pages appear at `/en/...`. No code changes, no Russian URL changes.
- Auto-detect browser language, language switcher in header (appears when multiple locales exist)
- Section content comes from locale files, so translating = adding keys

---

## Section Modularity

- Homepage sections are independent React components
- Section order defined in config array — reorder by changing array position
- Remove section = remove from array
- Add new section = create component + add to array
- Each section receives its content from locale files
- New section types can be created anytime without affecting existing ones

---

## Navigation

- Clean minimal header: logo left, nav links right
- Language switcher appears when English is added
- Mobile: hamburger menu
- Header behavior: appears on scroll-up, hides on scroll-down (auto-hide pattern)
- No heavy sticky header taking permanent screen space

---

## Design Direction

### Visual principles

- **Clean premium.** Generous whitespace. Nothing screams.
- **Muted, sophisticated palette.** No neon, no terminal aesthetics, no hacker vibes.
- **One accent color** for CTAs and key interactive elements.
- **Typography-driven hierarchy.** Strong contrast between heading and body sizes. Elegant, readable.
- **Professional photography** (Tony's portrait), no illustrations or stock photos.
- **Every element earns its place.** If it doesn't serve a purpose, it's removed.

### Design principles applied

- **Golden ratio** for proportional relationships between sections and elements
- **Rule of thirds** for image and content placement
- **Gestalt proximity and grouping** for card layouts and information clusters
- **F-pattern / Z-pattern** reading flow for content sections
- **8px grid system** for consistent spacing and alignment
- **Typographic scale** (e.g., 1.25 or 1.333 ratio) for harmonious font sizes

### What it is

- Confident, calm, authoritative
- Feels like a high-end consultant's site
- Easy to navigate — visitor finds what they need in seconds
- Professional enough for business owners and experts (psychologists, coaches, nutritionists)

### What it is NOT

- Not techy/hacker (terminal aesthetic scares the target audience)
- Not loud direct-response (cheap guru vibe)
- Not corporate (boring, no personality)
- Not generic AI-generated (no stock photography, no cookie-cutter layouts)

### Design phases

1. **Wireframe/sketch** — black and white, layout and hierarchy only. Find the right structure.
2. **Visual direction** — 2-3 mood options (color palette, typography, spacing). Pick the vibe.
3. **High-fidelity draft** — full design in browser, iterate until approved.
4. **Production build** — convert to final Next.js components.

Specific font pairing, color palette, and spacing values will be decided during the visual direction phase (phase 2) based on Tony's reaction to options.

---

## Legal Pages

- Site-wide, NOT per-funnel
- `/privacy-policy`, `/terms`, `/oferta`, `/personal-data-agreement`
- Every funnel page links to these site-wide pages
- Content in Russian at launch (legal content is locale-specific — may need separate legal text for English version)

---

## Deployment

- GitHub repo: `tonymars-homepage` (or renamed to `tonymars.me`)
- Vercel project connected to GitHub repo
- Custom domain: `tonymars.me` pointed to Vercel
- Auto-deploy on push to `main`
- Preview deployments on PRs (Vercel default)
- Environment variables for Sanity project ID, dataset, API token

---

## Out of Scope (MVP)

- Members area (`members.tonymars.me`) — later
- Email opt-in / newsletter — not at launch
- Payment processing / checkout — handled by external platform (AXL)
- English content — architecture ready, content not at launch
- Advanced analytics setup (GA4, Meta Pixel, GTM) — infrastructure ready, configuration separate
- Search functionality
- Dark mode
