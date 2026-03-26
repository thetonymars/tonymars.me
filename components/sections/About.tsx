import Image from "next/image"
import { useTranslations } from "next-intl"

export function About() {
  const t = useTranslations("about")
  const tags = t.raw("tags") as string[]

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src="/tony-portrait.png"
              alt="Tony Mars"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t("title")}</h2>
            <p className="text-lg text-gray-600 mb-8">{t("bio")}</p>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border px-4 py-1.5 text-sm text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
