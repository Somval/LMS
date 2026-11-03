
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function StudentRecognitionHeader({
  student,
  guardian = "Mrs. Okafor",
  startDate = "2026-10-01",
  endDate = "2026-10-31",
}) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="w-full bg-[#F4F7FD] px-4 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4 lg:px-7">
      {/* Back Navigation */}
      <button
        type="button"
        onClick={() => navigate("/admin/achievements")}
        className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold text-[#252A34] transition-colors hover:text-[#373A82] sm:mb-5 sm:text-xs"
      >
        <ArrowLeft size={17} strokeWidth={1.8} />
        <span>Back to Achievements &amp; Rewards</span>
      </button>

      {/* Page Title */}
      <h1 className="mb-3 text-lg font-bold leading-tight tracking-[-0.3px] text-[#171717] sm:mb-3.5 sm:text-xl">
        Student Recognitions
      </h1>

      {/* Student Information */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        {/* Student Avatar */}
        <div className="h-12 w-12 shrink-0 rounded-full bg-[#D9D9D9] sm:h-[46px] sm:w-[46px]" />

        {/* Student Details */}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold leading-tight text-[#111111] sm:text-lg">
            {student?.name || "Daniel Smith"}
          </h2>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-[10px] leading-relaxed text-[#788394] sm:gap-x-7 sm:text-[11px]">
            <span>
              Student ID: {student?.studentId || "STU001"}
            </span>

            <span>
              Guardian: {guardian}
            </span>

            <span>
              Report Period: {formatDate(startDate)} — {formatDate(endDate)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
