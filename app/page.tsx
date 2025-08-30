"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { MapPin, Star, Wifi } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export default function HomePage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("welcomeTitle")}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t("welcomeSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/apartments">
                <MapPin className="mr-2 h-5 w-5" />
                {t("browseApartments")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">{t("contactUs")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("whyChooseUs")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{t("primeLocations")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Apartmani u srcu najljepših hrvatskih gradova - Umag, Novigrad, Poreč, Rovinj, Pula, Rijeka, Krk, Cres, Pag i Zadar.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Star className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{t("premiumQuality")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t("premiumQualityDesc")}</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Wifi className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{t("modernAmenities")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t("modernAmenitiesDesc")}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t("readyForVacation")}</h2>
          <p className="text-xl text-muted-foreground mb-8">{t("readyForVacationDesc")}</p>
          <Button size="lg" asChild>
            <Link href="/apartments">{t("startBrowsing")}</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
