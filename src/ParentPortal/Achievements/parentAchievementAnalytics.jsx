import React from 'react';
import { Trophy, Calendar, Star } from 'lucide-react';

// Default mock data structured cleanly for API / JSON integration
const defaultAnalyticsData = {
  achievementsEarned: {
    count: 12,
    subtitle: 'All time'
  },
  thisMonth: {
    count: 3,
    period: 'August 2026'
  },
  latestAchievement: {
    date: 'Aug 8, 2026',
    milestone: 'Mathematics Milestone'
  }
};

export default function ReportAnalytics({ data = defaultAnalyticsData }) {
  // Fallback safely if props data is partially provided
  const analytics = {
    achievementsEarned: { ...defaultAnalyticsData.achievementsEarned, ...data?.achievementsEarned },
    thisMonth: { ...defaultAnalyticsData.thisMonth, ...data?.thisMonth },
    latestAchievement: { ...defaultAnalyticsData.latestAchievement, ...data?.latestAchievement }
  };

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
              {analytics.achievementsEarned.count}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {analytics.achievementsEarned.subtitle}
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
              {analytics.thisMonth.count}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {analytics.thisMonth.period}
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
          <div>
            <p className="text-xs md:text-sm font-semibold text-slate-900">
              Latest Achievement
            </p>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              {analytics.latestAchievement.date}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {analytics.latestAchievement.milestone}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}