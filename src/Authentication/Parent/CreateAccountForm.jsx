
import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const CreateAccountForm = ({ onNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    const form = new FormData(e.currentTarget);
    const digits = String(form.get("phone") || "").replace(/\D/g, "").replace(/^0/, "");

    setSubmitting(true);
    try {
      // onNext registers the account and throws if the server rejects it.
      await onNext?.({
        fullName: String(form.get("fullName") || "").trim(),
        email: String(form.get("email") || "").trim(),
        phoneNumber: digits ? `+234${digits}` : undefined,
        password,
        confirmPassword,
        agreed: true, // the terms checkbox is required by the form itself
      });
    } catch (err) {
      setError(err.message || "Could not create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full min-w-0 rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600";

  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Form Header */}
      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Create Your Account
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Manage your child's learning, subscriptions and track their progress.
        </p>
      </div>

      {/* Account Form */}
      <form id="onboarding-form" onSubmit={handleSubmit} className="w-full space-y-5">
        {/* Full Name */}
        <div className="w-full space-y-2">
          <label htmlFor="fullName" className={labelClass}>
            Full Name
          </label>

          <div className="relative flex w-full items-center">
            <User className="pointer-events-none absolute left-3.5 h-5 w-5 text-gray-400" />

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="w-full space-y-2">
          <label htmlFor="email" className={labelClass}>
            Email Address
          </label>

          <div className="relative flex w-full items-center">
            <Mail className="pointer-events-none absolute left-3.5 h-5 w-5 text-gray-400" />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="w-full space-y-2">
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>

          <div className="flex w-full min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
            <div className="flex shrink-0 items-center gap-2 border-r border-gray-200 bg-gray-50 px-4">
              <span className="text-base" aria-hidden="true">
                🇳🇬
              </span>
              <span className="text-sm font-medium text-gray-600">
                +234
              </span>
            </div>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              autoComplete="tel-national"
              required
              className="w-full min-w-0 bg-transparent px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Password */}
        <div className="w-full space-y-2">
          <label htmlFor="password" className={labelClass}>
            Password
          </label>

          <div className="relative flex w-full items-center">
            <Lock className="pointer-events-none absolute left-3.5 h-5 w-5 text-gray-400" />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              className={`${inputClass} pr-12`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-3 flex items-center justify-center rounded-md p-1.5 text-gray-400 transition hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="w-full space-y-2">
          <label htmlFor="confirmPassword" className={labelClass}>
            Confirm Password
          </label>

          <div className="relative flex w-full items-center">
            <Lock className="pointer-events-none absolute left-3.5 h-5 w-5 text-gray-400" />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              required
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "password-error" : undefined}
              className={`${inputClass} pr-12 ${
                error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              }`}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              aria-pressed={showConfirmPassword}
              className="absolute right-3 flex items-center justify-center rounded-md p-1.5 text-gray-400 transition hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {error && (
            <p id="password-error" className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Terms Agreement */}
        <div className="flex w-full items-start gap-3 pt-1">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 text-indigo-900 focus:ring-indigo-500"
          />

          <label
            htmlFor="terms"
            className="text-sm leading-5 text-gray-500"
          >
            I agree to the{" "}
            <a
              href="#terms"
              className="font-medium text-indigo-600 hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#privacy"
              className="font-medium text-indigo-600 hover:underline"
            >
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Form submission */}
        <button type="submit" className="hidden">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
