import React from 'react';
import { Lock, Calendar } from 'lucide-react';
// Example local image imports (uncomment and adjust paths as needed for your project):
 import badgeEarnedImg from '../../assets/images/c2582da116168ead7191b53b24caa4b4015bf713.png';
 
 import badgeLockedImg from '../../assets/images/e56258f43adae3c4472035f7e3c92d3ac89210c8 (1).png';

// Default mock JSON data structured for API integration
const defaultBadges = [
  {
    id: 1,
    title: 'Mathematics Star',
    status: 'earned',
    date: 'Earned Aug 8, 2026',
    image: badgeEarnedImg, // Replace with badgeEarnedImg
    cardBg: 'bg-[#F8FAFC]',
    badgeBg: 'bg-blue-100/80 text-blue-700 border border-blue-200/60'
  },
  {
    id: 2,
    title: 'Mathematics Star',
    status: 'earned',
    date: 'Earned Aug 8, 2026',
    image: badgeEarnedImg,
    cardBg: 'bg-[#F8FAFC]',
    badgeBg: 'bg-blue-100/80 text-blue-700 border border-blue-200/60'
  },
  {
    id: 3,
    title: 'Mathematics Star',
    status: 'earned',
    date: 'Earned Aug 8, 2026',
    image: badgeEarnedImg,
    cardBg: 'bg-[#F8FAFC]',
    badgeBg: 'bg-blue-100/80 text-blue-700 border border-blue-200/60'
  },
  {
    id: 4,
    title: 'Coding Pro',
    status: 'locked',
    description: 'Need to complete 3 more coding activities',
    image: badgeLockedImg,
    cardBg: 'bg-white opacity-90'
  },
  {
    id: 5,
    title: 'Coding Pro',
    status: 'locked',
    description: 'Need to complete 3 more coding activities',
    image: badgeLockedImg,
    cardBg: 'bg-white opacity-90'
  }
];

export default function BadgesSection({ badges = defaultBadges }) {
  return (
    <div className="w-full font-sans text-slate-800">
      {/* Outer Main Card Container */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 md:p-8 space-y-6">
        
        {/* Header Section */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Badges
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Badges Olivia has earned and those she is working towards.
          </p>
        </div>

        {/* Badges Grid (Responsive 2 to 5 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges && badges.length > 0 ? (
            badges.map((item) => {
              const isEarned = item.status === 'earned';

              return (
                <div 
                  key={item.id} 
                  className={`${item.cardBg} border border-slate-200/70 rounded-2xl p-5 flex flex-col justify-between items-center text-center relative transition-all hover:shadow-xs`}
                >
                  
                  {/* Top-Right Lock Icon for Locked Badges */}
                  {!isEarned && (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shadow-2xs">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Badge Image */}
                  <div className="w-24 h-24 my-2 flex items-center justify-center p-2">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className={`w-full h-full object-contain drop-shadow-sm ${!isEarned ? 'grayscale opacity-75' : ''}`}
                    />
                  </div>

                  {/* Title & Description/Date Footer */}
                  <div className="w-full space-y-2 mt-2">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>

                    {isEarned ? (
                      <div className="pt-1">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${item.badgeBg}`}>
                          <Calendar className="w-3 h-3 shrink-0" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 leading-relaxed px-1">
                        {item.description}
                      </p>
                    )}
                  </div>

                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500 col-span-full text-center py-6">
              No badges available.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}