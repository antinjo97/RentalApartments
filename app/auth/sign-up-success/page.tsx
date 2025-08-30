import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Provjerite email / Check your email</CardTitle>
              <CardDescription>
                Poslali smo vam link za potvrdu na vašu email adresu. Kliknite na link da aktivirate svoj račun.
                <br />
                <br />
                We sent you a confirmation link to your email address. Click the link to activate your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full">
                <Link href="/">Povratak na početnu / Back to home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  )
}
