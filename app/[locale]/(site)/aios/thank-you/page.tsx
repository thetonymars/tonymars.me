import type { Metadata } from "next"
import { CopyPrompt } from "./CopyPrompt"

export const metadata: Metadata = {
  title: "AIOS — установка",
  robots: { index: false, follow: false },
}

const PROMPT_API = "https://aios-skills.vercel.app/prompt"

export default async function ThankYou({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>
}) {
  const { t } = await searchParams
  let prompt = ""
  if (t) {
    try {
      const r = await fetch(`${PROMPT_API}?t=${encodeURIComponent(t)}`, {
        cache: "no-store",
      })
      if (r.ok) {
        const d = await r.json()
        prompt = typeof d.prompt === "string" ? d.prompt : ""
      }
    } catch {
      // upstream unreachable — falls through to the error state
    }
  }

  if (!prompt) {
    return (
      <div className="py-20 sm:py-28">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-8">
          <h1 className="mb-4 text-3xl font-bold tracking-tight">
            Ссылка недействительна
          </h1>
          <p className="text-gray-600">
            Похоже, ссылка устарела или уже использована. Оставь email ещё раз —
            пришлём новую.
          </p>
          <a
            href="/aios"
            className="mt-8 inline-block rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
          >
            Вернуться к установке
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-8">
        <div className="text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-500">
            Почта подтверждена
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Готово. Забирай установку.
          </h1>
          <p className="text-lg text-gray-600">
            Скопируй команду ниже, открой свой AI-помощник (Claude, Codex —
            любой) и вставь её в чат. Через минуту AIOS будет стоять.
          </p>
        </div>

        <CopyPrompt prompt={prompt} />

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 text-gray-700">
          <p className="font-semibold text-gray-900">Что дальше</p>
          <ol className="mt-3 space-y-2 text-[15px] leading-relaxed">
            <li>
              <b>1.</b> Помощник всё поставит сам и попросит перезапуститься —
              просто закрой и открой его снова.
            </li>
            <li>
              <b>2.</b> После перезапуска — короткий разговор на пару минут: кто
              ты и чем занимаешься. Это нужно, чтобы AI работал именно под тебя.
            </li>
            <li>
              <b>3.</b> Всё. Дальше говоришь с ним как обычно — он уже знает твой
              контекст и подключён к навыкам.
            </li>
          </ol>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Что-то пошло не так? Ответь на письмо, которое мы прислали — помогу.
        </p>
      </div>
    </div>
  )
}
