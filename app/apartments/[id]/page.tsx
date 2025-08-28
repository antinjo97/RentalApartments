import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ApartmentDetails } from "@/components/apartments/apartment-details"
import { notFound } from "next/navigation"

export default async function ApartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  
  // Await params before using its properties
  const { id } = await params

  const { data: apartment, error } = await supabase
    .from("apartments")
    .select("*")
    .eq("id", id)
    .eq("is_available", true)
    .single()

  if (error || !apartment) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ApartmentDetails apartment={apartment} />
      
      <Footer />
    </div>
  )
}
