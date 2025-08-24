# Email Setup for Contact Form

## Overview
The contact form now automatically sends email notifications to the admin (ante.simurina@gmail.com) when messages are submitted.

## Current Status
- ✅ Contact form saves messages to database
- ✅ Admin can view messages in admin panel
- ✅ Email notifications sent via Resend to admin
- ✅ Resend API integration fully implemented

## Setup for Production Email Sending

### Option 1: Resend ✅ COMPLETED
1. ✅ Signed up at [https://resend.com](https://resend.com)
2. ✅ API key obtained and integrated
3. ✅ Package installed: `npm install resend`
4. ✅ API key configured in email service

### Option 2: Other Email Services
You can modify `lib/email/email-service.ts` to use other services like:
- SendGrid
- Mailgun
- AWS SES
- Nodemailer with SMTP

## Environment Variables
```bash
# Required for Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# ✅ Resend API key already configured in email service
# No additional environment variables needed
```

## How It Works
1. User submits contact form
2. Message is saved to `contact_messages` table
3. Email notification is sent to admin
4. Admin can view and manage messages in `/admin/messages`

## Testing
1. Go to `/contact`
2. Fill out and submit the form
3. Check browser console for email logs
4. Check admin panel for saved messages

## Troubleshooting
- If emails aren't sending, check browser console for errors
- Ensure Supabase connection is working
- Verify admin email address in `lib/email/email-service.ts`
