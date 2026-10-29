import React from "react";
import verificationIllustration from "../../assets/images/d9ad77d36ef21f83d9a5afc82aa649cc4365729c.png";

export default function VerificationInfo({ imageSrc = verificationIllustration }) {
  return (
    <div className="w-full sm:max-w-md lg:max-w-[369px] min-h-0 sm:min-h-[619px] rounded-2xl bg-[#F6F4FB] p-4 sm:p-6 lg:p-8 font-[Inter] border border-purple-100 shadow-sm flex flex-col justify-between mx-auto box-border">
      {/* Top Illustration Area */}
      <div className="relative mb-4 flex justify-center">
        <div className="w-full max-w-[281px] h-auto flex items-center justify-center">
          <img
            src={imageSrc}
            alt="Email verification with security shield illustration"
            width={281}
            height={243}
            className="w-full h-auto max-h-[243px] object-contain"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4 flex-1 flex flex-col justify-center">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-purple-950">
          Verification Required
        </h2>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
          To protect your child's privacy, we've sent a 6-digit verification code to the email address associated with their learner account.
        </p>

        {/* Info Callout Box ("Didn't receive the email?") */}
        <div className="rounded-xl border border-purple-200/60 bg-purple-100/40 p-3.5 sm:p-4 flex items-start gap-3.5 mt-2">
          <div className="mt-0.5 text-purple-700 shrink-0">
            {/* Information Icon */}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1 overflow-hidden">
            <h4 className="text-xs sm:text-sm font-bold text-purple-950">
              Didn't receive the email?
            </h4>
            <p className="text-[11px] sm:text-xs leading-relaxed text-slate-500">
              Check your spam or junk folder. The code may take a few minutes to arrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}