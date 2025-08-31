import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Bed, Bath, Wifi, Car, Waves, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Apartment } from "@/lib/types"

interface ApartmentCardProps {
  apartment: Apartment
  onSelect: () => void
}

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-4 w-4" />,
  parking: <Car className="h-4 w-4" />,
  sea_view: <Waves className="h-4 w-4" />,
  air_conditioning: <span className="text-xs">❄️</span>,
  kitchen: <span className="text-xs">🍳</span>,
  balcony: <span className="text-xs">🏠</span>,
  pool: <span className="text-xs">🏊</span>,
  garden: <span className="text-xs">🌿</span>,
  washing_machine: <span className="text-xs">👕</span>,
  terrace: <span className="text-xs">🏡</span>,
  beach_access: <span className="text-xs">🏖️</span>,
  historic_building: <span className="text-xs">🏛️</span>,
}

export function ApartmentCard({ apartment, onSelect }: ApartmentCardProps) {
  const mainImage = apartment.images?.[0] || "/placeholder.svg?height=300&width=400"

  return (
    <Card 
      className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-2 border-primary/20"
      onClick={onSelect}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="w-full md:w-1/3 relative h-64 md:h-auto overflow-hidden">
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={apartment.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-to-r from-primary to-primary/90 text-white border-0 shadow-lg px-3 py-1.5 text-sm font-semibold">
              €{apartment.price_per_night}/noć
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="w-full md:w-2/3 p-4 md:p-8">
          <div className="space-y-6">
            {/* Title and Location */}
            <div>
              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {apartment.title}
              </h3>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="text-base font-medium">
                  {apartment.address}, {apartment.city}
                </span>
              </div>
            </div>

            {/* Description */}
            {apartment.description && (
              <p className="text-muted-foreground text-base leading-relaxed line-clamp-2">
                {apartment.description}
              </p>
            )}

            {/* Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                </div>
                <span className="font-medium">{apartment.max_guests} gostiju</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Bed className="h-4 w-4" />
                </div>
                <span className="font-medium">{apartment.bedrooms} soba</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Bath className="h-4 w-4" />
                </div>
                <span className="font-medium">{apartment.bathrooms} kupaona</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2">
              {apartment.amenities?.slice(0, 6).map((amenity) => (
                <Badge key={amenity} variant="outline" className="text-xs border-primary/30 hover:bg-primary/10 hover:border-primary/60 transition-colors duration-300">
                  <span className="mr-1">{amenityIcons[amenity]}</span>
                  {amenity.replace(/_/g, " ")}
                </Badge>
              ))}
              {apartment.amenities && apartment.amenities.length > 6 && (
                <Badge variant="outline" className="text-xs border-primary/30 hover:bg-primary/10 hover:border-primary/60 transition-colors duration-300">
                  +{apartment.amenities.length - 6} više
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="w-full sm:flex-1 shadow-lg hover:shadow-xl">
                <Link href={`/apartments/${apartment.id}`}>Pogledaj detalje / View Details</Link>
              </Button>
              <Button variant="outline" asChild className="w-full sm:flex-1 shadow-md hover:shadow-lg">
                <Link href={`/apartments/${apartment.id}/book`}>Rezerviraj / Book</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
