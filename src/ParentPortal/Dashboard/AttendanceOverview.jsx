import React, { useState, useRef, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChevronDown, ArrowRight, Check } from "lucide-react";

const attendanceByPeriod = {
  "This Week": [
    {
      name: "Present",
      value: 82,
      color: "#4ADE63",
    },
    {
      name: "Late",
      value: 10,
      color: "#2864E8",
    },
    {
      name: "Absent",
      value: 8,
      color: "#FF1010",
    },
  ],

  "Last Week": [
    {
      name: "Present",
      value: 78,
      color: "#4ADE63",
    },
    {
      name: "Late",
      value: 14,
      color: "#2864E8",
    },
    {
      name: "Absent",
      value: 8,
      color: "#FF1010",
    },
  ],

  "This Month": [
    {
      name: "Present",
      value: 85,
      color: "#4ADE63",
    },
    {
      name: "Late",
      value: 9,
      color: "#2864E8",
    },
    {
      name: "Absent",
      value: 6,
      color: "#FF1010",
    },
  ],

  "Last Month": [
    {
      name: "Present",
      value: 80,
      color: "#4ADE63",
    },
    {
      name: "Late",
      value: 12,
      color: "#2864E8",
    },
    {
      name: "Absent",
      value: 8,
      color: "#FF1010",
    },
  ],
};

const periodOptions = [
  "This Week",
  "Last Week",
  "This Month",
  "Last Month",
];

export default function AttendanceOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const attendanceData = attendanceByPeriod[selectedPeriod];

  const presentPercentage =
    attendanceData.find((item) => item.name === "Present")?.value || 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-[460px] overflow-hidden rounded-[10px] border border-slate-100 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.10)]">
      
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="text-[13px] font-semibold tracking-[-0.2px] text-slate-900">
          Attendance Overview
        </h2>

        {/* Dropdown */}
        <div
          ref={dropdownRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-[29px] items-center gap-2 rounded-[6px] border border-slate-200 bg-white px-2.5 text-[9px] font-medium text-[#777BAA] transition hover:bg-slate-50"
          >
            <span>{selectedPeriod}</span>

            <ChevronDown
              size={11}
              strokeWidth={1.8}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-[34px] z-50 w-[125px] overflow-hidden rounded-[7px] border border-slate-200 bg-white py-1 shadow-[0_5px_15px_rgba(15,23,42,0.12)]">
              {periodOptions.map((period) => {
                const isSelected = selectedPeriod === period;

                return (
                  <button
                    key={period}
                    type="button"
                    onClick={() => handlePeriodChange(period)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-[9px] transition ${
                      isSelected
                        ? "bg-slate-50 font-semibold text-[#20266F]"
                        : "font-medium text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{period}</span>

                    {isSelected && (
                      <Check
                        size={11}
                        strokeWidth={2}
                        className="text-[#20266F]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ================= CHART + LEGEND ================= */}
      <div className="flex items-center px-5 pb-5 pt-3">
        
        {/* Donut */}
        <div className="relative h-[145px] w-[145px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
           
           <svg width="149" height="149" viewBox="0 0 149 149" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M74.5 0C89.2347 1.7571e-07 103.639 4.36935 115.89 12.5555C128.141 20.7417 137.69 32.377 143.329 45.9901C148.968 59.6032 150.443 74.5826 147.568 89.0342C144.694 103.486 137.598 116.76 127.179 127.179L112.429 112.429C119.931 104.928 125.04 95.3698 127.109 84.9646C129.179 74.5595 128.117 63.7743 124.057 53.9729C119.997 44.1714 113.122 35.794 104.301 29.9C95.4797 24.0059 85.109 20.86 74.5 20.86V0Z" fill="#58F367"/>
<path d="M74.5 149C57.1605 149 40.364 142.952 27.0051 131.898C13.6461 120.843 4.5613 105.476 1.31627 88.4424L21.8077 84.5385C24.1441 96.8024 30.6852 107.867 40.3036 115.826C49.9221 123.785 62.0156 128.14 74.5 128.14V149Z" fill="#58F367"/>
<path d="M37.25 139.019C25.1923 132.057 15.3266 121.856 8.77204 109.573C2.21744 97.2889 -0.763788 83.4142 0.166478 69.5223C1.09674 55.6304 5.90128 42.2771 14.0351 30.977C22.169 19.6769 33.3067 10.8823 46.1849 5.59058L54.1132 24.8852C44.8408 28.6952 36.8217 35.0274 30.9653 43.1634C25.1089 51.2995 21.6497 60.9139 20.9799 70.9161C20.3101 80.9183 22.4566 90.908 27.1759 99.7523C31.8952 108.597 38.9984 115.941 47.68 120.954L37.25 139.019Z" fill="#58F367"/>
<path d="M0 74.5C8.55299e-07 64.7165 1.927 55.0288 5.67098 45.9901C9.41496 36.9513 14.9026 28.7385 21.8206 21.8205L36.5708 36.5708C31.5899 41.5517 27.6388 47.4649 24.9431 53.9729C22.2474 60.4808 20.86 67.4559 20.86 74.5H0Z" fill="#2E6DFF"/>
<path d="M21.8205 21.8205C28.7385 14.9026 36.9513 9.41494 45.9901 5.67097C55.0289 1.92699 64.7166 -4.78179e-06 74.5 0L74.5 20.86C67.4559 20.86 60.4808 22.2474 53.9729 24.9431C47.465 27.6388 41.5517 31.5899 36.5708 36.5708L21.8205 21.8205Z" fill="#FF0000"/>
<path d="M127.179 127.179C113.208 141.151 94.2586 149 74.5 149V128.14C88.7262 128.14 102.37 122.489 112.429 112.429L127.179 127.179Z" fill="#58F367"/>
</svg>

          </ResponsiveContainer>

          {/* Center Percentage */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-[26px] font-bold tracking-[-1px] text-black">
              {presentPercentage}%
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="ml-7 flex flex-1 flex-col gap-[17px]">
          {attendanceData.map((item) => (
            <div
              key={item.name}
              className="flex items-center"
            >
              {/* Color Dot */}
              <span
                className="mr-3 h-[9px] w-[9px] shrink-0 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              {/* Label */}
              <span className="text-[10px] font-medium text-slate-800">
                {item.name}
              </span>

              {/* Percentage */}
              <span className="ml-auto text-[9px] font-semibold text-slate-800">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="px-5 pb-4">
        <button
          type="button"
          className="group flex items-center gap-1 text-[10px] font-semibold text-[#20266F] transition hover:text-[#151A55]"
        >
          <span>View Attendance Calendar</span>

          <ArrowRight
            size={12}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </div>
  );
}