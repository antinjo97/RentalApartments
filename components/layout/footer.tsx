"use client"

import { useI18n } from "@/lib/i18n/context"
import { Home, MapPin, Heart } from "lucide-react"

export function Footer() {
  const { t } = useI18n()
  
  return (
    <footer className="bg-gradient-to-br from-background via-primary/10 to-secondary/10 border-t border-primary/20 mt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg">
                <Home className="h-6 w-6" />
              </div>
              <span className="ml-3 font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Rental Apartments
              </span>
            </div>
            <div className="text-center md:text-left">
              <p className="text-foreground/70 text-sm font-medium">
                Copyright © 2025 Rental Apartments
              </p>
            </div>
          </div>
          
          {/* Location and Credits - Right Side */}
          <div className="text-center md:text-right">
            <div className="text-sm font-medium flex items-center justify-center md:justify-end mb-4">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <span className="font-semibold text-foreground">Hrvatska</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-foreground/70 text-sm font-medium flex items-center justify-center md:justify-end">
                Made with <Heart className="h-4 w-4 text-primary mx-1" /> by A.Š.
              </p>
              <p className="text-foreground/60 text-xs mt-1">
                Last modified in August 2025
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative Element */}
        <div className="pt-4">
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
