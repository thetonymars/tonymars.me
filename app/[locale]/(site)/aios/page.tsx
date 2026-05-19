import type { Metadata } from "next"
import { LeadForm } from "./LeadForm"

export const metadata: Metadata = {
  title: "AIOS — установка за один промпт",
  description:
    "AIOS: операционная система для вашего бизнеса на базе AI-агентов. Введите email — пришлём одну команду установки.",
}

export default function AiosPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-8 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-500 mb-4">
          AIOS
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
          Операционная система вашего бизнеса на AI
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Платформа из навыков, которые работают за вас. Установка — одна
          команда в вашем AI-клиенте. Оставьте email — пришлём её прямо сейчас.
        </p>
        <LeadForm />
        <p className="text-xs text-gray-400 mt-8">
          Бесплатный доступ. Письмо придёт сразу после отправки.
        </p>
      </div>
    </div>
  )
}
