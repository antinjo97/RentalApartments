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
      alert("Passwords don't match / Lozinke se ne poklapaju")
      return
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters / Lozinka mora imati najmanje 6 znakova")
      return
    }

    setUpdating(true)
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      alert("Error updating password / Greška pri ažuriranju lozinke")
    } else {
      alert("Password updated successfully / Lozinka je uspješno ažurirana")
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
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Main content area */}
      <div className="flex-1 container mx-auto py-8 max-w-2xl space-y-6 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Jezik / Language</CardTitle>
            <CardDescription>Odaberite jezik / Choose your language</CardDescription>
          </CardHeader>
          <CardContent>
            <LanguageSwitcher />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Promjena lozinke / Change Password</CardTitle>
            <CardDescription>Ažurirajte svoju lozinku / Update your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="new_password">Nova lozinka / New Password</Label>
              <Input
                id="new_password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="confirm_password">Potvrdi lozinku / Confirm Password</Label>
              <Input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button onClick={handlePasswordUpdate} disabled={updating}>
              {updating ? "Ažuriranje..." : "Ažuriraj lozinku / Update Password"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  )
}
