import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { MessagesManagement } from "@/components/admin/messages-management"

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ unread?: string }>
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

  // Await searchParams before using its properties
  const params = await searchParams

  // Get all contact messages
  let query = supabase.from("contact_messages").select("*").order("created_at", { ascending: false })

  if (params.unread === "true") {
    query = query.eq("is_read", false)
  }

  const { data: messages, error } = await query

  if (error) {
    console.error("Error fetching messages:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <MessagesManagement messages={messages || []} />
    </div>
  )
}
