import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { ApartmentFilters } from "@/components/apartments/apartment-filters"
import { ApartmentGrid } from "@/components/apartments/apartment-grid"
import { ApartmentMap } from "@/components/apartments/apartment-map"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import type { Apartment } from "@/lib/types"

interface SearchParams {
  city?: string
  minPrice?: string
  maxPrice?: string
  guests?: string
  bedrooms?: string
}

export default async function ApartmentsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const supabase = await createClient()

  // Build query based on search parameters
  let query = supabase.from("apartments").select("*").eq("is_available", true)

  if (searchParams.city) {
    query = query.ilike("city", `%${searchParams.city}%`)
  }
  if (searchParams.minPrice) {
    query = query.gte("price_per_night", Number.parseInt(searchParams.minPrice))
  }
  if (searchParams.maxPrice) {
    query = query.lte("price_per_night", Number.parseInt(searchParams.maxPrice))
  }
  if (searchParams.guests) {
    query = query.gte("max_guests", Number.parseInt(searchParams.guests))
  }
  if (searchParams.bedrooms) {
    query = query.gte("bedrooms", Number.parseInt(searchParams.bedrooms))
  }

  const { data: apartments, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching apartments:", error)
  }

  const apartmentList: Apartment[] = apartments || []

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
            Pronađeno {apartmentList.length} apartmana / Found {apartmentList.length} apartments
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Apartment Grid */}
          <div className="space-y-6">
            <Suspense
              fallback={
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                  ))}
                </div>
              }
            >
              <ApartmentGrid apartments={apartmentList} />
            </Suspense>
          </div>

          {/* Map */}
          <div className="lg:sticky lg:top-24 h-[600px]">
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <ApartmentMap apartments={apartmentList} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
