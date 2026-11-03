import React from "react";

import imageFirst from "../assets/images/95f2564a8e808f73d164231fb9cd42d6b0433733.png";
import imageTwo from "../assets/images/6b1cbcaa5558fa4d38624c3d95bb99cacf66eea0.png";
import imageThree from "../assets/images/bb5d8823f9b0ecbbe9b31f1815673a07b475cd32.png";

import { shortDate } from "./useRewards";

// Three card colour schemes, reused in turn.
const PALETTE = [
  { imageSrc: imageFirst, cardBg: "bg-[#fffdf0]", borderBg: "border-[#fef3c7]", tagBg: "bg-[#fef9c3] text-[#ca8a04]", calendarBorder: "border-[#eab308]" },
  { imageSrc: imageTwo, cardBg: "bg-[#f0fdf4]", borderBg: "border-[#dcfce7]", tagBg: "bg-[#d1fae5] text-[#059669]", calendarBorder: "border-[#10b981]" },
  { imageSrc: imageThree, cardBg: "bg-[#faf5ff]", borderBg: "border-[#f3e8ff]", tagBg: "bg-[#ede9fe] text-[#7c3aed]", calendarBorder: "border-[#8b5cf6]" },
];

export default function RewardsSection({ rewards: earned = [] }) {
  const rewards = earned.map((r, i) => ({
    ...PALETTE[i % PALETTE.length],
    ...(r.icon ? { imageSrc: r.icon } : {}),
    title: r.title,
    description: r.description || "Awarded by your tutor.",
    date: `Earned ${shortDate(r.awardedAt)}`,
  }));

  if (rewards.length === 0) return null;

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
            SECTION HEADER
        ================================================== */}
        <h2
          className="
            mb-5
            text-[18px]
            font-bold
            text-[#111827]
            sm:mb-6
            sm:text-[20px]
          "
        >
          Rewards Earned
        </h2>

        {/* =================================================
            CARDS
        ================================================== */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {rewards.map((reward, index) => (
            <div
              key={index}
              className={`
                flex
                min-w-0
                flex-col
                justify-between
                rounded-2xl
                border
                p-5
                ${reward.cardBg}
                ${reward.borderBg}
                sm:p-6
                lg:p-6
              `}
            >
              {/* =================================================
                  CARD CONTENT
              ================================================== */}
              <div className="min-w-0">
                {/* Image */}
                <div
                  className="
                    mb-4
                    flex
                    h-[105px]
                    w-full
                    items-center
                    justify-center
                    sm:h-[120px]
                    lg:h-[140px]
                  "
                >
                  <img
                    src={reward.imageSrc}
                    alt={reward.title}
                    className="
                      max-h-full
                      max-w-[75%]
                      object-contain
                      drop-shadow-sm
                      sm:max-w-[80%]
                      lg:max-w-full
                    "
                  />
                </div>

                {/* Title */}
                <h3
                  className="
                    text-[15px]
                    font-bold
                    leading-5
                    text-[#111827]
                    sm:text-[16px]
                    lg:text-[17px]
                  "
                >
                  {reward.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-1.5
                    text-[12px]
                    leading-5
                    text-[#6b7280]
                    sm:text-[13px]
                    sm:leading-relaxed
                  "
                >
                  {reward.description}
                </p>
              </div>

              {/* =================================================
                  DATE TAG
              ================================================== */}
              <div className="mt-5 sm:mt-6">
                <div
                  className={`
                    inline-flex
                    max-w-full
                    items-center
                    gap-1.5
                    rounded-full
                    px-2.5
                    py-1.5
                    text-[10px]
                    font-medium
                    sm:gap-2
                    sm:px-3
                    sm:text-[11px]
                    lg:text-[12px]
                    ${reward.tagBg}
                  `}
                >
                  <svg
                    className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    />

                    <line
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="6"
                    />

                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="6"
                    />

                    <line
                      x1="3"
                      y1="10"
                      x2="21"
                      y2="10"
                    />
                  </svg>

                  <span className="truncate">
                    {reward.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}