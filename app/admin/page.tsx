"use client"

import { AdminHeader } from "@/components/admin/admin-header"
import { AdminOverview } from "@/components/admin/admin-overview"
import { Footer } from "@/components/layout/footer"
import { useAdmin } from "@/hooks/use-admin"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function AdminDashboardPage() {
  const { isAdmin, isLoading } = useAdmin()
  const [apartments, setApartments] = useState([])
  const [bookings, setBookings] = useState([])
  const [messages, setMessages] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!isAdmin) return
      
      const supabase = createClient()
      
      try {
        const [apartmentsResult, bookingsResult, messagesResult] = await Promise.all([
          supabase.from("apartments").select("id, is_available"),
          supabase.from("bookings").select("id, status, total_price, created_at"),
          supabase.from("contact_messages").select("id, is_read, created_at"),
        ])

        setApartments(apartmentsResult.data || [])
        setBookings(bookingsResult.data || [])
        setMessages(messagesResult.data || [])
      } catch (error) {
        console.error("Error fetching admin data:", error)
      } finally {
        setIsDataLoading(false)
      }
    }

    fetchData()
  }, [isAdmin])

  if (isLoading || isDataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
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
        <AdminOverview apartments={apartments} bookings={bookings} messages={messages} />
      </div>
      
      {/* Footer at the bottom */}
      <Footer />
    </div>
  )
}
