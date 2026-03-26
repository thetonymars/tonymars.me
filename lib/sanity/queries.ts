import { sanityClient } from "./client"

export interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  body: any[]
  coverImage: any
  publishedAt: string
  tags?: string[]
}

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  coverImage,
  publishedAt,
  tags
`

export async function getPosts(limit?: number): Promise<Post[]> {
  const limitClause = limit ? `[0...${limit}]` : ""
  try {
    return await sanityClient.fetch(
      `*[_type == "post"] | order(publishedAt desc) ${limitClause} { ${postFields} }`
    )
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`,
      { slug }
    )
  } catch {
    return null
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "post"].slug.current`
    )
  } catch {
    return []
  }
}
