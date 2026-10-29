import React from "react";
import {
  CheckCircle2,
  X,
  Clock,
} from "lucide-react";

const attendanceStats = [
  {
    id: 1,
    title: "Classes Attended",
    value: "24",
    description: "out of 25 classes",
    icon: CheckCircle2,
    iconBg: "bg-[#E2EAFF]",
    iconColor: "text-[#326BFF]",
  },
  {
    id: 2,
    title: "Classes Missed",
    value: "1",
    description: "4% of total classes",
    icon: X,
    iconBg: "bg-[#FFE0E0]",
    iconColor: "text-[#FF4545]",
  },
  {
    id: 3,
    title: "Late Arrivals",
    value: "2",
    description: "8% of total classes",
    icon: Clock,
    iconBg: "bg-[#FFF0E5]",
    iconColor: "text-[#FF873D]",
  },
];

function AttendanceRate({ rate = 82 }) {
  const radius = 29;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - rate / 100);

  return (
    <div className="flex shrink-0 items-center justify-center">
      <div className="relative h-[66px] w-[66px]">
        <svg
          viewBox="0 0 72 72"
          className="h-full w-full -rotate-90"
          aria-label={`Attendance rate: ${rate}%`}
          role="img"
        >
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke="#EDF1F5"
            strokeWidth="6"
          />

          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke="#16CF67"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[15px] font-bold tracking-tight text-[#101828]">
            {rate}%
          </span>
        </div>
      </div>
    </div>
  );
}

function AttendanceStatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <article className="flex min-w-0 items-center gap-3 rounded-lg border border-[#EAECF0] bg-white px-3 py-3.5 transition-shadow duration-200 hover:shadow-sm sm:px-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${stat.iconBg} ${stat.iconColor}`}
      >
        <Icon
          size={21}
          strokeWidth={1.7}
        />
      </div>

      <div className="min-w-0">
        <h3 className="text-[10px] font-semibold leading-4 text-[#344054] sm:text-[11px]">
          {stat.title}
        </h3>

        <p className="mt-0.5 text-[15px] font-bold leading-5 text-[#101828] sm:text-base">
          {stat.value}
        </p>

        <p className="mt-0.5 text-[9px] leading-3.5 text-[#667085] sm:text-[10px]">
          {stat.description}
        </p>
      </div>
    </article>
  );
}

export default function Attendance() {
  const attendanceRate = 82;

  return (
    <div className="w-full flex justify-center bg-white font-[Inter,sans-serif]">
      <section className="w-full max-w-6xl">
        {/* Section heading */}
        <div className="mb-3">
          <h2 className="text-base font-bold leading-6 tracking-[-0.02em] text-[#101828] sm:text-[17px]">
            Attendance
          </h2>
        </div>

        {/* Attendance overview cards */}
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {/* Attendance rate */}
          <article className="flex min-w-0 items-center gap-3 rounded-lg border border-[#EAECF0] bg-white px-3 py-3.5 transition-shadow duration-200 hover:shadow-sm sm:px-4">
            <AttendanceRate rate={attendanceRate} />

            <div className="min-w-0">
              <h3 className="whitespace-nowrap text-[10px] font-semibold leading-4 text-[#344054] sm:text-[11px]">
                Attendance Rate
              </h3>

              <p className="mt-1 whitespace-nowrap text-[9px] font-medium leading-3.5 text-[#16B85C] sm:text-[10px]">
                Great consistency!
              </p>
            </div>
          </article>

          {/* Remaining attendance metrics */}
          {attendanceStats.map((stat) => (
            <AttendanceStatCard
              key={stat.id}
              stat={stat}
            />
          ))}
        </div>
      </section>
    </div>
  );
}