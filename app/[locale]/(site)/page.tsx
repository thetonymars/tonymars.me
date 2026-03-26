import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("site")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function HomePage() {
  const t = useTranslations("site")
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">{t("name")}</h1>
    </div>
  )
}
