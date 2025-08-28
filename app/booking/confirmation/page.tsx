import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { redirect } from "next/navigation"

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ booking?: string }>
}) {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Await searchParams before using its properties
  const params = await searchParams

  let booking = null
  let apartment = null

  if (params.booking && params.booking !== "success") {
    const { data: bookingData } = await supabase
      .from("bookings")
      .select(
        `
        *,
        apartment:apartments(*)
      `,
      )
      .eq("id", params.booking)
      .eq("user_id", user.id)
      .single()

    booking = bookingData
    apartment = bookingData?.apartment
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Rezervacija potvrđena! / Booking Confirmed!</CardTitle>
              <p className="text-muted-foreground">
                Vaša rezervacija je uspješno poslana i čeka potvrdu.
                <br />
                Your booking has been successfully submitted and is awaiting confirmation.
              </p>
            </CardHeader>

            {booking && apartment && (
              <CardContent className="space-y-6">
                {/* Booking Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Detalji rezervacije / Booking Details</h3>

                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">{apartment.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {apartment.address}, {apartment.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">
                          {format(new Date(booking.check_in_date), "dd.MM.yyyy")} -{" "}
                          {format(new Date(booking.check_out_date), "dd.MM.yyyy")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {Math.ceil(
                            (new Date(booking.check_out_date).getTime() - new Date(booking.check_in_date).getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          noći / nights
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{booking.total_guests} gostiju / guests</p>
                        <p className="text-sm text-muted-foreground">Ukupna cijena: €{booking.total_price}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guest Information */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Podaci o gostu / Guest Information</h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="font-medium">{booking.guest_name}</p>
                    <p className="text-sm text-muted-foreground">{booking.guest_email}</p>
                    {booking.guest_phone && <p className="text-sm text-muted-foreground">{booking.guest_phone}</p>}
                  </div>
                </div>

                {/* Special Requests */}
                {booking.special_requests && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Posebni zahtjevi / Special Requests</h3>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm">{booking.special_requests}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            )}

            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Što slijedi? / What's next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Poslat ćemo vam email potvrdu / We'll send you an email confirmation</li>
                    <li>• Vlasnik će potvrditi rezervaciju u roku od 24 sata / Owner will confirm within 24 hours</li>
                    <li>• Dobit ćete instrukcije za check-in / You'll receive check-in instructions</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href="/bookings">Moje rezervacije / My Bookings</Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1 bg-transparent">
                    <Link href="/apartments">Pretraži apartmane / Browse Apartments</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
