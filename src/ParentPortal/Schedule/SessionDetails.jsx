import React from 'react';
import { Calculator, Calendar, Clock, User, MessageSquare } from 'lucide-react';

export default function SessionDetails({ currentChild, weekOffset, selectedDay }) {
  // Sample sessions mapped to child ID or defaults
  const sessionsData = [
    {
      childId: 1,
      title: "Science",
      status: "Ongoing",
      statusColor: "text-purple-600 bg-purple-50",
      date: selectedDay || "Wednesday, May 20, 2026",
      time: "12:00 PM – 1:00 PM (60 min)",
      tutor: "Sarah Johnson",
      description: "Exploring states of matter, chemical changes, and hands-on observation.",
    },
    {
      childId: 2,
      title: "Mathematics",
      status: "Upcoming",
      statusColor: "text-blue-600 bg-blue-50",
      date: selectedDay || "Saturday, May 23, 2026",
      time: "10:00 AM – 11:00 AM (60 min)",
      tutor: "Amanda Lee",
      description: "Algebra: Solving linear equations and word problems.",
    },
    {
      childId: 3,
      title: "Art & Design",
      status: "Upcoming",
      statusColor: "text-blue-600 bg-blue-50",
      date: selectedDay || "Friday, May 22, 2026",
      time: "11:00 AM – 12:00 PM (60 min)",
      tutor: "Clara Oswald",
      description: "Color theory, shading techniques, and digital sketching fundamentals.",
    }
  ];

  // Find session matching the current child, or use a dynamic fallback
  const currentSession = sessionsData.find((s) => s.childId === currentChild?.id) || {
    title: "General Study Session",
    status: "Upcoming",
    statusColor: "text-blue-600 bg-blue-50",
    date: selectedDay || "Thursday, May 21, 2026",
    time: "2:00 PM – 3:00 PM (60 min)",
    tutor: "David James",
    description: `Review session and practice exercises tailored for ${currentChild?.name || 'Student'}.`,
  };

  return (
    <div className="w-full bg-slate-50 flex items-center justify-center font-sans">
      {/* Main Container Card */}
      <div className="w-full max-w-6xl bg-white border border-slate-200 rounded-xl shadow-sm px-6 py-5 flex flex-col md:flex-row items-stretch gap-6">
        
        {/* Left Column: Session Info */}
        <div className="flex-1 flex flex-col justify-between pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0">
          <div>
            {/* Top row: Section Title & Status Badge */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Session Details — <span className="text-blue-600">{currentChild?.name}</span>
              </h3>
              <span className={`px-3 py-0.5 text-xs font-semibold rounded-full ${currentSession.statusColor}`}>
                {currentSession.status}
              </span>
            </div>

            {/* Subject Title & Icon */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-900 flex items-center justify-center text-white shadow-sm shrink-0">
                <Calculator className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {currentSession.title}
              </h2>
            </div>
          </div>

          {/* Details list (Date, Time, Tutor) */}
          <div className="flex flex-col gap-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{currentSession.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{currentSession.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{currentSession.tutor}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Class Description & Action Button */}
        <div className="flex-1 flex flex-col justify-between pl-0 md:pl-2">
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Class Description
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentSession.description}
            </p>
          </div>

          {/* Message Tutor Button */}
          <div className="mt-4 md:mt-0">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              Message Tutor ({currentSession.tutor})
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}