import React, { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import {
  Search,
  Plus,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
} from "lucide-react";

import AssignStudentModal from "../../components/Admincomponent/AssignStudentModal";

const fmtDay = (d) =>
  new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
const fmtClock = (d) => new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });


const ITEMS_PER_PAGE = 7;

export default function AssignedStudents({ tutor }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET /admin/tutors/:id/students
  const load = useCallback(async () => {
    if (!tutor?.id) return;
    try {
      const rows = await api.get(`/admin/tutors/${tutor.id}/students`);
      setStudents(
        rows.map((r) => ({
          id: r.id,
          userId: r.userId,
          subjectId: r.subjectId,
          name: r.name,
          studentId: r.learnerId,
          subject: r.subject,
          level: r.level || "",
          days: r.nextClass ? fmtDay(r.nextClass.startsAt) : "No class scheduled",
          time: r.nextClass ? `${fmtClock(r.nextClass.startsAt)} – ${fmtClock(r.nextClass.endsAt)}` : "",
          status: r.status,
        }))
      );
      setError("");
    } catch (err) {
      setError(err.message || "Could not load students.");
    } finally {
      setLoading(false);
    }
  }, [tutor?.id]);

  useEffect(() => { load(); }, [load]);

  const levelOptions = [...new Set(students.map((s) => s.level).filter(Boolean))].sort();
  const subjectOptions = [...new Set(students.map((s) => s.subject))].sort();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchTerm = search.trim().toLowerCase();

      const matchesSearch =
        !searchTerm ||
        student.name.toLowerCase().includes(searchTerm) ||
        student.studentId.toLowerCase().includes(searchTerm) ||
        student.subject.toLowerCase().includes(searchTerm);

      const matchesLevel =
        !levelFilter || student.level === levelFilter;

      const matchesStatus =
        !statusFilter || student.status === statusFilter;

      const matchesSubject =
        !subjectFilter || student.subject === subjectFilter;

      return (
        matchesSearch &&
        matchesLevel &&
        matchesStatus &&
        matchesSubject
      );
    });
  }, [
    students,
    search,
    levelFilter,
    statusFilter,
    subjectFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex =
    filteredStudents.length === 0
      ? 0
      : (safeCurrentPage - 1) * ITEMS_PER_PAGE;

  const visibleStudents = filteredStudents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
    setActiveMenu(null);
  };

  // The modal saves the assignment itself; here we just reload the list.
  const handleAssignStudent = () => {
    setShowAssignModal(false);
    setCurrentPage(1);
    load();
  };

  // Unassign: PUT /admin/students/:userId/subjects/:subjectId/tutor { tutorId: null }
  const handleRemoveStudent = async (rowId) => {
    const row = students.find((x) => x.id === rowId);
    setActiveMenu(null);
    if (!row) return;
    try {
      await api.put(`/admin/students/${row.userId}/subjects/${row.subjectId}/tutor`, { tutorId: null });
      load();
    } catch (err) {
      setError(err.message || "Could not remove this student.");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setLevelFilter("");
    setStatusFilter("");
    setSubjectFilter("");
    setCurrentPage(1);
    setActiveMenu(null);
  };

  const openStudentDetails = (student) => {
    setSelectedStudent(student);
    setActiveMenu(null);
  };

  return (
    <section className="min-h-screen w-full min-w-0 overflow-x-hidden bg-[#F5F7FF] p-2.5 sm:p-4 lg:p-6">
      <div className="mx-auto flex min-h-[600px] w-full max-w-[1066px] min-w-0 flex-col rounded-lg border border-[#E9ECF2] bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.025)] sm:p-5 lg:min-h-[850px] lg:p-5">
        {/* Header */}
        <div className="mb-5 flex min-w-0 items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[15px] font-semibold leading-6 text-[#171717] sm:text-[18px]">
              Assigned Students
            </h1>

            <p className="mt-0.5 text-[10px] text-[#9299A5] sm:text-[11px]">
              Manage your assigned students and class schedules.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAssignModal(true)}
            className="inline-flex h-[34px] shrink-0 items-center justify-center gap-1.5 rounded-[5px] bg-[#064B0B] px-2.5 text-[10px] font-medium text-white transition-colors hover:bg-[#053D09] focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 sm:gap-2 sm:px-4 sm:text-[12px]"
          >
            <Plus size={14} strokeWidth={1.8} />
            <span>Assign Student</span>
          </button>
        </div>

        {/* Search and filters */}
        <div className="mb-4 grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:mb-5 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-[10px]">
          <div className="relative min-w-0">
            <Search
              size={14}
              strokeWidth={1.5}
              className="pointer-events-none absolute left-[10px] top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />

            <input
              type="search"
              value={search}
              onChange={handleFilterChange(setSearch)}
              placeholder="Search students..."
              aria-label="Search students"
              className="h-[38px] w-full min-w-0 rounded-[5px] border border-[#E5E7EB] bg-white pl-[30px] pr-3 text-[12px] text-[#252525] outline-none transition placeholder:text-[#A0A0A8] focus:border-[#9CAFFB] focus:ring-2 focus:ring-indigo-50"
            />
          </div>

          <FilterSelect
            label="Level"
            value={levelFilter}
            onChange={handleFilterChange(setLevelFilter)}
            options={levelOptions.map((v) => ({ label: v, value: v }))}
          />

          <FilterSelect
            label="Status"
            value={statusFilter}
            onChange={handleFilterChange(setStatusFilter)}
            options={[
              { label: "Active", value: "Active" },
              { label: "On hold", value: "On hold" },
            ]}
          />

          <FilterSelect
            label="Subjects"
            value={subjectFilter}
            onChange={handleFilterChange(setSubjectFilter)}
            options={subjectOptions.map((v) => ({ label: v, value: v }))}
          />
        </div>

        {/* Desktop and tablet table */}
        <div className="hidden min-w-0 flex-1 md:block">
          <div className="w-full min-w-0">
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[19%]" />
                <col className="w-[14%]" />
                <col className="w-[12%]" />
                <col className="w-[24%]" />
                <col className="w-[13%]" />
                <col className="w-[12%]" />
                <col className="w-[6%]" />
              </colgroup>

              <thead>
                <tr className="h-[34px] bg-[#EEF3F9]">
                  {[
                    "Student",
                    "Subject",
                    "Level",
                    "Class Schedule",
                    "Status",
                    "Action",
                    "",
                  ].map((heading, index) => (
                    <th
                      key={`${heading}-${index}`}
                      className={`px-2 text-[9px] font-medium text-[#35465B] lg:px-3 lg:text-[10px] ${
                        index === 5 ? "text-center" : ""
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visibleStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="h-[55px] border-b border-[#F0F1F4] transition-colors hover:bg-[#FCFCFE]"
                  >
                    {/* Student */}
                    <td className="px-2 py-2 lg:px-3">
                      <StudentIdentity student={student} />
                    </td>

                    {/* Subject */}
                    <td className="px-2 py-2 text-[10px] text-[#333B48] lg:px-3">
                      <span className="block truncate">
                        {student.subject}
                      </span>
                    </td>

                    {/* Level */}
                    <td className="whitespace-nowrap px-2 py-2 text-[10px] text-[#333B48] lg:px-3">
                      {student.level}
                    </td>

                    {/* Schedule */}
                    <td className="px-2 py-2 lg:px-3">
                      <ClassSchedule student={student} />
                    </td>

                    {/* Status */}
                    <td className="px-2 py-2 lg:px-3">
                      <StatusBadge status={student.status} />
                    </td>

                    {/* View */}
                    <td className="px-1 py-2 text-center lg:px-2">
                      <button
                        type="button"
                        onClick={() => openStudentDetails(student)}
                        className="inline-flex h-[24px] min-w-[52px] items-center justify-center rounded-[3px] border border-[#A9B6E8] bg-white px-2 text-[10px] font-medium text-[#4B5FA6] transition-colors hover:border-[#7185D0] hover:bg-[#F5F7FF] focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      >
                        View
                      </button>
                    </td>

                    {/* More actions */}
                    <td className="relative px-1 py-2 text-center">
                      <ActionMenu
                        student={student}
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                        onView={openStudentDetails}
                        onRemove={handleRemoveStudent}
                      />
                    </td>
                  </tr>
                ))}

                {visibleStudents.length === 0 && (
                  <EmptyState
                    colSpan={7}
                    onClear={clearFilters}
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile responsive student cards */}
        <div className="flex min-w-0 flex-1 flex-col gap-3 md:hidden">
          {visibleStudents.map((student) => (
            <article
              key={student.id}
              className="relative min-w-0 rounded-lg border border-[#E7EAF0] bg-white p-3 transition-shadow hover:shadow-sm"
            >
              {/* Student heading and actions */}
              <div className="flex min-w-0 items-start justify-between gap-2">
                <StudentIdentity student={student} />

                <div className="relative shrink-0">
                  <ActionMenu
                    student={student}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    onView={openStudentDetails}
                    onRemove={handleRemoveStudent}
                  />
                </div>
              </div>

              {/* Student information */}
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-[#F0F1F4] pt-3">
                <MobileInfo label="Subject">
                  <span className="break-words text-[11px] font-medium text-[#333B48]">
                    {student.subject}
                  </span>
                </MobileInfo>

                <MobileInfo label="Level">
                  <span className="text-[11px] font-medium text-[#333B48]">
                    {student.level}
                  </span>
                </MobileInfo>

                <MobileInfo label="Class schedule">
                  <ClassSchedule student={student} />
                </MobileInfo>

                <MobileInfo label="Status">
                  <StatusBadge status={student.status} />
                </MobileInfo>
              </div>

              {/* Mobile view action */}
              <div className="mt-3 border-t border-[#F0F1F4] pt-3">
                <button
                  type="button"
                  onClick={() => openStudentDetails(student)}
                  className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-[#A9B6E8] bg-white text-[11px] font-medium text-[#4B5FA6] transition-colors hover:bg-[#F5F7FF] focus:outline-none focus:ring-2 focus:ring-indigo-100"
                >
                  <Eye size={14} />
                  View student details
                </button>
              </div>
            </article>
          ))}

          {visibleStudents.length === 0 && (
            <div className="rounded-lg border border-[#E7EAF0] bg-white px-4 py-10 text-center">
              <Search
                size={22}
                className="mx-auto mb-3 text-[#B3BAC5]"
              />

              <p className="text-[12px] font-medium text-[#475569]">
                {loading ? "Loading students…" : error ? "Something went wrong" : students.length === 0 ? "No students assigned yet" : "No students found"}
              </p>

              <p className="mt-1 text-[11px] text-[#9299A5]">
                {loading ? "" : error ? error : students.length === 0 ? "Use Assign Student to add one." : "Try changing your search or filters."}
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-3 text-[11px] font-medium text-indigo-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Footer and pagination */}
        <div className="mt-5 flex min-w-0 flex-col gap-3 border-t border-[#F0F1F4] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] leading-4 text-[#353B45]">
            Showing{" "}
            {filteredStudents.length === 0 ? 0 : startIndex + 1}–
            {Math.min(
              startIndex + ITEMS_PER_PAGE,
              filteredStudents.length
            )}{" "}
            of {filteredStudents.length} students
          </p>

          <div className="flex flex-wrap items-center justify-end gap-[5px]">
            <PaginationButton
              label="Previous page"
              disabled={safeCurrentPage === 1}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
            >
              <ChevronLeft size={13} />
            </PaginationButton>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            )
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - safeCurrentPage) <= 1
              )
              .map((page, index, pages) => (
                <React.Fragment key={page}>
                  {index > 0 && pages[index - 1] !== page - 1 && (
                    <span className="px-1 text-[10px] text-[#9CA3AF]">
                      …
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage(page);
                      setActiveMenu(null);
                    }}
                    aria-label={`Page ${page}`}
                    aria-current={
                      safeCurrentPage === page ? "page" : undefined
                    }
                    className={`h-[27px] min-w-[27px] rounded-[4px] border px-1 text-[10px] transition-colors ${
                      safeCurrentPage === page
                        ? "border-[#A8BDFF] bg-[#DCE7FF] font-medium text-[#3766DC]"
                        : "border-transparent bg-white text-[#44516A] hover:border-[#E5E7EB] hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            <PaginationButton
              label="Next page"
              disabled={safeCurrentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
            >
              <ChevronRight size={13} />
            </PaginationButton>
          </div>
        </div>
      </div>

      {/* Separate assignment modal component */}
      {showAssignModal && (
        <AssignStudentModal tutor={tutor} onClose={() => setShowAssignModal(false)} onAssigned={handleAssignStudent} />
      )}

      {/* Student details modal */}
      {selectedStudent && (
        <Modal
          title="Student Details"
          onClose={() => setSelectedStudent(null)}
        >
          <div className="space-y-4">
            <div className="flex min-w-0 items-center gap-3 rounded-lg bg-[#F7F8FC] p-3 sm:p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E0E4EB]">
                <Eye size={20} className="text-[#65718A]" />
              </div>

              <div className="min-w-0">
                <h3 className="break-words text-[14px] font-semibold text-[#171717] sm:text-[15px]">
                  {selectedStudent.name}
                </h3>

                <p className="mt-1 text-[12px] text-gray-500">
                  {selectedStudent.studentId}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StudentInfo
                label="Subject"
                value={selectedStudent.subject}
              />

              <StudentInfo
                label="Level"
                value={selectedStudent.level}
              />

              <StudentInfo
                label="Class Days"
                value={selectedStudent.days}
              />

              <StudentInfo
                label="Class Time"
                value={selectedStudent.time}
              />

              <div className="sm:col-span-2">
                <span className="mb-2 block text-[11px] text-gray-500">
                  Status
                </span>

                <StatusBadge status={selectedStudent.status} />
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="h-9 rounded-md bg-[#064B0B] px-5 text-[12px] font-medium text-white transition hover:bg-[#053D09] focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

/* Student identity */
function StudentIdentity({ student }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#DADADA]">
        <span className="sr-only">{student.name}</span>
        <span className="text-[10px] font-semibold text-white">
          {student.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </span>
      </div>

      <div className="min-w-0">
        <p className="break-words text-[10px] font-medium leading-[14px] text-[#252525]">
          {student.name}
        </p>

        <p className="break-words text-[9px] leading-[12px] text-[#9CA3AF]">
          {student.studentId}
        </p>
      </div>
    </div>
  );
}

/* Class schedule */
function ClassSchedule({ student }) {
  return (
    <div className="flex min-w-0 items-start gap-[7px]">
      <CalendarDays
        size={15}
        strokeWidth={1.4}
        className="mt-0.5 shrink-0 text-[#9AA3A8]"
      />

      <div className="min-w-0">
        <p className="break-words text-[10px] leading-[14px] text-[#343A40]">
          {student.days}
        </p>

        <p className="break-words text-[9px] leading-[13px] text-[#9CA3AF]">
          {student.time}
        </p>
      </div>
    </div>
  );
}

/* Mobile information field */
function MobileInfo({ label, children }) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.04em] text-[#9299A5]">
        {label}
      </p>

      <div className="min-w-0">{children}</div>
    </div>
  );
}

/* Search filter */
function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="relative min-w-0">
      <select
        aria-label={label}
        value={value}
        onChange={onChange}
        className="h-[38px] w-full appearance-none rounded-[5px] border border-[#E5E7EB] bg-white px-3 pr-8 text-[12px] text-[#252525] outline-none transition focus:border-[#9CAFFB] focus:ring-2 focus:ring-indigo-50"
      >
        <option value="">{label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={13}
        strokeWidth={1.5}
        className="pointer-events-none absolute right-[9px] top-1/2 -translate-y-1/2 text-[#9299A5]"
      />
    </div>
  );
}

/* Status badge */
function StatusBadge({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex max-w-full items-center justify-center whitespace-nowrap rounded-full px-[9px] py-[4px] text-[9px] font-medium leading-[12px] ${
        isActive
          ? "bg-[#DDF5E3] text-[#16803D]"
          : "bg-[#F8EBDD] text-[#A65A08]"
      }`}
    >
      {status}
    </span>
  );
}

/* Row action menu */
function ActionMenu({
  student,
  activeMenu,
  setActiveMenu,
  onView,
  onRemove,
}) {
  const isOpen = activeMenu === student.id;

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setActiveMenu((current) =>
            current === student.id ? null : student.id
          )
        }
        aria-label={`More actions for ${student.name}`}
        aria-expanded={isOpen}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#718096] transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close action menu"
            onClick={() => setActiveMenu(null)}
            className="fixed inset-0 z-20 cursor-default"
          />

          <div className="absolute right-1 top-9 z-30 w-[145px] rounded-md border border-[#E5E7EB] bg-white p-1 text-left shadow-lg">
            <button
              type="button"
              onClick={() => onView(student)}
              className="w-full rounded px-3 py-2.5 text-left text-[11px] text-gray-700 transition hover:bg-gray-50"
            >
              View details
            </button>

            <button
              type="button"
              onClick={() => onRemove(student.id)}
              className="w-full rounded px-3 py-2.5 text-left text-[11px] text-red-600 transition hover:bg-red-50"
            >
              Unassign student
            </button>
          </div>
        </>
      )}
    </>
  );
}

/* Empty state for desktop table */
function EmptyState({ colSpan, onClear }) {
  return (
    <tr>
      <td colSpan={colSpan} className="h-40 px-4 text-center">
        <Search
          size={22}
          className="mx-auto mb-2 text-[#B3BAC5]"
        />

        <p className="text-[12px] text-[#8A909B]">
          No students match your search or filters.
        </p>

        <button
          type="button"
          onClick={onClear}
          className="mt-2 text-[11px] font-medium text-indigo-600 hover:underline"
        >
          Clear filters
        </button>
      </td>
    </tr>
  );
}

/* Pagination button */
function PaginationButton({ children, disabled, onClick, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-[27px] min-w-[27px] items-center justify-center rounded-[4px] border border-[#E6E9EF] bg-white text-[#778296] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

/* Reusable details modal */
function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-[#111827]/45 p-3 backdrop-blur-[2px] sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="assigned-students-modal-title"
        className="my-auto max-h-[92dvh] w-full max-w-[480px] overflow-y-auto rounded-xl bg-white p-4 shadow-2xl sm:p-6"
      >
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <h2
            id="assigned-students-modal-title"
            className="text-[16px] font-semibold text-[#171717] sm:text-[17px]"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[22px] leading-none text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

/* Student details field */
function StudentInfo({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="mb-1 text-[11px] text-gray-500">{label}</p>

      <p className="break-words text-[13px] font-medium text-[#252525]">
        {value}
      </p>
    </div>
  );
}