import React, { useState, useRef } from "react";

export default function VerifywithOTP({ 
  onNext, 
  onResend, 
  onChangeLearnerId, 
  studentEmail = "olivia.johnson@studentmail.com",
  error,
  setError 
}) {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Handle digit input & auto-advance
  const handleChange = (value, index) => {
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otpValues];
    // Take only the last typed character if multiple are pasted/entered
    newOtp[index] = value.substring(value.length - 1);
    setOtpValues(newOtp);
    setError?.("");

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otpValues];
        newOtp[index] = "";
        setOtpValues(newOtp);
      }
    }
  };

  // Handle paste functionality
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim().slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = [...otpValues];
      pasteData.split("").forEach((char, idx) => {
        if (idx < 6) newOtp[idx] = char;
      });
      setOtpValues(newOtp);
      const focusIndex = Math.min(pasteData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otpValues.join("");

    if (fullOtp.length < 6) {
      setError?.("Please enter the complete 6-digit verification code.");
      return;
    }

    setError?.("");
    onNext?.(fullOtp);
  };

  return (
    <div className="w-full sm:max-w-md lg:max-w-[440px] rounded-2xl bg-white p-4 sm:p-6 lg:p-8 font-[Inter] border border-slate-100 shadow-sm mx-auto box-border">
      {/* Header */}
      <div className="mb-5 sm:mb-6 space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
          Enter Verification Code
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Enter the 6-digit code sent to your child's email.
        </p>
      </div>

      {/* Email Callout Box */}
      <div className="rounded-xl border border-purple-100 bg-[#F6F4FB] p-3.5 sm:p-4 flex items-center gap-3 mb-5 sm:mb-6">
        <div className="text-purple-600 shrink-0">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="overflow-hidden">
          <p className="text-[11px] sm:text-xs text-slate-500">
            Verification code sent to
          </p>
          <p className="text-xs sm:text-sm font-semibold text-purple-900 truncate">
            {JSON.stringify(studentEmail).replace(/^"(.*)"$/, '$1')}
          </p>
        </div>
      </div>

      {error && (
        <div role="alert" className="mb-5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-600 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
        {/* 6-Digit OTP Inputs */}
        <div className="flex justify-between gap-1.5 sm:gap-3" onPaste={handlePaste}>
          {otpValues.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full min-w-0 h-12 sm:h-14 text-center text-lg sm:text-xl font-bold text-slate-900 rounded-xl border border-slate-200 bg-white shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
            />
          ))}
        </div>

        {/* Expiration text */}
        <p className="text-xs text-slate-500 text-center sm:text-left">
          The code will expire in <span className="text-blue-600 font-semibold">10:00</span> minutes.
        </p>

        <hr className="border-slate-100 my-4" />

        {/* Didn't receive code options */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-800">
            Didn't receive a code?
          </p>
          
          <button
            type="button"
            onClick={onResend}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-purple-50/40 transition-colors text-left group"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700 group-hover:bg-purple-200 transition-colors shrink-0">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-purple-700 truncate">
              Resend Code
            </span>
          </button>

          <button
            type="button"
            onClick={onChangeLearnerId}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-purple-50/40 transition-colors text-left group"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700 group-hover:bg-purple-200 transition-colors shrink-0">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-purple-700 truncate">
              Change Learner ID
            </span>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 px-6 text-sm sm:text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.99]"
        >
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Verify & Link Child</span>
        </button>
      </form>
    </div>
  );
}