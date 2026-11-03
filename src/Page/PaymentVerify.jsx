import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock3, XCircle, Loader2 } from "lucide-react";
import { api } from "../lib/api";
import { HOME_BY_ROLE, useAuth } from "../context/AuthContext";

// Card payments return here from Paystack with ?reference=...
export default function PaymentVerify() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const reference = params.get("reference") || params.get("trxref");
  const [state, setState] = useState("checking"); // checking | CONFIRMED | PENDING | FAILED | error
  const [message, setMessage] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (loading || !user || !reference || started.current) return;
    started.current = true;
    api
      .get(`/payments/verify/${encodeURIComponent(reference)}`)
      .then((res) => setState(res.status))
      .catch((err) => { setState("error"); setMessage(err.message); });
  }, [loading, user, reference]);

  if (loading) return <div className="p-10 text-center text-sm text-gray-400">Loading…</div>;
  if (!user) return <Navigate to="/" replace />;
  if (!reference) return <Navigate to={HOME_BY_ROLE[user.role]} replace />;

  const view = {
    checking: { icon: <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />, title: "Confirming your payment…", body: "Please wait a moment." },
    CONFIRMED: { icon: <CheckCircle2 className="h-10 w-10 text-emerald-500" />, title: "Payment successful", body: "The account is now active." },
    PENDING: { icon: <Clock3 className="h-10 w-10 text-amber-500" />, title: "Payment still processing", body: "We have not received confirmation yet. Check again in a few minutes." },
    FAILED: { icon: <XCircle className="h-10 w-10 text-red-500" />, title: "Payment failed", body: "Your card was not charged. You can try again from your dashboard." },
    error: { icon: <XCircle className="h-10 w-10 text-red-500" />, title: "Could not check this payment", body: message },
  }[state];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center font-sans">
      {view.icon}
      <h1 className="text-2xl font-bold text-gray-900">{view.title}</h1>
      <p className="max-w-sm text-sm text-gray-500">{view.body}</p>
      {state !== "checking" && (
        <button type="button" onClick={() => navigate(HOME_BY_ROLE[user.role])}
          className="mt-2 rounded-xl bg-[#2F327D] px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
          Go to dashboard
        </button>
      )}
    </div>
  );
}
