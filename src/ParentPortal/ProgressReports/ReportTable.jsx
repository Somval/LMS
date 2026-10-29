import React, { useState } from 'react';
import { FileText, Eye, Download, X } from 'lucide-react';

// Mock data structured cleanly with an image URL field for API integration
const initialReportsData = [
  {
    id: 1,
    title: 'June Progress Report',
    period: 'Jun 1–Jun 30, 2026',
    date: 'Jun 30, 2026',
    fileSize: '2.4 MB',
    summary: 'Comprehensive performance and attendance summary for June 2026.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: 'June Progress Report',
    period: 'Jun 1–Jun 30, 2026',
    date: 'Jun 30, 2026',
    fileSize: '1.8 MB',
    summary: 'Comprehensive performance and attendance summary for June 2026.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'June Progress Report',
    period: 'Jun 1–Jun 30, 2026',
    date: 'Jun 30, 2026',
    fileSize: '3.1 MB',
    summary: 'Comprehensive performance and attendance summary for June 2026.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    title: 'June Progress Report',
    period: 'Jun 1–Jun 30, 2026',
    date: 'Jun 30, 2026',
    fileSize: '2.0 MB',
    summary: 'Comprehensive performance and attendance summary for June 2026.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80'
  },
];

export default function ReportsTable({ reports = initialReportsData }) {
  const [selectedReport, setSelectedReport] = useState(null);

  // Handle Export / Download action for the image
  const handleDownload = (report, e) => {
    if (e) e.stopPropagation();
    
    // Create a temporary anchor to trigger image download
    const link = document.createElement('a');
    link.href = report.imageUrl;
    link.download = `${report.title.replace(/\s+/g, '_')}_${report.date}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              {reports && reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/60 transition-colors">
                    
                    {/* Report Info & Mini Icon */}
                    <td className="py-4 px-6 whitespace-nowrap flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{report.title}</div>
                      </div>
                    </td>

                    {/* Period */}
                    <td className="py-4 px-6 text-slate-700 font-medium whitespace-nowrap">
                      {report.period}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                      {report.date}
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
                          title="Download Report"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          
          <div 
            className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {selectedReport.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Period: {selectedReport.period} • {selectedReport.date}
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

            {/* Modal Body / Image Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-center bg-slate-50/30">
              <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 flex items-center justify-center p-2">
                <img 
                  src={selectedReport.imageUrl} 
                  alt={selectedReport.title} 
                  className="max-h-[500px] w-auto object-contain rounded-xl shadow-xs"
                />
              </div>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                {selectedReport.summary}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}