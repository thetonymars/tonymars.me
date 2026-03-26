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
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">{t("title")}</h2>
          <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            {t("allPosts")} →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group">
              <article className="rounded-xl border bg-white overflow-hidden">
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
                  <time className="text-sm text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                  </time>
                  <h3 className="text-lg font-bold mt-1 mb-2 group-hover:underline">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
