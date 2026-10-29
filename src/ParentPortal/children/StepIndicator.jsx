
import React from "react";
import { Check } from "lucide-react";

import EnterLearnerID from "./EnterLearnerID";
import VerifyOTP from "./VerifyOTP";
import LinkComplete from "./LinkComplete";

export default function StepIndicator({ currentStep, ...props }) {
  const steps = [
    { number: 1, label: "Enter Learner ID" },
    { number: 2, label: "Verify with OTP" },
    { number: 3, label: "Link Complete" },
  ];

  const pages = [
    EnterLearnerID,
    VerifyOTP,
    LinkComplete,
  ];

  const CurrentPage = pages[currentStep - 1];

  return (
    <div className="w-full">
      {/* Step Indicator */}
      <div className="mb-8 w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex w-full items-center justify-between gap-2">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <React.Fragment key={step.number}>
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
                      isCompleted
                        ? "bg-blue-600 text-white"
                        : isCurrent
                        ? "bg-blue-600 text-white ring-4 ring-blue-50"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>

                  <span
                    className={`hidden text-sm font-medium sm:inline-block ${
                      isCurrent || isCompleted
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`mx-1 h-0.5 min-w-3 flex-1 transition-colors duration-200 sm:mx-3 ${
                      currentStep > step.number
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Current Page */}
      <div className="w-full min-w-0">
        {CurrentPage && <CurrentPage {...props} />}
      </div>
    </div>
  );
}
