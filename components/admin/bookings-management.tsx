"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Phone, Mail, Search, Check, X, Eye } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import Image from "next/image"
import type { Booking } from "@/lib/types"

interface BookingsManagementProps {
  bookings: (Booking & { apartment: any; user: any })[]
}

const statusLabels = {
  pending: { label: "Na čekanju / Pending", variant: "secondary" as const, color: "bg-orange-100 text-orange-800" },
  confirmed: { label: "Potvrđeno / Confirmed", variant: "default" as const, color: "bg-green-100 text-green-800" },
  cancelled: { label: "Otkazano / Cancelled", variant: "destructive" as const, color: "bg-red-100 text-red-800" },
  completed: { label: "Završeno / Completed", variant: "outline" as const, color: "bg-gray-100 text-gray-800" },
}

export function BookingsManagement({ bookings }: BookingsManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "confirmed" | "cancelled" | "completed">("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guest_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.apartment?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.apartment?.city.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upravljanje rezervacijama / Bookings Management</h1>
        <p className="text-muted-foreground">Pregled i upravljanje svim rezervacijama / View and manage all bookings</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pretraži rezervacije... / Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(statusCounts).map(([status, count]) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status as any)}
                >
                  {status === "all"
                    ? `Sve / All`
                    : status === "pending"
                      ? "Na čekanju"
                      : status === "confirmed"
                        ? "Potvrđeno"
                        : status === "cancelled"
                          ? "Otkazano"
                          : "Završeno"}{" "}
                  ({count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                Nema rezervacija koje odgovaraju filterima / No bookings match the filters
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => {
            const apartment = booking.apartment
            const status = statusLabels[booking.status]
            const nights = Math.ceil(
              (new Date(booking.check_out_date).getTime() - new Date(booking.check_in_date).getTime()) /
                (1000 * 60 * 60 * 24),
            )

            return (
              <Card key={booking.id}>
                <div className="md:flex">
                  {/* Apartment Image */}
                  <div className="md:w-1/5 relative h-32 md:h-auto">
                    <Image
                      src={apartment?.images?.[0] || "/placeholder.svg?height=150&width=200"}
                      alt={apartment?.title || "Apartment"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 20vw"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="md:w-4/5">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{apartment?.title}</CardTitle>
                          <div className="flex items-center text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">
                              {apartment?.address}, {apartment?.city}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={status.color}>{status.label}</Badge>
                          <Badge variant="outline">€{booking.total_price}</Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Booking Info */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Detalji rezervacije</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>
                                {format(new Date(booking.check_in_date), "dd.MM.yyyy")} -{" "}
                                {format(new Date(booking.check_out_date), "dd.MM.yyyy")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span>
                                {booking.total_guests} gostiju, {nights} noći
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Rezervirano: {format(new Date(booking.created_at), "dd.MM.yyyy HH:mm")}
                            </div>
                          </div>
                        </div>

                        {/* Guest Info */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Podaci o gostu</h4>
                          <div className="space-y-2 text-sm">
                            <p className="font-medium">{booking.guest_name}</p>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              <span>{booking.guest_email}</span>
                            </div>
                            {booking.guest_phone && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                <span>{booking.guest_phone}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Akcije</h4>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Detalji
                            </Button>
                            {booking.status === "pending" && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <Check className="mr-2 h-4 w-4" />
                                  Potvrdi
                                </Button>
                                <Button variant="destructive" size="sm">
                                  <X className="mr-2 h-4 w-4" />
                                  Otkaži
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Special Requests */}
                      {booking.special_requests && (
                        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm">
                            <span className="font-medium">Posebni zahtjevi:</span> {booking.special_requests}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
