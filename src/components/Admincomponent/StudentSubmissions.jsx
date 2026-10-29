import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const SUBMISSIONS_DATA = [
  {
    id: 1,
    studentName: "Daniel Smith",
    studentId: "PID1010111",
    avatarUrl: null, // Grey placeholder fallback
    submittedOn: "Oct 11, 2026, 09:14 AM",
    timing: "On time",
    status: "Submitted",
    score: "—",
  },
  {
    id: 2,
    studentName: "Daniel Smith",
    studentId: "PID1010111",
    avatarUrl: null,
    submittedOn: "Oct 11, 2026, 09:14 AM",
    timing: "Late",
    status: "Graded",
    score: "13/15",
  },
  {
    id: 3,
    studentName: "Daniel Smith",
    studentId: "PID1010111",
    avatarUrl: null,
    submittedOn: "—",
    timing: "Not Submitted",
    status: "Not Submitted",
    score: "—",
  },
];

export default function StudentSubmissionsCard({
  data = SUBMISSIONS_DATA,
  onViewSubmission,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Status");

  // Helper for timing badge styling
  const getTimingBadge = (timing) => {
    switch (timing) {
      case "On time":
        return "bg-[#e8f8ec] text-[#22c55e]";
      case "Late":
        return "bg-[#fde8e8] text-[#f43f5e]";
      case "Not Submitted":
      default:
        return "bg-[#f1f5f9] text-[#64748b]";
    }
  };

  // Helper for status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "Submitted":
      case "Graded":
        return "bg-[#e8f8ec] text-[#22c55e]";
      case "Not Submitted":
      default:
        return "bg-[#f1f5f9] text-[#64748b]";
    }
  };

  // Filtered submissions logic
  const filteredSubmissions = data.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "Status" ||
      selectedStatus === "All" ||
      item.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full rounded-2xl bg-white p-5 sm:p-6 shadow-xs border border-[#e2e8f0] font-sans antialiased text-[#1e293b]">
      {/* Section Title */}
      <h2 className="text-base sm:text-lg font-bold text-[#0f172a] mb-5">
        Student Submissions
      </h2>

      {/* Search & Filter Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        {/* Search Input Box */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search students or id.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#cbd5e1] bg-white pl-10 pr-4 py-2 text-xs sm:text-sm text-[#0f172a] outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 placeholder:text-[#94a3b8]"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative min-w-[140px]">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#cbd5e1] bg-white px-4 py-2 pr-9 text-xs sm:text-sm font-medium text-[#334155] outline-none transition focus:border-[#3b82f6] cursor-pointer"
          >
            <option value="Status">Status</option>
            <option value="All">All</option>
            <option value="Submitted">Submitted</option>
            <option value="Graded">Graded</option>
            <option value="Not Submitted">Not Submitted</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b] pointer-events-none" />
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Header Row with light blue-grey background tint */}
          <thead>
            <tr className="bg-[#f1f5f9]/70 text-xs font-semibold text-[#64748b]">
              <th className="py-3 px-4 rounded-l-xl">Student Name</th>
              <th className="py-3 px-4">Submitted On</th>
              <th className="py-3 px-4">Submission Timing</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#f1f5f9] text-xs sm:text-sm text-[#1e293b]">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Student Avatar + Name & ID */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {row.avatarUrl ? (
                        <img
                          src={row.avatarUrl}
                          alt={row.studentName}
                          className="h-10 w-10 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-[#cbd5e1] shrink-0" />
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-[#0f172a] truncate">
                          {row.studentName}
                        </span>
                        <span className="text-[11px] text-[#94a3b8] font-mono">
                          {row.studentId}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Submitted On Date */}
                  <td className="py-4 px-4 text-[#64748b] whitespace-nowrap">
                    {row.submittedOn}
                  </td>

                  {/* Timing Badge */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium ${getTimingBadge(
                        row.timing
                      )}`}
                    >
                      {row.timing}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium ${getStatusBadge(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="py-4 px-4 font-semibold text-[#334155]">
                    {row.score}
                  </td>

                  {/* View Submission Action Button */}
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        onViewSubmission ? onViewSubmission(row) : null
                      }
                      className="inline-flex items-center justify-center rounded-xl border border-[#4f46e5]/40 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#4f46e5] shadow-2xs hover:bg-[#eef2ff] transition-colors cursor-pointer"
                    >
                      View Submission
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-12 text-center text-[#94a3b8] text-xs sm:text-sm"
                >
                  No student submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}