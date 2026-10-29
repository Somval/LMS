import React from "react";

const DEFAULT_QUESTIONS = [
  {
    id: 1,
    number: 1,
    prompt: "Solve for x:",
    expression: "3x + 2 = 14",
    points: "5 points",
  },
  {
    id: 2,
    number: 1,
    prompt: "Solve for x:",
    expression: "3x + 2 = 14",
    points: "5 points",
  },
  {
    id: 3,
    number: 1,
    prompt: "Solve for x:",
    expression: "3x + 2 = 14",
    points: "5 points",
  },
];

export default function AssignmentQuestionsCard({
  title = "Assignment Questions",
  totalPoints = 15,
  questions = DEFAULT_QUESTIONS,
}) {
  return (
    <div className="w-full rounded-2xl bg-white p-5 sm:p-6 shadow-xs border border-[#e2e8f0] font-sans antialiased text-[#1e293b]">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm sm:text-base font-bold text-[#0f172a]">
          {title}
        </h2>
        <span className="text-xs sm:text-sm font-semibold text-[#0f172a]">
          Total Points: {totalPoints}
        </span>
      </div>

      {/* Inner Sub-Card Container with Subtle Border */}
      <div className="rounded-xl border border-[#e2e8f0]/80 bg-white p-4 sm:p-6 divide-y divide-[#f1f5f9]">
        {questions.map((q, index) => (
          <div
            key={q.id || index}
            className={`flex items-start justify-between gap-4 ${
              index === 0 ? "pb-5" : index === questions.length - 1 ? "pt-5" : "py-5"
            }`}
          >
            {/* Left Content: Badge + Question text */}
            <div className="flex items-start gap-4">
              {/* Dark Blue Number Badge */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2e3776] text-xs font-bold text-white shadow-2xs">
                {q.number}
              </div>

              {/* Question Text */}
              <div className="space-y-1 pt-0.5">
                <p className="text-xs sm:text-sm font-bold text-[#0f172a]">
                  {q.prompt}
                </p>
                <p className="text-xs sm:text-sm text-[#334155] font-normal">
                  {q.expression}
                </p>
              </div>
            </div>

            {/* Right Content: Points Label */}
            <span className="text-xs sm:text-sm font-medium text-[#64748b] shrink-0 pt-0.5">
              {q.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}