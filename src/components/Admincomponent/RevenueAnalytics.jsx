import React from "react";

const METHOD_STYLE = {
  CARD: { name: "Card", color: "#353582" },
  BANK_TRANSFER: { name: "Bank transfer", color: "#326BFA" },
};

// Rounds up to a tidy axis maximum (1, 2, 5 or 10 times a power of ten).
const niceMax = (value) => {
  if (value <= 0) return 1000;
  const pow = 10 ** Math.floor(Math.log10(value));
  const f = value / pow;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * pow;
};

const short = (v) =>
  v >= 1e6 ? `${+(v / 1e6).toFixed(2)}M` : v >= 1e3 ? `${+(v / 1e3).toFixed(1)}k` : String(Math.round(v));

const axisLabel = (date, granularity) =>
  granularity === "month"
    ? new Date(`${date}-01T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "2-digit" })
    : new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

// Revenue Trend Chart
function RevenueTrendChart({ trend, granularity }) {
  const chartWidth = 320;
  const chartHeight = 170;
  const left = 40;
  const right = 8;
  const top = 12;
  const bottom = 35;
  const plotWidth = chartWidth - left - right;
  const plotHeight = chartHeight - top - bottom;

  const maxValue = niceMax(Math.max(0, ...trend.map((t) => t.amount)));
  const count = trend.length;

  const points = trend.map((item, index) => ({
    x: count > 1 ? left + (index / (count - 1)) * plotWidth : left + plotWidth / 2,
    y: top + (1 - item.amount / maxValue) * plotHeight,
    ...item,
  }));

  // Show at most ~8 date labels so they never overlap.
  const step = Math.max(1, Math.ceil(count / 8));
  const labelled = points.filter((_, i) => i % step === 0);

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const baseline = top + plotHeight;
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${baseline} L ${points[0].x} ${baseline} Z`
    : "";
  const yLabels = [1, 0.75, 0.5, 0.25, 0].map((f) => maxValue * f);

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
          <linearGradient id="revenueAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8FE58E" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B9F1B5" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines and Y-axis labels */}
        {yLabels.map((value) => {
          const y = top + (1 - value / maxValue) * plotHeight;
          return (
            <g key={value}>
              <line x1={left} y1={y} x2={chartWidth - right} y2={y} stroke="#E9EDF3" strokeWidth="0.8" strokeDasharray="2 3" />
              <text x="3" y={y + 3} fill="#89919E" fontSize="7">
                {value === 0 ? "0" : short(value)}
              </text>
            </g>
          );
        })}

        {/* Vertical grid lines */}
        {labelled.map((p) => (
          <line key={p.date} x1={p.x} y1={top} x2={p.x} y2={baseline} stroke="#F0F2F6" strokeWidth="0.6" />
        ))}

        {/* Area and line */}
        {areaPath && <path d={areaPath} fill="url(#revenueAreaGradient)" />}
        {points.length > 1 ? (
          <path d={linePath} fill="none" stroke="#75D878" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
        ) : (
          points.map((p) => <circle key={p.date} cx={p.x} cy={p.y} r="2.5" fill="#75D878" />)
        )}

        {/* X-axis labels */}
        {labelled.map((p) => (
          <text key={p.date} x={p.x} y={chartHeight - 10} textAnchor="middle" fill="#89919E" fontSize="7">
            {axisLabel(p.date, granularity)}
          </text>
        ))}
      </svg>
    </div>
  );
}

// Revenue by payment method doughnut
function PaymentMethodChart({ byMethod, total }) {
  const items = byMethod.map((m) => ({
    ...METHOD_STYLE[m.method],
    amount: m.amount,
    percentage: total > 0 ? Math.round((m.amount / total) * 100) : 0,
  }));

  const first = total > 0 ? (items[0].amount / total) * 100 : 0;
  const chartBackground =
    total > 0
      ? `conic-gradient(${items[0].color} 0% ${first}%, ${items[1].color} ${first}% 100%)`
      : "#E5E7EB";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 sm:flex-row sm:gap-3">
      {/* Doughnut */}
      <div className="relative flex shrink-0 items-center justify-center">
        <div
          className="relative h-[150px] w-[150px] rounded-full shadow-sm sm:h-[158px] sm:w-[158px]"
          style={{ background: chartBackground }}
          role="img"
          aria-label={
            total > 0
              ? `Revenue by payment method: ${items.map((i) => `${i.name} ${i.percentage}%`).join(", ")}`
              : "No revenue in this period"
          }
        >
          <div className="absolute inset-[27px] flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
            <h3 className="whitespace-nowrap text-[21px] font-bold tracking-tight text-gray-900">₦{short(total)}</h3>
            <p className="mt-0.5 text-[10px] text-slate-500">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:min-w-[125px]">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="whitespace-nowrap text-[9px] text-slate-500 sm:text-[10px]">{item.name}</span>
            </div>
            <span className="text-[9px] font-medium text-slate-500 sm:text-[10px]">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Revenue Analytics Component
export default function RevenueAnalytics({ summary, loading }) {
  const trend = summary?.trend ?? [];
  const byMethod = summary?.byMethod ?? [
    { method: "CARD", amount: 0 },
    { method: "BANK_TRANSFER", amount: 0 },
  ];
  const total = summary?.totals.revenue ?? 0;

  return (
    <section className="w-full bg-[#F5F7FC] p-2 sm:p-3">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {/* Revenue Trend Card */}
        <div className="min-w-0 rounded-lg bg-white p-3 shadow-sm sm:p-4">
          <h2 className="mb-3 text-[11px] font-bold text-gray-900">Revenue Trend</h2>
          <div className={`h-[175px] w-full ${loading ? "opacity-50" : ""}`}>
            <RevenueTrendChart trend={trend} granularity={summary?.granularity} />
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="min-w-0 rounded-lg bg-white p-3 shadow-sm sm:p-4">
          <h2 className="mb-3 text-[11px] font-bold text-gray-900">Revenue by Payment Method</h2>
          <div className={`flex min-h-[175px] w-full items-center justify-center ${loading ? "opacity-50" : ""}`}>
            <PaymentMethodChart byMethod={byMethod} total={total} />
          </div>
        </div>
      </div>
    </section>
  );
}
