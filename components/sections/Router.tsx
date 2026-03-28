import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function Router() {
  const t = useTranslations("router")
  const cards = t.raw("cards") as Array<{
    id: string
    headline: string
    description: string
    buttonText: string
  }>

  return (
    <section className="py-16 sm:py-24 bg-[#f5f7f8] border-t border-[#e8ecee]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="text-[32px] lg:text-[44px] font-black tracking-[-2px] text-[#1f2426] mb-12">{t("title")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div key={card.id} className="bg-white border-2 border-[#e8ecee] rounded-xl p-8 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:border-[#0073b9]">
              <span className="text-[13px] font-extrabold tracking-[1px] text-[#0073b9] mb-4">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="text-xl font-extrabold text-[#1f2426] mb-2">{card.headline}</h3>
              <p className="text-sm text-[#495257] leading-relaxed flex-1 mb-6">{card.description}</p>
              <Link href="#" className="text-[13px] font-bold text-[#0073b9] px-5 py-2.5 border-2 border-[#0073b9] rounded-lg inline-block self-start hover:bg-[#0073b9] hover:text-white transition-colors no-underline">
                {card.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
