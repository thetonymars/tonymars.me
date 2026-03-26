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
    <section className="py-12 sm:py-16" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:flex sm:justify-center sm:gap-16">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-1">
                {animate ? item.value : "0"}
              </div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
