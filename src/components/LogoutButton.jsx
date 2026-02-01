'use client'

import { useState } from 'react'
import { logoutAdmin } from '@/actions/admin/auth.actions'

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logoutAdmin()
    } catch (error) {
      console.error('Logout failed:', error)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  )
}