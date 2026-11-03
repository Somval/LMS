import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import {
  BookOpen,
  CheckCircle2,
  Award,
  ArrowRight,
} from "lucide-react";
import SubjectBreakdown from "../StudentPortal/subjectbreakdown";

export default function LearningDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/dashboard/student").then(setData).catch((err) => setError(err.message || "Could not load your progress."));
  }, []);

  const subjects = data?.subjects ?? [];
  const overall = data?.progress?.lessonProgress ?? 0;
  const lessonsDone = subjects.reduce((n, s) => n + s.lessonsCompleted, 0);
  const avgScore = data?.progress?.averageScore;
  const headline = overall >= 75 ? "great progress." : overall >= 40 ? "steady progress." : "a good start.";

  const courses = subjects.map((s) => ({
    id: s.subjectId,
    title: s.subject,
    topic: s.tutors?.length ? `Tutor: ${s.tutors[0]}` : "Tutor to be assigned",
    progress: s.lessonProgress,
    lessons: `${s.lessonsCompleted} / ${s.lessonsTotal}`,
  }));

  return (
    <div className="w-full font-sans text-slate-800">
      {/* =====================================================
          DASHBOARD CONTENT
      ====================================================== */}
      <div className="w-full space-y-6">

        {/* =====================================================
            TOP OVERVIEW
        ====================================================== */}
        <section className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[1fr_1.8fr]">

          {/* Overall Learning Progress */}
          <div className="w-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex h-full items-center gap-5">

              <div className="relative h-[120px] w-[120px] shrink-0">
                <svg
                  viewBox="0 0 120 120"
                  className="h-full w-full -rotate-90"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="9"
                    className="text-slate-100"
                  />

                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={301.59}
                    strokeDashoffset={301.59 - (301.59 * overall) / 100}
                    className="text-indigo-900 transition-all duration-700"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[25px] font-bold leading-none text-indigo-900">
                    {overall}%
                  </span>

                  <span className="mt-1 max-w-[70px] text-[8px] font-medium leading-tight text-slate-400">
                    Overall Learning Progress
                  </span>
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-[12px] font-medium leading-5 text-slate-500">
                  You're making
                </p>

                <p className="text-[14px] font-bold leading-5 text-indigo-900">
                  {headline}
                </p>

                <p className="mt-2 text-[11px] text-slate-500">
                  Keep going! 💪
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="w-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="grid h-full grid-cols-1 sm:grid-cols-3">

              <div className="flex items-center justify-center border-b border-slate-100 px-4 py-4 sm:border-b-0 sm:border-r">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-slate-400">
                      Subjects Active
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {subjects.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center border-b border-slate-100 px-4 py-4 sm:border-b-0 sm:border-r">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-slate-400">
                      Lessons Completed
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {lessonsDone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center px-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                    <Award className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-slate-400">
                      Average Score
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {avgScore == null ? "–" : `${avgScore}%`}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            LEARNING PROGRESS
        ====================================================== */}
        <section className="w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-[16px] font-bold text-slate-900">
                Learning Progress
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Track your progress across all active subjects.
              </p>
            </div>

            <span className="w-fit rounded-full bg-indigo-50 px-3 py-1.5 text-[9px] font-semibold text-indigo-700">
              {subjects.length} Active Course{subjects.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="w-full px-5 sm:px-6">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className={`
                  grid grid-cols-1 gap-4 py-5
                  md:grid-cols-[200px_minmax(0,1fr)_110px]
                  md:items-center md:gap-8
                  ${
                    index !== courses.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }
                `}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

                    <h3 className="truncate text-[12px] font-bold text-slate-900">
                      {course.title}
                    </h3>
                  </div>

                  <p className="mt-1 pl-4 text-[9px] font-medium text-slate-400">
                    {course.topic}
                  </p>
                </div>

                <div className="min-w-0">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[8px] font-medium text-slate-400">
                      Course progress
                    </span>

                    <span className="text-[9px] font-bold text-indigo-900">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-900 transition-all duration-700"
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-1.5 text-[8px] text-slate-400">
                    {course.lessons} lessons completed
                  </p>
                </div>

                <div className="w-full md:text-right">
                  <button
                    type="button"
                    onClick={() => navigate(`/student/learning/${course.id}`)}
                    className="
                      inline-flex w-full items-center justify-center
                      gap-2 rounded-lg border border-indigo-100
                      bg-white px-3 py-2
                      text-[9px] font-semibold text-indigo-700
                      transition-all duration-200
                      hover:border-indigo-200
                      hover:bg-indigo-50
                      md:w-auto
                    "
                  >
                    View Course
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            SUBJECT BREAKDOWN
        ====================================================== */}
        {error && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
        )}
        <SubjectBreakdown subjects={subjects} />

      </div>
    </div>
  );
}