
import React from "react";
import { Calculator } from "lucide-react";

const fmtNext = (d) =>
  d
    ? new Date(d).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })
    : "—";

export default function CurrentTeaching({ teaching = [] }) {
  const teachingData = teaching.map((t) => ({
    ...t,
    level: t.level || "—",
    nextClass: fmtNext(t.nextClassAt),
  }));

  return (
    <section className="min-h-[399px] w-full min-w-0 overflow-hidden rounded-[11px] bg-white font-sans">
      {/* Card Heading */}
      <div className="flex min-h-[49px] items-center px-4 py-3 sm:px-[11px]">
        <h2 className="text-lg font-bold leading-tight tracking-[-0.35px] text-black sm:text-[20px]">
          Current Teaching
        </h2>
      </div>

      {teachingData.length === 0 && (
        <p className="px-4 py-8 text-sm text-[#98A2B3]">This tutor isn't teaching any subjects yet.</p>
      )}

      {/* Desktop and Tablet Table */}
      <div className="hidden w-full sm:block">
        {/* Table Header */}
        <div className="grid h-[42px] grid-cols-[minmax(0,1.55fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-2 bg-[#eef1f4] px-3 text-xs font-medium text-[#3d4146] md:px-[14px] md:text-sm">
          <div>Subjects</div>
          <div>Level</div>
          <div>Students</div>
          <div>Classes</div>
          <div className="whitespace-nowrap">Next Class</div>
        </div>

        {/* Table Rows */}
        <div className="px-2">
          {teachingData.map((item) => (
            <div
              key={item.id}
              className="grid min-h-[53.5px] grid-cols-[minmax(0,1.55fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-2 border-b border-[#dfe2e6] px-1 text-xs last:border-b-0 md:text-[13px]"
            >
              {/* Subject and Icon */}
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-[6px] bg-[#34358b] text-white">
                  <Calculator
                    size={19}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </div>

                <span className="truncate font-medium text-[#111111]">
                  {item.subject}
                </span>
              </div>

              {/* Level */}
              <div className="text-[#62676d]">{item.level}</div>

              {/* Students */}
              <div className="text-[#62676d]">{item.students}</div>

              {/* Classes */}
              <div className="text-[#62676d]">{item.classes}</div>

              {/* Next Class */}
              <div className="whitespace-nowrap text-[#62676d]">
                {item.nextClass}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="divide-y divide-[#e5e7eb] px-3 sm:hidden">
        {teachingData.map((item) => (
          <article key={item.id} className="py-3">
            {/* Subject */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34358b] text-white">
                <Calculator size={20} strokeWidth={1.7} aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-[#111111]">
                  {item.subject}
                </h3>
                <p className="mt-0.5 text-xs text-[#62676d]">
                  {item.level}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-xs text-[#8a8f98]">Next class</p>
                <p className="mt-1 whitespace-nowrap text-xs font-medium text-[#62676d]">
                  {item.nextClass}
                </p>
              </div>
            </div>

            {/* Class Statistics */}
            <div className="mt-3 grid grid-cols-2 gap-3 pl-12">
              <div className="rounded-md bg-[#f6f7f9] px-3 py-2">
                <p className="text-[11px] text-[#7b818a]">Students</p>
                <p className="mt-1 text-sm font-semibold text-[#34358b]">
                  {item.students}
                </p>
              </div>

              <div className="rounded-md bg-[#f6f7f9] px-3 py-2">
                <p className="text-[11px] text-[#7b818a]">Classes</p>
                <p className="mt-1 text-sm font-semibold text-[#34358b]">
                  {item.classes}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
