import { siteConfig } from "@/lib/site-config"

interface JsonLdProps {
  type: "person" | "blogPosting"
  data?: any
}

export function JsonLd({ type, data }: JsonLdProps) {
  let schema: Record<string, any>

  if (type === "person") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "AI Marketing Tools Builder",
      sameAs: [siteConfig.social.youtube, siteConfig.social.telegram],
    }
  } else if (type === "blogPosting" && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: data.title,
      datePublished: data.publishedAt,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    }
  } else {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
