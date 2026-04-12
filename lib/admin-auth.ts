import { createHmac, timingSafeEqual } from "crypto"
import type { NextRequest } from "next/server"

export const ADMIN_SESSION_COOKIE = "portfolio_admin_session"

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

function buildSignature(issuedAt: string, secret: string) {
  return createHmac("sha256", secret).update(issuedAt).digest("hex")
}

export function createAdminSessionToken(secret: string) {
  const issuedAt = Math.floor(Date.now() / 1000).toString()
  const signature = buildSignature(issuedAt, secret)
  return `${issuedAt}.${signature}`
}

export function isValidAdminSessionToken(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) {
    return false
  }

  const [issuedAtRaw, signature] = token.split(".")
  if (!issuedAtRaw || !signature) {
    return false
  }

  const issuedAt = Number(issuedAtRaw)
  if (!Number.isFinite(issuedAt)) {
    return false
  }

  const now = Math.floor(Date.now() / 1000)
  if (now - issuedAt > SESSION_MAX_AGE_SECONDS || issuedAt > now + 60) {
    return false
  }

  const expected = buildSignature(issuedAtRaw, secret)
  const expectedBuffer = Buffer.from(expected)
  const signatureBuffer = Buffer.from(signature)

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false
  }

  return timingSafeEqual(expectedBuffer, signatureBuffer)
}

export function isAdminRequestAuthenticated(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  return isValidAdminSessionToken(token, process.env.ADMIN_PASSWORD)
}

export function getSessionMaxAge() {
  return SESSION_MAX_AGE_SECONDS
}
