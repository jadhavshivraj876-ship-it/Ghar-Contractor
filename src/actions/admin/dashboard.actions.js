'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getAllRequests() {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('service_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching requests:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function updateRequestStatus(requestId, newStatus) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('service_requests')
    .update({ status: newStatus })
    .eq('id', requestId)
    .select()

  if (error) {
    console.error('Error updating status:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/dashboard')
  
  return { success: true, data: data[0] }
}