# Visual Direction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing tonymars.me homepage components to match the approved Visual Direction G (Bold & Clean — blue+yellow palette, Inter 900, white hero).

**Architecture:** All homepage section components already exist and work. This is a pure restyling — update globals.css with Inter font + color tokens, then update each component's Tailwind classes to match the spec. No new components, no structural changes. Homepage stays behind UnderConstruction until a final "flip the switch" step.

**Tech Stack:** Tailwind CSS v4 (inline @theme), Inter (Google Fonts), Next.js 16

**Spec:** `docs/superpowers/specs/2026-03-28-visual-direction-design.md`

---

### Task 1: Global Styles — Font + Color Tokens

**Files:**
- Modify: `app/globals.css`
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Update globals.css with Inter import and design tokens**

Replace the entire `app/globals.css` with:

```css
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

:root {
  --color-primary: #0073b9;
  --color-primary-hover: #005fa0;
  --color-navy: #003561;
  --color-yellow: #fcd214;
  --color-headline: #1f2426;
  --color-body: #495257;
  --color-bg-white: #ffffff;
  --color-bg-light: #f5f7f8;
  --color-border: #e8ecee;
  --color-divider: #d0d5d9;
}

@theme inline {
  --color-background: var(--color-bg-white);
  --color-foreground: var(--color-headline);
  --font-sans: 'Inter', -apple-system, 'Helvetica Neue', sans-serif;
  --font-mono: ui-monospace, 'Cascadia Code', monospace;
}

body {
  background: var(--color-bg-white);
  color: var(--color-body);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

/* Focus states for accessibility */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Update locale layout to remove redundant body classes**

In `app/[locale]/layout.tsx`, the `<body>` tag currently has `className="bg-white text-gray-900 antialiased"`. Update to:

```tsx
<body>
```

The globals.css now handles body styling. Remove the className entirely.

- [ ] **Step 3: Build and verify no errors**

Run: `npm run build`
Expected: clean build, no errors

- [ ] **Step 4: Commit**

```
git add app/globals.css app/[locale]/layout.tsx
git commit -m "style: add Inter font and design token CSS variables"
```

---

### Task 2: SiteHeader — Blue Top Bar + Navy Logo

**Files:**
- Modify: `components/layout/SiteHeader.tsx`

- [ ] **Step 1: Read current SiteHeader**

Read `components/layout/SiteHeader.tsx` to see exact current classes.

- [ ] **Step 2: Update SiteHeader styling**

Apply these changes:
- Add a 3px blue top bar `<div>` before the header: `h-[3px] bg-[#0073b9]`
- Header background: `bg-white/95` (keep backdrop-blur)
- Bottom border: `border-b border-[#e8ecee]`
- Logo: `text-[15px] font-extrabold tracking-[1px] text-[#003561]` — text "ТОНИ МАРС" (already set via translation, but ensure uppercase via `uppercase` class)
- Nav links: `text-[13px] font-medium text-[#495257] hover:text-[#0073b9]`
- Mobile menu: same color scheme
- The blue bar must be ABOVE the fixed header (outside the `fixed` container), OR the header `top` must account for it. Simplest: make the bar part of the fixed header, add it as first child.

- [ ] **Step 3: Build and verify**

Run: `npm run build`

- [ ] **Step 4: Commit**

```
git add components/layout/SiteHeader.tsx
git commit -m "style: update header with blue top bar and navy logo"
```

---

### Task 3: SiteFooter — Light Grey Background

**Files:**
- Modify: `components/layout/SiteFooter.tsx`

- [ ] **Step 1: Read current SiteFooter**

Read `components/layout/SiteFooter.tsx` to see exact current classes.

- [ ] **Step 2: Update SiteFooter styling**

Apply these changes:
- Outer wrapper: `bg-[#f5f7f8]` with `border-t border-[#e8ecee]`
- Copyright text: `text-[13px] font-medium text-[#495257]`
- Legal links: `text-[13px] text-[#495257] hover:text-[#0073b9]`
- Social links: `text-[#495257] hover:text-[#0073b9]`

- [ ] **Step 3: Build and verify**

Run: `npm run build`

- [ ] **Step 4: Commit**

```
git add components/layout/SiteFooter.tsx
git commit -m "style: update footer with light grey bg and blue accents"
```

---

### Task 4: Hero Section — Badge, Bold Headline, Blue Buttons

**Files:**
- Modify: `components/sections/Hero.tsx`
- Modify: `messages/ru.json` (add badge text key)

- [ ] **Step 1: Add badge text to translations**

In `messages/ru.json`, add to the `hero` object:

```json
"badge": "AI + МАРКЕТИНГ"
```

- [ ] **Step 2: Update Hero component**

Apply these changes:
- Section background: `bg-white`
- Add yellow badge above headline: `inline-block bg-[#fcd214] text-[#003561] px-3.5 py-1 rounded text-[11px] font-bold tracking-[1.5px] mb-5`
- Headline h1: `text-4xl sm:text-5xl lg:text-[72px] font-black leading-[1.04] tracking-[-3px] text-[#1f2426]` (mobile: `tracking-[-1.5px]`)
- Subheadline p: `text-lg text-[#495257] leading-relaxed`
- Primary button (YouTube): `inline-flex items-center px-7 py-3.5 bg-[#0073b9] text-white rounded-lg text-sm font-bold hover:bg-[#005fa0] transition-colors`
- Secondary button (Telegram): `inline-flex items-center px-7 py-3.5 bg-white text-[#0073b9] border-2 border-[#0073b9] rounded-lg text-sm font-bold hover:bg-[#f0f7fc] transition-colors`

- [ ] **Step 3: Build and verify**

Run: `npm run build`

- [ ] **Step 4: Commit**

```
git add components/sections/Hero.tsx messages/ru.json
git commit -m "style: hero section with yellow badge and blue buttons"
```

---

### Task 5: Router Section — Blue Numbers, Bordered Cards

**Files:**
- Modify: `components/sections/Router.tsx`

- [ ] **Step 1: Read current Router**

Read `components/sections/Router.tsx` to see exact current structure.

- [ ] **Step 2: Update Router styling**

Apply these changes:
- Section background: `bg-[#f5f7f8]`
- Section headline: `text-[32px] lg:text-[44px] font-black tracking-[-2px] text-[#1f2426]`
- Card: `bg-white border-2 border-[#e8ecee] rounded-xl p-8 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:border-[#0073b9]`
- Card number (01/02/03): `text-[13px] font-extrabold tracking-[1px] text-[#0073b9] mb-4`
- Card title: `text-xl font-extrabold text-[#1f2426] mb-2`
- Card description: `text-sm text-[#495257] leading-relaxed flex-1 mb-6`
- Card CTA link: `text-[13px] font-bold text-[#0073b9] px-5 py-2.5 border-2 border-[#0073b9] rounded-lg inline-block self-start hover:bg-[#0073b9] hover:text-white transition-colors`

- [ ] **Step 3: Build and verify**

Run: `npm run build`

- [ ] **Step 4: Commit**

```
git add components/sections/Router.tsx
git commit -m "style: router cards with blue accents and hover effects"
```

---

### Task 6: Proof Strip — Navy Numbers, Dividers

**Files:**
- Modify: `components/sections/ProofStrip.tsx`

- [ ] **Step 1: Read current ProofStrip**

Read `components/sections/ProofStrip.tsx` to see exact current structure.

- [ ] **Step 2: Update ProofStrip styling**

Apply these changes:
- Section background: `bg-white`
- Number values: `text-5xl font-black tracking-[-2px] text-[#003561]`
- Labels: `text-[13px] font-medium text-[#495257]`
- Desktop layout: horizontal flex with vertical dividers between items (`border-r border-[#d0d5d9]`, last item no border)
- Mobile layout: 2-column grid, no dividers

- [ ] **Step 3: Build and verify**

Run: `npm run build`

- [ ] **Step 4: Commit**

```
git add components/sections/ProofStrip.tsx
git commit -m "style: proof strip with navy numbers and dividers"
```

---

### Task 7: About Section — Photo + Tags

**Files:**
- Modify: `components/sections/About.tsx`

- [ ] **Step 1: Read current About**

Read `components/sections/About.tsx` to see exact current structure.

- [ ] **Step 2: Update About styling**

Apply these changes:
- Section background: `bg-[#f5f7f8]`
- Section headline: `text-[32px] lg:text-[44px] font-black tracking-[-2px] text-[#1f2426]`
- Bio paragraph: `text-base text-[#495257] leading-relaxed`
- Photo container: keep existing `aspect-square rounded-2xl` but ensure `overflow-hidden`
- Tags: `px-4 py-1.5 border-2 border-[#e8ecee] rounded-full text-[13px] font-semibold text-[#495257]`

- [ ] **Step 3: Build and verify**

Run: `npm run build`

- [ ] **Step 4: Commit**

```
git add components/sections/About.tsx
git commit -m "style: about section with updated colors and tag pills"
```

---

### Task 8: Blog Preview + CTA Sections

**Files:**
- Modify: `components/sections/BlogPreview.tsx`
- Modify: `components/sections/CTASection.tsx`

- [ ] **Step 1: Read current BlogPreview and CTASection**

Read both files.

- [ ] **Step 2: Update BlogPreview styling**

Apply these changes:
- Section background: `bg-white`
- Section headline: `text-[32px] lg:text-[44px] font-black tracking-[-2px] text-[#1f2426]`
- Blog card: `bg-white border-2 border-[#e8ecee] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]`
- Date: `text-xs font-medium text-[#888]`
- Title: `text-[17px] font-extrabold text-[#1f2426]`
- Excerpt: `text-sm text-[#495257]`
- "All posts" link: `text-sm font-bold text-[#0073b9] hover:underline`

- [ ] **Step 3: Update CTASection styling**

Apply these changes:
- Section background: `bg-white`
- Headline: same as section headline style
- Buttons: same primary/secondary as Hero buttons

- [ ] **Step 4: Build and verify**

Run: `npm run build`

- [ ] **Step 5: Commit**

```
git add components/sections/BlogPreview.tsx components/sections/CTASection.tsx
git commit -m "style: blog preview cards and CTA section"
```

---

### Task 9: Restore Homepage (Behind Feature Flag)

**Files:**
- Modify: `app/[locale]/(site)/page.tsx`

- [ ] **Step 1: Restore original homepage with env toggle**

Update `app/[locale]/(site)/page.tsx` to conditionally show either the under construction page or the real homepage based on an environment variable:

```tsx
import { getTranslations } from "next-intl/server"
import { siteConfig } from "@/lib/site-config"
import { sectionComponents } from "@/components/sections"
import { ScrollReveal } from "@/components/ScrollReveal"
import { JsonLd } from "@/components/JsonLd"
import { UnderConstruction } from "@/components/UnderConstruction"

export async function generateMetadata() {
  const t = await getTranslations("site")
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteConfig.url,
      type: "website",
    },
  }
}

export default function HomePage() {
  if (process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true") {
    return <UnderConstruction />
  }

  return (
    <>
      <JsonLd type="person" />
      {siteConfig.homeSections.map((sectionKey) => {
        const Component = sectionComponents[sectionKey]
        if (!Component) return null
        return (
          <ScrollReveal key={sectionKey}>
            <Component />
          </ScrollReveal>
        )
      })}
    </>
  )
}
```

- [ ] **Step 2: Set env var on Vercel**

Add to Vercel environment variables:
```
NEXT_PUBLIC_UNDER_CONSTRUCTION=true
```

This keeps the under construction page live on production. To launch the real site, set to `false` or delete the variable.

For local development, create `.env.local`:
```
NEXT_PUBLIC_UNDER_CONSTRUCTION=false
```

So you see the real site locally while production stays under construction.

- [ ] **Step 3: Build and verify both modes**

Run: `NEXT_PUBLIC_UNDER_CONSTRUCTION=false npm run build`
Expected: clean build, homepage renders sections

Run: `NEXT_PUBLIC_UNDER_CONSTRUCTION=true npm run build`
Expected: clean build, homepage renders under construction

- [ ] **Step 4: Commit**

```
git add app/[locale]/(site)/page.tsx .env.local
git commit -m "feat: restore homepage with env toggle for under construction"
```

---

### Task 10: Visual QA — Full Page Review

**Files:** none (review only)

- [ ] **Step 1: Run dev server and review**

Run: `NEXT_PUBLIC_UNDER_CONSTRUCTION=false npm run dev`

Open http://localhost:3000 and visually verify each section against the spec:

1. Header: blue 3px top bar, white bg, navy logo, grey nav links
2. Hero: white bg, yellow badge, 72px black headline, blue buttons
3. Router: light grey bg, bordered white cards, blue numbers, hover lifts
4. Proof: white bg, navy 48px numbers, vertical dividers
5. About: light grey bg, photo, navy headline, grey tags
6. Blog: white bg, bordered cards (may be empty if no Sanity posts — OK)
7. CTA: white bg, headline + blue buttons
8. Footer: light grey bg, grey text, blue hover on links

- [ ] **Step 2: Check mobile responsiveness**

Resize browser to 375px width. Verify:
- Hero headline shrinks to ~36px
- Router cards stack to single column
- Proof items in 2x2 grid
- About photo above text
- Header hamburger menu works

- [ ] **Step 3: Fix any visual issues found**

If anything doesn't match the spec, fix it in the relevant component.

- [ ] **Step 4: Final commit and push**

```
git add -A
git commit -m "style: visual QA fixes"
git push origin main
```
