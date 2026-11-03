
import React, { useMemo, useState } from "react";
import useAdminPayments, { naira } from "../../AdminDashboard/hooks/useAdminPayments";

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

export default function RevenuePayments() {
  const { totals, loading } = useAdminPayments();

  // Cards use live totals from the backend; the design is unchanged.
  const revenueData = useMemo(
    () =>
      baseRevenueData.map((card) => {
        const key = { 1: "revenue", 2: "successful", 3: "pending", 4: "failed" }[card.id];
        return {
          ...card,
          amount: loading ? "…" : naira(totals[key]).replace("₦", ""),
          subtitle: card.id === 1 ? "" : card.subtitle,
        };
      }),
    [totals, loading]
  );

  const [startDate, setStartDate] = useState("2026-10-01");
  const [endDate, setEndDate] = useState("2026-10-31");

  // Format Date
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Export CSV
  const handleExport = () => {
    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csvContent = [
      ["Revenue & Payments Report"],
      ["Start Date", formatDate(startDate)],
      ["End Date", formatDate(endDate)],
      [],
      ["Category", "Amount", "Description"],
      ...revenueData.map((item) => [
        item.title,
        item.amount,
        item.subtitle || "N/A",
      ]),
    ]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "revenue-payments-report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
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
            Track revenue, payments, refunds and tutor payouts.
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
            className="flex h-9 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
          >
            <Download size={15} strokeWidth={1.8} />
            Export
          </button>

        </div>
      </div>

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
