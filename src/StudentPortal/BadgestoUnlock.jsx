import React from "react";
import lockedBadgeImage from "../assets/images/e56258f43adae3c4472035f7e3c92d3ac89210c8 (1).png";

export default function BadgesToUnlock() {
  const lockedBadges = [
    {
      title: "Coding Pro",
      description: "Complete 5 Science lessons",
      progress: "1/5",
      imageSrc: lockedBadgeImage,
    },
    {
      title: "Coding Pro",
      description: "Complete 5 Science lessons",
      imageSrc: lockedBadgeImage,
    },
    {
      title: "Coding Pro",
      description: "Complete 5 Science lessons",
      imageSrc: lockedBadgeImage,
    },
    {
      title: "Coding Pro",
      description: "Complete 5 Science lessons",
      progress: "1/5",
      imageSrc: lockedBadgeImage,
    },
    {
      title: "Coding Pro",
      description: "Complete 5 Science lessons",
      imageSrc: lockedBadgeImage,
    },
  ];

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
            mb-5
            text-[18px]
            font-bold
            text-[#2563eb]
            sm:mb-6
          "
        >
          Badges to Unlock
        </h2>

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
          {lockedBadges.map((badge, index) => (
            <div
              key={index}
              className="
                relative
                flex
                min-w-0
                min-h-[205px]
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
                sm:min-h-[215px]
                sm:p-4
                md:min-h-[220px]
              "
            >
              {/* =================================================
                  LOCK ICON
              ================================================== */}
              <div
                className="
                  absolute
                  right-2.5
                  top-2.5
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#edf0f4]
                  bg-white
                  text-[#9ca3af]
                  shadow-[0_1px_3px_rgba(0,0,0,0.04)]
                  sm:right-3
                  sm:top-3
                  sm:h-7
                  sm:w-7
                "
              >
                <svg
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  />

                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>

              {/* =================================================
                  BADGE IMAGE
              ================================================== */}
              <div
                className="
                  mt-2
                  mb-2
                  flex
                  h-[85px]
                  w-full
                  items-center
                  justify-center
                  sm:h-[95px]
                  md:h-[100px]
                "
              >
                <img
                  src={badge.imageSrc}
                  alt={badge.title}
                  className="
                    max-h-full
                    max-w-[80%]
                    object-contain
                    grayscale
                    opacity-80
                    sm:max-w-full
                  "
                />
              </div>

              {/* =================================================
                  TITLE + DESCRIPTION
              ================================================== */}
              <div className="mb-3 w-full min-w-0">
                <h4
                  className="
                    mb-1
                    truncate
                    text-[12px]
                    font-bold
                    leading-snug
                    text-[#111827]
                    sm:text-[13px]
                  "
                >
                  {badge.title}
                </h4>

                <p
                  className="
                    mx-auto
                    max-w-[180px]
                    px-1
                    text-[9px]
                    leading-4
                    text-[#9ca3af]
                    sm:text-[10px]
                    sm:leading-tight
                  "
                >
                  {badge.description}
                </p>
              </div>

              {/* =================================================
                  PROGRESS
              ================================================== */}
              <div className="w-full">
                <div
                  className="
                    h-1.5
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-[#e5e7eb]
                    sm:h-2
                  "
                >
                  <div
                    className="
                      h-full
                      w-[25%]
                      rounded-full
                      bg-[#2563eb]
                    "
                  />
                </div>

                {badge.progress && (
                  <span
                    className="
                      mt-1
                      block
                      text-right
                      text-[8px]
                      font-semibold
                      text-[#6b7280]
                      sm:text-[9px]
                    "
                  >
                    {badge.progress}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}