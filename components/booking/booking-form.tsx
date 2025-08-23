"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowLeft, Users, CreditCard } from "lucide-react"
import { format, differenceInDays, addDays, isBefore } from "date-fns"
import { hr } from "date-fns/locale"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useI18n } from "@/lib/i18n/context"
import type { Apartment } from "@/lib/types"
import type { User } from "@supabase/supabase-js"

interface BookingFormProps {
  apartment: Apartment
  existingBookings: Array<{ check_in_date: string; check_out_date: string }>
  user: User
}

export function BookingForm({ apartment, existingBookings, user }: BookingFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const { t, locale } = useI18n()

  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState(user.email || "")
  const [guestPhone, setGuestPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculate unavailable dates
  const unavailableDates = existingBookings.flatMap((booking) => {
    const start = new Date(booking.check_in_date)
    const end = new Date(booking.check_out_date)
    const dates = []
    for (let date = new Date(start); date <= end; date = addDays(date, 1)) {
      dates.push(new Date(date))
    }
    return dates
  })

  // Calculate pricing
  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0
  const subtotal = nights * apartment.price_per_night
  const cleaningFee = 25
  const serviceFee = Math.round(subtotal * 0.1) // 10% service fee
  const total = subtotal + cleaningFee + serviceFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!checkInDate || !checkOutDate) {
      setError(t("selectDates"))
      setIsLoading(false)
      return
    }

    if (!guestName.trim()) {
      setError(t("enterName"))
      setIsLoading(false)
      return
    }

    try {
      const { data, error: bookingError } = await supabase.from("bookings").insert({
        apartment_id: apartment.id,
        user_id: user.id,
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone || null,
        check_in_date: format(checkInDate, "yyyy-MM-dd"),
        check_out_date: format(checkOutDate, "yyyy-MM-dd"),
        total_guests: Number.parseInt(guests),
        total_price: total,
        status: "pending",
        special_requests: specialRequests || null,
      })

      if (bookingError) throw bookingError

      router.push(`/booking/confirmation?booking=${data?.[0]?.id || "success"}`)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t("error"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/apartments/${apartment.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")} {t("to")} {t("apartment")}
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {t("booking")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("checkIn")}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "dd.MM.yyyy") : t("selectDate")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          disabled={(date) =>
                            isBefore(date, new Date()) ||
                            unavailableDates.some(
                              (unavailable) => format(unavailable, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
                            )
                          }
                          locale={hr}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("checkOut")}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, "dd.MM.yyyy") : t("selectDate")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          disabled={(date) =>
                            !checkInDate ||
                            isBefore(date, addDays(checkInDate, 1)) ||
                            unavailableDates.some(
                              (unavailable) => format(unavailable, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
                            )
                          }
                          locale={hr}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <Label htmlFor="guests">{t("numberOfGuests")}</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: apartment.max_guests }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {num} {num === 1 ? t("guest") : t("guests")}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Guest Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t("guestInfo")}</h3>

                  <div className="space-y-2">
                    <Label htmlFor="guestName">{t("fullName")} *</Label>
                    <Input
                      id="guestName"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder={t("fullName")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guestEmail">{t("email")} *</Label>
                    <Input
                      id="guestEmail"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="vaš@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guestPhone">{t("phone")}</Label>
                    <Input
                      id="guestPhone"
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+385 xx xxx xxxx"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">{t("specialRequests")}</Label>
                    <Textarea
                      id="specialRequests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder={t("specialRequestsPlaceholder")}
                      rows={3}
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading || !checkInDate || !checkOutDate}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {isLoading ? t("loading") : t("confirmBooking")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="space-y-6">
          {/* Apartment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{apartment.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {apartment.address}, {apartment.city}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>{t("pricePerNight")}</span>
                  <span>€{apartment.price_per_night}</span>
                </div>
                {checkInDate && checkOutDate && (
                  <>
                    <div className="flex justify-between">
                      <span>{t("dates")}</span>
                      <span>
                        {format(checkInDate, "dd.MM")} - {format(checkOutDate, "dd.MM")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("numberOfNights")}</span>
                      <span>{nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("numberOfGuests")}</span>
                      <span>{guests}</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          {checkInDate && checkOutDate && nights > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("priceBreakdown")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>
                      €{apartment.price_per_night} x {nights} {nights === 1 ? t("night") : t("nights")}
                    </span>
                    <span>€{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("cleaningFee")}</span>
                    <span>€{cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("serviceFee")}</span>
                    <span>€{serviceFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>{t("total")}</span>
                    <span>€{total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
