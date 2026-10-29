import React from "react";
import { Plus, ChevronRight } from "lucide-react";
import RewardsBadgesTable from "./RewardTable";

export default function AchievementsHome() {
  return (
    <div className="min-h-screen bg-gray-50/50 w-full">
      {/* ===================================================
          BREADCRUMBS NAVIGATION
      ==================================================== */}
      <div className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
        <nav className="flex w-full flex-wrap items-center gap-1.5 sm:gap-2">
          <a
            href="#subjects"
            className="whitespace-nowrap text-xs font-medium text-[#2E6DFF] hover:underline sm:text-sm lg:text-base"
          >
            Subjects
          </a>

          <ChevronRight
            size={15}
            strokeWidth={2}
            className="shrink-0 text-[#2E6DFF]"
          />

          <a
            href="#mathematics"
            className="whitespace-nowrap text-xs font-medium text-[#2E6DFF] hover:underline sm:text-sm lg:text-base"
          >
            Mathematics (Year 1)
          </a>

          <ChevronRight
            size={17}
            strokeWidth={2}
            className="shrink-0 text-[#69737D]"
          />

          <span className="whitespace-nowrap text-xs font-medium text-[#69737D] sm:text-sm lg:text-base">
            Achievements
          </span>
        </nav>
      </div>

      <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {/* ===================================================
            PAGE HEADER
        ==================================================== */}
        <div className="flex w-full flex-col gap-6 sm:gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          {/* =================================================
              HEADING & DESCRIPTION
          ================================================== */}
          <div className="min-w-0 flex-1">
            <h2 className="text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#000000] sm:text-[32px] lg:text-[34px]">
              Rewards &amp; Badges
            </h2>

            <p className="mt-2 w-full max-w-[850px] text-sm leading-6 text-[#666666] sm:mt-2.5 sm:text-[15px] lg:text-base lg:leading-7">
             Create rewards and badges to recognise student progress and achievements.
                </p>
          </div>

          {/* =================================================
              CREATE REWARD & BADGE BUTTON
          ================================================== */}
          <div className="w-full shrink-0 lg:w-auto">
            <button
              type="button"
              className="flex h-[50px] w-full items-center justify-center gap-2.5 rounded-[6px] bg-[#2E6DFF] px-5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#245FE5] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#2E6DFF]/30 sm:h-[52px] sm:w-auto sm:min-w-[220px] sm:px-6 sm:text-base"
            >
              <Plus size={19} strokeWidth={2} className="shrink-0" />
              <span className="whitespace-nowrap">
                Create Reward &amp; Badge
              </span>
            </button>
          </div>
        </div>

        {/* ===================================================
            REWARDS & BADGES TABLE
        ==================================================== */}
        <div className="mt-8 w-full sm:mt-10 lg:mt-12">
          <RewardsBadgesTable />
        </div>
      </div>
    </div>
  );
}