
import React from "react";
import {
  UsersRound,
  TrendingUp,
  ChartNoAxesColumnIncreasing,
  ArrowDownRight,
} from "lucide-react";

const progressStats = [
  {
    title: "Total Students",
    value: "258",
    icon: UsersRound,
    iconColor: "text-[#1763D1]",
    iconBg: "bg-[#E7F0FF]",
  },
  {
    title: "Excellent Progress",
    value: "120",
    icon: TrendingUp,
    iconColor: "text-[#00D632]",
    iconBg: "bg-[#E5FBEA]",
    description: "50% of students",
  },
  {
    title: "On Track",
    value: "90",
    icon: ChartNoAxesColumnIncreasing,
    iconColor: "text-[#E600B8]",
    iconBg: "bg-[#FCE7F8]",
    description: "30% of students",
  },
  {
    title: "Poor Performance",
    value: "30",
    icon: ArrowDownRight,
    iconColor: "text-[#FF454D]",
    iconBg: "bg-[#FFE5E5]",
    description: "12% of students",
  },
];

export default function ProgressReports() {
  return (
    <section className=" w-full bg-[#F4F7FD] px-3 py-4 sm:px-6 sm:py-6 lg:px-7">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-[20px] font-semibold leading-6 tracking-[-0.5px] text-black sm:text-[26px] sm:leading-tight sm:tracking-[-0.7px] lg:text-[27px]">
            Progress &amp; Reports
          </h1>
          <p className="mt-1 text-[12px] leading-[18px] text-[#58718E] sm:text-[16px] sm:leading-6">
            View student performance across all subjects.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 sm:gap-3 xl:grid-cols-[repeat(4,288px)] xl:gap-2">
          {progressStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="flex h-[70px] w-full min-w-0 items-center gap-2 rounded-[7px] border border-[#E2E5EB] bg-white px-2.5 transition-colors duration-200 hover:border-[#D3D8E2] sm:h-[90px] sm:gap-2.5 sm:px-3 xl:h-[89px] xl:w-[288px]"
              >
                <div
                  className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full sm:h-[50px] sm:w-[50px] ${stat.iconBg}`}
                >
                  <Icon
                    className={`h-[19px] w-[19px] sm:h-[23px] sm:w-[23px] ${stat.iconColor}`}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h2
                    className={`truncate font-medium leading-4 text-[#111111] sm:leading-[19px] ${
                      stat.title === "Poor Performance"
                        ? "text-[11px] sm:text-[12px] xl:text-[12px]"
                        : "text-[12px] sm:text-[14px]"
                    }`}
                  >
                    {stat.title}
                  </h2>

                  <p className="mt-0.5 text-[20px] font-semibold leading-[23px] tracking-[-0.4px] text-black sm:text-[24px] sm:leading-[27px]">
                    {stat.value}
                  </p>

                  {stat.description && (
                    <p className="mt-0.5 truncate text-[9px] font-normal leading-[11px] text-[#969CA5] sm:text-[10px] sm:leading-3">
                      {stat.description}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
