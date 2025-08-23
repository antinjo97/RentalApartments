import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Bed, Bath, Wifi, Car, Waves } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Apartment } from "@/lib/types"

interface ApartmentCardProps {
  apartment: Apartment
}

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-4 w-4" />,
  parking: <Car className="h-4 w-4" />,
  sea_view: <Waves className="h-4 w-4" />,
  air_conditioning: <span className="text-xs">AC</span>,
  kitchen: <span className="text-xs">🍳</span>,
  balcony: <span className="text-xs">🏠</span>,
  pool: <span className="text-xs">🏊</span>,
  garden: <span className="text-xs">🌿</span>,
  washing_machine: <span className="text-xs">👕</span>,
  terrace: <span className="text-xs">🏡</span>,
  beach_access: <span className="text-xs">🏖️</span>,
  historic_building: <span className="text-xs">🏛️</span>,
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const mainImage = apartment.images?.[0] || "/placeholder.svg?height=300&width=400"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="md:flex">
        {/* Image */}
        <div className="md:w-1/3 relative h-64 md:h-auto">
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={apartment.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              €{apartment.price_per_night}/noć
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="md:w-2/3 p-6">
          <div className="space-y-4">
            {/* Title and Location */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{apartment.title}</h3>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {apartment.address}, {apartment.city}
                </span>
              </div>
            </div>

            {/* Description */}
            {apartment.description && (
              <p className="text-muted-foreground text-sm line-clamp-2">{apartment.description}</p>
            )}

            {/* Details */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{apartment.max_guests} gostiju</span>
              </div>
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{apartment.bedrooms} soba</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{apartment.bathrooms} kupaona</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2">
              {apartment.amenities?.slice(0, 6).map((amenity) => (
                <Badge key={amenity} variant="outline" className="text-xs">
                  <span className="mr-1">{amenityIcons[amenity]}</span>
                  {amenity.replace(/_/g, " ")}
                </Badge>
              ))}
              {apartment.amenities && apartment.amenities.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{apartment.amenities.length - 6} više
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button asChild className="flex-1">
                <Link href={`/apartments/${apartment.id}`}>Pogledaj detalje / View Details</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/apartments/${apartment.id}/book`}>Rezerviraj / Book</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
