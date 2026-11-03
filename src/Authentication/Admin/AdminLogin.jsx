import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { HOME_BY_ROLE, useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) return <Navigate to={HOME_BY_ROLE[user.role]} replace />;

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return setError("Enter your email and password.");
    setError("");
    setSubmitting(true);
    try {
      await login({ email: email.trim(), password, role: "ADMIN" });
      navigate(location.state?.from?.pathname || "/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Could not sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  const field = "w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F7FE] px-4 font-sans">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-2xl bg-white p-8 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin sign in</h1>
          <p className="mt-1 text-sm text-gray-500">LMS System administration</p>
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoComplete="username" className={field} />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" className={field} />
          <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F327D] py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
