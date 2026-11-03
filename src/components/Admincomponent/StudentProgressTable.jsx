
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  CalendarDays,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  UserRound,
} from "lucide-react";

const students = Array.from({ length: 127 }, (_, i) => ({
  id: i + 1,
  name: "John Doessssssssssss",
  studentId: `STU${String(i + 1).padStart(4, "0")}`,
  subjects: 5,
  average: 85,
  attendance: 50,
  progress: 45,
  status: [
    "Excellent",
    "On Track",
    "Poor",
    "Excellent",
    "Excellent",
    "Excellent",
  ][i % 6],
}));

const statusStyles = {
  Excellent: "bg-[#DDFBE5] text-[#16803D]",
  "On Track": "bg-[#FFF0D9] text-[#986515]",
  Poor: "bg-[#FFE4E5] text-[#D92735]",
};

function ProgressBar({ value, color, mobile = false }) {
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0));

  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-[#ECEAEC] ${
        mobile ? "h-[5px] max-w-[100px]" : "h-[7px] max-w-[72px]"
      }`}
      role="progressbar"
      aria-label="Progress"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}

export default function StudentProgressTable() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState(null);

  const pageSize = 8;

  const filteredStudents = useMemo(() => {
    const query = search.toLowerCase().trim();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(query) ||
        student.studentId.toLowerCase().includes(query);

      const matchesStatus =
        status === "All Status" || student.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const displayedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setPage((previousPage) =>
      Math.min(Math.max(1, previousPage), totalPages)
    );
  }, [totalPages]);

  // Close the menu when the user clicks outside or presses Escape.
  useEffect(() => {
    if (activeMenu === null) return;

    const handleOutsideClick = (event) => {
      if (
        event.target instanceof Element &&
        !event.target.closest("[data-student-actions]")
      ) {
        setActiveMenu(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeMenu]);

  // Navigate to the registered student details route.
  const openStudentDetails = (student) => {
    setActiveMenu(null);
    navigate(`/admin/students/${student.id}/details`);
  };

  const openProgressReport = (student) => {
    setActiveMenu(null);
    navigate(`/admin/students/${student.id}/progress-report`);
  };

  const downloadReport = (student) => {
    const rows = [
      [
        "Student",
        "Student ID",
        "Subjects",
        "Average Score",
        "Attendance",
        "Overall Progress",
        "Status",
      ],
      [
        student.name,
        student.studentId,
        student.subjects,
        `${student.average}%`,
        `${student.attendance}%`,
        `${student.progress}%`,
        student.status,
      ],
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${student.studentId}-progress-report.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setActiveMenu(null);
  };

  const renderStatus = (studentStatus) => (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium leading-none sm:text-[11px] ${
        statusStyles[studentStatus] || "bg-gray-100 text-gray-600"
      }`}
    >
      {studentStatus}
    </span>
  );

  const renderStudent = (student) => (
    <div className="flex min-w-0 items-center gap-2">
      <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#D9D9D9]" />

      <div className="min-w-0">
        <p className="truncate text-[12px] font-medium leading-4 text-[#252B35]">
          {student.name}
        </p>

        <p className="text-[9px] leading-3 text-[#929AA8]">
          {student.studentId}
        </p>
      </div>
    </div>
  );

  const renderMetric = (label, value, color, mobile = false) => (
    <div className="space-y-1.5">
      <span className="text-[11px] font-medium leading-4 text-[#454C59]">
        {value}%
      </span>

      <ProgressBar value={value} color={color} mobile={mobile} />

      <span className="sr-only">{label}</span>
    </div>
  );

  const renderActions = (student) => (
    <div
      className="relative"
      data-student-actions
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label={`Actions for ${student.name}, ${student.studentId}`}
        aria-expanded={activeMenu === student.id}
        aria-haspopup="menu"
        onClick={() => {
          setActiveMenu((previous) =>
            previous === student.id ? null : student.id
          );
        }}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#E1E5EC] bg-white text-[#647084] transition-colors hover:bg-[#F4F6FA] focus:outline-none focus:ring-2 focus:ring-[#DCE7FF]"
      >
        <MoreVertical size={16} />
      </button>

      {activeMenu === student.id && (
        <div
          role="menu"
          className="absolute right-0 top-9 z-50 w-[205px] rounded-lg border border-[#E5E7EB] bg-white p-1.5 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => openStudentDetails(student)}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2.5 text-left text-xs text-[#596273] transition-colors hover:bg-[#F5F7FB]"
          >
            <UserRound size={15} className="shrink-0" />
            <span>View User Details</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => openProgressReport(student)}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2.5 text-left text-xs text-[#596273] transition-colors hover:bg-[#F5F7FB]"
          >
            <Eye size={15} className="shrink-0" />
            <span>View Progress Report</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => downloadReport(student)}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2.5 text-left text-xs text-[#596273] transition-colors hover:bg-[#F5F7FB]"
          >
            <Download size={15} className="shrink-0" />
            <span>Download Progress Report</span>
          </button>
        </div>
      )}
    </div>
  );

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const renderPagination = (mobile = false) => (
    <div
      className={`flex flex-wrap items-center justify-between gap-2 ${
        mobile
          ? "py-3"
          : "min-h-12 border-t border-[#F0F2F6] px-4 py-2.5"
      }`}
    >
      <p className="text-[11px] text-[#454C59]">
        Showing{" "}
        {filteredStudents.length > 0
          ? (currentPage - 1) * pageSize + 1
          : 0}
        –{Math.min(currentPage * pageSize, filteredStudents.length)} of{" "}
        {filteredStudents.length} students
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() =>
            setPage((previous) => Math.max(1, previous - 1))
          }
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#687386] transition-colors hover:bg-[#F0F3F9] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={15} />
        </button>

        {getPageNumbers().map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-[11px] text-[#687386]"
            >
              …
            </span>
          ) : (
            <button
              type="button"
              key={pageNumber}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
              onClick={() => setPage(pageNumber)}
              className={`h-7 min-w-7 rounded-md px-1.5 text-[11px] transition-colors ${
                currentPage === pageNumber
                  ? "bg-[#DCE7FF] font-medium text-[#3973ED]"
                  : "text-[#687386] hover:bg-[#F0F3F9]"
              }`}
            >
              {pageNumber}
            </button>
          )
        )}

        <button
          type="button"
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() =>
            setPage((previous) => Math.min(totalPages, previous + 1))
          }
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#687386] transition-colors hover:bg-[#F0F3F9] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen w-full bg-[#F4F7FD] p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Search and filters */}
        <div className="mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex h-10 w-full items-center gap-2 rounded-md border border-[#DCE1E9] bg-white px-3 sm:max-w-[320px]">
            <Search size={16} className="shrink-0 text-[#8993A3]" />

            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
                setActiveMenu(null);
              }}
              placeholder="Search by student or id..."
              aria-label="Search students by name or ID"
              className="w-full min-w-0 bg-transparent text-[12px] text-[#252B35] outline-none placeholder:text-[#A0A7B3]"
            />
          </label>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <select
              value={status}
              aria-label="Filter students by status"
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
                setActiveMenu(null);
              }}
              className="h-10 min-w-0 rounded-md border border-[#DCE1E9] bg-white px-2.5 text-[12px] text-[#343B47] outline-none focus:border-[#B8C9F5] sm:w-[145px]"
            >
              <option>All Status</option>
              <option>Excellent</option>
              <option>On Track</option>
              <option>Poor</option>
            </select>

            <div className="flex h-10 min-w-0 items-center gap-2 rounded-md border border-[#DCE1E9] bg-white px-2.5 text-[11px] text-[#343B47] sm:text-[12px]">
              <CalendarDays size={15} className="shrink-0 text-[#687386]" />
              <span className="truncate">
                Oct 1, 2026 – Oct 31, 2026
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-visible rounded-lg border border-[#E5E9F1] bg-white md:block">
          <table className="w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[15%]" />
              <col className="w-[15%]" />
              <col className="w-[14%]" />
              <col className="w-[15%]" />
              <col className="w-[16%]" />
              <col className="w-[13%]" />
              <col className="w-[12%]" />
            </colgroup>

            <thead className="bg-[#F7F9FD]">
              <tr className="h-11 text-[12px] font-medium text-[#687386] lg:text-[13px]">
                {[
                  "Student",
                  "Subjects Enrolled",
                  "Average Score",
                  "Attendance Rate",
                  "Overall Progress",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-3 font-medium"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {displayedStudents.map((student) => (
                <tr
                  key={student.id}
                  className="h-[54px] border-t border-[#F0F2F6] hover:bg-[#FCFCFE]"
                >
                  <td className="px-3">{renderStudent(student)}</td>
                  <td className="px-3 text-[12px] text-[#343B47] lg:text-[13px]">
                    {student.subjects} subjects
                  </td>
                  <td className="px-3">
                    {renderMetric("Average Score", student.average, "bg-[#20D916]")}
                  </td>
                  <td className="px-3">
                    {renderMetric("Attendance Rate", student.attendance, "bg-[#E8A000]")}
                  </td>
                  <td className="px-3">
                    {renderMetric("Overall Progress", student.progress, "bg-[#F20D20]")}
                  </td>
                  <td className="px-3">{renderStatus(student.status)}</td>
                  <td className="px-3">{renderActions(student)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {displayedStudents.length === 0 && (
            <p className="p-8 text-center text-sm text-[#778196]">
              No students found. Try changing your search or filter.
            </p>
          )}

          {renderPagination()}
        </div>

        {/* Mobile Student Cards */}
        <div className="space-y-2.5 md:hidden">
          {displayedStudents.map((student) => (
            <article
              key={student.id}
              className="rounded-lg border border-[#E5E9F1] bg-white p-3.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  {renderStudent(student)}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {renderStatus(student.status)}
                  {renderActions(student)}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#F0F2F6] pt-3">
                <div>
                  <p className="mb-1.5 text-[11px] text-[#687386]">
                    Subjects Enrolled
                  </p>
                  <p className="text-[12px] font-medium text-[#343B47]">
                    {student.subjects} subjects
                  </p>
                </div>

                <div>
                  <p className="mb-1.5 text-[11px] text-[#687386]">
                    Average Score
                  </p>
                  {renderMetric("Average Score", student.average, "bg-[#20D916]", true)}
                </div>

                <div>
                  <p className="mb-1.5 text-[11px] text-[#687386]">
                    Attendance Rate
                  </p>
                  {renderMetric("Attendance Rate", student.attendance, "bg-[#E8A000]", true)}
                </div>

                <div>
                  <p className="mb-1.5 text-[11px] text-[#687386]">
                    Overall Progress
                  </p>
                  {renderMetric("Overall Progress", student.progress, "bg-[#F20D20]", true)}
                </div>
              </div>
            </article>
          ))}

          {displayedStudents.length === 0 && (
            <div className="rounded-lg border border-[#E5E9F1] bg-white p-8 text-center text-sm text-[#778196]">
              No students found. Try changing your search or filter.
            </div>
          )}

          {renderPagination(true)}
        </div>
      </div>
    </section>
  );
}
