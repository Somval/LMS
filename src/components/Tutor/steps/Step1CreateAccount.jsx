import React, { useEffect, useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ChevronDown } from 'lucide-react';

export default function Step1CreateAccount({ formData, onChange, onExtra }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  useEffect(() => { onExtra?.('agreed', agreedToTerms); }, [agreedToTerms, onExtra]);

  return (
    <div className="w-full text-left font-sans">
      {/* Header Section */}
      <div className="mb-6 ">
        <h2 className="text-2xl sm:text-3xl  font-bold text-slate-900 tracking-tight">
          Create Your Account
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Let's get you started with your LMS account.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-5">
        {/* Full Name Field */}
        <div className="w-full">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
            Full Name
          </label>
          <div className="relative flex items-center w-full">
            <User className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              name="fullName"
              value={formData?.fullName || ''}
              onChange={onChange}
              placeholder="Enter your full name"
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
          </div>
        </div>

        {/* Email Address Field */}
        <div className="w-full">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
            Email Address
          </label>
          <div className="relative flex items-center w-full">
            <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="email"
              name="email"
              value={formData?.email || ''}
              onChange={onChange}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="w-full">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
            Phone Number
          </label>
          <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden w-full focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition-all">
            {/* Country Selector Prefix */}
            <div className="flex items-center gap-1.5 px-3 py-3 border-r border-slate-200 bg-slate-50/50 cursor-pointer select-none shrink-0">
              <span className="text-base leading-none" role="img" aria-label="Nigeria Flag">
                🇳🇬
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs sm:text-sm font-medium text-slate-700 ml-1">
                +234
              </span>
            </div>

            <input
              type="tel"
              name="phoneNumber"
              value={formData?.phoneNumber || ''}
              onChange={onChange}
              placeholder="Enter your phone number"
              className="w-full px-3 py-3 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="w-full">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
            Password
          </label>
          <div className="relative flex items-center w-full">
            <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData?.password || ''}
              onChange={onChange}
              placeholder="Create a password"
              className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="w-full">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
            Confirm Password
          </label>
          <div className="relative flex items-center w-full">
            <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData?.confirmPassword || ''}
              onChange={onChange}
              placeholder="Confirm your password"
              className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="pt-2 flex items-center gap-2.5 w-full">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs sm:text-sm text-slate-700 cursor-pointer">
            I agree to the{' '}
            <a href="#terms" className="text-indigo-600 font-medium hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="text-indigo-600 font-medium hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
      </form>
    </div>
  );
}