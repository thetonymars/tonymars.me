import { FunnelHeadline } from "@/components/funnel/FunnelHeadline"
import { FunnelCTA } from "@/components/funnel/FunnelCTA"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ funnel: string; page: string }>
}) {
  const { funnel, page } = await params
  return {
    title: `${funnel} — ${page}`,
    robots: { index: false, follow: false },
  }
}

export default async function FunnelPage({
  params,
}: {
  params: Promise<{ funnel: string; page: string }>
}) {
  const { funnel, page } = await params

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <FunnelHeadline
          headline={`Funnel: ${funnel}`}
          subheadline={`Page: ${page}`}
        />
        <FunnelCTA text="Placeholder CTA" href="#" />
        <p className="mt-8 text-sm text-gray-400">
          This is a placeholder funnel page. Replace with actual funnel content.
        </p>
      </div>
    </div>
  )
}
