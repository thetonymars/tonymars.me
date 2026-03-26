import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { SkipToContent } from "@/components/layout/SkipToContent"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
