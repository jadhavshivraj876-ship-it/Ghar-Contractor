'use client'

import React from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* Logo */}
            <div
            className="flex items-center gap-3 "
            >
              <div className="text-orange-500">
                  <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  >
                  <path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7z" />
                  </svg>
              </div>

              <span className="text-2xl font-extrabold tracking-wide text-gray-900 group-hover:text-orange-600 transition-colors">
                  Ghar Contractor
              </span>
            </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* Logout Button */}
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content - Full width, children control their spacing */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="text-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Ghar Contractor — Admin Panel
          </p>
          <p className="text-gray-400 text-xs mt-1">v1.0</p>
        </div>
      </footer>
    </div>
    </ProtectedRoute>
  );
}