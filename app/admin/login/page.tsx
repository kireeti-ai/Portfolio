import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { AdminLoginForm } from "@/components/admin/login-form"
import { ADMIN_SESSION_COOKIE, isValidAdminSessionToken } from "@/lib/admin-auth"

export default async function AdminLoginPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

  if (isValidAdminSessionToken(token, process.env.ADMIN_PASSWORD)) {
    redirect("/admin")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <AdminLoginForm />
    </main>
  )
}
