import React from "react";
import {
  CalendarDays,
  Clock3,
  Video,
  Timer,
} from "lucide-react";

import UpcomingClasses from "./upcoming";
import PastClasses from "./PastClasses";
import ImageOne from "../assets/images/a28f032b0be13a6fa79d1e9bde6116adb70cef77.png";

export default function NextLiveClass() {
  return (
    <section className="w-full font-sans">
      {/* =====================================================
          NEXT LIVE CLASS
      ====================================================== */}
      <div
        className="
          w-full
          overflow-hidden
          rounded-[6px]
          bg-[#e8efff]
          px-3
          py-3
          sm:px-4
        "
      >
        <div className="flex min-h-[111px] w-full items-center">
          
          {/* =================================================
              LEFT - COURSE IMAGE
          ================================================== */}
          <div
            className="
              flex
              w-[82px]
              shrink-0
              items-center
              justify-center
              sm:w-[88px]
            "
          >
            <img
              src={ImageOne}
              alt="Mathematics books and stationery"
              className="
                block
                h-auto
                w-[72px]
                object-contain
                sm:w-[78px]
              "
            />
          </div>

          {/* =================================================
              CENTER - CLASS INFORMATION
          ================================================== */}
          <div className="min-w-0 flex-1 pl-2 sm:pl-3">
            {/* Label */}
            <p
              className="
                mb-[2px]
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.04em]
                text-[#286cf0]
                sm:text-[8px]
              "
            >
              Next Live Class
            </p>

            {/* Subject */}
            <h2
              className="
                text-[13px]
                font-bold
                leading-[16px]
                text-[#101828]
                sm:text-[14px]
              "
            >
              Mathematics
            </h2>

            {/* Topic */}
            <p
              className="
                mt-[1px]
                truncate
                text-[8px]
                leading-[12px]
                text-[#6b7280]
                sm:text-[9px]
              "
            >
              Linear Equations and Inequalities
            </p>

            {/* Date */}
            <div className="mt-[5px] flex items-center gap-[5px]">
              <CalendarDays
                size={11}
                strokeWidth={1.4}
                className="shrink-0 text-[#7d8799]"
              />

              <span
                className="
                  text-[8px]
                  leading-[11px]
                  text-[#697386]
                  sm:text-[9px]
                "
              >
                Today, 14 May 2025
              </span>
            </div>

            {/* Time */}
            <div className="mt-[3px] flex items-center gap-[5px]">
              <Clock3
                size={11}
                strokeWidth={1.4}
                className="shrink-0 text-[#7d8799]"
              />

              <span
                className="
                  text-[8px]
                  leading-[11px]
                  text-[#697386]
                  sm:text-[9px]
                "
              >
                5:00 PM – 6:00 PM
              </span>
            </div>

            {/* Tutor */}
            <div className="mt-[5px] flex items-center gap-[6px]">
              <div
                className="
                  h-[20px]
                  w-[20px]
                  shrink-0
                  overflow-hidden
                  rounded-full
                  bg-[#d9dde5]
                "
              >
                <img
                  src="https://i.pravatar.cc/100?img=47"
                  alt="Sarah Johnson"
                  className="h-full w-full object-cover grayscale"
                />
              </div>

              <div className="leading-none">
                <p className="text-[6px] text-[#858c99]">
                  Tutor
                </p>

                <p
                  className="
                    mt-[2px]
                    text-[8px]
                    font-semibold
                    leading-none
                    text-[#20242c]
                  "
                >
                  Sarah Johnson
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT - COUNTDOWN
          ================================================== */}
          <div
            className="
              ml-3
              flex
              h-[92px]
              w-[120px]
              shrink-0
              flex-col
              items-center
              justify-center
              border-l
              border-[#d4def3]
              pl-3
              sm:ml-4
              sm:w-[135px]
            "
          >
            {/* Timer */}
            <div
              className="
                flex
                h-[30px]
                w-[30px]
                items-center
                justify-center
                rounded-full
                bg-white
              "
            >
              <Timer
                size={14}
                strokeWidth={1.4}
                className="text-[#7d87a2]"
              />
            </div>

            {/* Starts in */}
            <p
              className="
                mt-[3px]
                text-[8px]
                font-medium
                leading-[10px]
                text-[#697386]
              "
            >
              Starts in
            </p>

            {/* Countdown */}
            <span
              className="
                mt-[1px]
                text-[17px]
                font-semibold
                leading-[18px]
                text-[#286cf0]
              "
            >
              45
            </span>

            <p
              className="
                text-[8px]
                leading-[10px]
                text-[#697386]
              "
            >
              minutes
            </p>

            {/* Join Class */}
            <button
              type="button"
              className="
                mt-[5px]
                flex
                h-[22px]
                w-[80px]
                items-center
                justify-center
                gap-[5px]
                rounded-[4px]
                bg-[#2f6df6]
                text-[7px]
                font-medium
                text-white
                transition-colors
                duration-200
                hover:bg-[#245fdc]
                active:scale-[0.98]
              "
            >
              <Video
                size={10}
                strokeWidth={1.7}
              />

              <span>Join Class</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          UPCOMING CLASSES
      ====================================================== */}
      <div className="mt-6 w-full">
        <UpcomingClasses />
      </div>

      {/* =====================================================
          PAST CLASSES
      ====================================================== */}
      <div className="mt-6 w-full">
        <PastClasses />
      </div>
    </section>
  );
}