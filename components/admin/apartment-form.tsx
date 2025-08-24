"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useI18n } from "@/lib/i18n/context"
import type { Apartment } from "@/lib/types"

interface ApartmentFormProps {
  apartment?: Apartment
  onClose: () => void
  onSuccess: () => void
}

const AMENITIES_OPTIONS = [
  "wifi",
  "parking",
  "pool",
  "gym",
  "balcony",
  "terrace",
  "sea_view",
  "air_conditioning",
  "heating",
  "kitchen",
  "washing_machine",
  "dishwasher",
  "tv",
  "netflix",
  "beach_access",
  "garden",
  "bbq",
  "pets_allowed",
]

const CITIES = ["Split", "Dubrovnik", "Pula", "Zadar", "Rovinj", "Hvar", "Korčula", "Trogir"]

export function ApartmentForm({ apartment, onClose, onSuccess }: ApartmentFormProps) {
  const { t } = useI18n()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: apartment?.title || "",
    description: apartment?.description || "",
    city: apartment?.city || "",
    address: apartment?.address || "",
    price_per_night: apartment?.price_per_night || 0,
    max_guests: apartment?.max_guests || 1,
    bedrooms: apartment?.bedrooms || 1,
    bathrooms: apartment?.bathrooms || 1,
    latitude: apartment?.latitude || 0,
    longitude: apartment?.longitude || 0,
    is_available: apartment?.is_available ?? true,
    amenities: apartment?.amenities || [],
    images: apartment?.images || [],
  })

  const [newAmenity, setNewAmenity] = useState("")
  const [imageUrls, setImageUrls] = useState<string[]>(apartment?.images || [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const apartmentData = {
        ...formData,
        images: imageUrls,
        updated_at: new Date().toISOString(),
      }

      if (apartment?.id) {
        // Update existing apartment
        const { error } = await supabase.from("apartments").update(apartmentData).eq("id", apartment.id)

        if (error) throw error
      } else {
        // Create new apartment
        const { error } = await supabase.from("apartments").insert([apartmentData])

        if (error) throw error
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving apartment:", error)
      alert(t("errorSavingApartment"))
    } finally {
      setLoading(false)
    }
  }

  const addAmenity = (amenity: string) => {
    if (!formData.amenities.includes(amenity)) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
      }))
    }
  }

  const removeAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }))
  }

  const addImageUrl = () => {
    const url = prompt(t("enterImageUrl"))
    if (url && !imageUrls.includes(url)) {
      setImageUrls((prev) => [...prev, url])
    }
  }

  const removeImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {apartment ? t("editApartment") : t("addApartment")}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">{t("apartmentTitle")} *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="city">{t("apartmentCity")} *</Label>
                <select
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  required
                >
                  <option value="">{t("selectCity")}</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">{t("apartmentAddress")} *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">{t("apartmentDescription")}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>

            {/* Pricing and Capacity */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="price">{t("apartmentPrice")} (€) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price_per_night}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price_per_night: Number(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="guests">{t("apartmentGuests")} *</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  value={formData.max_guests}
                  onChange={(e) => setFormData((prev) => ({ ...prev, max_guests: Number(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="bedrooms">{t("apartmentBedrooms")} *</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: Number(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="bathrooms">Kupaonice / Bathrooms *</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bathrooms: Number(e.target.value) }))}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude *</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData((prev) => ({ ...prev, latitude: Number(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="longitude">Longitude *</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData((prev) => ({ ...prev, longitude: Number(e.target.value) }))}
                  required
                />
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center space-x-2">
              <Switch
                id="available"
                checked={formData.is_available}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_available: checked }))}
              />
              <Label htmlFor="available">{t("apartmentAvailable")}</Label>
            </div>

            {/* Amenities */}
            <div>
              <Label>Sadržaji / Amenities</Label>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {AMENITIES_OPTIONS.map((amenity) => (
                    <Button
                      key={amenity}
                      type="button"
                      variant={formData.amenities.includes(amenity) ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        formData.amenities.includes(amenity) ? removeAmenity(amenity) : addAmenity(amenity)
                      }
                    >
                      {amenity.replace(/_/g, " ")}
                    </Button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {formData.amenities.map((amenity) => (
                    <Badge
                      key={amenity}
                      variant="default"
                      className="cursor-pointer"
                      onClick={() => removeAmenity(amenity)}
                    >
                      {amenity.replace(/_/g, " ")} <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <Label>{t("apartmentImage")}</Label>
              <div className="space-y-4">
                <Button type="button" variant="outline" onClick={addImageUrl}>
                  <Plus className="mr-2 h-4 w-4" />
                  Dodaj sliku / Add Image
                </Button>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Image ${index + 1}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? t("loading") : apartment ? t("edit") : t("save")}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                {t("cancel")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
