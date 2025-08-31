"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback } from "react"
import { useI18n } from "@/lib/i18n/context"

export function ApartmentFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useI18n()

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [city, setCity] = useState(searchParams.get("city") || "all")
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "0")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "500")
  const [guests, setGuests] = useState(searchParams.get("guests") || "any")
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "any")

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value)
        } else {
          newSearchParams.delete(key)
        }
      })

      return newSearchParams.toString()
    },
    [searchParams],
  )

  const handleSearch = () => {
    const queryString = createQueryString({
      search: searchTerm,
      city,
      minPrice,
      maxPrice,
      guests,
      bedrooms,
    })
    router.push(`/apartments?${queryString}`)
  }

  const handleReset = () => {
    setSearchTerm("")
    setCity("all")
    setMinPrice("0")
    setMaxPrice("500")
    setGuests("any")
    setBedrooms("any")
    router.push("/apartments")
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t("filter")}</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Field - Left Side */}
          <div className="lg:w-1/3">
            <div className="space-y-2">
              <Label htmlFor="search">{t("search")}</Label>
              <Input
                id="search"
                type="text"
                placeholder="Pretraži po gradu, nazivu ili adresi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
              />
            </div>
          </div>

          {/* Filters - Right Side */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">{t("city")}</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectCity")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allCities")}</SelectItem>
                    <SelectItem value="Umag">Umag</SelectItem>
                    <SelectItem value="Novigrad">Novigrad</SelectItem>
                    <SelectItem value="Poreč">Poreč</SelectItem>
                    <SelectItem value="Rovinj">Rovinj</SelectItem>
                    <SelectItem value="Pula">Pula</SelectItem>
                    <SelectItem value="Rijeka">Rijeka</SelectItem>
                    <SelectItem value="Krk">Krk</SelectItem>
                    <SelectItem value="Cres">Cres</SelectItem>
                    <SelectItem value="Pag">Pag</SelectItem>
                    <SelectItem value="Zadar">Zadar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label htmlFor="minPrice">{t("minPrice")}</Label>
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPrice">{t("maxPrice")}</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests">{t("guests")}</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t("anyNumber")}</SelectItem>
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <Label htmlFor="bedrooms">{t("bedrooms")}</Label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t("anyNumber")}</SelectItem>
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="mr-2 h-4 w-4" />
            {t("search")}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            {t("reset")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
