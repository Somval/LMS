import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fixed import statement string syntax
import successHeroImg from '../../assets/images/41b7ca89c234b18fea098340793d301d0cfa66d0.png';

export default function SuccessPage({ onLoginClick, heroImageSrc }) {
  return (
    <div className="min-h-screen w-full bg-white font-sans text-gray-800 flex flex-col justify-between antialiased">
      {/* Top Header Bar */}
      <div className="w-full px-6 sm:px-12 pt-8 pb-4 flex justify-end items-center">
        <p className="text-xs sm:text-sm font-medium text-gray-500">
          Already have an account?{' '}
          <Link to="/Tutor/login">          <button
            type="button"
            onClick={onLoginClick}
            className="text-[#635BFF] font-semibold hover:underline transition-colors ml-1"
          >
            Log in
          </button>
          </Link>

        </p>
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-xl mx-auto px-6 py-8 flex-1 flex flex-col items-center text-center justify-center">
        
        {/* Success Hero Illustration */}
        <div className="w-full max-w-sm mb-6 flex justify-center">
          <img
            src={heroImageSrc || successHeroImg} 
            alt="Application Submitted Successfully"
            className="w-full h-auto object-contain max-h-60"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
          Application Submitted!
        </h1>

        {/* Subtitle / Paragraph */}
        <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed mb-8">
          Thank you for applying to be a tutor. Our team will review your information and documents. You'll receive an email once your application has been reviewed.
        </p>

        {/* "What happens next?" Info Box */}
        <div className="w-full bg-[#FFF8EB] border border-[#FEF0D5] rounded-2xl p-6 text-left space-y-3.5">
          <h2 className="text-xs sm:text-sm font-bold text-gray-900">
            What happens next?
          </h2>

          <ul className="space-y-3 text-xs text-gray-600">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 fill-emerald-500 stroke-white" />
              <span>Our team reviews your application (usually 3–5 business days)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 fill-emerald-500 stroke-white" />
              <span>We may contact you for additional information</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 fill-emerald-500 stroke-white" />
              <span>You'll receive an email with the outcome</span>
            </li>
          </ul>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
}