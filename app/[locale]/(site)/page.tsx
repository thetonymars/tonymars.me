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
