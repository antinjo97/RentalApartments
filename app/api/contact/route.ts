import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { EmailService } from "@/lib/email/email-service"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get the contact message data from the request
    const { name, email, phone, subject, message } = await request.json()

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Insert the message into the database
    const { data: contactMessage, error: dbError } = await supabase
      .from("contact_messages")
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        subject: subject?.trim() || null,
        message: message.trim(),
      })
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        { error: "Failed to save message" },
        { status: 500 }
      )
    }

    // Send email notification to admin
    try {
      await EmailService.sendContactNotification(contactMessage)
    } catch (emailError) {
      console.error("Email notification failed:", emailError)
      // Don't fail the request if email fails, just log it
      // The message is still saved in the database
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Contact message sent successfully",
        id: contactMessage.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
