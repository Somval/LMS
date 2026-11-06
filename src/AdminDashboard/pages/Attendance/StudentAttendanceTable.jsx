import React, { useMemo, useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";

export default function StudentAttendanceTable({
  data = [],
}) {
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const subjectOptions = useMemo(() => [...new Set(data.map((d) => d.subject))].sort(), [data]);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // Status badge styling helper
  const getAttendanceBadge = (status) => {
    switch (status) {
      case "Present":
        return "bg-[#e6f9ed] text-[#16a34a]";
      case "Absent":
        return "bg-[#fef3c7] text-[#d97706]";
      case "Late":
        return "bg-[#ffedd5] text-[#ea580c]";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // Filter records based on selected dropdown values
  const filteredData = data.filter((item) => {
    const matchesSubject =
      selectedSubject === "All Subjects" || item.subject === selectedSubject;
    const matchesStatus =
      selectedStatus === "All Statuses" ||
      item.attendance.toLowerCase() === selectedStatus.toLowerCase();

    const matchesDate = (!fromDate || item.dateISO >= fromDate) && (!toDate || item.dateISO <= toDate);
    return matchesSubject && matchesStatus && matchesDate;
  });

  return (
    <div className="w-full bg-[#f4f7fb] p-4 sm:p-6 lg:p-8 font-sans antialiased text-[#1e293b]">
      <div className="w-full max-w-7xl mx-auto space-y-5">
        
        {/* Top Control Bar: 3 Filter Inputs */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* 1. Subject Filter Dropdown */}
          <div className="relative min-w-[160px]">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-xs sm:text-sm font-medium text-slate-700 outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 shadow-2xs cursor-pointer select-text"
            >
              <option value="All Subjects">All Subjects</option>
              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          {/* 2. Selectable Date Range Input */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              aria-label="From date"
              value={fromDate}
              max={toDate || undefined}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-700 outline-none"
            />
            <span className="text-sm text-slate-400">to</span>
            <input
              type="date"
              aria-label="To date"
              value={toDate}
              min={fromDate || undefined}
              onChange={(e) => setToDate(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-700 outline-none"
            />
          </div>

          {/* 3. Status Filter Dropdown */}
          <div className="relative min-w-[160px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-xs sm:text-sm font-medium text-slate-700 outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 shadow-2xs cursor-pointer select-text"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

        </div>

        {/* Attendance Data Table */}
        <div className="w-full rounded-2xl bg-white shadow-xs border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              
              {/* Header Row */}
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-xs sm:text-sm font-semibold text-slate-500 tracking-wider">
                  <th className="py-4 px-4 sm:px-6">Date</th>
                  <th className="py-4 px-4 sm:px-6">Subject</th>
                  <th className="py-4 px-4 sm:px-6">Class Time</th>
                  <th className="py-4 px-4 sm:px-6">Time Joined</th>
                  <th className="py-4 px-4 sm:px-6">Tutor</th>
                  <th className="py-4 px-4 sm:px-6">Duration</th>
                  <th className="py-4 px-4 sm:px-6">Attendance</th>
                </tr>
              </thead>

              {/* Table Rows */}
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Date */}
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">
                        {row.date}
                      </td>

                      {/* Subject */}
                      <td className="py-4 px-4 sm:px-6 text-slate-600 font-medium">
                        {row.subject}
                      </td>

                      {/* Class Time */}
                      <td className="py-4 px-4 sm:px-6 text-slate-700 font-medium whitespace-nowrap">
                        {row.classTime}
                      </td>

                      {/* Time Joined */}
                      <td className="py-4 px-4 sm:px-6 text-slate-600 font-medium">
                        {row.timeJoined}
                      </td>

                      {/* Tutor Avatar + Name & ID */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-[#cbd5e1] shrink-0" />
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-slate-900 truncate">
                              {row.tutorName}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {row.tutorId}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-4 sm:px-6 text-slate-500 font-medium whitespace-nowrap">
                        {row.duration}
                      </td>

                      {/* Attendance Badge */}
                      <td className="py-4 px-4 sm:px-6">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getAttendanceBadge(
                            row.attendance
                          )}`}
                        >
                          {row.attendance}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-12 text-center text-slate-400 text-xs sm:text-sm"
                    >
                      No attendance history found for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}