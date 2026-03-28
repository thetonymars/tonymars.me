"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/lib/site-config"

export function SiteHeader() {
  const t = useTranslations("nav")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setVisible(currentScrollY < lastScrollY || currentScrollY < 64)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e8ecee] transition-transform duration-200 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="h-[3px] bg-[#0073b9]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-[15px] font-extrabold tracking-[1px] text-[#003561] uppercase no-underline hover:no-underline">
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-[13px] font-medium text-[#495257] hover:text-[#0073b9] no-underline transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-[#1f2426] transition-transform ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-[#1f2426] transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-[#1f2426] transition-transform ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[#e8ecee] bg-white px-4 py-4" aria-label="Mobile">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block py-3 text-[#495257] no-underline"
              onClick={() => setMobileOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
