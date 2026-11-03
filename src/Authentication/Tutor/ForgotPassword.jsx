
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  LockKeyhole,
  CheckCircle2,
  Loader2,
  Home,
} from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Frontend-only demonstration. No email is actually sent.
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setSuccess(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />

          <p className="mt-5 text-sm font-semibold text-slate-800">
            Processing your request...
          </p>
        </div>
      )}

      {/* Header */}
      <header className="w-full px-5 py-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-indigo-700"
        >
          <Home className="h-4 w-4" />
          Go Back Home
        </button>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-10 sm:px-6">

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
            <LockKeyhole className="h-7 w-7 text-indigo-700" />
          </div>
        </div>

        {/* Heading */}
        
        <div className="mb-8 text-center">
          
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Forgot Password?
          </h1>
          

         
        </div>

        {/* Success State */}
        {success ? (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-7 w-7 text-emerald-600" />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Request Submitted!
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your password recovery request has been recorded for:
            </p>

            <p className="mt-2 break-all text-sm font-semibold text-indigo-700">
              {email.trim()}
            </p>

            

            <button
              type="button"
              onClick={() => navigate("/tutor/login")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-950 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-indigo-900"
            >
              Back to Login
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setEmail("");
              }}
              className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Try another email
            </button>
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              <div>
                <label
                  htmlFor="recovery-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="recovery-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="name@example.com"
                    autoComplete="email"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "recovery-error" : undefined}
                    className={`w-full rounded-xl border bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 ${
                      error
                        ? "border-red-400 focus:border-red-400"
                        : "border-slate-200 focus:border-indigo-600"
                    }`}
                  />
                </div>

                {error && (
                  <p
                    id="recovery-error"
                    role="alert"
                    className="mt-2 text-xs text-red-500"
                  >
                    {error}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-indigo-950 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-900 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Send Recovery Request
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Back to Login */}
            <button
              type="button"
              onClick={() => navigate("/Tutor/login")}
              className="mx-auto mt-7 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </button>
          </>
        )}

        {/* Security Note */}
        
      </main>

      {/* Footer */}
      <footer className="w-full px-5 py-6 text-center">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Tutor Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
