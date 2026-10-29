
import React from "react";

const availability = [
  { day: "Monday", time: "4:00 PM – 8:00 PM", available: true },
  { day: "Tuesday", time: "4:00 PM – 8:00 PM", available: true },
  { day: "Wednesday", time: "4:00 PM – 8:00 PM", available: true },
  { day: "Friday", time: "4:00 PM – 8:00 PM", available: true },
  { day: "Saturday", time: "Not Available", available: false },
  { day: "Sunday", time: "Not Available", available: false },
];

export default function TeachingAvailability() {
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
