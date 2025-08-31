"use client"

import { BookingsList } from "@/components/booking/bookings-list"
import { useI18n } from "@/lib/i18n/context"
import type { Booking } from "@/lib/types"

interface BookingsPageClientProps {
  bookings: (Booking & { apartment: any })[]
}

export function BookingsPageClient({ bookings }: BookingsPageClientProps) {
  const { t } = useI18n()

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t("myBookings")}</h1>
        <p className="text-muted-foreground">{t("bookingsOverview")}</p>
      </div>

      <BookingsList bookings={bookings} />
    </>
  )
}
