'use server'

import { createClient } from '@/lib/supabase/server';

export async function submitServiceRequest(formData) {
  try {
    // Validate required fields
    if (!formData.fullName || !formData.phoneNumber || !formData.area || !formData.workType) {
      return {
        success: false,
        error: 'All required fields must be filled'
      };
    }

    const supabase = createClient();

    // Prepare data object matching your database fields exactly
    const requestData = {
      name: formData.fullName,
      phone: formData.phoneNumber,
      area: formData.area,
      work_type: formData.workType,
      description: formData.description || null,
      status: 'New'
    };

    // Add optional fields only if they have values
    if (formData.plotSize) {
      requestData.plot_size = parseInt(formData.plotSize);
    }

    if (formData.floors) {
      requestData.floors = parseInt(formData.floors);
    }

    if (formData.constructionType) {
      requestData.construction_type = formData.constructionType;
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('service_requests')
      .insert([requestData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return {
        success: false,
        error: 'Failed to submit request. Please try again.'
      };
    }

    return {
      success: true,
      data: data[0],
      message: 'Your request has been submitted successfully!'
    };

  } catch (error) {
    console.error('Server action error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
}