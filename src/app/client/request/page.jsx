"use client";

import { useState } from 'react';
import { submitServiceRequest } from '@/actions/client/request.actions';

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    work_type: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await submitServiceRequest(formData);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      // Reset form
      setFormData({
        name: '',
        phone: '',
        area: '',
        work_type: '',
        description: ''
      });
    } else {
      setMessage({ type: 'error', text: result.error });
    }

    setLoading(false);
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

              {/* Success/Error Message */}
              {message.text && (
                <div className={`mb-6 p-4 rounded-md ${
                  message.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name + Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Full Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Phone Number *</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      type="tel"
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
                      name="work_type"
                      value={formData.work_type}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                    >
                      <option value="">Select work type</option>
                      <option value="Repair">Repair</option>
                      <option value="Renovation">Renovation</option>
                      <option value="New Construction">New Construction</option>
                    </select>
                  </div>
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
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md transition-colors"
                >
                  {loading ? '⏳ Submitting...' : '📋 Submit Request'}
                </button>

              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}