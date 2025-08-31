import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BookingsList } from "@/components/booking/bookings-list"
import { redirect } from "next/navigation"
import { BookingsPageClient } from "@/components/booking/bookings-page-client"

export default async function BookingsPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user's bookings
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      `
      *,
      apartment:apartments(*)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bookings:", error)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main content area */}
      <div className="flex-1 container mx-auto px-4 py-6 sm:py-8">
        <BookingsPageClient bookings={bookings || []} />
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  )
}
