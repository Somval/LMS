import React, { useState } from "react";
import OnboardingLayout from "./onboardingLayout";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <OnboardingLayout
      currentStep={currentStep}
      onStepClick={(stepNumber) => setCurrentStep(stepNumber)}
    />
  );
}