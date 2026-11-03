import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function CreateAccount({ onNext }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Available Country Codes
  const countries = [
    { name: "Nigeria", code: "+234", flag: "🇳🇬" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "Ghana", code: "+233", flag: "🇬🇭" },
    { name: "Kenya", code: "+254", flag: "🇰🇪" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address format.";
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.agreed) {
      newErrors.agreed = "You must agree to the Terms and Privacy Policy.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      // Creates the account and signs the student in, so the later
      // onboarding steps (subjects, payment) can call authenticated endpoints.
      await register("student", {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber?.trim() || undefined,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        agreed: formData.agreed,
      });
      if (onNext) onNext();
    } catch (err) {
      // Show server-side field errors (e.g. "email already exists") next to the form.
      const fieldErrors = {};
      (err.errors || []).forEach((x) => { if (x.field) fieldErrors[x.field] = x.message; });
      setErrors(Object.keys(fieldErrors).length ? fieldErrors : { email: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Header text */}
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-[#111111]">
          Create Your Account
        </h2>
        <p className="mt-1 text-xs font-medium text-[#8B94AD]">
          Let's get you started with your LMS account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-[#111111] mb-1.5">
            Full Name
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-[#8B94AD] pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full h-11 pl-10 pr-4 text-xs font-medium text-[#111111] placeholder-[#A1A5B3] bg-white border rounded-xl focus:outline-none transition-colors ${
                errors.fullName ? "border-red-500 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#3C2EFF]"
              }`}
            />
          </div>
          <div className="h-4 mt-0.5">
            {errors.fullName && <p className="text-[10px] text-red-500 font-medium">{errors.fullName}</p>}
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-[#111111] mb-1.5">
            Email Address
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-[#8B94AD] pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={`w-full h-11 pl-10 pr-4 text-xs font-medium text-[#111111] placeholder-[#A1A5B3] bg-white border rounded-xl focus:outline-none transition-colors ${
                errors.email ? "border-red-500 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#3C2EFF]"
              }`}
            />
          </div>
          <div className="h-4 mt-0.5">
            {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email}</p>}
          </div>
        </div>

        {/* Phone Number with Functional Country Selector */}
        <div>
          <label className="block text-xs font-semibold text-[#111111] mb-1.5">
            Phone Number
          </label>
          <div className={`flex items-center w-full h-11 border rounded-xl bg-white transition-colors relative ${
            errors.phoneNumber ? "border-red-500" : "border-[#E2E8F0] focus-within:border-[#3C2EFF]"
          }`}>
            
            {/* Country Selector Dropdown Trigger */}
            <div 
              type="button"
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="flex items-center gap-1.5 px-3.5 border-r border-[#E2E8F0] bg-slate-50/50 h-full cursor-pointer select-none shrink-0"
            >
              <span className="text-sm">{selectedCountry.flag}</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-[#8B94AD]">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-semibold text-[#111111] ml-0.5">{selectedCountry.code}</span>
            </div>

            {/* Dropdown Menu */}
            {isCountryDropdownOpen && (
              <div className="absolute top-12 left-0 z-50 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-lg py-1">
                {countries.map((c) => (
                  <div
                    key={c.code + c.name}
                    onClick={() => {
                      setSelectedCountry(c);
                      setIsCountryDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#111111] hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                    <span className="text-[#8B94AD] ml-auto">{c.code}</span>
                  </div>
                ))}
              </div>
            )}
            
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full h-full px-4 text-xs font-medium text-[#111111] placeholder-[#A1A5B3] focus:outline-none bg-transparent"
            />
          </div>
          <div className="h-4 mt-0.5">
            {errors.phoneNumber && <p className="text-[10px] text-red-500 font-medium">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-[#111111] mb-1.5">
            Password
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-[#8B94AD] pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={`w-full h-11 pl-10 pr-10 text-xs font-medium text-[#111111] placeholder-[#A1A5B3] bg-white border rounded-xl focus:outline-none transition-colors ${
                errors.password ? "border-red-500 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#3C2EFF]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-[#8B94AD] hover:text-[#111111]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {showPassword ? (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </>
                ) : (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
          <div className="h-4 mt-0.5">
            {errors.password && <p className="text-[10px] text-red-500 font-medium">{errors.password}</p>}
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold text-[#111111] mb-1.5">
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-[#8B94AD] pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full h-11 pl-10 pr-10 text-xs font-medium text-[#111111] placeholder-[#A1A5B3] bg-white border rounded-xl focus:outline-none transition-colors ${
                errors.confirmPassword ? "border-red-500 focus:border-red-500" : "border-[#E2E8F0] focus:border-[#3C2EFF]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 text-[#8B94AD] hover:text-[#111111]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {showConfirmPassword ? (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </>
                ) : (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
          <div className="h-4 mt-0.5">
            {errors.confirmPassword && <p className="text-[10px] text-red-500 font-medium">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex flex-col pt-1">
          <label className="relative flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              className="peer sr-only"
            />
            <div className={`h-4 w-4 rounded border bg-white peer-checked:bg-[#3C2EFF] peer-checked:border-[#3C2EFF] transition-all flex items-center justify-center shrink-0 ${
              errors.agreed ? "border-red-500" : "border-[#E2E8F0]"
            }`}>
              <svg
                className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                viewBox="0 0 12 10"
                fill="none"
              >
                <path
                  d="M1 5L4.5 8.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-[#8B94AD]">
              I agree to the{" "}
              <a href="#terms" className="text-[#3C2EFF] font-semibold hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#privacy" className="text-[#3C2EFF] font-semibold hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>
          <div className="h-4 mt-0.5">
            {errors.agreed && <p className="text-[10px] text-red-500 font-medium">{errors.agreed}</p>}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 bg-[#30336b] hover:bg-[#252854] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{submitting ? "Creating account…" : "Continue"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}