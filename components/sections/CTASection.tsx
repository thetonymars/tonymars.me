import { useTranslations } from "next-intl"
import { siteConfig } from "@/lib/site-config"

export function CTASection() {
  const t = useTranslations("cta")
  return (
    <section className="py-16 sm:py-24 bg-[#f5f7f8] border-t border-[#e8ecee]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 text-center">
        <h2 className="text-[32px] lg:text-[44px] font-black tracking-[-2px] text-[#1f2426] mb-8">{t("headline")}</h2>
        <div className="flex flex-wrap justify-center gap-4">
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
    </section>
  )
}
