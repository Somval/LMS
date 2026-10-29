import React from "react";
import { Check } from "lucide-react";

import Learning from "./steps/CreateAccount";
import Learningsubjects from "./steps/SelectSubject";
import LearningPreference from "./steps/LearningPreference";
import Payment from "./steps/Payment";

export const steps = [
  {
    number: 1,
    label: "Create Account",
    component: Learning,
  },
  {
    number: 2,
    label: "Select Subject",
    component: Learningsubjects,
  },
  {
    number: 3,
    label: "Learning Preference",
    component: LearningPreference,
  },
  {
    number: 4,
    label: "Payment",
    component: Payment,
  },
];

export default function StepIndicator({
  currentStep = 1,
  onStepClick,
}) {
  const activeStep =
    steps.find((step) => step.number === currentStep) ?? steps[0];

  const ActiveComponent = activeStep.component;

  return (
    <div className="flex min-h-full w-full flex-col bg-white">
      {/* Header */}
      <nav className="w-full border-b border-gray-100 bg-white px-8 py-5 shadow-sm">
        {/* Login */}
        <div className="mb-6 flex justify-end">
          <p className="text-xs text-[#8B94AD]">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-[#5B3FF2] hover:underline"
            >
              Log in
            </a>
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <React.Fragment key={step.number}>
                <button
                  type="button"
                  onClick={() => onStepClick?.(step.number)}
                  className="group flex flex-col items-center focus:outline-none"
                >
                  <div
                    className={`
                      flex h-10 w-10 items-center justify-center
                      rounded-full text-sm font-bold
                      transition-all duration-200
                      ${
                        isCompleted
                          ? "bg-[#5B3FF2] text-white"
                          : isCurrent
                          ? "bg-[#172B63] text-white shadow-md ring-4 ring-[#EEF2FF]"
                          : "border-2 border-[#E2E8F0] bg-white text-[#8B94AD] group-hover:border-[#5B3FF2]"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check size={18} strokeWidth={3} />
                    ) : (
                      step.number
                    )}
                  </div>

                  <span
                    className={`
                      mt-2 text-xs font-semibold
                      ${
                        isCurrent || isCompleted
                          ? "text-[#172B63]"
                          : "text-[#8B94AD]"
                      }
                    `}
                  >
                    {step.label}
                  </span>
                </button>

                {index < steps.length - 1 && (
                  <div
                    className={`
                      mx-4 h-[2px] flex-1
                      ${
                        currentStep > step.number
                          ? "bg-[#5B3FF2]"
                          : "bg-[#E2E8F0]"
                      }
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>

      {/* Active Step */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        <ActiveComponent />
      </main>
    </div>
  );
}