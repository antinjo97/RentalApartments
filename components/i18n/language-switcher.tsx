"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function LanguageSwitcher() {
  const { locale, setLocale, languageName, languageFlag } = useI18n()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setLocale("hr")} 
          className={locale === "hr" ? "bg-accent" : ""}
        >
          🇭🇷 Hrvatski
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLocale("en")} 
          className={locale === "en" ? "bg-accent" : ""}
        >
          🇬🇧 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
