import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getPostBySlug, getAllSlugs } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import { PortableText } from "@portabletext/react"
import { JsonLd } from "@/components/JsonLd"
import Image from "next/image"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Not Found" }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }]
        : undefined,
    },
    twitter: { card: "summary_large_image" },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const t = await getTranslations("blog")
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <article className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 mb-8 inline-block">
          {t("backToBlog")}
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-sm text-gray-400 block mb-8">
          {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
        </time>
        {post.coverImage && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 mb-12">
            <Image
              src={urlFor(post.coverImage).width(1200).height(675).url()}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>
      </div>
      <JsonLd type="blogPosting" data={post} />
    </article>
  )
}
