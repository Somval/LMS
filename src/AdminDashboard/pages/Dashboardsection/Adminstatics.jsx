
import React from "react";
import {
  UsersRound,
  GraduationCap,
  UserRound,
  BookOpen,
  TrendingUp,
} from "lucide-react";

const statistics = [
  {
    id: 1,
    value: "1,248",
    label: "Total Students",
    growth: "12%",
    icon: UsersRound,
    cardBg: "bg-[#E7F5F3]",
    iconBg: "bg-[#C9F3E5]",
    iconColor: "text-[#00B83F]",
    growthBg: "bg-[#C9F3E5]",
    growthColor: "text-[#00A838]",
  },
  {
    id: 2,
    value: "86",
    label: "Total Tutors",
    growth: "8%",
    icon: GraduationCap,
    cardBg: "bg-[#F7EEEA]",
    iconBg: "bg-[#F8DFCE]",
    iconColor: "text-[#FF6900]",
    growthBg: "bg-[#F8DFCE]",
    growthColor: "text-[#F05A00]",
  },
  {
    id: 3,
    value: "1,102",
    label: "Total Parents",
    growth: "10%",
    icon: UserRound,
    cardBg: "bg-[#E5F3FA]",
    iconBg: "bg-[#C7EBF7]",
    iconColor: "text-[#00B9E8]",
    growthBg: "bg-[#C7EBF7]",
    growthColor: "text-[#00A9D6]",
  },
  {
    id: 4,
    value: "24",
    label: "Active Subjects",
    growth: "2%",
    icon: BookOpen,
    cardBg: "bg-[#F0E9FA]",
    iconBg: "bg-[#E5CCFA]",
    iconColor: "text-[#A100FF]",
    growthBg: "bg-[#E5CCFA]",
    growthColor: "text-[#9900F5]",
  },
];

export default function DashboardStats() {
  return (
    <section
      aria-label="Dashboard statistics"
      className="w-full min-w-0"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.id}
              className={`flex min-w-0 items-start gap-2.5 rounded-[9px] border border-black/[0.025] p-4 sm:gap-3.5 sm:p-4 lg:gap-2.5 lg:p-3.5 xl:gap-2.5 xl:p-4 ${stat.cardBg}`}
            >
              {/* Icon */}
              <div
                className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full sm:h-[54px] sm:w-[54px] lg:h-[48px] lg:w-[48px] xl:h-[54px] xl:w-[54px] ${stat.iconBg}`}
              >
                <Icon
                  size={25}
                  strokeWidth={1.5}
                  className={stat.iconColor}
                  aria-hidden="true"
                />
              </div>

              {/* Statistic Details */}
              <div className="min-w-0 flex-1 pt-0.5">
                <h3 className="font-[Inter] text-[23px] font-bold leading-[1.2] tracking-[-0.5px] text-black sm:text-[25px] lg:text-[23px] xl:text-[25px]">
                  {stat.value}
                </h3>

                <p className="mt-1 truncate font-[Inter] text-[13px] leading-[1.3] text-[#818DA8] sm:text-[14px] lg:text-[13px] xl:text-[14px]">
                  {stat.label}
                </p>

                {/* Monthly Growth */}
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className={`inline-flex h-[29px] items-center gap-1 rounded-[6px] px-2.5 font-[Inter] text-[12px] font-semibold ${stat.growthBg} ${stat.growthColor}`}
                  >
                    <TrendingUp
                      size={13}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {stat.growth}
                  </span>

                  <span className="whitespace-nowrap font-[Inter] text-[10px] text-[#8B96AC]">
                    from last month
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
