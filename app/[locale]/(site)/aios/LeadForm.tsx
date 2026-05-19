"use client"

import { useState } from "react"

const ENDPOINT = "https://aios-skills.vercel.app/lead"

type State = "idle" | "loading" | "done" | "error"

export function LeadForm() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<State>("idle")
  const [msg, setMsg] = useState("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState("loading")
    setMsg("")
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const d = await r.json().catch(() => ({}))
      if (r.ok) {
        setState("done")
      } else {
        setState("error")
        setMsg(d.error || "Что-то пошло не так. Попробуйте ещё раз.")
      }
    } catch {
      setState("error")
      setMsg("Сеть недоступна. Попробуйте ещё раз.")
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
        <p className="text-xl font-semibold text-green-900">Проверьте почту 📬</p>
        <p className="mt-2 text-green-800">
          Мы отправили письмо с командой установки на <b>{email}</b>. Откройте
          его в вашем AI-клиенте и вставьте промпт.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-base outline-none focus:border-gray-900"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700 disabled:opacity-60"
      >
        {state === "loading" ? "Отправляем…" : "Получить установку"}
      </button>
      {state === "error" && (
        <p className="w-full text-sm text-red-600 sm:absolute sm:mt-16">{msg}</p>
      )}
    </form>
  )
}
