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

### Funnel pages (under /go/)

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
- Auto-generated `sitemap.xml` via Next.js (excludes `/go/` pages)
- RSS feed at `/blog/feed.xml` for blog posts

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

Six modular sections + persistent site footer. Each section is an independent React component. Sections are configured via an array — reorder, add, or remove without touching component code.

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
- Each card links to a specific funnel page or lead magnet
- Cards defined in a data file — add/remove/edit without touching component code

**Router card data model:**

```ts
interface RouterCard {
  id: string
  headline: string        // Problem or outcome framing
  description: string     // One sentence elaboration
  buttonText: string      // CTA label
  href: string            // Link to funnel page, e.g. "/go/avatar-passport/reg-a"
  icon?: string           // Optional icon identifier
}
```

Examples (copy TBD during design phase):
- "Research your market" → links to market research funnel
- "Understand your customer without interviews" → links to avatar passport funnel
- "Create a converting offer" → links to offer creation funnel

### 3. Proof strip

- Horizontal row of key numbers (years of experience, AI agents, client results)
- Compact, one visual line. No fluff.
- On mobile: 2x2 grid or horizontal scroll

### 4. About

- Photo (tony-portrait.png or updated photo) + short bio paragraph
- 3-4 differentiator tags (e.g., "19 years direct marketing", "Solo + AI", "Builder not teacher")
- Builds authority, not autobiography

### 5. Blog preview

- Heading + 3 most recent post cards from Sanity
- Each card: title + date + excerpt + cover image thumbnail
- "All posts" link to `/blog`

### 6. CTA section

- Simple closer line + YouTube and Telegram buttons
- Not aggressive — just available

---

## Page Shell (Layout System)

Every page assembles its shell from three modular pieces: header, content, footer. Each piece can be toggled on/off or swapped per page.

**Three layout presets:**

| Preset | Header | Footer | Used by |
|---|---|---|---|
| `site` | Site header (full nav) | Site footer (social + legal + copyright) | Homepage, /about, /blog, legal pages |
| `funnel` | None | Funnel footer (legal links only, minimal) | All `/go/` funnel pages |
| `minimal` | None | None | Special pages (expired, custom landing) |

Any page can override the preset — e.g., a funnel page that needs a specific branded header for a webinar. The layout is a choice, not a constraint.

**Site header:**
- Logo/name left, nav links right
- Nav links: site pages + blog (exact items TBD during design)
- Language switcher appears when English is added
- Mobile: hamburger menu with slide-out panel
- Header behavior: appears on scroll-up, hides on scroll-down (auto-hide pattern)
- No heavy sticky header taking permanent screen space

**Site footer:**
- Social links: YouTube, Telegram (icon buttons)
- Legal links: Privacy Policy, Terms, Oferta
- Copyright: "© 2026 Tony Mars"
- Minimal design — one line or two, not a mega-footer

**Funnel footer:**
- Legal links only (Privacy Policy, Terms, Oferta) — small text, minimal visual weight
- No social links, no copyright block, no navigation — nothing that distracts from conversion

---

## Funnel Page Architecture

- Each funnel is a directory under `app/(locale)/go/[funnel-name]/`
- Pages are React components — fully code-based, no CMS
- Each funnel page is self-contained: its own layout, copy, design
- Funnel pages do NOT show the site header/footer — they are standalone conversion pages with only a minimal legal footer
- Claude Code creates and edits funnel pages directly in the codebase
- New funnel = new folder + page components

**Reusable building blocks** (component library, available to all funnel pages):

| Component | Purpose |
|---|---|
| `FunnelHeadline` | Main headline with optional subheadline |
| `FunnelCTA` | Call-to-action button with optional urgency text |
| `FunnelForm` | Opt-in form (name, email, phone — configurable fields) |
| `TestimonialCard` | Single testimonial with name, photo, quote |
| `TestimonialGrid` | Grid/carousel of testimonials |
| `PricingCard` | Product pricing with features list |
| `PricingStack` | Multiple pricing options side by side |
| `BenefitsList` | Bulleted benefits with icons |
| `GuaranteeBlock` | Money-back guarantee or risk reversal |
| `CountdownTimer` | Deadline urgency (real deadlines only) |
| `VideoEmbed` | Responsive video player (YouTube/Vimeo) |
| `FunnelFooter` | Minimal footer with legal links only |

Components are available but never forced. Each funnel page decides what to use.

---

## Blog Architecture

- **Sanity v3** as headless CMS (free tier, hosted by Sanity)
- Blog listing at `/blog`, posts at `/blog/[slug]`
- Static generation at build time with ISR (Incremental Static Regeneration)
- Sanity webhook triggers Vercel page revalidation on publish — no manual deploys
- Homepage blog preview pulls 3 latest posts automatically
- Claude Code can create/edit posts via Sanity API
- RSS feed auto-generated at `/blog/feed.xml`

**Post schema (Sanity):**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | Post title |
| `slug` | slug | Yes | URL slug, auto-generated from title |
| `body` | Portable Text | Yes | Rich text with embedded images, code blocks |
| `excerpt` | text | Yes | Short summary for cards and meta description |
| `metaTitle` | string | No | Custom SEO title (falls back to `title`) |
| `metaDescription` | string | No | Custom SEO description (falls back to `excerpt`) |
| `coverImage` | image | Yes | Cover image for cards and OG sharing |
| `publishedAt` | datetime | Yes | Publication date |
| `tags` | array of strings | No | Filterable tags |
| `readingTime` | number | Auto | Calculated from body word count (~200 wpm) |

**Blog listing pagination:** "Load more" button, 9 posts per page. No infinite scroll (respects user control).

---

## Social Sharing & Meta

Every page needs proper sharing metadata. When someone shares a link on Telegram, Facebook, or Twitter, the preview must look professional.

**Favicon:**
- SVG favicon (modern browsers) + PNG fallback (32x32, 16x16)
- Apple touch icon (180x180)
- Design: simple "TM" monogram or single letter mark — decided during visual direction phase

**Default OG image (1200x630):**
- Tony Mars name + positioning statement + professional photo
- Used as fallback for any page without a specific OG image
- Blog posts use their cover image as OG image

**Per-page meta:**
- `<title>` — page-specific title + "| Tony Mars" suffix
- `<meta name="description">` — page-specific description
- `og:title`, `og:description`, `og:image`, `og:url`
- `twitter:card` = `summary_large_image`
- Blog posts: `article:published_time`, `article:author`

---

## Structured Data (JSON-LD)

Embedded on relevant pages for search engine rich results.

- **Homepage:** `Person` schema (name, url, jobTitle, sameAs → YouTube, Telegram)
- **Blog listing:** `WebSite` schema with search potential
- **Blog post:** `BlogPosting` schema (headline, datePublished, author, image)
- **About page:** Extended `Person` schema (bio, credentials)

---

## Internationalization

- All UI text and page content in locale files (JSON)
- `ru.json` at launch — only Russian content
- URL strategy: **default locale (Russian) has no prefix.** Non-default locales get a prefix (e.g., `/en/about`, `/en/blog`). This means all URL examples in this spec are the actual production URLs — no `/ru/` prefix needed.
- Adding English later = create `en.json` + translate content. English pages appear at `/en/...`. No code changes, no Russian URL changes.
- Auto-detect browser language, language switcher in header (appears when multiple locales exist)
- Section content comes from locale files, so translating = adding keys
- Funnel pages: i18n-ready but each funnel decides whether to support multiple languages (most won't)

---

## Section Modularity

- Homepage sections are independent React components
- Section order defined in config array — reorder by changing array position
- Remove section = remove from array
- Add new section = create component + add to array
- Each section receives its content from locale files
- New section types can be created anytime without affecting existing ones
- Each section component accepts a standard props interface (id, className) for consistent spacing and scroll targeting

---

## Responsive Design

Target audience (coaches, psychologists, business owners) is 60%+ mobile. Mobile is not an afterthought.

**Breakpoints:**

| Name | Width | Target |
|---|---|---|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |

**Mobile adaptations:**
- Hero: stacked layout, shorter text
- Router cards: single column stack (no horizontal scroll)
- Proof strip: 2x2 grid instead of horizontal row
- About: photo above text, full width
- Blog preview: single column, 2 posts instead of 3
- Navigation: hamburger menu with slide-out panel
- All touch targets: minimum 44x44px (Apple HIG standard)
- No hover-dependent interactions — everything works with tap

**Max content width:** 1200px (matches Tailwind `max-w-7xl`). Content never stretches wider. Generous side padding on all screen sizes.

---

## Micro-interactions & Animation

Premium feel requires subtle, purposeful animation. Not flashy — refined.

**Level: minimal and purposeful.** Every animation must have a reason (guide attention, confirm action, provide spatial context). No animation for decoration.

- **Page transitions:** None. Instant navigation. Speed is the premium signal.
- **Scroll reveal:** Subtle fade-up (opacity 0→1, translateY 16px→0) as sections enter viewport. Once only, not on every scroll. Duration: 400-500ms, ease-out.
- **Hover states:** Buttons get subtle lift (translateY -1px) + shadow increase. Cards get subtle border or shadow change. Duration: 150ms.
- **Proof strip numbers:** Count-up animation on first viewport entry. Once only.
- **Header:** Smooth show/hide on scroll (translateY transition, 200ms).
- **No parallax, no floating elements, no continuous animations.** These read as gimmicky to a non-tech audience.

---

## Performance

Speed is part of the premium experience. A site that loads in 3+ seconds feels cheap regardless of design.

**Targets (Core Web Vitals):**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Implementation:**
- Next.js `<Image>` component for all images (automatic WebP/AVIF, lazy loading, responsive srcset)
- Font loading: `display: swap` + preload critical font weights only (1 display weight, 2 body weights max)
- Minimal JavaScript — no heavy animation libraries, no jQuery
- Static generation for all site pages and blog posts (no server-side rendering at request time)
- Sanity images via their CDN with automatic transforms
- No third-party scripts on initial load (analytics via GTM, loaded async after page interactive)

---

## Accessibility

Baseline requirements — not optional, not a future enhancement.

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- All images have descriptive `alt` text
- Color contrast ratio: minimum 4.5:1 for body text, 3:1 for large text (WCAG AA)
- Keyboard navigation: all interactive elements reachable via Tab, activated via Enter/Space
- Skip-to-content link (visually hidden, appears on Tab)
- Focus indicators: visible focus ring on all interactive elements
- `prefers-reduced-motion`: respect OS setting, disable scroll animations
- Language attribute: `<html lang="ru">`

---

## Error Pages

**404 page:**
- Clean design consistent with the site
- Short message: "Page not found"
- Button to go to homepage
- Optional: show 3 blog posts or router cards as alternative navigation
- No site header nav clutter — just logo + message + action

**Expired offer page (`/expired`):**
- Used when a funnel offer has ended
- Message: "This offer is no longer available"
- CTA: route to homepage or a current offer
- Funnel pages can redirect here when a campaign ends

---

## Tracking & Script Management

Third-party scripts (analytics, pixels, chat widgets) all need to live somewhere in the HTML. Different scripts require different placement. Instead of scattering `<script>` tags across the codebase, all external scripts go through **one organized system**.

**Google Tag Manager (GTM) as the single entry point:**

GTM is the only third-party script hardcoded into the site. Everything else (GA4, Meta Pixel, Google Ads, Hotjar, etc.) is loaded through GTM — no code changes needed to add or remove tracking tools.

**Script placement slots in the layout:**

| Slot | Location | What goes here |
|---|---|---|
| `head-top` | Top of `<head>` | GTM container snippet (must be first), preconnect hints |
| `head-bottom` | Bottom of `<head>` | Meta tags, structured data (JSON-LD) |
| `body-top` | Right after `<body>` | GTM noscript fallback |
| `body-bottom` | Before `</body>` | Deferred scripts (chat widgets, non-critical JS) |

**How it works in Next.js:**
- `app/layout.tsx` defines all four slots
- GTM container ID is an environment variable (`NEXT_PUBLIC_GTM_ID`)
- When GTM ID is empty/missing, no tracking scripts load at all (clean dev/preview)
- All other tracking (GA4, Meta Pixel, Google Ads conversion) is configured inside GTM dashboard — zero code deploys to add or change tracking

**Per-page data layer:**

Every page pushes structured data to GTM's `dataLayer` for event targeting:

```ts
// Site page
window.dataLayer.push({ pageType: "site", pageName: "about" })

// Blog post
window.dataLayer.push({ pageType: "blog", postSlug: "my-post", postTags: ["ai", "marketing"] })

// Funnel page
window.dataLayer.push({ pageType: "funnel", funnelName: "avatar-passport", funnelPage: "reg-a" })
```

This lets GTM fire specific tags based on page type without hardcoding URL patterns — e.g., "fire Meta Purchase event when `pageType=funnel AND funnelPage=thank-you`".

**At MVP launch:** GTM container tag is in place but empty (or with just GA4). No tracking fires until configured. The architecture is ready for any tracking tool without code changes.

---

## Social Links

Tony's public channels. Used across the site in hero CTA, CTA section, and site footer.

| Platform | Link | Usage |
|---|---|---|
| YouTube | TBD (Tony to provide) | Hero buttons, CTA section, footer |
| Telegram | https://t.me/thetonymars | Hero buttons, CTA section, footer |

Links defined once in site config, referenced everywhere. Update in one place.

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

- **Golden ratio (1.618)** for proportional relationships between sections and element sizing
- **Rule of thirds** for image and content placement within sections
- **Gestalt proximity and grouping** for card layouts and information clusters
- **F-pattern** reading flow for text-heavy sections (about, blog), **Z-pattern** for hero and CTA
- **8px grid system** for consistent spacing and alignment (all margins/paddings are multiples of 8)
- **Typographic scale** (1.25 "major third" ratio) for harmonious font sizes across headings and body

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
- Every funnel page links to these site-wide pages (via `FunnelFooter` component)
- Content in Russian at launch (legal content is locale-specific — may need separate legal text for English version)
- Legal page content stored in locale files or as MDX — editable without code changes

---

## Deployment

- GitHub repo: `tonymars-homepage` (or renamed to `tonymars.me`)
- Vercel project connected to GitHub repo
- Custom domain: `tonymars.me` pointed to Vercel
- Auto-deploy on push to `main`
- Preview deployments on PRs (Vercel default behavior)
- Environment variables: Sanity project ID, dataset, API token, site URL

---

## Out of Scope (MVP)

- Members area (`members.tonymars.me`) — later
- Email opt-in / newsletter — not at launch
- Payment processing / checkout — handled by external platform (AXL)
- English content — architecture ready, content not at launch
- Full analytics setup (GA4, Meta Pixel, GTM configuration) — container ready, setup separate
- Search functionality
- Dark mode
- Cookie consent banner — add when analytics scripts are activated
- Redirects from yellows.one — handled on yellows.one side, not tonymars.me
