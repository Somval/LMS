import React from "react";
import badgeImage from "../assets/images/c2582da116168ead7191b53b24caa4b4015bf713.png";

import { shortDate } from "./useRewards";

export default function BadgesSection({ badges: earned = [] }) {
  const badges = earned.map((b) => ({
    title: b.title,
    date: `Earned ${shortDate(b.awardedAt)}`,
    imageSrc: b.icon || badgeImage,
  }));

  if (badges.length === 0) {
    return (
      <div className="w-full rounded-2xl bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
        You have not earned any badges yet. They will show up here as your tutor awards them.
      </div>
    );
  }

  return (
    <section
      className="
        mx-auto
        w-full
        max-w-[1080px]
        px-3
        py-5
        sm:px-4
        sm:py-6
        lg:px-0
      "
    >
      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}
      <div
        className="
          w-full
          rounded-2xl
          border
          border-[#edf0f4]
          bg-white
          p-5
          shadow-[0_4px_20px_rgba(0,0,0,0.03)]
          sm:p-6
          lg:rounded-xl
          lg:p-8
        "
      >
        {/* =================================================
            HEADER
        ================================================== */}
        <h2
          className="
            mb-1
            text-[18px]
            font-bold
            text-[#111827]
            sm:text-[20px]
          "
        >
          Badges
        </h2>

        <h3
          className="
            mb-5
            text-[14px]
            font-semibold
            text-[#2563eb]
            sm:mb-6
            sm:text-[15px]
          "
        >
          Earned Badges
        </h3>

        {/* =================================================
            BADGES GRID
        ================================================== */}
        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-2
            sm:gap-4
            md:grid-cols-3
            md:gap-5
            xl:grid-cols-5
            xl:gap-5
          "
        >
          {badges.map((badge, index) => (
            <div
              key={index}
              className="
                flex
                min-w-0
                flex-col
                items-center
                justify-between
                rounded-2xl
                border
                border-[#edf0f4]
                bg-white
                p-3
                text-center
                shadow-[0_2px_8px_rgba(0,0,0,0.02)]
                transition-shadow
                hover:shadow-md
                sm:p-4
                md:min-h-[205px]
                lg:min-h-[220px]
              "
            >
              {/* =================================================
                  BADGE IMAGE
              ================================================== */}
              <div
                className="
                  mb-2
                  flex
                  h-[85px]
                  w-full
                  items-center
                  justify-center
                  sm:mb-3
                  sm:h-[100px]
                  md:h-[105px]
                  lg:h-[110px]
                "
              >
                <img
                  src={badge.imageSrc}
                  alt={badge.title}
                  className="
                    max-h-full
                    max-w-[82%]
                    object-contain
                    drop-shadow-sm
                    sm:max-w-[90%]
                    lg:max-w-full
                  "
                />
              </div>

              {/* =================================================
                  TITLE
              ================================================== */}
              <h4
                className="
                  mb-2
                  text-[11px]
                  font-bold
                  leading-4
                  text-[#111827]
                  sm:text-[12px]
                  md:text-[13px]
                "
              >
                {badge.title}
              </h4>

              {/* =================================================
                  DATE TAG
              ================================================== */}
              <div
                className="
                  w-full
                  overflow-hidden
                  rounded-full
                  bg-[#eff6ff]
                  px-1.5
                  py-1
                  text-[8px]
                  font-semibold
                  leading-4
                  text-[#2563eb]
                  sm:px-2
                  sm:text-[9px]
                  md:text-[10px]
                "
              >
                <span className="block truncate">
                  {badge.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}