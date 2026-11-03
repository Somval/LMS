import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  FileText,
  Target,
  TrendingUp,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';
import {
  SUBJECT_COLORS,
  STATUS_HEADLINE,
  monthlyChange,
  splitAssessments,
  statusDescription,
  statusOf,
} from './academicData';

// data: GET /dashboard/parent/:studentId
export default function SubjectBreakdown({ currentChild, data }) {
  const childName = currentChild?.fullName || 'your child';
  const firstName = childName.split(/\s+/)[0];

  const subjects = data.subjects;
  const [activeId, setActiveId] = useState(subjects[0]?.subjectId ?? null);

  const activeIndex = Math.max(subjects.findIndex((s) => s.subjectId === activeId), 0);
  const subject = subjects[activeIndex];
  const colors = SUBJECT_COLORS[activeIndex % SUBJECT_COLORS.length];

  const details = useMemo(() => {
    if (!subject) return null;
    const status = statusOf(subject);
    return {
      status,
      month: monthlyChange(data.lessons.bySubject?.[subject.subjectId] ?? [], subject.lessonsTotal),
      ...splitAssessments(subject.assessments),
    };
  }, [data, subject]);

  if (!subject) {
    return (
      <div className="w-full bg-slate-50 px-2 sm:px-4 lg:px-8 py-4 sm:py-6 font-sans text-slate-800">
        <div className="w-full max-w-[92rem] mx-auto bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
          <h2 className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight">Subject Breakdown</h2>
          <p className="mt-2 text-sm text-slate-500">
            {firstName} hasn't selected any subjects yet. Detailed progress will show here once they have.
          </p>
        </div>
      </div>
    );
  }

  const { status, month, goingWell, needsPractice } = details;

  return (
    <div className="w-full bg-slate-50 px-2 sm:px-4 lg:px-8 py-4 sm:py-6 font-sans text-slate-800">
      {/* Main Container Card - Expanded full width up to max-w-[92rem] */}
      <div className="w-full max-w-[92rem] mx-auto bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">

        {/* Header Section */}
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight">Subject Breakdown</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Select a subject to see detailed progress and areas of focus for <span className="font-semibold text-slate-700">{childName}</span>.</p>

          {/* Subject Switcher Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-5">
            {subjects.map((item, index) => {
              const itemColors = SUBJECT_COLORS[index % SUBJECT_COLORS.length];
              const isSelected = item.subjectId === subject.subjectId;
              return (
                <button
                  key={item.subjectId}
                  type="button"
                  onClick={() => setActiveId(item.subjectId)}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl transition-all text-left shadow-2xs ${
                    isSelected
                      ? `${itemColors.selected} ring-2 ring-slate-900/5`
                      : 'bg-slate-50/85 hover:bg-slate-100/80 border border-slate-200/60'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg flex items-center justify-center shrink-0 ${itemColors.bg}`}>
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-slate-900 text-sm md:text-base">{item.subject}</span>
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Selected Subject Detailed View */}
        <div className="space-y-6 sm:space-y-8">
          {/* Subject Title Bar */}
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg flex items-center justify-center ${colors.bg}`}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{subject.subject}</h3>
          </div>

          {/* Top Analytics Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

            {/* Left Card: Progress Ring & Overall Status */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-around gap-6 shadow-2xs">
              {/* Circular Progress Representation using SVG */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-slate-100"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeDasharray={326.7}
                    strokeDashoffset={326.7 - (326.7 * subject.lessonProgress) / 100}
                    strokeLinecap="round"
                    className="text-indigo-900 transition-all duration-700 ease-out"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-slate-900">{subject.lessonProgress}%</span>
                </div>
              </div>

              {/* Status Details */}
              <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-slate-900">{STATUS_HEADLINE[status]}</h4>
                <p className="text-xs text-slate-500">{statusDescription(status, firstName, subject.subject)}</p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-600 font-bold text-xs sm:text-sm pt-1 flex-wrap">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span>{month.change > 0 ? `${month.change}%` : 'No change'}</span>
                  <span className="text-slate-400 font-normal text-[11px]">
                    {month.change > 0 ? 'Improvement' : 'Change'} from last month ({month.before}%)
                  </span>
                </div>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${status === 'Improving' ? 'bg-rose-500' : status === 'Not Started' ? 'bg-slate-300' : 'bg-emerald-500 animate-pulse'}`}></span>
                  <span className="text-xs font-medium text-slate-700">{status}</span>
                </div>
              </div>
            </div>

            {/* Right Card: Subject Summary Metrics */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-4">Subject Summary</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-600">Lessons Completed</span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {subject.lessonsCompleted}
                    <span className="font-medium text-slate-400"> / {subject.lessonsTotal}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-600">Assessments Taken</span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {subject.courseworkSubmitted}
                    <span className="font-medium text-slate-400"> / {subject.courseworkTotal}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <Target className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-600">Average Score</span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {subject.averageScore == null ? '—' : `${subject.averageScore}%`}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Grid: What's Going Well vs Needs More Practice */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

            {/* What's Going Well Box */}
            <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5 sm:p-6 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2.5 text-emerald-700">
                <ThumbsUp className="w-5 h-5" />
                <h4 className="font-bold text-sm sm:text-base">What's Going Well</h4>
              </div>
              <p className="text-xs text-slate-500">{firstName} is doing great in these areas.</p>

              {goingWell.length === 0 && (
                <p className="text-xs text-slate-400">
                  {subject.assessments.length === 0
                    ? 'No graded work yet. Results will appear here once assessments are marked.'
                    : 'No scores of 70% or above yet.'}
                </p>
              )}

              <div className="space-y-3.5">
                {goingWell.map((item) => (
                  <div key={item.title} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 min-w-[140px] sm:min-w-[180px]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{item.title}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.percent}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-700 w-10 text-right">{item.percent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Needs More Practice Box */}
            <div className="bg-amber-50/40 border border-amber-100/80 rounded-2xl p-5 sm:p-6 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2.5 text-amber-700">
                <AlertCircle className="w-5 h-5" />
                <h4 className="font-bold text-sm sm:text-base">Needs More Practice</h4>
              </div>
              <p className="text-xs text-slate-500">These areas need more focus.</p>

              {needsPractice.length === 0 && (
                <p className="text-xs text-slate-400">
                  {subject.assessments.length === 0
                    ? 'No graded work yet.'
                    : `Nothing to worry about. Every score is 70% or above.`}
                </p>
              )}

              <div className="space-y-3.5">
                {needsPractice.map((item) => (
                  <div key={item.title} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 min-w-[140px] sm:min-w-[180px]">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{item.title}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.percent}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-700 w-10 text-right">{item.percent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
