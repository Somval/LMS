
import React, { useMemo, useState } from "react";
import { naira, exportRevenueCsv } from "../../AdminDashboard/hooks/useAdminPayments";

import {
  CircleAlert,
  CircleX,
  CalendarDays,
  Download,
} from "lucide-react";

import {
  RevenueWalletIcon,
  SuccessfulPaymentIcon,
} from "./icons/RevenueIcons";

// Revenue Summary Data
const baseRevenueData = [
  {
    id: 1,
    title: "Total Revenue",
    amount: "2,450,000",
    subtitle: "12% from last month",
    icon: "revenue",
    cardColor: "bg-[#E3F6D5]/90",
    borderColor: "border-[#BADABA]",
    iconBg: "bg-[#9DC381]/40",
    amountColor: "text-gray-900",
  },
  {
    id: 2,
    title: "Successful Payments",
    amount: "2,180,000",
    subtitle: "",
    icon: "successful",
    cardColor: "bg-[#DDF5F2]",
    borderColor: "border-[#BADACB]",
    iconBg: "bg-[#81C3BF]/40",
    amountColor: "text-gray-900",
  },
  {
    id: 3,
    title: "Pending Payments",
    amount: "150,000",
    subtitle: "",
    icon: "pending",
    cardColor: "bg-[#F5E8FA]",
    borderColor: "border-[#DDA9EC]",
    iconBg: "bg-[#D9A8E8]/50",
    iconColor: "text-[#A020C0]",
    amountColor: "text-gray-900",
  },
  {
    id: 4,
    title: "Failed Payments",
    amount: "120,000",
    subtitle: "",
    icon: "failed",
    cardColor: "bg-[#FCE8E9]",
    borderColor: "border-[#EAB5BA]",
    iconBg: "bg-[#E9A4AA]/50",
    iconColor: "text-[#DC2626]",
    amountColor: "text-gray-900",
  },
];

// Icon Mapping
const revenueIcons = {
  revenue: RevenueWalletIcon,
  successful: SuccessfulPaymentIcon,
  pending: CircleAlert,
  failed: CircleX,
};

// Reusable Icon Component
function RevenueIcon({ name, className = "" }) {
  const IconComponent = revenueIcons[name];

  if (!IconComponent) return null;

  return (
    <IconComponent
      className={className}
      size={19}
      strokeWidth={1.8}
      aria-hidden="true"
    />
  );
}

export default function RevenuePayments({ range, onRangeChange, summary, loading, error }) {
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");

  // Cards show live totals for the selected range; the design is unchanged.
  const revenueData = useMemo(
    () =>
      baseRevenueData.map((card) => {
        const key = { 1: "revenue", 2: "successful", 3: "pending", 4: "failed" }[card.id];
        const countKey = { 2: "successful", 3: "pending", 4: "failed" }[card.id];
        let subtitle = "";
        if (summary) {
          if (card.id === 1) {
            subtitle =
              summary.changePct == null
                ? "After refunds"
                : `${summary.changePct > 0 ? "+" : ""}${summary.changePct}% vs previous period`;
          } else {
            const n = summary.counts[countKey];
            subtitle = `${n} payment${n === 1 ? "" : "s"}`;
          }
        }
        return {
          ...card,
          amount: summary ? naira(summary.totals[key]).replace("₦", "") : loading ? "…" : "0",
          subtitle,
        };
      }),
    [summary, loading]
  );

  const startDate = range.from;
  const endDate = range.to;
  const setStartDate = (v) => v && onRangeChange({ ...range, from: v });
  const setEndDate = (v) => v && onRangeChange({ ...range, to: v });

  const handleExport = async () => {
    if (exporting) return;
    setExporting(true);
    setExportError("");
    try {
      await exportRevenueCsv(range, summary);
    } catch (err) {
      setExportError(err.message || "Could not export the report.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <section className="w-full p-4 sm:p-5">

      {/* Header */}
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-lg font-bold leading-tight tracking-tight text-gray-900">
            Revenue & Payments
          </h2>

          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Track revenue, payments and refunds.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Date Range */}
          <div className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-2 shadow-sm">

            <CalendarDays
              size={16}
              strokeWidth={1.7}
              className="shrink-0 text-slate-600"
            />

            <input
              type="date"
              value={startDate}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
              aria-label="Start date"
              className="w-[115px] cursor-pointer bg-transparent text-[10px] text-slate-700 outline-none"
            />

            <span className="text-xs text-slate-400">-</span>

            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              aria-label="End date"
              className="w-[115px] cursor-pointer bg-transparent text-[10px] text-slate-700 outline-none"
            />
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="flex h-9 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
          >
            <Download size={15} strokeWidth={1.8} />
            {exporting ? "Exporting…" : "Export"}
          </button>

        </div>
      </div>

      {(error || exportError) && (
        <p role="alert" className="mb-3 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
          {error || exportError}
        </p>
      )}

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

        {revenueData.map((item) => (
          <div
            key={item.id}
            className={`
              flex min-h-[68px] items-center gap-3
              rounded-md border px-3 py-2.5
              transition-all duration-200 hover:shadow-sm
              ${item.cardColor}
              ${item.borderColor}
            `}
          >

            {/* Icon */}
            <div
              className={`
                flex h-[42px] w-[42px] shrink-0
                items-center justify-center rounded-full
                ${item.iconBg}
              `}
            >
              <RevenueIcon
                name={item.icon}
                className={item.iconColor || ""}
              />
            </div>

            {/* Card Information */}
            <div className="min-w-0">

              <h3
                className={`
                  text-[12px] font-bold leading-5
                  ${item.amountColor}
                `}
              >
                {item.amount}
              </h3>

              <p className="mt-0.5 truncate text-[10px] font-normal leading-4 text-slate-500">
                {item.title}
              </p>

              {item.subtitle && (
                <p className="mt-0.5 text-[9px] leading-3 text-slate-500">
                  {item.subtitle}
                </p>
              )}

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
