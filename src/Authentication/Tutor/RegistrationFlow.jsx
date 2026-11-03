import React, { useCallback, useRef, useState } from 'react';
import { ChevronRight, ArrowLeft, Loader2 } from 'lucide-react';
import StepIndicator from './stepindicator';

import Step1CreateAccount from '../../components/Tutor/steps/Step1CreateAccount';
import Step2ProfessionalInfo from '../../components/Tutor/steps/Step2ProfessionalInfo';
import Step3Qualifications from '../../components/Tutor/steps/Step3Qualifications';
import Step4Experience from '../../components/Tutor/steps/Step4Experience';
import Step5Documents from '../../components/Tutor/steps/Step5Documents';
import Step6Review from '../../components/Tutor/steps/Step6Review';
import SuccessPage from '../../components/Tutor/SuccessPage'; // Separate Success Component
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

const steps = [
  { id: 1, title: 'Create Account', description: 'Set up your login details' },
  { id: 2, title: 'Professional Info', description: 'Tell us about your background' },
  { id: 3, title: 'Qualifications', description: 'Add your certifications & degrees' },
  { id: 4, title: 'Experience', description: 'Detail your work history' },
  { id: 5, title: 'Documents', description: 'Upload required files' },
  { id: 6, title: 'Review', description: 'Confirm and submit' }
];

const toE164 = (raw = '') => {
  const v = String(raw).trim();
  if (v.startsWith('+')) return v.replace(/[^\d+]/g, '');
  const digits = v.replace(/\D/g, '').replace(/^0/, '');
  return digits ? `+234${digits}` : undefined;
};

export default function RegistrationFlow() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]);
  const [formData, setFormData] = useState({});
  const [extras, setExtras] = useState({}); // state the step components keep (files, experience list, days...)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');

  // Remembers what has already been sent, so retrying a failed submit never duplicates anything.
  const done = useRef({ account: false, qualification: false, experience: false, uploads: {} });

  const setExtra = useCallback((key, value) => setExtras((prev) => ({ ...prev, [key]: value })), []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep || completedSteps.includes(stepId)) {
      setCurrentStep(stepId);
      setError('');
    }
  };

  // Returns an error message, or '' when the step is fine.
  const validate = (step) => {
    const f = formData;
    if (step === 1) {
      if (!f.fullName?.trim() || f.fullName.trim().length < 2) return 'Enter your full name.';
      if (!/^\S+@\S+\.\S+$/.test(f.email || '')) return 'Enter a valid email address.';
      if (!toE164(f.phoneNumber)) return 'Enter your phone number.';
      if ((f.password || '').length < 8 || !/[A-Za-z]/.test(f.password) || !/\d/.test(f.password)) {
        return 'Password must be at least 8 characters with a letter and a number.';
      }
      if (f.password !== f.confirmPassword) return 'Passwords do not match.';
      if (!extras.agreed) return 'Please accept the Terms of Service and Privacy Policy.';
    }
    if (step === 2) {
      if (!f.subjects) return 'Select the subject you teach.';
      if (!f.yearLevels) return 'Select the year levels you teach.';
      if (!f.experience) return 'Select your years of teaching experience.';
    }
    if (step === 3) {
      if (!f.highestQualification) return 'Select your highest qualification.';
      if (!f.institutionName?.trim()) return 'Enter your institution name.';
    }
    if (step === 5) {
      if (!extras.documents?.qualification) return 'Upload your qualification certificate.';
      if (!extras.documents?.governmentId) return 'Upload a government ID.';
    }
    return '';
  };

  // The server work that belongs to each step.
  const saveStep = async (step) => {
    if (step === 1 && !done.current.account) {
      await register('tutor', {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phoneNumber: toE164(formData.phoneNumber),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        agreed: true,
      });
      done.current.account = true;
    }
    if (step === 2) {
      await api.put('/tutors/me', {
        subjectIds: [Number(formData.subjects)],
        yearLevels: [formData.yearLevels],
        experience: formData.experience,
        availableFrom: formData.timeFrom || undefined,
        availableTo: formData.timeTo || undefined,
        availableDays: extras.days || [],
      });
    }
  };

  // Final step: send everything else, then submit the application.
  const submitApplication = async () => {
    const d = done.current;
    if (!d.experience) {
      await api.put('/tutors/me', { experienceHistory: (extras.experiences || []).filter((e) => e.institution || e.role) });
      d.experience = true;
    }
    if (!d.qualification) {
      const title = [formData.highestQualification, formData.fieldOfStudy].filter(Boolean).join(', ');
      await api.post('/tutors/qualifications', {
        title,
        institution: formData.institutionName.trim(),
        year: formData.graduationYear ? Number(formData.graduationYear) : undefined,
      });
      d.qualification = true;
    }
    const files = { ...(extras.documents || {}), additionalCertificate: extras.certificate };
    for (const [kind, file] of Object.entries(files)) {
      if (!file || d.uploads[kind]) continue;
      await api.upload('/tutors/documents', file, { kind });
      d.uploads[kind] = true;
    }
    const res = await api.post('/tutors/me/submit');
    setReference(res.reference);
  };

  const handleNext = async () => {
    if (saving) return;
    const problem = validate(currentStep);
    if (problem) return setError(problem);
    setError('');

    const isLast = currentStep === steps.length;
    setSaving(true);
    if (isLast) setIsSubmitting(true);
    try {
      if (isLast) {
        await submitApplication();
        setIsSubmitted(true);
      } else {
        await saveStep(currentStep);
        const nextStep = currentStep + 1;
        if (!completedSteps.includes(nextStep)) setCompletedSteps([...completedSteps, nextStep]);
        setCurrentStep(nextStep);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1CreateAccount formData={formData} onChange={handleInputChange} onExtra={setExtra} />;
      case 2:
        return <Step2ProfessionalInfo formData={formData} onChange={handleInputChange} onExtra={setExtra} />;
      case 3:
        return <Step3Qualifications formData={formData} onChange={handleInputChange} onExtra={setExtra} />;
      case 4:
        return <Step4Experience formData={formData} onChange={handleInputChange} onExtra={setExtra} />;
      case 5:
        return <Step5Documents formData={formData} onChange={handleInputChange} onExtra={setExtra} />;
      case 6:
        return <Step6Review formData={formData} extras={extras} onEdit={(id) => setCurrentStep(Number(id))} />;
      default:
        return null;
    }
  };

  // Render separate success page upon submission completion
  if (isSubmitted) {
    return (
      <SuccessPage
        referenceId={reference}
        onGoHome={() => navigate('/')}
        onGoDashboard={() => navigate('/tutor/dashboard')}
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
            to="/tutor/login"
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

            {error && (
              <p role="alert" className="mb-3 rounded-md bg-red-50 px-3 py-2 text-left text-sm text-red-600">
                {error}
              </p>
            )}
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
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-950 hover:bg-indigo-900 transition-all active:scale-95 disabled:opacity-50"
              >
                {saving ? 'Saving…' : currentStep === steps.length ? 'Submit Application' : 'Save & Continue'}
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