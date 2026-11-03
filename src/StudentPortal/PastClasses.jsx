import React from "react";
import {
  ArrowRight,
  CirclePlay,
} from "lucide-react";
import { dayLabel, timeRange, openLink } from "./classFormat";

const STATUS_LABEL = { PRESENT: "Attended", LATE: "Late", ABSENT: "Missed" };

export default function PastClasses({ classes = [], attendance = {} }) {
  const pastClasses = classes.map((c) => ({
    ...dayLabel(c.startsAt),
    className: c.subject.name,
    topic: c.title,
    time: timeRange(c.startsAt, c.endsAt),
    status: c.status === "CANCELLED" ? "Cancelled" : STATUS_LABEL[attendance[c.id]] ?? "Not marked",
    recording: !!c.recordingUrl,
    recordingUrl: c.recordingUrl,
  }));

  return (
    <section className="w-full bg-[#f5f7fc] px-4 py-5 sm:px-5">
      <div className="w-full">

        {/* =========================
            SECTION TITLE
        ========================== */}
        <h2 className="mb-4 text-[17px] font-semibold leading-none text-[#101828]">
          Past Classes
        </h2>

        {/* =========================
            TABLE CARD
        ========================== */}
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
          {/* =========================
              DESKTOP TABLE
          ========================== */}
          <div className="hidden md:block">

            {/* TABLE HEADER */}
            <div
              className="
                grid
                grid-cols-[108px_minmax(110px,1fr)_minmax(150px,1.35fr)_108px_118px_98px]
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

              {/* Empty action header — matches screenshot */}
              <div />
            </div>

            {/* =========================
                TABLE ROWS
            ========================== */}
            {pastClasses.map((item, index) => (
              <div
                key={index}
                className="
                  grid
                  min-h-[71px]
                  grid-cols-[108px_minmax(110px,1fr)_minmax(150px,1.35fr)_108px_118px_98px]
                  items-center
                  border-t
                  border-[#e5e7eb]
                  px-5
                "
              >
                {/* DATE */}
                <div className="leading-tight">
                  <p className="text-[12px] font-semibold text-[#161b26]">
                    {item.date}
                  </p>

                  <p className="mt-[2px] text-[12px] text-[#747ca1]">
                    {item.day}
                  </p>
                </div>

                {/* CLASS */}
                <div>
                  <p className="text-[12px] font-medium text-[#171b24]">
                    {item.className}
                  </p>
                </div>

                {/* TOPIC */}
                <div className="text-[12px] leading-[17px] text-[#747ca1]">
                  {item.topic}
                </div>

                {/* TIME */}
                <div className="text-[12px] leading-[17px] text-[#747ca1]">
                  {item.time}
                </div>

                {/* STATUS */}
                <div>
                  <div className="flex items-center gap-[7px]">
                    <span
                      className="
                        h-[7px]
                        w-[7px]
                        shrink-0
                        rounded-full
                        bg-[#16c766]
                      "
                    />

                    <span
                      className={`
                        whitespace-nowrap
                        text-[11px]
                        font-medium
                        ${item.status === "Attended" ? "text-[#10b958]" : item.status === "Missed" || item.status === "Cancelled" ? "text-[#e5484d]" : "text-[#747ca1]"}
                      `}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* RECORDING ACTION */}
                <div className="flex justify-end">
                  {item.recording && (
                    <button
 onClick={() => openLink(item.recordingUrl)}
 
                      type="button"
                      className="
                        flex
                        h-[27px]
                        w-[94px]
                        items-center
                        justify-center
                        gap-[5px]
                        rounded-[5px]
                        border
                        border-[#5790ff]
                        bg-white
                        text-[9px]
                        font-medium
                        text-[#246bff]
                        transition-all
                        duration-200
                        hover:bg-[#f4f7ff]
                        hover:border-[#326df5]
                        active:scale-[0.98]
                      "
                    >
                      <CirclePlay
                        size={13}
                        strokeWidth={1.5}
                      />

                      <span>
                        Watch Recording
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* =========================
                FOOTER
            ========================== */}
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
                  duration-200
                  hover:text-[#1554d1]
                "
              >
                <span>
                  View All Past Classes
                </span>

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

          {/* =========================
              MOBILE VERSION
          ========================== */}
          <div className="md:hidden">

            {pastClasses.map((item, index) => (
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

                  {/* LEFT CONTENT */}
                  <div className="min-w-0">

                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-semibold text-[#161b26]">
                        {item.date}
                      </p>

                      <span className="text-[11px] text-[#747ca1]">
                        {item.day}
                      </span>
                    </div>

                    {/* Class */}
                    <p className="mt-2 text-[13px] font-medium text-[#171b24]">
                      {item.className}
                    </p>

                    {/* Topic */}
                    <p className="mt-1 text-[11px] leading-4 text-[#747ca1]">
                      Linear Equations & Inequalities
                    </p>

                    {/* Time */}
                    <p className="mt-2 text-[11px] text-[#747ca1]">
                      {item.time}
                    </p>
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="flex shrink-0 flex-col items-end gap-3">

                    {/* Status */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className="
                          h-[7px]
                          w-[7px]
                          rounded-full
                          bg-[#9aa3bd]
                        "
                      />

                      <span
                        className={`
                          text-[10px]
                          font-medium
                          ${item.status === "Attended" ? "text-[#10b958]" : item.status === "Missed" || item.status === "Cancelled" ? "text-[#e5484d]" : "text-[#747ca1]"}
                        `}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Recording */}
                    {item.recording && (
                      <button
 onClick={() => openLink(item.recordingUrl)}
 
                        type="button"
                        className="
                          flex
                          h-[29px]
                          w-[96px]
                          items-center
                          justify-center
                          gap-1.5
                          rounded-[5px]
                          border
                          border-[#5790ff]
                          bg-white
                          text-[9px]
                          font-medium
                          text-[#246bff]
                        "
                      >
                        <CirclePlay
                          size={13}
                          strokeWidth={1.5}
                        />

                        Watch Recording
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* MOBILE FOOTER */}
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
                <span>
                  View All Past Classes
                </span>

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