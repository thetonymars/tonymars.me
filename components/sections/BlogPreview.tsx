import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getPosts } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import Image from "next/image"

export async function BlogPreview() {
  const t = await getTranslations("blogPreview")
  const posts = await getPosts(3)

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[32px] lg:text-[44px] font-black tracking-[-2px] text-[#1f2426]">{t("title")}</h2>
          <Link href="/blog" className="text-sm font-bold text-[#0073b9]">
            {t("allPosts")} →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="bg-white border-2 border-[#e8ecee] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] no-underline">
              <article>
                {post.coverImage && (
                  <div className="relative aspect-[16/9] bg-gray-100">
                    <Image
                      src={urlFor(post.coverImage).width(400).height(225).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <time className="text-xs font-medium text-[#888]">
                    {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                  </time>
                  <h3 className="text-[17px] font-extrabold text-[#1f2426] mt-1 mb-2">{post.title}</h3>
                  <p className="text-sm text-[#495257] line-clamp-2">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
