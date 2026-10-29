import React from 'react';
import { Plus } from 'lucide-react';
import rewardBadgeImg from '../../../assets/images/c2582da116168ead7191b53b24caa4b4015bf713.png';

const rewardsData = [
  { id: 1, title: 'Mathematics Star', earnedDate: 'Earned Aug 8, 2026' },
  { id: 2, title: 'Mathematics Star', earnedDate: 'Earned Aug 8, 2026' },
  { id: 3, title: 'Mathematics Star', earnedDate: 'Earned Aug 8, 2026' },
  { id: 4, title: 'Mathematics Star', earnedDate: 'Earned Aug 8, 2026' },
];

export default function RewardsAndBadges() {
  return (
    <div className="w-full bg-slate-50/50 p-4 md:p-8 font-sans antialiased flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl space-y-6">
        
        {/* Top Header & Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              Rewards & Badges
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Recognition for effort, progress, and positive learning habits.
            </p>
          </div>

          <button 
            type="button"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-medium text-blue-600 bg-white border border-blue-200 hover:bg-blue-50/50 rounded-xl transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Create Reward & Badge</span>
          </button>
        </div>

        {/* Main Content Card Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          
          {/* Inner Section Heading */}
          <h2 className="text-base md:text-lg font-bold tracking-tight text-slate-900">
            Earned Rewards & Badges
          </h2>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardsData.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/70 p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group"
              >
                {/* Badge Image Container */}
                <div className="w-32 h-32 md:w-36 md:h-36 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                  <img 
                    src={rewardBadgeImg} 
                    alt={item.title} 
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Badge Title */}
                <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2.5">
                  {item.title}
                </h3>

                {/* Earned Date Pill Tag */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100/60">
                  {item.earnedDate}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}