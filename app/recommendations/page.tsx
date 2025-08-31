"use client"

import { useState } from "react"
import { MapPin, Utensils, Camera, Star, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n/context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"

interface CityData {
  id: string
  name: string
  nameEn: string
  gastronomy: {
    title: string
    titleEn: string
    description: string
    descriptionEn: string
    restaurants: Array<{
      name: string
      nameEn: string
      description: string
      descriptionEn: string
      image: string
    }>
  }
  culture: {
    title: string
    titleEn: string
    description: string
    descriptionEn: string
    attractions: Array<{
      name: string
      nameEn: string
      description: string
      descriptionEn: string
      image: string
    }>
  }
  entertainment: {
    title: string
    titleEn: string
    description: string
    descriptionEn: string
    activities: Array<{
      name: string
      nameEn: string
      description: string
      descriptionEn: string
      image: string
    }>
  }
}

const citiesData: CityData[] = [
  {
    id: "umag",
    name: "Umag",
    nameEn: "Umag",
         gastronomy: {
       title: "Gastronomija",
       titleEn: "Gastronomy",
       description: "Najbolji restorani i tradicionalna jela",
       descriptionEn: "Best restaurants and traditional dishes",
       restaurants: [
         {
           name: "Konoba Nono",
           nameEn: "Konoba Nono",
           description: "Tradicionalna istarska konoba s autentičnim okusima",
           descriptionEn: "Traditional Istrian konoba with authentic flavors",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npEXGWqV6xyXfY-26kraNpXOkcs1qo5Z6xSrQfzBeyC8PHVYLtEHDjmi27oWScsCchrJ4CKobpIpME6PT7tvnisPXWF_nd5w0jloH_WdMtlKjMj9quTaH_034zTtcLFzJHSnSXe=s294-w294-h220-n-k-no"
         },
         {
           name: "Konoba Kaleta",
           nameEn: "Konoba Kaleta",
           description: "Morski plodovi i mediteranska kuhinja",
           descriptionEn: "Seafood and Mediterranean cuisine",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nofX-e9QNvk1Bqk1yCa31s7rtvoOMNmJmmoeHj-uYAn_xU68LWnOqGHo7rfDNOfIyZNRxIDWr_g5TuVVK2x4PF8QU7AQ2UXPZUh4L36E4qgsCKBQTtTfXu7kuj_BjiBeWZNchGT=s220-w165-h220-n-k-no"
         },
         {
           name: "Konoba Rustica",
           nameEn: "Konoba Rustica",
           description: "Rustikalna atmosfera s domaćim jelima",
           descriptionEn: "Rustic atmosphere with homemade dishes",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrlZ7YV7qh61_tv3zL7yUNN7fM17okOF_OqA8ULpGZ7gZhlxYVjyXdrQhFsg2gYd0HgwAP2NJLknURb9QgrTla5PmQrHSx9JdIZ0vkL7z8TbiHHZig7JjCzQruKYETpcrAUN-NEag=s294-w294-h220-n-k-no"
         }
       ]
     },
         culture: {
       title: "Kultura",
       titleEn: "Culture",
       description: "Povijesne znamenitosti i muzeji",
       descriptionEn: "Historical landmarks and museums",
       attractions: [
         {
           name: "Crkva Uznesenja Blažene Djevice Marije",
           nameEn: "Church of the Assumption of the Blessed Virgin Mary",
           description: "Barokna crkva u srcu starog grada",
           descriptionEn: "Baroque church in the heart of the old town",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4no2ks57BvC8cnU32csfIIOsN1DIOTc1cLNdVXZppWfa1amkJ3XTutbu4ZP_05H1Ys-W9TZ5YMoIOfkWE-2Jj27w-aoD56W3jJxhDASluorxvAp46cJvcef2uQgam0kSDaWX1_tn8A=s294-w294-h220-n-k-no"
         },
         {
           name: "Savudrijski svjetionik",
           nameEn: "Savudrija Lighthouse",
           description: "Najstariji svjetionik na Jadranu",
           descriptionEn: "Oldest lighthouse on the Adriatic",
           image: "https://www.istra.hr/public/uploads/photos/articles/ic_11_svjetionik_savudrija_box_img.jpg"
         },
         {
           name: "Stari grad Umag",
           nameEn: "Umag Old Town",
           description: "Srednjovjekovni grad s prekrasnim zidinama",
           descriptionEn: "Medieval town with beautiful walls",
           image: "https://villsy.com/wp-content/uploads/bigstock-Umag-Aerial-View-Of-Historic-363715654.jpg"
         }
       ]
     },
         entertainment: {
       title: "Zabava",
       titleEn: "Entertainment",
       description: "Noćni život i aktivnosti",
       descriptionEn: "Nightlife and activities",
       activities: [
         {
           name: "ATP Umag",
           nameEn: "ATP Umag",
           description: "Teniski turnir najviše kategorije",
           descriptionEn: "Highest category tennis tournament",
           image: "https://cf-images.us-east-1.prod.boltdns.net/v1/static/6057277721001/322aa53f-f677-4690-bd74-a1c06a707a70/67952fc3-c034-40e0-99ec-7d21a7685b62/1280x720/match/image.jpg"
         },
         {
           name: "Stella Maris Umag",
           nameEn: "Stella Maris Umag",
           description: "Kamp s prekrasnim pogledom na more",
           descriptionEn: "Camp with beautiful sea view",
           image: "https://adriacamps.com/wp-content/uploads/2015/12/Camping-Stella-Maris-Airview-4-800x600.jpg.webp"
         },
         {
           name: "Adventure Park Jangalooz",
           nameEn: "Adventure Park Jangalooz",
           description: "Aktivnosti u prirodi za sve uzraste",
           descriptionEn: "Outdoor activities for all ages",
           image: "https://www.bivillage.com/wp-content/uploads/2022/08/jangalooz-adventure-park-bivillage-croazia.jpg"
         }
       ]
     }
  },
  {
    id: "novigrad",
    name: "Novigrad",
    nameEn: "Novigrad",
         gastronomy: {
       title: "Gastronomija",
       titleEn: "Gastronomy",
       description: "Najbolji restorani i tradicionalna jela",
       descriptionEn: "Best restaurants and traditional dishes",
       restaurants: [
         {
           name: "Konoba Mika",
           nameEn: "Konoba Mika",
           description: "Tradicionalna istarska konoba",
           descriptionEn: "Traditional Istrian konoba",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nru0h7JpwaQ8l6iQbSPLn2Mlm6YfbjVkLT44zliO5tk84J1Mm7BBRl4wa9lGYaufPV_f9cld--14NNFBD7OjxsTXOShd69QWZHBpyu2iNhH7p43tTEdP_A_V4510lq9pw=s294-w294-h220-n-k-no"
         },
         {
           name: "Konoba Anni",
           nameEn: "Konoba Anni",
           description: "Autentična mediteranska kuhinja",
           descriptionEn: "Authentic Mediterranean cuisine",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrPPfqIYNaNFqz2Z1eGhuEE4hzm0sHB3iDnS6IXGk3tM_EavIU13OrEapgyIbfBHr0ifxZGVQljlnYmlPJmjNXLJSavIcEKCGEF6Lm2JMkMYVXcc24eX3Q0_c1BG--2mFfDN_EBGBidiTPq=s294-w294-h220-n-k-no"
         },
         {
           name: "Lungomare",
           nameEn: "Lungomare",
           description: "Restoran uz more s prekrasnim pogledom",
           descriptionEn: "Seaside restaurant with beautiful view",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npk69C2cvp4bVojxz-GzIwsSj0RQncbHJVZJlmBTgyHugRv-kERIgN4yQJNkmXiJot99hb-NnmREoxcJKE5qLSwaYNV8JZ-JPnYgbhIOYktQCQ_adGIeb0EHFT1vSDdkgZFqv8=s294-w294-h220-n-k-no"
         }
       ]
     },
         culture: {
       title: "Kultura",
       titleEn: "Culture",
       description: "Povijesne znamenitosti i muzeji",
       descriptionEn: "Historical landmarks and museums",
       attractions: [
         {
           name: "Gradske zidine i kule",
           nameEn: "City walls and towers",
           description: "Srednjovjekovne fortifikacije grada",
           descriptionEn: "Medieval city fortifications",
           image: "https://www.istra.hr/public/uploads/photos/articles/1526987352_7292.jpg"
         },
         {
           name: "Župna crkva sv. Pelagija i sv. Maksima",
           nameEn: "Parish Church of St. Pelagius and St. Maximus",
           description: "Barokna crkva iz 18. stoljeća",
           descriptionEn: "Baroque church from the 18th century",
           image: "https://novigrad.hr/media/2022/03/web_spomenicka_bastina_crkva_sv.Pelagija_i_sv.Maksima.jpg"
         },
         {
           name: "Lapidarium – Muzej",
           nameEn: "Lapidarium – Museum",
           description: "Muzej antičkih spomenika",
           descriptionEn: "Museum of ancient monuments",
           image: "https://novigrad.hr/media/2022/04/Lap_Newsletter-1024x537.jpg"
         }
       ]
     },
         entertainment: {
       title: "Zabava",
       titleEn: "Entertainment",
       description: "Noćni život i aktivnosti",
       descriptionEn: "Nightlife and activities",
       activities: [
         {
           name: "Mandrač – ribarski festival",
           nameEn: "Mandrač – fishing festival",
           description: "Tradicionalni ribarski festival",
           descriptionEn: "Traditional fishing festival",
           image: "https://cdn2.cloud-hub.eu/MediaServer/Photos/Download/450833?Format=5&v=16.10.2023%2015:09:43"
         },
         {
           name: "Koncerti i ljetne priredbe na otvorenom",
           nameEn: "Concerts and summer events outdoors",
           description: "Kulturni događaji tijekom ljeta",
           descriptionEn: "Cultural events during summer",
           image: "https://krevatin-tours.hr/mvc/image/download/id/n3GqoLemXniXIW1SWaKGO6d0/hash/4fb946271a123e27710892ccd1dee674897844dc"
         },
         {
           name: "Aquapark Istralandia",
           nameEn: "Aquapark Istralandia",
           description: "Najveći vodeni park u Istri",
           descriptionEn: "Largest water park in Istria",
           image: "https://total-croatia-news.com/wp-content/uploads/2020/12/f5729cc64700f84d24cdee7e47768007.jpg"
         }
       ]
     }
  },
  {
    id: "porec",
    name: "Poreč",
    nameEn: "Poreč",
         gastronomy: {
       title: "Gastronomija",
       titleEn: "Gastronomy",
       description: "Najbolji restorani i tradicionalna jela",
       descriptionEn: "Best restaurants and traditional dishes",
       restaurants: [
         {
           name: "Restaurant ANCORA",
           nameEn: "Restaurant ANCORA",
           description: "Morski plodovi i mediteranska kuhinja",
           descriptionEn: "Seafood and Mediterranean cuisine",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noeIbb-UBRm8QcNzuCnAMR3JX5vOKWDWCZRikxo4_K1gFXTgym1XMMPqatJ5aKpVzKIMn9YORChKuXBZIozO_mIJeDxyzoCiNb9zBF5eAMitB0jt4pfviQPHER7XBm5opUMzizU=s220-w165-h220-n-k-no"
         },
         {
           name: "Restaurant Mamma Mia",
           nameEn: "Restaurant Mamma Mia",
           description: "Italijanska kuhinja s mediteranskim okusima",
           descriptionEn: "Italian cuisine with Mediterranean flavors",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrWN9OJLiO8ROyBslY2UzaGsNpbXPyBJTCWfpJYh7D18p-nBkjlBb-v8cAP5YKtMC0jXu6hWOvPO2jGz0PGwN2WmNxeVL49OJmGdFrURNNBKF-AAJfLumgS1gYOaN6RAn4qgricNA=s294-w294-h220-n-k-no"
         },
         {
           name: "Restoran Tradizione",
           nameEn: "Restaurant Tradizione",
           description: "Tradicionalna istarska kuhinja",
           descriptionEn: "Traditional Istrian cuisine",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nou-QrDmDvASKzWvYAuay34YPRlSiGfa1HLXfc-jRNqoPn6Mhxx2xjVlUhamkLGMWfdiYTlfIDpYbGYlvbXadz0BrdFcJsoVldpntrBoL9vy4JMln3F-t3hrROjPTOPXwYHRV7hTlEdGCPv=s294-w294-h220-n-k-no"
         }
       ]
     },
         culture: {
       title: "Kultura",
       titleEn: "Culture",
       description: "Povijesne znamenitosti i muzeji",
       descriptionEn: "Historical landmarks and museums",
       attractions: [
         {
           name: "Eufrazijeva bazilika",
           nameEn: "Euphrasian Basilica",
           description: "UNESCO svjetska baština",
           descriptionEn: "UNESCO World Heritage Site",
           image: "https://www.zupaporec.com/wp-content/uploads/2015/10/Eufrazijeva-bazilika-034.jpg"
         },
         {
           name: "Stari grad",
           nameEn: "Old Town",
           description: "Srednjovjekovni grad s prekrasnim ulicama",
           descriptionEn: "Medieval town with beautiful streets",
           image: "https://www.istria-culture.com/storage/upload/poi/istra_culture_060_10289.jpg"
         },
         {
           name: "Riva Poreč",
           nameEn: "Poreč Promenade",
           description: "Prekrasna obala uz more",
           descriptionEn: "Beautiful seaside promenade",
           image: "https://www.porec.hr/cmsmedia/sadrzaj/stranica_zaglavlje/66506/riva.jpg"
         }
       ]
     },
         entertainment: {
       title: "Zabava",
       titleEn: "Entertainment",
       description: "Noćni život i aktivnosti",
       descriptionEn: "Nightlife and activities",
       activities: [
         {
           name: "Aquacolors",
           nameEn: "Aquacolors",
           description: "Vodeni park s toboganima",
           descriptionEn: "Water park with slides",
           image: "https://www.aquacolors.eu/cardskins/bs3.aquacolorsOfficial2022/extras/map/index_files/bg_1.jpg"
         },
         {
           name: "Byblos Poreč",
           nameEn: "Byblos Poreč",
           description: "Noćni klub s najboljom glazbom",
           descriptionEn: "Nightclub with the best music",
           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKegXmekmEupg_7slK2guah2tf0uP7ZFuFA&s"
         },
         {
           name: "Dino Park",
           nameEn: "Dino Park",
           description: "Park s dinosaurima za djecu",
           descriptionEn: "Dinosaur park for children",
           image: "https://www.vecernji.hr/media/img/1c/6a/29a0e989da56e7fec697.jpeg"
         }
       ]
     }
  },
  {
    id: "rovinj",
    name: "Rovinj",
    nameEn: "Rovinj",
         gastronomy: {
       title: "Gastronomija",
       titleEn: "Gastronomy",
       description: "Najbolji restorani i tradicionalna jela",
       descriptionEn: "Best restaurants and traditional dishes",
       restaurants: [
         {
           name: "Restoran Orca",
           nameEn: "Restaurant Orca",
           description: "Fine dining s pogledom na more",
           descriptionEn: "Fine dining with sea view",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4no_9rbBmU06kJSGgc4obKFW-C2DDXJ2DBNMIQAVWPxd-Hf3kipPDCBeO1yE2s1p55yHeMbDQYguvjezmw5Q4SI6WkQ0Kt20mikAqjQ7snlE2TIXctQDbQT9Jniw-6BgDKPagAGriQ=s294-w294-h220-n-k-no"
         },
         {
           name: "La Puntulina",
           nameEn: "La Puntulina",
           description: "Mediteranska kuhinja s pogledom na more",
           descriptionEn: "Mediterranean cuisine with sea view",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noILG9MKhWMQ6ktSgUoJrXiKG1R7mAyMD1MmHl8B2_ZdzOUgc4-5ung7i7Ref206DSycBL4SQN00_LvTKMcUKXwBRyUmB97drMOjMDTVH5ltg0LYA3AR_X4mcOqcOXqJ3HWX74D=s294-w294-h220-n-k-no"
         },
         {
           name: "La Vela gostionica",
           nameEn: "La Vela tavern",
           description: "Tradicionalna gostionica s domaćim jelima",
           descriptionEn: "Traditional tavern with homemade dishes",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqskK9_VJGpAV7BHfJvbEC6CB5nB-WT37r68Xzi7mPCVAb_svSedLMbZ70QhNOgZtokqU277OV8OjIctf2woeNcTHwIu6NeaKJqvFFesHU_lMeR2jm_0f5-Jd_xYyfqhj6uH1wCBQ=s294-w294-h220-n-k-no"
         }
       ]
     },
         culture: {
       title: "Kultura",
       titleEn: "Culture",
       description: "Povijesne znamenitosti i muzeji",
       descriptionEn: "Historical landmarks and museums",
       attractions: [
         {
           name: "Crkva sv. Eufemije",
           nameEn: "Church of St. Euphemia",
           description: "Barokna crkva na vrhu brda",
           descriptionEn: "Baroque church on top of the hill",
           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX7OHzg-x-eqi1E1JXrcdqGYIgbU220dfxXg&s"
         },
         {
           name: "Stari grad",
           nameEn: "Old Town",
           description: "Srednjovjekovni grad s prekrasnim ulicama",
           descriptionEn: "Medieval town with beautiful streets",
           image: "https://www.rovinj-rovigno.hr/wp-content/uploads/2019/11/rovinjcroatia-1-1200x800.jpg"
         },
         {
           name: "Balbi's luk i gradske zidine",
           nameEn: "Balbi's Arch and city walls",
           description: "Povijesni ulaz u stari grad",
           descriptionEn: "Historical entrance to the old town",
           image: "https://www.rovinj-tourism.com/uploads/imgcache/large/articles/1580722842_8518.jpg"
         }
       ]
     },
         entertainment: {
       title: "Zabava",
       titleEn: "Entertainment",
       description: "Noćni život i aktivnosti",
       descriptionEn: "Nightlife and activities",
       activities: [
         {
           name: "Rovinjsko ljeto – koncerti i festivali",
           nameEn: "Rovinj Summer – concerts and festivals",
           description: "Kulturni događaji tijekom ljeta",
           descriptionEn: "Cultural events during summer",
           image: "https://www.turizmoteka.hr/image/58395/original/"
         },
         {
           name: "Šetnja Zlatnim rtom (Punta Corrente)",
           nameEn: "Walk to Golden Cape (Punta Corrente)",
           description: "Prekrasna šetnja kroz park",
           descriptionEn: "Beautiful walk through the park",
           image: "https://putnikofer.hr/wp-content/uploads/2025/02/zlatni-rt-rovinj-1200x900.jpg"
         },
         {
           name: "Crveni otok",
           nameEn: "Red Island",
           description: "Otok s prekrasnim plažama",
           descriptionEn: "Island with beautiful beaches",
           image: "https://i.ytimg.com/vi/unCvXEHIfOE/maxresdefault.jpg"
         }
       ]
     }
  },
  {
    id: "pula",
    name: "Pula",
    nameEn: "Pula",
         gastronomy: {
       title: "Gastronomija",
       titleEn: "Gastronomy",
       description: "Najbolji restorani i tradicionalna jela",
       descriptionEn: "Best restaurants and traditional dishes",
       restaurants: [
         {
           name: "Konoba Boccaporta",
           nameEn: "Konoba Boccaporta",
           description: "Tradicionalna istarska konoba",
           descriptionEn: "Traditional Istrian konoba",
           image: "https://delistria.com/wp-content/uploads/2020/07/ff163270-0c64-4228-8941-b0d0a208ee0b.jpg"
         },
         {
           name: "Veritas Food&Wine",
           nameEn: "Veritas Food&Wine",
           description: "Fine dining s istarskim vinima",
           descriptionEn: "Fine dining with Istrian wines",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nos1ShCbzd5GnkoisQYw86X6A2Z9BdJFLvyGUKJtB6Cr9IdtFeph1Kffo57aR2IcghMpRdZOLgPHD75fhAsaGuVnZG2-hpZ2cxA0JBk3ENA-Lt0ykb8lqTiBjvpV8VJ0WvaAb7_=s294-w294-h220-n-k-no"
         },
         {
           name: "Restoran La Familia",
           nameEn: "Restaurant La Familia",
           description: "Obiteljski restoran s domaćim jelima",
           descriptionEn: "Family restaurant with homemade dishes",
           image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrTBhrCwI9JnZnEyoBrsKclNeBdxfzg0bbM29tFOufKHETPGZLZ2IFLMIMEfNBZlfR3Lguy0ZKKICBdfYRZ6hlu-end8m4vXx07e0T1r9igAqWFk6uKWlKWVLKlb7s8bAj0YzNIHl6NnDU=s294-w294-h220-n-k-no"
         }
       ]
     },
         culture: {
       title: "Kultura",
       titleEn: "Culture",
       description: "Povijesne znamenitosti i muzeji",
       descriptionEn: "Historical landmarks and museums",
       attractions: [
         {
           name: "Amfiteatar (Arena)",
           nameEn: "Amphitheater (Arena)",
           description: "Rimski amfiteatar iz 1. stoljeća",
           descriptionEn: "Roman amphitheater from the 1st century",
           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaP8iXZ7cRHgXqNLpDH1_VcQb6ZnwzF7jVEA&s"
         },
         {
           name: "Augustov hram",
           nameEn: "Temple of Augustus",
           description: "Rimski hram posvećen Augustu",
           descriptionEn: "Roman temple dedicated to Augustus",
           image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg6xlAYVuLqsWwibCHx2mxJjw9ER16qgZoUA&s"
         },
         {
           name: "Zerostrasse",
           nameEn: "Zerostrasse",
           description: "Podzemni tuneli iz Prvog svjetskog rata",
           descriptionEn: "Underground tunnels from World War I",
           image: "https://www.visitpula.hr/wp-content/uploads/2023/11/Zerostrasse-underground-tunnels-Pula-Tunnel.jpg"
         }
       ]
     },
         entertainment: {
       title: "Zabava",
       titleEn: "Entertainment",
       description: "Noćni život i aktivnosti",
       descriptionEn: "Nightlife and activities",
       activities: [
         {
           name: "Pula Film Festival",
           nameEn: "Pula Film Festival",
           description: "Najstariji filmski festival u Hrvatskoj",
           descriptionEn: "Oldest film festival in Croatia",
           image: "https://pulainfo.hr/wp-content/uploads/2023/10/Pula-arena-filmfestival_potter5_C-1100x618.jpg"
         },
         {
           name: "Noćni život u centru i na Verudeli",
           nameEn: "Nightlife in the center and on Verudela",
           description: "Vibrant nightlife scene",
           descriptionEn: "Vibrant nightlife scene",
           image: "https://visitrijeka.hr/wp-content/uploads/2023/06/Nocni-zivot-Koblerov-trg2.jpg"
         },
         {
           name: "Koncerti i događanja u Areni",
           nameEn: "Concerts and events in the Arena",
           description: "Koncerti u povijesnom amfiteatru",
           descriptionEn: "Concerts in the historic amphitheater",
           image: "https://www.muzika.hr/wp-content/uploads/2021/04/Pula-Arena-Croatia-David-Gilmour.jpg"
         }
       ]
     }
  }
]

export default function RecommendationsPage() {
  const { t, locale } = useI18n()
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const isEnglish = locale === "en"

  const toggleSection = (cityId: string, section: string) => {
    const key = `${cityId}-${section}`
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            {t("recommendationsTitle")}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground px-4">
            {t("recommendationsSubtitle")}
          </p>
        </div>

        {/* City Selection */}
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {citiesData.map((city) => (
              <Button
                key={city.id}
                variant={selectedCity === city.id ? "default" : "outline"}
                onClick={() => setSelectedCity(city.id)}
                className="h-20 flex flex-col items-center justify-center gap-2"
              >
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {isEnglish ? city.nameEn : city.name}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* City Details */}
        {selectedCity && (
          <div className="space-y-8">
            {citiesData
              .filter(city => city.id === selectedCity)
              .map(city => (
                <div key={city.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-8 w-8 text-blue-600" />
                    <h2 className="text-3xl font-bold">
                      {isEnglish ? city.nameEn : city.name}
                    </h2>
                  </div>

                  {/* Gastronomy Section */}
                  <Card className="mb-6">
                    <CardHeader>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-0 h-auto"
                        onClick={() => toggleSection(city.id, "gastronomy")}
                      >
                        <div className="flex items-center gap-3">
                          <Utensils className="h-6 w-6 text-orange-600" />
                          <div className="text-left">
                            <CardTitle>{isEnglish ? city.gastronomy.titleEn : city.gastronomy.title}</CardTitle>
                            <CardDescription>
                              {isEnglish ? city.gastronomy.descriptionEn : city.gastronomy.description}
                            </CardDescription>
                          </div>
                        </div>
                        {expandedSections[`${city.id}-gastronomy`] ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                    </CardHeader>
                    {expandedSections[`${city.id}-gastronomy`] && (
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {city.gastronomy.restaurants.map((restaurant, index) => (
                            <div key={index} className="space-y-3">
                              <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden">
                                <Image
                                  src={restaurant.image}
                                  alt={isEnglish ? restaurant.nameEn : restaurant.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold">
                                  {isEnglish ? restaurant.nameEn : restaurant.name}
                                </h4>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {isEnglish ? restaurant.descriptionEn : restaurant.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Culture Section */}
                  <Card className="mb-6">
                    <CardHeader>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-0 h-auto"
                        onClick={() => toggleSection(city.id, "culture")}
                      >
                        <div className="flex items-center gap-3">
                          <Camera className="h-6 w-6 text-green-600" />
                          <div className="text-left">
                            <CardTitle>{isEnglish ? city.culture.titleEn : city.culture.title}</CardTitle>
                            <CardDescription>
                              {isEnglish ? city.culture.descriptionEn : city.culture.description}
                            </CardDescription>
                          </div>
                        </div>
                        {expandedSections[`${city.id}-culture`] ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                    </CardHeader>
                    {expandedSections[`${city.id}-culture`] && (
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {city.culture.attractions.map((attraction, index) => (
                            <div key={index} className="space-y-3">
                              <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden">
                                <Image
                                  src={attraction.image}
                                  alt={isEnglish ? attraction.nameEn : attraction.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <h4 className="font-semibold">
                                {isEnglish ? attraction.nameEn : attraction.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {isEnglish ? attraction.descriptionEn : attraction.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Entertainment Section */}
                  <Card className="mb-6">
                    <CardHeader>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-0 h-auto"
                        onClick={() => toggleSection(city.id, "entertainment")}
                      >
                        <div className="flex items-center gap-3">
                          <Star className="h-6 w-6 text-purple-600" />
                          <div className="text-left">
                            <CardTitle>{isEnglish ? city.entertainment.titleEn : city.entertainment.title}</CardTitle>
                            <CardDescription>
                              {isEnglish ? city.entertainment.descriptionEn : city.entertainment.description}
                            </CardDescription>
                          </div>
                        </div>
                        {expandedSections[`${city.id}-entertainment`] ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                    </CardHeader>
                    {expandedSections[`${city.id}-entertainment`] && (
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {city.entertainment.activities.map((activity, index) => (
                            <div key={index} className="space-y-3">
                              <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden">
                                <Image
                                  src={activity.image}
                                  alt={isEnglish ? activity.nameEn : activity.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <h4 className="font-semibold">
                                {isEnglish ? activity.nameEn : activity.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {isEnglish ? activity.descriptionEn : activity.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </div>
              ))}
          </div>
        )}

        {/* Instructions */}
        {!selectedCity && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {isEnglish ? "Select a city to view recommendations" : "Odaberite grad za pregled preporuka"}
            </h3>
            <p className="text-muted-foreground">
              {isEnglish ? "Click on any city above to explore gastronomy, culture, and entertainment options" : "Kliknite na bilo koji grad iznad za istraživanje gastronomije, kulture i zabave"}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
