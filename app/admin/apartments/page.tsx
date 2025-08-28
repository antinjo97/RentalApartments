"use client"

import { AdminHeader } from "@/components/admin/admin-header"
import { ApartmentsManagement } from "@/components/admin/apartments-management"
import { Footer } from "@/components/layout/footer"
import { useAdmin } from "@/hooks/use-admin"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function AdminApartmentsPage() {
  const { isAdmin, isLoading } = useAdmin()
  const [apartments, setApartments] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)

  useEffect(() => {
    async function fetchApartments() {
      if (!isAdmin) return
      
      const supabase = createClient()
      
      try {
        const { data, error } = await supabase
          .from("apartments")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching apartments:", error)
        } else {
          setApartments(data || [])
        }
      } catch (error) {
        console.error("Error fetching apartments:", error)
      } finally {
        setIsDataLoading(false)
      }
    }

    fetchApartments()
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
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <ApartmentsManagement apartments={apartments} />
      
      <Footer />
    </div>
  )
}
