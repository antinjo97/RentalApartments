"use client"

import Link from "next/link"
import { UserNav } from "@/components/auth/user-nav"
import { Settings, Home, Building, Calendar, MessageSquare, BarChart3 } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function AdminHeader() {
  const pathname = usePathname()

  const navigation = [
    { name: "Pregled / Overview", href: "/admin", icon: BarChart3 },
    { name: "Apartmani / Apartments", href: "/admin/apartments", icon: Building },
    { name: "Rezervacije / Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Poruke / Messages", href: "/admin/messages", icon: MessageSquare },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/admin" className="mr-6 flex items-center space-x-2">
            <Settings className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Admin Panel</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
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
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Natrag na web / Back to site</span>
          </Link>
          <UserNav />
        </div>
      </div>
    </header>
  )
}
