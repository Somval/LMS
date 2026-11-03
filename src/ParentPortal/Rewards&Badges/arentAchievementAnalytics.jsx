import React from 'react';
import { Award, Gift } from 'lucide-react';

// badges / rewards: the child's earned items of each kind.
export default function ParentAchievementAnalytics({ badges = [], rewards = [] }) {
  return (
    <div className="w-full font-sans text-slate-800">
      {/* Main Container Card with 2 Columns */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">

        {/* Column 1: Badges Earned */}
        <div className="p-6 md:p-8 flex items-center gap-5">
          {/* Purple Circular Icon Container */}
          <div className="w-16 h-16 rounded-full bg-[#EFE6FF] flex items-center justify-center shrink-0">
            <Award className="w-8 h-8 text-[#8B5CF6]" />
          </div>
          {/* Text Info */}
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {badges.length}
            </h3>
            <p className="text-xs md:text-sm font-bold text-slate-900 mt-0.5">
              Badges Earned
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {badges.length > 0 ? 'Keep up the great work!' : 'Badges will appear as they are earned.'}
            </p>
          </div>
        </div>

        {/* Column 2: Rewards Earned */}
        <div className="p-6 md:p-8 flex items-center gap-5">
          {/* Green Circular Icon Container */}
          <div className="w-16 h-16 rounded-full bg-[#E6F9EE] flex items-center justify-center shrink-0">
            <Gift className="w-8 h-8 text-[#10B981]" />
          </div>
          {/* Text Info */}
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {rewards.length}
            </h3>
            <p className="text-xs md:text-sm font-bold text-slate-900 mt-0.5">
              Rewards Earned
            </p>
            <p className={`text-xs mt-0.5 ${rewards.length > 0 ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}>
              {rewards.length > 0 ? 'Amazing progress!' : 'Rewards will appear as they are earned.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
