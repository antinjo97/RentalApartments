"use client"

import Link from "next/link"
import { UserNav } from "@/components/auth/user-nav"
import { LanguageSwitcher } from "@/components/i18n/language-switcher"
import { Home, MapPin, Calendar } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function Header() {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Apartmani Croatia</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t("home")}
            </Link>
            <Link href="/apartments" className="transition-colors hover:text-foreground/80 text-foreground/60">
              <MapPin className="mr-1 h-4 w-4 inline" />
              {t("apartments")}
            </Link>
            <Link href="/bookings" className="transition-colors hover:text-foreground/80 text-foreground/60">
              <Calendar className="mr-1 h-4 w-4 inline" />
              {t("bookings")}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t("contact")}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  )
}
