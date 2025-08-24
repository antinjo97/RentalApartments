import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    
    // Check if user is authenticated and is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single()

    if (!profile?.is_admin) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      )
    }

    // Await params before using
    const { id: messageId } = await params

    console.log("Marking message as read:", messageId)
    
    // Update the message to mark it as read
    const { data: updateData, error: updateError } = await supabase
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", messageId)
      .select()

    if (updateError) {
      console.error("Database error:", updateError)
      return NextResponse.json(
        { error: "Failed to update message", details: updateError.message },
        { status: 500 }
      )
    }

    console.log("Message updated successfully:", updateData)

    return NextResponse.json(
      { 
        success: true, 
        message: "Message marked as read successfully" 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Mark as read API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
