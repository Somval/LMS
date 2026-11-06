import React from "react";
import { ClipboardList, FileText, CheckCircle2 } from "lucide-react";

const STATS_DATA = [
  {
    id: "all-assignments",
    title: "All assignments",
    count: 28,
    icon: ClipboardList,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
  },
  {
    id: "all-quizzes",
    title: "All quizzes",
    count: 28,
    icon: FileText,
    iconBg: "bg-[#E0F2FE]",
    iconColor: "text-[#0284C7]",
  },
  {
    id: "completed-assignments",
    title: "Completed assignments",
    count: 28,
    icon: CheckCircle2,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
  {
    id: "completed-quizzes",
    title: "Completed quizzes",
    count: 28,
    icon: CheckCircle2,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
];

export default function AssignmentsAndQuizzesHeader({
  title = "Assignments & Quizzes",
  description = "View and monitor all assignments and quizzes created by tutors.",
  counts = null,
}) {
  const keyOf = {
    "all-assignments": "assignments",
    "all-quizzes": "quizzes",
    "completed-assignments": "completedAssignments",
    "completed-quizzes": "completedQuizzes",
  };
  const stats = STATS_DATA.map((s) => ({ ...s, count: counts?.[keyOf[s.id]] ?? "—" }));

  return (
    <section className="w-full bg-[#F4F7FC] px-4 py-6 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="w-full">
        {/* Header Title and Description */}
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
            {title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm font-normal text-[#64748B]">
            {description}
          </p>
        </div>

        {/* Metrics Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-center gap-3.5 rounded-xl border border-[#E2E8F0] bg-white p-3.5 sm:p-4 shadow-xs transition-shadow hover:shadow-sm"
              >
                {/* Circular Icon Container */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${stat.iconBg} ${stat.iconColor}`}
                >
                  <IconComponent className="h-5 w-5" strokeWidth={2} />
                </div>

                {/* Metric Label and Value */}
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-[#64748B] truncate">
                    {stat.title}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-[#0F172a] leading-tight">
                    {stat.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}