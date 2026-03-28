import { useTranslations } from "next-intl"

export function Mission() {
  const t = useTranslations("mission")

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="text-[32px] lg:text-[44px] font-black tracking-[-2px] text-[#1f2426] mb-8">{t("title")}</h2>
        <div className="max-w-3xl text-base sm:text-lg text-[#495257] leading-relaxed whitespace-pre-line">
          {t("text")}
        </div>
      </div>
    </section>
  )
}
