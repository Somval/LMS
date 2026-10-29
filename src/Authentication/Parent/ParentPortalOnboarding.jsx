import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

import Sidebar from "./sidebar";
import StepIndicator from "./StepIndicator";
import CreateAccountForm from "./CreateAccountForm";
import LinkChildForm from "./LinkChildForm";
import CompletePaymentForm from "./CompletePaymentForm";
import PaymentSuccess from "./successMessage";

const ParentPortalOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsProcessing(true);

      setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(true);
      }, 3000);
    }
  };

  const buttonLabel = {
    1: "Continue",
    2: "Link Child",
    3: "Pay Now",
  };

  if (isProcessing) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white p-6 text-center font-sans">
        <div className="flex w-full max-w-md flex-col items-center space-y-6 animate-in fade-in duration-300">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-[#2F327D] shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Processing Payment...
            </h2>

            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              Please wait while we verify your transaction and activate your
              account.
            </p>
          </div>

          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-full animate-pulse rounded-full bg-[#2F327D]" />
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <PaymentSuccess
        childName="Olivia"
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
            {currentStep === 1 && <CreateAccountForm />}
            {currentStep === 2 && <LinkChildForm />}
            {currentStep === 3 && <CompletePaymentForm />}
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
              type="button"
              onClick={handleContinue}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2F327D] px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {buttonLabel[currentStep]}
              {currentStep < 3 && <ArrowRight size={18} />}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentPortalOnboarding;