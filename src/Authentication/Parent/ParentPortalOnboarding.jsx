import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Sidebar from "./sidebar";
import StepIndicator from "./StepIndicator";
import CreateAccountForm from "./CreateAccountForm";
import LinkChildForm from "./LinkChildForm";
import CompletePaymentForm from "./CompletePaymentForm";
import ReceiptUpload from "./ReceiptUpload";
import PaymentSuccess from "./successMessage";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const courseIcon = (name) => (
  <div className="flex h-full w-full items-center justify-center rounded-md bg-[#2F327D] text-sm font-bold text-white">
    {name.charAt(0)}
  </div>
);

const ParentPortalOnboarding = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [child, setChild] = useState(null); // set once a child has been linked
  const [quote, setQuote] = useState(null); // { subjects, amount, currency }
  const [bank, setBank] = useState(null);
  const [method, setMethod] = useState("");
  const [payError, setPayError] = useState("");
  const [paying, setPaying] = useState(false);
  const [bankPayment, setBankPayment] = useState(null); // bank transfer created, waiting for a receipt
  const [receiptSent, setReceiptSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load the price and bank details when the payment step opens.
  useEffect(() => {
    if (currentStep !== 3 || !child) return;
    api.get("/payments/quote", { studentId: child.studentId }).then(setQuote).catch((e) => setPayError(e.message));
    api.get("/payments/bank-details").then(setBank).catch(() => {});
  }, [currentStep, child]);

  const handleBack = () => {
    if (bankPayment) return setBankPayment(null);
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // Step 1: create the parent account (and sign in).
  const handleAccount = async (values) => {
    await register("parent", values);
    setCurrentStep(2);
  };

  // Step 2: a child was linked.
  const handleLinked = (linked) => {
    setChild(linked);
    setCurrentStep(3);
  };

  // Step 3: start the payment.
  const handlePay = async (e) => {
    e.preventDefault();
    if (paying) return;
    if (!method) return setPayError("Choose a payment method.");
    setPayError("");
    setPaying(true);
    try {
      const path = `/payments?studentId=${child.studentId}`;
      if (method === "card") {
        const res = await api.post(path, { method: "CARD" });
        setIsProcessing(true); // brief "redirecting" screen
        window.location.href = res.authorizationUrl;
        return;
      }
      const res = await api.post(path, { method: "BANK_TRANSFER" });
      setBank(res.bank);
      setBankPayment(res.payment);
    } catch (err) {
      setPayError(
        err.status === 503
          ? "Card payments are not available yet. Please choose bank transfer."
          : err.message || "Could not start the payment."
      );
    } finally {
      setPaying(false);
    }
  };

  const handleReceipt = async (file) => {
    await api.upload(`/payments/${bankPayment.id}/proof`, file);
    setReceiptSent(true);
  };

  const courses = (child?.subjects ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    level: s.yearLevel,
    price: quote ? quote.amount / Math.max(1, quote.subjects) : 0,
    icon: courseIcon(s.name),
  }));

  const buttonLabel = bankPayment ? "Submit Receipt" : { 1: "Continue", 2: "Link Child", 3: "Pay Now" }[currentStep];

  if (isProcessing) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white p-6 text-center font-sans">
        <div className="flex w-full max-w-md flex-col items-center space-y-6 animate-in fade-in duration-300">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-[#2F327D] shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Redirecting to payment...
            </h2>

            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              You are being taken to our secure payment page.
            </p>
          </div>

          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-full animate-pulse rounded-full bg-[#2F327D]" />
          </div>
        </div>
      </div>
    );
  }

  if (receiptSent) {
    return (
      <PaymentSuccess
        pending
        childName={child?.fullName?.split(" ")[0]}
        onDashboardClick={() => navigate("/parent/dashboard")}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">

        {/* Sidebar */}
        <aside className="hidden w-[250px] shrink-0 lg:sticky lg:top-0 lg:block lg:h-screen">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex min-w-0 flex-1 flex-col items-start bg-white px-4 sm:px-6 lg:px-8">

          {/* Login Navigation */}
          <div className="mb-8 flex w-full justify-end pt-5 text-xs text-gray-500 sm:text-sm">
            <span>Already have an account?</span>

            <Link
              to="/parent/login"
              className="ml-1 font-semibold text-indigo-600 transition-colors hover:text-indigo-800 hover:underline"
            >
              Log in
            </Link>
          </div>

          {/* Step Progress */}
          <div className="w-full">
            <StepIndicator currentStep={currentStep} />
          </div>

          {/* Form Content */}
          <div className="flex w-full flex-1 flex-col items-start py-8">
            {currentStep === 1 && <CreateAccountForm onNext={handleAccount} />}
            {currentStep === 2 && <LinkChildForm onNext={handleLinked} />}
            {currentStep === 3 && !bankPayment && (
              <form id="onboarding-form" onSubmit={handlePay} className="w-full">
                <CompletePaymentForm
                  selectedCourses={courses}
                  onEditCourses={() => setCurrentStep(2)}
                  onPaymentMethodChange={(m) => { setMethod(m); setPayError(""); }}
                  bank={bank}
                  error={payError}
                />
              </form>
            )}
            {currentStep === 3 && bankPayment && (
              <ReceiptUpload payment={bankPayment} bank={bank} onSubmit={handleReceipt} />
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-auto flex w-full items-center justify-between gap-4 border-t border-gray-100 py-6">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              form="onboarding-form"
              disabled={paying}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2F327D] px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60"
            >
              {buttonLabel}
              {currentStep < 3 && <ArrowRight size={18} />}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentPortalOnboarding;