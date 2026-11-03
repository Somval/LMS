import React, { useState } from 'react';
import { FileText, Eye, Download, X, BookOpen, CalendarCheck, ClipboardCheck, Trophy } from 'lucide-react';
import {
  formatDate,
  monthTitle,
  periodText,
  printReport,
  reportDate,
  summaryText,
} from './reportData';

const Tile = ({ icon: Icon, value, label, color }) => (
  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-left">
    <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
      <Icon className="h-4 w-4" />
    </div>
    <div className="text-xl font-bold text-slate-900">{value}</div>
    <div className="text-xs text-slate-500">{label}</div>
  </div>
);

// reports: newest first. student: { fullName, learnerId }. generatedAt: when the data was worked out.
export default function ReportsTable({ reports = [], student, generatedAt }) {
  const [selectedReport, setSelectedReport] = useState(null);
  const firstName = student.fullName.split(/\s+/)[0];

  // Download = the browser's print dialog, where "Save as PDF" makes the file.
  const handleDownload = (report, e) => {
    if (e) e.stopPropagation();
    printReport(report, student, generatedAt);
  };

  return (
    <div className="w-full  bg-slate-50 flex items-start justify-center p-4 md:p-6 font-sans text-slate-800">
      {/* Main Container Card - Perfect Full-Page Width Layout */}
      <div className="w-full bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 md:p-8 space-y-6">

        {/* Section Header */}
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Reports
        </h2>

        {/* Table Wrapper */}
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
          <table className="w-full text-left border-collapse min-w-[750px]">

            {/* Table Header */}
            <thead>
              <tr className="bg-[#F1F3F9] text-slate-600 text-xs md:text-sm font-semibold">
                <th className="py-4 px-6 rounded-tl-xl">Report</th>
                <th className="py-4 px-6">Period</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 rounded-tr-xl">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 text-sm">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.month} className="hover:bg-slate-50/60 transition-colors">

                    {/* Report Info & Mini Icon */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-slate-900">
                          {monthTitle(report)} Progress Report
                          {report.isCurrent && (
                            <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-200/70">
                              In progress
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Period */}
                    <td className="py-4 px-6 text-slate-700 font-medium whitespace-nowrap">
                      {periodText(report)}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                      {formatDate(reportDate(report, generatedAt))}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {/* View Report Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedReport(report)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-500" />
                          <span>View Report</span>
                        </button>

                        {/* Download / Export Button */}
                        <button
                          type="button"
                          onClick={(e) => handleDownload(report, e)}
                          title="Download Report (Save as PDF)"
                          aria-label={`Download ${monthTitle(report)} report`}
                          className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-500 text-sm">
                    No reports available.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>

      {/* --- POPUP MODAL FOR VIEWING REPORT --- */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
          onMouseDown={(e) => e.target === e.currentTarget && setSelectedReport(null)}
        >

          <div
            role="dialog"
            aria-modal="true"
            className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
          >

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {monthTitle(selectedReport)} Progress Report
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Period: {periodText(selectedReport)} • {student.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleDownload(selectedReport, e)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-blue-700 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: the report, worked out from the child's own activity */}
            <div className="p-6 overflow-y-auto space-y-5 bg-slate-50/30">
              {selectedReport.isCurrent && (
                <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-800">
                  This month isn't over yet, so these figures are the totals so far.
                </p>
              )}

              <p className="text-sm text-slate-700 leading-relaxed">
                {summaryText(firstName, selectedReport)}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Tile icon={BookOpen} color="bg-blue-50 text-blue-600" value={selectedReport.lessons.completed} label="Lessons completed" />
                <Tile
                  icon={CalendarCheck}
                  color="bg-emerald-50 text-emerald-600"
                  value={selectedReport.attendance.rate == null ? '—' : `${selectedReport.attendance.rate}%`}
                  label={`Attendance (${selectedReport.attendance.held} class${selectedReport.attendance.held === 1 ? '' : 'es'})`}
                />
                <Tile
                  icon={ClipboardCheck}
                  color="bg-purple-50 text-purple-600"
                  value={selectedReport.work.submitted}
                  label={selectedReport.work.averageScore != null ? `Work handed in · avg ${selectedReport.work.averageScore}%` : 'Work handed in'}
                />
                <Tile icon={Trophy} color="bg-amber-50 text-amber-600" value={selectedReport.achievements.length} label="Achievements" />
              </div>

              {selectedReport.lessons.bySubject.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Lessons by subject</h4>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {selectedReport.lessons.bySubject.map((item) => (
                      <li key={item.subject} className="flex items-center justify-between rounded-lg bg-white border border-slate-200/70 px-3 py-2">
                        <span>{item.subject}</span>
                        <span className="font-semibold">{item.completed}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedReport.work.items.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Work handed in</h4>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {selectedReport.work.items.map((item, index) => (
                      <li key={`${item.title}-${index}`} className="flex items-center justify-between gap-3 rounded-lg bg-white border border-slate-200/70 px-3 py-2">
                        <span className="min-w-0 truncate">
                          {item.title}
                          {item.subject && <span className="text-slate-400"> · {item.subject}</span>}
                        </span>
                        <span className={`shrink-0 font-semibold ${item.percent == null ? 'text-slate-400 text-xs' : ''}`}>
                          {item.percent == null ? 'Awaiting marking' : `${item.percent}%`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedReport.achievements.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Achievements</h4>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {selectedReport.achievements.map((item, index) => (
                      <li key={`${item.title}-${index}`} className="flex items-center justify-between rounded-lg bg-white border border-slate-200/70 px-3 py-2">
                        <span>{item.title} <span className="text-slate-400">· {item.kind === 'REWARD' ? 'Reward' : 'Badge'}</span></span>
                        <span className="text-xs text-slate-500">{formatDate(item.awardedAt)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
