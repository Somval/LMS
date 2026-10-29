import React, { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <OnboardingLayout
      currentStep={currentStep}
      onStepClick={(stepNumber) => setCurrentStep(stepNumber)}
    />
  );
}