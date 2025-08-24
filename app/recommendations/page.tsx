"use client"

import { MapPin, Utensils, Camera, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n/context"
import Image from "next/image"

export default function RecommendationsPage() {
  const { t } = useI18n()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("recommendationsTitle")}</h1>
        <p className="text-xl text-muted-foreground">
          {t("recommendationsSubtitle")}
        </p>
      </div>

      {/* Split */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <MapPin className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold">Split</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Restaurants */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-orange-600" />
                <CardTitle>{t("restaurants")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("konobaHvaranin")}</h4>
                <p className="text-sm text-muted-foreground">{t("konobaHvaraninDesc")}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("pizzeriaGalija")}</h4>
                <p className="text-sm text-muted-foreground">{t("pizzeriaGalijaDesc")}</p>
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
                <CardTitle>{t("attractions")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStdkTJyoKU9K0znCx_c8kbHXS6kwcfmYNEjA&s"
                    alt="Dioklecijanova palača"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </div>
                <h4 className="font-semibold">{t("dioklecijanovaPalaca")}</h4>
                <p className="text-sm text-muted-foreground">{t("dioklecijanovaPalacaDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("historicalSite")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("riva")}</h4>
                <p className="text-sm text-muted-foreground">{t("rivaDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("walking")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("marjan")}</h4>
                <p className="text-sm text-muted-foreground">{t("marjanDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("nature")}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Interesting Places */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <CardTitle>{t("interestingPlaces")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("bacvice")}</h4>
                <p className="text-sm text-muted-foreground">{t("bacviceDesc")}</p>
                <Badge variant="outline" className="mt-1">{t("beach")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("trgRepublike")}</h4>
                <p className="text-sm text-muted-foreground">{t("trgRepublikeDesc")}</p>
                <Badge variant="outline" className="mt-1">{t("culture")}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dubrovnik */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <MapPin className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold">Dubrovnik</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Restaurants */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-orange-600" />
                <CardTitle>{t("restaurants")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("ladyPiPi")}</h4>
                <p className="text-sm text-muted-foreground">{t("ladyPiPiDesc")}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("restaurant360")}</h4>
                <p className="text-sm text-muted-foreground">{t("restaurant360Desc")}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attractions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-green-600" />
                <CardTitle>{t("attractions")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("stariGradDubrovnik")}</h4>
                <p className="text-sm text-muted-foreground">{t("stariGradDubrovnikDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("historicalSite")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <Image
                    src="https://travelcroatia.live/wp-content/uploads/2021/10/1920x1080_1560344914web-dubrovnik-city-walls.jpg"
                    alt="Gradske zidine Dubrovnik"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </div>
                <h4 className="font-semibold">{t("gradskeZidine")}</h4>
                <p className="text-sm text-muted-foreground">{t("gradskeZidineDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("viewAttraction")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("lokrum")}</h4>
                <p className="text-sm text-muted-foreground">{t("lokrumDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("nature")}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Interesting Places */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <CardTitle>{t("interestingPlaces")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("banjeBeach")}</h4>
                <p className="text-sm text-muted-foreground">{t("banjeBeachDesc")}</p>
                <Badge variant="outline" className="mt-1">{t("beach")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("stradun")}</h4>
                <p className="text-sm text-muted-foreground">{t("stradunDesc")}</p>
                <Badge variant="outline" className="mt-1">{t("shopping")}</Badge>
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
                <CardTitle>{t("restaurants")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("vodnjanka")}</h4>
                <p className="text-sm text-muted-foreground">{t("vodnjankaDesc")}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("bistroAlighieri")}</h4>
                <p className="text-sm text-muted-foreground">{t("bistroAlighieriDesc")}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attractions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-green-600" />
                <CardTitle>{t("attractions")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <Image
                    src="https://www.visitpula.hr/wp-content/uploads/2023/07/Pula-Arena-Amphiteatar-2.jpg"
                    alt="Pula Arena"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </div>
                <h4 className="font-semibold">{t("arena")}</h4>
                <p className="text-sm text-muted-foreground">{t("arenaDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("history")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("templeOfAugustus")}</h4>
                <p className="text-sm text-muted-foreground">{t("templeOfAugustusDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("archaeology")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("pulaCastle")}</h4>
                <p className="text-sm text-muted-foreground">{t("pulaCastleDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("viewAttraction")}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Interesting Places */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <CardTitle>{t("interestingPlaces")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("verudelaBeach")}</h4>
                <p className="text-sm text-muted-foreground">{t("verudelaBeachDesc")}</p>
                <Badge variant="outline" className="mt-1">{t("beach")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("forum")}</h4>
                <p className="text-sm text-muted-foreground">{t("forumDesc")}</p>
                <Badge variant="outline" className="mt-1">{t("culture")}</Badge>
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
                <CardTitle>{t("restaurants")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("restoranBruschetta")}</h4>
                <p className="text-sm text-muted-foreground">{t("restoranBruschettaDesc")}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("kornat")}</h4>
                <p className="text-sm text-muted-foreground">{t("kornatDesc")}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attractions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-green-600" />
                <CardTitle>{t("attractions")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("morskeOrgulje")}</h4>
                <p className="text-sm text-muted-foreground">{t("morskeOrguljeDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("music")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvwn2BsmkF6iB-mrYGEm6eRfMKTjmGAPn7ow&s"
                    alt="Pozdrav suncu Zadar"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </div>
                <h4 className="font-semibold">{t("pozdravSuncu")}</h4>
                <p className="text-sm text-muted-foreground">{t("pozdravSuncuDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("art")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("staraVrata")}</h4>
                <p className="text-sm text-muted-foreground">{t("staraVrataDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("history")}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Interesting Places */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <CardTitle>{t("interestingPlaces")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("kolovareBeach")}</h4>
                <p className="text-sm text-muted-foreground">{t("kolovareBeachDesc")}</p>
                <Badge variant="outline" className="mt-1">{t("beach")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("narodniTrg")}</h4>
                <p className="text-sm text-muted-foreground">{t("narodniTrgDesc")}</p>
                <Badge variant="outline" className="mt-1">{t("culture")}</Badge>
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
                <CardTitle>{t("restaurants")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("laPuntulina")}</h4>
                <p className="text-sm text-muted-foreground">{t("laPuntulinaDesc")}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("monte")}</h4>
                <p className="text-sm text-muted-foreground">{t("monteDesc")}</p>
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
                <CardTitle>{t("attractions")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <Image
                    src="https://istrain.hr/data/images/2025-01-14/1870_pexels-nathanael-schmer-24974792_f.jpg?timestamp=1736809200"
                    alt="Crkva sv. Eufemije Rovinj"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </div>
                <h4 className="font-semibold">{t("crkvaSvEufemije")}</h4>
                <p className="text-sm text-muted-foreground">{t("crkvaSvEufemijeDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("religion")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("stariGradRovinj")}</h4>
                <p className="text-sm text-muted-foreground">{t("stariGradRovinjDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("history")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("balbisArch")}</h4>
                <p className="text-sm text-muted-foreground">{t("balbisArchDesc")}</p>
                <Badge variant="secondary" className="mt-1">{t("archaeology")}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Interesting Places */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <CardTitle>{t("interestingPlaces")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("cuviBeach")}</h4>
                <p className="text-sm text-muted-foreground">{t("cuviBeachDesc")}</p>
                <Badge variant="outline" className="mt-1">{t("beach")}</Badge>
              </div>
              <div>
                <div className="mb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h4 className="font-semibold">{t("trgMarsalaTita")}</h4>
                <p className="text-sm text-muted-foreground">{t("trgMarsalaTitaDesc")}</p>
                <Badge variant="outline" className="mt-1">{t("culture")}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="text-center py-8 border-t">
        <p className="text-muted-foreground">
          {t("recommendationsFooter")}
        </p>
      </div>
    </div>
  )
}
