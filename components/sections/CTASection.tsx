import { useTranslations } from "next-intl"

export function CTASection() {
  const t = useTranslations("cta")
  return (
    <section className="py-16 sm:py-24 bg-[#f5f7f8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 text-center">
        <h2 className="text-[32px] lg:text-[44px] font-black tracking-[-2px] text-[#1f2426] mb-8">{t("headline")}</h2>
        <a
          href="#"
          className="inline-flex items-center px-8 py-4 bg-[#0073b9] text-white rounded-lg text-base font-bold hover:bg-[#005fa0] transition-colors no-underline"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  )
}
