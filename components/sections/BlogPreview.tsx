import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function BlogPreview() {
  const t = useTranslations("blogPreview")
  const posts: Array<{ slug: string; title: string; excerpt: string; date: string }> = []

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">{t("title")}</h2>
          <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            {t("allPosts")} →
          </Link>
        </div>
      </div>
    </section>
  )
}
