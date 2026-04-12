"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export function AdminLoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null
        setError(data?.error ?? "Login failed.")
        return
      }

      router.replace("/admin")
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-2xl border-2 border-black bg-white p-6">
      <h1 className="text-2xl font-bold text-[#0B0B0B]">Admin Login</h1>
      <p className="text-sm font-medium text-[#393939]">Enter your admin password to update portfolio content.</p>

      <label className="block text-sm font-semibold text-[#0B0B0B]">
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm outline-none"
          required
        />
      </label>

      {error ? <p className="text-sm font-semibold text-[#B91C1C]">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1F1F1F] disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  )
}
