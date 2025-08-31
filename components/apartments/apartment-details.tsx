"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, Bed, Bath, Wifi, Car, Waves, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type { Apartment } from "@/lib/types"

interface ApartmentDetailsProps {
  apartment: Apartment
}

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-5 w-5" />,
  parking: <Car className="h-5 w-5" />,
  sea_view: <Waves className="h-5 w-5" />,
  air_conditioning: <span className="text-sm">❄️</span>,
  kitchen: <span className="text-sm">🍳</span>,
  balcony: <span className="text-sm">🏠</span>,
  pool: <span className="text-sm">🏊</span>,
  garden: <span className="text-sm">🌿</span>,
  washing_machine: <span className="text-sm">👕</span>,
  terrace: <span className="text-sm">🏡</span>,
  beach_access: <span className="text-sm">🏖️</span>,
  historic_building: <span className="text-sm">🏛️</span>,
}

const amenityLabels: Record<string, string> = {
  wifi: "WiFi",
  parking: "Parking",
  sea_view: "Pogled na more / Sea view",
  air_conditioning: "Klima uređaj / Air conditioning",
  kitchen: "Kuhinja / Kitchen",
  balcony: "Balkon / Balcony",
  pool: "Bazen / Pool",
  garden: "Vrt / Garden",
  washing_machine: "Perilica / Washing machine",
  terrace: "Terasa / Terrace",
  beach_access: "Pristup plaži / Beach access",
  historic_building: "Povijesna zgrada / Historic building",
}

export function ApartmentDetails({ apartment }: ApartmentDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const images = apartment.images || ["/placeholder.svg?height=600&width=800"]

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Back Button */}
      <div className="mb-4 sm:mb-6">
        <Button variant="ghost" asChild className="text-sm sm:text-base">
          <Link href="/apartments">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Natrag na apartmane / Back to apartments
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8 order-2 lg:order-1">
          {/* Image Gallery */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={apartment.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden flex-shrink-0 ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${apartment.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Apartment Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{apartment.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span className="text-sm sm:text-base">
                  {apartment.address}, {apartment.city}, {apartment.country}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>{apartment.max_guests} gostiju / guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-primary" />
                <span>{apartment.bedrooms} spavaće sobe / bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-primary" />
                <span>{apartment.bathrooms} kupaone / bathrooms</span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            {apartment.description && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-3">Opis / Description</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{apartment.description}</p>
              </div>
            )}

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Sadržaji / Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {apartment.amenities?.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/50">
                    {amenityIcons[amenity]}
                    <span className="text-xs sm:text-sm">{amenityLabels[amenity] || amenity.replace(/_/g, " ")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="lg:sticky lg:top-24">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-xl sm:text-2xl font-bold">€{apartment.price_per_night}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">po noći / per night</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button size="lg" className="w-full text-sm sm:text-base" asChild>
                  <Link href={`/apartments/${apartment.id}/book`}>Rezerviraj sada / Book Now</Link>
                </Button>

                <div className="text-center text-xs sm:text-sm text-muted-foreground">
                  Nećete biti naplaćeni odmah
                  <br />
                  You won't be charged yet
                </div>

                <Separator />

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="text-center text-muted-foreground">
                    Odaberite datume za detaljnu kalkulaciju
                    <br />
                    Select dates for detailed calculation
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
