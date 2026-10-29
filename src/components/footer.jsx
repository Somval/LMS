import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white px-4 py-8 flex items-center justify-center">
      {/* Main Footer Container */}
      <div className="w-full max-w-6xl rounded-3xl bg-[#1b2559] text-white px-8 py-12 md:px-14 md:py-16 shadow-2xl overflow-hidden relative">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info & Contact (Spans 6 cols) */}
          <div className="md:col-span-6 space-y-6">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 inline-flex group">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
              <span className="text-xl font-bold tracking-wider group-hover:text-blue-400 transition-colors">LMS</span>
            </a>

            {/* Tagline / Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Learning for Every Journey</h3>
              <p className="text-sm text-gray-300 max-w-md leading-relaxed">
                Helping every learner build confidence, develop new skills, and achieve lasting academic success through expert guidance.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 text-sm text-gray-300">
              <a href="https://maps.google.com/?q=Manchester,+United+Kingdom" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors w-fit">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Manchester, United Kingdom</span>
              </a>
              <a href="mailto:hello@learnlms.com" className="flex items-center gap-3 hover:text-white transition-colors w-fit">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>hello@learnlms.com</span>
              </a>
              <a href="tel:+44XXXXXXXXXX" className="flex items-center gap-3 hover:text-white transition-colors w-fit">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+44 XXX XXX XXXX</span>
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links (Spans 2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold tracking-wide text-white uppercase">Platform</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><a href="/portal/student" className="hover:text-white transition-colors">Student Portal</a></li>
              <li><a href="/portal/parent" className="hover:text-white transition-colors">Parent Portal</a></li>
              <li><a href="/portal/tutor" className="hover:text-white transition-colors">Tutor Portal</a></li>
              <li><a href="/portal/admin" className="hover:text-white transition-colors">Admin Portal</a></li>
            </ul>
          </div>

          {/* Column 3: Support Links (Spans 2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold tracking-wide text-white uppercase">Support</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><a href="/help-center" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/faqs" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="/contact-us" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: Company Links (Spans 2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold tracking-wide text-white uppercase">Company</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><a href="/about-us" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/success-stories" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="/partner-with-us" className="hover:text-white transition-colors">Partner With Us</a></li>
              <li><a href="/become-a-tutor" className="hover:text-white transition-colors">Become a Tutor</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          
          {/* Copyright text */}
          <p>© 2026 All Rights Reserved</p>

          {/* Social Icons with SVG */}
          <div className="flex items-center gap-4">
            <span className="text-gray-300 font-medium mr-2">Follow us</span>
            
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Twitter / X */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* Legal / Policy Links */}
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>

        </div>

      </div>
    </footer>
  );
}