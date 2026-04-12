import { NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, getSessionMaxAge } from "@/lib/admin-auth"

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured on the server." },
      { status: 500 },
    )
  }

  const body = (await request.json().catch(() => null)) as { password?: string } | null
  if (!body?.password) {
    return NextResponse.json({ error: "Password is required." }, { status: 400 })
  }

  if (body.password !== adminPassword) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: createAdminSessionToken(adminPassword),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: getSessionMaxAge(),
    path: "/",
  })
  return response
}
