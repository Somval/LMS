
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Repeat2 } from "lucide-react";

export default function StudentClassHeader() {
  const navigate = useNavigate();

  const student = {
    name: "Olivia Johnson",
    subject: "Mathematics",
    level: "Year 1",
    schedule: "Repeats every Monday",
    date: "Mon, May 26, 2025",
    time: "5:00 PM – 6:00 PM",
    avatar: "/images/profile.png",
  };

  return (
    <div className="w-full  px-4 pb-5 pt-2 sm:px-6">
      {/* Top Navigation */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-3 text-[12px] font-semibold text-[#303F85] transition hover:text-[#2563EB]"
        >
          <ArrowLeft size={20} strokeWidth={1.7} />
          <span>Back to My Classes</span>
        </button>

             </div>

      {/* Student Details */}
      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Student Avatar */}
        <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9DADD] sm:h-[56px] sm:w-[56px]">
          <span className="text-lg font-medium text-[#A3A5AA]">
            {student.name.charAt(0)}
          </span>
        </div>

        {/* Student Information */}
        <div className="min-w-0 flex-1 pt-0.5">
          <h1 className="text-[16px] font-semibold leading-5 tracking-[-0.3px] text-[#101828]">
            {student.name}
          </h1>

          {/* Subject, Level and Schedule */}
          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[14px] leading-5 text-[#667085]">
            <span>
              {student.subject} · {student.level}
            </span>

            <span className="inline-flex items-center gap-2">
              <Repeat2 size={15} strokeWidth={1.6} />
              {student.schedule}
            </span>
          </div>

          {/* Upcoming Class Date */}
          <p className="mt-1.5 text-[14px] leading-5 text-[#667085]">
            Upcoming Class : {student.date} ·
          </p>

          {/* Class Time */}
          <p className="text-[14px] leading-5 text-[#667085]">
            {student.time}
          </p>
        </div>
      </div>
    </div>
  );
}
