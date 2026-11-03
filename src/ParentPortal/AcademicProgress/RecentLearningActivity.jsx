import React, { useMemo } from 'react';
import { Activity, FileText, CheckCircle2, Circle, Quote } from 'lucide-react';
import { buildInsight, formatDate } from './academicData';
import { initials } from '../Dashboard/dashboardData';

// data: GET /dashboard/parent/:studentId
export default function RecentActivityAndInsight({ currentChild, data }) {
  const childName = currentChild?.fullName || 'your child';
  const firstName = childName.split(/\s+/)[0];

  // The latest work handed in across all subjects, newest first.
  const activities = useMemo(
    () =>
      data.subjects
        .flatMap((subject) =>
          subject.recent.map((item) => ({
            type: `${item.graded ? 'Completed' : 'Submitted'}: ${item.title}`,
            at: item.at,
            completed: item.graded,
          }))
        )
        .sort((a, b) => new Date(b.at) - new Date(a.at))
        .slice(0, 5),
    [data]
  );

  const { text: insight, focus } = useMemo(() => buildInsight(firstName, data), [data, firstName]);
  const tutorName = focus?.tutors?.[0];

  return (
    <div className="w-full bg-slate-50 px-2 sm:px-4 lg:px-8 py-4 sm:py-6 font-sans text-slate-800 flex items-center justify-center">
      {/* Main Container Card - Expanded full width to match max-w-[92rem] */}
      <div className="w-full max-w-[92rem] grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Left Card: Recent Learning Activity */}
        <div className="bg-white rounded-3xl border border-sky-100/80 p-5 sm:p-6 md:p-8 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center gap-2.5 text-sky-600 mb-1">
              <Activity className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-base sm:text-lg text-slate-900">Recent Learning Activity</h3>
            </div>
            <p className="text-xs text-slate-400 mb-5 sm:mb-6">Latest updates and completed activities for <span className="font-semibold text-slate-600">{childName}</span>.</p>

            {activities.length === 0 && (
              <p className="text-sm text-slate-400">
                Nothing handed in yet. Completed homework and quizzes will show up here.
              </p>
            )}

            {/* Activity List */}
            <div className="space-y-4 sm:space-y-5">
              {activities.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 bg-slate-100/70 rounded-lg text-slate-600 mt-0.5 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.type}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{formatDate(item.at)}</p>
                    </div>
                  </div>

                  {/* Status Indicator: ticked once marked, open circle while waiting to be marked */}
                  <div className="shrink-0" title={item.completed ? 'Marked' : 'Waiting to be marked'}>
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-emerald-500/80 font-medium" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Learning Insight */}
        <div className="bg-purple-50/70 rounded-3xl border border-purple-100/80 p-5 sm:p-6 md:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            {/* Header with Quote Icon */}
            <div className="flex items-center gap-2.5 text-purple-600 mb-4">
              <Quote className="w-6 h-6 fill-purple-600 text-purple-600 shrink-0" />
              <h3 className="font-bold text-base sm:text-lg text-slate-900">Learning Insight</h3>
            </div>

            {/* Insight text, worked out from the child's own results */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {insight}
            </p>
          </div>

          {tutorName && (
            <div>
              <hr className="border-purple-200/60 mb-4" />

              {/* Tutor for the subject the insight is about */}
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-purple-200 bg-purple-100 text-xs font-bold text-purple-700"
                >
                  {initials(tutorName)}
                </span>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{tutorName}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{focus.subject} Tutor</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
