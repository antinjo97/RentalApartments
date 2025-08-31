"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Phone, Mail } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import type { Booking } from "@/lib/types"
import { useI18n } from "@/lib/i18n/context"

interface BookingsListProps {
  bookings: (Booking & { apartment: any })[]
}

const statusLabels = {
  pending: { label: "pending", variant: "secondary" as const },
  confirmed: { label: "confirmed", variant: "default" as const },
  cancelled: { label: "cancelled", variant: "destructive" as const },
  completed: { label: "completed", variant: "outline" as const },
}

export function BookingsList({ bookings }: BookingsListProps) {
  const { t } = useI18n()

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">{t("noBookingsYet")}</p>
        <Button asChild>
          <Link href="/apartments">{t("browseApartments")}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => {
        const apartment = booking.apartment
        const status = statusLabels[booking.status]
        const nights = Math.ceil(
          (new Date(booking.check_out_date).getTime() - new Date(booking.check_in_date).getTime()) /
            (1000 * 60 * 60 * 24),
        )

        return (
          <Card key={booking.id} className="overflow-hidden">
            <div className="md:flex">
              {/* Apartment Image */}
              <div className="md:w-1/4 relative h-48 md:h-auto">
                <Image
                  src={apartment?.images?.[0] || "/placeholder.svg?height=200&width=300"}
                  alt={apartment?.title || "Apartment"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              {/* Booking Details */}
              <div className="md:w-3/4">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{apartment?.title}</CardTitle>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {apartment?.address}, {apartment?.city}
                        </span>
                      </div>
                    </div>
                    <Badge variant={status.variant}>{t(status.label)}</Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Booking Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          {format(new Date(booking.check_in_date), "dd.MM.yyyy")} -{" "}
                          {format(new Date(booking.check_out_date), "dd.MM.yyyy")}
                        </span>
                        <span className="text-muted-foreground">({nights} {t("nights")})</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{booking.total_guests} {t("guests")}</span>
                      </div>

                      <div className="text-sm">
                        <span className="font-medium">{t("totalPrice")}: €{booking.total_price}</span>
                      </div>
                    </div>

                    {/* Guest Info */}
                    <div className="space-y-3">
                      <div className="text-sm">
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

                      <div className="text-xs text-muted-foreground">
                        {t("booked")}: {format(new Date(booking.created_at), "dd.MM.yyyy HH:mm")}
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {booking.special_requests && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium">{t("specialRequests")}: </span>
                        {booking.special_requests}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/apartments/${apartment?.id}`}>{t("viewApartment")}</Link>
                    </Button>
                    {booking.status === "pending" && (
                      <Button variant="outline" size="sm">
                        {t("cancel")}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
