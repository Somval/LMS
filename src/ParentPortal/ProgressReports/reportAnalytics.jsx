import React from 'react';
import { FileText, Calendar, Clock } from 'lucide-react';
import { formatDate, formatTime, monthTitle, periodText } from './reportData';

// reports: newest first, from GET /dashboard/parent/:studentId/reports.
export default function ReportsSummary({ reports = [], generatedAt }) {
  const latest = reports[0];

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
              {reports.length}
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
          <div className="space-y-1 min-w-0">
            <h4 className="text-xs md:text-sm font-semibold text-slate-500 tracking-wide">
              Latest Report
            </h4>
            <div className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {latest ? monthTitle(latest) : '—'}
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {latest ? periodText(latest) : 'No reports yet'}
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
              {generatedAt ? formatDate(generatedAt) : '—'}
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {generatedAt ? `Updated ${formatTime(generatedAt)}` : ''}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
