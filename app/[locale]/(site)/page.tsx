import { siteConfig } from "@/lib/site-config"
import { UnderConstruction } from "@/components/UnderConstruction"

export function generateMetadata() {
  return {
    title: "Тони Марс — Скоро",
    description: "Сайт обновляется. AI-инструменты для маркетинга.",
    openGraph: {
      title: "Тони Марс — Скоро",
      description: "Сайт обновляется. AI-инструменты для маркетинга.",
      url: siteConfig.url,
      type: "website",
    },
  }
}

export default function HomePage() {
  // TODO: restore original homepage when ready
  // import { getTranslations } from "next-intl/server"
  // import { sectionComponents } from "@/components/sections"
  // import { ScrollReveal } from "@/components/ScrollReveal"
  // import { JsonLd } from "@/components/JsonLd"
  return <UnderConstruction />
}
