import React from 'react';
import { Calendar, CheckCircle2, XCircle } from 'lucide-react';

// JSON dataset keyed by child ID
const attendanceJsonData = [
  {
    childId: 1,
    name: 'Olivia Johnson',
    scheduled: 16,
    attended: 14,
    missed: 2,
    rate: '80%',
    status: 'Good',
  },
  {
    childId: 2,
    name: 'Liam Smith',
    scheduled: 20,
    attended: 19,
    missed: 1,
    rate: '95%',
    status: 'Excellent',
  },
  {
    childId: 3,
    name: 'Emma Davis',
    scheduled: 15,
    attended: 12,
    missed: 3,
    rate: '80%',
    status: 'Good',
  }
];

export default function AttendanceSummaryCards({ currentChild }) {
  // Extracts the child ID whether currentChild is an object ({ id: 1 }) or directly a number/string ID
  const activeId = typeof currentChild === 'object' ? currentChild?.id : currentChild;
  
  // Retrieve attendance data from JSON dataset, defaulting to ID 1 (Olivia) if not found
  const attendance = attendanceJsonData.find((item) => item.childId === Number(activeId)) || attendanceJsonData[0];

  return (
    <div className="w-full bg-slate-50 px-2 sm:px-4 lg:px-8 py-4 flex items-center justify-center font-sans text-slate-800">
      {/* Main Container Card: exactly 1085px width and 212px height on desktop */}
      <div className="w-[1085px] max-w-full lg:h-[212px] bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 md:p-6 flex flex-col justify-between">
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
          
          {/* Card 1: Sessions Scheduled */}
          <div className="bg-[#ECEEF8] rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D6D9F1] rounded-full flex items-center justify-center text-[#2D336B] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs md:text-sm font-semibold text-slate-700 leading-tight">
                Sessions Scheduled
              </span>
            </div>
            <div className="mt-4 lg:mt-0">
              <span className="font-['Inter',sans-serif] text-[40px] font-bold leading-none text-slate-900 tracking-tight">
                {attendance.scheduled}
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
                {attendance.attended}
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
                {attendance.missed}
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
                    strokeDashoffset={100.5 - (100.5 * parseInt(attendance.rate)) / 100}
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
                {attendance.rate}
              </span>
              <span className="text-xs font-bold text-emerald-600 mt-1">
                {attendance.status}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}