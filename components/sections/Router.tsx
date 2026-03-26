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
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">{t("title")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.id} className="rounded-xl border bg-white p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-2">{card.headline}</h3>
              <p className="text-gray-600 mb-6 flex-1">{card.description}</p>
              <Link href="#" className="inline-flex items-center text-sm font-medium text-gray-900 hover:underline">
                {card.buttonText} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
