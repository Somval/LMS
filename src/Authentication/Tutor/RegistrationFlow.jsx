import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Loader2 } from 'lucide-react';
import StepIndicator from './stepindicator';

import Step1CreateAccount from '../../components/Tutor/steps/Step1CreateAccount';
import Step2ProfessionalInfo from '../../components/Tutor/steps/Step2ProfessionalInfo';
import Step3Qualifications from '../../components/Tutor/steps/Step3Qualifications';
import Step4Experience from '../../components/Tutor/steps/Step4Experience';
import Step5Documents from '../../components/Tutor/steps/Step5Documents';
import Step6Review from '../../components/Tutor/steps/Step6Review';
import SuccessPage from '../../components/Tutor/SuccessPage'; // Separate Success Component
import { Link } from 'react-router-dom';

const steps = [
  { id: 1, title: 'Create Account', description: 'Set up your login details' },
  { id: 2, title: 'Professional Info', description: 'Tell us about your background' },
  { id: 3, title: 'Qualifications', description: 'Add your certifications & degrees' },
  { id: 4, title: 'Experience', description: 'Detail your work history' },
  { id: 5, title: 'Documents', description: 'Upload required files' },
  { id: 6, title: 'Review', description: 'Confirm and submit' }
];

export default function RegistrationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep || completedSteps.includes(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      if (!completedSteps.includes(nextStep)) {
        setCompletedSteps([...completedSteps, nextStep]);
      }
      setCurrentStep(nextStep);
    } else {
      // Trigger submission loader then switch to separate Success Page
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 2000);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1CreateAccount formData={formData} onChange={handleInputChange} />;
      case 2:
        return <Step2ProfessionalInfo formData={formData} onChange={handleInputChange} />;
      case 3:
        return <Step3Qualifications formData={formData} onChange={handleInputChange} />;
      case 4:
        return <Step4Experience formData={formData} onChange={handleInputChange} />;
      case 5:
        return <Step5Documents formData={formData} onChange={handleInputChange} />;
      case 6:
        return <Step6Review formData={formData} />;
      default:
        return null;
    }
  };

  // Render separate success page upon submission completion
  if (isSubmitted) {
    return (
      <SuccessPage
        referenceId={`#APP-${Math.floor(100000 + Math.random() * 900000)}`}
        onGoHome={() => window.location.reload()}
        onGoDashboard={() => alert("Redirecting to dashboard...")}
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-between font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white bg-white relative">
      
      {/* Preloader Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <div className="text-center">
            <p className="text-base font-semibold text-slate-900">Submitting Application...</p>
            <p className="text-xs text-slate-400 mt-1">Please wait while we verify your details</p>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="w-full px-6 sm:px-10 md:px-16 pt-8 pb-4 flex justify-end items-center">
        <p className="text-sm font-medium text-[#7D7C83]">
          Already have an account?{' '}
          <Link
            to="/Tutor/login"
                        className="text-[#635BFF] font-semibold hover:underline transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Main Container */}
      <main className="w-full px-6 sm:px-10 md:px-16 lg:px-20 py-4 md:py-8 flex-1 flex flex-col items-center">
        
        {/* Step Indicator */}
        <div className="w-full mb-10">
          <StepIndicator 
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Dynamic Tab Panel */}
        <div className="w-full bg-white p-0 sm:p-4 mb-8 transition-all flex-1 flex flex-col">
          <div className="w-full text-center flex-1 flex flex-col justify-between">
            <div>
             
              {/* Step Content */}
              <div className="mb-8 w-full text-left">
                {renderStepContent()}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-6 mt-auto border-t border-slate-100">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1 || isSubmitting}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  currentStep === 1 
                    ? 'text-slate-300 bg-slate-100 cursor-not-allowed' 
                    : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:scale-95'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-950 hover:bg-indigo-900 transition-all active:scale-95 disabled:opacity-50"
              >
                {currentStep === steps.length ? 'Submit Application' : 'Save & Continue'}
                {currentStep !== steps.length && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-slate-400 border-t border-slate-100">
        &copy; 2026 ProPortal Inc. All rights reserved.
      </footer>
    </div>
  );
}