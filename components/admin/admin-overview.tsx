import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Calendar, MessageSquare, TrendingUp, Users, Euro } from "lucide-react"

interface AdminOverviewProps {
  apartments: Array<{ id: string; is_available: boolean }>
  bookings: Array<{ id: string; status: string; total_price: number; created_at: string }>
  messages: Array<{ id: string; is_read: boolean; created_at: string }>
}

export function AdminOverview({ apartments, bookings, messages }: AdminOverviewProps) {
  const totalApartments = apartments.length
  const availableApartments = apartments.filter((apt) => apt.is_available).length
  const totalBookings = bookings.length
  const pendingBookings = bookings.filter((booking) => booking.status === "pending").length
  const confirmedBookings = bookings.filter((booking) => booking.status === "confirmed").length
  const totalRevenue = bookings
    .filter((booking) => booking.status === "confirmed")
    .reduce((sum, booking) => sum + booking.total_price, 0)
  const unreadMessages = messages.filter((msg) => !msg.is_read).length

  // Recent bookings (last 7 days)
  const recentBookings = bookings.filter(
    (booking) => new Date(booking.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Pregled sustava / System overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Apartmani / Apartments</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApartments}</div>
            <p className="text-xs text-muted-foreground">{availableApartments} dostupno / available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rezervacije / Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">{pendingBookings} na čekanju / pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prihod / Revenue</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{confirmedBookings} potvrđeno / confirmed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Poruke / Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">{unreadMessages} nepročitano / unread</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Nedavna aktivnost / Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Nove rezervacije (7 dana)</span>
                <span className="font-medium">{recentBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Rezervacije na čekanju</span>
                <span className="font-medium text-orange-600">{pendingBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Nepročitane poruke</span>
                <span className="font-medium text-red-600">{unreadMessages}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Brze akcije / Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/bookings?status=pending"
                className="block p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors"
              >
                <div className="font-medium text-orange-900">Provjeri rezervacije na čekanju</div>
                <div className="text-sm text-orange-700">{pendingBookings} rezervacija čeka potvrdu</div>
              </a>
              {unreadMessages > 0 && (
                <a
                  href="/admin/messages?unread=true"
                  className="block p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <div className="font-medium text-red-900">Odgovori na poruke</div>
                  <div className="text-sm text-red-700">{unreadMessages} nepročitanih poruka</div>
                </a>
              )}
              <a
                href="/admin/apartments"
                className="block p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <div className="font-medium text-blue-900">Upravljaj apartmanima</div>
                <div className="text-sm text-blue-700">Dodaj, uredi ili ukloni apartmane</div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
