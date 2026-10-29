import React from 'react';

// Replace these imports with your actual image paths
import topPerformerBadge from '../../assets/images/95f2564a8e808f73d164231fb9cd42d6b0433733.png';

import perfectAttendanceBadge from '../../assets/images/9e5a4b2c87331bcf72199059358d48f58dec2882 (1).png';

import consistentLearnerBadge from '../../assets/images/134a082cca973150969aa91355d8ac63a4934a6a (1).png';


export default function AchievementsCard() {
  const badges = [
    {
      id: 1,
      title: 'Top Performer in Mathematics',
      image: topPerformerBadge,
    },
    {
      id: 2,
      title: 'Perfect Attendance',
      image: perfectAttendanceBadge,
    },
    {
      id: 3,
      title: 'Consistent Learner',
      image: consistentLearnerBadge,
    },
  ];

  return (
    <div className="w-full  max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-5 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-900 font-bold text-base">Achievements & Badges</h2>
        <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors">
          View All
        </button>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {badges.map((badge) => (
          <div key={badge.id} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-2 flex items-center justify-center">
              <img
                src={badge.image}
                alt={badge.title}
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
            <span className="text-xs text-gray-600 font-medium leading-tight">
              {badge.title}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-gray-100 mb-4" />

      {/* Footer Stats */}
      <div className="flex justify-around items-center text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-normal">Badges Earned</span>
          <span className="text-gray-900 font-bold">5</span>
        </div>
        <div className="h-4 w-[1px] bg-gray-100" />
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-normal">Rewards Earned</span>
          <span className="text-gray-900 font-bold">1</span>
        </div>
      </div>
    </div>
  );
}