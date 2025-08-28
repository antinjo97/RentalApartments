import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BookingsList } from "@/components/booking/bookings-list"
import { redirect } from "next/navigation"

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
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Moje rezervacije / My Bookings</h1>
          <p className="text-muted-foreground">Pregled svih vaših rezervacija / Overview of all your bookings</p>
        </div>

        <BookingsList bookings={bookings || []} />
      </div>

      <Footer />
    </div>
  )
}
