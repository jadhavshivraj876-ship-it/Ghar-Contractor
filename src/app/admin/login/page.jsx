'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { loginAdmin } from '@/actions/admin/auth.actions'
import { createBrowserClient } from '@/lib/supabase/client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createBrowserClient()

  useEffect(() => {
    checkExistingSession()
  }, [])

  async function checkExistingSession() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const redirect = searchParams.get('redirect') || '/admin/dashboard'
        router.push(redirect)
        return
      }
    } catch (error) {
      console.error('Session check failed:', error)
    } finally {
      setChecking(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await loginAdmin(email, password)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">

      {/* Login Card */}
      <Card
        className="relative w-full max-w-xl overflow-hidden
                   border border-orange-100
                   shadow-2xl hover:shadow-orange-200/50
                   transition-all duration-300 hover:-translate-y-1"
      >
        <CardHeader className="text-center pb-6 pt-8 relative">

          {/* Back Arrow inside card */}
          <div className="absolute -top-2 left-6">
            <Link href="/">
              <button className="flex items-center gap-1 text-orange-600 hover:text-orange-800 transition text-2xl p-2 rounded-full hover:bg-orange-100">
                ←
              </button>
            </Link>
          </div>

          {/* Logo */}
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center
                        rounded-full bg-orange-100 shadow-inner overflow-hidden"
          >
            <img
              src="/logo.jpeg"
              alt="Ghar Contractor"
              className="w-full h-full object-contain"
            />
          </div>

          <CardTitle className="text-3xl font-bold text-gray-900">
            Admin Login
          </CardTitle>

          <CardDescription className="text-gray-600">
            Ghar Contractor Dashboard Access
          </CardDescription>
        </CardHeader>

        <CardContent className="px-10 pb-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           focus:border-orange-500 transition"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-base font-semibold text-white
                         bg-gradient-to-r from-orange-500 to-orange-600
                         hover:from-orange-600 hover:to-orange-700
                         shadow-lg hover:shadow-orange-500/40 transition
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </Button>
          </form>

          <p className="mt-8 text-xs text-center text-gray-400">
            Authorized admins only
          </p>
        </CardContent>
      </Card>

      {/* Background glow */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <div className="h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
      </div>
    </div>
  )
}
