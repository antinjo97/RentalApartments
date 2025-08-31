import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function DELETE(
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

    // Get message ID from params
    const { id: messageId } = await params

    // Delete the message
    const { error: deleteError } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", messageId)

    if (deleteError) {
      return NextResponse.json(
        { error: "Failed to delete message", details: deleteError.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Message deleted successfully" 
      },
      { status: 200 }
    )

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
