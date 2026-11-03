import React from "react";
import { Heart } from "lucide-react";

const StudentPerformance = ({ performance }) => {
  const overall = performance?.overall ?? null;
  const subjects = (performance?.subjects ?? []).map((s) => ({ id: s.name, name: s.name, score: `${s.average}%` }));

  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-slate-100 bg-white p-5 font-sans shadow-sm sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="min-w-0">
        <h2 className="pb-3 text-lg font-bold tracking-tight text-slate-900 sm:pb-4 sm:text-xl lg:text-2xl">
          Student Performance
        </h2>

        <div className="border-b border-slate-100" />

        {/* Subheader */}
        <h3 className="mb-5 mt-5 text-sm font-bold tracking-tight text-slate-900 sm:mb-6 sm:mt-6 sm:text-base lg:text-lg">
          Overall Class Performance This Month
        </h3>

        {/* Content Section */}
        <div className="mb-6 flex min-w-0 flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Circular Progress Indicator */}
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center sm:h-40 sm:w-40">
            <svg
              className="h-full w-full -rotate-90"
              viewBox="0 0 120 120"
            >
              {/* Background Track */}
              <circle
                cx="60"
                cy="60"
                r="48"
                className="text-slate-100"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />

              {/* Progress */}
              <circle
                cx="60"
                cy="60"
                r="48"
                className="text-indigo-950"
                strokeWidth="12"
                strokeDasharray="301.59"
                strokeDashoffset={301.59 * (1 - (overall ?? 0) / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold tracking-tight text-indigo-950 sm:text-3xl">
                {overall == null ? "–" : `${overall}%`}
              </span>

              <span className="mt-0.5 text-xs font-semibold text-slate-400 sm:text-sm">
                Average Score
              </span>
            </div>
          </div>

          {/* Subject Performance Breakdown */}
          <div className="w-full min-w-0 space-y-3 sm:space-y-4">
            {subjects.map((item, index) => (
              <div key={item.id} className="min-w-0">
                <div className="flex min-w-0 items-center justify-between gap-3 py-1.5 sm:py-2">
                  {/* Subject Name */}
                  <span className="min-w-0 truncate pr-2 text-xs font-bold text-slate-900 sm:text-sm lg:text-base">
                    {item.name}
                  </span>

                  {/* Score */}
                  <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-bold text-slate-900 sm:text-sm lg:text-base">
                      {item.score}
                    </span>

                    {/* Arrow */}
                    <svg
                      className="h-3 w-2.5 shrink-0 sm:h-3.5 sm:w-3"
                      viewBox="0 0 9 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.109835 4.39016C-0.0366117 4.24372 -0.0366117 4.00628 0.109835 3.85984L3.85984 0.109835C4.00628 -0.0366118 4.24372 -0.0366118 4.39016 0.109835L8.14017 3.85984C8.28661 4.00628 8.28661 4.24372 8.14017 4.39016C8.28661 4.53661 8.28661 4.24372 8.14017 4.39016C7.99372 4.53661 7.75628 4.53661 7.60983 4.39016L4.5 1.28033L4.5 9.375C4.5 9.58211 4.33211 9.75 4.125 9.75C3.91789 9.75 3.75 9.58211 3.75 9.375L3.75 1.28033L0.640165 4.39016C0.493718 4.53661 0.256282 4.53661 0.109835 4.39016Z"
                        fill="#0ED753"
                      />
                    </svg>
                  </div>
                </div>

                {/* Divider */}
                {index < subjects.length - 1 && (
                  <div className="mt-1 border-b border-slate-100" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="mt-auto flex items-center gap-3 rounded-2xl border border-indigo-100/60 bg-indigo-50/70 p-3.5 sm:p-4">
        <div className="flex shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-sm">
          <Heart className="h-4 w-4 fill-blue-50 text-blue-600 sm:h-5 sm:w-5" />
        </div>

        <p className="text-xs font-semibold leading-snug tracking-tight text-blue-600 sm:text-sm lg:text-base">
          {overall == null ? "Grade some work to see how your students are doing." : overall >= 70 ? "Great job! Your students are doing well." : "Your students could use some extra support."}
        </p>
      </div>
    </div>
  );
};

export default StudentPerformance;