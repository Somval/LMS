import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  X,
  Clock3,
  BookOpen,
  Users,
} from "lucide-react";



const fmtDay = (d) =>
  new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
const fmtClock = (d) => new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });


const ITEMS_PER_PAGE = 7;

const emptyClass = {
  name: "",
  studentId: "",
  subject: "Mathematics",
  level: "Year 4",
  days: "Mon & Wed",
  time: "5:00 PM – 6:00 PM",
  nextClass: "Oct 7, 2026",
  nextTime: "5:00 PM",
  classesCount: "0/12",
  status: "Active",
};

export default function AssignedClasses({ tutor }) {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET /admin/tutors/:id/classes
  const load = useCallback(async () => {
    if (!tutor?.id) return;
    try {
      const rows = await api.get(`/admin/tutors/${tutor.id}/classes`);
      setClasses(
        rows.map((r) => ({
          id: r.id,
          name: r.title,
          studentId: `${r.students} ${r.students === 1 ? "student" : "students"}`,
          subject: r.subject,
          level: "",
          days: fmtDay(r.startsAt),
          time: `${fmtClock(r.startsAt)} – ${fmtClock(r.endsAt)}`,
          nextClass: r.status === "Upcoming" ? fmtDay(r.startsAt) : "–",
          nextTime: r.status === "Upcoming" ? fmtClock(r.startsAt) : "",
          classesCount: r.status === "Cancelled" ? "–" : r.marked ? `${r.present}/${r.marked} present` : "Not taken",
          status: r.status,
        }))
      );
      setError("");
    } catch (err) {
      setError(err.message || "Could not load classes.");
    } finally {
      setLoading(false);
    }
  }, [tutor?.id]);

  useEffect(() => { load(); }, [load]);

  const subjectOptions = [...new Set(classes.map((c) => c.subject))].sort();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const filteredClasses = useMemo(() => {
    const term = search.trim().toLowerCase();

    return classes.filter((item) => {
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.studentId.toLowerCase().includes(term) ||
        item.subject.toLowerCase().includes(term) ||
        item.level.toLowerCase().includes(term);

      return (
        matchesSearch &&
        (!levelFilter || item.level === levelFilter) &&
        (!statusFilter || item.status === statusFilter) &&
        (!subjectFilter || item.subject === subjectFilter)
      );
    });
  }, [classes, search, levelFilter, statusFilter, subjectFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClasses.length / ITEMS_PER_PAGE)
  );

  const safePage = Math.min(currentPage, totalPages);
  const startIndex =
    filteredClasses.length === 0
      ? 0
      : (safePage - 1) * ITEMS_PER_PAGE;

  const visibleClasses = filteredClasses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const updateFilter = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
    setActiveMenu(null);
  };

  // Cancel an upcoming class: PATCH /classes/:id { status: "CANCELLED" } (students are notified)
  const handleRemoveClass = async (id) => {
    setActiveMenu(null);
    try {
      await api.patch(`/classes/${id}`, { status: "CANCELLED" });
      load();
    } catch (err) {
      setError(err.message || "Could not cancel this class.");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setLevelFilter("");
    setStatusFilter("");
    setSubjectFilter("");
    setCurrentPage(1);
  };

  return (
    <section className="min-h-screen w-full min-w-0 bg-[#F5F7FF] p-2.5 sm:p-4 lg:p-5">
      <div className="mx-auto flex w-full max-w-[1066px] min-w-0 flex-col rounded-[6px] border border-[#E9ECF2] bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.025)] sm:p-4 lg:min-h-[420px] lg:p-[11px]">
        {/* Header */}
        <header className="mb-[17px] flex items-center justify-between gap-3 px-0.5">
          <h1 className="text-[14px] font-semibold leading-5 text-[#171717] sm:text-[15px]">
            Assigned Classes
          </h1>

          <button
            type="button"
            onClick={() => navigate("/admin/schedule-class")}
            className="inline-flex h-[34px] shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#064B0B] px-3 text-[10px] font-medium text-white transition hover:bg-[#053D09] focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 sm:px-4 sm:text-[11px]"
          >
            <Plus size={14} strokeWidth={1.8} />
            <span>Schedule Class</span>
          </button>
        </header>

        {/* Search and filters */}
        <div className="mb-[13px] grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.55fr)_repeat(3,minmax(0,1fr))] lg:gap-[11px]">
          <div className="relative min-w-0">
            <Search
              size={14}
              strokeWidth={1.5}
              className="pointer-events-none absolute left-[11px] top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />
            <input
              type="search"
              value={search}
              onChange={updateFilter(setSearch)}
              placeholder="Search class or subject..." aria-label="Search classes or subjects"
              className="h-[37px] w-full min-w-0 rounded-[5px] border border-[#E5E7EB] bg-white pl-[31px] pr-3 text-[11px] text-[#252525] outline-none transition placeholder:text-[#A0A0A8] focus:border-[#9CAFFB] focus:ring-2 focus:ring-indigo-50"
            />
          </div>

          <FilterSelect
            label="Status"
            value={statusFilter}
            onChange={updateFilter(setStatusFilter)}
            options={["Upcoming", "Completed", "Cancelled"]}
          />

          <FilterSelect
            label="Subjects"
            value={subjectFilter}
            onChange={updateFilter(setSubjectFilter)}
            options={subjectOptions}
          />
        </div>

        {/* Desktop and tablet table */}
        <div className="hidden min-w-0 flex-1 sm:block">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[800px] table-fixed border-collapse text-left">
              <colgroup>
                <col style={{ width: "14%" }} />
                <col style={{ width: "9%" }} />
                <col style={{ width: "6.5%" }} />
                <col style={{ width: "16.5%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "6%" }} />
              </colgroup>

              <thead>
                <tr className="h-[33px] bg-[#EEF3F9]">
                  {[
                    "Class", "Subject", "Date & Time", "Next Class", "Attendance", "Status", "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className={`whitespace-nowrap px-2 text-[9px] font-medium text-[#35465B] ${
                        heading === "Action" ? "text-center" : ""
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visibleClasses.map((item) => (
                  <tr
                    key={item.id}
                    className="h-[41px] border-b border-[#F0F1F4] transition-colors hover:bg-[#FCFCFE]"
                  >
                    <td className="px-2 py-1.5">
                      <StudentCell item={item} />
                    </td>

                    <td className="truncate px-2 py-1.5 text-[8px] text-[#333B48]">
                      {item.subject}
                    </td>

                    <td className="px-2 py-1.5">
                      <ScheduleCell item={item} />
                    </td>

                    <td className="px-2 py-1.5">
                      <div className="min-w-0">
                        <p className="truncate text-[8px] leading-[12px] text-[#343A40]">
                          {item.nextClass}
                        </p>
                        <p className="truncate text-[8px] leading-[11px] text-[#343A40]">
                          {item.nextTime}
                        </p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-2 py-1.5 text-[8px] text-[#333B48]">
                      {item.classesCount}
                    </td>

                    <td className="px-2 py-1.5">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="px-1 py-1.5 text-center">
                      <RowActions
                        item={item}
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                        onView={setSelectedClass}
                        onRemove={handleRemoveClass}
                      />
                    </td>
                  </tr>
                ))}

                {visibleClasses.length === 0 && (
                  <EmptyState colSpan={7} onClear={clearFilters} />
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile layout: readable cards instead of squeezed table columns */}
        <div className="space-y-3 sm:hidden">
          {visibleClasses.map((item) => (
            <article
              key={item.id}
              className="min-w-0 rounded-[7px] border border-[#E8EBF1] bg-white p-3 transition hover:border-[#D7DDE8]"
            >
              <div className="flex min-w-0 items-start justify-between gap-2">
                <StudentCell item={item} />
                <RowActions
                  item={item}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  onView={setSelectedClass}
                  onRemove={handleRemoveClass}
                />
              </div>

              <div className="my-3 border-t border-[#F0F1F4]" />

              <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                <MobileInfo
                  icon={BookOpen}
                  label="Subject"
                  value={item.subject}
                />
                <MobileInfo
                  icon={Users}
                  label="Level"
                  value={item.level}
                />
                <MobileInfo
                  icon={CalendarDays}
                  label="Class Schedule"
                  value={`${item.days} · ${item.time}`}
                />
                <MobileInfo
                  icon={Clock3}
                  label="Next Class"
                  value={`${item.nextClass} · ${item.nextTime}`}
                />
                <MobileInfo
                  icon={BookOpen}
                  label="Classes Count"
                  value={item.classesCount}
                />
                <div className="min-w-0">
                  <p className="mb-1.5 text-[10px] text-[#9299A5]">
                    Status
                  </p>
                  <StatusBadge status={item.status} />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedClass(item)}
                className="mt-3 inline-flex h-8 w-full items-center justify-center gap-2 rounded-[4px] border border-[#A9B6E8] text-[11px] font-medium text-[#4B5FA6] transition hover:bg-[#F5F7FF]"
              >
                <Eye size={13} />
                View class details
              </button>
            </article>
          ))}

          {visibleClasses.length === 0 && (
            <div className="rounded-md border border-[#E8EBF1] px-4 py-10 text-center">
              <Search className="mx-auto mb-2 text-[#B3BAC5]" size={22} />
              <p className="text-[12px] text-[#8A909B]">
                No classes match your search or filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-2 text-[11px] font-medium text-indigo-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        <footer className="mt-4 flex flex-col gap-3 border-t border-[#F0F1F4] pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] leading-4 text-[#353B45]">
            Showing {filteredClasses.length === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredClasses.length)}{" "}
            of {filteredClasses.length} classes
          </p>

          <div className="flex flex-wrap items-center justify-end gap-[4px]">
            <PaginationButton
              label="Previous page"
              disabled={safePage === 1}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
            >
              <ChevronLeft size={13} />
            </PaginationButton>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - safePage) <= 1
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
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={safePage === page ? "page" : undefined}
                    className={`h-[25px] min-w-[25px] rounded-[3px] border px-1 text-[10px] transition ${
                      safePage === page
                        ? "border-[#A8BDFF] bg-[#DCE7FF] font-medium text-[#3766DC]"
                        : "border-transparent text-[#44516A] hover:border-[#E5E7EB] hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            <PaginationButton
              label="Next page"
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
            >
              <ChevronRight size={13} />
            </PaginationButton>
          </div>
        </footer>
      </div>

      {/* Class details modal */}
      {selectedClass && (
        <DetailsModal
          item={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </section>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="relative min-w-0">
      <select
        aria-label={label}
        value={value}
        onChange={onChange}
        className="h-[37px] w-full appearance-none rounded-[5px] border border-[#E5E7EB] bg-white px-3 pr-8 text-[11px] text-[#252525] outline-none transition focus:border-[#9CAFFB] focus:ring-2 focus:ring-indigo-50"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
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

function StudentCell({ item }) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <div className="h-[21px] w-[21px] shrink-0 rounded-full bg-[#DADADA]" />
      <div className="min-w-0">
        <p className="truncate text-[9px] font-medium leading-[13px] text-[#252525]">
          {item.name}
        </p>
        <p className="truncate text-[8px] leading-[11px] text-[#9CA3AF]">
          {item.studentId}
        </p>
      </div>
    </div>
  );
}

function ScheduleCell({ item }) {
  return (
    <div className="flex min-w-0 items-center gap-[5px]">
      <CalendarDays
        size={14}
        strokeWidth={1.3}
        className="shrink-0 text-[#9AA3A8]"
      />
      <div className="min-w-0">
        <p className="truncate text-[8px] leading-[11px] text-[#343A40]">
          {item.days}
        </p>
        <p className="truncate text-[8px] leading-[11px] text-[#9CA3AF]">
          {item.time}
        </p>
      </div>
    </div>
  );
}

function MobileInfo({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <Icon
        size={14}
        strokeWidth={1.5}
        className="mt-0.5 shrink-0 text-[#8B95A5]"
      />
      <div className="min-w-0">
        <p className="mb-1 text-[10px] text-[#9299A5]">{label}</p>
        <p className="break-words text-[11px] leading-4 text-[#343A40]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const isActive = status === "Upcoming" || status === "Active";
  const isCancelled = status === "Cancelled";

  return (
    <span
      className={`inline-flex min-w-[49px] items-center justify-center rounded-full px-2 py-[3px] text-[9px] font-medium leading-[12px] ${
        isActive ? "bg-[#DDF5E3] text-[#16803D]" : isCancelled ? "bg-[#FCE4E4] text-[#B42318]" : "bg-[#E8EDF5] text-[#475467]"
      }`}
    >
      {status}
    </span>
  );
}

function RowActions({ item, activeMenu, setActiveMenu, onView, onRemove }) {
  const isOpen = activeMenu === item.id;

  return (
    <div className="relative flex shrink-0 items-center justify-center gap-1">
      <button
        type="button"
        onClick={() => {
          onView(item);
          setActiveMenu(null);
        }}
        className="hidden h-[21px] min-w-[45px] items-center justify-center rounded-[3px] border border-[#A9B6E8] bg-white px-2 text-[9px] font-medium text-[#4B5FA6] transition hover:bg-[#F5F7FF] sm:inline-flex"
      >
        View
      </button>

      <button
        type="button"
        onClick={() =>
          setActiveMenu((current) => (current === item.id ? null : item.id))
        }
        aria-label={`More actions for ${item.name}`}
        aria-expanded={isOpen}
        className="inline-flex h-7 w-7 items-center justify-center rounded text-[#718096] transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[30px] z-30 w-[140px] rounded-md border border-[#E5E7EB] bg-white p-1 text-left shadow-lg">
          <button
            type="button"
            onClick={() => {
              onView(item);
              setActiveMenu(null);
            }}
            className="flex w-full items-center gap-2 rounded px-3 py-2 text-[11px] text-gray-700 hover:bg-gray-50"
          >
            <Eye size={13} />
            View details
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="flex w-full items-center gap-2 rounded px-3 py-2 text-[11px] text-red-600 hover:bg-red-50"
          >
            <X size={13} />
            Cancel class
          </button>
        </div>
      )}
    </div>
  );
}

function PaginationButton({ children, disabled, onClick, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-[25px] min-w-[25px] items-center justify-center rounded-[3px] border border-[#E6E9EF] bg-white text-[#778296] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function EmptyState({ colSpan, onClear }) {
  return (
    <tr>
      <td colSpan={colSpan} className="h-32 px-4 text-center">
        <Search size={20} className="mx-auto mb-2 text-[#B3BAC5]" />
        <p className="text-[11px] text-[#8A909B]">
          No classes match your search or filters.
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

function DetailsModal({ item, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#111827]/45 p-3 backdrop-blur-[2px] sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="class-details-title"
        className="my-auto max-h-[92vh] w-full max-w-[460px] overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <h2
            id="class-details-title"
            className="text-[16px] font-semibold text-[#171717]"
          >
            Class Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close class details"
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          >
            <X size={17} />
          </button>
        </div>

        <div className="mb-4 flex items-center gap-3 rounded-lg bg-[#F7F8FC] p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E0E4EB]">
            <Eye size={19} className="text-[#65718A]" />
          </div>
          <div className="min-w-0">
            <p className="break-words text-[14px] font-semibold text-[#171717]">
              {item.name}
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              {item.studentId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DetailItem label="Subject" value={item.subject} />
          
          <DetailItem label="Date" value={item.days} />
          <DetailItem label="Time" value={item.time} />
          <DetailItem label="Next Class" value={item.nextClass} />
          <DetailItem label="Next Class Time" value={item.nextTime} />
          <DetailItem label="Attendance" value={item.classesCount} />
          <div>
            <p className="mb-1 text-[11px] text-gray-500">Status</p>
            <StatusBadge status={item.status} />
          </div>
        </div>

        <div className="mt-5 flex justify-end border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-md bg-[#064B0B] px-5 text-[12px] font-medium text-white hover:bg-[#053D09]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="mb-1 text-[11px] text-gray-500">{label}</p>
      <p className="break-words text-[12px] font-medium text-[#252525]">
        {value || "—"}
      </p>
    </div>
  );
}
