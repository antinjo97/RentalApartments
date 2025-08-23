import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { ApartmentsManagement } from "@/components/admin/apartments-management"

export default async function AdminApartmentsPage() {
  const supabase = await createClient()

  // Check if user is authenticated and is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  // Get all apartments
  const { data: apartments, error } = await supabase
    .from("apartments")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching apartments:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <ApartmentsManagement apartments={apartments || []} />
    </div>
  )
}
