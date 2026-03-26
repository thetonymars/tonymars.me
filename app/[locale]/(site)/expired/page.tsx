import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"

export async function generateMetadata() {
  const t = await getTranslations("expired")
  return { title: t("title"), robots: { index: false } }
}

export default async function ExpiredPage() {
  const t = await getTranslations("expired")
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <p className="text-gray-600 mb-8">{t("description")}</p>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          {t("home")}
        </Link>
      </div>
    </div>
  )
}
