import React, { useState } from "react";
import AppLayout from "./registartionlayout";
import RegistrationNavbar from "../../components/StudentComponent/RegistrationNavbar";

import CreateAccount from "./steps/createAccount";
import SelectSubject from "./steps/subjectselection";
import LearningPreference from "./steps/learningselection";

import RegistrationSuccess from "./RegistrationSuccess";

export default function OnboardingStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState(null);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handlePaymentComplete = (paymentDetails) => {
    setRegistrationData(paymentDetails);
    setCurrentStep(5); // Move to success step
  };

  const handleGoToDashboard = () => {
    // Handle navigation to your dashboard, e.g., using router or window.location
    window.location.href = '/student/dashboard'; 
  };

  const steps = [
    { number: 1, label: "Create Account", component: <CreateAccount onNext={handleNext} /> },
    { number: 2, label: "Select Subject", component: <SelectSubject onNext={handleNext} onBack={handleBack} /> },
    { number: 3, label: "Learning Preference", component: <LearningPreference onNext={handleNext} onBack={handleBack} /> },
    { number: 4, label: "Account Setup Complete", component: <RegistrationSuccess onGoToDashboard={handleGoToDashboard} /> },
  ];

  const activeStep = steps.find((step) => step.number === currentStep);
  const isFinished = currentStep === 5;

  return (
    <AppLayout>
      <div className="flex min-h-screen w-full flex-col">
        {/* TOP NAVBAR */}
        <RegistrationNavbar />

        {/* STEPPER HEADER INDICATOR (Hidden on Step 5) */}
        {!isFinished && (
          <section className="w-full">
            <div className="w-full overflow-x-auto">
              <div className="mx-auto flex min-w-[520px] items-start px-4 py-5 sm:min-w-[600px] sm:px-6 sm:py-6 lg:min-w-0 lg:max-w-3xl lg:px-0">
                {steps.slice(0, 4).map((step, index) => {
                  const isActive = step.number === currentStep;
                  const isCompleted = step.number < currentStep;
                  const isLast = index === 3;

                  return (
                    <React.Fragment key={step.number}>
                      <div className="flex w-[100px] shrink-0 flex-col items-center sm:w-[110px] lg:w-auto lg:flex-1">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 sm:h-10 sm:w-10 sm:text-sm ${
                            isActive
                              ? "bg-[#2F327D] text-white shadow-md shadow-[#2F327D]"
                              : isCompleted
                              ? "bg-[#2F327D] text-white"
                              : "border border-[#E2E8F0] bg-white text-[#94A3B8]"
                          }`}
                        >
                          {step.number}
                        </div>
                        <span
                          className={`mt-2 whitespace-nowrap text-[10px] font-semibold tracking-wide sm:text-xs ${
                            isActive || isCompleted ? "text-[#172B63]" : "text-[#94A3B8]"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {!isLast && (
                        <div className="mt-[18px] h-[2px] min-w-[30px] flex-1 bg-[#E2E8F0] sm:min-w-[45px] lg:min-w-[50px]" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CONTENT */}
        <main className="flex w-full flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
          <div className="w-full min-w-0 flex-1 flex justify-center items-center">
            {activeStep?.component}
          </div>
        </main>
      </div>
    </AppLayout>
  );
}