import React from 'react';
import { Calendar } from 'lucide-react';
import BadgeIcon from './BadgeIcon';
import { formatDate } from './achievementsData';

// achievements: the three most recent items (newest first).
export default function RecentAchievements({ achievements = [] }) {
  return (
    <div className="w-full font-sans text-slate-800">
      {/* Outer Card Container */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 md:p-8 space-y-6">

        {/* Section Header */}
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Recent Achievements
        </h2>

        {/* Grid of Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.length > 0 ? (
            achievements.map((item) => (
              <div
                key={item.id}
                className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:shadow-sm transition-shadow"
              >

                {/* Top: Badge / Logo Image Container */}
                <div className="flex justify-center pt-2">
                  <div className="w-24 h-24 rounded-full bg-blue-100/60 border border-blue-200/50 flex items-center justify-center p-3 overflow-hidden shadow-2xs">
                    <BadgeIcon icon={item.icon} title={item.title} />
                  </div>
                </div>

                {/* Middle: Title & Description */}
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description || 'Earned for great work.'}
                  </p>
                </div>

                {/* Bottom: Date with Calendar Icon */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{formatDate(item.awardedAt)}</span>
                </div>

              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 col-span-3 text-center py-6">
              No achievements yet. They'll show up here as your child earns them.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
