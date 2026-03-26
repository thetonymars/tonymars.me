import { useTranslations } from "next-intl"

export function SkipToContent() {
  const t = useTranslations("nav")
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
    >
      {t("skipToContent")}
    </a>
  )
}
