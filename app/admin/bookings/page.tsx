"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { AdminHeader } from "@/components/admin/admin-header"
import { BookingsManagement } from "@/components/admin/bookings-management"
import { Footer } from "@/components/layout/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { useAdmin } from "@/hooks/use-admin"
import type { Booking } from "@/lib/types"

type BookingWithDetails = Booking & { 
  apartment: any; 
  user: any 
}

export default function AdminBookingsPage() {
  const { isAdmin, isLoading } = useAdmin()
  const [bookings, setBookings] = useState<BookingWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchBookings() {
      if (!isAdmin) return
      
      try {
        setLoading(true)
        setError(null)

        // Get all bookings with apartment details
        let query = supabase
          .from("bookings")
          .select(
            `
            *,
            apartment:apartments(id, title, city, address, images)
          `,
          )
          .order("created_at", { ascending: false })

        const status = searchParams.get("status")
        if (status && status !== "all") {
          query = query.eq("status", status)
        }

        const { data: bookingsData, error: fetchError } = await query

        if (fetchError) {
          console.error("Error fetching bookings:", fetchError)
          setError(fetchError.message)
        } else {
          console.log("Bookings data:", bookingsData)
          // Transform bookings to include user object with guest information
          const transformedBookings = (bookingsData || []).map(booking => ({
            ...booking,
            user: {
              first_name: booking.guest_name.split(' ')[0] || '',
              last_name: booking.guest_name.split(' ').slice(1).join(' ') || ''
            }
          }))
          setBookings(transformedBookings)
        }
      } catch (err) {
        console.error("Error:", err)
        setError("Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [isAdmin, searchParams])

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminHeader />
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminHeader />
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading bookings</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <div className="flex-1">
        <BookingsManagement bookings={bookings} />
      </div>
      
      {/* Footer at the bottom */}
      <Footer />
    </div>
  )
}
