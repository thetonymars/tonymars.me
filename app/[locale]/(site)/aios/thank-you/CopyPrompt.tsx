"use client"

import { useState } from "react"

export function CopyPrompt({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard blocked — select-all fallback handled by the user
    }
  }

  return (
    <div className="mt-6">
      <div className="relative">
        <pre className="max-h-80 overflow-auto rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
          {prompt}
        </pre>
        <button
          onClick={copy}
          className="absolute right-3 top-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          {copied ? "Скопировано ✓" : "Скопировать"}
        </button>
      </div>
      <button
        onClick={copy}
        className="mt-4 w-full rounded-xl bg-gray-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-gray-700 sm:hidden"
      >
        {copied ? "Скопировано ✓" : "Скопировать команду"}
      </button>
    </div>
  )
}
