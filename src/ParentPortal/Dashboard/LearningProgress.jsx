
import React, { useId, useState } from "react";
import learningProgressData from "../../Data/learningProgressData";

export default function LearningProgress() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisWeek");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const chartId = useId().replace(/:/g, "");

  const periods = learningProgressData.periods;

  const currentPeriod =
    periods.find((period) => period.value === selectedPeriod) ??
    periods[0];

  const weeks = currentPeriod.weeks;

  const chart = {
    left: 40,
    right: 365,
    top: 8,
    bottom: 145,
  };

  const chartWidth = chart.right - chart.left;
  const chartHeight = chart.bottom - chart.top;

  const horizontalLines = [0, 20, 40, 60, 80, 100];

  const verticalLines = Array.from(
    { length: 21 },
    (_, index) =>
      chart.left + (index / 20) * chartWidth
  );

  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];

  // Convert JSON progress values to SVG coordinates.
  const points = weeks.map((item, index) => ({
    x:
      chart.left +
      (index / Math.max(weeks.length - 1, 1)) * chartWidth,
    y:
      chart.bottom -
      (Math.max(0, Math.min(100, item.progress)) / 100) *
        chartHeight,
    progress: item.progress,
    week: item.week,
  }));

  // Create a smooth cubic Bézier curve.
  const createSmoothPath = (data) => {
    if (data.length === 0) return "";

    if (data.length === 1) {
      return `M ${data[0].x} ${data[0].y}`;
    }

    let path = `M ${data[0].x} ${data[0].y}`;

    const tension = 0.22;

    for (let index = 0; index < data.length - 1; index++) {
      const current = data[index];
      const next = data[index + 1];

      const previous = data[Math.max(index - 1, 0)];
      const following =
        data[Math.min(index + 2, data.length - 1)];

      const cp1x =
        current.x + (next.x - previous.x) * tension;

      const cp1y =
        current.y + (next.y - previous.y) * tension;

      const cp2x =
        next.x - (following.x - current.x) * tension;

      const cp2y =
        next.y - (following.y - current.y) * tension;

      path +=
        ` C ${cp1x} ${cp1y},` +
        ` ${cp2x} ${cp2y},` +
        ` ${next.x} ${next.y}`;
    }

    return path;
  };

  const progressPath = createSmoothPath(points);

  const gradientId = `${chartId}-progress-gradient`;
  const clipId = `${chartId}-progress-clip`;

  return (
    <div className="w-full max-w-[460px] mb-5 lg:mb-1 overflow-hidden rounded-xl bg-white shadow-[0_2px_8px_rgba(15,23,42,0.10)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="text-[13px] font-semibold leading-5 text-[#111827]">
          Learning Progress
        </h2>

        {/* Period dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            className="flex h-[27px] items-center gap-1.5 rounded-md border border-[#E0E2ED] px-2 text-[10px] font-normal text-[#8184AE] transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#5073B8]/20"
          >
            <span>{currentPeriod.label}</span>

            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
              className={`transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M2.5 3.75L5 6.25L7.5 3.75"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <>
              <button
                type="button"
                aria-label="Close period menu"
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setDropdownOpen(false)}
              />

              <div
                role="listbox"
                aria-label="Select progress period"
                className="absolute right-0 top-full z-20 mt-1 min-w-[125px] overflow-hidden rounded-md border border-[#E9EAF0] bg-white py-1 shadow-lg"
              >
                {periods.map((period) => (
                  <button
                    key={period.value}
                    type="button"
                    role="option"
                    aria-selected={
                      selectedPeriod === period.value
                    }
                    onClick={() => {
                      setSelectedPeriod(period.value);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-left text-[11px] transition-colors hover:bg-slate-50 ${
                      selectedPeriod === period.value
                        ? "bg-slate-50 font-semibold text-[#5073B8]"
                        : "text-[#64748B]"
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Complete SVG chart */}
      <div className="px-3 pt-3">
        <svg
          className="block h-auto w-full"
          viewBox="0 0 380 180"
          fill="none"
          role="img"
          aria-label={`${currentPeriod.label} learning progress chart, overall progress ${currentPeriod.overallProgress} percent`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Teal to green to blue gradient */}
            <linearGradient
              id={gradientId}
              x1="40"
              y1="110"
              x2="365"
              y2="25"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#6EC2AE" />
              <stop offset="55%" stopColor="#6DC175" />
              <stop offset="100%" stopColor="#5073B8" />
            </linearGradient>

            {/* Keep the curve inside the plotting area */}
            <clipPath id={clipId}>
              <rect
                x={chart.left}
                y={chart.top}
                width={chartWidth}
                height={chartHeight}
              />
            </clipPath>
          </defs>

          {/* Horizontal dashed grid and percentage labels */}
          {horizontalLines.map((value) => {
            const y =
              chart.bottom - (value / 100) * chartHeight;

            return (
              <g key={`horizontal-${value}`}>
                <line
                  x1={chart.left}
                  y1={y}
                  x2={chart.right}
                  y2={y}
                  stroke="#AEB8C7"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />

                <text
                  x={chart.left - 6}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="10"
                  fill="#64748B"
                >
                  {value}%
                </text>
              </g>
            );
          })}

          {/* Vertical dashed grid */}
          {verticalLines.map((x, index) => (
            <line
              key={`vertical-${index}`}
              x1={x}
              y1={chart.top}
              x2={x}
              y2={chart.bottom}
              stroke="#AEB8C7"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          ))}

          {/* Chart axes */}
          <path
            d={`M ${chart.left} ${chart.top} V ${chart.bottom} H ${chart.right}`}
            stroke="#64748B"
            strokeWidth="1"
          />

          {/* Dynamic smooth progress line */}
          <g clipPath={`url(#${clipId})`}>
            {progressPath && (
              <path
                d={progressPath}
                stroke={`url(#${gradientId})`}
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </g>

          {/* Week labels */}
          <g
            fontSize="10"
            fill="#475569"
            textAnchor="middle"
          >
            {weekLabels.map((week, index) => (
              <text
                key={week}
                x={
                  chart.left +
                  ((index + 0.5) / weekLabels.length) *
                    chartWidth
                }
                y="164"
              >
                {week}
              </text>
            ))}
          </g>
        </svg>
      </div>

      {/* Footer statistics */}
      <div className="mt-1 border-t border-[#F0F1F5]">
        <div className="grid grid-cols-2">
          {/* Overall Progress */}
          <div className="flex flex-col items-center justify-center py-[7px]">
            <span className="text-[11px] font-medium leading-4 text-[#8184AE]">
              Overall Progress
            </span>

            <span className="mt-0.5 text-[12px] font-medium leading-4 text-[#111111]">
              {currentPeriod.overallProgress}%
            </span>
          </div>

          {/* On Track */}
          <div className="flex flex-col items-center justify-center border-l border-[#F0F1F5] py-[7px]">
            <span className="text-[11px] font-medium leading-4 text-[#8184AE]">
              On Track
            </span>

            <span
              className={`mt-0.5 text-[11px] font-medium leading-4 ${
                currentPeriod.onTrack
                  ? "text-[#22C55E]"
                  : "text-red-500"
              }`}
            >
              {currentPeriod.onTrack ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
