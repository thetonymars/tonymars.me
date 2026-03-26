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
