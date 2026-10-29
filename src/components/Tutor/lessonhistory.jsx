import React, { useState, useMemo } from 'react';
import { Search, FileText, X, BookOpen, Calendar, CheckCircle2, BarChart2 } from 'lucide-react';

const lessonHistoryData = [
  { id: 1, topic: 'Quadratic Equations', lastOpened: 'May 20, 2025', status: 'Completed', progress: '100%', description: 'Comprehensive study on solving quadratic equations using factoring, completing the square, and the quadratic formula.' },
  { id: 2, topic: 'Quadratic Equations', lastOpened: 'May 20, 2025', status: 'In Progress', progress: '30%', description: 'Interactive graphing exercises and identifying roots and vertex points.' },
  { id: 3, topic: 'Quadratic Equations', lastOpened: 'May 20, 2025', status: 'Not Started', progress: '0%', description: 'Introduction to standard form equations and discriminant analysis.' },
  { id: 4, topic: 'Quadratic Equations', lastOpened: 'May 20, 2025', status: 'Completed', progress: '100%', description: 'Word problems and real-world applications of quadratic functions.' },
  { id: 5, topic: 'Quadratic Equations', lastOpened: 'May 20, 2025', status: 'Completed', progress: '100%', description: 'Advanced problem-solving session and practice quiz.' },
  { id: 6, topic: 'Quadratic Equations', lastOpened: 'May 20, 2025', status: 'Completed', progress: '100%', description: 'Review test preparation and summary of key formulas.' },
];

export default function LessonHistoryTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);

  const filteredData = useMemo(() => {
    return lessonHistoryData.filter(row => 
      row.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.lastOpened.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/50">
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200/50">
            In Progress
          </span>
        );
      case 'Not Started':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200/50">
            Not Started
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-slate-50/50 p-4 md:p-8 font-sans antialiased flex flex-col items-center justify-start relative">
      <div className="w-full max-w-6xl space-y-4">
        
        {/* Search Toolbar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search lessons or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-700 shadow-sm"
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200/70 text-xs md:text-sm font-semibold text-slate-500 tracking-normal">
                  <th className="py-4 px-6 font-medium">Lesson/Topic</th>
                  <th className="py-4 px-6 font-medium">Last Opened</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium">Progress</th>
                  <th className="py-4 px-6 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-xs md:text-sm">
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      
                      {/* Lesson / Topic with Icon */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-500 shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <span className="text-slate-900 font-semibold">
                            {row.topic}
                          </span>
                        </div>
                      </td>

                      {/* Last Opened */}
                      <td className="py-4 px-6 text-slate-600 font-medium whitespace-nowrap">
                        {row.lastOpened}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {renderStatusBadge(row.status)}
                      </td>

                      {/* Progress */}
                      <td className="py-4 px-6 text-slate-900 font-semibold whitespace-nowrap">
                        {row.progress}
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <button 
                          onClick={() => setSelectedLesson(row)}
                          className="px-3.5 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50/60 border border-indigo-100 hover:bg-indigo-100/50 rounded-lg transition-colors shadow-sm cursor-pointer"
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-400">
                      No lesson history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Lesson Details Popup Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden transform transition-all">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Lesson Details
                </h3>
              </div>
              <button 
                onClick={() => setSelectedLesson(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Topic</span>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">{selectedLesson.topic}</h4>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Description</span>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {selectedLesson.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block">Last Opened</span>
                    <span className="text-xs font-semibold text-slate-800">{selectedLesson.lastOpened}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block">Progress</span>
                    <span className="text-xs font-semibold text-slate-800">{selectedLesson.progress}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-medium text-slate-500">Current Status:</span>
                {renderStatusBadge(selectedLesson.status)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedLesson(null)}
                className="px-4 py-2 text-xs md:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}