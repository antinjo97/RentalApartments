"use client"

import { useEffect, useRef } from "react"
import type { Apartment } from "@/lib/types"
import type { google } from "google-maps"

interface ApartmentMapProps {
  apartments: Apartment[]
  selectedApartment: Apartment | null
}

export function ApartmentMap({ apartments, selectedApartment }: ApartmentMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current || !window.google) return

    // Initialize map
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 7,
      center: { lat: 44.5, lng: 16.0 }, // Center of Croatia
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#0891b2" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f9fafb" }],
        },
      ],
    })

    mapInstanceRef.current = map

    // Clear previous markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    // Add markers for apartments
    apartments.forEach((apartment) => {
      if (apartment.latitude && apartment.longitude) {
        const isSelected = selectedApartment?.id === apartment.id
        
        const marker = new window.google.maps.Marker({
          position: { lat: apartment.latitude, lng: apartment.longitude },
          map,
          title: apartment.title,
          icon: {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" fill="${isSelected ? '#dc2626' : '#0891b2'}" stroke="white" strokeWidth="2"/>
                <text x="16" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">€${apartment.price_per_night}</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32),
          },
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">${apartment.title}</h3>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${apartment.address}, ${apartment.city}</p>
              <p style="margin: 0 0 8px 0; font-size: 12px;"><strong>€${apartment.price_per_night}/noć</strong></p>
              <a href="/apartments/${apartment.id}" style="color: #0891b2; text-decoration: none; font-size: 12px;">Pogledaj detalje →</a>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })

        // Store marker reference
        markersRef.current.push(marker)
      }
    })

    // Adjust map bounds to fit all markers
    if (apartments.length > 0) {
      const bounds = new window.google.maps.LatLngBounds()
      apartments.forEach((apartment) => {
        if (apartment.latitude && apartment.longitude) {
          bounds.extend({ lat: apartment.latitude, lng: apartment.longitude })
        }
      })
      map.fitBounds(bounds)
    }

    // If there's a selected apartment, center the map on it
    if (selectedApartment && selectedApartment.latitude && selectedApartment.longitude) {
      map.setCenter({ lat: selectedApartment.latitude, lng: selectedApartment.longitude })
      map.setZoom(15) // Zoom in closer for selected apartment
    }
  }, [apartments, selectedApartment])

  // Effect to update markers when selectedApartment changes
  useEffect(() => {
    if (!mapInstanceRef.current || !apartments.length) return

    // Update marker colors based on selection
    markersRef.current.forEach((marker, index) => {
      const apartment = apartments[index]
      if (apartment && apartment.latitude && apartment.longitude) {
        const isSelected = selectedApartment?.id === apartment.id
        
        const newIcon = {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="${isSelected ? '#dc2626' : '#0891b2'}" stroke="white" strokeWidth="2"/>
              <text x="16" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">€${apartment.price_per_night}</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
        }
        
        marker.setIcon(newIcon)
      }
    })
  }, [selectedApartment, apartments])

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border">
      <div ref={mapRef} className="h-full w-full" />
      <script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      />
    </div>
  )
}
