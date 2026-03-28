import { useTranslations } from "next-intl"
import { siteConfig } from "@/lib/site-config"

export function Hero() {
  const t = useTranslations("hero")
  return (
    <section className="pt-40 sm:pt-48 pb-16 sm:pb-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="max-w-4xl">
          <span className="inline-block bg-[#fcd214] text-[#003561] px-3.5 py-[5px] rounded text-[11px] font-bold tracking-[1.5px] mb-5">{t("badge")}</span>
          <h1 className="text-4xl sm:text-5xl lg:text-[80px] font-black leading-[1.08] tracking-tight lg:tracking-[-3px] text-[#1f2426] mb-6">
            {t("headline")}
          </h1>
          <p className="text-lg text-[#495257] leading-relaxed mb-8 max-w-xl">
            {t("subheadline")}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 bg-[#0073b9] text-white rounded-lg text-base font-bold hover:bg-[#005fa0] transition-colors no-underline"
            >
              {t("cta")}
            </a>
            <a
              href={siteConfig.social.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-[#0073b9] border-2 border-[#0073b9] rounded-lg text-base font-bold hover:bg-[#f0f7fc] transition-colors no-underline"
            >
              {t("telegram")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
