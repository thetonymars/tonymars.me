import { getTranslations } from "next-intl/server"
import { siteConfig } from "@/lib/site-config"
import { sectionComponents } from "@/components/sections"
import { ScrollReveal } from "@/components/ScrollReveal"
import { JsonLd } from "@/components/JsonLd"
import { UnderConstruction } from "@/components/UnderConstruction"

export async function generateMetadata() {
  if (process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true") {
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
