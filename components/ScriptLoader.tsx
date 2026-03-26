import Script from "next/script"
import { trackingScripts, type TrackingScript } from "@/lib/scripts.config"

function shouldRender(script: TrackingScript, pageType: string): boolean {
  if (!script.enabled) return false
  if (script.env && !process.env[script.env]) return false
  if (script.pages === "all") return true
  return script.pages === pageType
}

export function ScriptLoader({ pageType }: { pageType: string }) {
  const activeScripts = trackingScripts.filter((s) => shouldRender(s, pageType))

  if (activeScripts.length === 0) return null

  return (
    <>
      {activeScripts.map((script) => {
        const envValue = script.env ? process.env[script.env] : undefined

        if (script.src) {
          return (
            <Script
              key={script.id}
              src={script.src}
              strategy={script.strategy}
            />
          )
        }

        if (script.inline) {
          const resolvedInline = envValue
            ? script.inline.replace("{{ID}}", envValue)
            : script.inline

          return (
            <Script
              key={script.id}
              id={script.id}
              strategy={script.strategy}
              dangerouslySetInnerHTML={{ __html: resolvedInline }}
            />
          )
        }

        return null
      })}
    </>
  )
}
