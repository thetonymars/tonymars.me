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
