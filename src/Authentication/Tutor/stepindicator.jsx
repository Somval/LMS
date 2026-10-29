import React from 'react';
import { Check } from 'lucide-react';

export default function StepIndicator({ steps, currentStep, completedSteps, onStepClick }) {
  return (
    <div className="w-full  p-6 md:p-10 overflow-x-auto">
      <div className="min-w-[700px] flex items-center justify-between relative px-2">
        {steps.map((step, index) => {
          const isCurrent = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id) && step.id < currentStep;
          const isClickable = step.id <= currentStep || completedSteps.includes(step.id);

          return (
            <React.Fragment key={step.id}>
              {/* Step Item */}
              <div 
                onClick={() => onStepClick(step.id)}
                className={`flex flex-col items-center group relative z-10 ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'}`}
              >
                {/* Circle */}
                <div 
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 shadow-xs ${
                    isCurrent 
                      ? 'bg-indigo-950 text-white ring-4 ring-indigo-100 scale-105' 
                      : isCompleted
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-indigo-900 border-2 border-indigo-200/80 group-hover:border-indigo-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>

                {/* Label */}
                <span 
                  className={`mt-3 text-xs md:text-sm font-medium tracking-tight transition-colors whitespace-nowrap ${
                    isCurrent 
                      ? 'text-indigo-950 font-bold' 
                      : isCompleted
                      ? 'text-indigo-900 font-medium'
                      : 'text-slate-500 group-hover:text-slate-800'
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 bg-slate-200 relative -top-5">
                  <div 
                    className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-500"
                    style={{ 
                      width: currentStep > step.id ? '100%' : '0%' 
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}