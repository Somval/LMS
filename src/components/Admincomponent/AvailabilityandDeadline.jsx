import React from "react";
import { Calendar } from "lucide-react";

export default function AvailabilityDeadlineCard({
  availabilityTitle = "Available after",
  availabilityValue = "Topic 3",
  availabilityDescription = "Students can access this assignment after completing Week 3.",
  deadlineTitle = "Deadline after unlocking",
  deadlineValue = "7 days",
  deadlineDescription = "The assignment will be due 7 days after it becomes available.",
}) {
  return (
    <div className="w-full rounded-2xl bg-white p-5 sm:p-6 shadow-xs border border-[#e2e8f0] font-sans antialiased text-[#1e293b]">
      {/* Section Title */}
      <h2 className="text-sm sm:text-base font-bold text-[#0f172a] mb-5">
        Availability &amp; Deadline
      </h2>

      {/* Two-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
        
        {/* Column 1: Availability */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-700 border border-slate-100">
            <Calendar className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="space-y-1 min-w-0">
            <span className="text-xs font-semibold text-[#0f172a]">
              {availabilityTitle}
            </span>
            <p className="text-sm sm:text-base font-bold text-[#0f172a] leading-tight">
              {availabilityValue}
            </p>
            <p className="text-xs text-[#64748b] leading-relaxed pt-0.5">
              {availabilityDescription}
            </p>
          </div>
        </div>

        {/* Vertical Divider for Desktop View */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#f1f5f9] -translate-x-1/2" />

        {/* Column 2: Deadline */}
        <div className="flex items-start gap-3.5 pt-4 md:pt-0 border-t border-[#f1f5f9] md:border-t-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-700 border border-slate-100">
            <Calendar className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="space-y-1 min-w-0">
            <span className="text-xs font-semibold text-[#0f172a]">
              {deadlineTitle}
            </span>
            <p className="text-sm sm:text-base font-bold text-[#0f172a] leading-tight">
              {deadlineValue}
            </p>
            <p className="text-xs text-[#64748b] leading-relaxed pt-0.5">
              {deadlineDescription}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}