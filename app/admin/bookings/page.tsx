import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { BookingsManagement } from "@/components/admin/bookings-management"

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
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

  // Get all bookings with apartment details
  let query = supabase
    .from("bookings")
    .select(
      `
      *,
      apartment:apartments(*),
      user:profiles(first_name, last_name)
    `,
    )
    .order("created_at", { ascending: false })

  if (searchParams.status && searchParams.status !== "all") {
    query = query.eq("status", searchParams.status)
  }

  const { data: bookings, error } = await query

  if (error) {
    console.error("Error fetching bookings:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <BookingsManagement bookings={bookings || []} />
    </div>
  )
}
