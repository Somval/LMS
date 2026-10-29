import React from "react";
import { ArrowRight, Video } from "lucide-react";

const upcomingClasses = [
  {
    date: "Today",
    day: "Aug 17",
    className: "Mathematics",
    topic: (
      <>
        Linear Equations
        <br />
        & Inequalities
      </>
    ),
    time: (
      <>
        5:00 PM –
        <br />
        6:00 PM
      </>
    ),
    status: "Starting soon",
    statusType: "starting",
  },
  {
    date: "Today",
    day: "Aug 17",
    className: "Mathematics",
    topic: (
      <>
        Linear Equations
        <br />
        & Inequalities
      </>
    ),
    time: (
      <>
        5:00 PM –
        <br />
        6:00 PM
      </>
    ),
    status: "Starting soon",
    statusType: "starting",
  },
  {
    date: "Today",
    day: "Aug 17",
    className: "Mathematics",
    topic: (
      <>
        Linear Equations
        <br />
        & Inequalities
      </>
    ),
    time: (
      <>
        5:00 PM –
        <br />
        6:00 PM
      </>
    ),
    status: "Upcoming",
    statusType: "upcoming",
  },
];

export default function UpcomingClasses() {
  return (
    <section className="w-full  px-4 py-5 sm:px-5">
      <div className="w-full">

        {/* Section Heading */}
        <h2 className="mb-4 text-[17px] font-semibold leading-none text-[#101828]">
          Upcoming Classes
        </h2>

        {/* Table Card */}
        <div
          className="
            w-full
            overflow-hidden
            rounded-[9px]
            border
            border-[#d2d8e3]
            bg-white
          "
        >
          {/* Desktop Table */}
          <div className="hidden md:block">

            {/* Header */}
            <div
              className="
                grid
                grid-cols-[108px_minmax(110px,1fr)_minmax(150px,1.35fr)_108px_118px_90px]
                items-center
                px-5
                pt-4
                pb-3
              "
            >
              <div className="text-[13px] font-medium text-[#747ca1]">
                Date
              </div>

              <div className="text-[13px] font-medium text-[#747ca1]">
                Class
              </div>

              <div className="text-[13px] font-medium text-[#747ca1]">
                Topic
              </div>

              <div className="text-[13px] font-medium text-[#747ca1]">
                Time
              </div>

              <div className="text-[13px] font-medium text-[#747ca1]">
                Status
              </div>

              <div className="text-[13px] font-medium text-[#747ca1]">
                Action
              </div>
            </div>

            {/* Rows */}
            {upcomingClasses.map((item, index) => (
              <div
                key={index}
                className="
                  grid
                  min-h-[71px]
                  grid-cols-[108px_minmax(110px,1fr)_minmax(150px,1.35fr)_108px_118px_90px]
                  items-center
                  px-5
                  border-t
                  border-[#e5e7eb]
                "
              >
                {/* Date */}
                <div className="leading-tight">
                  <p className="text-[12px] font-semibold text-[#161b26]">
                    {item.date}
                  </p>

                  <p className="mt-[2px] text-[12px] text-[#747ca1]">
                    {item.day}
                  </p>
                </div>

                {/* Class */}
                <div>
                  <p className="text-[12px] font-medium text-[#171b24]">
                    {item.className}
                  </p>
                </div>

                {/* Topic */}
                <div className="text-[12px] leading-[17px] text-[#747ca1]">
                  {item.topic}
                </div>

                {/* Time */}
                <div className="text-[12px] leading-[17px] text-[#747ca1]">
                  {item.time}
                </div>

                {/* Status */}
                <div>
                  <div className="flex items-center gap-[7px]">
                    <span
                      className={`
                        h-[7px]
                        w-[7px]
                        shrink-0
                        rounded-full
                        ${
                          item.statusType === "starting"
                            ? "bg-[#16c766]"
                            : "bg-[#343be7]"
                        }
                      `}
                    />

                    <span
                      className={`
                        whitespace-nowrap
                        text-[11px]
                        font-medium
                        ${
                          item.statusType === "starting"
                            ? "text-[#10b958]"
                            : "text-[#252be0]"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div>
                  <button
                    type="button"
                    className="
                      flex
                      h-[27px]
                      w-[88px]
                      items-center
                      justify-center
                      gap-[7px]
                      rounded-[4px]
                      bg-[#326df5]
                      text-[9px]
                      font-medium
                      text-white
                      shadow-[0_1px_3px_rgba(50,109,245,0.18)]
                      transition-all
                      duration-200
                      hover:bg-[#255edc]
                      active:scale-[0.98]
                    "
                  >
                    <Video
                      size={12}
                      strokeWidth={1.7}
                    />

                    <span>Join Class</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Footer */}
            <div
              className="
                flex
                h-[42px]
                items-center
                justify-center
                border-t
                border-[#e5e7eb]
              "
            >
              <button
                type="button"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  text-[12px]
                  font-medium
                  text-[#246bff]
                  transition-colors
                  hover:text-[#1554d1]
                "
              >
                <span>View All Upcoming Classes</span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.4}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {upcomingClasses.map((item, index) => (
              <div
                key={index}
                className="
                  border-b
                  border-[#e5e7eb]
                  p-4
                  last:border-b-0
                "
              >
                <div className="flex items-start justify-between gap-4">

                  {/* Left */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-semibold text-[#161b26]">
                        {item.date}
                      </p>

                      <span className="text-[11px] text-[#747ca1]">
                        {item.day}
                      </span>
                    </div>

                    <p className="mt-2 text-[13px] font-medium text-[#171b24]">
                      {item.className}
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-[#747ca1]">
                      Linear Equations & Inequalities
                    </p>

                    <p className="mt-2 text-[11px] text-[#747ca1]">
                      {item.time}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`
                          h-[7px]
                          w-[7px]
                          rounded-full
                          ${
                            item.statusType === "starting"
                              ? "bg-[#16c766]"
                              : "bg-[#343be7]"
                          }
                        `}
                      />

                      <span
                        className={`
                          text-[10px]
                          font-medium
                          ${
                            item.statusType === "starting"
                              ? "text-[#10b958]"
                              : "text-[#252be0]"
                          }
                        `}
                      >
                        {item.status}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="
                        flex
                        h-[29px]
                        w-[90px]
                        items-center
                        justify-center
                        gap-1.5
                        rounded-[4px]
                        bg-[#326df5]
                        text-[9px]
                        font-medium
                        text-white
                      "
                    >
                      <Video size={12} />
                      Join Class
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile Footer */}
            <div
              className="
                flex
                h-[45px]
                items-center
                justify-center
                border-t
                border-[#e5e7eb]
              "
            >
              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-3
                  text-[12px]
                  font-medium
                  text-[#246bff]
                "
              >
                <span>View All Upcoming Classes</span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.4}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}