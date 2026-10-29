import React, { useState } from "react";
import {
  Search,
  Calculator,
  BookOpen,
  Atom,
  ArrowRight,
} from "lucide-react";

import CourseDetail from "./Courseinformation";

const coursesData = [
  {
    id: 1,
    title: "Linear Equations & Algebra",
    category: "MATHEMATICS",
    description:
      "Learn the fundamentals of algebra, linear equations, and problem solving.",
    progress: 72,
    completedLessons: 24,
    totalLessons: 32,
    theme: {
      icon: Calculator,
      badgeText: "text-[#2F327D]",
      iconBg: "bg-[#2F327D] text-white",
      barColor: "bg-[#2F327D]",
      btnPrimary: "bg-[#2F327D] hover:bg-[#252865] text-white",
      btnSecondary:
        "border-[#2F327D] text-[#2F327D] hover:bg-[#2F327D]/5",
      arrowColor: "text-white",
      secondaryArrow: "text-[#2F327D]",
    },
  },
  {
    id: 2,
    title: "Reading & Writing Skills",
    category: "ENGLISH LANGUAGE",
    description:
      "Improve your reading comprehension and writing techniques.",
    progress: 72,
    completedLessons: 24,
    totalLessons: 32,
    theme: {
      icon: BookOpen,
      badgeText: "text-amber-500",
      iconBg: "bg-amber-400 text-white",
      barColor: "bg-amber-400",
      btnPrimary:
        "bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold",
      btnSecondary:
        "border-amber-400 text-amber-600 hover:bg-amber-50",
      arrowColor: "text-slate-900",
      secondaryArrow: "text-amber-600",
    },
  },
  {
    id: 3,
    title: "General Science",
    category: "SCIENCE",
    description:
      "Learn the fundamentals of algebra, linear equations, and problem solving.",
    progress: 72,
    completedLessons: 24,
    totalLessons: 32,
    theme: {
      icon: Atom,
      badgeText: "text-emerald-500",
      iconBg: "bg-emerald-500 text-white",
      barColor: "bg-emerald-500",
      btnPrimary: "bg-emerald-500 hover:bg-emerald-600 text-white",
      btnSecondary:
        "border-emerald-500 text-emerald-600 hover:bg-emerald-50",
      arrowColor: "text-white",
      secondaryArrow: "text-emerald-600",
    },
  },
  {
    id: 4,
    title: "Reading & Writing Skills",
    category: "ENGLISH LANGUAGE",
    description:
      "Improve your reading comprehension and writing techniques.",
    progress: 72,
    completedLessons: 24,
    totalLessons: 32,
    theme: {
      icon: BookOpen,
      badgeText: "text-amber-500",
      iconBg: "bg-amber-400 text-white",
      barColor: "bg-amber-400",
      btnPrimary:
        "bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold",
      btnSecondary:
        "border-amber-400 text-amber-600 hover:bg-amber-50",
      arrowColor: "text-slate-900",
      secondaryArrow: "text-amber-600",
    },
  },
  {
    id: 5,
    title: "General Science",
    category: "SCIENCE",
    description:
      "Learn the fundamentals of algebra, linear equations, and problem solving.",
    progress: 72,
    completedLessons: 24,
    totalLessons: 32,
    theme: {
      icon: Atom,
      badgeText: "text-emerald-500",
      iconBg: "bg-emerald-500 text-white",
      barColor: "bg-emerald-500",
      btnPrimary: "bg-emerald-500 hover:bg-emerald-600 text-white",
      btnSecondary:
        "border-emerald-500 text-emerald-600 hover:bg-emerald-50",
      arrowColor: "text-white",
      secondaryArrow: "text-emerald-600",
    },
  },
  {
    id: 6,
    title: "Linear Equations & Algebra",
    category: "MATHEMATICS",
    description:
      "Learn the fundamentals of algebra, linear equations, and problem solving.",
    progress: 72,
    completedLessons: 24,
    totalLessons: 32,
    theme: {
      icon: Calculator,
      badgeText: "text-[#2F327D]",
      iconBg: "bg-[#2F327D] text-white",
      barColor: "bg-[#2F327D]",
      btnPrimary: "bg-[#2F327D] hover:bg-[#252865] text-white",
      btnSecondary:
        "border-[#2F327D] text-[#2F327D] hover:bg-[#2F327D]/5",
      arrowColor: "text-white",
      secondaryArrow: "text-[#2F327D]",
    },
  },
];

export default function CourseDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = coursesData.filter((course) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      course.title.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    );
  });

  /* ============================================================
     COURSE DETAIL
  ============================================================ */

  if (selectedCourse) {
    return (
      <CourseDetail
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

  return (
    <section className="min-h-screen w-full font-sans">
      <div className="w-full px-5 py-6 sm:px-6 lg:px-7 xl:px-8">

        {/* ======================================================
            SEARCH & ENROLL HEADER
        ====================================================== */}

        <div className="mb-7 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-[560px]">
            <Search
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-slate-400
              "
              strokeWidth={2}
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subjects..."
              className="
                h-[48px]
                w-full
                rounded-[9px]
                border
                border-slate-200
                bg-white
                pl-12
                pr-4
                text-[14px]
                font-normal
                text-slate-800
                placeholder:text-slate-400
                shadow-sm
                outline-none
                transition-all
                focus:border-[#2F327D]
                focus:ring-2
                focus:ring-[#2F327D]/10
              "
            />
          </div>

          <button
            type="button"
            className="
              flex
              h-[48px]
              items-center
              justify-center
              gap-2
              rounded-[9px]
              bg-[#2E6DFF]
              px-5
              text-[14px]
              font-medium
              text-white
              shadow-sm
              transition-all
              hover:bg-[#255be8]
              whitespace-nowrap
            "
          >
            <span>Enroll new Subject</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* ======================================================
            COURSE GRID
        ====================================================== */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
            2xl:gap-6
          "
        >
          {filteredCourses.map((course) => {
            const IconComponent = course.theme.icon;

            return (
              <div
                key={course.id}
                className="
                  flex
                  w-full
                  flex-col
                  justify-between
                  rounded-[12px]
                  border
                  border-slate-100
                  bg-white
                  p-6
                  shadow-[0_2px_10px_rgba(0,0,0,0.04)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)]
                "
              >
                {/* ==================================================
                    TOP CONTENT CONTAINER
                ================================================== */}

                <div className="space-y-5">

                  {/* HEADER */}

                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        flex
                        h-[52px]
                        w-[52px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[9px]
                        ${course.theme.iconBg}
                      `}
                    >
                      <IconComponent
                        className="h-[25px] w-[25px]"
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span
                        className={`
                          mb-1
                          block
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.04em]
                          ${course.theme.badgeText}
                        `}
                      >
                        {course.category}
                      </span>

                      <h3
                        className="
                          text-[15px]
                          font-bold
                          leading-[20px]
                          tracking-[-0.01em]
                          text-slate-900
                        "
                      >
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      text-[13px]
                      leading-[19px]
                      text-slate-500
                    "
                  >
                    {course.description}
                  </p>

                  {/* ==================================================
                      PROGRESS
                  ================================================== */}

                  <div className="space-y-2 pt-1">
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className={`
                          text-[11px]
                          font-semibold
                          ${course.theme.badgeText}
                        `}
                      >
                        {course.progress}% Complete
                      </span>

                      <span
                        className="
                          whitespace-nowrap
                          text-[11px]
                          font-medium
                          text-slate-400
                        "
                      >
                        {course.completedLessons} of{" "}
                        {course.totalLessons} lessons
                      </span>
                    </div>

                    <div
                      className="
                        h-[9px]
                        w-full
                        overflow-hidden
                        rounded-full
                        bg-slate-100
                      "
                    >
                      <div
                        className={`
                          h-full
                          rounded-full
                          transition-all
                          duration-500
                          ${course.theme.barColor}
                        `}
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* ==================================================
                    ACTION BUTTONS
                ================================================== */}

                <div className="mt-6 space-y-3 pt-2">

                  {/* CONTINUE LEARNING */}

                  <button
                    type="button"
                    onClick={() => setSelectedCourse(course)}
                    className={`
                      group
                      flex
                      h-[43px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[7px]
                      px-4
                      text-[12px]
                      font-medium
                      transition-all
                      ${course.theme.btnPrimary}
                    `}
                  >
                    <span>Continue Learning</span>

                    <ArrowRight
                      className={`
                        h-4
                        w-4
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                        ${course.theme.arrowColor}
                      `}
                      strokeWidth={1.8}
                    />
                  </button>

                  {/* VIEW COURSE */}

                  <button
                    type="button"
                    onClick={() => setSelectedCourse(course)}
                    className={`
                      group
                      flex
                      h-[43px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[7px]
                      border
                      bg-white
                      px-4
                      text-[12px]
                      font-medium
                      transition-all
                      ${course.theme.btnSecondary}
                    `}
                  >
                    <span>View Course</span>

                    <ArrowRight
                      className={`
                        h-4
                        w-4
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                        ${course.theme.secondaryArrow}
                      `}
                      strokeWidth={1.8}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================
            EMPTY STATE
        ====================================================== */}

        {filteredCourses.length === 0 && (
          <div
            className="
              flex
              min-h-[280px]
              w-full
              items-center
              justify-center
              rounded-[12px]
              border
              border-dashed
              border-slate-200
              bg-white
            "
          >
            <div className="text-center">
              <Search className="mx-auto mb-3 h-7 w-7 text-slate-300" />

              <p className="text-[14px] font-medium text-slate-600">
                No subjects found
              </p>

              <p className="mt-1 text-[12px] text-slate-400">
                No courses match "{searchQuery}"
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}