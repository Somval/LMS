import React from "react";
import { useNavigate } from "react-router-dom";

// A badge's icon can be an image URL or an emoji/text. Anything else falls back to a medal.
const BadgeIcon = ({ icon, title }) => {
  if (icon && /^(https?:\/\/|\/)/.test(icon)) {
    return (
      <img
        src={icon}
        alt={title}
        className="w-full h-full object-contain drop-shadow-sm"
      />
    );
  }

  return (
    <span aria-hidden="true" className="text-4xl leading-none">
      {icon || "🏅"}
    </span>
  );
};

export default function AchievementsCard({ data }) {
  const navigate = useNavigate();

  const badges = data?.achievements?.recent ?? [];
  const badgeCount = data?.achievements?.badges ?? 0;
  const rewardCount = data?.achievements?.rewards ?? 0;

  return (
    <div className="w-full  max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-5 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-900 font-bold text-base">Achievements & Badges</h2>
        <button
          type="button"
          onClick={() => navigate("/parent/achievements")}
          className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors"
        >
          View All
        </button>
      </div>

      {/* Badges Grid */}
      {badges.length === 0 ? (
        <p className="mb-6 text-sm text-gray-400">
          No badges earned yet. They'll appear here as your child progresses.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {badges.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-2 flex items-center justify-center">
                <BadgeIcon icon={badge.icon} title={badge.title} />
              </div>
              <span className="text-xs text-gray-600 font-medium leading-tight">
                {badge.title}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      <hr className="border-gray-100 mb-4" />

      {/* Footer Stats */}
      <div className="flex justify-around items-center text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-normal">Badges Earned</span>
          <span className="text-gray-900 font-bold">{badgeCount}</span>
        </div>
        <div className="h-4 w-[1px] bg-gray-100" />
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-normal">Rewards Earned</span>
          <span className="text-gray-900 font-bold">{rewardCount}</span>
        </div>
      </div>
    </div>
  );
}
