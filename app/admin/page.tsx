import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AdminPanel } from "@/components/admin/admin-panel"
import { ADMIN_SESSION_COOKIE, isValidAdminSessionToken } from "@/lib/admin-auth"
import { getPortfolioContent } from "@/lib/portfolio-content"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  const isAuthenticated = isValidAdminSessionToken(token, process.env.ADMIN_PASSWORD)

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  const content = await getPortfolioContent()

  return <AdminPanel initialContent={content} />
}
