"use client"

import Link from "next/link"
import { UserNav } from "@/components/auth/user-nav"
import { Settings, Home, Building, Calendar, MessageSquare, BarChart3, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n/context"
import { LanguageSwitcher } from "@/components/i18n/language-switcher"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

export function AdminHeader() {
  const pathname = usePathname()
  const { t } = useI18n()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: t("overviewOverview"), href: "/admin", icon: BarChart3 },
    { name: t("apartmentsApartments"), href: "/admin/apartments", icon: Building },
    { name: t("bookingsBookings"), href: "/admin/bookings", icon: Calendar },
    { name: t("messagesMessages"), href: "/admin/messages", icon: MessageSquare },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
                {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <Link href="/admin" className="flex items-center space-x-2">
            <Settings className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">{t("adminPanel")}</span>
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile, visible on md+ */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80 flex items-center gap-1",
                    pathname === item.href ? "text-foreground" : "text-foreground/60",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right side - Language switcher, user nav, and mobile menu button */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">{t("backToSite")}</span>
          </Link>
          <LanguageSwitcher />
          <UserNav />
          
          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Admin Navigation Menu</SheetTitle>
              <div className="px-2 py-6">
                <div className="flex items-center px-4 py-2">
                  <Settings className="h-6 w-6 mr-2" />
                  <span className="font-bold">{t("adminPanel")}</span>
                </div>
                <nav className="mt-6 space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : "text-foreground/60 hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </nav>
                
                {/* Mobile Back to Site Link */}
                <div className="mt-8 pt-6 border-t">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span>{t("backToSite")}</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
