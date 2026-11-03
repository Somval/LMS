import React from "react";
import { BookOpen, Trophy, FileText } from "lucide-react";

import { firstName, formatActivityTime } from "./childrenData";

const KINDS = {
  HOMEWORK: { icon: FileText, iconBg: "bg-sky-100", iconColor: "text-sky-500", text: (who, title) => `${who} submitted ${title}` },
  LESSON: { icon: BookOpen, iconBg: "bg-blue-100", iconColor: "text-blue-600", text: (who, title) => `${who} completed the lesson ${title}` },
  BADGE: { icon: Trophy, iconBg: "bg-orange-100", iconColor: "text-orange-500", text: (who, title) => `${who} earned the ${title} badge` },
  REWARD: { icon: Trophy, iconBg: "bg-orange-100", iconColor: "text-orange-500", text: (who, title) => `${who} earned the ${title} reward` },
};

export default function RecentActivity({ items = [] }) {
  const activities = items.map((item, index) => {
    const kind = KINDS[item.type] ?? KINDS.LESSON;
    return {
      id: `${item.type}-${index}`,
      title: kind.text(firstName(item.childName), item.title),
      time: formatActivityTime(item.at),
      icon: kind.icon,
      iconBg: kind.iconBg,
      iconColor: kind.iconColor,
    };
  });

  return (
    <div
      style={{ backgroundColor: "#F6FAFF" }}
      className="w-full max-w-[477px] sm:h-[548px] p-4 sm:p-6 rounded-2xl flex flex-col justify-between shadow-xs border border-slate-100 box-border mx-auto overflow-y-auto"
    >
      <div>
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-5">
          Recent Activity
        </h2>

        {activities.length === 0 && (
          <p className="text-sm text-black/50">
            Nothing yet. Homework, lessons and badges will show up here as your
            children learn.
          </p>
        )}

        {/* Activity List */}
        <div className="flex flex-col gap-3 sm:gap-3.5">
          {activities.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="flex items-center gap-3 sm:gap-3.5">
                {/* Icon Box */}
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-black leading-snug">
                    {item.title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-black/60 font-medium mt-0.5">
                    {item.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}