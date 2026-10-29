
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock3,
} from "lucide-react";

export default function StudentHeader() {
  const student = {
    name: "Olivia Johnson",
    subject: "Mathematics",
    level: "Year 1",
    startDate: "May 26, 2025",
    lastClass: "May 26, 2025, 5:00 PM",
    avatar: "",
  };

  return (
    <header className="w-full min-w-0 space-y-5 font-[Inter]">
      {/* Back Navigation */}
      <Link
        to="/Tutor/students"
        className="group inline-flex items-center gap-2 text-sm font-medium text-[#475467] transition-colors hover:text-[#2E6DFF]"
        aria-label="Back to students"
      >
        <ArrowLeft
          size={19}
          strokeWidth={1.8}
          className="shrink-0 transition-transform duration-200 group-hover:-translate-x-1"
        />
        <span>Back to Students</span>
      </Link>

      {/* Full-Width Student Profile */}
      <section className="w-full min-w-0 bg-transparent">
        <div className="flex w-full min-w-0 items-center gap-4 sm:gap-5">
          {/* Student Avatar */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9] sm:h-20 sm:w-20">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={student.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-[#667085] sm:text-xl">
                {student.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
            )}
          </div>

          {/* Student Information */}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-semibold tracking-tight text-[#101828] sm:text-2xl">
              {student.name}
            </h1>

            {/* Student Metadata */}
            <div className="mt-2 flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#667085] sm:gap-x-5 sm:text-sm">
              <div className="inline-flex items-center gap-2">
                <BookOpen
                  size={16}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#98A2B3]"
                />
                <span>
                  {student.subject} - {student.level}
                </span>
              </div>

              <span className="hidden text-[#D0D5DD] sm:inline">
                |
              </span>

              <div className="inline-flex items-center gap-2">
                <CalendarDays
                  size={16}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#98A2B3]"
                />
                <span>
                  <span className="font-medium text-[#475467]">
                    Start Date:
                  </span>{" "}
                  {student.startDate}
                </span>
              </div>

              <span className="hidden text-[#D0D5DD] lg:inline">
                |
              </span>

              <div className="inline-flex items-center gap-2">
                <Clock3
                  size={16}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#98A2B3]"
                />
                <span>
                  <span className="font-medium text-[#475467]">
                    Last Class:
                  </span>{" "}
                  {student.lastClass}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
