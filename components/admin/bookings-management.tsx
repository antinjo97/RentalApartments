"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Phone, Mail, Search, Check, X, Eye } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import type { Booking } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useI18n } from "@/lib/i18n/context"

interface BookingsManagementProps {
  bookings: (Booking & { apartment: any; user: any })[]
}

export function BookingsManagement({ bookings }: BookingsManagementProps) {
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "confirmed" | "cancelled" | "completed">("all")
  const [loadingBookings, setLoadingBookings] = useState<Set<string>>(new Set())
  const [selectedBooking, setSelectedBooking] = useState<Booking & { apartment: any; user: any } | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const supabase = createClient()

  const statusLabels = useMemo(() => ({
    pending: { label: t("pending"), variant: "secondary" as const, color: "bg-orange-100 text-orange-800" },
    confirmed: { label: t("confirmed"), variant: "default" as const, color: "bg-green-100 text-green-800" },
    cancelled: { label: t("cancelled"), variant: "destructive" as const, color: "bg-red-100 text-red-800" },
    completed: { label: t("completed"), variant: "outline" as const, color: "bg-gray-100 text-gray-800" },
  }), [t])

  const confirmBooking = async (bookingId: string) => {
    setLoadingBookings(prev => new Set(prev).add(bookingId))
    
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "confirmed" })
        .eq("id", bookingId)

      if (error) throw error

      toast.success(t("bookingConfirmed"))
      
      // Refresh the page to show updated status
      window.location.reload()
    } catch (error) {
      console.error("Error confirming booking:", error)
      toast.error(t("errorConfirming"))
    } finally {
      setLoadingBookings(prev => {
        const newSet = new Set(prev)
        newSet.delete(bookingId)
        return newSet
      })
    }
  }

  const cancelBooking = async (bookingId: string) => {
    setLoadingBookings(prev => new Set(prev).add(bookingId))
    
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingId)

      if (error) throw error

      toast.success(t("bookingCancelled"))
      
      // Refresh the page to show updated status
      window.location.reload()
    } catch (error) {
      console.error("Error cancelling booking:", error)
      toast.error(t("errorCancelling"))
    } finally {
      setLoadingBookings(prev => {
        const newSet = new Set(prev)
        newSet.delete(bookingId)
        return newSet
      })
    }
  }

  const showBookingDetails = (booking: Booking & { apartment: any; user: any }) => {
    setSelectedBooking(booking)
  }

  const handleImageError = (apartmentId: string) => {
    setImageErrors(prev => new Set(prev).add(apartmentId))
  }

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
        <h1 className="text-3xl font-bold mb-2">{t("bookingsManagementTitle")}</h1>
        <p className="text-muted-foreground">{t("bookingsManagementSubtitle")}</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchBookings")}
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
                    ? t("allBookings")
                    : status === "pending"
                      ? t("pendingBookings")
                      : status === "confirmed"
                        ? t("confirmedBookings")
                        : status === "cancelled"
                          ? t("cancelledBookings")
                          : t("completedBookings")}{" "}
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
                {t("noBookingsMatch")}
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
                      src={
                        imageErrors.has(apartment?.id) || !apartment?.images?.[0] 
                          ? "/placeholder.jpg" 
                          : apartment.images[0]
                      }
                      alt={apartment?.title || "Apartment"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 20vw"
                      onError={() => handleImageError(apartment?.id)}
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
                          <h4 className="font-medium text-sm">{t("bookingInfo")}</h4>
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
                                {booking.total_guests} {t("guests")}, {nights} {t("nights")}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {t("bookingDate")}: {format(new Date(booking.created_at), "dd.MM.yyyy HH:mm")}
                            </div>
                          </div>
                        </div>

                        {/* Guest Info */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">{t("guestDetails")}</h4>
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
                          <h4 className="font-medium text-sm">{t("actions")}</h4>
                          <div className="flex flex-col gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => showBookingDetails(booking)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              {t("details")}
                            </Button>
                            {booking.status === "pending" && (
                              <>
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => confirmBooking(booking.id)}
                                  disabled={loadingBookings.has(booking.id)}
                                >
                                  <Check className="mr-2 h-4 w-4" />
                                  {loadingBookings.has(booking.id) ? t("confirming") : t("confirm")}
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => cancelBooking(booking.id)}
                                  disabled={loadingBookings.has(booking.id)}
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  {loadingBookings.has(booking.id) ? t("cancelling") : t("cancel")}
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
                            <span className="font-medium">{t("specialRequests")}:</span> {booking.special_requests}
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

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBooking(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t("bookingDetails")}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedBooking(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Apartment Info */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold mb-3">{t("apartmentInfo")}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">{t("apartmentTitle")}:</span>
                      <p>{selectedBooking.apartment?.title}</p>
                    </div>
                    <div>
                      <span className="font-medium">{t("location")}:</span>
                      <p>{selectedBooking.apartment?.address}, {selectedBooking.apartment?.city}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold mb-3">{t("bookingInfo")}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">{t("status")}:</span>
                      <Badge className={statusLabels[selectedBooking.status].color}>
                        {statusLabels[selectedBooking.status].label}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">{t("total")}:</span>
                      <p>€{selectedBooking.total_price}</p>
                    </div>
                    <div>
                      <span className="font-medium">{t("checkIn")}:</span>
                      <p>{format(new Date(selectedBooking.check_in_date), "dd.MM.yyyy")}</p>
                    </div>
                    <div>
                      <span className="font-medium">{t("checkOut")}:</span>
                      <p>{format(new Date(selectedBooking.check_out_date), "dd.MM.yyyy")}</p>
                    </div>
                    <div>
                      <span className="font-medium">{t("numberOfNights")}:</span>
                      <p>{Math.ceil(
                        (new Date(selectedBooking.check_out_date).getTime() - new Date(selectedBooking.check_in_date).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}</p>
                    </div>
                    <div>
                      <span className="font-medium">{t("numberOfGuests")}:</span>
                      <p>{selectedBooking.total_guests}</p>
                    </div>
                    <div>
                      <span className="font-medium">{t("bookingDate")}:</span>
                      <p>{format(new Date(selectedBooking.created_at), "dd.MM.yyyy HH:mm")}</p>
                    </div>
                  </div>
                </div>

                {/* Guest Info */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold mb-3">{t("guestDetails")}</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">{t("fullName")}:</span>
                      <p>{selectedBooking.guest_name}</p>
                    </div>
                    <div>
                      <span className="font-medium">{t("email")}:</span>
                      <p>{selectedBooking.guest_email}</p>
                    </div>
                    {selectedBooking.guest_phone && (
                      <div>
                        <span className="font-medium">{t("phone")}:</span>
                        <p>{selectedBooking.guest_phone}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Special Requests */}
                {selectedBooking.special_requests && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">{t("specialRequests")}</h3>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">
                      {selectedBooking.special_requests}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
