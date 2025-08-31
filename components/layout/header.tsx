"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { UserNav } from "@/components/auth/user-nav"
import { LanguageSwitcher } from "@/components/i18n/language-switcher"
import { Home, MapPin, Calendar, Menu, X, Star } from "lucide-react"
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
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Home className="h-6 w-6" />
            </div>
            <span className="hidden font-bold text-xl text-foreground sm:inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Rental Apartments
            </span>
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile, visible on md+ */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link 
              href="/" 
              className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-primary hover:bg-primary/10 group"
            >
              <span className="relative z-10">{t("home")}</span>
              <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/apartments" 
              className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-primary hover:bg-primary/10 group flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              <span className="relative z-10">{t("apartments")}</span>
              <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/recommendations" 
              className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-primary hover:bg-primary/10 group flex items-center gap-2"
            >
              <Star className="h-4 w-4" />
              <span className="relative z-10">{t("recommendations")}</span>
              <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/bookings" 
              className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-primary hover:bg-primary/10 group flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              <span className="relative z-10">{t("bookings")}</span>
              <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/contact" 
              className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-primary hover:bg-primary/10 group"
            >
              <span className="relative z-10">{t("contact")}</span>
              <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </nav>
        </div>

        {/* Right side - Language switcher, user nav, and mobile menu button */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <UserNav />
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-primary" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden border-t border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        ref={mobileMenuRef}
      >
        <nav className="container mx-auto px-4 py-6 space-y-2">
          <Link 
            href="/" 
            className="block py-3 px-4 text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/10 rounded-lg text-foreground/70 hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("home")}
          </Link>
          <Link 
            href="/apartments" 
            className="block py-3 px-4 text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/10 rounded-lg text-foreground/70 hover:text-foreground flex items-center gap-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <MapPin className="h-4 w-4" />
            {t("apartments")}
          </Link>
          <Link 
            href="/recommendations" 
            className="block py-3 px-4 text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/10 rounded-lg text-foreground/70 hover:text-foreground flex items-center gap-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Star className="h-4 w-4" />
            {t("recommendations")}
          </Link>
          <Link 
            href="/bookings" 
            className="block py-3 px-4 text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/10 rounded-lg text-foreground/70 hover:text-foreground flex items-center gap-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Calendar className="h-4 w-4" />
            {t("bookings")}
          </Link>
          <Link 
            href="/contact" 
            className="block py-3 px-4 text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/10 rounded-lg text-foreground/70 hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("contact")}
          </Link>
        </nav>
      </div>
    </header>
  )
}
