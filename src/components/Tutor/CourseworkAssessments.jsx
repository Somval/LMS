
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  Plus,
  ChevronDown,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
} from "lucide-react";

import EditAssessmentModal from "../../components/Tutor/EditAssessmentModal";
import { api } from "../../lib/api";
import { fullDate } from "../../StudentPortal/classFormat";
const statuses = ["All Statuses", "Active", "Draft", "Grading", "Closed"];

const toLocalInput = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

// One table row from an API record.
const toRow = (w) => {
  const closed = w.dueAt && new Date(w.dueAt) < new Date();
  return {
    id: w.id,
    title: w.title,
    type: w.type === "QUIZ" ? "Quiz" : "Assignment",
    week: w.subject?.name ?? "General", // the "week" column now shows the subject
    availability: w.published ? "Published" : "Not published",
    deadline: w.dueAt ? fullDate(w.dueAt) : "No deadline",
    dueAt: w.dueAt,
    published: w.published,
    submissions: `${w._count?.submissions ?? 0}/${w.studentCount ?? 0}`,
    status: !w.published ? "Draft" : w.ungradedCount > 0 ? "Grading" : closed ? "Closed" : "Active",
  };
};

const ASSIGNMENT_PATH = "/assignment-quize/new";
const QUIZ_PATH = "/tutor/create-quize";

export default function App() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("All Subjects");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const reload = () =>
    api
      .get("/coursework")
      .then((list) => { setAssessments(list.map(toRow)); setLoadError(""); })
      .catch((err) => setLoadError(err.message || "Could not load your coursework."))
      .finally(() => setLoading(false));

  useEffect(() => { reload(); }, []);

  const weeks = ["All Subjects", ...new Set(assessments.map((a) => a.week))];
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const menuRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Close the action menu when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close toast timer when the component unmounts.
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = (message) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastMessage(message);

    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, 3000);
  };

  // VIEW: Navigate to the assessment details route.
  const openAssessmentDetails = (item) => {
    setActiveMenuId(null);

    navigate(`/tutor/assignment-quize/${encodeURIComponent(item.id)}`);
  };

  // EDIT: Open the imported modal without navigating.
  const handleEditAssessment = (item) => {
    setActiveMenuId(null);
    setSelectedAssessment({ ...item, dueInput: toLocalInput(item.dueAt) });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAssessment(null);
  };

  // Update the selected assessment inside the modal.
  const handleModalFieldChange = (field, value) => {
    setSelectedAssessment((previous) =>
      previous ? { ...previous, [field]: value } : null
    );
  };

  // Save the edited assessment to the current list.
  const handleSaveAssessment = async (event) => {
    event?.preventDefault?.();
    if (!selectedAssessment) return;
    const title = selectedAssessment.title?.trim() ?? "";
    if (!title) {
      showToast("Please enter an assessment title.");
      return;
    }
    try {
      await api.patch(`/coursework/${selectedAssessment.id}`, {
        title,
        dueAt: selectedAssessment.dueInput ? new Date(selectedAssessment.dueInput).toISOString() : null,
        published: selectedAssessment.published,
      });
      closeEditModal();
      showToast(`Successfully updated "${title}".`);
      reload();
    } catch (err) {
      showToast(err.message || "Could not save your changes.");
    }
  };

  // Closing stops new submissions by setting the deadline to now.
  const handleCloseAssessment = async (item) => {
    setActiveMenuId(null);
    try {
      await api.patch(`/coursework/${item.id}`, { dueAt: new Date().toISOString() });
      showToast(`Closed "${item.title}" to new submissions.`);
      reload();
    } catch (err) {
      showToast(err.message || "Could not close this assessment.");
    }
  };

  const filteredAssessments = assessments.filter((item) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Assignments" && item.type === "Assignment") ||
      (activeTab === "Quizzes" && item.type === "Quiz");

    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query);

    const matchesWeek =
      selectedWeek === "All Subjects" || item.week === selectedWeek;

    const matchesStatus =
      selectedStatus === "All Statuses" || item.status === selectedStatus;

    return matchesTab && matchesSearch && matchesWeek && matchesStatus;
  });

  return (
    <div className="relative min-h-screen w-full p-3 font-sans text-slate-800 antialiased sm:p-6 lg:p-8">
      {/* Toast notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 top-4 z-[80] flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-white shadow-2xl sm:right-6 sm:top-6"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Imported edit modal */}
      <EditAssessmentModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        assessment={selectedAssessment}
        onChange={handleModalFieldChange}
        onSave={handleSaveAssessment}
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <nav
            aria-label="Assessment categories"
            className="flex items-center gap-6 overflow-x-auto border-b border-slate-200 sm:gap-8 md:border-b-0"
          >
            {["All", "Assignments", "Quizzes"].map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={isActive}
                  className={`relative shrink-0 whitespace-nowrap pb-3 text-sm transition-colors sm:text-base md:pb-0 ${
                    isActive
                      ? "font-semibold text-blue-600"
                      : "font-medium text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-blue-600 md:hidden" />
                  )}

                  {isActive && (
                    <span className="absolute -bottom-3 left-0 right-0 hidden h-[3px] rounded-full bg-blue-600 md:block" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Create links */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              to={ASSIGNMENT_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-600 bg-white px-4 py-2.5 text-sm font-medium text-blue-600 shadow-sm transition hover:bg-blue-50 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Create Assignment</span>
            </Link>

            <Link
              to={QUIZ_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Create Quiz</span>
            </Link>
          </div>
        </header>

        {/* Search and filters */}
        <section className="mb-8 grid w-full grid-cols-1 items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-4 md:grid-cols-12">
          <div className="relative min-w-0 md:col-span-5">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search assignments or quizzes..."
              aria-label="Search assignments or quizzes"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-7 md:justify-end">
            {/* Week filter */}
            <div className="relative min-w-0 sm:justify-self-end sm:w-full sm:max-w-56">
              <button
                type="button"
                aria-expanded={isWeekDropdownOpen}
                aria-haspopup="listbox"
                onClick={() => {
                  setIsWeekDropdownOpen((open) => !open);
                  setIsStatusDropdownOpen(false);
                }}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <span className="truncate">{selectedWeek}</span>

                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                    isWeekDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isWeekDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Filter by week"
                  className="absolute right-0 z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-100 bg-white py-1 shadow-xl"
                >
                  {weeks.map((week) => (
                    <button
                      key={week}
                      type="button"
                      role="option"
                      aria-selected={selectedWeek === week}
                      onClick={() => {
                        setSelectedWeek(week);
                        setIsWeekDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-blue-50 hover:text-blue-600 ${
                        selectedWeek === week
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-700"
                      }`}
                    >
                      {week}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status filter */}
            <div className="relative min-w-0 sm:justify-self-end sm:w-full sm:max-w-56">
              <button
                type="button"
                aria-expanded={isStatusDropdownOpen}
                aria-haspopup="listbox"
                onClick={() => {
                  setIsStatusDropdownOpen((open) => !open);
                  setIsWeekDropdownOpen(false);
                }}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <span className="truncate">{selectedStatus}</span>

                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                    isStatusDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isStatusDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Filter by status"
                  className="absolute right-0 z-30 mt-2 w-full rounded-xl border border-slate-100 bg-white py-1 shadow-xl"
                >
                  {statuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      role="option"
                      aria-selected={selectedStatus === status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setIsStatusDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-blue-50 hover:text-blue-600 ${
                        selectedStatus === status
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-700"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Assessment table */}
        <section className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-5 sm:px-6">
            <h2 className="text-lg font-bold text-slate-900">
              Coursework &amp; Assessments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage your assignments and quizzes.
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th scope="col" className="whitespace-nowrap px-6 py-4">
                    Title
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-4">
                    Type
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-4">
                    Subject
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-4">
                    Availability
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-4">
                    Deadline
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-4">
                    Submissions
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredAssessments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      {loading ? "Loading…" : loadError || (assessments.length === 0 ? "No coursework yet. Create an assignment or quiz to get started." : "No coursework matches your filters.")}
                    </td>
                  </tr>
                ) : (
                  filteredAssessments.map((item) => {
                    const isMenuOpen = activeMenuId === item.id;

                    return (
                      <tr
                        key={item.id}
                        onClick={() => openAssessmentDetails(item)}
                        onKeyDown={(event) => {
                          if (
                            (event.key === "Enter" || event.key === " ") &&
                            event.target === event.currentTarget
                          ) {
                            event.preventDefault();
                            openAssessmentDetails(item);
                          }
                        }}
                        tabIndex={0}
                        aria-label={`View details for ${item.title}`}
                        className="group cursor-pointer transition-colors hover:bg-slate-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">
                          {item.title}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                              item.type === "Assignment"
                                ? "bg-blue-100/70 text-blue-700"
                                : "bg-purple-100/70 text-purple-700"
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-600">
                          {item.week}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                          {item.availability}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                          {item.deadline}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 font-bold text-slate-900">
                          {item.submissions}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                              item.status === "Active"
                                ? "bg-emerald-100/70 text-emerald-700"
                                : item.status === "Draft"
                                  ? "bg-slate-200/70 text-slate-600"
                                  : "bg-amber-100/70 text-amber-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td
                          className="relative whitespace-nowrap px-6 py-4 text-right"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <div
                            ref={isMenuOpen ? menuRef : null}
                            className="relative inline-block"
                          >
                            <button
                              type="button"
                              aria-label={`Actions for ${item.title}`}
                              aria-expanded={isMenuOpen}
                              aria-haspopup="menu"
                              onClick={() => {
                                setActiveMenuId((currentId) =>
                                  currentId === item.id ? null : item.id
                                );
                              }}
                              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-200/50 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>

                            {isMenuOpen && (
                              <div
                                role="menu"
                                className="absolute right-0 top-10 z-30 w-44 rounded-xl border border-slate-100 bg-white py-1.5 text-left shadow-xl"
                              >
                                <button
                                  type="button"
                                  role="menuitem"
                                  onClick={() =>
                                    openAssessmentDetails(item)
                                  }
                                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                                >
                                  <Eye className="h-3.5 w-3.5 text-slate-400" />
                                  <span>View Details</span>
                                </button>

                                <button
                                  type="button"
                                  role="menuitem"
                                  onClick={() => handleEditAssessment(item)}
                                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                                >
                                  <Edit3 className="h-3.5 w-3.5 text-slate-400" />
                                  <span>Edit</span>
                                </button>

                                <div className="my-1 h-px bg-slate-100" />

                                <button
                                  type="button"
                                  role="menuitem"
                                  onClick={() => handleCloseAssessment(item)}
                                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50"
                                >
                                  <Trash2 className="h-3.5 w-3.5 text-rose-500" />
                                  <span>Close submissions</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>
              Showing{" "}
              <strong className="text-slate-700">
                {filteredAssessments.length}
              </strong>{" "}
              of{" "}
              <strong className="text-slate-700">
                {assessments.length}
              </strong>{" "}
              entries
            </span>

            <span className="font-medium text-slate-600">Page 1 of 1</span>
          </div>
        </section>
      </div>
    </div>
  );
}
