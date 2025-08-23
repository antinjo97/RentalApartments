import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { BookingForm } from "@/components/booking/booking-form"
import { notFound, redirect } from "next/navigation"

export default async function BookApartmentPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get apartment details
  const { data: apartment, error } = await supabase
    .from("apartments")
    .select("*")
    .eq("id", params.id)
    .eq("is_available", true)
    .single()

  if (error || !apartment) {
    notFound()
  }

  // Get existing bookings for this apartment to block unavailable dates
  const { data: existingBookings } = await supabase
    .from("bookings")
    .select("check_in_date, check_out_date")
    .eq("apartment_id", params.id)
    .in("status", ["confirmed", "pending"])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BookingForm apartment={apartment} existingBookings={existingBookings || []} user={user} />
    </div>
  )
}
