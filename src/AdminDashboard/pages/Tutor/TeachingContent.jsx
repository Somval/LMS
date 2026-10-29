
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const teachingContent = [
  {
    id: 1,
    topic: "Fractions",
    lessons: ["Equivalent Fractions", "Comparing Fractions"],
  },
  {
    id: 2,
    topic: "Fractions",
    lessons: ["Equivalent Fractions", "Comparing Fractions"],
  },
  {
    id: 3,
    topic: "Fractions",
    lessons: ["Equivalent Fractions", "Comparing Fractions"],
  },
  {
    id: 4,
    topic: "Fractions",
    lessons: ["Equivalent Fractions", "Comparing Fractions"],
  },
];

const courses = [
  "Mathematics - Year 1",
  "Mathematics - Year 2",
  "Mathematics - Year 3",
  "Mathematics - Year 4",
  "Science - Year 1",
  "Science - Year 2",
];

export default function TeachingContent() {
  const [selectedCourse, setSelectedCourse] = useState(
    "Mathematics - Year 1"
  );
  const [openTopic, setOpenTopic] = useState(null);

  return (
    <section className="w-full min-w-0 max-w-[1079px] rounded-md bg-white p-3 font-sans sm:p-4">
      {/* Heading and Course Selector */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-base font-semibold leading-6 text-[#111827] sm:text-lg">
            Teaching Content
          </h2>

          <p className="mt-1 text-xs leading-5 text-[#64748b] sm:text-[13px]">
            Topics and lessons this tutor has selected from the curriculum.
          </p>
        </div>

        <div className="relative w-full sm:w-[190px] sm:shrink-0">
          <select
            value={selectedCourse}
            onChange={(event) => setSelectedCourse(event.target.value)}
            className="h-9 w-full appearance-none rounded-md border border-[#d1d5db] bg-white pl-3 pr-9 text-xs text-[#475569] outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:h-8 sm:text-[11px]"
            aria-label="Select course"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b]"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Content Table */}
      <div className="mt-4 w-full min-w-0 rounded-md border border-[#e5e7eb] p-2 sm:mt-5 sm:p-3">
        {/* Table Header */}
        <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)_58px] items-center gap-2 rounded bg-[#eef3fb] px-2 py-3 text-[11px] font-semibold text-[#26364b] sm:grid-cols-[44%_minmax(0,1fr)_72px] sm:px-3 sm:py-3 sm:text-xs">
          <span>Topics</span>
          <span>Lessons</span>
          <span className="text-right sm:text-center"></span>
        </div>

        {/* Table Rows */}
        <div>
          {teachingContent.map((item) => {
            const isOpen = openTopic === item.id;

            return (
              <div
                key={item.id}
                className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)_58px] items-center gap-2 border-b border-[#e5e7eb] px-2 py-3 last:border-b-0 sm:grid-cols-[44%_minmax(0,1fr)_72px] sm:px-3 sm:py-4"
              >
                {/* Topic */}
                <div className="min-w-0">
                  <span className="break-words text-xs font-medium leading-5 text-[#111827] sm:text-[13px]">
                    {item.topic}
                  </span>
                </div>

                {/* Lessons */}
                <div className="flex min-w-0 flex-col gap-1 text-[11px] leading-[17px] text-[#7b8798] sm:text-xs sm:leading-[18px]">
                  {item.lessons.map((lesson) => (
                    <span
                      key={lesson}
                      className="flex min-w-0 items-start gap-1"
                    >
                      <span className="shrink-0">•</span>
                      <span className="min-w-0 break-words">{lesson}</span>
                    </span>
                  ))}
                </div>

                {/* Open Button */}
                <div className="flex justify-end sm:justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenTopic(isOpen ? null : item.id)
                    }
                    className="flex min-h-7 w-[54px] items-center justify-center rounded border border-[#7777d9] bg-white px-1 text-[11px] font-medium text-[#37379b] transition-colors hover:bg-[#f1f1ff] focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:min-h-[29px] sm:w-[64px] sm:text-xs"
                    aria-expanded={isOpen}
                    aria-controls={`topic-details-${item.id}`}
                  >
                    {isOpen ? "Close" : "Open"}
                  </button>
                </div>

                {/* Expanded Lesson Details */}
                {isOpen && (
                  <div
                    id={`topic-details-${item.id}`}
                    className="col-span-3 min-w-0 border-t border-[#eef0f4] py-3"
                  >
                    <p className="text-sm font-semibold text-[#26364b]">
                      {item.topic}
                    </p>

                    <ul className="mt-2 space-y-2">
                      {item.lessons.map((lesson) => (
                        <li
                          key={lesson}
                          className="flex items-start gap-2 break-words text-xs leading-5 text-[#64748b] sm:text-[13px]"
                        >
                          <ChevronRight
                            size={15}
                            className="mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
