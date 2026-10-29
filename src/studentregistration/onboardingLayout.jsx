import React from "react";
import LmsWelcome from "./sidebar"; 
import StepIndicator from "./registrationSection"; 

export default function OnboardingLayout({ currentStep, onStepClick }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Left Sidebar */}
      <div className="h-full shrink-0">
        <LmsWelcome />
      </div>

      {/* Right Main Content Area */}
      <div className="flex h-full flex-1 flex-col overflow-y-auto">
        <StepIndicator currentStep={currentStep} onStepClick={onStepClick} />
      </div>
    </div>
  );
}