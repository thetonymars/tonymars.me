import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getPosts } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import Image from "next/image"

export async function generateMetadata() {
  const t = await getTranslations("blog")
  return { title: t("title") }
}

export default async function BlogPage() {
  const t = await getTranslations("blog")
  const posts = await getPosts()

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h1 className="text-4xl font-bold mb-12">{t("title")}</h1>
        {posts.length === 0 ? (
          <p className="text-gray-500">Скоро здесь появятся статьи</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group">
                <article>
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 mb-4">
                      <Image
                        src={urlFor(post.coverImage).width(600).height(340).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <time className="text-sm text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                  </time>
                  <h2 className="text-xl font-bold mt-1 mb-2 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
