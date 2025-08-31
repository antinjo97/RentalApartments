"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages, Globe } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function LanguageSwitcher() {
  const { locale, setLocale, languageName, languageFlag } = useI18n()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-10 w-10 px-0 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
        >
          <Globe className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-2xl border-2 border-primary/20 shadow-2xl backdrop-blur-sm">
        <DropdownMenuItem 
          onClick={() => setLocale("hr")} 
          className={`p-4 text-base font-medium transition-all duration-300 ${
            locale === "hr" 
              ? "bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-l-4 border-l-primary" 
              : "hover:bg-primary/5 hover:text-primary"
          }`}
        >
          <span className="text-2xl mr-3">🇭🇷</span>
          <span className="font-semibold">Hrvatski</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLocale("en")} 
          className={`p-4 text-base font-medium transition-all duration-300 ${
            locale === "en" 
              ? "bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-l-4 border-l-primary" 
              : "hover:bg-primary/5 hover:text-primary"
          }`}
        >
          <span className="text-2xl mr-3">🇬🇧</span>
          <span className="font-semibold">English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
