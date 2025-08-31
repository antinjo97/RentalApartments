"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, CheckCircle, Send } from "lucide-react"
import { useState } from "react"

import { useI18n } from "@/lib/i18n/context"

export function ContactForm() {
  const { t } = useI18n()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(t("required"))
      setIsLoading(false)
      return
    }

    try {
      // Send message via API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          subject: subject.trim() || null,
          message: message.trim(),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      setIsSubmitted(true)
      setName("")
      setEmail("")
      setPhone("")
      setSubject("")
      setMessage("")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t("error"))
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-green-50 to-green-100">
        <CardContent className="p-6 sm:p-8 md:p-12 text-center">
          <div className="mx-auto mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-foreground">{t("success")}</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed px-4">{t("messageSuccess")}</p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {t("sendNewMessage")}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto border-primary/20 shadow-xl">
      <CardHeader className="text-center pb-6 sm:pb-8">
        <div className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg">
          <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">{t("contactForm")}</CardTitle>
        <p className="text-muted-foreground text-base sm:text-lg mt-2 px-4">
          We'd love to hear from you! Send us a message and we'll respond as soon as possible.
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <Label htmlFor="name">{t("name")} *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("name")}
                required
                className="shadow-md hover:shadow-lg transition-all duration-300"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email">{t("email")} *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="shadow-md hover:shadow-lg transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+385 xx xxx xxxx"
                className="shadow-md hover:shadow-lg transition-all duration-300"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="subject">{t("subject")}</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t("subject")}
                className="shadow-md hover:shadow-lg transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="message">{t("message")} *</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("message")}
              rows={6}
              required
              className="shadow-md hover:shadow-lg transition-all duration-300 resize-none"
            />
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            size="lg" 
            className="w-full shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 py-4 sm:py-6 text-base sm:text-lg" 
            disabled={isLoading}
          >
            <Send className="mr-3 h-5 w-5" />
            {isLoading ? t("loading") : t("sendMessage")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
