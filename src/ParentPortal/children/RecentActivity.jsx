import React from "react";
import { BookOpen, Trophy, FileText } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      title: "Olivia completed Mathematics homework",
      time: "Today, 10:30 AM",
      type: "homework",
      icon: BookOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Liam earned a Science Badge",
      time: "Yesterday, 6:15 PM",
      type: "badge",
      icon: Trophy,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      id: 3,
      title: "Weekly progress report for Olivia and Liam generated",
      time: "Yesterday, 5:00 PM",
      type: "report",
      icon: FileText,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-500",
    },
    {
      id: 4,
      title: "Olivia completed Mathematics homework",
      time: "Today, 10:30 AM",
      type: "homework",
      icon: BookOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 5,
      title: "Olivia completed Mathematics homework",
      time: "Today, 10:30 AM",
      type: "homework",
      icon: BookOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 6,
      title: "Olivia completed Mathematics homework",
      time: "Today, 10:30 AM",
      type: "homework",
      icon: BookOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

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