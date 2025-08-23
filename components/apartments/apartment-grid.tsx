import { ApartmentCard } from "./apartment-card"
import type { Apartment } from "@/lib/types"

interface ApartmentGridProps {
  apartments: Apartment[]
}

export function ApartmentGrid({ apartments }: ApartmentGridProps) {
  if (apartments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          Nema dostupnih apartmana za odabrane filtere.
          <br />
          No apartments available for the selected filters.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {apartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  )
}
