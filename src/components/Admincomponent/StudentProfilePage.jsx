import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, X, Clock } from "lucide-react";

export default function StudentProfilePage() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // Student profile mock data matching the screenshot
  const student = {
    name: "John Doe",
    studentId: studentId || "STU001",
    subjects: ["Mathematics - Year 1", "English - Year 1"],
    attendanceRate: "80%",
    classesAttended: {
      count: 24,
      total: 25,
    },
    classesMissed: 1,
    lateArrivals: {
      count: 2,
      percentage: "8% of total classes",
    },
  };

  return (
    <div className=" w-full bg-[#f4f7fb] p-4 sm:p-6 lg:p-8 font-sans antialiased text-[#1e293b]">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0f172a] hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Attendance</span>
        </button>

        {/* Profile Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-2">
          <div className="flex items-center gap-5">
            {/* Avatar Circle */}
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#d1d5db] shrink-0" />

            {/* Name, Subjects, ID & Rate Meta */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a]">
                {student.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#64748b]">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-[#94a3b8]" />
                  <span>{student.subjects.join("  |  ")}</span>
                </div>
                <span className="hidden sm:inline text-[#cbd5e1]">•</span>
                <span>Student ID: {student.studentId}</span>
                <span className="hidden sm:inline text-[#cbd5e1]">•</span>
                <span>Attendance Rate: {student.attendanceRate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          
          {/* Card 1: Attendance Rate (with Custom SVG) */}
          <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#e2e8f0] flex items-center gap-4">
            {/* Custom SVG Ring */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg
                width="72"
                height="72"
                viewBox="0 0 98 98"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
              >
                <path
                  d="M4.67734 48.7773C1.97115 48.7773 -0.248043 50.9767 0.0221215 53.6693C0.821063 61.6322 3.56163 69.3049 8.03533 76.0003C13.4195 84.0583 21.0723 90.3387 30.0259 94.0474C38.9794 97.7561 48.8317 98.7265 58.3368 96.8358C67.8418 94.9451 76.5728 90.2783 83.4256 83.4256C90.2784 76.5728 94.9451 67.8418 96.8358 58.3368C98.7265 48.8317 97.7561 38.9794 94.0474 30.0259C90.3388 21.0723 84.0583 13.4195 76.0003 8.03534C69.3049 3.56163 61.6322 0.821065 53.6694 0.0221214C50.9767 -0.248043 48.7773 1.97115 48.7773 4.67734C48.7773 7.38354 50.9796 9.54578 53.6647 9.88318C59.6859 10.6398 65.4729 12.7875 70.5557 16.1837C77.0021 20.4911 82.0265 26.6133 84.9934 33.7762C87.9604 40.939 88.7367 48.8208 87.2241 56.4249C85.7116 64.0289 81.9781 71.0137 76.4959 76.4959C71.0137 81.9781 64.0289 85.7116 56.4249 87.2241C48.8208 88.7367 40.939 87.9604 33.7762 84.9934C26.6133 82.0265 20.4911 77.0021 16.1837 70.5557C12.7875 65.4728 10.6398 59.6859 9.88318 53.6647C9.54578 50.9796 7.38354 48.7773 4.67734 48.7773Z"
                  fill="#0ED753"
                />
              </svg>
              <span className="absolute text-base font-bold text-[#0f172a]">
                80%
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-[#0f172a] truncate">
                Attendance Rate
              </span>
              <span className="text-xs font-medium text-[#16a34a] mt-0.5">
                Great consistency!
              </span>
            </div>
          </div>

          {/* Card 2: Classes Attended */}
          <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#e2e8f0] flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[#3b82f6]">
              <CheckCircle className="h-6 w-6" strokeWidth={2} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-[#0f172a] truncate">
                Classes Attended
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-tight mt-0.5">
                {student.classesAttended.count}
              </span>
              <span className="text-[11px] text-[#64748b] mt-0.5">
                out of {student.classesAttended.total} classes
              </span>
            </div>
          </div>

          {/* Card 3: Classes Missed */}
          <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#e2e8f0] flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fee2e2] text-[#ef4444]">
              <X className="h-6 w-6" strokeWidth={2.2} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-[#0f172a] truncate">
                Classes Missed
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-tight mt-0.5">
                {student.classesMissed}
              </span>
            </div>
          </div>

          {/* Card 4: Late Arrivals */}
          <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#e2e8f0] flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ffedd5] text-[#f97316]">
              <Clock className="h-6 w-6" strokeWidth={2} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-[#0f172a] truncate">
                Late Arrivals
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-tight mt-0.5">
                {student.lateArrivals.count}
              </span>
              <span className="text-[11px] text-[#64748b] mt-0.5">
                {student.lateArrivals.percentage}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}