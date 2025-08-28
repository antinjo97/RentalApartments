"use client"

import { useI18n } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useI18n()
  
  return (
    <footer className="bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left Side - Copyright and Location */}
          <div className="text-center md:text-left">
            <p className="text-slate-700 text-sm font-medium">
              Copyright © 2015 Rental Apartments | Poreč, Istra, Hrvatska
            </p>
            <p className="text-slate-600 text-xs mt-1">
              {t("welcomeToCroatia")}
            </p>
          </div>
          
          {/* Right Side - Credits */}
          <div className="text-center md:text-right">
            <p className="text-slate-700 text-sm font-medium">
              made by A.Š. | Last modified on 2025
            </p>
          </div>
        </div>
        
        {/* Decorative Element */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-slate-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
