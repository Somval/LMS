import React, { useMemo, useState } from "react";
import {
  Search,
  Calculator,
  Users,
  Calendar,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const subjectsData = [
  {
    id: 1,
    title: "Mathematics",
    year: "Year 1",
    description: "Numbers, algebra, geometry and more.",
    students: 24,
    classes: 36,
    lessonNotes: 18,
  },
  {
    id: 2,
    title: "Mathematics",
    year: "Year 1",
    description: "Numbers, algebra, geometry and more.",
    students: 24,
    classes: 36,
    lessonNotes: 18,
  },
  {
    id: 3,
    title: "Mathematics",
    year: "Year 1",
    description: "Numbers, algebra, geometry and more.",
    students: 24,
    classes: 36,
    lessonNotes: 18,
  },
];

export default function SubjectDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredSubjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return subjectsData;
    }

    return subjectsData.filter((subject) =>
      `${subject.title} ${subject.year} ${subject.description}`
        .toLowerCase()
        .includes(query)
    );
  }, [searchTerm]);

  const handleViewSubject = (subject) => {
    navigate("/Tutor/subjects-details", {
      state: {
        subject,
      },
    });
  };

  return (
    <main className="min-h-screen w-full min-w-0 bg-white">
      <div className="mx-auto w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8 xl:px-10">
        <div className="w-full min-w-0 space-y-6">

          {/* Search */}
          <div className="w-full">
            <div className="relative w-full sm:max-w-md lg:max-w-lg">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Search className="h-4 w-4" strokeWidth={2} />
              </span>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search subjects..."
                aria-label="Search subjects"
                className="h-11 w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 shadow-[0_1px_3px_rgba(15,23,42,0.04)] outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15"
              />
            </div>
          </div>

          {/* Subject List */}
          <div className="w-full min-w-0">
            {filteredSubjects.length > 0 ? (
              <div className="w-full space-y-4">
                {filteredSubjects.map((subject) => (
                  <article
                    key={subject.id}
                    className="w-full min-w-0 overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_4px_rgba(15,23,42,0.05)] transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_14px_rgba(15,23,42,0.07)] sm:p-6 lg:p-7"
                  >
                    {/* Subject Header */}
                    <div className="flex w-full min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                      {/* Subject Information */}
                      <div className="flex min-w-0 flex-1 items-start gap-4">

                        {/* Subject Icon */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#303487] text-white shadow-sm sm:h-14 sm:w-14">
                          <Calculator
                            className="h-6 w-6 sm:h-7 sm:w-7"
                            strokeWidth={2}
                          />
                        </div>

                        {/* Subject Details */}
                        <div className="min-w-0 flex-1">

                          {/* Subject Title */}
                          <h2 className="m-0 truncate text-lg font-bold tracking-[-0.2px] text-slate-900 sm:text-xl">
                            {subject.title}
                          </h2>

                          {/* Year - Now Under Mathematics */}
                          <span className="mt-1 inline-flex items-center rounded-full bg-[#E3E7FB] px-3 py-1 text-xs font-semibold text-[#303487] sm:text-sm">
                            {subject.year}
                          </span>

                          {/* Description */}
                          <p className="mt-1.5 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500 sm:text-[15px]">
                            {subject.description}
                          </p>
                        </div>
                      </div>

                      {/* View Subject */}
                      <button
                        type="button"
                        onClick={() => handleViewSubject(subject)}
                        className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-2.5 text-sm font-bold text-[#303487] transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-100 hover:text-indigo-900 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 sm:w-auto sm:justify-start sm:border-0 sm:bg-transparent sm:px-0 sm:py-2 sm:hover:bg-transparent"
                      >
                        <span>View Subject</span>

                        <ArrowRight
                          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                          strokeWidth={2}
                        />
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="my-5 border-t border-slate-100 sm:my-6" />

                    {/* Metrics */}
                    <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">

                      {/* Students */}
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                          <Users
                            className="h-5 w-5"
                            strokeWidth={1.8}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-800 sm:text-[15px]">
                            {subject.students} Students
                          </p>

                          <p className="mt-0.5 text-xs font-medium text-slate-400">
                            Enrolled
                          </p>
                        </div>
                      </div>

                      {/* Classes */}
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <Calendar
                            className="h-5 w-5"
                            strokeWidth={1.8}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-800 sm:text-[15px]">
                            {subject.classes}
                          </p>

                          <p className="mt-0.5 text-xs font-medium text-slate-400">
                            Total classes
                          </p>
                        </div>
                      </div>

                      {/* Lesson Notes */}
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                          <BookOpen
                            className="h-5 w-5"
                            strokeWidth={1.8}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-800 sm:text-[15px]">
                            {subject.lessonNotes} Lesson Notes
                          </p>

                          <p className="mt-0.5 text-xs font-medium text-slate-400">
                            Created
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* No Results */
              <div className="flex w-full flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white px-6 py-14 text-center shadow-[0_1px_4px_rgba(15,23,42,0.04)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Search className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-900">
                  No subjects found
                </h3>

                <p className="mt-1.5 max-w-sm text-sm font-medium leading-relaxed text-slate-500">
                  Try searching for a different subject, year, or description.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}