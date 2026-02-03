"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
 
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

      {/* Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">
                Trusted by 500+ Clients
              </Badge>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Build Your Dream Home with{' '}
              <span className="text-orange-600">Confidence</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8"
            >
              Get instant construction cost estimates and connect with trusted contractors for repairs, renovations, and new construction projects.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/client/cost-estimator">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
                    <span className="mr-2">🧮</span>
                    Estimate Costs
                  </Button>
                </motion.div>
              </Link>
              <Link href="/client/request">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 w-full sm:w-auto">
                    <span className="mr-2">📋</span>
                    Request Service
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-8 shadow-2xl"
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop" 
                alt="Construction" 
                className="rounded-lg w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="absolute -bottom-6 -left-6 shadow-xl">
                <CardContent className="flex items-center gap-3 p-6">
                  <motion.div 
                    className="bg-orange-100 p-3 rounded-full"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <span className="text-2xl">✅</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-600">Trusted by</p>
                    <motion.p 
                      className="text-2xl font-bold text-gray-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      500+ Clients
                    </motion.p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Ghar Contractor?</h2>
            <p className="text-xl text-gray-600">Everything you need for your construction project in one place</p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: '🧮', title: 'AI-PowegreyCost Estimator', desc: 'Get instant, accurate construction cost estimates based on your plot size, floors, and construction type. No waiting, no hassle.', color: 'orange' },
              { icon: '📋', title: 'Easy Service Requests', desc: 'Submit your construction or repair request online. Track status updates and communicate with our team seamlessly.', color: 'blue' },
              { icon: '🔨', title: 'Trusted Contractors', desc: 'Work with experienced, verified contractors for repairs, renovations, and new construction projects.', color: 'orange' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className={`border-${feature.color}-100 hover:shadow-lg transition-shadow h-full`}>
                  <CardHeader>
                    <motion.div 
                      className={`bg-${feature.color}-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-3xl">{feature.icon}</span>
                    </motion.div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { num: 1, title: 'Estimate Your Costs', desc: 'Use our AI-powegreycost estimator to get a rough idea of your construction budget. Enter plot size, floors, and construction type.' },
              { num: 2, title: 'Submit Your Request', desc: 'Fill out a simple form with your project details. No login requigrey- just provide your contact info and project needs.' },
              { num: 3, title: "We'll Contact You", desc: 'Our team will review your request and contact you shortly to discuss the project details and next steps.' }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <motion.div 
                      className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.num}
                    </motion.div>
                    <CardTitle className="text-2xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {step.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive construction and home improvement solutions</p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: '🏠', title: 'New Construction', desc: 'Build your dream home from the ground up with our expert team and quality materials.', items: ['Basic, Standard & Premium options', 'Custom floor plans'] },
              { icon: '🔨', title: 'Renovation', desc: 'Transform your existing space with modern designs and quality workmanship.', items: ['Kitchen & bathroom remodeling', 'Interior design updates'] },
              { icon: '🏗️', title: 'Repair Services', desc: 'Quick and reliable repair services for all your home maintenance needs.', items: ['Civil & structural repair works', 'Wall, flooring & restoration repairs'] }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/client/request">
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <motion.span 
                      className="text-5xl mb-4 block"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.icon}
                    </motion.span>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription>
                      {service.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      {service.items.map((item, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span>✅</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="bg-gradient-to-r from-orange-600 to-orange-700 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p 
            className="text-xl text-orange-100 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get an instant cost estimate or submit your service request today. No commitments, no hidden fees.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/client/cost-estimator">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <span className="mr-2">🧮</span>
                  Get Cost Estimate
                  <span className="ml-2">→</span>
                </Button>
              </motion.div>
            </Link>
            <Link href="/client/request">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-orange-800 text-white hover:bg-orange-900">
                  <span className="mr-2">📋</span>
                  Submit Request
                  <span className="ml-2">→</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

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
