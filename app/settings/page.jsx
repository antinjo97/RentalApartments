"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/lib/i18n/context"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/i18n/language-switcher"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function SettingsPage() {
  const { t } = useI18n()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [supabase, router])

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert(t("passwordsNotMatch"))
      return
    }

    if (newPassword.length < 6) {
      alert(t("passwordTooShort"))
      return
    }

    setUpdating(true)
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      alert(t("errorUpdatingPassword"))
    } else {
      alert(t("passwordUpdatedSuccessfully"))
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }
    setUpdating(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">{t("loading")}</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Main content area */}
      <div className="flex-1 container mx-auto py-6 sm:py-8 max-w-2xl space-y-4 sm:space-y-6 px-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("language")}</CardTitle>
            <CardDescription>{t("chooseLanguage")}</CardDescription>
          </CardHeader>
          <CardContent>
            <LanguageSwitcher />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("changePassword")}</CardTitle>
            <CardDescription>{t("updatePassword")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="new_password">{t("newPassword")}</Label>
              <Input
                id="new_password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="confirm_password">{t("confirmPassword")}</Label>
              <Input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button onClick={handlePasswordUpdate} disabled={updating}>
              {updating ? t("updating") : t("updatePasswordButton")}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  )
}
