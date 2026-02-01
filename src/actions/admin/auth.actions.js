'use server'

import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function loginAdmin(email, password) {
  const supabase = await createServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/admin/dashboard')
}

export async function logoutAdmin() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

export async function getUser() {
  const supabase = await createServerClient()
  const { data } = await supabase.auth.getUser()
  return data.user
}
