import React from 'react';
import { Calendar } from 'lucide-react';
// Example local image imports (uncomment and adjust path as needed for your project):
 import trophyImg from '../../assets/images/95f2564a8e808f73d164231fb9cd42d6b0433733.png';
 
 import giftGreenImg from '../../assets/images/6b1cbcaa5558fa4d38624c3d95bb99cacf66eea0.png';
 
 import giftPurpleImg from '../../assets/images/bb5d8823f9b0ecbbe9b31f1815673a07b475cd32.png';

// Default mock JSON data structured for API integration
const defaultRewards = [
  {
    id: 1,
    title: 'Learning Star',
    description: 'Awarded for consistent learning progress.',
    date: 'Earned Aug 8, 2026',
    image: trophyImg,
    cardBg: 'bg-[#FEFCE8]', // Soft yellow
    badgeBg: 'bg-[#FEF08A]/70 text-yellow-800 border border-yellow-200/60',
    iconColor: 'text-yellow-600'
  },
  {
    id: 2,
    title: 'English Achievement Reward',
    description: 'Awarded for reaching a significant milestone in English.',
    date: 'Earned Aug 8, 2026',
    image:giftGreenImg,
    cardBg: 'bg-[#F0FDF4]', // Soft green
    badgeBg: 'bg-[#DCFCE7] text-emerald-800 border border-emerald-200/60',
    iconColor: 'text-emerald-600'
  },
  {
    id: 3,
    title: 'Perfect Attendance Reward',
    description: 'Awarded for maintaining excellent attendance.',
    date: 'Earned Aug 8, 2026',
    image: giftPurpleImg, // Replace with giftPurpleImg
    cardBg: 'bg-[#FAF5FF]', // Soft purple
    badgeBg: 'bg-[#F3E8FF] text-purple-800 border border-purple-200/60',
    iconColor: 'text-purple-600'
  }
];

export default function RewardsEarned({ rewards = defaultRewards }) {
  return (
    <div className="w-full font-sans text-slate-800">
      {/* Outer Main Card Container */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 md:p-8 space-y-6">
        
        {/* Header Section */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Rewards Earned
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Rewards Olivia has received for her achievements.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rewards && rewards.length > 0 ? (
            rewards.map((item) => (
              <div 
                key={item.id} 
                className={`${item.cardBg} border border-slate-200/60 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all hover:shadow-sm`}
              >
                
                {/* Top: Illustration Image */}
                <div className="flex justify-center pt-2">
                  <div className="w-28 h-28 flex items-center justify-center p-2">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </div>
                </div>

                {/* Middle: Title and Description */}
                <div className="space-y-1.5 text-center md:text-left">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom: Pill-shaped Date Badge */}
                <div className="pt-2">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${item.badgeBg}`}>
                    <Calendar className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
                    <span>{item.date}</span>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 col-span-3 text-center py-6">
              No rewards found.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}