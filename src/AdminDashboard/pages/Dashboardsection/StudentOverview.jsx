
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const chartData = {
  "This Week": [
    { day: "Mon", value: 120 },
    { day: "Tue", value: 200 },
    { day: "Wed", value: 150 },
    { day: "Thu", value: 80 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 110 },
    { day: "Sun", value: 130 },
  ],
  "Last Week": [
    { day: "Mon", value: 100 },
    { day: "Tue", value: 160 },
    { day: "Wed", value: 130 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 110 },
    { day: "Sat", value: 80 },
    { day: "Sun", value: 140 },
  ],
  "This Month": [
    { day: "Mon", value: 140 },
    { day: "Tue", value: 180 },
    { day: "Wed", value: 120 },
    { day: "Thu", value: 100 },
    { day: "Fri", value: 160 },
    { day: "Sat", value: 130 },
    { day: "Sun", value: 190 },
  ],
};

const yAxisLabels = [200, 150, 100, 50, 0];

export default function StudentOverview() {
  const [period, setPeriod] = useState("This Week");

  const data = chartData[period];

  // Fixed SVG coordinates preserve the chart's proportions.
  const chartWidth = 520;
  const chartHeight = 300;

  const plotTop = 42;
  const plotBottom = 250;
  const plotLeft = 48;
  const plotRight = 510;

  const plotHeight = plotBottom - plotTop;
  const plotWidth = plotRight - plotLeft;
  const maxValue = 200;

  const slotWidth = plotWidth / data.length;
  const barWidth = Math.min(30, slotWidth * 0.55);

  const yPosition = (value) =>
    plotBottom - (value / maxValue) * plotHeight;

  return (
    <section className="box-border w-full min-w-0 overflow-hidden rounded-[9px] border border-[#F0F1F5] bg-white p-3 sm:p-4">
      {/* Header */}
      <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="font-[Inter] text-[13px] font-semibold leading-[1.4] text-[#171923] sm:text-[14px]">
            Student Overview
          </h2>

          <p className="mt-0.5 text-[10px] leading-[1.5] text-[#9297A5] sm:text-[11px]">
            Here's a chart of enrollments over time.
          </p>
        </div>

        {/* Period Selector */}
        <div className="relative flex shrink-0 items-center">
          <select
            aria-label="Select chart time period"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className="h-7 max-w-[108px] cursor-pointer appearance-none rounded-md border border-transparent bg-white py-0 pl-2 pr-6 text-[10px] text-[#7C85A0] outline-none transition-colors hover:bg-[#F8F9FC] focus-visible:ring-2 focus-visible:ring-[#00C4DD] sm:text-[11px]"
          >
            {Object.keys(chartData).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <ChevronDown
            size={12}
            strokeWidth={1.7}
            className="pointer-events-none absolute right-1.5 text-[#7C85A0]"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Responsive Bar Chart */}
      <div className="mt-3 w-full min-w-0">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          width="100%"
          role="img"
          aria-label={`Student enrollment chart for ${period}. ${data
            .map(({ day, value }) => `${day}: ${value}`)
            .join(", ")} students.`}
          className="block h-auto w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Horizontal Grid Lines and Y-Axis Labels */}
          {yAxisLabels.map((value) => {
            const y = yPosition(value);

            return (
              <g key={value}>
                <line
                  x1={plotLeft}
                  y1={y}
                  x2={plotRight}
                  y2={y}
                  stroke="#DCE2EB"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                <text
                  x="35"
                  y={y + 3}
                  textAnchor="end"
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                  fill="#9AA3B5"
                >
                  {value}
                </text>
              </g>
            );
          })}

          {/* Bars, Values and Weekday Labels */}
          {data.map(({ day, value }, index) => {
            const centerX =
              plotLeft + slotWidth * index + slotWidth / 2;

            const barHeight = (value / maxValue) * plotHeight;
            const barX = centerX - barWidth / 2;
            const barY = plotBottom - barHeight;

            return (
              <g key={day}>
                {/* Value Label */}
                <text
                  x={centerX}
                  y={Math.max(plotTop - 8, barY - 10)}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                  fontWeight="400"
                  fill="#30343B"
                >
                  {value}
                </text>

                {/* Bar */}
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={Math.max(0, barHeight)}
                  rx="4"
                  ry="4"
                  fill="#08C3DD"
                />

                {/* Weekday Label */}
                <text
                  x={centerX}
                  y={plotBottom + 17}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                  fill="#9297A5"
                >
                  {day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
