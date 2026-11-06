
import React from "react";

const DAYS = [
  ["mon", "Monday"],
  ["tue", "Tuesday"],
  ["wed", "Wednesday"],
  ["thu", "Thursday"],
  ["fri", "Friday"],
  ["sat", "Saturday"],
  ["sun", "Sunday"],
];

const fmtTime = (t) => {
  const m = /^(\d{1,2}):(\d{2})/.exec(t || "");
  if (!m) return t || "";
  const h = Number(m[1]);
  return `${h % 12 || 12}:${m[2]} ${h >= 12 ? "PM" : "AM"}`;
};

const buildRows = (info) => {
  const chosen = new Set((info?.days ?? []).map((d) => String(d).slice(0, 3).toLowerCase()));
  const time = info?.from && info?.to ? `${fmtTime(info.from)} – ${fmtTime(info.to)}` : "Available";
  return DAYS.map(([key, day]) => ({
    day,
    available: chosen.has(key),
    time: chosen.has(key) ? time : "Not Available",
  }));
};

export default function TeachingAvailability({ availability: info = null }) {
  const availability = buildRows(info);
  return (
    <section className="h-[399px] w-full max-w-[433px] overflow-hidden rounded-[12px] bg-white px-[13px] pb-[18px] pt-[15px] font-sans">
      {/* Heading */}
      <div className="px-[8px] pb-[10px]">
        <h2 className="text-[19px] font-semibold leading-[25px] tracking-[-0.3px] text-black">
          Teaching Availability
        </h2>
      </div>

      {/* Availability List */}
      <div className="w-full">
        {availability.map((item) => (
          <div
            key={item.day}
            className="grid h-[49px] grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] items-center gap-2 border-t border-[#d5d8df] px-[8px]"
          >
            {/* Day */}
            <span className="whitespace-nowrap text-[16px] font-normal leading-5 text-[#555766]">
              {item.day}
            </span>

            {/* Availability Badge */}
            <div
              className={`flex h-[33px] w-full items-center justify-center rounded-[5px] px-1 text-center text-[14px] font-medium whitespace-nowrap ${
                item.available
                  ? "bg-[#d7f8e8] text-[#00b84a]"
                  : "bg-[#ffdada] text-[#ff1717]"
              }`}
            >
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
