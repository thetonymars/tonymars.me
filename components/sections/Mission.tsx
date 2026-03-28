import { useTranslations } from "next-intl"

interface StatItem {
  value: string
  label: string
  source: string
}

export function Mission() {
  const t = useTranslations("mission")
  const stats = t.raw("stats") as StatItem[]

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="text-[32px] lg:text-[44px] font-black tracking-[-2px] text-[#1f2426] mb-8">{t("title")}</h2>

        <div className="max-w-3xl">
          <p className="text-base sm:text-lg text-[#495257] leading-relaxed mb-10">
            {t("intro")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#f5f7f8] rounded-xl p-6 text-center">
              <div className="text-3xl font-black text-[#003561]">{stat.value}</div>
              <div className="text-sm text-[#495257] mt-2">{stat.label}</div>
              {stat.source && <div className="text-xs text-[#888] mt-1">{stat.source}</div>}
            </div>
          ))}
        </div>

        <div className="max-w-3xl text-base sm:text-lg text-[#495257] leading-relaxed whitespace-pre-line">
          {t("body")}
        </div>
      </div>
    </section>
  )
}
