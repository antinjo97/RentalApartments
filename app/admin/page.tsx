import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminOverview } from "@/components/admin/admin-overview"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Get overview statistics
  const [apartmentsResult, bookingsResult, messagesResult] = await Promise.all([
    supabase.from("apartments").select("id, is_available"),
    supabase.from("bookings").select("id, status, total_price, created_at"),
    supabase.from("contact_messages").select("id, is_read, created_at"),
  ])

  const apartments = apartmentsResult.data || []
  const bookings = bookingsResult.data || []
  const messages = messagesResult.data || []

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <AdminOverview apartments={apartments} bookings={bookings} messages={messages} />
    </div>
  )
}
