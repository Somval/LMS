import React from 'react';
import { Activity, FileText, CheckCircle2, Circle, Quote } from 'lucide-react';

// Helper to generate dynamic activities and tutor insights based on the selected child
const getChildData = (childName) => {
  return {
    activities: [
      {
        type: `Completed: Fractions Quiz`,
        date: 'May 18, 2026',
        completed: true,
      },
      {
        type: `Completed: Algebra Basic`,
        date: 'May 16, 2026',
        completed: true,
      },
      {
        type: `Practice: Percentages Worksheet`,
        date: 'May 15, 2026',
        completed: false,
      },
    ],
    insight: `${childName} is showing consistent improvement in problem-solving skills. With more practice on linear equations and geometry concepts, they will continue to progress even faster.`,
    tutorName: 'Ms. Sarah Johnson',
    tutorRole: 'Mathematics Tutor',
    tutorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  };
};

export default function RecentActivityAndInsight({ currentChild }) {
  const childName = currentChild?.name || 'Olivia Johnson';
  const { activities, insight, tutorName, tutorRole, tutorAvatar } = getChildData(childName);

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
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.date}</p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="shrink-0">
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

        {/* Right Card: Tutor Insight */}
        <div className="bg-purple-50/70 rounded-3xl border border-purple-100/80 p-5 sm:p-6 md:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            {/* Header with Quote Icon */}
            <div className="flex items-center gap-2.5 text-purple-600 mb-4">
              <Quote className="w-6 h-6 fill-purple-600 text-purple-600 shrink-0" />
              <h3 className="font-bold text-base sm:text-lg text-slate-900">Tutor Insight</h3>
            </div>

            {/* Insight text */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {insight}
            </p>
          </div>

          <div>
            <hr className="border-purple-200/60 mb-4" />
            
            {/* Tutor Profile Footer */}
            <div className="flex items-center gap-3">
              <img 
                src={tutorAvatar} 
                alt={tutorName} 
                className="w-10 h-10 rounded-full object-cover border border-purple-200 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{tutorName}</h4>
                <p className="text-[11px] text-slate-500 truncate">{tutorRole}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}