export interface TrackingScript {
  id: string
  name: string
  placement: "head" | "body-start" | "body-end"
  strategy: "beforeInteractive" | "afterInteractive" | "lazyOnload"
  pages: "all" | "site" | "funnel" | "blog"
  src?: string
  inline?: string
  enabled: boolean
  env?: string
}

export const trackingScripts: TrackingScript[] = [
  // Uncomment and configure when ready:
  // {
  //   id: "yandex-metrica",
  //   name: "Yandex.Metrica",
  //   placement: "head",
  //   strategy: "afterInteractive",
  //   pages: "all",
  //   enabled: true,
  //   env: "NEXT_PUBLIC_YM_ID",
  // },
]
