"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/layout/header"
import { ApartmentFilters } from "@/components/apartments/apartment-filters"
import { ApartmentGrid } from "@/components/apartments/apartment-grid"
import { ApartmentMap } from "@/components/apartments/apartment-map"
import { Skeleton } from "@/components/ui/skeleton"
import type { Apartment } from "@/lib/types"

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)
  const supabase = createClient()
  const searchParams = useSearchParams()

  const handleApartmentSelect = (apartment: Apartment) => {
    setSelectedApartment(apartment)
  }

  useEffect(() => {
    async function fetchApartments() {
      try {
        setLoading(true)
        setError(null)
        
        let query = supabase.from("apartments").select("*").eq("is_available", true)
        
        // Apply filters based on search parameters
        const city = searchParams.get("city")
        const minPrice = searchParams.get("minPrice")
        const maxPrice = searchParams.get("maxPrice")
        const guests = searchParams.get("guests")
        const bedrooms = searchParams.get("bedrooms")
        
        if (city && city !== "all") {
          query = query.ilike("city", `%${city}%`)
        }
        
        if (minPrice && minPrice !== "0") {
          query = query.gte("price_per_night", Number.parseInt(minPrice))
        }
        
        if (maxPrice && maxPrice !== "500") {
          query = query.lte("price_per_night", Number.parseInt(maxPrice))
        }
        
        if (guests && guests !== "any") {
          query = query.gte("max_guests", Number.parseInt(guests))
        }
        
        if (bedrooms && bedrooms !== "any") {
          query = query.gte("bedrooms", Number.parseInt(bedrooms))
        }
        
        const { data, error: fetchError } = await query.order("created_at", { ascending: false })
        
        if (fetchError) {
          console.error("Error fetching apartments:", fetchError)
          setError(fetchError.message)
        } else {
          setApartments(data || [])
        }
      } catch (err) {
        console.error("Error fetching apartments:", err)
        setError("Failed to fetch apartments")
      } finally {
        setLoading(false)
      }
    }

    fetchApartments()
  }, [supabase, searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading apartments</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Apartmani u Hrvatskoj / Apartments in Croatia</h1>
          <p className="text-muted-foreground">
            Pronađite savršen apartman za vaš odmor / Find the perfect apartment for your vacation
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ApartmentFilters />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Pronađeno {apartments.length} apartmana / Found {apartments.length} apartments
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Apartment Grid */}
          <div className="space-y-6">
            <ApartmentGrid 
              apartments={apartments} 
              onApartmentSelect={handleApartmentSelect}
            />
          </div>

          {/* Map */}
          <div className="lg:sticky lg:top-24 h-[600px]">
            <ApartmentMap 
              apartments={apartments} 
              selectedApartment={selectedApartment}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
