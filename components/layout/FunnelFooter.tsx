import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function FunnelFooter() {
  const t = useTranslations("footer")
  return (
    <footer className="py-6">
      <div className="mx-auto max-w-7xl px-4 text-center text-xs text-gray-400">
        <div className="flex items-center justify-center gap-4">
          <Link href="/privacy-policy" className="hover:text-gray-600 transition-colors">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">
            {t("terms")}
          </Link>
          <Link href="/oferta" className="hover:text-gray-600 transition-colors">
            {t("oferta")}
          </Link>
        </div>
      </div>
    </footer>
  )
}
