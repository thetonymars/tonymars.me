import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("legal.personalData")
  return { title: t("title") }
}

export default async function PersonalDataAgreementPage() {
  const t = await getTranslations("legal.personalData")
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
        <div className="prose prose-lg max-w-none">
          <p>{t("content")}</p>
        </div>
      </div>
    </div>
  )
}
