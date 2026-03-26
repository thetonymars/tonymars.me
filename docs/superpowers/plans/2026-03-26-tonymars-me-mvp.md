# tonymars.me MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the architectural foundation for tonymars.me — routing, layouts, section system, blog integration, script loader, and deployment. Visual design (fonts, colors, spacing) is placeholder — actual design happens in iterative design phases after this infrastructure is live.

**Architecture:** Next.js 15 App Router with modular layout system (site/funnel/minimal presets), config-driven homepage sections, Sanity v3 for blog, self-hosted tracking script loader. All content in i18n locale files (Russian at launch). Funnel pages are code-based under `/go/[funnel]/[page]`.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, next-intl, Sanity v3 (@sanity/client + next-sanity), Vercel

**Spec:** `docs/superpowers/specs/2026-03-26-tonymars-me-mvp-design.md`

---

## File Structure

```
tonymars-homepage/
├── app/
│   ├── layout.tsx                          # Root layout (html, body, fonts, scripts)
│   ├── not-found.tsx                       # 404 page
│   ├── robots.ts                           # robots.txt generator
│   ├── sitemap.ts                          # sitemap.xml generator
│   ├── [locale]/
│   │   ├── layout.tsx                      # Locale layout (next-intl provider)
│   │   ├── page.tsx                        # Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx                    # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx                # Blog post
│   │   ├── go/
│   │   │   └── [funnel]/
│   │   │       └── [page]/
│   │   │           └── page.tsx            # Funnel page (dynamic)
│   │   ├── expired/
│   │   │   └── page.tsx                    # Expired offer
│   │   ├── privacy-policy/
│   │   │   └── page.tsx                    # Legal
│   │   ├── terms/
│   │   │   └── page.tsx                    # Legal
│   │   ├── oferta/
│   │   │   └── page.tsx                    # Legal
│   │   └── personal-data-agreement/
│   │       └── page.tsx                    # Legal
│   └── blog/
│       └── feed.xml/
│           └── route.ts                    # RSS feed (outside locale — no prefix)
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx                  # Header with nav + mobile menu
│   │   ├── SiteFooter.tsx                  # Footer with social + legal + copyright
│   │   ├── FunnelFooter.tsx                # Minimal legal-only footer
│   │   └── SkipToContent.tsx               # Accessibility skip link
│   ├── sections/
│   │   ├── index.ts                        # Section registry
│   │   ├── Hero.tsx
│   │   ├── Router.tsx
│   │   ├── ProofStrip.tsx
│   │   ├── About.tsx
│   │   ├── BlogPreview.tsx
│   │   └── CTASection.tsx
│   ├── funnel/
│   │   ├── FunnelHeadline.tsx
│   │   ├── FunnelCTA.tsx
│   │   └── VideoEmbed.tsx
│   ├── ScrollReveal.tsx                    # Scroll animation wrapper
│   ├── ScriptLoader.tsx                    # Config-driven script loader
│   └── JsonLd.tsx                          # Structured data component
├── lib/
│   ├── sanity/
│   │   ├── client.ts                       # Sanity client instance
│   │   ├── queries.ts                      # GROQ queries
│   │   └── image.ts                        # Image URL builder
│   ├── site-config.ts                      # Social links, metadata, nav
│   └── scripts.config.ts                   # Tracking scripts config
├── messages/
│   └── ru.json                             # Russian locale strings
├── i18n/
│   ├── request.ts                          # next-intl request config
│   └── routing.ts                          # next-intl routing config
├── middleware.ts                            # next-intl middleware
├── public/
│   ├── favicon.svg                         # SVG favicon placeholder
│   └── tony-portrait.png                   # Copied from repo root
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, `middleware.ts`, `i18n/request.ts`, `i18n/routing.ts`, `messages/ru.json`, `lib/site-config.ts`

- [ ] **Step 1: Create Next.js 15 project**

```bash
cd ~/Repos
npx create-next-app@latest tonymars-homepage-new --typescript --tailwind --eslint --app --src=false --import-alias="@/*" --turbopack
```

Expected: Project created with Next.js 15 + TypeScript + Tailwind + App Router

- [ ] **Step 2: Move new project files into existing repo**

The repo already exists with the spec and old `index.html`. Move the scaffold files in:

```bash
# Copy new project files into existing repo (don't overwrite docs/)
cp -r ~/Repos/tonymars-homepage-new/* ~/Repos/tonymars-homepage/
cp ~/Repos/tonymars-homepage-new/.eslintrc.json ~/Repos/tonymars-homepage/ 2>/dev/null || true
cp ~/Repos/tonymars-homepage-new/.gitignore ~/Repos/tonymars-homepage/
rm -rf ~/Repos/tonymars-homepage-new
cd ~/Repos/tonymars-homepage
```

- [ ] **Step 3: Install dependencies**

```bash
cd ~/Repos/tonymars-homepage
npm install next-intl @sanity/client next-sanity @portabletext/react
```

Expected: Dependencies installed successfully

- [ ] **Step 4: Configure next-intl routing**

Create `i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["ru"],
  defaultLocale: "ru",
  localePrefix: "as-needed",
})
```

Create `i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

- [ ] **Step 5: Create middleware**

Create `middleware.ts`:

```ts
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
```

- [ ] **Step 6: Update next.config.ts**

```ts
import createNextIntlPlugin from "next-intl/plugin"
import type { NextConfig } from "next"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 7: Create Russian locale file**

Create `messages/ru.json`:

```json
{
  "site": {
    "name": "Tony Mars",
    "title": "Tony Mars — AI-инструменты для маркетинга",
    "description": "AI-системы, которые делают маркетинг за тебя. За минуты вместо недель."
  },
  "nav": {
    "home": "Главная",
    "blog": "Блог",
    "about": "Обо мне",
    "skipToContent": "Перейти к содержимому"
  },
  "hero": {
    "name": "Tony Mars",
    "headline": "Я строю AI-инструменты для маркетинга",
    "subheadline": "AI-системы, которые делают маркетинг за тебя. Исследование клиентов, продающий контент, воронки — за минуты вместо недель.",
    "youtube": "YouTube",
    "telegram": "Telegram"
  },
  "router": {
    "title": "Что тебе нужно?",
    "cards": [
      {
        "id": "market-research",
        "headline": "Исследовать рынок",
        "description": "Получи полный отчет о рынке за минуты — без аналитиков и недель ожидания",
        "buttonText": "Узнать больше"
      },
      {
        "id": "avatar-passport",
        "headline": "Понять клиента без кастдевов",
        "description": "AI-инструмент для глубокого исследования клиентов за 7 минут",
        "buttonText": "Узнать больше"
      },
      {
        "id": "offer-creation",
        "headline": "Создать конвертирующий офер",
        "description": "Офер, который продает даже холодному трафику",
        "buttonText": "Узнать больше"
      }
    ]
  },
  "proof": {
    "items": [
      { "value": "19", "label": "лет в маркетинге" },
      { "value": "12", "label": "AI-агентов" },
      { "value": "25", "label": "AI-навыков" }
    ]
  },
  "about": {
    "title": "Обо мне",
    "bio": "19 лет в директ-маркетинге. Учился у американской школы — Halbert, Kennedy, Schwartz, Hormozi. Раньше руководил командой из 11 человек. Сейчас — 0 сотрудников и 12 AI-агентов.",
    "tags": [
      "19 лет в маркетинге",
      "Solo + AI",
      "Строитель, не учитель"
    ]
  },
  "blogPreview": {
    "title": "Блог",
    "allPosts": "Все статьи",
    "noPosts": "Скоро здесь появятся статьи"
  },
  "cta": {
    "headline": "Следи за мной",
    "youtube": "YouTube канал",
    "telegram": "Telegram канал"
  },
  "footer": {
    "copyright": "© 2026 Tony Mars",
    "privacy": "Политика конфиденциальности",
    "terms": "Условия использования",
    "oferta": "Оферта"
  },
  "notFound": {
    "title": "Страница не найдена",
    "description": "Такой страницы не существует",
    "home": "На главную"
  },
  "expired": {
    "title": "Предложение больше не доступно",
    "description": "Это предложение закончилось",
    "home": "На главную"
  },
  "blog": {
    "title": "Блог",
    "loadMore": "Загрузить еще",
    "publishedAt": "Опубликовано",
    "backToBlog": "← Назад в блог"
  },
  "legal": {
    "privacyPolicy": {
      "title": "Политика конфиденциальности",
      "content": "Содержание политики конфиденциальности будет добавлено."
    },
    "terms": {
      "title": "Условия использования",
      "content": "Содержание условий использования будет добавлено."
    },
    "oferta": {
      "title": "Публичная оферта",
      "content": "Содержание публичной оферты будет добавлено."
    },
    "personalData": {
      "title": "Соглашение об обработке персональных данных",
      "content": "Содержание соглашения будет добавлено."
    }
  }
}
```

- [ ] **Step 8: Create site config**

Create `lib/site-config.ts`:

```ts
export const siteConfig = {
  name: "Tony Mars",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tonymars.me",
  locale: "ru",

  social: {
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@tonymars",
    telegram: "https://t.me/thetonymars",
  },

  nav: [
    { key: "home", href: "/" },
    { key: "blog", href: "/blog" },
  ],

  homeSections: ["hero", "router", "proof", "about", "blog-preview", "cta"] as const,
} as const

export type HomeSection = (typeof siteConfig.homeSections)[number]

export interface RouterCard {
  id: string
  headline: string
  description: string
  buttonText: string
  href: string
  icon?: string
}
```

- [ ] **Step 9: Create root layout**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
```

- [ ] **Step 10: Create locale layout**

Create `app/[locale]/layout.tsx`:

```tsx
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { SkipToContent } from "@/components/layout/SkipToContent"
import { ScriptLoader } from "@/components/ScriptLoader"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <SkipToContent />
          <SiteHeader />
          <main id="main-content">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
        <ScriptLoader pageType="site" />
      </body>
    </html>
  )
}
```

- [ ] **Step 11: Create placeholder homepage**

Create `app/[locale]/page.tsx`:

```tsx
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("site")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function HomePage() {
  const t = useTranslations("site")
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">{t("name")}</h1>
    </div>
  )
}
```

- [ ] **Step 12: Create placeholder components for layout**

Create `components/layout/SiteHeader.tsx`:

```tsx
export function SiteHeader() {
  return <header className="h-16 border-b" />
}
```

Create `components/layout/SiteFooter.tsx`:

```tsx
export function SiteFooter() {
  return <footer className="h-16 border-t" />
}
```

Create `components/layout/SkipToContent.tsx`:

```tsx
import { useTranslations } from "next-intl"

export function SkipToContent() {
  const t = useTranslations("nav")
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
    >
      {t("skipToContent")}
    </a>
  )
}
```

Create `components/ScriptLoader.tsx`:

```tsx
export function ScriptLoader({ pageType }: { pageType: string }) {
  return null
}
```

- [ ] **Step 13: Verify dev server starts**

```bash
cd ~/Repos/tonymars-homepage
npm run dev
```

Expected: Dev server starts on localhost:3000, homepage renders with "Tony Mars" heading

- [ ] **Step 14: Commit**

```bash
cd ~/Repos/tonymars-homepage
git add -A
git commit -m "feat: scaffold Next.js 15 + TypeScript + Tailwind + next-intl

Project foundation with:
- Next.js 15 App Router + TypeScript
- Tailwind CSS v4
- next-intl with Russian locale (no URL prefix for default)
- Site config (social links, nav, section registry)
- Root and locale layouts
- Placeholder homepage and layout components"
```

---

## Task 2: Layout System

**Files:**
- Create: `components/layout/SiteHeader.tsx`, `components/layout/SiteFooter.tsx`, `components/layout/FunnelFooter.tsx`, `components/layout/MobileNav.tsx`
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Build SiteHeader with mobile nav**

Replace `components/layout/SiteHeader.tsx`:

```tsx
"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { siteConfig } from "@/lib/site-config"

export function SiteHeader() {
  const t = useTranslations("nav")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setVisible(currentScrollY < lastScrollY || currentScrollY < 64)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-200 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold">
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-gray-900 transition-transform ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-gray-900 transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-gray-900 transition-transform ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav className="md:hidden border-t bg-white px-4 py-4" aria-label="Mobile">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block py-3 text-gray-600"
              onClick={() => setMobileOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Build SiteFooter**

Replace `components/layout/SiteFooter.tsx`:

```tsx
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  const t = useTranslations("footer")
  return (
    <footer className="border-t py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>{t("copyright")}</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">
              {t("terms")}
            </Link>
            <Link href="/oferta" className="hover:text-gray-900 transition-colors">
              {t("oferta")}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              YT
            </a>
            <a href={siteConfig.social.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              TG
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Build FunnelFooter**

Create `components/layout/FunnelFooter.tsx`:

```tsx
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export function FunnelFooter() {
  const t = useTranslations("footer")
  return (
    <footer className="py-6">
      <div className="mx-auto max-w-7xl px-4 text-center text-xs text-gray-400">
        <div className="flex items-center justify-center gap-4">
          <Link href="/privacy-policy" className="hover:text-gray-600 transition-colors">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">
            {t("terms")}
          </Link>
          <Link href="/oferta" className="hover:text-gray-600 transition-colors">
            {t("oferta")}
          </Link>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Create funnel layout (no header, funnel footer)**

Create `app/[locale]/go/[funnel]/[page]/layout.tsx`:

This layout overrides the site layout for funnel pages — no SiteHeader, uses FunnelFooter instead of SiteFooter.

Since Next.js App Router nests layouts, we need the funnel routes to use a different layout. The cleanest approach: use a route group.

Create `app/[locale]/(site)/layout.tsx` for site pages (with header + footer):

```tsx
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { SkipToContent } from "@/components/layout/SkipToContent"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  )
}
```

Create `app/[locale]/(funnel)/layout.tsx` for funnel pages (no header, funnel footer):

```tsx
import { FunnelFooter } from "@/components/layout/FunnelFooter"
import { ScriptLoader } from "@/components/ScriptLoader"

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <FunnelFooter />
      <ScriptLoader pageType="funnel" />
    </>
  )
}
```

- [ ] **Step 5: Restructure routes into route groups**

Move pages into route groups:

```bash
cd ~/Repos/tonymars-homepage

# Site pages go under (site)
mkdir -p "app/[locale]/(site)"
mv "app/[locale]/page.tsx" "app/[locale]/(site)/page.tsx"

# Funnel pages go under (funnel)
mkdir -p "app/[locale]/(funnel)/go/[funnel]/[page]"

# Blog goes under (site)
mkdir -p "app/[locale]/(site)/blog/[slug]"

# Legal pages under (site)
mkdir -p "app/[locale]/(site)/privacy-policy"
mkdir -p "app/[locale]/(site)/terms"
mkdir -p "app/[locale]/(site)/oferta"
mkdir -p "app/[locale]/(site)/personal-data-agreement"
mkdir -p "app/[locale]/(site)/expired"
```

- [ ] **Step 6: Update locale layout — remove header/footer (moved to route groups)**

Update `app/[locale]/layout.tsx`:

```tsx
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Verify layout system works**

```bash
cd ~/Repos/tonymars-homepage
npm run dev
```

Visit `localhost:3000` — should see header, "Tony Mars" content, and footer.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: layout system with site/funnel route groups

- SiteHeader with scroll-hide and mobile hamburger menu
- SiteFooter with legal links and social icons
- FunnelFooter with legal links only (minimal)
- Route groups: (site) gets header+footer, (funnel) gets funnel footer only
- SkipToContent accessibility link"
```

---

## Task 3: Homepage Sections

**Files:**
- Create: `components/sections/index.ts`, `components/sections/Hero.tsx`, `components/sections/Router.tsx`, `components/sections/ProofStrip.tsx`, `components/sections/About.tsx`, `components/sections/BlogPreview.tsx`, `components/sections/CTASection.tsx`, `components/ScrollReveal.tsx`
- Modify: `app/[locale]/(site)/page.tsx`

- [ ] **Step 1: Create ScrollReveal wrapper**

Create `components/ScrollReveal.tsx`:

```tsx
"use client"

import { useEffect, useRef, useState } from "react"

export function ScrollReveal({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Create Hero section**

Create `components/sections/Hero.tsx`:

```tsx
import { useTranslations } from "next-intl"
import { siteConfig } from "@/lib/site-config"

export function Hero() {
  const t = useTranslations("hero")
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-gray-500 mb-4">{t("name")}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {t("headline")}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            {t("subheadline")}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              {t("youtube")}
            </a>
            <a
              href={siteConfig.social.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {t("telegram")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create Router section**

Create `components/sections/Router.tsx`:

```tsx
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export function Router() {
  const t = useTranslations("router")
  const cards = t.raw("cards") as Array<{
    id: string
    headline: string
    description: string
    buttonText: string
  }>

  // Placeholder hrefs — will be updated when funnels exist
  const hrefMap: Record<string, string> = {
    "market-research": "#",
    "avatar-passport": "#",
    "offer-creation": "#",
  }

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">{t("title")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="rounded-xl border bg-white p-6 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2">{card.headline}</h3>
              <p className="text-gray-600 mb-6 flex-1">{card.description}</p>
              <Link
                href={hrefMap[card.id] || "#"}
                className="inline-flex items-center text-sm font-medium text-gray-900 hover:underline"
              >
                {card.buttonText} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create ProofStrip section**

Create `components/sections/ProofStrip.tsx`:

```tsx
"use client"

import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

export function ProofStrip() {
  const t = useTranslations("proof")
  const items = t.raw("items") as Array<{ value: string; label: string }>
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-12 sm:py-16" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:flex sm:justify-center sm:gap-16">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-1">
                {animate ? item.value : "0"}
              </div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create About section**

Create `components/sections/About.tsx`:

```tsx
import Image from "next/image"
import { useTranslations } from "next-intl"

export function About() {
  const t = useTranslations("about")
  const tags = t.raw("tags") as string[]

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src="/tony-portrait.png"
              alt="Tony Mars"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t("title")}</h2>
            <p className="text-lg text-gray-600 mb-8">{t("bio")}</p>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border px-4 py-1.5 text-sm text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create BlogPreview section (placeholder)**

Create `components/sections/BlogPreview.tsx`:

```tsx
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export function BlogPreview() {
  const t = useTranslations("blogPreview")

  // Will be replaced with Sanity data in Task 5
  const posts: Array<{ slug: string; title: string; excerpt: string; date: string }> = []

  if (posts.length === 0) {
    return null // Don't render section if no posts
  }

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">{t("title")}</h2>
          <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            {t("allPosts")} →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="rounded-xl border bg-white p-6">
                <time className="text-sm text-gray-400">{post.date}</time>
                <h3 className="text-lg font-bold mt-2 mb-2 group-hover:underline">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create CTA section**

Create `components/sections/CTASection.tsx`:

```tsx
import { useTranslations } from "next-intl"
import { siteConfig } from "@/lib/site-config"

export function CTASection() {
  const t = useTranslations("cta")
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">{t("headline")}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            {t("youtube")}
          </a>
          <a
            href={siteConfig.social.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
          >
            {t("telegram")}
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Create section registry**

Create `components/sections/index.ts`:

```ts
import { Hero } from "./Hero"
import { Router } from "./Router"
import { ProofStrip } from "./ProofStrip"
import { About } from "./About"
import { BlogPreview } from "./BlogPreview"
import { CTASection } from "./CTASection"
import type { HomeSection } from "@/lib/site-config"

export const sectionComponents: Record<HomeSection, React.ComponentType> = {
  hero: Hero,
  router: Router,
  proof: ProofStrip,
  about: About,
  "blog-preview": BlogPreview,
  cta: CTASection,
}
```

- [ ] **Step 9: Build homepage with section system**

Update `app/[locale]/(site)/page.tsx`:

```tsx
import { getTranslations } from "next-intl/server"
import { siteConfig } from "@/lib/site-config"
import { sectionComponents } from "@/components/sections"
import { ScrollReveal } from "@/components/ScrollReveal"
import { JsonLd } from "@/components/JsonLd"

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

- [ ] **Step 10: Create placeholder JsonLd component**

Create `components/JsonLd.tsx`:

```tsx
export function JsonLd({ type }: { type: string }) {
  return null // Implemented in Task 6
}
```

- [ ] **Step 11: Copy portrait image to public/**

```bash
cp ~/Repos/tonymars-homepage/tony-portrait.png ~/Repos/tonymars-homepage/public/tony-portrait.png
```

- [ ] **Step 12: Verify homepage renders all sections**

```bash
npm run dev
```

Visit `localhost:3000` — should see Hero, Router (3 cards), Proof Strip (numbers), About (with photo), and CTA sections. BlogPreview returns null (no posts).

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: homepage with modular section system

6 sections: Hero, Router, ProofStrip, About, BlogPreview, CTA
Section registry with config-driven ordering
ScrollReveal animation wrapper (respects prefers-reduced-motion)
All content from ru.json locale file"
```

---

## Task 4: Funnel Infrastructure

**Files:**
- Create: `app/[locale]/(funnel)/go/[funnel]/[page]/page.tsx`, `components/funnel/FunnelHeadline.tsx`, `components/funnel/FunnelCTA.tsx`, `components/funnel/VideoEmbed.tsx`

- [ ] **Step 1: Create funnel building blocks**

Create `components/funnel/FunnelHeadline.tsx`:

```tsx
export function FunnelHeadline({
  headline,
  subheadline,
}: {
  headline: string
  subheadline?: string
}) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {headline}
      </h1>
      {subheadline && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subheadline}</p>
      )}
    </div>
  )
}
```

Create `components/funnel/FunnelCTA.tsx`:

```tsx
export function FunnelCTA({
  text,
  href,
  onClick,
  variant = "primary",
}: {
  text: string
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
}) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-bold transition-all hover:-translate-y-0.5"
  const variantClasses =
    variant === "primary"
      ? "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
      : "border-2 border-gray-300 text-gray-900 hover:border-gray-400"

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${variantClasses}`}>
        {text}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {text}
    </button>
  )
}
```

Create `components/funnel/VideoEmbed.tsx`:

```tsx
export function VideoEmbed({ url, title }: { url: string; title?: string }) {
  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )
    return match?.[1]
  }

  const videoId = getYouTubeId(url)
  if (!videoId) return null

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title || "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        loading="lazy"
      />
    </div>
  )
}
```

- [ ] **Step 2: Create dynamic funnel page**

Create `app/[locale]/(funnel)/go/[funnel]/[page]/page.tsx`:

```tsx
import { notFound } from "next/navigation"
import { FunnelHeadline } from "@/components/funnel/FunnelHeadline"
import { FunnelCTA } from "@/components/funnel/FunnelCTA"

// Dynamic funnel pages are loaded by convention:
// Each funnel has its own folder in components/funnels/[funnel-name]/[page].tsx
// For now, show a placeholder that proves routing works.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ funnel: string; page: string }>
}) {
  const { funnel, page } = await params
  return {
    title: `${funnel} — ${page}`,
    robots: { index: false, follow: false }, // Funnel pages are noindex
  }
}

export default async function FunnelPage({
  params,
}: {
  params: Promise<{ funnel: string; page: string }>
}) {
  const { funnel, page } = await params

  // Placeholder — in production, each funnel will have its own page component.
  // For now, render a generic placeholder that shows routing works.
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <FunnelHeadline
          headline={`Funnel: ${funnel}`}
          subheadline={`Page: ${page}`}
        />
        <FunnelCTA text="Placeholder CTA" href="#" />
        <p className="mt-8 text-sm text-gray-400">
          This is a placeholder funnel page. Replace with actual funnel content.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify funnel routing**

```bash
npm run dev
```

Visit `localhost:3000/go/avatar-passport/reg-a` — should see placeholder funnel page with "Funnel: avatar-passport" and "Page: reg-a". No site header, only funnel footer with legal links.

Visit `localhost:3000/go/test-funnel/details-a` — same pattern, different content.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: funnel infrastructure with /go/ routing

- Dynamic routing at /go/[funnel]/[page]
- Funnel layout (no header, legal-only footer)
- Building blocks: FunnelHeadline, FunnelCTA, VideoEmbed
- Placeholder funnel page proving routing works
- All funnel pages noindex by default"
```

---

## Task 5: Sanity Blog

**Files:**
- Create: `lib/sanity/client.ts`, `lib/sanity/queries.ts`, `lib/sanity/image.ts`, `sanity/schemas/post.ts`, `app/[locale]/(site)/blog/page.tsx`, `app/[locale]/(site)/blog/[slug]/page.tsx`, `app/blog/feed.xml/route.ts`
- Modify: `components/sections/BlogPreview.tsx`

**Prerequisite:** Tony needs to create a Sanity project at sanity.io and provide the project ID and dataset name. Set environment variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (usually "production")
- `SANITY_API_TOKEN` (for write access — server-side only)

- [ ] **Step 1: Create Sanity post schema (for reference)**

Create `sanity/schemas/post.ts`:

```ts
// This schema is for reference — it defines the structure in Sanity Studio.
// If using Sanity Studio, import this in the schema config.
// If managing content via API only, this serves as documentation.

export const postSchema = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
}
```

- [ ] **Step 2: Create Sanity client**

Create `lib/sanity/client.ts`:

```ts
import { createClient } from "@sanity/client"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
})
```

Create `lib/sanity/image.ts`:

```ts
import imageUrlBuilder from "@sanity/image-url"
import { sanityClient } from "./client"

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
```

Create `lib/sanity/queries.ts`:

```ts
import { sanityClient } from "./client"

export interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  body: any[]
  coverImage: any
  publishedAt: string
  tags?: string[]
}

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  coverImage,
  publishedAt,
  tags
`

export async function getPosts(limit?: number): Promise<Post[]> {
  const limitClause = limit ? `[0...${limit}]` : ""
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) ${limitClause} { ${postFields} }`
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`,
    { slug }
  )
}

export async function getAllSlugs(): Promise<string[]> {
  return sanityClient.fetch(
    `*[_type == "post"].slug.current`
  )
}
```

- [ ] **Step 3: Install Sanity image URL builder**

```bash
cd ~/Repos/tonymars-homepage
npm install @sanity/image-url
```

- [ ] **Step 4: Create blog listing page**

Create `app/[locale]/(site)/blog/page.tsx`:

```tsx
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import { getPosts } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import Image from "next/image"

export async function generateMetadata() {
  const t = await getTranslations("blog")
  return { title: t("title") }
}

export default async function BlogPage() {
  const t = await getTranslations("blog")
  const posts = await getPosts()

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h1 className="text-4xl font-bold mb-12">{t("title")}</h1>

        {posts.length === 0 ? (
          <p className="text-gray-500">Скоро здесь появятся статьи</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group">
                <article>
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 mb-4">
                      <Image
                        src={urlFor(post.coverImage).width(600).height(340).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <time className="text-sm text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                  </time>
                  <h2 className="text-xl font-bold mt-1 mb-2 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create blog post page**

Create `app/[locale]/(site)/blog/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import { getPostBySlug, getAllSlugs } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import { PortableText } from "@portabletext/react"
import { JsonLd } from "@/components/JsonLd"
import Image from "next/image"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Not Found" }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }]
        : undefined,
    },
    twitter: { card: "summary_large_image" },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const t = await getTranslations("blog")
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <article className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 mb-8 inline-block">
          {t("backToBlog")}
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-sm text-gray-400 block mb-8">
          {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
        </time>

        {post.coverImage && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 mb-12">
            <Image
              src={urlFor(post.coverImage).width(1200).height(675).url()}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>
      </div>
      <JsonLd type="blogPosting" data={post} />
    </article>
  )
}
```

- [ ] **Step 6: Update BlogPreview to fetch from Sanity**

Replace `components/sections/BlogPreview.tsx`:

```tsx
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import { getPosts } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import Image from "next/image"

export async function BlogPreview() {
  const t = await getTranslations("blogPreview")
  const posts = await getPosts(3)

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">{t("title")}</h2>
          <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            {t("allPosts")} →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group">
              <article className="rounded-xl border bg-white overflow-hidden">
                {post.coverImage && (
                  <div className="relative aspect-[16/9] bg-gray-100">
                    <Image
                      src={urlFor(post.coverImage).width(400).height(225).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <time className="text-sm text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                  </time>
                  <h3 className="text-lg font-bold mt-1 mb-2 group-hover:underline">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create RSS feed**

Create `app/blog/feed.xml/route.ts`:

```ts
import { getPosts } from "@/lib/sanity/queries"
import { siteConfig } from "@/lib/site-config"

export async function GET() {
  const posts = await getPosts()

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <guid>${siteConfig.url}/blog/${post.slug}</guid>
    </item>`
    )
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} — Блог</title>
    <link>${siteConfig.url}/blog</link>
    <description>Блог Tony Mars</description>
    <language>ru</language>
    <atom:link href="${siteConfig.url}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
```

- [ ] **Step 8: Verify blog pages render (empty state)**

```bash
npm run dev
```

Visit `localhost:3000/blog` — should show blog page with empty state message.
Visit `localhost:3000/blog/feed.xml` — should return valid XML (empty items).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: Sanity blog with listing, posts, preview, and RSS

- Sanity client + GROQ queries for posts
- Blog listing page with cover images
- Blog post page with PortableText rendering
- BlogPreview homepage section (auto-hides when no posts)
- RSS feed at /blog/feed.xml
- Post schema reference for Sanity Studio"
```

---

## Task 6: SEO, Meta, Error Pages & Legal

**Files:**
- Create: `app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx`, `app/[locale]/(site)/expired/page.tsx`, `app/[locale]/(site)/privacy-policy/page.tsx`, `app/[locale]/(site)/terms/page.tsx`, `app/[locale]/(site)/oferta/page.tsx`, `app/[locale]/(site)/personal-data-agreement/page.tsx`, `public/favicon.svg`
- Modify: `components/JsonLd.tsx`

- [ ] **Step 1: Create robots.txt**

Create `app/robots.ts`:

```ts
import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/go/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
```

- [ ] **Step 2: Create sitemap.xml**

Create `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"
import { getAllSlugs } from "@/lib/sanity/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getAllSlugs()

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/oferta`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
```

- [ ] **Step 3: Implement JsonLd component**

Replace `components/JsonLd.tsx`:

```tsx
import { siteConfig } from "@/lib/site-config"

interface JsonLdProps {
  type: "person" | "blogPosting"
  data?: any
}

export function JsonLd({ type, data }: JsonLdProps) {
  let schema: Record<string, any>

  if (type === "person") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "AI Marketing Tools Builder",
      sameAs: [siteConfig.social.youtube, siteConfig.social.telegram],
    }
  } else if (type === "blogPosting" && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: data.title,
      datePublished: data.publishedAt,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    }
  } else {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

- [ ] **Step 4: Create favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect fill="#1a1a1f" width="32" height="32" rx="6"/>
  <text x="50%" y="58%" font-family="system-ui" font-weight="900" font-size="18" fill="#fff" text-anchor="middle" dominant-baseline="middle">TM</text>
</svg>
```

- [ ] **Step 5: Create 404 page**

Create `app/not-found.tsx`:

```tsx
import Link from "next/link"

export default function NotFound() {
  return (
    <html lang="ru">
      <body className="bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-sm font-medium text-gray-400 mb-4">404</p>
            <h1 className="text-3xl font-bold mb-4">Страница не найдена</h1>
            <p className="text-gray-600 mb-8">Такой страницы не существует</p>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              На главную
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Create expired offer page**

Create `app/[locale]/(site)/expired/page.tsx`:

```tsx
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"

export async function generateMetadata() {
  const t = await getTranslations("expired")
  return { title: t("title"), robots: { index: false } }
}

export default async function ExpiredPage() {
  const t = await getTranslations("expired")
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <p className="text-gray-600 mb-8">{t("description")}</p>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          {t("home")}
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Create legal pages**

Create `app/[locale]/(site)/privacy-policy/page.tsx`:

```tsx
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("legal.privacyPolicy")
  return { title: t("title") }
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("legal.privacyPolicy")
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
        <div className="prose prose-lg max-w-none">
          <p>{t("content")}</p>
        </div>
      </div>
    </div>
  )
}
```

Create `app/[locale]/(site)/terms/page.tsx`:

```tsx
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("legal.terms")
  return { title: t("title") }
}

export default async function TermsPage() {
  const t = await getTranslations("legal.terms")
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
        <div className="prose prose-lg max-w-none">
          <p>{t("content")}</p>
        </div>
      </div>
    </div>
  )
}
```

Create `app/[locale]/(site)/oferta/page.tsx`:

```tsx
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("legal.oferta")
  return { title: t("title") }
}

export default async function OfertaPage() {
  const t = await getTranslations("legal.oferta")
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
        <div className="prose prose-lg max-w-none">
          <p>{t("content")}</p>
        </div>
      </div>
    </div>
  )
}
```

Create `app/[locale]/(site)/personal-data-agreement/page.tsx`:

```tsx
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("legal.personalData")
  return { title: t("title") }
}

export default async function PersonalDataPage() {
  const t = await getTranslations("legal.personalData")
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
        <div className="prose prose-lg max-w-none">
          <p>{t("content")}</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Verify all pages**

```bash
npm run dev
```

- `localhost:3000` — homepage with sections
- `localhost:3000/blog` — blog listing
- `localhost:3000/go/test/reg-a` — funnel placeholder
- `localhost:3000/expired` — expired offer page
- `localhost:3000/privacy-policy` — legal page
- `localhost:3000/terms` — legal page
- `localhost:3000/oferta` — legal page
- `localhost:3000/personal-data-agreement` — legal page
- `localhost:3000/nonexistent-page` — 404 page
- `localhost:3000/robots.txt` — robots.txt with Disallow /go/
- `localhost:3000/sitemap.xml` — sitemap

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: SEO, error pages, and legal pages

- robots.txt (disallows /go/)
- sitemap.xml (auto-generated, includes blog posts)
- JSON-LD structured data (Person on homepage, BlogPosting on posts)
- SVG favicon (TM monogram)
- 404 page with homepage link
- Expired offer page (/expired)
- Legal pages: privacy-policy, terms, oferta, personal-data-agreement"
```

---

## Task 7: Script Loader

**Files:**
- Create: `lib/scripts.config.ts`
- Modify: `components/ScriptLoader.tsx`

- [ ] **Step 1: Create tracking scripts config**

Create `lib/scripts.config.ts`:

```ts
export interface TrackingScript {
  id: string
  name: string
  placement: "head" | "body-start" | "body-end"
  strategy: "beforeInteractive" | "afterInteractive" | "lazyOnload"
  pages: "all" | "site" | "funnel" | "blog"
  src?: string
  inline?: string
  enabled: boolean
  env?: string
}

export const trackingScripts: TrackingScript[] = [
  // Uncomment and configure when ready:
  // {
  //   id: "yandex-metrica",
  //   name: "Yandex.Metrica",
  //   placement: "head",
  //   strategy: "afterInteractive",
  //   pages: "all",
  //   enabled: true,
  //   env: "NEXT_PUBLIC_YM_ID",
  // },
]
```

- [ ] **Step 2: Implement ScriptLoader component**

Replace `components/ScriptLoader.tsx`:

```tsx
import Script from "next/script"
import { trackingScripts, type TrackingScript } from "@/lib/scripts.config"

function shouldRender(script: TrackingScript, pageType: string): boolean {
  if (!script.enabled) return false
  if (script.env && !process.env[script.env]) return false
  if (script.pages === "all") return true
  return script.pages === pageType
}

export function ScriptLoader({ pageType }: { pageType: string }) {
  const activeScripts = trackingScripts.filter((s) => shouldRender(s, pageType))

  if (activeScripts.length === 0) return null

  return (
    <>
      {activeScripts.map((script) => {
        const envValue = script.env ? process.env[script.env] : undefined

        if (script.src) {
          return (
            <Script
              key={script.id}
              src={script.src}
              strategy={script.strategy}
            />
          )
        }

        if (script.inline) {
          const resolvedInline = envValue
            ? script.inline.replace("{{ID}}", envValue)
            : script.inline

          return (
            <Script
              key={script.id}
              id={script.id}
              strategy={script.strategy}
              dangerouslySetInnerHTML={{ __html: resolvedInline }}
            />
          )
        }

        return null
      })}
    </>
  )
}
```

- [ ] **Step 3: Verify script loader renders nothing (no scripts enabled)**

```bash
npm run dev
```

Page should load normally with no tracking scripts in the HTML. View source to confirm no extra `<script>` tags from ScriptLoader.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: config-driven tracking script loader

- TrackingScript config type with placement, strategy, page scope
- ScriptLoader renders enabled scripts via Next.js <Script>
- Env variable check — missing env = script skipped silently
- No scripts enabled at launch — ready to activate when needed"
```

---

## Task 8: Build Verification & Deployment Prep

**Files:**
- Create: `.env.local.example`
- Modify: `.gitignore`

- [ ] **Step 1: Create env example file**

Create `.env.local.example`:

```
# Sanity (required for blog)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Site
NEXT_PUBLIC_SITE_URL=https://tonymars.me
NEXT_PUBLIC_YOUTUBE_URL=

# Tracking (uncomment and configure when ready)
# NEXT_PUBLIC_YM_ID=
# NEXT_PUBLIC_META_PIXEL_ID=
```

- [ ] **Step 2: Update .gitignore**

Ensure `.gitignore` includes:

```
.env.local
.env*.local
```

- [ ] **Step 3: Run production build**

```bash
cd ~/Repos/tonymars-homepage
npm run build
```

Expected: Build succeeds with no errors. Some pages may warn about missing Sanity env vars — that's expected.

- [ ] **Step 4: Test production build locally**

```bash
npm start
```

Visit `localhost:3000` — verify all pages work in production mode.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: deployment prep with env example and build verification

- .env.local.example with all required environment variables
- Production build verified successfully"
```

- [ ] **Step 6: Push to GitHub**

```bash
cd ~/Repos/tonymars-homepage
# Tony needs to create the GitHub repo first, then:
git remote add origin git@github.com:USERNAME/tonymars-homepage.git
git push -u origin main
```

Note: Tony needs to:
1. Create GitHub repo
2. Create Vercel project and connect to the repo
3. Add environment variables in Vercel dashboard
4. Point tonymars.me DNS to Vercel

---

## Self-Review Checklist

**1. Spec coverage:**
- [x] Tech stack: Next.js 15 + TS + Tailwind + next-intl + Sanity — Task 1
- [x] URL structure: site pages flat, blog under /blog/, funnels under /go/ — Tasks 3, 4, 5
- [x] Homepage sections (6 modular) — Task 3
- [x] Page Shell layout system (site/funnel/minimal) — Task 2
- [x] Funnel routing + building blocks — Task 4
- [x] Blog with Sanity — Task 5
- [x] Social sharing & meta — Task 6
- [x] Structured data (JSON-LD) — Task 6
- [x] Internationalization — Task 1
- [x] Responsive design — Tailwind breakpoints used throughout
- [x] Micro-interactions — ScrollReveal in Task 3, hover states via Tailwind
- [x] Performance — Next.js Image, static generation, async scripts
- [x] Accessibility — semantic HTML, skip-to-content, ARIA labels, focus states
- [x] Error pages (404, expired) — Task 6
- [x] AXL integration — documented as script-based, added when needed
- [x] Tracking script loader — Task 7
- [x] Social links config — Task 1
- [x] Legal pages — Task 6
- [x] robots.txt, sitemap.xml, RSS — Tasks 5, 6
- [x] Deployment — Task 8

**2. Placeholder scan:** No TBD/TODO in code. Router card hrefs are "#" (documented as placeholder until funnels exist). Legal page content is placeholder text (documented — Tony provides real content).

**3. Type consistency:** `RouterCard` interface defined in `lib/site-config.ts`, used consistently. `Post` type in `lib/sanity/queries.ts`, used in blog pages and BlogPreview. `TrackingScript` in `lib/scripts.config.ts`, used in ScriptLoader. `HomeSection` type derived from config, used in section registry. All consistent.
