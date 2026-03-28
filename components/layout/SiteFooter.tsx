import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  const t = useTranslations("footer")
  return (
    <footer className="bg-[#f5f7f8] border-t border-[#e8ecee] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] font-medium text-[#495257]">
          <span>{t("copyright")}</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#0073b9] no-underline transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-[#0073b9] no-underline transition-colors">
              {t("terms")}
            </Link>
            <Link href="/oferta" className="hover:text-[#0073b9] no-underline transition-colors">
              {t("oferta")}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[#495257] hover:text-[#0073b9] no-underline transition-colors">
              YT
            </a>
            <a href={siteConfig.social.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-[#495257] hover:text-[#0073b9] no-underline transition-colors">
              TG
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
