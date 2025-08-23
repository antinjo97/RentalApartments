"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { UserNav } from "@/components/auth/user-nav"
import { LanguageSwitcher } from "@/components/i18n/language-switcher"
import { Home, MapPin, Calendar, Menu, X } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function Header() {
  const { t } = useI18n()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Apartmani Croatia</span>
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile, visible on md+ */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
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

        {/* Right side - Language switcher, user nav, and mobile menu button */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <UserNav />
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        ref={mobileMenuRef}
      >
        <nav className="container mx-auto px-4 py-4 space-y-3">
          <Link 
            href="/" 
            className="block py-2 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("home")}
          </Link>
          <Link 
            href="/apartments" 
            className="block py-2 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <MapPin className="mr-2 h-4 w-4 inline" />
            {t("apartments")}
          </Link>
          <Link 
            href="/bookings" 
            className="block py-2 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Calendar className="mr-2 h-4 w-4 inline" />
            {t("bookings")}
          </Link>
          <Link 
            href="/contact" 
            className="block py-2 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("contact")}
          </Link>
        </nav>
      </div>
    </header>
  )
}
