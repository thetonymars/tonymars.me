export function FunnelHeadline({
  headline,
  subheadline,
}: {
  headline: string
  subheadline?: string
}) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {headline}
      </h1>
      {subheadline && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subheadline}</p>
      )}
    </div>
  )
}
