import { ContactMessage } from "@/lib/types"

// Email service for sending contact form notifications
export class EmailService {
  private static readonly ADMIN_EMAIL = "ante.simurina@gmail.com"
  private static readonly FROM_EMAIL = "onboarding@resend.dev" // Using Resend onboarding email

  /**
   * Send contact form notification to admin
   */
  static async sendContactNotification(message: ContactMessage): Promise<boolean> {
    try {
      // Get Resend API key from environment variable
      const resendApiKey = process.env.RESEND_API_KEY
      
      if (!resendApiKey) {
        console.warn("RESEND_API_KEY environment variable not set, falling back to console mode")
        return await this.sendToConsole(message)
      }
      
      // Always use Resend to send actual email
      return await this.sendWithResend(message, resendApiKey)
    } catch (error) {
      console.error("Failed to send contact notification:", error)
      return false
    }
  }

  /**
   * Send email using Resend service
   */
  private static async sendWithResend(message: ContactMessage, apiKey: string): Promise<boolean> {
    try {
      // Import and use Resend
      const { Resend } = await import("resend")
      const resend = new Resend(apiKey)

      const { data, error } = await resend.emails.send({
        from: this.FROM_EMAIL,
        to: this.ADMIN_EMAIL,
        subject: `New Contact Message: ${message.subject || 'No Subject'}`,
        html: this.generateContactEmailHTML(message),
        text: this.generateContactEmailText(message),
      })

      if (error) {
        console.error("Resend email error:", error)
        return false
      }

      console.log("📧 Email sent successfully via Resend:", data)
      return true
    } catch (error) {
      console.error("Failed to send email with Resend:", error)
      return await this.sendToConsole(message)
    }
  }

  /**
   * Fallback method for development - logs to console
   */
  private static async sendToConsole(message: ContactMessage): Promise<boolean> {
    console.log("📧 Contact Form Notification (Console Mode)")
    console.log("To:", this.ADMIN_EMAIL)
    console.log("From:", message.email)
    console.log("Subject:", message.subject || "New Contact Message")
    console.log("Message:", message.message)
    console.log("Name:", message.name)
    console.log("Phone:", message.phone || "Not provided")
    console.log("---")
    console.log("💡 To enable real email sending, create .env.local file with:")
    console.log("💡 RESEND_API_KEY=your_resend_api_key_here")
    console.log("💡 Sign up at https://resend.com for free email API")
    return true
  }

  /**
   * Generate HTML email template for contact notifications
   */
  private static generateContactEmailHTML(message: ContactMessage): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Message</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .message-box { background: #fff; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #495057; }
            .value { margin-top: 5px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 New Contact Message</h2>
              <p>You have received a new contact message from your website.</p>
            </div>
            
            <div class="message-box">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${message.name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${message.email}</div>
              </div>
              
              ${message.phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${message.phone}</div>
                </div>
              ` : ''}
              
              ${message.subject ? `
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${message.subject}</div>
                </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value" style="white-space: pre-wrap;">${message.message}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>This message was sent from your contact form at ${new Date().toLocaleString()}</p>
              <p>Message ID: ${message.id}</p>
              <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d;">
                <strong>Privacy Policy:</strong> Ova poruka i osobni podaci se koriste isključivo za odgovor na vaš upit. 
                Podaci se ne dijele s trećim stranama i mogu biti obrisani na vaš zahtjev.
              </p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  /**
   * Generate plain text email for contact notifications
   */
  private static generateContactEmailText(message: ContactMessage): string {
    return `
New Contact Message

Name: ${message.name}
Email: ${message.email}
${message.phone ? `Phone: ${message.phone}` : ''}
${message.subject ? `Subject: ${message.subject}` : ''}

Message:
${message.message}

---
Sent from your contact form at ${new Date().toLocaleString()}
Message ID: ${message.id}
    `.trim()
  }
}
