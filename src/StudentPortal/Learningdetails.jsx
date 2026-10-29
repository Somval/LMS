import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  ArrowRight,
} from "lucide-react";

import CourseDetail from "./Courseinformation";

export default function Dashboard({
  subjects = [],
  searchQuery,
  setSearchQuery,
}) {
  /*
  |--------------------------------------------------------------------------
  | SELECTED COURSE
  |--------------------------------------------------------------------------
  | Store only the course ID.
  | This survives page refreshes.
  |--------------------------------------------------------------------------
  */

  const [selectedCourseId, setSelectedCourseId] = useState(() => {
    return localStorage.getItem("selectedCourseId");
  });

  /*
  |--------------------------------------------------------------------------
  | FIND SELECTED COURSE
  |--------------------------------------------------------------------------
  */

  const selectedCourse = useMemo(() => {
    if (!selectedCourseId) return null;

    return (
      subjects.find(
        (subject) => String(subject.id) === String(selectedCourseId)
      ) || null
    );
  }, [subjects, selectedCourseId]);

  /*
  |--------------------------------------------------------------------------
  | CLEAR INVALID COURSE
  |--------------------------------------------------------------------------
  | If the course no longer exists in the backend, remove the saved ID.
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (
      selectedCourseId &&
      subjects.length > 0 &&
      !subjects.some(
        (subject) =>
          String(subject.id) === String(selectedCourseId)
      )
    ) {
      localStorage.removeItem("selectedCourseId");
      setSelectedCourseId(null);
    }
  }, [subjects, selectedCourseId]);

  /*
  |--------------------------------------------------------------------------
  | OPEN COURSE
  |--------------------------------------------------------------------------
  */

  const handleSelectCourse = (course) => {
    localStorage.setItem(
      "selectedCourseId",
      String(course.id)
    );

    setSelectedCourseId(course.id);
  };

  /*
  |--------------------------------------------------------------------------
  | BACK TO COURSES
  |--------------------------------------------------------------------------
  */

  const handleBack = () => {
    localStorage.removeItem("selectedCourseId");
    setSelectedCourseId(null);
  };

  /*
  |--------------------------------------------------------------------------
  | COURSE DETAIL
  |--------------------------------------------------------------------------
  */

  if (selectedCourse) {
    return (
      <CourseDetail
        course={selectedCourse}
        onBack={handleBack}
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  const filteredSubjects = subjects.filter((subject) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      subject.title
        .toLowerCase()
        .includes(query) ||
      subject.category
        .toLowerCase()
        .includes(query)
    );
  });

  /*
  |--------------------------------------------------------------------------
  | DASHBOARD
  |--------------------------------------------------------------------------
  */

  return (
    <section className="min-h-screen w-full bg-[#F5F7FC] font-sans">
      <div className="w-full px-5 py-6 sm:px-6 lg:px-7 xl:px-8">

        {/* SEARCH */}

        <div className="mb-7 w-full max-w-[560px]">
          <div className="relative">
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
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
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
        </div>

        {/* COURSE GRID */}

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
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="
                flex
                min-h-[400px]
                w-full
                flex-col
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
              <div className="flex-1">

                {/* HEADER */}

                <div className="mb-5 flex items-center gap-4">
                  <div
                    className={`
                      flex
                      h-[52px]
                      w-[52px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-[9px]
                      ${subject.theme.iconBg}
                    `}
                  >
                    {subject.theme.icon}
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
                        ${subject.theme.text}
                      `}
                    >
                      {subject.category}
                    </span>

                    <h3
                      className="
                        text-[15px]
                        font-bold
                        leading-[20px]
                        text-slate-900
                      "
                    >
                      {subject.title}
                    </h3>
                  </div>
                </div>

                {/* DESCRIPTION */}

                <p
                  className="
                    mb-7
                    min-h-[52px]
                    text-[13px]
                    leading-[19px]
                    text-slate-500
                  "
                >
                  {subject.description}
                </p>

                {/* PROGRESS */}

                <div className="mb-7">
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`
                        text-[11px]
                        font-semibold
                        ${subject.theme.text}
                      `}
                    >
                      {subject.progress}% Complete
                    </span>

                    <span
                      className="
                        whitespace-nowrap
                        text-[11px]
                        font-medium
                        text-slate-400
                      "
                    >
                      {subject.lessonsCompleted} of{" "}
                      {subject.totalLessons} lessons
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
                        ${subject.theme.barBg}
                        transition-all
                        duration-500
                      `}
                      style={{
                        width: `${subject.progress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="mt-auto space-y-3">

                <button
                  type="button"
                  onClick={() =>
                    handleSelectCourse(subject)
                  }
                  className={`
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
                    ${subject.theme.primary}
                    ${subject.theme.hover}
                  `}
                >
                  <span>Continue Learning</span>

                  <ArrowRight
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectCourse(subject)
                  }
                  className={`
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
                    ${subject.theme.text}
                    ${subject.theme.border}
                    hover:bg-slate-50
                  `}
                >
                  <span>View Course</span>

                  <ArrowRight
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}

        {filteredSubjects.length === 0 && (
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