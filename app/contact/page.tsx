"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { useI18n } from "@/lib/i18n/context"

export default function ContactPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("contact")}</h1>
          <p className="text-muted-foreground">{t("contactUs")}</p>
        </div>
        <ContactForm />
      </div>

      <Footer />
    </div>
  )
}
