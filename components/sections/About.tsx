import Image from "next/image"
import { useTranslations } from "next-intl"

export function About() {
  const t = useTranslations("about")
  const tags = t.raw("tags") as string[]

  return (
    <section className="py-16 sm:py-24 bg-[#f5f7f8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src="/tony-portrait.png"
              alt="Tony Mars"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div>
            <h2 className="text-[32px] lg:text-[44px] font-black tracking-[-2px] text-[#1f2426] mb-6">{t("title")}</h2>
            <p className="text-base text-[#495257] leading-relaxed mb-8">{t("bio")}</p>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="px-4 py-1.5 border-2 border-[#e8ecee] rounded-full text-[13px] font-semibold text-[#495257]">
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
