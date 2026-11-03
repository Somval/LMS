
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Check,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage({
  onRegisterClick,
  onLoginSuccess,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      await login({ email: formData.email.trim(), password: formData.password, role: "PARENT" });

      setSuccessMessage(
        "Login successful! Redirecting to your dashboard..."
      );

      // Notify the parent component if a callback was provided.
      if (onLoginSuccess) {
        await onLoginSuccess(formData);
      }

      // Navigate to the parent dashboard after successful login.
      navigate(location.state?.from?.pathname || "/parent/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(
        error?.message || "Login failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-white font-sans text-gray-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Full-Screen Preloader */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-white/90 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />

          <div className="text-center">
            <p className="text-base font-semibold text-slate-900">
              Logging you in...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Please wait while we verify your credentials
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-8">
        {/* Header */}
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back
          </h1>

          <p className="text-xs text-gray-400 sm:text-sm">
            Please enter your credentials to access your account.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div
            role="status"
            className="mb-5 flex animate-fade-in items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50 p-3.5 text-xs font-medium text-emerald-700"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-100 bg-red-50 p-3.5 text-xs font-medium text-red-600"
          >
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="login-email"
              className="mb-1.5 block text-xs font-semibold text-slate-800"
            >
              Email Address
            </label>

            <div className="relative">
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3.5 text-xs text-slate-900 transition-all placeholder-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />

              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold text-slate-800"
              >
                Password
              </label>

              <button
                type="button"
                onClick={() =>
                  navigate("/parent/forgot-password")
                }
                className="cursor-pointer border-none bg-transparent p-0 text-[11px] font-semibold text-[#635BFF] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-10 text-xs text-slate-900 transition-all placeholder-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />

              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 transition-colors hover:text-gray-600"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <label className="relative flex cursor-pointer select-none items-center gap-2.5">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="peer sr-only"
              />

              <span className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white transition-all peer-checked:border-indigo-600 peer-checked:bg-indigo-600">
                <Check className="h-3 w-3 stroke-[3] text-white opacity-0 transition-opacity peer-checked:opacity-100" />
              </span>

              <span className="text-xs font-medium text-gray-500">
                Keep me logged in
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-950 px-5 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>Log In</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Optional Registration Link */}
        {onRegisterClick && (
          <p className="mt-6 text-center text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onRegisterClick}
              className="font-semibold text-[#635BFF] hover:underline"
            >
              Register
            </button>
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} ProPortal Inc. All rights reserved.
      </footer>
    </div>
  );
}
