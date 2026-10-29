import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const completedTasks = [
  {
    id: 1,
    submitted: "Aug 18, 2024",
    submittedTime: "11:59 PM",
    subject: "Mathematics",
    task: "Algebra Practice",
    type: "Assignment",
    grade: "9/10",
    action: "View Feedback",
  },
  {
    id: 2,
    submitted: "Aug 18, 2024",
    submittedTime: "11:59 PM",
    subject: "Mathematics",
    task: "Algebra Practice",
    type: "Quiz",
    grade: "9/10",
    action: "View Results",
  },
  {
    id: 3,
    submitted: "Aug 18, 2024",
    submittedTime: "11:59 PM",
    subject: "Mathematics",
    task: "Algebra Practice",
    type: "Assignment",
    grade: "9/10",
    action: "View Feedback",
  },
  {
    id: 4,
    submitted: "Aug 17, 2024",
    submittedTime: "11:59 PM",
    subject: "Science",
    task: "Forces & Motion",
    type: "Assignment",
    grade: "10/10",
    action: "View Feedback",
  },
  {
    id: 5,
    submitted: "Aug 17, 2024",
    submittedTime: "11:59 PM",
    subject: "Science",
    task: "Chapter 4 Quiz",
    type: "Quiz",
    grade: "8/10",
    action: "View Results",
  },
  {
    id: 6,
    submitted: "Aug 16, 2024",
    submittedTime: "11:59 PM",
    subject: "Mathematics",
    task: "Linear Equations",
    type: "Assignment",
    grade: "9/10",
    action: "View Feedback",
  },
  {
    id: 7,
    submitted: "Aug 16, 2024",
    submittedTime: "11:59 PM",
    subject: "English",
    task: "Reading Comprehension",
    type: "Assignment",
    grade: "9/10",
    action: "View Feedback",
  },
  {
    id: 8,
    submitted: "Aug 15, 2024",
    submittedTime: "11:59 PM",
    subject: "Science",
    task: "Energy & Matter",
    type: "Quiz",
    grade: "10/10",
    action: "View Results",
  },
];

export default function CompletedTasks() {
  const [showAll, setShowAll] = useState(false);

  const INITIAL_VISIBLE_COUNT = 3;

  const visibleTasks = showAll
    ? completedTasks
    : completedTasks.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMore = completedTasks.length > INITIAL_VISIBLE_COUNT;

  const toggleViewAll = () => {
    setShowAll((current) => !current);
  };

  return (
    <section className="w-full  px-4 py-5 sm:px-5">
      <div className="w-full">

        {/* =========================================
            TITLE
        ========================================== */}
        <h2 className="mb-4 text-[17px] font-semibold leading-none text-[#101828]">
          Completed Tasks
        </h2>

        {/* =========================================
            CARD
        ========================================== */}
        <div
          className="
            w-full
            overflow-hidden
            rounded-[9px]
            border
            border-[#d2d8e3]
            bg-white
          "
        >
          {/* =========================================
              DESKTOP TABLE
          ========================================== */}
          <div className="hidden md:block">

            {/* HEADER */}
            <div
              className="
                grid
                grid-cols-[160px_143px_minmax(150px,1fr)_133px_100px]
                items-center
                px-4
                pt-4
                pb-3
              "
            >
              <div className="text-[13px] font-medium text-[#747ca1]">
                Submitted
              </div>

              <div className="text-[13px] font-medium text-[#747ca1]">
                Subject
              </div>

              <div className="text-[13px] font-medium text-[#747ca1]">
                Task
              </div>

              <div className="text-[13px] font-medium text-[#747ca1]">
                Grade
              </div>

              <div className="text-[13px] font-medium text-[#747ca1]">
                Action
              </div>
            </div>

            {/* =========================================
                ROWS
            ========================================== */}
            <div
              className={`
                overflow-hidden
                transition-[max-height]
                duration-500
                ease-in-out
                ${
                  showAll
                    ? "max-h-[1000px]"
                    : "max-h-[213px]"
                }
              `}
            >
              {visibleTasks.map((item) => (
                <div
                  key={item.id}
                  className="
                    grid
                    min-h-[71px]
                    grid-cols-[160px_143px_minmax(150px,1fr)_133px_100px]
                    items-center
                    border-t
                    border-[#e5e7eb]
                    px-4
                  "
                >
                  {/* Submitted */}
                  <div className="leading-tight">
                    <p className="text-[12px] text-[#747ca1]">
                      {item.submitted}
                    </p>

                    <p className="mt-[3px] text-[12px] text-[#747ca1]">
                      {item.submittedTime}
                    </p>
                  </div>

                  {/* Subject */}
                  <div>
                    <p className="text-[12px] font-medium text-[#171b24]">
                      {item.subject}
                    </p>
                  </div>

                  {/* Task */}
                  <div className="leading-tight">
                    <p className="text-[12px] font-semibold text-[#171b24]">
                      {item.task}
                    </p>

                    <p className="mt-[3px] text-[12px] text-[#747ca1]">
                      {item.type}
                    </p>
                  </div>

                  {/* Grade */}
                  <div>
                    <p className="text-[12px] font-medium text-[#171b24]">
                      {item.grade}
                    </p>
                  </div>

                  {/* Action */}
                  <div>
                    <button
                      type="button"
                      className="
                        flex
                        h-[27px]
                        min-w-[88px]
                        items-center
                        justify-center
                        rounded-[5px]
                        border
                        border-[#4b7dff]
                        bg-white
                        px-2
                        text-[9px]
                        font-medium
                        text-[#246bff]
                        transition-all
                        duration-200
                        hover:bg-[#f2f6ff]
                        hover:border-[#246bff]
                        active:scale-[0.98]
                      "
                    >
                      {item.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* =========================================
                DESKTOP FOOTER
            ========================================== */}
            {hasMore && (
              <div
                className="
                  flex
                  h-[43px]
                  items-center
                  justify-center
                  border-t
                  border-[#e5e7eb]
                  bg-white
                "
              >
                <button
                  type="button"
                  onClick={toggleViewAll}
                  aria-expanded={showAll}
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    text-[12px]
                    font-medium
                    text-[#246bff]
                    transition-colors
                    duration-200
                    hover:text-[#1554d1]
                  "
                >
                  <span>
                    {showAll
                      ? "Show Less"
                      : `View All Completed (${completedTasks.length})`}
                  </span>

                  <ArrowRight
                    size={16}
                    strokeWidth={1.4}
                    className={`
                      transition-transform
                      duration-300
                      ${
                        showAll
                          ? "-rotate-90"
                          : "group-hover:translate-x-1"
                      }
                    `}
                  />
                </button>
              </div>
            )}
          </div>

          {/* =========================================
              MOBILE
          ========================================== */}
          <div className="md:hidden">

            <div
              className={`
                overflow-hidden
                transition-[max-height]
                duration-500
                ease-in-out
                ${
                  showAll
                    ? "max-h-[2000px]"
                    : "max-h-[420px]"
                }
              `}
            >
              {visibleTasks.map((item) => (
                <div
                  key={item.id}
                  className="
                    border-b
                    border-[#e5e7eb]
                    p-4
                  "
                >
                  <div className="flex items-start justify-between gap-4">

                    {/* LEFT CONTENT */}
                    <div className="min-w-0">

                      {/* Submitted */}
                      <div>
                        <p className="text-[11px] text-[#747ca1]">
                          {item.submitted}
                        </p>

                        <p className="mt-[2px] text-[11px] text-[#747ca1]">
                          {item.submittedTime}
                        </p>
                      </div>

                      {/* Subject */}
                      <p className="mt-3 text-[12px] font-medium text-[#171b24]">
                        {item.subject}
                      </p>

                      {/* Task */}
                      <p className="mt-1 text-[11px] font-semibold text-[#171b24]">
                        {item.task}
                      </p>

                      <p className="mt-[2px] text-[11px] text-[#747ca1]">
                        {item.type}
                      </p>

                      {/* Grade */}
                      <p className="mt-2 text-[11px] font-medium text-[#171b24]">
                        Grade: {item.grade}
                      </p>
                    </div>

                    {/* ACTION */}
                    <button
                      type="button"
                      className="
                        flex
                        h-[28px]
                        min-w-[88px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[5px]
                        border
                        border-[#4b7dff]
                        bg-white
                        px-2
                        text-[9px]
                        font-medium
                        text-[#246bff]
                        transition-all
                        duration-200
                        hover:bg-[#f2f6ff]
                        active:scale-[0.98]
                      "
                    >
                      {item.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* =========================================
                MOBILE FOOTER
            ========================================== */}
            {hasMore && (
              <div
                className="
                  flex
                  h-[45px]
                  items-center
                  justify-center
                  border-t
                  border-[#e5e7eb]
                  bg-white
                "
              >
                <button
                  type="button"
                  onClick={toggleViewAll}
                  aria-expanded={showAll}
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    text-[12px]
                    font-medium
                    text-[#246bff]
                    transition-colors
                    duration-200
                    hover:text-[#1554d1]
                  "
                >
                  <span>
                    {showAll
                      ? "Show Less"
                      : `View All Completed (${completedTasks.length})`}
                  </span>

                  <ArrowRight
                    size={16}
                    strokeWidth={1.4}
                    className={`
                      transition-transform
                      duration-300
                      ${
                        showAll
                          ? "-rotate-90"
                          : "group-hover:translate-x-1"
                      }
                    `}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}