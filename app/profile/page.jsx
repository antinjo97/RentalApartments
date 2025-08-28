"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n/context"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/layout/footer"

export default function ProfilePage() {
  const { t } = useI18n()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    is_admin: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)

      // Get user profile
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (profileData) {
        setProfile({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
          email: user.email || "",
          phone: profileData.phone || "",
          is_admin: profileData.is_admin || false,
        })
      }

      setLoading(false)
    }

    getUser()
  }, [router])

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
      })
      .eq("id", user.id)

    if (error) {
      console.error("Error updating profile:", error)
    } else {
      alert(t("profileUpdated"))
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">{t("loading")}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {t("profile")}
              {profile.is_admin && <Badge variant="secondary">{t("administrator")}</Badge>}
            </CardTitle>
            <CardDescription>{t("updateProfileInfo")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">{t("firstName")}</Label>
                <Input
                  id="first_name"
                  value={profile.first_name}
                  onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="last_name">{t("lastName")}</Label>
                <Input
                  id="last_name"
                  value={profile.last_name}
                  onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" value={profile.email} disabled className="bg-gray-50" />
              <p className="text-sm text-gray-500 mt-1">{t("emailCannotBeChanged")}</p>
            </div>

            <div>
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? t("saving") : t("saveChanges")}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
