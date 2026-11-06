import React, { useState } from 'react';
import { api } from '../../lib/api';
import { printAllReports } from '../ProgressReports/printAllReports';
import { FileText, Download } from 'lucide-react';

export default function ProgressReportBanner({ 
  studentId,
  studentName = "your child", 
  subtitle = "Get a detailed PDF report of your child's academic performance, attendance, homework, and achievements.",
  onDownload
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Fetches every monthly report and opens the print dialog (Save as PDF).
  const handleDownload = async () => {
    if (onDownload) return onDownload();
    if (!studentId || busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await api.get(`/dashboard/parent/${studentId}/reports`);
      if (!res.reports?.length) {
        setError('There are no reports to download yet.');
      } else {
        printAllReports(res.reports, res.student, res.generatedAt);
      }
    } catch (err) {
      setError(err.message || 'Could not load the report.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full mx-auto max-w-[1059px] p-2 sm:p-0">
      <div className="w-full relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:px-6 sm:py-4 bg-[#2E6DFF2E] dark:bg-indigo-950/40 border border-indigo-100/60 dark:border-indigo-900/50 rounded-2xl shadow-xs transition-all duration-300 hover:shadow-md min-h-[104px]">
        
        {/* Left Section: Icon & Text */}
        <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
          {/* Document Icon Box */}
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl shadow-xs border border-indigo-100/50 dark:border-indigo-900/40 text-blue-600 dark:text-blue-400">
            <FileText className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
          </div>

          {/* Title and Description */}
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
              Download {studentName}'s Complete Progress Report
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-normal line-clamp-2 sm:line-clamp-none">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Section: Action Button */}
        <div className="w-full sm:w-auto flex-shrink-0 mt-2 sm:mt-0">
          <button
            onClick={handleDownload}
            disabled={busy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer disabled:opacity-60"
          >
            <Download className="w-4 h-4 stroke-[2]" />
            <span>{busy ? 'Preparing…' : 'Download Full Report'}</span>
          </button>
          {error && <p role="alert" className="mt-2 text-xs text-red-600">{error}</p>}
        </div>

      </div>
    </div>
  );
}