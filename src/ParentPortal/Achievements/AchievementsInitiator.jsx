import React from 'react';
import ChildSelectorBar from './childselector';
import ParentAchievementAnalytics from './parentAchievementAnalytics';
import RecentAchievements from './RecentAchievements';
import AchievementTimeline from './AchievementTimeline';

export default function Achievements() {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 font-sans text-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Child Selector Component Bar */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 md:p-6">
          <ChildSelectorBar />
        </div>

        {/* Analytics & Metrics Cards Component */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80">
          <ParentAchievementAnalytics />
        </div>

        {/* Recent Achievements Grid Component */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80">
          <RecentAchievements />
        </div>

        {/* Achievement Timeline & Detail Panel Component */}
        <div className="">
          <AchievementTimeline />
        </div>

      </div>
    </div>
  );
}