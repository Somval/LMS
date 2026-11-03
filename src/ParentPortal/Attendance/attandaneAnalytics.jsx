import React from 'react';
import { Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { rateLabel } from './attendanceData';

// stats: { held, attended, missed, rate } for the chosen child and period (see summarise()).
export default function AttendanceSummaryCards({ stats }) {
  const { held, attended, missed, rate } = stats;
  const label = rateLabel(rate);

  return (
    <div className="w-full bg-slate-50 px-2 sm:px-4 lg:px-8 py-4 flex items-center justify-center font-sans text-slate-800">
      {/* Main Container Card: exactly 1085px width and 212px height on desktop */}
      <div className="w-[1085px] max-w-full lg:h-[212px] bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 md:p-6 flex flex-col justify-between">

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full">

          {/* Card 1: Sessions Held */}
          <div className="bg-[#ECEEF8] rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D6D9F1] rounded-full flex items-center justify-center text-[#2D336B] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs md:text-sm font-semibold text-slate-700 leading-tight">
                Sessions Held
              </span>
            </div>
            <div className="mt-4 lg:mt-0">
              <span className="font-['Inter',sans-serif] text-[40px] font-bold leading-none text-slate-900 tracking-tight">
                {held}
              </span>
            </div>
          </div>

          {/* Card 2: Attended Sessions */}
          <div className="bg-[#EAFBF1] rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C9F5D9] rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs md:text-sm font-semibold text-slate-700 leading-tight">
                Attended Sessions
              </span>
            </div>
            <div className="mt-4 lg:mt-0">
              <span className="font-['Inter',sans-serif] text-[40px] font-bold leading-none text-slate-900 tracking-tight">
                {attended}
              </span>
            </div>
          </div>

          {/* Card 3: Missed Sessions */}
          <div className="bg-[#FDF1F2] rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FBD6D8] rounded-full flex items-center justify-center text-rose-600 shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
              <span className="text-xs md:text-sm font-semibold text-slate-700 leading-tight">
                Missed Sessions
              </span>
            </div>
            <div className="mt-4 lg:mt-0">
              <span className="font-['Inter',sans-serif] text-[40px] font-bold leading-none text-slate-900 tracking-tight">
                {missed}
              </span>
            </div>
          </div>

          {/* Card 4: Attendance Rate */}
          <div className="bg-[#E4F7FA] rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              {/* Circular Progress Ring Icon */}
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <svg className="w-10 h-10 transform -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    className="text-[#C6EDF4]"
                    fill="transparent"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeDasharray={100.5}
                    strokeDashoffset={100.5 - (100.5 * (rate ?? 0)) / 100}
                    strokeLinecap="round"
                    className="text-[#2D336B]"
                    fill="transparent"
                  />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-semibold text-slate-700 leading-tight">
                Attendance Rate
              </span>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-col">
              <span className="font-['Inter',sans-serif] text-[40px] font-bold leading-none text-slate-900 tracking-tight">
                {rate == null ? '—' : `${rate}%`}
              </span>
              <span className={`text-xs font-bold mt-1 ${label.color}`}>
                {label.text}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
