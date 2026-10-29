import React from 'react';
import { Calendar } from 'lucide-react';
import RecentAchievementImage from "../../assets/images/134a082cca973150969aa91355d8ac63a4934a6a (1).png"
// Default mock data structured cleanly with image URLs for API integration
const defaultAchievements = [
  {
    id: 1,
    title: 'Mathematics Milestone',
    description: 'Completed a major Mathematics learning milestone.',
    date: 'Aug 8, 2026',
    imageUrl: RecentAchievementImage },
  {
    id: 2,
    title: 'Mathematics Milestone',
    description: 'Completed a major Mathematics learning milestone.',
    date: 'Aug 8, 2026',
    imageUrl: RecentAchievementImage
  },
  {
    id: 3,
    title: 'Mathematics Milestone',
    description: 'Completed a major Mathematics learning milestone.',
    date: 'Aug 8, 2026',
    imageUrl: RecentAchievementImage
  }
];

export default function RecentAchievements({ achievements = defaultAchievements }) {
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
          {achievements && achievements.length > 0 ? (
            achievements.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:shadow-sm transition-shadow"
              >
                
                {/* Top: Badge / Logo Image Container */}
                <div className="flex justify-center pt-2">
                  <div className="w-24 h-24 rounded-full bg-blue-100/60 border border-blue-200/50 flex items-center justify-center p-3 overflow-hidden shadow-2xs">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                </div>

                {/* Middle: Title & Description */}
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom: Date with Calendar Icon */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{item.date}</span>
                </div>

              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 col-span-3 text-center py-6">
              No recent achievements found.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}