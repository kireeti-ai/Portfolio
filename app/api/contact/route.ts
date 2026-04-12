import { NextResponse } from "next/server"

type ContactRequest = {
  name?: string
  email?: string
  message?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactRequest | null

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 })
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>"

  if (!resendApiKey || !toEmail) {
    return NextResponse.json(
      { error: "Email service is not configured. Add RESEND_API_KEY and CONTACT_TO_EMAIL." },
      { status: 500 }
    )
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `New portfolio contact from ${name}`,
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    }),
  })

  if (!resendResponse.ok) {
    const resendError = (await resendResponse.json().catch(() => null)) as { message?: string } | null
    return NextResponse.json(
      { error: resendError?.message || "Email provider rejected the request." },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
