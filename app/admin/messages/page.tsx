"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { AdminHeader } from "@/components/admin/admin-header"
import { MessagesManagement } from "@/components/admin/messages-management"
import { Footer } from "@/components/layout/footer"
import { useAdmin } from "@/hooks/use-admin"

export default function AdminMessagesPage() {
  const { isAdmin, isLoading } = useAdmin()
  const [messages, setMessages] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchMessages() {
      if (!isAdmin) return
      
      const supabase = createClient()
      
      try {
        let query = supabase.from("contact_messages").select("*").order("created_at", { ascending: false })

        const unread = searchParams.get("unread")
        if (unread === "true") {
          query = query.eq("is_read", false)
        }

        const { data, error } = await query

        if (error) {
          console.error("Error fetching messages:", error)
        } else {
          setMessages(data || [])
        }
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setIsDataLoading(false)
      }
    }

    fetchMessages()
  }, [isAdmin, searchParams])

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
      <MessagesManagement messages={messages} />
      
      <Footer />
    </div>
  )
}
