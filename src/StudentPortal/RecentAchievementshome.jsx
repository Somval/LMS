import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import PerformerBadge from "../assets/images/9e5a4b2c87331bcf72199059358d48f58dec2882 (1).png";
import AttendanceBadge from "../assets/images/5da99efc0c83e704d8cbeddcaab04f1402a06e90.png";
import LearnerBadge from "../assets/images/134a082cca973150969aa91355d8ac63a4934a6a.png";
import LearnerBadgeTwo from "../assets/images/134a082cca973150969aa91355d8ac63a4934a6a.png";

export default function RecentAchievements({ achievements: earned = [], loading = false }) {
  const navigate = useNavigate();
  // Badge artwork is optional on the server; fall back to the default badge image.
  const achievements = earned.map((a) => ({
    id: a.id,
    title: a.title,
    image: a.icon || LearnerBadge,
  }));

  return (
    <section
      className="
        flex
      bg-white
      mt-20
      rounded
        w-full
        flex-col
        bg-transparent
        px-[9px]
        py-[27px]
        max-[639px]:px-[14px]
        max-[639px]:py-[20px]
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div
        className="
          mb-[29px]
          flex
          shrink-0
          items-center
          justify-between
          max-[639px]:mb-[20px]
        "
      >
        <h1
          className="
            text-[15px]
            font-semibold
            leading-[29px]
            tracking-[-0.5px]
            text-[#000000]
            max-[639px]:text-[20px]
            max-[639px]:leading-[24px]
          "
        >
          Recent Achievements
        </h1>

        
      </div>

      {/* =====================================================
          ACHIEVEMENTS GRID
      ====================================================== */}
      <div
        className="
          grid
          w-full
          flex-1
          grid-cols-4
          gap-[10px]
          content-start
          max-[767px]:grid-cols-2
          max-[639px]:grid-cols-1
          max-[639px]:gap-[12px]
        "
      >
        {!loading && achievements.length === 0 && (
          <p className="col-span-full py-6 text-center text-sm text-slate-400">
            No achievements yet. Your tutor will award badges as you progress.
          </p>
        )}
        {achievements.map((item) => (
          <div
            key={item.id}
            className="
              group
              flex
              min-w-0
              flex-col
              items-center
              rounded-[7px]
              p-[10px]
              text-center
              transition-all
              duration-200
              hover:bg-slate-50
              hover:-translate-y-0.5
              max-[639px]:p-[8px]
            "
          >
            {/* Badge */}
            <div
              className="
                mb-[12px]
                flex
                h-[64px]
                w-[64px]
                shrink-0
                items-center
                justify-center
                rounded-[12px]
                p-[7px]
              
                
                max-[639px]:w-[56px]
                max-[639px]:p-[6px]
              "
            >
              <img
                src={item.image}
                alt={item.title}
                className="
                 
                  w-full
                  object-contain
                  drop-shadow-sm
                  transition-transform
                  duration-200
                  group-hover:scale-105
                "
              />
            </div>

            {/* Achievement Title */}
            <span
              className="
                max-w-[120px]
                text-[11px]
                font-semibold
                leading-[14px]
                text-slate-700
             "
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <div
        className="
          mt-auto
          flex
          shrink-0
          items-center
          justify-start
          pt-[18px]
          max-[639px]:pt-[14px]
        "
      >
        <button
          type="button"
          onClick={() => navigate("/student/achievements")}
          className="
            group
            flex
            items-center
            gap-[7px]
            text-[12px]
            font-medium
            leading-none
            text-[#2E6DFF]
            transition-colors
            duration-200
            hover:text-[#1d5be0]
            max-[639px]:text-[11px]
          "
        >
          <span>View All Achievements</span>

          <ArrowRight
            className="
              h-[15px]
              w-[15px]
              transition-transform
              duration-200
              group-hover:translate-x-1
              max-[639px]:h-[14px]
              max-[639px]:w-[14px]
            "
            strokeWidth={1.8}
          />
        </button>
      </div>
    </section>
  );
}