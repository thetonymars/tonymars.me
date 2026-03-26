import Link from "next/link"

export default function NotFound() {
  return (
    <html lang="ru">
      <body className="bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-sm font-medium text-gray-400 mb-4">404</p>
            <h1 className="text-3xl font-bold mb-4">Страница не найдена</h1>
            <p className="text-gray-600 mb-8">Такой страницы не существует</p>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              На главную
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
