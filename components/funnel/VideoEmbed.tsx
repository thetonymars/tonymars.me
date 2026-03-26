export function VideoEmbed({ url, title }: { url: string; title?: string }) {
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )
    return match?.[1]
  }

  const videoId = getYouTubeId(url)
  if (!videoId) return null

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title || "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        loading="lazy"
      />
    </div>
  )
}
