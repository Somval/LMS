import React, { useState } from "react";
import EnterLearnerID from "./EnterLearnerIDsections";
import VerifyOtp from "./VerifywithOTP";
import Linkcomplete from "./LinkComplete";// Step 3 Layout Container

const steps = [
  { number: 1, label: "Enter Learner ID" },
  { number: 2, label: "Verify with OTP" },
  { number: 3, label: "Link Complete" },
];

export default function LinkChildren({
  initialStep = 1,
  onComplete,
  onNavigateDashboard,
  onNavigateLinkedChildren,
}) {
  const [currentStep, setCurrentStep] = useState(
    Math.min(3, Math.max(1, initialStep))
  );

  const [learnerId, setLearnerId] = useState("");
  const [relationship, setRelationship] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // Navigation handlers for completion step
  const handleGoToDashboard = () => {
    if (onNavigateDashboard) {
      onNavigateDashboard();
    } else {
      window.location.href = "/parent/dashboard";
    }
  };

  const handleGoToLinkedChildren = () => {
    if (onNavigateLinkedChildren) {
      onNavigateLinkedChildren();
    } else if (onComplete) {
      onComplete();
    } else {
      window.location.href = "/student/dashboard";
    }
  };

  const handleNext = (data) => {
    setError("");

    if (currentStep === 1) {
      if (data?.learnerId) setLearnerId(data.learnerId);
      if (data?.relationship) setRelationship(data.relationship);

      const activeId = data?.learnerId || learnerId;
      if (!activeId.trim()) {
        setError("Please enter your child's Learner ID.");
        return;
      }

      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      const activeOtp = typeof data === "string" ? data : otp;
      if (typeof data === "string") setOtp(data);

      if (!/^\d{6}$/.test(activeOtp)) {
        setError("Please enter the complete 6-digit verification code.");
        return;
      }

      setCurrentStep(3);
      return;
    }
  };

  const goToStep = (step) => {
    if (step < currentStep) {
      setError("");
      setCurrentStep(step);
    }
  };

  return (
    <main className="w-full min-w-0 max-w-none p-4 font-[Inter] sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          aria-label="Go back"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <svg
            width="25"
            height="21"
            viewBox="0 0 25 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.9754 0.274587C10.6093 -0.0915292 10.0157 -0.0915292 9.64959 0.274587L0.274587 9.64959C-0.0915295 10.0157 -0.0915295 10.6093 0.274587 10.9754L9.64959 20.3504C10.0157 20.7165 10.6093 20.7165 10.9754 20.3504C11.3415 19.9843 11.3415 19.3907 10.9754 19.0246L3.20083 11.25H23.4375C23.9553 11.25 24.375 10.8303 24.375 10.3125C24.375 9.79473 23.9553 9.375 23.4375 9.375H3.20082L10.9754 1.60041C11.3415 1.2343 11.3415 0.640704 10.9754 0.274587Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <h1 className="text-2xl font-black tracking-tight text-black sm:text-[28px]">
          Link a Child
        </h1>
      </div>

      {/* Step Indicator */}
      <section
        aria-label="Child linking progress"
        className="mt-6 w-full rounded-xl border border-slate-200/80 bg-white p-4 sm:p-6"
      >
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const canClick = step.number < currentStep;

            return (
              <React.Fragment key={step.number}>
                <button
                  type="button"
                  onClick={() => goToStep(step.number)}
                  disabled={!canClick}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`group flex min-w-0 items-center gap-2 ${
                    canClick ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      isCurrent || isCompleted
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isCompleted ? "✓" : step.number}
                  </span>

                  <span
                    className={`hidden text-sm sm:inline ${
                      isCurrent
                        ? "font-semibold text-blue-600"
                        : isCompleted
                        ? "font-medium text-slate-700 group-hover:text-blue-600"
                        : "font-medium text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>

                {index < steps.length - 1 && (
                  <div className="mx-1 h-0.5 min-w-3 flex-1 overflow-hidden rounded-full bg-slate-200 sm:mx-3">
                    <div
                      className={`h-full rounded-full bg-blue-600 transition-all duration-300 ${
                        isCompleted ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Form Content */}
      <section className="mt-6 w-full p-5 transition-all sm:p-8">
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-600 font-medium"
          >
            {error}
          </div>
        )}

        {/* Step 1: Enter Learner ID */}
        {currentStep === 1 && (
          <EnterLearnerID
            learnerId={learnerId}
            setLearnerId={setLearnerId}
            relationship={relationship}
            setRelationship={setRelationship}
            setError={setError}
            onNext={handleNext}
          />
        )}

        {/* Step 2: Verify OTP */}
        {currentStep === 2 && (
          <VerifyOtp
            otp={otp}
            setOtp={setOtp}
            error={error}
            setError={setError}
            onNext={handleNext}
            onChangeLearnerId={() => setCurrentStep(1)}
          />
        )}

        {/* Step 3: Completion */}
        {currentStep === 3 && (
          <Linkcomplete
            onGoToDashboard={handleGoToDashboard}
            onGoToLinkedChildren={handleGoToLinkedChildren}
          />
        )}
      </section>
    </main>
  );
}