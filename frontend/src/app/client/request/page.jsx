"use client";

import { useState } from 'react';
import { submitServiceRequest } from '@/actions/client/request.action';

export default function Page() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    area: '',
    workType: '',
    description: '',
    plotSize: '',
    floors: '',
    constructionType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const result = await submitServiceRequest(formData);

      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          fullName: '',
          phoneNumber: '',
          area: '',
          workType: '',
          description: '',
          plotSize: '',
          floors: '',
          constructionType: ''
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Something went wrong');
      }

    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ================= MAIN ================= */}
      <main className="flex-grow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Heading */}
          <h2 className="text-4xl font-bold text-gray-900 text-center">
            Submit a Service Request
          </h2>

          <p className="text-base text-gray-600 text-center mt-3 mb-12">
            Tell us about your project and our team will get back to you within 24 hours.
          </p>

          {/* Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-xl bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-8">

              <h3 className="text-2xl font-bold text-gray-900">
                Service Request Form
              </h3>

              <p className="text-sm text-gray-600 mb-6">
                Fill in your details and we'll get back to you within 24 hours
              </p>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800 text-sm">
                    ✓ Your request has been submitted successfully! We'll contact you within 24 hours.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800 text-sm">
                    ✗ {errorMessage || 'Something went wrong. Please try again.'}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name + Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Full Name *</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Phone Number *</label>
                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                {/* Area + Work Type */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Area / Location *</label>
                    <input
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                      placeholder="Enter your area"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Type of Work *</label>
                    <select
                      name="workType"
                      value={formData.workType}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                    >
                      <option value="" disabled>Select work type</option>
                      <option value="Repair">Repair</option>
                      <option value="Renovation">Renovation</option>
                      <option value="New Construction">New Construction</option>
                    </select>
                  </div>
                </div>

                {/* Plot Size + Floors */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Plot Size (sq ft)</label>
                    <input
                      type="number"
                      name="plotSize"
                      value={formData.plotSize}
                      onChange={handleChange}
                      min="0"
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                      placeholder="e.g. 1200"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Number of Floors</label>
                    <input
                      type="number"
                      name="floors"
                      value={formData.floors}
                      onChange={handleChange}
                      min="0"
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                      placeholder="e.g. 2"
                    />
                  </div>
                </div>

                {/* Construction Type */}
                <div>
                  <label className="text-sm text-gray-600">Construction Type</label>
                  <select
                    name="constructionType"
                    value={formData.constructionType}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                  >
                    <option value="">Select construction type</option>
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm text-gray-600">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                    placeholder="Tell us more about your requirements..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? '⏳ Submitting...' : '📋 Submit Request'}
                </button>

              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}