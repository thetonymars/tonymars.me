import { NextRequest, NextResponse } from "next/server"

// Proxy the lead submit through tonymars.me so the browser never calls
// aios-skills.vercel.app directly (us-024 hard requirement: no user-visible
// vercel.app). The upstream mints an unconfirmed claim token + emails a
// confirm link.
const UPSTREAM = "https://aios-skills.vercel.app/lead"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  try {
    const r = await fetch(UPSTREAM, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await r.json().catch(() => ({}))
    return NextResponse.json(data, { status: r.status })
  } catch {
    return NextResponse.json(
      { error: "Сеть недоступна. Попробуйте ещё раз." },
      { status: 502 },
    )
  }
}
