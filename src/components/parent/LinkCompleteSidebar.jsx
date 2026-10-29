import React from "react";
import successIllustration from "../../assets/images/7f80fcf7227ce9f3774e55bcd0d9f32e646c61e6 (1).png";

export default function LinkCompleteSidebar({ imageSrc = successIllustration }) {
  const capabilities = [
    "Monitor your child's academic progress and performance.",
    "View attendance records and session participation.",
    "Stay updated on homework and assignments.",
    "Celebrate badges, achievements and learning milestones.",
    "Communicate with your child's assigned tutor.",
  ];

  return (
    <div className="w-full max-w-md lg:max-w-[369px] min-h-0 sm:min-h-[619px] rounded-2xl bg-[#EBF7F3] p-5 sm:p-6 font-[Inter] border border-emerald-100 shadow-sm flex flex-col justify-between mx-auto">
      {/* Top Illustration Area */}
      <div className="relative mb-4 flex justify-center">
        <div className="w-full max-w-[281px] h-auto flex items-center justify-center">
          <img
            src={imageSrc}
            alt="Parent and child celebrating successful linking"
            width={281}
            height={243}
            className="w-full h-auto max-h-[243px] object-contain"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4 flex-1 flex flex-col justify-center">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
          What you can do now
        </h2>

        {/* Feature List with Emerald Checkmarks */}
        <div className="space-y-3.5 pt-1">
          {capabilities.map((text, index) => (
            <div key={index} className="flex items-start gap-3">
              {/* Emerald Green Check Icon */}
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00D06C] text-white shadow-xs">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Text */}
              <p className="text-xs sm:text-sm font-medium text-slate-600 leading-snug">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}