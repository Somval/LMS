
import React from "react";

const StepIndicator = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: "Create Account" },
    { id: 2, label: "Link Child" },
    { id: 3, label: "Complete Payment" },
  ];

  return (
    <div className="mb-8 w-full max-w-2xl">
      <div className="relative flex w-full items-start justify-between">

        {/* Connector Line */}
        <div className="absolute left-[16.67%] right-[16.67%] top-4 h-0.5 -translate-y-1/2 bg-gray-200" />

        {/* Steps */}
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div
              key={step.id}
              className="relative z-10 flex w-1/3 flex-col items-center gap-2"
            >
              {/* Step Circle */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 ${
                  isActive || isCompleted
                    ? "border-indigo-900 bg-indigo-900 text-white"
                    : "border-gray-200 bg-white text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="h-4 w-4"
                    aria-label="Completed"
                  >
                    <path
                      d="m5 12 4 4L19 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>

              {/* Step Label */}
              <span
                className={`max-w-full text-center text-[10px] font-medium leading-4 sm:text-xs ${
                  isActive || isCompleted
                    ? "text-indigo-900"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
