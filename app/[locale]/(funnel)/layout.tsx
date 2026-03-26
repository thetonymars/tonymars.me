import { FunnelFooter } from "@/components/layout/FunnelFooter"
import { ScriptLoader } from "@/components/ScriptLoader"

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <FunnelFooter />
      <ScriptLoader pageType="funnel" />
    </>
  )
}
