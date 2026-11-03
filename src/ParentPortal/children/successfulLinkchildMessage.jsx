import React from "react";

export default function LinkComplete({
  childData = [],
  onGoToLinkedChildren,
  onGoToDashboard,
}) {
  const child = childData[0] || {};

  return (
    <div className="w-full max-w-md lg:max-w-[440px] rounded-2xl bg-[#F0F9F6] p-6 sm:p-8 font-[Inter] border border-emerald-100 shadow-sm mx-auto flex flex-col justify-between min-h-[580px]">
      {/* Top Details Content */}
      <div className="space-y-6">
        {/* Success Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00D06C] text-white shadow-xs">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Child Linked Successfully!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {child.childName} has been successfully linked to your Parent Portal.
          </p>
        </div>

        {/* Learner Profile Card */}
        <div className="rounded-xl bg-white p-4 border border-slate-100 shadow-xs flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700 ring-2 ring-amber-100"
          >
            {(child.childName || "")
              .split(/\s+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0].toUpperCase())
              .join("")}
          </span>
          <div className="overflow-hidden space-y-0.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {child.childName}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium truncate">
              Learner ID: {child.learnerId}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Primary Action Button */}
        <button
          type="button"
          onClick={onGoToLinkedChildren}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 px-4 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.99]"
        >
          <span>Go to Linked Children</span>
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>

        {/* Secondary Action Button */}
        <button
          type="button"
          onClick={onGoToDashboard}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 py-3 px-4 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 active:scale-[0.99]"
        >
          {/* Grid / Dashboard Icon */}
          <svg
            className="h-4 w-4 text-slate-500 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span>Go to Dashboard</span>
        </button>
      </div>
    </div>
  );
}