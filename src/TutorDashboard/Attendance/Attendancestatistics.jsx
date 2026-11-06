import React from "react";
import {
  UsersRound,
  CircleCheck,
  CircleX,
  CircleMinus,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import { PERIODS, courseKey, courseLabel } from "./attendanceData";

const statDefs = [
  {
    id: "students",
    label: "Total Students",
    icon: UsersRound,
    iconBg: "bg-[#E5EEFF]",
    iconColor: "text-[#4385FF]",
  },
  {
    id: "present",
    label: "Total Present",
    icon: CircleCheck,
    iconBg: "bg-[#DDFBE9]",
    iconColor: "text-[#18C96E]",
  },
  {
    id: "absent",
    label: "Total Absent",
    icon: CircleX,
    iconBg: "bg-[#FFE1E1]",
    iconColor: "text-[#FF4545]",
  },
  {
    id: "late",
    label: "Total Late",
    icon: CircleMinus,
    iconBg: "bg-[#ECEFF2]",
    iconColor: "text-[#8B949E]",
  },
];

export default function AttendanceOverview({
  courses = [],
  course = "",
  onCourseChange = () => {},
  period = "this-month",
  onPeriodChange = () => {},
  stats = {},
  loading = false,
}) {
  return (
    <section className="w-full min-w-0 bg-[#F4F7FD] p-0">
      <div className="w-full min-w-0">
        {/* Course and period filters */}
        <div className="flex min-h-[63px] w-full min-w-0 flex-col gap-3 rounded-[6px] border border-[#C7D0DE] bg-[#FBFCFE] px-3 py-3 sm:flex-row sm:items-center sm:gap-[30px] sm:px-4 sm:py-2">
          {/* Course filter */}
          <div className="w-full min-w-0 sm:w-[181px] sm:shrink-0">
            <label
              htmlFor="attendance-course"
              className="mb-[3px] block text-[11px] font-medium leading-[14px] text-[#111827]"
            >
              Course
            </label>

            <div className="relative">
              <select
                id="attendance-course"
                value={course}
                onChange={(event) => onCourseChange(event.target.value)}
                disabled={courses.length === 0}
                className="h-[27px] w-full appearance-none rounded-[3px] border border-[#DDE2E8] bg-white pl-[9px] pr-7 text-[10px] font-medium text-[#20252B] outline-none transition focus:border-[#8AAEFF] focus:ring-2 focus:ring-[#E5EDFF]"
              >
                {courses.length === 0 && <option value="">No courses yet</option>}
                {courses.map((c) => (
                  <option key={courseKey(c.subjectId, c.yearLevel)} value={courseKey(c.subjectId, c.yearLevel)}>
                    {courseLabel(c)}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={12}
                strokeWidth={1.6}
                className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-[#303842]"
              />
            </div>
          </div>

          {/* Period filter */}
          <div className="w-full min-w-0 sm:w-[181px] sm:shrink-0">
            <label
              htmlFor="attendance-period"
              className="mb-[3px] block text-[11px] font-medium leading-[14px] text-[#111827]"
            >
              Period
            </label>

            <div className="relative">
              <CalendarDays
                size={15}
                strokeWidth={1.7}
                className="pointer-events-none absolute left-[9px] top-1/2 -translate-y-1/2 text-[#222B35]"
              />

              <select
                id="attendance-period"
                value={period}
                onChange={(event) => onPeriodChange(event.target.value)}
                className="h-[27px] w-full appearance-none rounded-[3px] border border-[#DDE2E8] bg-white pl-[32px] pr-7 text-[10px] font-semibold text-[#20252B] outline-none transition focus:border-[#8AAEFF] focus:ring-2 focus:ring-[#E5EDFF]"
              >
                {PERIODS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={12}
                strokeWidth={1.6}
                className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-[#303842]"
              />
            </div>
          </div>
        </div>

        {/* Attendance statistics */}
        <div className="mt-3 grid w-full min-w-0 grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
          {statDefs.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className="flex h-[67px] min-w-0 items-center gap-[13px] rounded-[5px] border border-[#E0E4EA] bg-white px-[9px]"
              >
                <div
                  className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
                >
                  <Icon
                    size={15}
                    strokeWidth={1.6}
                    className={stat.iconColor}
                  />
                </div>

                <div className="flex min-w-0 flex-col justify-center">
                  <span className="text-[20px] font-semibold leading-[25px] tracking-[-0.5px] text-[#080B10]">
                    {loading ? "—" : stats[stat.id] ?? 0}
                  </span>

                  <span className="mt-[2px] whitespace-nowrap text-[10px] font-normal leading-[13px] text-[#8791A0]">
                    {stat.label}
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