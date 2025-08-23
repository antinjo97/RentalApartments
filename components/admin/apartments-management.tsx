"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Users, Bed, Bath, Plus, Edit, Trash2, Search } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { ApartmentForm } from "./apartment-form"
import type { Apartment } from "@/lib/types"

interface ApartmentsManagementProps {
  apartments: Apartment[]
}

export function ApartmentsManagement({ apartments }: ApartmentsManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "unavailable">("all")
  const [showForm, setShowForm] = useState(false)
  const [editingApartment, setEditingApartment] = useState<Apartment | undefined>()
  const [apartmentsList, setApartmentsList] = useState(apartments)

  const handleAddApartment = () => {
    setEditingApartment(undefined)
    setShowForm(true)
  }

  const handleEditApartment = (apartment: Apartment) => {
    setEditingApartment(apartment)
    setShowForm(true)
  }

  const handleDeleteApartment = async (apartmentId: string) => {
    if (
      !confirm("Jeste li sigurni da želite ukloniti ovaj apartman? / Are you sure you want to remove this apartment?")
    ) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from("apartments").delete().eq("id", apartmentId)

      if (error) throw error

      setApartmentsList((prev) => prev.filter((apt) => apt.id !== apartmentId))
      alert("Apartman je uspješno uklonjen / Apartment removed successfully")
    } catch (error) {
      console.error("Error deleting apartment:", error)
      alert("Greška pri uklanjanju apartmana / Error removing apartment")
    }
  }

  const handleToggleAvailability = async (apartment: Apartment) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("apartments")
        .update({ is_available: !apartment.is_available })
        .eq("id", apartment.id)

      if (error) throw error

      setApartmentsList((prev) =>
        prev.map((apt) => (apt.id === apartment.id ? { ...apt, is_available: !apt.is_available } : apt)),
      )
    } catch (error) {
      console.error("Error updating apartment:", error)
      alert("Greška pri ažuriranju apartmana / Error updating apartment")
    }
  }

  const handleFormSuccess = () => {
    window.location.reload()
  }

  const filteredApartments = apartmentsList.filter((apartment) => {
    const matchesSearch =
      apartment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apartment.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apartment.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "available" && apartment.is_available) ||
      (statusFilter === "unavailable" && !apartment.is_available)

    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upravljanje apartmanima / Apartments Management</h1>
          <p className="text-muted-foreground">
            Dodaj, uredi i upravljaj apartmanima / Add, edit and manage apartments
          </p>
        </div>
        <Button onClick={handleAddApartment}>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj apartman / Add Apartment
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pretraži apartmane... / Search apartments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                Svi / All ({apartmentsList.length})
              </Button>
              <Button
                variant={statusFilter === "available" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("available")}
              >
                Dostupni / Available ({apartmentsList.filter((a) => a.is_available).length})
              </Button>
              <Button
                variant={statusFilter === "unavailable" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("unavailable")}
              >
                Nedostupni / Unavailable ({apartmentsList.filter((a) => !a.is_available).length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Apartments List */}
      <div className="space-y-4">
        {filteredApartments.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                Nema apartmana koji odgovaraju filterima / No apartments match the filters
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredApartments.map((apartment) => (
            <Card key={apartment.id}>
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-1/4 relative h-48 md:h-auto">
                  <Image
                    src={apartment.images?.[0] || "/placeholder.svg?height=200&width=300"}
                    alt={apartment.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>

                {/* Content */}
                <div className="md:w-3/4">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{apartment.title}</CardTitle>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {apartment.address}, {apartment.city}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={apartment.is_available ? "default" : "secondary"}>
                          {apartment.is_available ? "Dostupan / Available" : "Nedostupan / Unavailable"}
                        </Badge>
                        <Badge variant="outline">€{apartment.price_per_night}/noć</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
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
                      <div className="flex flex-wrap gap-1">
                        {apartment.amenities?.slice(0, 5).map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity.replace(/_/g, " ")}
                          </Badge>
                        ))}
                        {apartment.amenities && apartment.amenities.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{apartment.amenities.length - 5} više
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditApartment(apartment)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Uredi / Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteApartment(apartment.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Ukloni / Remove
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleToggleAvailability(apartment)}>
                          {apartment.is_available ? "Označi nedostupnim" : "Označi dostupnim"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Apartment Form Modal */}
      {showForm && (
        <ApartmentForm apartment={editingApartment} onClose={() => setShowForm(false)} onSuccess={handleFormSuccess} />
      )}
    </div>
  )
}
