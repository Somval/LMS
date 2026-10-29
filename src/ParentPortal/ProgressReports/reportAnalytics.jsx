import React from 'react';
import { FileText, Calendar, Clock } from 'lucide-react';

export default function ReportsSummary() {
  return (
    <div className="w-full font-sans">
      {/* Main Container Card */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
        
        {/* Column 1: Available Reports */}
        <div className="p-6 md:p-8 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#FDF2F2] flex items-center justify-center text-[#E05252] shrink-0">
            <FileText className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs md:text-sm font-semibold text-slate-500 tracking-wide">
              Available Reports
            </h4>
            <div className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              6
            </div>
            <p className="text-xs text-slate-400 font-medium">
              All time
            </p>
          </div>
        </div>

        {/* Column 2: Latest Report */}
        <div className="p-6 md:p-8 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#FDF2F2] flex items-center justify-center text-[#E05252] shrink-0">
            <Calendar className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs md:text-sm font-semibold text-slate-500 tracking-wide">
              Latest Report
            </h4>
            <div className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              June 2026
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Jun 1–Jun 30, 2026
            </p>
          </div>
        </div>

        {/* Column 3: Latest Report Date */}
        <div className="p-6 md:p-8 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#FDF2F2] flex items-center justify-center text-[#E05252] shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs md:text-sm font-semibold text-slate-500 tracking-wide">
              Latest Report Date
            </h4>
            <div className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Jun 30, 2026
            </div>
            <p className="text-xs text-slate-400 font-medium">
              9:15 AM
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}