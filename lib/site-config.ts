export const siteConfig = {
  name: "Тони Марс",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tonymars.me",
  locale: "ru",

  social: {
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@the-tony-mars",
    telegram: "https://t.me/thetonymars",
  },

  nav: [
    { key: "home", href: "/" },
    { key: "blog", href: "/blog" },
  ],

  homeSections: ["hero", "router", "about", "mission", "cta"] as const,
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
