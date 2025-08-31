import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(
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

    // Get message ID and reply content from request body
    const { id: messageId } = await params
    const { replyMessage, adminName } = await request.json()

    if (!replyMessage) {
      return NextResponse.json(
        { error: "Reply message is required" },
        { status: 400 }
      )
    }

    // Get the original message details
    const { data: originalMessage, error: messageError } = await supabase
      .from("contact_messages")
      .select("*")
      .eq("id", messageId)
      .single()

    if (messageError || !originalMessage) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      )
    }

    // Send email via Resend using dynamic import (same as EmailService)
    try {
      // Dynamic import for Resend (same as EmailService)
      const { Resend } = await import("resend")
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Rental Apartments <noreply@yourdomain.com>', // TODO: Promijenite na vašu domenu kada postavite live
        to: [originalMessage.email],
        subject: `Re: ${originalMessage.subject || 'Vaša poruka'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Odgovor na vašu poruku</h2>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Vaša originalna poruka:</h3>
              <p><strong>Ime:</strong> ${originalMessage.name}</p>
              <p><strong>Email:</strong> ${originalMessage.email}</p>
              ${originalMessage.phone ? `<p><strong>Telefon:</strong> ${originalMessage.phone}</p>` : ''}
              ${originalMessage.subject ? `<p><strong>Naslov:</strong> ${originalMessage.subject}</p>` : ''}
              <p><strong>Poruka:</strong></p>
              <p style="white-space: pre-wrap;">${originalMessage.message}</p>
            </div>
            
            <div style="background-color: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Naš odgovor:</h3>
              <p style="white-space: pre-wrap;">${replyMessage}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <p style="color: #666; font-size: 14px;">
              Ovo je automatski generiran odgovor. Molimo ne odgovarajte na ovaj email.
            </p>
            
            <p style="color: #666; font-size: 14px;">
              <strong>Privacy Policy:</strong> Vaša poruka i osobni podaci se koriste isključivo za odgovor na vaš upit. 
              Podaci se ne dijele s trećim stranama i mogu biti obrisani na vaš zahtjev.
            </p>
            
            <p style="color: #666; font-size: 14px;">
              S poštovanjem,<br>
              ${adminName || 'Admin tim'}<br>
              Rental Apartments
            </p>
          </div>
        `,
      })

      if (emailError) {
        return NextResponse.json(
          { error: "Failed to send email", details: emailError.message },
          { status: 500 }
        )
      }

      // Mark the original message as replied to
      await supabase
        .from("contact_messages")
        .update({ 
          is_read: true,
          replied_at: new Date().toISOString(),
          admin_reply: replyMessage
        })
        .eq("id", messageId)

      return NextResponse.json(
        { 
          success: true, 
          message: "Reply sent successfully",
          emailId: emailData?.id
        },
        { status: 200 }
      )

    } catch (resendError) {
      return NextResponse.json(
        { error: "Failed to send email", details: "Resend service error" },
        { status: 500 }
      )
    }

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
