import { NextRequest, NextResponse } from "next/server"

// us-024: the confirm link in the email points here (tonymars.me/aios/confirm
// — user-facing, NOT vercel.app). Clicking it confirms email ownership
// (flips the claim token unconfirmed → pending upstream), then redirects to
// the Thank-You page that shows the install prompt.
const CONFIRM = "https://aios-skills.vercel.app/confirm"

export async function GET(req: NextRequest) {
  const t = req.nextUrl.searchParams.get("t") || ""
  if (t) {
    // best-effort confirm; the Thank-You page also gates on the confirmed state
    await fetch(`${CONFIRM}?t=${encodeURIComponent(t)}`).catch(() => {})
  }
  const dest = new URL("/aios/thank-you", req.nextUrl.origin)
  if (t) dest.searchParams.set("t", t)
  return NextResponse.redirect(dest)
}
