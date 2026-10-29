import React, { useState, useEffect } from "react";

export default function EnterLearnerID({ 
  onNext, 
  learnerId = "", 
  setLearnerId, 
  relationship = "", 
  setRelationship, 
  setError 
}) {
  const [internalLearnerId, setInternalLearnerId] = useState(learnerId);
  const [internalRelationship, setInternalRelationship] = useState(relationship);

  // Keep local state in sync if parent props change
  useEffect(() => {
    setInternalLearnerId(learnerId);
  }, [learnerId]);

  useEffect(() => {
    setInternalRelationship(relationship);
  }, [relationship]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!internalLearnerId.trim()) {
      setError?.("Please enter your child's unique learner ID.");
      return;
    }
    
    if (!internalRelationship) {
      setError?.("Please select your relationship to the learner.");
      return;
    }

    setError?.("");
    // Trigger parent step transition and pass data
    onNext?.({ learnerId: internalLearnerId, relationship: internalRelationship });
  };

  return (
    <div className="w-full max-w-md lg:max-w-[440px] rounded-2xl bg-white p-4 sm:p-6 lg:p-8 font-[Inter] border border-slate-100 shadow-sm mx-auto box-border">
      {/* Header */}
      <div className="mb-5 sm:mb-6 space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
          Enter Learner Information
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Provide your child's Learner ID to start the linking process.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
        {/* Learner ID Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="learnerIdInput"
            className="block text-xs sm:text-sm font-semibold text-slate-800"
          >
            Learner ID
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400 pointer-events-none">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <input
              id="learnerIdInput"
              type="text"
              placeholder="Enter your child's unique learner ID"
              value={internalLearnerId}
              onChange={(e) => {
                const val = e.target.value;
                setInternalLearnerId(val);
                setLearnerId?.(val);
                setError?.("");
              }}
              className="w-full h-12 sm:h-auto rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
            />
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 pt-0.5 leading-normal">
            You can find this ID on your child's learner dashboard.
          </p>
        </div>

        {/* Relationship to Learner Field */}
        <div className="space-y-1.5 pt-1">
          <label
            htmlFor="relationshipSelect"
            className="block text-xs sm:text-sm font-semibold text-slate-800"
          >
            Relationship to Learner
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400 pointer-events-none">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>
            <select
              id="relationshipSelect"
              value={internalRelationship}
              onChange={(e) => {
                const val = e.target.value;
                setInternalRelationship(val);
                setRelationship?.(val);
                setError?.("");
              }}
              className="w-full h-12 sm:h-auto appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm sm:text-base text-slate-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all invalid:text-slate-400"
            >
              <option value="" disabled>
                Select your relationship
              </option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="guardian">Legal Guardian</option>
              <option value="other">Other</option>
            </select>
            <span className="absolute right-3.5 text-slate-400 pointer-events-none">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        {/* What happens next? Callout Box */}
        <div className="rounded-xl border border-amber-200/60 bg-[#FFFBEB] p-3.5 sm:p-4 flex items-start gap-3 my-4">
          <div className="mt-0.5 text-amber-500 shrink-0">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="space-y-1 overflow-hidden">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              What happens next?
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
              We'll send a 6-digit verification code to the email address associated with your child's account.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 px-6 text-sm sm:text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.99]"
        >
          <span>Continue</span>
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </div>
  );
}