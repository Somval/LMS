
import React from "react";
import {
  Plus,
  Award,
  ShieldCheck,
  Trophy,
  HandCoins,
} from "lucide-react";

const achievementStats = [
  {
    id: 1,
    title: "Total Achievements",
    value: "258",
    icon: ShieldCheck,
    iconColor: "#399B52",
    iconBackground: "#E5F4E8",
  },
  {
    id: 2,
    title: "Total Rewards",
    value: "120",
    icon: Award,
    iconColor: "#44418F",
    iconBackground: "#E9E8F7",
  },
  {
    id: 3,
    title: "Total Badges",
    value: "90",
    icon: Trophy,
    iconColor: "#CB39E8",
    iconBackground: "#F9E5FF",
  },
  {
    id: 4,
    title: "Students Awarded",
    value: "120",
    subtitle: "95% of total students",
    icon: HandCoins,
    iconColor: "#43D86C",
    iconBackground: "#E5FFE9",
  },
];

export default function AchievementsRewards() {
  const handleCreateAward = () => {
    // Connect this button to your Create Award form or modal.
  };

  return (
    <section className="w-full min-w-0 bg-[#F4F7FD] p-3 sm:p-4">
      {/* Header */}
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold leading-tight tracking-[-0.4px] text-[#171717] sm:text-2xl">
            Achievements &amp; Rewards
          </h1>

          <p className="mt-1 text-xs leading-relaxed text-[#718096] sm:text-sm">
            View and manage student achievements, badges and rewards.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateAward}
          className="inline-flex min-h-[36px] w-fit shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#00520D] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#003F0A] focus:outline-none focus:ring-2 focus:ring-[#00520D] focus:ring-offset-2 sm:text-[13px]"
        >
          <Plus size={15} strokeWidth={2} />
          <span>Create Award</span>
        </button>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 lg:grid-cols-4">
        {achievementStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.id}
              className="flex min-h-[72px] min-w-0 items-center gap-2.5 rounded-[5px] border border-[#E9ECF2] bg-white px-3 py-3 sm:gap-3 sm:px-3.5"
            >
              {/* Icon */}
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10"
                style={{ backgroundColor: stat.iconBackground }}
              >
                <Icon
                  size={19}
                  strokeWidth={2}
                  color={stat.iconColor}
                  aria-hidden="true"
                />
              </div>

              {/* Statistics */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium leading-snug text-[#30343B] sm:text-xs">
                  {stat.title}
                </p>

                <p className="mt-0.5 text-lg font-bold leading-tight text-[#111111] sm:text-xl">
                  {stat.value}
                </p>

                {stat.subtitle && (
                  <p className="mt-0.5 text-[9px] leading-tight text-[#9AA0A8] sm:text-[10px]">
                    {stat.subtitle}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
