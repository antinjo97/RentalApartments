"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut, Settings, Calendar, Shield, LogIn, Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n/context"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface Profile {
  first_name: string
  last_name: string
  is_admin: boolean
}

export function UserNav() {
  const { t } = useI18n()
  const router = useRouter()
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    async function getProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setIsAuthenticated(true)
          const { data: profileData } = await supabase
            .from('profiles')
            .select('first_name, last_name, is_admin')
            .eq('id', user.id)
            .single()
          
          setProfile(profileData)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [supabase])

  if (loading) {
    return (
      <Button variant="ghost" className="relative h-10 w-10 rounded-xl hover:bg-primary/10 transition-all duration-300">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/20 text-primary font-semibold">...</AvatarFallback>
        </Avatar>
      </Button>
    )
  }

  // Show login button if user is not authenticated
  if (!isAuthenticated || !profile) {
    return (
      <Button 
        onClick={() => router.push("/auth/login")} 
        variant="outline" 
        size="sm"
        className="h-10 px-4 rounded-xl border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <LogIn className="mr-2 h-4 w-4" />
        {t("login")}
      </Button>
    )
  }

  const displayName = `${profile.first_name} ${profile.last_name}`
  const initials = `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`.toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-xl hover:bg-primary/10 transition-all duration-300 group">
          <Avatar className="h-10 w-10 group-hover:scale-110 transition-transform duration-300">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-bold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 rounded-2xl border-2 border-primary/20 shadow-2xl backdrop-blur-sm" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-semibold leading-none text-foreground">{displayName}</p>
                {profile.is_admin && (
                  <div className="flex items-center gap-1 mt-1">
                    <Crown className="h-3 w-3 text-yellow-500" />
                    <p className="text-xs leading-none text-yellow-600 font-bold">Administrator</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary/20" />
        {profile.is_admin && (
          <>
            <DropdownMenuItem 
              onClick={() => router.push("/admin")}
              className="p-4 text-base font-medium hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 hover:text-primary transition-all duration-300"
            >
              <Shield className="mr-3 h-5 w-5" />
              <span className="font-semibold">Admin Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-primary/20" />
          </>
        )}
        <DropdownMenuItem 
          onClick={() => router.push("/profile")}
          className="p-4 text-base font-medium hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 hover:text-primary transition-all duration-300"
        >
          <User className="mr-3 h-5 w-5" />
          <span className="font-semibold">{t("profile")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => router.push("/bookings")}
          className="p-4 text-base font-medium hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 hover:text-primary transition-all duration-300"
        >
          <Calendar className="mr-3 h-5 w-5" />
          <span className="font-semibold">{t("myBookings")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => router.push("/settings")}
          className="p-4 text-base font-medium hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 hover:text-primary transition-all duration-300"
        >
          <Settings className="mr-3 h-5 w-5" />
          <span className="font-semibold">{t("settings")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-primary/20" />
        <DropdownMenuItem 
          onClick={async () => {
            await supabase.auth.signOut()
            router.push("/auth/login")
          }}
          className="p-4 text-base font-medium hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/20 hover:text-red-600 transition-all duration-300"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-semibold">{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
