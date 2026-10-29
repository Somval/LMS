import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown } from 'lucide-react';

const attendanceData = [
  {
    id: 1,
    date: 'Aug 10, 2025',
    subject: 'Mathematics',
    time: '4:00 PM – 5:00 PM',
    joinedAt: '3:58 PM',
    timeSpent: '58 min',
    status: 'Attended',
  },
  {
    id: 2,
    date: 'Aug 10, 2025',
    subject: 'Mathematics',
    time: '4:00 PM – 5:00 PM',
    joinedAt: '—',
    timeSpent: '—',
    status: 'Missed',
  },
  {
    id: 3,
    date: 'Aug 10, 2025',
    subject: 'Mathematics',
    time: '4:00 PM – 5:00 PM',
    joinedAt: '3:58 PM',
    timeSpent: '58 min',
    status: 'Attended',
  },
  {
    id: 4,
    date: 'Aug 10, 2025',
    subject: 'Mathematics',
    time: '4:00 PM – 5:00 PM',
    joinedAt: '3:58 PM',
    timeSpent: '58 min',
    status: 'Attended',
  },
  {
    id: 5,
    date: 'Aug 10, 2025',
    subject: 'Mathematics',
    time: '4:00 PM – 5:00 PM',
    joinedAt: '3:58 PM',
    timeSpent: '58 min',
    status: 'Attended',
  },
];

const periodOptions = [
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
  { id: 'year', label: 'This Year' },
];

export default function SessionAttendance() {
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                {periodOptions.map((period) => (
                  <button
                    key={period.id}
                    type="button"
                    onClick={() => {
                      setSelectedPeriod(period);
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
                <th className="py-4 px-6 font-semibold">Joined At</th>
                <th className="py-4 px-6 font-semibold">Time Spent</th>
                <th className="py-4 px-6 rounded-tr-xl font-semibold">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 text-sm">
              {attendanceData.map((row) => {
                const isAttended = row.status === 'Attended';
                return (
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">{row.date}</td>
                    <td className="py-4 px-6 text-slate-700 font-medium whitespace-nowrap">{row.subject}</td>
                    <td className="py-4 px-6 text-slate-500 whitespace-nowrap">{row.time}</td>
                    <td className="py-4 px-6 text-slate-600 whitespace-nowrap">{row.joinedAt}</td>
                    <td className="py-4 px-6 text-slate-600 whitespace-nowrap">{row.timeSpent}</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {isAttended ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Attended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200/60">
                          <XCircle className="w-3.5 h-3.5" />
                          Missed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}