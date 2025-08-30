"use client"

import { MapPin, Utensils, Camera, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n/context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"

export default function RecommendationsPage() {
  const { t } = useI18n()
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Preporuke za putovanja</h1>
          <p className="text-xl text-muted-foreground">
            Otkrijte najbolje restorane, atrakcije i zanimljiva mjesta u našim gradovima
          </p>
        </div>

        {/* Umag */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Umag</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Restaurants */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-600" />
                  <CardTitle>Restorani</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Utensils className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Restoran Umag</h4>
                  <p className="text-sm text-muted-foreground">Opis restorana - dodajte detalje</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attractions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <CardTitle>Atrakcije</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Atrakcija Umag</h4>
                  <p className="text-sm text-muted-foreground">Opis atrakcije - dodajte detalje</p>
                  <Badge variant="secondary" className="mt-1">Atrakcija</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Interesting Places */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <CardTitle>Zanimljiva mjesta</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Mjesto Umag</h4>
                  <p className="text-sm text-muted-foreground">Opis mjesta - dodajte detalje</p>
                  <Badge variant="outline" className="mt-1">Mjesto</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Novigrad */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Novigrad</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Restaurants */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-600" />
                  <CardTitle>Restorani</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Utensils className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Restoran Novigrad</h4>
                  <p className="text-sm text-muted-foreground">Opis restorana - dodajte detalje</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attractions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <CardTitle>Atrakcije</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Atrakcija Novigrad</h4>
                  <p className="text-sm text-muted-foreground">Opis atrakcije - dodajte detalje</p>
                  <Badge variant="secondary" className="mt-1">Atrakcija</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Interesting Places */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <CardTitle>Zanimljiva mjesta</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Mjesto Novigrad</h4>
                  <p className="text-sm text-muted-foreground">Opis mjesta - dodajte detalje</p>
                  <Badge variant="outline" className="mt-1">Mjesto</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Poreč */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Poreč</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Restaurants */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-600" />
                  <CardTitle>Restorani</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Utensils className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Restoran Poreč</h4>
                  <p className="text-sm text-muted-foreground">Opis restorana - dodajte detalje</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attractions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <CardTitle>Atrakcije</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Atrakcija Poreč</h4>
                  <p className="text-sm text-muted-foreground">Opis atrakcije - dodajte detalje</p>
                  <Badge variant="secondary" className="mt-1">Atrakcija</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Interesting Places */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <CardTitle>Zanimljiva mjesta</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Mjesto Poreč</h4>
                  <p className="text-sm text-muted-foreground">Opis mjesta - dodajte detalje</p>
                  <Badge variant="outline" className="mt-1">Mjesto</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rovinj */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Rovinj</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Restaurants */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-600" />
                  <CardTitle>Restorani</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Utensils className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Restoran Rovinj</h4>
                  <p className="text-sm text-muted-foreground">Opis restorana - dodajte detalje</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attractions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <CardTitle>Atrakcije</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Atrakcija Rovinj</h4>
                  <p className="text-sm text-muted-foreground">Opis atrakcije - dodajte detalje</p>
                  <Badge variant="secondary" className="mt-1">Atrakcija</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Interesting Places */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <CardTitle>Zanimljiva mjesta</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Mjesto Rovinj</h4>
                  <p className="text-sm text-muted-foreground">Opis mjesta - dodajte detalje</p>
                  <Badge variant="outline" className="mt-1">Mjesto</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pula */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Pula</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Restaurants */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-600" />
                  <CardTitle>Restorani</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Utensils className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Restoran Pula</h4>
                  <p className="text-sm text-muted-foreground">Opis restorana - dodajte detalje</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attractions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <CardTitle>Atrakcije</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Atrakcija Pula</h4>
                  <p className="text-sm text-muted-foreground">Opis atrakcije - dodajte detalje</p>
                  <Badge variant="secondary" className="mt-1">Atrakcija</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Interesting Places */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <CardTitle>Zanimljiva mjesta</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Mjesto Pula</h4>
                  <p className="text-sm text-muted-foreground">Opis mjesta - dodajte detalje</p>
                  <Badge variant="outline" className="mt-1">Mjesto</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rijeka */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Rijeka</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Restaurants */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-600" />
                  <CardTitle>Restorani</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Utensils className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Restoran Rijeka</h4>
                  <p className="text-sm text-muted-foreground">Opis restorana - dodajte detalje</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attractions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <CardTitle>Atrakcije</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Atrakcija Rijeka</h4>
                  <p className="text-sm text-muted-foreground">Opis atrakcije - dodajte detalje</p>
                  <Badge variant="secondary" className="mt-1">Atrakcija</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Interesting Places */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <CardTitle>Zanimljiva mjesta</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Mjesto Rijeka</h4>
                  <p className="text-sm text-muted-foreground">Opis mjesta - dodajte detalje</p>
                  <Badge variant="outline" className="mt-1">Mjesto</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Krk */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Krk</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Restaurants */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-600" />
                  <CardTitle>Restorani</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Utensils className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Restoran Krk</h4>
                  <p className="text-sm text-muted-foreground">Opis restorana - dodajte detalje</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attractions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <CardTitle>Atrakcije</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Atrakcija Krk</h4>
                  <p className="text-sm text-muted-foreground">Opis atrakcije - dodajte detalje</p>
                  <Badge variant="secondary" className="mt-1">Atrakcija</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Interesting Places */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <CardTitle>Zanimljiva mjesta</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Mjesto Krk</h4>
                  <p className="text-sm text-muted-foreground">Opis mjesta - dodajte detalje</p>
                  <Badge variant="outline" className="mt-1">Mjesto</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cres */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Cres</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Restaurants */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-600" />
                  <CardTitle>Restorani</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Utensils className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Restoran Cres</h4>
                  <p className="text-sm text-muted-foreground">Opis restorana - dodajte detalje</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attractions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <CardTitle>Atrakcije</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Atrakcija Cres</h4>
                  <p className="text-sm text-muted-foreground">Opis atrakcije - dodajte detalje</p>
                  <Badge variant="secondary" className="mt-1">Atrakcija</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Interesting Places */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <CardTitle>Zanimljiva mjesta</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Mjesto Cres</h4>
                  <p className="text-sm text-muted-foreground">Opis mjesta - dodajte detalje</p>
                  <Badge variant="outline" className="mt-1">Mjesto</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pag */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Pag</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Restaurants */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-600" />
                  <CardTitle>Restorani</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Utensils className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Restoran Pag</h4>
                  <p className="text-sm text-muted-foreground">Opis restorana - dodajte detalje</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attractions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <CardTitle>Atrakcije</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Atrakcija Pag</h4>
                  <p className="text-sm text-muted-foreground">Opis atrakcije - dodajte detalje</p>
                  <Badge variant="secondary" className="mt-1">Atrakcija</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Interesting Places */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <CardTitle>Zanimljiva mjesta</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Mjesto Pag</h4>
                  <p className="text-sm text-muted-foreground">Opis mjesta - dodajte detalje</p>
                  <Badge variant="outline" className="mt-1">Mjesto</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Zadar */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Zadar</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Restaurants */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-600" />
                  <CardTitle>Restorani</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Utensils className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Restoran Zadar</h4>
                  <p className="text-sm text-muted-foreground">Opis restorana - dodajte detalje</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attractions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <CardTitle>Atrakcije</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Atrakcija Zadar</h4>
                  <p className="text-sm text-muted-foreground">Opis atrakcije - dodajte detalje</p>
                  <Badge variant="secondary" className="mt-1">Atrakcija</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Interesting Places */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <CardTitle>Zanimljiva mjesta</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-3">
                    <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold">Mjesto Zadar</h4>
                  <p className="text-sm text-muted-foreground">Opis mjesta - dodajte detalje</p>
                  <Badge variant="outline" className="mt-1">Mjesto</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="text-center py-8 border-t">
          <p className="text-muted-foreground">
            Dodajte detalje za svaki grad - restorane, atrakcije i zanimljiva mjesta
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
