"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { MapPin, Star, Wifi, Waves, Calendar, Users } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import Image from "next/image"

export default function HomePage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 px-4 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="https://images.unsplash.com/photo-1504321946642-8f661bf96ff0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Background image"
            fill
            className="object-cover object-bottom opacity-95"
            style={{ objectPosition: 'center 70%' }}
            priority
          />
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10"></div>
        <div className="absolute top-20 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight drop-shadow-lg">
              {t("welcomeTitle")}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4 drop-shadow-sm">
              {t("welcomeSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" asChild>
                <Link href="/apartments">
                  <MapPin className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  {t("browseApartments")}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-2 hover:bg-primary hover:text-white transition-all duration-300" asChild>
                <Link href="/contact">{t("contactUs")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t("whyChooseUs")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Discover why thousands of travelers choose our premium apartments for their Croatian adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4">
                  <MapPin className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl text-foreground">{t("primeLocations")}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Apartmani u srcu najljepših hrvatskih gradova - Umag, Novigrad, Poreč, Rovinj, Pula, Rijeka, Krk, Cres, Pag i Zadar.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4">
                  <Star className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl text-foreground">{t("premiumQuality")}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  {t("premiumQualityDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4">
                  <Wifi className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl text-foreground">{t("modernAmenities")}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  {t("modernAmenitiesDesc")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t("readyForVacation")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed px-4">
              {t("readyForVacationDesc")}
            </p>
            <Button size="lg" className="text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" asChild>
              <Link href="/apartments">{t("startBrowsing")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
