import React from "react";
import { CheckCircle2, X, Clock } from "lucide-react";

const ATTENDANCE_STATS = [
  {
    id: "classes-attended",
    title: "Classes Attended",
    count: 28,
    subtitle: "This week",
    icon: CheckCircle2,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    cardBg: "bg-white",
  },
  {
    id: "classes-missed",
    title: "Classes Missed",
    count: 28,
    subtitle: "This week",
    icon: X,
    iconBg: "bg-[#FEE2E2]",
    iconColor: "text-[#EF4444]",
    cardBg: "bg-white",
  },
  {
    id: "late-arrivals",
    title: "Late Arrivals",
    count: 16,
    subtitle: "This week",
    icon: Clock,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
    cardBg: "bg-white",
  },
];

export default function AttendanceHeaderComponent({
  title = "Attendance",
  description = "View students attendance history for classes.",
  stats = ATTENDANCE_STATS,
  attendanceRate = 80,
}) {
  // SVG Donut calculation for Attendance Rate card
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (attendanceRate / 100) * circumference;

  return (
    <section className="w-full bg-[#F4F7FC] p-4 sm:p-6 lg:p-8 font-sans antialiased text-[#1E293B]">
      <div className="w-full max-w-7xl mx-auto space-y-5">
        
        {/* Title & Description Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
            {title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm font-normal text-[#64748B]">
            {description}
          </p>
        </div>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full">
          
          {/* Standard Metric Cards (Classes Attended, Missed, Late Arrivals) */}
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-start gap-3.5 rounded-2xl border border-[#E2E8F0] bg-white p-3.5 sm:p-4 shadow-xs transition-shadow hover:shadow-sm"
              >
                {/* Circular Icon Container */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${stat.iconBg} ${stat.iconColor}`}
                >
                  <IconComponent className="h-5 w-5" strokeWidth={2} />
                </div>

                {/* Metric Title, Count & Subtitle */}
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-[#0F172A] truncate">
                    {stat.title}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-tight mt-0.5">
                    {stat.count}
                  </span>
                  {stat.subtitle && (
                    <span className="text-[11px] font-normal text-[#94A3B8] mt-0.5">
                      {stat.subtitle}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Featured Green Card: Attendance Rate */}
          <div className="flex items-center gap-3.5 rounded-2xl bg-[#BBF7D0]/60 p-3.5 sm:p-4 border border-[#86EFAC] shadow-xs">
            {/* Donut Progress Ring */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 48 48">
                {/* Track Circle */}
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className="stroke-white"
                  strokeWidth="4"
                  fill="transparent"
                />
                {/* Progress Circle */}
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className="stroke-[#15803D] transition-all duration-500 ease-out"
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
            </div>

            {/* Attendance Rate Label & Percentage */}
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-[#14532D] truncate">
                Attendance Rate
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-tight mt-0.5">
                {attendanceRate}%
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}