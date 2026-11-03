import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight, Check } from "lucide-react";
import { ATTENDANCE_PERIODS, buildAttendance } from "./dashboardData";

const periodOptions = ATTENDANCE_PERIODS;

// Donut drawn from the real percentages (grey ring when there were no classes).
function AttendanceDonut({ items, total }) {
  const size = 145;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-full w-full -rotate-90"
      role="img"
      aria-label="Attendance breakdown"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth={stroke}
      />

      {total > 0 &&
        items.map((item) => {
          const length = (circumference * item.value) / 100;
          const segment = item.value ? (
            <circle
              key={item.name}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={stroke}
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
            />
          ) : null;
          offset += length;
          return segment;
        })}
    </svg>
  );
}

export default function AttendanceOverview({ data }) {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const { byPeriod, totals } = useMemo(
    () => buildAttendance(data?.attendance),
    [data]
  );

  const attendanceData = byPeriod[selectedPeriod];
  const totalClasses = totals[selectedPeriod];

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
          <AttendanceDonut items={attendanceData} total={totalClasses} />

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
        {totalClasses === 0 && (
          <p className="mb-2 text-[10px] text-slate-400">
            No classes were recorded in this period.
          </p>
        )}

        <button
          type="button"
          onClick={() => navigate("/parent/attendance")}
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