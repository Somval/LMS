
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const courses = [
  "Mathematics",
  "English",
  "Basic Science",
  "Social Studies",
  "Computer Studies",
];

const classes = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
];

export default function CourseClassSelector({
  initialCourse = "Mathematics",
  initialClass = "Year 4",
  onCourseChange,
  onClassChange,
}) {
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [selectedClass, setSelectedClass] = useState(initialClass);

  const handleCourseChange = (event) => {
    const value = event.target.value;
    setSelectedCourse(value);
    onCourseChange?.(value);
  };

  const handleClassChange = (event) => {
    const value = event.target.value;
    setSelectedClass(value);
    onClassChange?.(value);
  };

  const selectClass =
    "h-[34px] w-full appearance-none rounded-[5px] border border-[#E2E2E2] bg-white pl-2 pr-9 text-[12px] font-semibold text-[#171717] outline-none transition-colors hover:border-[#C8C8C8] focus:border-[#326BFF] focus:ring-2 focus:ring-[#326BFF]/10";

  return (
    <section className="w-full bg-[#F3F6FC] p-2 sm:p-3">
      <div className="w-full rounded-[6px] bg-white px-4 py-3 sm:px-[18px] sm:py-[10px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[17px]">
          {/* Select Course */}
          <div className="min-w-0">
            <label
              htmlFor="course"
              className="mb-[7px] block text-[12px] font-medium leading-4 text-[#171717]"
            >
              Select Course
            </label>

            <div className="relative">
              <select
                id="course"
                name="course"
                value={selectedCourse}
                onChange={handleCourseChange}
                className={selectClass}
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-[11px] top-1/2 h-4 w-4 -translate-y-1/2 text-[#171717]"
                strokeWidth={1.8}
              />
            </div>
          </div>

          {/* Select Class */}
          <div className="min-w-0">
            <label
              htmlFor="class"
              className="mb-[7px] block text-[12px] font-medium leading-4 text-[#171717]"
            >
              Class
            </label>

            <div className="relative">
              <select
                id="class"
                name="class"
                value={selectedClass}
                onChange={handleClassChange}
                className={selectClass}
              >
                {classes.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>

              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-[11px] top-1/2 h-4 w-4 -translate-y-1/2 text-[#171717]"
                strokeWidth={1.8}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
