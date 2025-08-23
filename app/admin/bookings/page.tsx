"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { BookingsManagement } from "@/components/admin/bookings-management"
import { Skeleton } from "@/components/ui/skeleton"
import type { Booking } from "@/lib/types"

type BookingWithDetails = Booking & { 
  apartment: any; 
  user: any 
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClient()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function checkAuthAndFetchData() {
      try {
        setLoading(true)
        setError(null)

        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          redirect("/auth/login")
          return
        }

        // Check if user is admin
        const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()
        if (!profile?.is_admin) {
          redirect("/")
          return
        }

        setIsAdmin(true)

        // Get all bookings with apartment details
        let query = supabase
          .from("bookings")
          .select(
            `
            *,
            apartment:apartments(id, title, city, address)
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

    checkAuthAndFetchData()
  }, [supabase, searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading bookings</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <BookingsManagement bookings={bookings} />
    </div>
  )
}
