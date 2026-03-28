"use client"

import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

export function ProofStrip() {
  const t = useTranslations("proof")
  const items = t.raw("items") as Array<{ value: string; label: string }>
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-12 sm:py-16 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:flex sm:justify-center sm:items-center">
          {items.map((item, i) => (
            <div
              key={i}
              className={`text-center sm:px-14${i < items.length - 1 ? " sm:border-r sm:border-[#d0d5d9]" : ""}`}
            >
              <div className="text-5xl font-black tracking-[-2px] text-[#003561] mb-1">
                {animate ? item.value : "0"}
              </div>
              <div className="text-[13px] font-medium text-[#495257]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
