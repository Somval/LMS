
import React from "react";

const revenueTrend = [
  { date: "Oct 1", value: 10000 },
  { date: "Oct 2", value: 50000 },
  { date: "Oct 3", value: 90000 },
  { date: "Oct 4", value: 110000 },
  { date: "Oct 5", value: 10000 },
  { date: "Oct 6", value: 30000 },
  { date: "Oct 7", value: 110000 },
  { date: "Oct 8", value: 140000 },
  { date: "Oct 9", value: 150000 },
];

const subscriptionPlans = [
  {
    name: "Monthly Plan",
    percentage: 55,
    color: "#353582",
  },
  {
    name: "Quarterly Plan",
    percentage: 40,
    color: "#326BFA",
  },
  {
    name: "Yearly Plan",
    percentage: 5,
    color: "#C5BA91",
  },
];

// Revenue Trend Chart
function RevenueTrendChart() {
  const chartWidth = 320;
  const chartHeight = 170;

  const left = 40;
  const right = 8;
  const top = 12;
  const bottom = 35;

  const plotWidth = chartWidth - left - right;
  const plotHeight = chartHeight - top - bottom;

  const maxValue = 150000;

  const points = revenueTrend.map((item, index) => {
    const x = left + (index / (revenueTrend.length - 1)) * plotWidth;
    const y = top + (1 - item.value / maxValue) * plotHeight;

    return { x, y, ...item };
  });

  const linePath = points
    .map((point, index) => {
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
    })
    .join(" ");

  const areaPath = `
    ${linePath}
    L ${points[points.length - 1].x} ${top + plotHeight}
    L ${points[0].x} ${top + plotHeight}
    Z
  `;

  const yLabels = [150000, 100000, 50000, 20000, 0];

  return (
    <div className="h-full w-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
        role="img"
        aria-label="Revenue trend area chart"
      >
        <defs>
          <linearGradient
            id="revenueAreaGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#8FE58E" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B9F1B5" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines and Y-axis labels */}
        {yLabels.map((value) => {
          const y =
            top + (1 - value / maxValue) * plotHeight;

          return (
            <g key={value}>
              <line
                x1={left}
                y1={y}
                x2={chartWidth - right}
                y2={y}
                stroke="#E9EDF3"
                strokeWidth="0.8"
                strokeDasharray="2 3"
              />

              <text
                x="3"
                y={y + 3}
                fill="#89919E"
                fontSize="7"
              >
                {value === 0
                  ? "0"
                  : `${value / 1000}k`}
              </text>
            </g>
          );
        })}

        {/* Vertical grid lines */}
        {points.map((point, index) => (
          <line
            key={index}
            x1={point.x}
            y1={top}
            x2={point.x}
            y2={top + plotHeight}
            stroke="#F0F2F6"
            strokeWidth="0.6"
          />
        ))}

        {/* Area under the revenue line */}
        <path
          d={areaPath}
          fill="url(#revenueAreaGradient)"
        />

        {/* Revenue line */}
        <path
          d={linePath}
          fill="none"
          stroke="#75D878"
          strokeWidth="1.3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* X-axis labels */}
        {points.map((point, index) => (
          <text
            key={index}
            x={point.x}
            y={chartHeight - 10}
            textAnchor="middle"
            fill="#89919E"
            fontSize="7"
          >
            {point.date}
          </text>
        ))}
      </svg>
    </div>
  );
}

// Subscription Plan Doughnut Chart
function SubscriptionPlanChart() {
  const totalRevenue = "₦2.45M";

  const firstPlan = subscriptionPlans[0].percentage;
  const secondPlan =
    firstPlan + subscriptionPlans[1].percentage;

  const chartBackground = `conic-gradient(
    ${subscriptionPlans[0].color} 0% ${firstPlan}%,
    ${subscriptionPlans[1].color} ${firstPlan}% ${secondPlan}%,
    ${subscriptionPlans[2].color} ${secondPlan}% 100%
  )`;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 sm:flex-row sm:gap-3">

      {/* Doughnut */}
      <div className="relative flex shrink-0 items-center justify-center">
        <div
          className="relative h-[150px] w-[150px] rounded-full shadow-sm sm:h-[158px] sm:w-[158px]"
          style={{ background: chartBackground }}
          role="img"
          aria-label="Subscription plan revenue distribution: Monthly 55%, Quarterly 40%, Yearly 5%"
        >
          {/* Inner Circle */}
          <div className="absolute inset-[27px] flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
            <h3 className="whitespace-nowrap text-[21px] font-bold tracking-tight text-gray-900">
              {totalRevenue}
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-500">
              Total Revenue
            </p>
          </div>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:min-w-[125px]">

        {subscriptionPlans.map((plan) => (
          <div
            key={plan.name}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: plan.color }}
              />

              <span className="whitespace-nowrap text-[9px] text-slate-500 sm:text-[10px]">
                {plan.name}
              </span>
            </div>

            <span className="text-[9px] font-medium text-slate-500 sm:text-[10px]">
              {plan.percentage}%
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}

// Main Revenue Analytics Component
export default function RevenueAnalytics() {
  return (
    <section className="w-full bg-[#F5F7FC] p-2 sm:p-3">

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

        {/* Revenue Trend Card */}
        <div className="min-w-0 rounded-lg bg-white p-3 shadow-sm sm:p-4">

          <h2 className="mb-3 text-[11px] font-bold text-gray-900">
            Revenue Trend
          </h2>

          <div className="h-[175px] w-full">
            <RevenueTrendChart />
          </div>

        </div>

        {/* Subscription Plan Card */}
        <div className="min-w-0 rounded-lg bg-white p-3 shadow-sm sm:p-4">

          <h2 className="mb-3 text-[11px] font-bold text-gray-900">
            Revenue by Subscription Plan
          </h2>

          <div className="flex min-h-[175px] w-full items-center justify-center">
            <SubscriptionPlanChart />
          </div>

        </div>

      </div>
    </section>
  );
}
