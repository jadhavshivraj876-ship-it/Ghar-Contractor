import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"


async function adminLogin(formData) {
  "use server"

  const email = formData.get("email")
  const password = formData.get("password")

  const supabase = createServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login failed:", error.message)
    return
  }

  
  redirect("/admin/protected/dashboard")
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
      
     
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <div className="h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
      </div>

      <Card
        className="relative w-full max-w-xl overflow-hidden
                   border border-orange-100
                   shadow-2xl hover:shadow-orange-200/50
                   transition-all duration-300 hover:-translate-y-1"
      >
        <CardHeader className="text-center pb-6 pt-8">
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center
                       rounded-full bg-orange-100 text-4xl shadow-inner"
          >
            🏗️
          </div>

          <CardTitle className="text-3xl font-bold text-gray-900">
            Admin Login
          </CardTitle>

          <CardDescription className="text-gray-600">
            Ghar Contractor Dashboard Access
          </CardDescription>
        </CardHeader>

        <CardContent className="px-10 pb-10">
          
          <form action={adminLogin} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="admin@gharcontractor.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           focus:border-orange-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           focus:border-orange-500 transition"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-base font-semibold text-white
                         bg-gradient-to-r from-orange-500 to-orange-600
                         hover:from-orange-600 hover:to-orange-700
                         shadow-lg hover:shadow-orange-500/40 transition"
            >
              Login to Dashboard
            </Button>
          </form>

          <p className="mt-8 text-xs text-center text-gray-400">
            Authorized admins only
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
