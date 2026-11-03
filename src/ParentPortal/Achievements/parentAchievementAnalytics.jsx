import React from 'react';
import { Trophy, Calendar, Star } from 'lucide-react';
import { earnedThisMonth, formatDate, monthLabel } from './achievementsData';

// earned: everything the child has earned (newest first), from GET /rewards/earned.
export default function ReportAnalytics({ earned = [] }) {
  const latest = earned[0]; // the endpoint returns newest first

  return (
    <div className="w-full font-sans text-slate-800">
      {/* Main Container Card with 3 Columns */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">

        {/* Card 1: Achievements Earned */}
        <div className="p-6 md:p-8 flex items-center gap-5">
          {/* Purple Circular Icon Container */}
          <div className="w-16 h-16 rounded-full bg-[#EFE6FF] flex items-center justify-center shrink-0">
            <Trophy className="w-8 h-8 text-[#8B5CF6]" />
          </div>
          {/* Text Info */}
          <div>
            <p className="text-xs md:text-sm font-semibold text-slate-900">
              Achievements Earned
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              {earned.length}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              All time
            </p>
          </div>
        </div>

        {/* Card 2: This Month */}
        <div className="p-6 md:p-8 flex items-center gap-5">
          {/* Green Circular Icon Container */}
          <div className="w-16 h-16 rounded-full bg-[#E6F9EE] flex items-center justify-center shrink-0">
            <Calendar className="w-8 h-8 text-[#10B981]" />
          </div>
          {/* Text Info */}
          <div>
            <p className="text-xs md:text-sm font-semibold text-slate-900">
              This Month
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              {earnedThisMonth(earned)}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {monthLabel(new Date())}
            </p>
          </div>
        </div>

        {/* Card 3: Latest Achievement */}
        <div className="p-6 md:p-8 flex items-center gap-5">
          {/* Yellow Circular Icon Container */}
          <div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0">
            <Star className="w-8 h-8 text-[#F59E0B]" />
          </div>
          {/* Text Info */}
          <div className="min-w-0">
            <p className="text-xs md:text-sm font-semibold text-slate-900">
              Latest Achievement
            </p>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              {latest ? formatDate(latest.awardedAt) : '—'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              {latest ? latest.title : 'Nothing earned yet'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
