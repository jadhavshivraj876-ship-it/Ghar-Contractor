import React from "react";
import Link from "next/link";

export default function ClientLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Sticky */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9">
                <img src="/logo.jpeg" alt="Ghar Contractor" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-extrabold tracking-wide text-gray-900 group-hover:text-orange-600 transition-colors">
                Ghar Contractor
              </span>
            </Link>


          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/client/cost-estimator"
              className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              Cost Estimator
            </Link>
            <Link
              href="/client/request"
              className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              Request Services
            </Link>
          </nav>

          {/* Admin Button */}
          <Link
            href="/admin/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-medium transition-colors shadow-sm"
          >
            Admin
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">
            {/* Company Info */}
            <div className="pr-8">
              <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-90 transition">
                <div className="w-9 h-9">
                  <img src="/logo.jpeg" alt="Ghar Contractor" className="w-full h-full object-contain" />
                </div>
                <span className="text-xl font-bold">Ghar Contractor</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Your trusted partner for construction, renovation, and repair
                services. Building dreams, one project at a time.
              </p>
              <div className="flex items-center gap-2 text-gray-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>+91 XXXXX XXXXX</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/client/request"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Request Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/client/cost-estimator"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cost Estimator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    New Construction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Renovation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Repairs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Consultation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Ghar Contractor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}