"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback } from "react"

export function ApartmentFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

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
      city,
      minPrice,
      maxPrice,
      guests,
      bedrooms,
    })
    router.push(`/apartments?${queryString}`)
  }

  const handleReset = () => {
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
          <h2 className="text-lg font-semibold">Filtri / Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">Grad / City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue placeholder="Odaberite grad / Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Svi gradovi / All cities</SelectItem>
                <SelectItem value="Split">Split</SelectItem>
                <SelectItem value="Dubrovnik">Dubrovnik</SelectItem>
                <SelectItem value="Pula">Pula</SelectItem>
                <SelectItem value="Zadar">Zadar</SelectItem>
                <SelectItem value="Rovinj">Rovinj</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label htmlFor="minPrice">Min cijena / Min price (€)</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxPrice">Max cijena / Max price (€)</Label>
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
            <Label htmlFor="guests">Gosti / Guests</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger>
                <SelectValue placeholder="Broj gostiju / Number of guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Bilo koji broj / Any number</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Spavaće sobe / Bedrooms</Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Broj soba / Number of rooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Bilo koji broj / Any number</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="mr-2 h-4 w-4" />
            Pretraži / Search
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Resetiraj / Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
