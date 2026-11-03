import React from 'react';
import { Lock, Calendar } from 'lucide-react';
import BadgeIcon from '../Achievements/BadgeIcon';
import { formatDate } from '../Achievements/achievementsData';

// earned: badges the child has (newest first). locked: badges they haven't unlocked yet.
export default function BadgesSection({ earned = [], locked = [], childName = 'Your child' }) {
  const firstName = childName.split(/\s+/)[0];

  // Earned badges first, then the ones still to unlock.
  const badges = [
    ...earned.map((item) => ({ ...item, isEarned: true })),
    ...locked.map((item) => ({ ...item, isEarned: false })),
  ];

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
            Badges {firstName} has earned and those they are working towards.
          </p>
        </div>

        {/* Badges Grid (Responsive 2 to 5 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.length > 0 ? (
            badges.map((item) => {
              const isEarned = item.isEarned;

              return (
                <div
                  key={item.id}
                  className={`${isEarned ? 'bg-[#F8FAFC]' : 'bg-white opacity-90'} border border-slate-200/70 rounded-2xl p-5 flex flex-col justify-between items-center text-center relative transition-all hover:shadow-xs`}
                >

                  {/* Top-Right Lock Icon for Locked Badges */}
                  {!isEarned && (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shadow-2xs">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Badge Image */}
                  <div className={`w-24 h-24 my-2 flex items-center justify-center p-2 ${!isEarned ? 'grayscale opacity-75' : ''}`}>
                    <BadgeIcon
                      icon={item.icon}
                      title={item.title}
                      className="w-full h-full object-contain drop-shadow-sm"
                      textClass="text-6xl"
                      fallbackClass={`w-3/4 h-3/4 ${isEarned ? 'text-blue-600' : 'text-slate-400'}`}
                    />
                  </div>

                  {/* Title & Description/Date Footer */}
                  <div className="w-full space-y-2 mt-2">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>

                    {isEarned ? (
                      <div className="pt-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-100/80 text-blue-700 border border-blue-200/60">
                          <Calendar className="w-3 h-3 shrink-0" />
                          <span>Earned {formatDate(item.awardedAt)}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 leading-relaxed px-1">
                        {item.description || 'Keep learning to unlock this badge.'}
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
