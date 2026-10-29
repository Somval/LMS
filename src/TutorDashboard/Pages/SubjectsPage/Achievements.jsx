import React from "react";
import { ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import AchievementTable from "./AchiementTable";

export default function AchievementsHome() {
  return (
    <div className="w-full">
      {/* =====================================================
          MAIN CONTENT CONTAINER
      ====================================================== */}
      <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
        {/* ===================================================
            BREADCRUMB
        ==================================================== */}
        <div className="flex w-full flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Subjects */}
          <h1 className="whitespace-nowrap text-xs font-medium text-[#2E6DFF] sm:text-sm lg:text-base">
            Subjects
          </h1>

          <ChevronRight
            size={15}
            strokeWidth={2}
            className="shrink-0 text-[#2E6DFF]"
          />

          {/* Mathematics */}
          <h1 className="whitespace-nowrap text-xs font-medium text-[#2E6DFF] sm:text-sm lg:text-base">
            Mathematics (Year 1)
          </h1>

          <ChevronRight
            size={17}
            strokeWidth={2}
            className="shrink-0 text-[#69737D]"
          />

          {/* Current Page */}
          <h1 className="whitespace-nowrap text-xs font-medium text-[#69737D] sm:text-sm lg:text-base">
            Achievements
          </h1>
        </div>

        {/* ===================================================
            PAGE HEADER
        ==================================================== */}
        <div className="mt-8 flex w-full flex-col gap-7 sm:mt-10 lg:mt-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          {/* =================================================
              TITLE + DESCRIPTION
          ================================================== */}
          <div className="min-w-0 flex-1">
            <h2 className="text-[28px] font-semibold leading-tight text-[#000000] sm:text-[32px] lg:text-[34px]">
              Achievements
            </h2>

            <p className="mt-3 w-full max-w-[680px] text-sm leading-6 text-[#69737D] sm:text-[15px] lg:text-base">
              Create achievements and let the system award them automatically.
            </p>
          </div>

          {/* =================================================
              CREATE ACHIEVEMENT BUTTON (FULL SOLID FILL)
          ================================================== */}
          <div className="w-full shrink-0 sm:w-auto">
            <Link
              to="/Tutor/createAchievement"
              className="flex h-[56px] w-full items-center justify-center gap-3 rounded-[8px] bg-[#2E6DFF] px-1 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#245FE5] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#2E6DFF]/30 sm:h-[60px] sm:w-[231px] sm:text-base"
            >
              <Plus size={10} strokeWidth={2.5} className="shrink-0" />
              <span>Create Achievement</span>
            </Link>
          </div>
        </div>

        {/* ===================================================
            ACHIEVEMENT TABLE
        ==================================================== */}
        <div className="mt-8 w-full sm:mt-10">
          <AchievementTable />
        </div>
      </div>
    </div>
  );
}