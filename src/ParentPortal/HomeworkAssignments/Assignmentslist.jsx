import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { api } from '../../lib/api';
import AssignmentDetail from './AssignmentDetail';
import {
  TABS,
  formatDate,
  formatWeekday,
  shortDescription,
  sortWork,
  statusBadge,
  tabMatches,
} from './homeworkData';

// child: the selected child. The list is that child's published coursework.
export default function Assignments({ child, onViewChange }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedId, setSelectedId] = useState(null);

  const [rows, setRows] = useState(null); // null while loading
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setRows(null);
    setError('');

    api
      .get('/coursework', { studentId: child.id })
      .then((list) => !cancelled && setRows(sortWork(list)))
      .catch((err) => !cancelled && setError(err.message || 'Could not load assignments.'));

    return () => {
      cancelled = true;
    };
  }, [child.id, reload]);

  // Helper function to select an assignment and notify parent
  const handleSelectAssignment = (assignment) => {
    setSelectedId(assignment.id);
    if (onViewChange) onViewChange(true); // Notify parent that detail view is active
  };

  // Helper function to go back and notify parent
  const handleBack = () => {
    setSelectedId(null);
    if (onViewChange) onViewChange(false); // Notify parent that detail view is closed
  };

  const filteredAssignments = useMemo(
    () => (rows ?? []).filter((item) => tabMatches(activeTab, item.status)),
    [rows, activeTab]
  );

  // Render Detail View
  if (selectedId) {
    return <AssignmentDetail assignmentId={selectedId} child={child} onBack={handleBack} />;
  }

  // --- LIST VIEW ---
  return (
    <div className="w-full font-sans text-slate-800 space-y-6">

      {/* Filter Tabs Header */}
      <div className="flex flex-wrap items-center gap-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-2xs ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 md:p-8 space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Assignments
        </h2>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setReload((n) => n + 1)}
              className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100"
            >
              Try again
            </button>
          </div>
        )}

        {!error && rows === null && (
          <div className="flex items-center justify-center p-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        )}

        {/* Table Container */}
        {rows !== null && (
          <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-[#F1F3F9] text-slate-600 text-xs md:text-sm font-semibold">
                  <th className="py-4 px-6 rounded-tl-xl">Assignment</th>
                  <th className="py-4 px-6">Subject</th>
                  <th className="py-4 px-6">Due Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 rounded-tr-xl">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((row) => {
                    const badge = statusBadge(row);
                    return (
                      <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="font-bold text-slate-900">{row.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{shortDescription(row)}</div>
                        </td>

                        <td className="py-4 px-6 text-slate-800 font-medium whitespace-nowrap">
                          {row.subject?.name ?? '—'}
                        </td>

                        <td className="py-4 px-6 text-slate-700 whitespace-nowrap">
                          {row.dueAt ? (
                            <div className="leading-tight">
                              {formatDate(row.dueAt)}
                              <br />
                              <span className="text-slate-500 font-medium">{formatWeekday(row.dueAt)}</span>
                            </div>
                          ) : (
                            <span className="text-slate-400">No due date</span>
                          )}
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${badge.className}`}>
                            {badge.label}
                          </span>
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleSelectAssignment(row)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
                          >
                            <span>View</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500 text-sm">
                      {rows.length === 0
                        ? `No assignments have been set for ${child.fullName} yet.`
                        : 'No assignments found for this filter.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
