export function FunnelCTA({
  text,
  href,
  onClick,
  variant = "primary",
}: {
  text: string
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
}) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-bold transition-all hover:-translate-y-0.5"
  const variantClasses =
    variant === "primary"
      ? "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
      : "border-2 border-gray-300 text-gray-900 hover:border-gray-400"

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${variantClasses}`}>
        {text}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {text}
    </button>
  )
}
