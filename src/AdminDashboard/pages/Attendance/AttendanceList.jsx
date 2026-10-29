import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Calendar, MoreVertical, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const INITIAL_ATTENDANCE = [
  {
    id: 1,
    date: "Oct 16, 2026",
    studentName: "John Doe",
    studentId: "STU0012",
    subject: "Mathematics-Year 1",
    classTime: "4:00 PM – 5:00 PM",
    timeJoined: "4:00 PM",
    tutorName: "John Doe",
    tutorId: "TID0012",
    duration: "58 min",
    attendance: "Present",
  },
  {
    id: 2,
    date: "Oct 16, 2026",
    studentName: "John Doe",
    studentId: "STU0012",
    subject: "Mathematics-Year 1",
    classTime: "4:00 PM – 5:00 PM",
    timeJoined: "4:00 PM",
    tutorName: "John Doe",
    tutorId: "TID0012",
    duration: "58 min",
    attendance: "Present",
  },
  {
    id: 3,
    date: "Oct 16, 2026",
    studentName: "John Doe",
    studentId: "STU0012",
    subject: "Mathematics-Year 1",
    classTime: "4:00 PM – 5:00 PM",
    timeJoined: "4:00 PM",
    tutorName: "John Doe",
    tutorId: "TID0012",
    duration: "58 min",
    attendance: "Absent",
  },
  {
    id: 4,
    date: "Oct 16, 2026",
    studentName: "John Doe",
    studentId: "STU0012",
    subject: "Mathematics-Year 1",
    classTime: "4:00 PM – 5:00 PM",
    timeJoined: "4:00 PM",
    tutorName: "John Doe",
    tutorId: "TID0012",
    duration: "58 min",
    attendance: "Present",
  },
  {
    id: 5,
    date: "Oct 16, 2026",
    studentName: "John Doe",
    studentId: "STU0012",
    subject: "Mathematics-Year 1",
    classTime: "4:00 PM – 5:00 PM",
    timeJoined: "4:00 PM",
    tutorName: "John Doe",
    tutorId: "TID0012",
    duration: "58 min",
    attendance: "Absent",
  },
  {
    id: 6,
    date: "Oct 16, 2026",
    studentName: "John Doe",
    studentId: "STU0012",
    subject: "Mathematics-Year 1",
    classTime: "4:00 PM – 5:00 PM",
    timeJoined: "4:00 PM",
    tutorName: "John Doe",
    tutorId: "TID0012",
    duration: "58 min",
    attendance: "Present",
  },
];

export default function AttendanceTableComponent({
  data = INITIAL_ATTENDANCE,
  onViewStudentProfile,
  onViewAttendanceDetails,
}) {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [dateRange, setDateRange] = useState("Oct 12, 2026 – Oct 18, 2026");
  const [activeMenuId, setActiveMenuId] = useState(null);

  const menuRef = useRef(null);

  // Close context dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleViewProfile = (row) => {
    if (onViewStudentProfile) {
      onViewStudentProfile(row);
    } else {
      navigate(`/admin/students/${row.studentId}`);
    }
  };

  // Attendance badge color variant
  const getAttendanceBadge = (status) => {
    switch (status) {
      case "Present":
        return "bg-[#e6f9ed] text-[#16a34a]";
      case "Absent":
        return "bg-[#fef3c7] text-[#d97706]";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // Filter logic
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tutorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      selectedSubject === "All Subjects" || item.subject === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="w-full bg-[#f4f7fb] p-4 sm:p-6 lg:p-8 font-sans antialiased text-[#1e293b]">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none select-none" />
            <input
              type="text"
              placeholder="Search by student name.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 shadow-2xs select-text cursor-text"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Subject Filter Dropdown */}
            <div className="relative min-w-[150px]">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-xs sm:text-sm font-medium text-slate-700 outline-none transition focus:border-[#3b82f6] cursor-pointer shadow-2xs select-text"
              >
                <option value="All Subjects">All Subjects</option>
                <option value="Mathematics-Year 1">Mathematics-Year 1</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Selectable Date Range Input Field */}
            <div className="relative min-w-[240px]">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none select-none" />
              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder="Select date range..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-9 py-2.5 text-xs sm:text-sm font-medium text-slate-700 outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 shadow-2xs select-text cursor-text"
              />
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Data Table Container */}
        <div className="w-full rounded-2xl bg-white shadow-xs border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              {/* Table Header */}
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-500 tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Date</th>
                  <th className="py-3.5 px-4 sm:px-6">Student</th>
                  <th className="py-3.5 px-4 sm:px-6">Subject</th>
                  <th className="py-3.5 px-4 sm:px-6">Class Time</th>
                  <th className="py-3.5 px-4 sm:px-6">Time Joined</th>
                  <th className="py-3.5 px-4 sm:px-6">Tutor</th>
                  <th className="py-3.5 px-4 sm:px-6">Duration</th>
                  <th className="py-3.5 px-4 sm:px-6">Attendance</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right"></th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {filteredData.length > 0 ? (
                  filteredData.map((row) => {
                    const isMenuOpen = activeMenuId === row.id;

                    return (
                      <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Date */}
                        <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">
                          {row.date}
                        </td>

                        {/* Student Avatar + Name & ID */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-[#cbd5e1] shrink-0" />
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-slate-900 truncate">
                                {row.studentName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {row.studentId}
                              </span>
                            </div>
                          </div>
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

                        {/* Actions Ellipsis Button & Context Popup Menu */}
                        <td className="py-4 px-4 sm:px-6 text-right relative">
                          <div
                            className="inline-block relative"
                            ref={isMenuOpen ? menuRef : null}
                          >
                            <button
                              type="button"
                              onClick={(e) => toggleMenu(row.id, e)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
                              aria-label="More actions"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>

                            {/* Popup Action Menu */}
                            {isMenuOpen && (
                              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-40 text-left animate-in fade-in zoom-in-95 duration-100">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleViewProfile(row);
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                  <Eye className="h-3.5 w-3.5 text-slate-400" />
                                  <span>View Student Profile</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onViewAttendanceDetails)
                                      onViewAttendanceDetails(row);
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                  <Eye className="h-3.5 w-3.5 text-slate-400" />
                                  <span>View Attendance Details</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="py-12 text-center text-slate-400 text-xs sm:text-sm"
                    >
                      No attendance records found matching your filters.
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