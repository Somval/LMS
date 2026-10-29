import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const INITIAL_DATA = [
  {
    id: 1,
    title: "Algebra Practice",
    type: "Assignment",
    subject: "Mathematics-Year 1",
    tutorName: "Jane Doe",
    tutorId: "TUT0012",
    lesson: "Introduction to Algebra",
    submissions: "18/20",
    availableAfter: "Topic 3",
  },
  {
    id: 2,
    title: "Algebra Practice",
    type: "Assignment",
    subject: "Mathematics-Year 1",
    tutorName: "Jane Doe",
    tutorId: "TUT0012",
    lesson: "Introduction to Algebra",
    submissions: "18/20",
    availableAfter: "Topic 3",
  },
  {
    id: 3,
    title: "Algebra Practice",
    type: "Assignment",
    subject: "Mathematics-Year 1",
    tutorName: "Jane Doe",
    tutorId: "TUT0012",
    lesson: "Introduction to Algebra",
    submissions: "18/20",
    availableAfter: "Topic 3",
  },
  {
    id: 4,
    title: "Algebra Practice",
    type: "Assignment",
    subject: "Mathematics-Year 1",
    tutorName: "Jane Doe",
    tutorId: "TUT0012",
    lesson: "Introduction to Algebra",
    submissions: "18/20",
    availableAfter: "Topic 3",
  },
  {
    id: 5,
    title: "Algebra Practice",
    type: "Assignment",
    subject: "Mathematics-Year 1",
    tutorName: "Jane Doe",
    tutorId: "TUT0012",
    lesson: "Introduction to Algebra",
    submissions: "18/20",
    availableAfter: "Topic 3",
  },
];

export default function AssignmentsTableComponent({
  data = INITIAL_DATA,
  onViewItem,
}) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedTutor, setSelectedTutor] = useState("All Tutors");

  const handleViewClick = (row) => {
    if (onViewItem) {
      onViewItem(row);
    } else {
      // Navigate to separate view page with the specific item ID
      navigate(`/admin/assignments/${row.id}`);
    }
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lesson.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "assignments" && item.type.toLowerCase() === "assignment") ||
      (activeTab === "quizzes" && item.type.toLowerCase() === "quiz");

    const matchesSubject =
      selectedSubject === "All Subjects" || item.subject === selectedSubject;
    const matchesTutor =
      selectedTutor === "All Tutors" || item.tutorName === selectedTutor;

    return matchesSearch && matchesTab && matchesSubject && matchesTutor;
  });

  return (
    <div className="w-full bg-[#f4f7fb] p-4 sm:p-6 lg:p-8 font-sans antialiased text-[#1e293b]">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        
        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 flex items-center gap-8 text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === "all" ? "text-[#0f172a]" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            All (146)
            {activeTab === "all" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("assignments")}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === "assignments" ? "text-[#0f172a]" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Assignments (28)
            {activeTab === "assignments" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("quizzes")}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === "quizzes" ? "text-[#0f172a]" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Quizzes (28)
            {activeTab === "quizzes" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" />
            )}
          </button>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, subject, tutor or lesson..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 shadow-2xs"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Subject Filter */}
            <div className="relative min-w-[160px]">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-slate-700 outline-none transition focus:border-[#3b82f6] cursor-pointer shadow-2xs"
              >
                <option value="All Subjects">All Subjects</option>
                <option value="Mathematics-Year 1">Mathematics-Year 1</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Tutor Filter */}
            <div className="relative min-w-[150px]">
              <select
                value={selectedTutor}
                onChange={(e) => setSelectedTutor(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-slate-700 outline-none transition focus:border-[#3b82f6] cursor-pointer shadow-2xs"
              >
                <option value="All Tutors">All Tutors</option>
                <option value="Jane Doe">Jane Doe</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Data Table Card */}
        <div className="w-full rounded-2xl bg-white shadow-xs border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Title</th>
                  <th className="py-3.5 px-4 sm:px-6">Type</th>
                  <th className="py-3.5 px-4 sm:px-6">Subject</th>
                  <th className="py-3.5 px-4 sm:px-6">Tutor</th>
                  <th className="py-3.5 px-4 sm:px-6">Lesson</th>
                  <th className="py-3.5 px-4 sm:px-6">Submissions</th>
                  <th className="py-3.5 px-4 sm:px-6">Available After Unlocking</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900">
                        {row.title}
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 border border-blue-100">
                          {row.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">
                        {row.subject}
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">{row.tutorName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{row.tutorId}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">
                        {row.lesson}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600 font-medium">
                        {row.submissions}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-600">
                        {row.availableAfter}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          type="button"
                          onClick={() => handleViewClick(row)}
                          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-slate-400 text-xs sm:text-sm">
                      No records found matching your filters.
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