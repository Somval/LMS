
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  UserCheck,
  UserX,
  X,
} from "lucide-react";
import { api } from "../../../../lib/api";
import Avatar from "../../../../components/Avatar";


const ROWS_PER_PAGE = 8;

export default function StudentsTable({
  students = [],
  loading = false,
  error = "",
  onChanged = async () => {},
  onViewStudent = () => {},
}) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState("");

  const levelOptions = useMemo(
    () => [...new Set(students.flatMap((s) => s.levels))].sort(),
    [students]
  );
  const subjectOptions = useMemo(
    () => [...new Set(students.flatMap((s) => s.subjects))].sort(),
    [students]
  );

  const toggleStatus = async (student) => {
    setActiveMenu(null);
    const suspending = student.status === "Active";
    if (suspending && !window.confirm(`Suspend ${student.name}? They will no longer be able to sign in.`)) return;
    setBusyId(student.id);
    setActionError("");
    try {
      await api.patch(`/admin/users/${student.id}/status`, { status: suspending ? "SUSPENDED" : "ACTIVE" });
      await onChanged();
    } catch (err) {
      setActionError(err.message || "Could not update the student.");
    } finally {
      setBusyId(null);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        student.name.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue) ||
        student.subjects.some((subject) =>
          subject.toLowerCase().includes(searchValue)
        );

      const matchesLevel =
        !levelFilter || student.levels.includes(levelFilter);

      const matchesStatus =
        !statusFilter || student.status === statusFilter;

      const matchesSubject =
        !subjectFilter || student.subjects.includes(subjectFilter);

      return (
        matchesSearch &&
        matchesLevel &&
        matchesStatus &&
        matchesSubject
      );
    });
  }, [students, search, levelFilter, statusFilter, subjectFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / ROWS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const currentStudents = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;

    return filteredStudents.slice(start, start + ROWS_PER_PAGE);
  }, [filteredStudents, currentPage]);

  const hasFilters = Boolean(
    search || levelFilter || statusFilter || subjectFilter
  );

  const clearFilters = () => {
    setSearch("");
    setLevelFilter("");
    setStatusFilter("");
    setSubjectFilter("");
    setCurrentPage(1);
    setActiveMenu(null);
  };

  const updateFilter = (setter, value) => {
    setter(value);
    setCurrentPage(1);
    setActiveMenu(null);
  };

  const handleViewStudent = (student) => {
    setActiveMenu(null);
    onViewStudent(student);
    navigate(`/admin/users/students/${student.id}`);
  };

  const startRow =
    filteredStudents.length === 0
      ? 0
      : (currentPage - 1) * ROWS_PER_PAGE + 1;

  const endRow = Math.min(
    currentPage * ROWS_PER_PAGE,
    filteredStudents.length
  );

  const selectClass =
    "h-[42px] w-full min-w-0 appearance-none rounded-[5px] border border-[#E5E7EB] bg-white pl-3 pr-8 font-[Inter] text-[12px] text-[#202020] outline-none transition-colors hover:border-[#C5CAD3] focus:border-[#8B91C7] focus:ring-2 focus:ring-[#8B91C7]/10";

  return (
    <section className="mx-auto flex min-h-[863px] w-full max-w-[1066px] min-w-0 flex-col overflow-hidden rounded-[7px] border border-[#E7E9EF] bg-white font-[Inter]">
      {/* Search and Filters */}
      <div className="shrink-0 px-3 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-5">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1.65fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(120px,1fr)]">
          <div className="relative min-w-0">
            <Search
              size={15}
              strokeWidth={1.6}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8992A4]"
              aria-hidden="true"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                updateFilter(setSearch, event.target.value)
              }
              placeholder="Search students..."
              aria-label="Search students"
              className="h-[42px] w-full rounded-[5px] border border-[#E5E7EB] bg-white pl-9 pr-3 font-[Inter] text-[12px] text-[#202020] outline-none placeholder:text-[#A0A5B0] focus:border-[#8B91C7] focus:ring-2 focus:ring-[#8B91C7]/10"
            />
          </div>

          <div className="relative min-w-0">
            <select
              value={levelFilter}
              onChange={(event) =>
                updateFilter(setLevelFilter, event.target.value)
              }
              aria-label="Filter by level"
              className={selectClass}
            >
              <option value="">Level</option>
              {levelOptions.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8992A4]"
              aria-hidden="true"
            />
          </div>

          <div className="relative min-w-0">
            <select
              value={statusFilter}
              onChange={(event) =>
                updateFilter(setStatusFilter, event.target.value)
              }
              aria-label="Filter by student status"
              className={selectClass}
            >
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>

            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8992A4]"
              aria-hidden="true"
            />
          </div>

          <div className="relative min-w-0">
            <select
              value={subjectFilter}
              onChange={(event) =>
                updateFilter(setSubjectFilter, event.target.value)
              }
              aria-label="Filter by subject"
              className={selectClass}
            >
              <option value="">Subjects</option>
              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8992A4]"
              aria-hidden="true"
            />
          </div>
        </div>

        {hasFilters && (
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[11px] text-[#727B8C]">
              {filteredStudents.length} matching student
              {filteredStudents.length === 1 ? "" : "s"}
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#555C9B] hover:text-[#343A7A]"
            >
              <X size={13} />
              Clear filters
            </button>
          </div>
        )}
      </div>

      {(error || actionError) && (
        <p role="alert" className="mx-3 mb-3 rounded-[5px] bg-[#FDE7E7] px-3 py-2 text-[11px] text-[#D14343] sm:mx-5">
          {actionError || error}
        </p>
      )}

      {/* Students Table */}
      <div className="mx-3 min-w-0 flex-1 sm:mx-5">
        <div className="h-full w-full overflow-x-auto">
          <table className="w-full min-w-[700px] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[23%]" />
              <col className="w-[12%]" />
              <col className="w-[17%]" />
              <col className="w-[18%]" />
              <col className="w-[18%]" />
              <col className="w-[12%]" />
            </colgroup>

            <thead>
              <tr className="h-[55px] bg-[#EEF3F8]">
                <th scope="col" className="rounded-l-[3px] px-3 font-[Inter] text-[11px] font-medium text-[#344256]">
                  Student
                </th>
                <th scope="col" className="px-2 font-[Inter] text-[11px] font-medium text-[#344256]">
                  Level
                </th>
                <th scope="col" className="px-2 font-[Inter] text-[11px] font-medium text-[#344256]">
                  Subjects
                </th>
                <th scope="col" className="px-2 font-[Inter] text-[11px] font-medium text-[#344256]">
                  Tutor Status
                </th>
                <th scope="col" className="px-2 font-[Inter] text-[11px] font-medium text-[#344256]">
                  Status
                </th>
                <th scope="col" className="rounded-r-[3px] px-2 text-center font-[Inter] text-[11px] font-medium text-[#344256]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {currentStudents.map((student) => (
                <tr
                  key={student.id}
                  className="h-[80px] border-b border-[#ECEFF3] transition-colors last:border-b-0 hover:bg-[#FAFBFD]"
                >
                  <td className="px-3 py-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar
                        name={student.name}
                        avatarUrl={student.avatarUrl}
                        textClassName="text-[11px]"
                        className="h-[38px] w-[38px] rounded-full border border-[#E5E7EB]"
                      />

                      <div className="min-w-0">
                        <p className="truncate font-[Inter] text-[11px] font-medium leading-[1.5] text-[#20242B]">
                          {student.name}
                        </p>
                        <p className="truncate font-[Inter] text-[10px] leading-[1.5] text-[#858C98]">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-2 py-2">
                    <span className="font-[Inter] text-[11px] text-[#414957]">
                      {student.levels.length ? student.levels.join(", ") : "—"}
                    </span>
                  </td>

                  <td className="px-2 py-2">
                    <div className="max-w-[135px] font-[Inter] text-[11px] leading-[1.7] text-[#414957]">
                      {student.subjects.join(", ")}
                    </div>
                  </td>

                  <td className="px-2 py-2">
                    <span
                      className={`inline-flex min-w-[100px] items-center justify-center rounded-[3px] px-2 py-1 font-[Inter] text-[10px] font-medium ${
                        student.tutorStatus === "Assigned"
                          ? "bg-[#DDF5E3] text-[#159447]"
                          : student.tutorStatus === "Unassigned"
                          ? "bg-[#FFF0D9] text-[#B96A08]"
                          : "bg-[#EEF1F6] text-[#667085]"
                      }`}
                    >
                      {student.tutorStatus}
                    </span>
                  </td>

                  <td className="px-2 py-2">
                    <span
                      className={`inline-flex min-w-[82px] items-center justify-center rounded-full px-2.5 py-1 font-[Inter] text-[10px] font-medium ${
                        student.status === "Active"
                          ? "bg-[#DDF5E3] text-[#159447]"
                          : "bg-[#FDE7E7] text-[#D14343]"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  {/* View button navigates to the student details page */}
                  <td className="px-2 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleViewStudent(student)}
                        aria-label={`View ${student.name}, student ID ${student.id}`}
                        className="inline-flex h-[29px] min-w-[58px] items-center justify-center rounded-[3px] border border-[#9699D4] bg-white px-3 font-[Inter] text-[10px] font-medium text-[#555AA3] transition-colors hover:bg-[#F2F2FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#777CC4]"
                      >
                        View
                      </button>

                      <div className="relative">
                        <button
                          type="button"
                          aria-label={`More actions for ${student.name}`}
                          aria-expanded={activeMenu === student.id}
                          onClick={() =>
                            setActiveMenu((current) =>
                              current === student.id ? null : student.id
                            )
                          }
                          className="flex h-7 w-6 items-center justify-center rounded text-[#667085] hover:bg-[#EEF1F6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9699D4]"
                        >
                          <MoreVertical size={15} />
                        </button>

                        {activeMenu === student.id && (
                          <div className="absolute right-0 top-8 z-20 w-[140px] rounded-md border border-[#E6E8EE] bg-white p-1.5 shadow-lg">
                            <button
                              type="button"
                              onClick={() => handleViewStudent(student)}
                              className="flex w-full items-center gap-2 rounded px-2.5 py-2 text-left text-[11px] text-[#344054] hover:bg-[#F5F6FA]"
                            >
                              <Eye size={14} />
                              View details
                            </button>
                            <button
                              type="button"
                              disabled={busyId === student.id}
                              onClick={() => toggleStatus(student)}
                              className="flex w-full items-center gap-2 rounded px-2.5 py-2 text-left text-[11px] text-[#344054] hover:bg-[#F5F6FA] disabled:opacity-50"
                            >
                              {student.status === "Active" ? <UserX size={14} /> : <UserCheck size={14} />}
                              {student.status === "Active" ? "Suspend" : "Reactivate"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {loading && (
                <tr>
                  <td colSpan={6} className="h-[240px] text-center text-[12px] text-[#727B8C]">
                    Loading students…
                  </td>
                </tr>
              )}

              {!loading && currentStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="h-[240px] px-4 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search
                        size={25}
                        strokeWidth={1.4}
                        className="text-[#A0A6B2]"
                      />
                      <p className="text-[13px] font-medium text-[#344054]">
                        No students found
                      </p>
                      <p className="text-[11px] text-[#858C98]">
                        Try changing your search or filters.
                      </p>
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-1 text-[11px] font-medium text-[#555AA3] hover:underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer and Pagination */}
      <footer className="mt-auto flex shrink-0 flex-col justify-between gap-3 border-t border-[#F0F1F5] px-4 py-4 sm:flex-row sm:items-center sm:px-5">
        <p className="font-[Inter] text-[11px] text-[#303844]">
          Showing {startRow}–{endRow} of{" "}
          {filteredStudents.length} students
        </p>

        <nav
          aria-label="Student table pagination"
          className="flex items-center gap-1"
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) => Math.max(1, page - 1))
            }
            aria-label="Previous page"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[3px] border border-[#E6E9EF] text-[#7D8797] transition-colors hover:bg-[#F3F5F9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>

          {Array.from({ length: Math.min(4, totalPages) }, (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                type="button"
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                onClick={() => {
                  setCurrentPage(page);
                  setActiveMenu(null);
                }}
                className={`flex h-[30px] min-w-[30px] items-center justify-center rounded-[3px] border px-2 font-[Inter] text-[11px] transition-colors ${
                  currentPage === page
                    ? "border-[#9AB7FF] bg-[#DCE7FF] font-medium text-[#2563EB]"
                    : "border-transparent bg-white text-[#526078] hover:border-[#E6E9EF] hover:bg-[#F7F8FB]"
                }`}
              >
                {page}
              </button>
            );
          })}

          {totalPages > 4 && (
            <>
              <span className="px-1 text-[11px] text-[#526078]">…</span>
              <button
                type="button"
                aria-label={`Go to last page, page ${totalPages}`}
                onClick={() => {
                  setCurrentPage(totalPages);
                  setActiveMenu(null);
                }}
                className={`flex h-[30px] min-w-[30px] items-center justify-center rounded-[3px] border px-2 text-[11px] ${
                  currentPage === totalPages
                    ? "border-[#9AB7FF] bg-[#DCE7FF] text-[#2563EB]"
                    : "border-transparent text-[#526078] hover:bg-[#F7F8FB]"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1)
              )
            }
            aria-label="Next page"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[3px] border border-[#E6E9EF] text-[#7D8797] transition-colors hover:bg-[#F3F5F9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </nav>
      </footer>
    </section>
  );
}