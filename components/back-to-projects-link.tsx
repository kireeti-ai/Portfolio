"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackToProjectsLink() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.push("/#projects")}
      className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#393939] transition-colors hover:text-[#0B0B0B]"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to projects
    </button>
  )
}
