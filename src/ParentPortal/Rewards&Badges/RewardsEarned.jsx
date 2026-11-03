import React from 'react';
import { Calendar, Gift } from 'lucide-react';
import BadgeIcon from '../Achievements/BadgeIcon';
import { REWARD_STYLES, formatDate } from '../Achievements/achievementsData';

// rewards: the child's earned items of kind REWARD (newest first). childName is used in the intro.
export default function RewardsEarned({ rewards = [], childName = 'Your child' }) {
  const firstName = childName.split(/\s+/)[0];

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
            Rewards {firstName} has received for their achievements.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rewards.length > 0 ? (
            rewards.map((item, index) => {
              const style = REWARD_STYLES[index % REWARD_STYLES.length];
              return (
                <div
                  key={item.id}
                  className={`${style.cardBg} border border-slate-200/60 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all hover:shadow-sm`}
                >

                  {/* Top: Illustration Image */}
                  <div className="flex justify-center pt-2">
                    <div className="w-28 h-28 flex items-center justify-center p-2">
                      <BadgeIcon
                        icon={item.icon}
                        title={item.title}
                        className="w-full h-full object-contain drop-shadow-sm"
                        textClass="text-6xl"
                        Fallback={Gift}
                        fallbackClass={`w-3/4 h-3/4 ${style.iconColor}`}
                      />
                    </div>
                  </div>

                  {/* Middle: Title and Description */}
                  <div className="space-y-1.5 text-center md:text-left">
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description || 'Awarded for great work.'}
                    </p>
                  </div>

                  {/* Bottom: Pill-shaped Date Badge */}
                  <div className="pt-2">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${style.badgeBg}`}>
                      <Calendar className={`w-3.5 h-3.5 ${style.iconColor} shrink-0`} />
                      <span>Earned {formatDate(item.awardedAt)}</span>
                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500 col-span-3 text-center py-6">
              No rewards yet. {firstName}'s rewards will show up here.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
