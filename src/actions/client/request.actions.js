'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Submit a new service request to Supabase
 * @param {Object} formData - Service request data
 * @returns {Object} - Success or error response
 */
export async function submitServiceRequest(formData) {
  try {
    // Validate required fields
    const { name, phone, area, work_type, description } = formData

    if (!name || !phone || !area || !work_type) {
      return {
        success: false,
        error: 'Please fill in all required fields'
      }
    }

    // Validate phone number (basic Indian phone validation)
    const phoneRegex = /^[6-9]\d{9}$/
    const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+91/, '')
    
    if (!phoneRegex.test(cleanPhone)) {
      return {
        success: false,
        error: 'Please enter a valid 10-digit phone number'
      }
    }

    // Create Supabase client
    const supabase = await createServerClient()

    // Insert service request into database
    const { data, error } = await supabase
      .from('service_requests')
      .insert([
        {
          name: name.trim(),
          phone: cleanPhone,
          area: area.trim(),
          work_type,
          description: description?.trim() || null,
          status: 'New',
          plot_size: null,
          floors: null,
          construction_type: null,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return {
        success: false,
        error: 'Failed to submit request. Please try again.'
      }
    }

    // Revalidate the admin dashboard to show new request
    revalidatePath('/admin/dashboard')

    return {
      success: true,
      message: 'Request submitted successfully! We will contact you within 24 hours.',
      data: data[0]
    }

  } catch (error) {
    console.error('Server action error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}

/**
 * Submit a service request from cost estimator (with construction details)
 * @param {Object} formData - Service request data with construction details
 * @returns {Object} - Success or error response
 */
export async function submitRequestFromEstimator(formData) {
  try {
    const { 
      name, 
      phone, 
      area, 
      work_type, 
      description,
      plot_size,
      floors,
      construction_type
    } = formData

    if (!name || !phone || !area || !work_type) {
      return {
        success: false,
        error: 'Please fill in all required fields'
      }
    }

    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/
    const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+91/, '')
    
    if (!phoneRegex.test(cleanPhone)) {
      return {
        success: false,
        error: 'Please enter a valid 10-digit phone number'
      }
    }

    // Create Supabase client
    const supabase = await createServerClient()

    // Insert service request with construction details
    const { data, error } = await supabase
      .from('service_requests')
      .insert([
        {
          name: name.trim(),
          phone: cleanPhone,
          area: area.trim(),
          work_type,
          description: description?.trim() || null,
          plot_size: plot_size || null,
          floors: floors || null,
          construction_type: construction_type || null,
          status: 'New',
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return {
        success: false,
        error: 'Failed to submit request. Please try again.'
      }
    }

    // Revalidate the admin dashboard
    revalidatePath('/admin/dashboard')

    return {
      success: true,
      message: 'Request submitted successfully! We will contact you within 24 hours.',
      data: data[0]
    }

  } catch (error) {
    console.error('Server action error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}
