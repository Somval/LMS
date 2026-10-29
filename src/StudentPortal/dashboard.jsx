import React from "react";
import {
  CalendarDays,
  Clock3,
  Video,
  ArrowRight,
} from "lucide-react";

import Image from "../assets/images/a28f032b0be13a6fa79d1e9bde6116adb70cef77.png";
import TutorImage from "../assets/images/d2ff9714f4a9d1e2956e94de49cf1a63a6522afb.jpg";

import StudenLearnings from "./Mylearning";
import RecentAchievements from "./RecentAchievementshome";
import MyTasks from "./MyTasks";

/* ============================================================
   ⭐ EASY HEIGHT CONTROL — LIVE CLASS
============================================================ */

const LIVE_CLASS_HEIGHT = "h-[290px]";

/* ============================================================
   ⭐ TODAY'S SCHEDULE HEIGHT
============================================================ */

const SCHEDULE_MIN_HEIGHT = "min-h-[225px]";

/* ============================================================
   SCHEDULE DATA
============================================================ */

const scheduleItems = [
  {
    time: "5:00 PM – 6:00 PM",
    title: "Mathematics",
    subtitle: "Linear Equations",
    type: "Live Class",
  },
  {
    time: "5:00 PM – 6:00 PM",
    title: "Mathematics",
    subtitle: "Linear Equations",
    type: "Live Class",
  },
  {
    time: "5:00 PM – 6:00 PM",
    title: "Mathematics",
    subtitle: "Chapter 3 Quiz",
    type: "Quiz",
  },
  {
    time: "6:30 PM – 7:30 PM",
    title: "Physics",
    subtitle: "Kinematics & Motion",
    type: "Live Class",
  },
];

export default function ClassOverview() {
  return (
    <section className="w-full bg-slate-50 font-sans">
      {/* ======================================================
          MAIN CONTENT

          IMPORTANT:
          StudentLayout already controls the:
          - Sidebar spacing
          - Header spacing
          - Main content padding

          Therefore this component does NOT add:
          - max-w
          - mx-auto
          - extra horizontal px
      ====================================================== */}

      <div className="w-full">
        {/* ====================================================
            TOP DASHBOARD
        ===================================================== */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-4
            lg:grid-cols-[1.28fr_1fr]
            lg:items-start
          "
        >
          {/* ==================================================
              NEXT LIVE CLASS
          ================================================== */}

          <div
            className={`
              relative
              flex
              w-full
              ${LIVE_CLASS_HEIGHT}
              min-h-[290px]
              flex-col
              overflow-hidden
              rounded-[6px]
              border
              border-[#d8e1f4]
              bg-[#e7efff]
              shadow-[0_2px_8px_rgba(15,23,42,0.025)]
              max-sm:min-h-[300px]
            `}
          >
            {/* =================================================
                ILLUSTRATION
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                z-0
                flex
                h-full
                w-[49%]
                items-center
                justify-end
                overflow-hidden
                max-sm:w-[45%]
                sm:w-[47%]
                lg:w-[49%]
              "
            >
              <img
                src={Image}
                alt="Mathematics learning illustration"
                className="
                  h-[99%]
                  w-80
                  max-w-none
                  object-contain
                  object-right
                  max-sm:h-[78%]
                  sm:h-[90%]
                  lg:h-[99%]
                "
              />
            </div>

            {/* =================================================
                LIVE CLASS CONTENT
            ================================================= */}

            <div
              className="
                relative
                z-10
                flex
                h-full
                w-full
                flex-col
                px-4
                py-4
                sm:px-5
                sm:py-5
              "
            >
              <div
                className="
                  w-[58%]
                  max-sm:w-[62%]
                  sm:w-[60%]
                  lg:w-[58%]
                "
              >
                {/* =================================================
                    NEXT LIVE CLASS
                ================================================= */}

                <div className="flex items-center gap-2">
                  <span
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.06em]
                      text-slate-900
                      max-sm:text-[12px]
                    "
                  >
                    Next Live Class
                  </span>

                  <span
                    className="
                      h-[7px]
                      w-[7px]
                      shrink-0
                      rounded-full
                      bg-red-500
                    "
                  />
                </div>

                {/* =================================================
                    SUBJECT
                ================================================= */}

                <div className="mt-2.5">
                  <h2
                    className="
                      text-[20px]
                      font-semibold
                      leading-tight
                      tracking-tight
                      text-slate-900
                      max-sm:text-[21px]
                    "
                  >
                    Mathematics
                  </h2>

                  <p
                    className="
                      mt-1
                      max-w-full
                      text-[12px]
                      font-normal
                      leading-[1.4]
                      text-slate-500
                      max-sm:text-[13px]
                    "
                  >
                    Linear Equations and Inequalities
                  </p>
                </div>

                {/* =================================================
                    DATE / TIME
                ================================================= */}

                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <CalendarDays
                      className="
                        h-[15px]
                        w-[15px]
                        shrink-0
                        text-slate-500
                        max-sm:h-[16px]
                        max-sm:w-[16px]
                      "
                      strokeWidth={1.5}
                    />

                    <span
                      className="
                        whitespace-nowrap
                        text-[11px]
                        font-medium
                        text-slate-500
                        max-sm:text-[12px]
                      "
                    >
                      Today, 14 May 2025
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock3
                      className="
                        h-[15px]
                        w-[15px]
                        shrink-0
                        text-slate-500
                        max-sm:h-[16px]
                        max-sm:w-[16px]
                      "
                      strokeWidth={1.5}
                    />

                    <span
                      className="
                        whitespace-nowrap
                        text-[11px]
                        font-medium
                        text-slate-500
                        max-sm:text-[12px]
                      "
                    >
                      5:00 PM – 6:00 PM
                    </span>
                  </div>
                </div>

                {/* =================================================
                    TUTOR
                ================================================= */}

                <div className="mt-4 flex items-center gap-2.5">
                  <img
                    src={TutorImage}
                    alt="Sarah Johnson"
                    className="
                      h-7
                      w-7
                      shrink-0
                      rounded-full
                      object-cover
                      ring-2
                      ring-white
                      shadow-sm
                      max-sm:h-8
                      max-sm:w-8
                    "
                  />

                  <div className="min-w-0">
                    <p
                      className="
                        text-[9px]
                        font-normal
                        leading-none
                        text-slate-400
                        max-sm:text-[10px]
                      "
                    >
                      Tutor
                    </p>

                    <p
                      className="
                        mt-1.5
                        truncate
                        text-[12px]
                        font-semibold
                        leading-none
                        text-slate-800
                        max-sm:text-[13px]
                      "
                    >
                      Sarah Johnson
                    </p>
                  </div>
                </div>

                {/* =================================================
                    JOIN CLASS
                ================================================= */}

                <button
                  type="button"
                  className="
                    mt-4
                    inline-flex
                    h-[27px]
                    items-center
                    justify-center
                    gap-2
                    rounded-[4px]
                    bg-blue-600
                    px-4
                    text-[10px]
                    font-semibold
                    text-white
                    shadow-sm
                    shadow-blue-200
                    transition-all
                    duration-200
                    hover:bg-blue-700
                    hover:shadow-md
                    active:scale-[0.98]
                    max-sm:h-[30px]
                    max-sm:px-4
                    max-sm:text-[11px]
                  "
                >
                  <Video
                    className="
                      h-[13px]
                      w-[13px]
                      max-sm:h-[14px]
                      max-sm:w-[14px]
                    "
                    strokeWidth={2}
                  />

                  <span>Join Class</span>
                </button>
              </div>
            </div>
          </div>

          {/* ==================================================
              TODAY'S SCHEDULE
          ================================================== */}

          <div
            className={`
              flex
              ${SCHEDULE_MIN_HEIGHT}
              w-full
              flex-col
              justify-between
              overflow-hidden
              rounded-[6px]
              border
              border-slate-100
              bg-white
              px-3
              py-3.5
              shadow-[0_2px_10px_rgba(15,23,42,0.03)]
              max-sm:min-h-[unset]
            `}
          >
            <div>
              {/* HEADER */}

              <div className="shrink-0 px-0.5">
                <h3
                  className="
                    text-[13px]
                    font-semibold
                    leading-none
                    tracking-tight
                    text-slate-900
                    max-sm:text-[15px]
                  "
                >
                  Today's Schedule
                </h3>
              </div>

              {/* SCHEDULE LIST */}

              <div className="mt-3">
                {scheduleItems.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="
                      grid
                      grid-cols-[92px_minmax(0,1fr)]
                      gap-2
                      border-b
                      border-slate-100
                      py-3
                      last:border-b-0
                      max-sm:grid-cols-[105px_minmax(0,1fr)]
                      max-sm:gap-3
                    "
                  >
                    {/* TIME */}

                    <div className="pt-[1px]">
                      <p
                        className="
                          whitespace-nowrap
                          text-[9px]
                          font-medium
                          leading-[1.25]
                          text-[#6366a3]
                          max-sm:text-[10px]
                        "
                      >
                        {item.time}
                      </p>
                    </div>

                    {/* TIMELINE */}

                    <div
                      className="
                        relative
                        min-w-0
                        border-l
                        border-slate-200
                        pl-3
                      "
                    >
                      <span
                        className="
                          absolute
                          -left-[4px]
                          top-[1px]
                          h-[8px]
                          w-[8px]
                          rounded-full
                          bg-blue-600
                          ring-2
                          ring-white
                        "
                      />

                      <p
                        className="
                          truncate
                          text-[10px]
                          font-semibold
                          leading-[1.2]
                          text-slate-800
                          max-sm:text-[11px]
                        "
                      >
                        {item.title}
                      </p>

                      <p
                        className="
                          mt-[4px]
                          truncate
                          text-[9px]
                          font-normal
                          leading-[1.2]
                          text-slate-400
                          max-sm:text-[10px]
                        "
                      >
                        {item.subtitle}
                      </p>

                      <span
                        className="
                          mt-[5px]
                          inline-flex
                          h-[15px]
                          min-w-[50px]
                          items-center
                          justify-center
                          rounded-full
                          bg-slate-100
                          px-2
                          text-[8px]
                          font-medium
                          leading-none
                          text-slate-500
                          max-sm:h-[17px]
                          max-sm:min-w-[54px]
                          max-sm:text-[9px]
                        "
                      >
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VIEW FULL SCHEDULE */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-start
                pt-2.5
              "
            >
              <button
                type="button"
                className="
                  group
                  inline-flex
                  items-center
                  gap-1.5
                  text-[9px]
                  font-medium
                  leading-none
                  text-blue-600
                  transition-colors
                  duration-200
                  hover:text-blue-700
                  max-sm:text-[10px]
                "
              >
                <span>View Full Schedule</span>

                <ArrowRight
                  className="
                    h-[12px]
                    w-[12px]
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                    max-sm:h-[13px]
                    max-sm:w-[13px]
                  "
                  strokeWidth={1.8}
                />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            ⭐ BOTTOM SECTION
        ===================================================== */}

        <div
          className="
            lg:-mt-16
            grid
            w-full
            grid-cols-1
            gap-4
            lg:grid-cols-[1.28fr_1fr]
            lg:items-stretch
          "
        >
          {/* =================================================
              ⭐ MY LEARNING JOURNEY
          ================================================= */}

          <div className="w-full">
            <StudenLearnings />
          </div>

          {/* =================================================
              ⭐ RECENT ACHIEVEMENTS
          ================================================= */}

          <div className="flex h-full w-full flex-col">
            <RecentAchievements />
          </div>
        </div>

        {/* =====================================================
            ⭐ MY TASKS
        ===================================================== */}

        <div className="mt-4 w-full">
          <MyTasks />
        </div>
      </div>
    </section>
  );
}