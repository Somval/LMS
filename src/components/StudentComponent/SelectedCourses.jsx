
import React from "react";
import { Calculator } from "lucide-react";

export default function SelectedCourse({ courses = [], active = false }) {
  const CoursesList = courses.map((c) => ({
    id: c.id,
    course: c.name,
    year: c.yearLevel,
    status: active ? "Active" : "Pending",
  }));

  const handleViewEdit = () => {
    // Add your edit/navigation logic here.
  };

  return (
    <div className="mx-auto w-full max-w-[798px] min-w-0 rounded-md bg-white px-3 py-3 shadow-sm sm:px-[18px]">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <h1 className="min-w-0 font-inter text-sm font-semibold text-[#111111] sm:text-base">
          Your Selected Courses
        </h1>

        <button
          type="button"
          onClick={handleViewEdit}
          className="shrink-0 font-inter text-xs font-medium text-[#2E6DFF] transition-colors hover:text-[#1D4ED8] sm:text-sm"
        >
          View &amp; Edit
        </button>
      </div>

      {/* Selected courses */}
      <div className="space-y-3">
        {CoursesList.length === 0 && (
          <p className="text-xs text-[#8B94AD]">Loading your courses…</p>
        )}
        {CoursesList.map((item) => (
          <div
            key={item.id}
            className="flex min-w-0 items-center justify-between gap-2 sm:gap-3"
          >
            {/* Course icon and details */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-[14px]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#2F327D] sm:h-[33px] sm:w-[33px]">
                <Calculator
                  size={20}
                  strokeWidth={1.7}
                  className="text-white sm:h-[21px] sm:w-[21px]"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate font-inter text-xs font-semibold leading-[17px] text-[#111111] sm:text-[13px]">
                  {item.course}
                </p>

                <p className="font-inter text-[11px] leading-[15px] text-[#2F327D] sm:text-xs">
                  {item.year}
                </p>
              </div>
            </div>

            {/* Status */}
            <span className="flex h-6 w-[78px] shrink-0 items-center justify-center rounded-[5px] bg-[#FFF0C7] font-inter text-[11px] font-medium text-[#E99500] sm:text-xs">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
