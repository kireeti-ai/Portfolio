import { NextRequest, NextResponse } from "next/server"
import { isAdminRequestAuthenticated } from "@/lib/admin-auth"
import { getPortfolioContent, savePortfolioContent } from "@/lib/portfolio-content"

function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

export async function GET(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedResponse()
  }

  const content = await getPortfolioContent()
  return NextResponse.json(content)
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedResponse()
  }

  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 })
  }

  try {
    const saved = await savePortfolioContent(body)
    return NextResponse.json(saved)
  } catch {
    return NextResponse.json({ error: "Content failed validation." }, { status: 400 })
  }
}
