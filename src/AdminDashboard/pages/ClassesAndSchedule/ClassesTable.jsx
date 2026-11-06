
import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Search,
  ChevronDown,
  CalendarDays,
  MoreVertical,
  Pencil,
  Eye,
  CircleX,
  X,
} from "lucide-react";

function Avatar({ name, size = "sm" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#D9DDE3] text-xs font-semibold text-[#687385] ${
        size === "lg" ? "h-10 w-10" : "h-8 w-8"
      }`}
      aria-label={name}
      title={name}
    >
      {name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)}
    </div>
  );
}

function DateCell({ date, time }) {
  return (
    <div className="flex min-w-[180px] items-start gap-2">
      <CalendarDays
        size={16}
        strokeWidth={1.6}
        className="mt-0.5 shrink-0 text-[#536174]"
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="whitespace-nowrap text-xs leading-5 text-[#3E4756]">
          {date}
        </p>
        <p className="whitespace-nowrap text-[11px] leading-4 text-[#8994A5]">
          {time}
        </p>
      </div>
    </div>
  );
}

const statusStyles = {
  Upcoming: "bg-[#E7F0FF] text-[#3269F6]",
  Completed: "bg-[#E4FFF1] text-[#14A760]",
  Cancelled: "bg-[#FFE5EA] text-[#E5384F]",
};

export default function ClassesTable({
  classes = [],
  loading = false,
  onEditSchedule,
  onViewRecordings,
  onCancelClass,
  onViewClass,
}) {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [tutorFilter, setTutorFilter] = useState("All Tutors");
  const [openMenu, setOpenMenu] = useState(null);

  const tabs = [
    { label: "All Classes", value: "All", count: classes.length },
    { label: "Upcoming", value: "Upcoming", count: classes.filter((c) => c.status === "Upcoming").length },
    { label: "Completed", value: "Completed", count: classes.filter((c) => c.status === "Completed").length },
    { label: "Cancelled", value: "Cancelled", count: classes.filter((c) => c.status === "Cancelled").length },
  ];
  const [cancelTarget, setCancelTarget] = useState(null);
  const [page, setPage] = useState(1);
  const menuRef = useRef(null);

  const pageSize = 5;

  const subjects = useMemo(
    () => [...new Set(classes.map((item) => item.subject))],
    [classes]
  );

  const tutors = useMemo(
    () => [...new Set(classes.map((item) => item.tutor))],
    [classes]
  );

  const filteredClasses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return classes.filter((item) => {
      const matchesTab =
        activeTab === "All" || item.status === activeTab;

      const matchesSubject =
        subjectFilter === "All Subjects" ||
        item.subject === subjectFilter;

      const matchesTutor =
        tutorFilter === "All Tutors" ||
        item.tutor === tutorFilter;

      const matchesSearch =
        !query ||
        [
          item.student,
          item.studentId,
          item.subject,
          item.year,
          item.tutor,
          item.tutorId,
        ].some((value) =>
          String(value ?? "").toLowerCase().includes(query)
        );

      return (
        matchesTab &&
        matchesSubject &&
        matchesTutor &&
        matchesSearch
      );
    });
  }, [classes, activeTab, subjectFilter, tutorFilter, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClasses.length / pageSize)
  );

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  useEffect(() => {
    if (!openMenu) return;

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setCancelTarget(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMenu]);

  const visibleClasses = filteredClasses.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const changeTab = (value) => {
    setActiveTab(value);
    setPage(1);
    setOpenMenu(null);
  };

  const handleCancel = () => {
    if (!cancelTarget) return;

    onCancelClass?.(cancelTarget);
    setCancelTarget(null);
    setOpenMenu(null);
  };

  return (
    <section className="min-h-full w-full min-w-0 bg-[#F4F7FD] p-4 font-sans text-[#252B35] sm:p-6 lg:p-8">
      {/* Status tabs */}
      <div className="mb-6 flex w-full items-center gap-5 overflow-x-auto border-b border-[#DCE3ED] sm:gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => changeTab(tab.value)}
            className={`relative -mb-px flex min-h-12 shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-2 pb-3 pt-2 text-sm transition sm:text-[15px] ${
              activeTab === tab.value
                ? "border-[#3269F6] font-semibold text-[#252B35]"
                : "border-transparent font-normal text-[#737D8D] hover:text-[#3269F6]"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs sm:text-sm ${
                activeTab === tab.value
                  ? "text-[#3269F6]"
                  : "text-[#8994A5]"
              }`}
            >
              ({tab.count})
            </span>
          </button>
        ))}
      </div>

      {/* Search and filters */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(280px,1.5fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)]">
        <div className="relative min-w-0">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA3B2]"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search by class, subject or tutor..."
            aria-label="Search classes"
            className="h-12 w-full rounded-lg border border-[#DCE3ED] bg-white pl-11 pr-4 text-sm text-[#303846] outline-none transition placeholder:text-[#9AA3B2] focus:border-[#3269F6] focus:ring-4 focus:ring-[#3269F6]/10"
          />
        </div>

        <div className="relative min-w-0">
          <select
            value={subjectFilter}
            onChange={(event) => {
              setSubjectFilter(event.target.value);
              setPage(1);
            }}
            aria-label="Filter by subject"
            className="h-12 w-full appearance-none rounded-lg border border-[#DCE3ED] bg-white px-4 pr-10 text-sm text-[#303846] outline-none focus:border-[#3269F6] focus:ring-4 focus:ring-[#3269F6]/10"
          >
            <option value="All Subjects">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8792A3]"
          />
        </div>

        <div className="relative min-w-0">
          <select
            value={tutorFilter}
            onChange={(event) => {
              setTutorFilter(event.target.value);
              setPage(1);
            }}
            aria-label="Filter by tutor"
            className="h-12 w-full appearance-none rounded-lg border border-[#DCE3ED] bg-white px-4 pr-10 text-sm text-[#303846] outline-none focus:border-[#3269F6] focus:ring-4 focus:ring-[#3269F6]/10"
          >
            <option value="All Tutors">All Tutors</option>
            {tutors.map((tutor) => (
              <option key={tutor} value={tutor}>
                {tutor}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8792A3]"
          />
        </div>
      </div>

      {/* Responsive table */}
      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-[#E1E7F0] bg-white shadow-sm shadow-slate-200/30">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] border-collapse text-left">
            <colgroup>
              <col className="w-[22%]" />
              <col className="w-[16%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[12%]" />
              <col className="w-[10%]" />
            </colgroup>

            <thead>
              <tr className="h-[58px] border-b border-[#E9EDF4] bg-[#F8FAFD]">
                {[
                  "Class",
                  "Subject",
                  "Tutor",
                  "Date & Time",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap px-4 text-xs font-semibold text-[#647084] sm:px-5"
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
                  className="h-[88px] border-b border-[#EDF0F5] last:border-b-0 hover:bg-[#FAFBFE]"
                >
                  {/* Student */}
                  <td className="px-4 py-4 align-middle sm:px-5">
                    <button
                      type="button"
                      onClick={() => onViewClass?.(item)}
                      className="flex min-w-0 items-center gap-3 text-left"
                    >
                      <Avatar name={item.student} />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold leading-5 text-[#303846]">
                          {item.student}
                        </span>
                        <span className="mt-0.5 block truncate text-xs leading-4 text-[#9AA3B2]">
                          {item.studentId}
                        </span>
                      </span>
                    </button>
                  </td>

                  {/* Subject */}
                  <td className="px-4 py-4 align-middle sm:px-5">
                    <div className="min-w-0">
                      <p className="break-words text-sm leading-5 text-[#303846]">
                        {item.subject}
                      </p>
                      <p className="mt-1 text-xs leading-4 text-[#8994A5]">
                        {item.year}
                      </p>
                    </div>
                  </td>

                  {/* Tutor */}
                  <td className="px-4 py-4 align-middle sm:px-5">
                    <button
                      type="button"
                      onClick={() => onViewClass?.(item)}
                      className="flex min-w-0 items-center gap-3 text-left"
                    >
                      <Avatar name={item.tutor} />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium leading-5 text-[#303846]">
                          {item.tutor}
                        </span>
                        <span className="mt-0.5 block truncate text-xs leading-4 text-[#9AA3B2]">
                          {item.tutorId}
                        </span>
                      </span>
                    </button>
                  </td>

                  {/* Date and time of this class */}
                  <td className="px-4 py-4 align-middle sm:px-5">
                    <DateCell date={item.nextDate} time={item.nextTime} />
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4 align-middle sm:px-5">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Row actions */}
                  <td
                    className="relative px-4 py-4 text-center align-middle sm:px-5"
                    ref={openMenu === item.id ? menuRef : null}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu((current) =>
                          current === item.id ? null : item.id
                        )
                      }
                      aria-label={`Actions for ${item.student}`}
                      aria-expanded={openMenu === item.id}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE3ED] bg-white text-[#718096] transition hover:border-[#A9BDEB] hover:bg-[#F4F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3269F6]"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === item.id && (
                      <div className="absolute right-3 top-[64px] z-30 w-[240px] rounded-xl border border-[#E7EBF2] bg-white p-2 text-left shadow-xl shadow-slate-900/10">
                        {item.status === "Upcoming" && (
                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenu(null);
                            onEditSchedule?.(item);
                          }}
                          className="flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-[#596476] hover:bg-[#F4F7FD]"
                        >
                          <Pencil size={16} />
                          Edit Schedule
                        </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenu(null);
                            onViewRecordings?.(item);
                          }}
                          className="flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-[#596476] hover:bg-[#F4F7FD]"
                        >
                          <Eye size={16} />
                          View Past Class Recordings
                        </button>

                        {item.status === "Upcoming" && (
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenu(null);
                              setCancelTarget(item);
                            }}
                            className="flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-[#F04455] hover:bg-red-50"
                          >
                            <CircleX size={16} />
                            Cancel Upcoming Class
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {visibleClasses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F1F5F9]">
                        <Search size={25} className="text-[#A0AABB]" />
                      </div>
                      <p className="text-base font-semibold text-[#475569]">
                        {loading ? "Loading classes…" : "No classes found"}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
                        {loading
                          ? ""
                          : classes.length === 0
                          ? "Use Schedule Class to create the first one."
                          : "Try changing your search or filter selections."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile scroll hint */}
        <div className="border-t border-[#EDF0F5] bg-[#F8FAFD] px-4 py-2.5 text-xs text-[#8994A5] sm:hidden">
          Swipe horizontally to view all class details.
        </div>
      </div>

      {/* Results and pagination */}
      <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#7B8798]">
          Showing{" "}
          {filteredClasses.length === 0
            ? 0
            : (page - 1) * pageSize + 1}
          {" "}–{" "}
          {Math.min(page * pageSize, filteredClasses.length)}
          {" "}of {filteredClasses.length} classes
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
            className="min-h-10 rounded-lg border border-[#DCE3ED] bg-white px-4 text-sm font-medium text-[#647084] transition hover:bg-[#F8FAFD] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="min-w-16 px-2 text-center text-sm text-[#647084]">
            {page} / {totalPages}
          </span>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
            className="min-h-10 rounded-lg border border-[#DCE3ED] bg-white px-4 text-sm font-medium text-[#647084] transition hover:bg-[#F8FAFD] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Cancel confirmation */}
      {cancelTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/50 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setCancelTarget(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-class-title"
            className="w-full max-w-md rounded-2xl border border-[#E5E9F0] bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-[#F04455]">
                <CircleX size={23} />
              </div>

              <button
                type="button"
                onClick={() => setCancelTarget(null)}
                aria-label="Close confirmation"
                className="rounded-lg p-2 text-[#94A3B8] transition hover:bg-[#F1F5F9]"
              >
                <X size={19} />
              </button>
            </div>

            <h3
              id="cancel-class-title"
              className="mt-5 text-xl font-semibold text-[#252B35]"
            >
              Cancel this class?
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#647084] sm:text-base">
              Are you sure you want to cancel{" "}
              <strong className="font-semibold text-[#303846]">
                {cancelTarget.student}
              </strong>{" "}
              with{" "}
              <strong className="font-semibold text-[#303846]">
                {cancelTarget.tutor}
              </strong>
              ? Students of this subject will be notified.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setCancelTarget(null)}
                className="min-h-11 rounded-lg border border-[#DCE3ED] px-5 text-sm font-medium text-[#596476] transition hover:bg-[#F8FAFD]"
              >
                Keep Class
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="min-h-11 rounded-lg bg-[#F04455] px-5 text-sm font-semibold text-white transition hover:bg-[#D93647] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
