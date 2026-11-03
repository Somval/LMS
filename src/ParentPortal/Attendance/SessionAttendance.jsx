import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, ChevronDown } from 'lucide-react';
import { PERIODS, formatDate, timeRange } from './attendanceData';

const PAGE_SIZE = 10;

// How each status is shown. ABSENT is labelled "Missed" to match the cards above.
const STATUS_BADGES = {
  PRESENT: {
    label: 'Attended',
    icon: CheckCircle2,
    className: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
  },
  LATE: {
    label: 'Late',
    icon: Clock,
    className: 'bg-amber-50 text-amber-600 border border-amber-200/60',
  },
  ABSENT: {
    label: 'Missed',
    icon: XCircle,
    className: 'bg-rose-50 text-rose-600 border border-rose-200/60',
  },
};

// rows: the child's attendance records for the chosen period, newest first.
// The period is shared with the filter bar at the top of the page.
export default function SessionAttendance({ rows, selectedPeriod, onPeriodSelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  return (
    <div className="w-full font-sans text-slate-800">
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 sm:p-6 md:p-8 space-y-6">

        {/* Header Row with Title and Filter Dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Session Attendance</h2>

          {/* Selectable Filter Dropdown Button */}
          <div className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <span>{selectedPeriod.label}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-full sm:w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                {PERIODS.map((period) => (
                  <button
                    key={period.id}
                    type="button"
                    onClick={() => {
                      onPeriodSelect?.(period);
                      setVisible(PAGE_SIZE);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left font-medium transition-colors ${
                      selectedPeriod.id === period.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
          <table className="w-full text-left border-collapse min-w-[700px]">

            {/* Table Header */}
            <thead>
              <tr className="bg-[#2D336B] text-white text-xs md:text-sm font-medium">
                <th className="py-4 px-6 rounded-tl-xl font-semibold">Date</th>
                <th className="py-4 px-6 font-semibold">Subject</th>
                <th className="py-4 px-6 font-semibold">Time</th>
                <th className="py-4 px-6 font-semibold">Class</th>
                <th className="py-4 px-6 rounded-tr-xl font-semibold">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 text-sm">
              {rows.slice(0, visible).map((row) => {
                const badge = STATUS_BADGES[row.status];
                const Icon = badge.icon;
                return (
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">{formatDate(row.class.startsAt)}</td>
                    <td className="py-4 px-6 text-slate-700 font-medium whitespace-nowrap">{row.class.subject.name}</td>
                    <td className="py-4 px-6 text-slate-500 whitespace-nowrap">{timeRange(row.class)}</td>
                    <td className="py-4 px-6 text-slate-600 whitespace-nowrap">{row.class.title}</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 px-6 text-center text-sm text-slate-400">
                    No attendance has been recorded for {selectedPeriod.label.toLowerCase()} yet.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {rows.length > visible && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((count) => count + PAGE_SIZE)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Show more ({rows.length - visible} remaining)
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
