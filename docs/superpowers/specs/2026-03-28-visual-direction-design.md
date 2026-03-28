# tonymars.me — Visual Direction Spec

## Overview

Visual direction for the tonymars.me homepage redesign. Builds on the approved wireframe (Option A — editorial, left-aligned) and the existing MVP design spec.

**Direction:** G — Bold & Clean
**Reference:** Ramsey Solutions palette (blue + yellow) adapted for Tony Mars brand.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary Blue | `#0073b9` | Buttons, links, card numbers, accents |
| Navy | `#003561` | Logo text, proof numbers, deep accents |
| Yellow | `#fcd214` | Badge labels, highlight moments (sparingly) |
| Headline Text | `#1f2426` | H1–H3 headings |
| Body Text | `#495257` | Paragraphs, descriptions |
| White Background | `#ffffff` | Hero, proof, blog, CTA sections |
| Light Background | `#f5f7f8` | Router, about, footer sections |
| Border | `#e8ecee` | Card borders, dividers, section separators |

### Color Rules

- Yellow is **never used as background** for sections or large areas. Only for small badge labels and key accent moments.
- Blue is the primary action color (buttons, links, interactive elements).
- Navy is reserved for logo, proof strip numbers, and deep emphasis.
- Background alternates **white → light grey** to create visual rhythm between sections without using dark backgrounds.

---

## Typography

**Font:** Inter (Google Fonts)
**Fallback:** -apple-system, 'Helvetica Neue', sans-serif

| Element | Size | Weight | Letter-spacing | Color |
|---|---|---|---|---|
| Hero headline | 72px (desktop) / 36px (mobile) | 900 | -3px / -1.5px | `#1f2426` |
| Section headline | 44px (desktop) / 32px (mobile) | 900 | -2px / -1px | `#1f2426` |
| Card title | 20px | 800 | default | `#1f2426` |
| Body text | 16–18px | 400 | default | `#495257` |
| Button text | 14px | 700 | default | varies |
| Navigation | 13px | 500 | default | `#495257` |
| Badge label | 11px | 700 | 1.5px | `#003561` on `#fcd214` |
| Card number | 13px | 800 | 1px | `#0073b9` |
| Proof number | 48px | 900 | -2px | `#003561` |
| Proof label | 13px | 500 | default | `#495257` |

### Font Loading

- Load Inter from Google Fonts: weights 400, 500, 600, 700, 800, 900
- `display: swap` to prevent FOIT
- Preload the 900 weight (used in hero, first visible element)

---

## Component Styles

### Buttons

| Variant | Background | Text | Border | Radius |
|---|---|---|---|---|
| Primary | `#0073b9` | `#ffffff` | none | 8px |
| Primary hover | `#005fa0` | `#ffffff` | none | 8px |
| Secondary | `#ffffff` | `#0073b9` | 2px solid `#0073b9` | 8px |
| Secondary hover | `#f0f7fc` | `#0073b9` | 2px solid `#0073b9` | 8px |

Padding: 14px 28px. Font: 14px / weight 700.

### Cards (Router)

- Background: `#ffffff`
- Border: 2px solid `#e8ecee`
- Border radius: 12px
- Padding: 32px
- Hover: translateY(-4px), box-shadow 0 8px 32px rgba(0,0,0,0.08), border-color `#0073b9`
- Card number: 13px weight 800 color `#0073b9`
- Card CTA: bordered button style (13px, 2px solid `#0073b9`, 8px radius)

### Badge Label

- Background: `#fcd214`
- Text: `#003561`
- Padding: 5px 14px
- Border radius: 4px
- Font: 11px / weight 700 / letter-spacing 1.5px
- Used in hero above headline

### Tags / Chips (About section)

- Border: 2px solid `#e8ecee`
- Border radius: 100px (pill)
- Padding: 6px 16px
- Font: 13px / weight 600
- Color: `#495257`

### Inline Links

- Color: `#0073b9`
- Hover: underline
- No other decoration by default

### Blog Cards

- White background, border 2px solid `#e8ecee`, radius 12px
- Cover image area at top (16:9 ratio placeholder)
- Body padding: 24px
- Date: 12px / weight 500 / color `#888`
- Title: 17px / weight 800 / color `#1f2426`
- Excerpt: 14px / weight 400 / color `#495257`
- Hover: same as router cards (lift + shadow)

### Proof Strip

- Numbers: 48px / weight 900 / color `#003561`
- Labels: 13px / weight 500 / color `#495257`
- Items separated by vertical 1px `#d0d5d9` dividers
- Centered layout, horizontal on desktop, 2x2 grid on mobile

---

## Page Section Layout

All sections use light backgrounds — no dark navy sections.

| Section | Background | Notes |
|---|---|---|
| Header | `#ffffff` | 3px blue `#0073b9` top bar, bottom border `#e8ecee` |
| Hero | `#ffffff` | Yellow badge, 72px headline, two buttons |
| Router | `#f5f7f8` | Section headline + 3 bordered cards on white |
| Proof | `#ffffff` | Numbers with vertical dividers |
| About | `#f5f7f8` | Photo + bio + tags |
| Blog Preview | `#ffffff` | 3 blog cards |
| CTA | `#ffffff` | Headline + two buttons centered |
| Footer | `#f5f7f8` | Copyright, legal links, social links |

### Header Detail

- 3px solid `#0073b9` bar at very top of page
- White background with backdrop-blur
- Bottom border: 1px solid `#e8ecee`
- Logo: "ТОНИ МАРС" — 15px, weight 800, letter-spacing 1px, color `#003561`
- Nav links: 13px, weight 500, color `#495257`, hover `#0073b9`
- Behavior: show on scroll-up, hide on scroll-down

---

## Animation & Interaction

Unchanged from MVP spec:

- **Scroll reveal:** fade-up (opacity 0→1, translateY 16px→0), once only, 400–500ms, ease-out
- **Card hover:** translateY(-4px) + shadow + blue border, 150ms
- **Proof numbers:** count-up animation on viewport entry, once
- **Header:** smooth show/hide on scroll, 200ms
- **No parallax, no floating elements, no continuous animations**
- **Focus states:** visible blue outline (`#0073b9`, 2px offset) on all interactive elements. Follows MVP spec accessibility requirements.

---

## Favicon & OG Image

- Favicon: "TM" monogram in navy `#003561` on transparent, or blue `#0073b9`
- Default OG image (1200x630): white background, "Тони Марс" in navy, positioning tagline, blue accent elements

---

## What This Spec Does NOT Cover

- Blog post page design (uses existing Sanity schema + standard article layout)
- Funnel page design (each funnel is custom)
- Mobile hamburger menu interaction details (standard slide-out panel)
- Specific copy/content (defined in `messages/ru.json`)

These will be addressed during implementation or in separate specs.
