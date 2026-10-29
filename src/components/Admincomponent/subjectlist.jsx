import React, { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  Pencil,
  Power,
  Trash2,
  BookOpen,
  Languages,
  Atom,
  X,
} from "lucide-react";
import EditSubject from "../Admincomponent/Editsubjects";

/* -------------------------------------------------------
   SUBJECT DATA
------------------------------------------------------- */

const initialSubjects = [
  {
    id: 1,
    name: "Mathematics - Year 1",
    category: "Mathematics",
    year: "Year 1",
    description: "Build problem-solving and critical thinking skills.",
    availableTutors: 12,
    enrolledStudents: 145,
    classesHeld: 320,
    status: "Active",
  },
  {
    id: 2,
    name: "Mathematics - Year 2",
    category: "Mathematics",
    year: "Year 2",
    description: "Build problem-solving and critical thinking skills.",
    availableTutors: 12,
    enrolledStudents: 145,
    classesHeld: 320,
    status: "Active",
  },
  {
    id: 3,
    name: "Mathematics - Year 3",
    category: "Mathematics",
    year: "Year 3",
    description: "Build problem-solving and critical thinking skills.",
    availableTutors: 12,
    enrolledStudents: 145,
    classesHeld: 320,
    status: "Active",
  },
  {
    id: 4,
    name: "English - Year 1",
    category: "English",
    year: "Year 1",
    description: "Develop reading, writing and communication skills.",
    availableTutors: 12,
    enrolledStudents: 145,
    classesHeld: 320,
    status: "Active",
  },
  {
    id: 5,
    name: "English - Year 2",
    category: "English",
    year: "Year 2",
    description: "Develop reading, writing and communication skills.",
    availableTutors: 12,
    enrolledStudents: 145,
    classesHeld: 320,
    status: "Inactive",
  },
  {
    id: 6,
    name: "English - Year 3",
    category: "English",
    year: "Year 3",
    description: "Develop reading, writing and communication skills.",
    availableTutors: 12,
    enrolledStudents: 145,
    classesHeld: 320,
    status: "Active",
  },
  {
    id: 7,
    name: "Science - Year 1",
    category: "Science",
    year: "Year 1",
    description: "Explore the natural world through experiments.",
    availableTutors: 12,
    enrolledStudents: 145,
    classesHeld: 320,
    status: "Active",
  },
  {
    id: 8,
    name: "Science - Year 2",
    category: "Science",
    year: "Year 2",
    description: "Explore the natural world through experiments.",
    availableTutors: 12,
    enrolledStudents: 145,
    classesHeld: 320,
    status: "Active",
  },
];

/* -------------------------------------------------------
   SUBJECT ICONS
   Each icon is a valid React component.
------------------------------------------------------- */

const subjectStyles = {
  Mathematics: {
    Icon: BookOpen,
    color: "bg-[#35358B]",
  },
  English: {
    Icon: Languages,
    color: "bg-[#E9D207]",
  },
  Science: {
    Icon: Atom,
    color: "bg-[#08CC55]",
  },
};

/* Custom English book icon using inline SVG.
   This is a React component, not a JSX object stored
   directly inside the icon configuration. */

function EnglishBookIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 34 34"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="34" height="34" rx="6" fill="#E9D207" />

      <path
        d="M17 11.1C15.5 9.8 13.5 9 11.5 9C9.9 9 8.4 9.4 7 10.1V24C8.5 23.2 10 22.8 11.5 22.8C13.6 22.8 15.5 23.6 17 24.9C18.5 23.6 20.4 22.8 22.5 22.8C24 22.8 25.5 23.2 27 24V10.1C25.6 9.4 24.1 9 22.5 9C20.5 9 18.5 9.8 17 11.1Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M17 11.1V24.9M10.3 13.2C11.7 13.1 13.1 13.5 14.2 14.2M10.3 16.5C11.7 16.4 13.1 16.8 14.2 17.5M19.8 14.2C20.9 13.5 22.3 13.1 23.7 13.2M19.8 17.5C20.9 16.8 22.3 16.4 23.7 16.5"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SubjectIcon({ category, size = "normal" }) {
  if (category === "English") {
    return (
      <span
        className={`block shrink-0 overflow-hidden rounded-md ${
          size === "large" ? "h-9 w-9" : "h-8 w-8"
        }`}
        aria-label="English"
      >
        <EnglishBookIcon />
      </span>
    );
  }

  const style = subjectStyles[category] || subjectStyles.Mathematics;
  const Icon = style.Icon;

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-md text-white ${
        size === "large" ? "h-9 w-9" : "h-8 w-8"
      } ${style.color}`}
      aria-hidden="true"
    >
      <Icon size={size === "large" ? 20 : 18} strokeWidth={1.8} />
    </span>
  );
}

/* -------------------------------------------------------
   SHARED STYLES
------------------------------------------------------- */

const inputClass =
  "h-11 w-full min-w-0 rounded-md border border-[#E2E6EC] bg-white px-3 text-sm text-[#252A32] outline-none transition placeholder:text-[#9299A4] focus:border-[#159A42] focus:ring-2 focus:ring-[#159A42]/10";

/* -------------------------------------------------------
   STATUS BADGE
------------------------------------------------------- */

function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex min-w-[68px] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold leading-4 ${
        active
          ? "bg-[#DDF5E5] text-[#078A39]"
          : "bg-[#F9DFDC] text-[#D9362B]"
      }`}
    >
      {status}
    </span>
  );
}

/* -------------------------------------------------------
   SUBJECT ACTION MENU
------------------------------------------------------- */

function SubjectActions({
  subject,
  onEdit,
  onToggleStatus,
  onDelete,
  onClose,
}) {
  return (
    <div
      role="menu"
      aria-label={`Actions for ${subject.name}`}
      className="absolute right-0 top-full z-50 mt-1.5 w-[205px] max-w-[calc(100vw-32px)] rounded-lg border border-[#E5E9EF] bg-white p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.13)]"
    >
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onClose();
          onEdit(subject);
        }}
        className="flex min-h-11 w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-[#626B78] transition hover:bg-[#F3F6FA] hover:text-[#20252D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
      >
        <Pencil size={16} className="shrink-0" />
        Edit Subject
      </button>

      <button
        type="button"
        role="menuitem"
        onClick={() => onToggleStatus(subject)}
        className="flex min-h-11 w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-[#626B78] transition hover:bg-[#F3F6FA] hover:text-[#20252D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
      >
        <Power size={16} className="shrink-0" />
        {subject.status === "Active" ? "Deactivate" : "Activate"} Subject
      </button>

      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onClose();
          onDelete(subject);
        }}
        className="flex min-h-11 w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-[#E53935] transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      >
        <Trash2 size={16} className="shrink-0" />
        Delete Subject
      </button>
    </div>
  );
}

/* -------------------------------------------------------
   DELETE CONFIRMATION
------------------------------------------------------- */

function DeleteConfirmation({ subject, onCancel, onConfirm }) {
  if (!subject) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-subject-title"
        className="my-auto w-full max-w-[420px] rounded-xl border border-[#E8EBF0] bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-500">
            <Trash2 size={21} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close confirmation"
            className="rounded-md p-2 text-[#7B8491] transition hover:bg-[#F3F5F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
          >
            <X size={19} />
          </button>
        </div>

        <h3
          id="delete-subject-title"
          className="mt-4 text-lg font-semibold text-[#20252D]"
        >
          Delete subject?
        </h3>

        <p className="mt-2 break-words text-sm leading-6 text-[#737D88]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#20252D]">
            {subject.name}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 rounded-md border border-[#E1E5EB] px-4 text-sm font-medium text-[#505966] transition hover:bg-[#F7F8FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 rounded-md bg-[#E53935] px-4 text-sm font-medium text-white transition hover:bg-[#C62828] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Delete Subject
          </button>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------
   SUBJECTS PAGE
------------------------------------------------------- */

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Subjects");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteSubject, setDeleteSubject] = useState(null);

  const filteredSubjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return subjects.filter((subject) => {
      const searchableText = [
        subject.name,
        subject.description,
        subject.category,
        subject.year,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      const matchesCategory =
        categoryFilter === "All Subjects" ||
        subject.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All Statuses" ||
        subject.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [subjects, search, categoryFilter, statusFilter]);

  const handleEdit = (subject) => {
    setSelectedSubject({ ...subject });
    setIsEditOpen(true);
    setOpenMenuId(null);
  };

  const handleSave = (updatedSubject) => {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === updatedSubject.id
          ? { ...subject, ...updatedSubject }
          : subject
      )
    );

    setIsEditOpen(false);
    setSelectedSubject(null);
  };

  const handleToggleStatus = (subject) => {
    setSubjects((current) =>
      current.map((item) =>
        item.id === subject.id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );

    setOpenMenuId(null);
  };

  const handleDelete = () => {
    if (!deleteSubject) return;

    setSubjects((current) =>
      current.filter((subject) => subject.id !== deleteSubject.id)
    );

    setDeleteSubject(null);
    setOpenMenuId(null);
  };

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("All Subjects");
    setStatusFilter("All Statuses");
    setOpenMenuId(null);
  };

  const renderActions = (subject) => (
    <div className="relative shrink-0">
      <button
        type="button"
        aria-label={`Open actions for ${subject.name}`}
        aria-haspopup="menu"
        aria-expanded={openMenuId === subject.id}
        onClick={() =>
          setOpenMenuId((current) =>
            current === subject.id ? null : subject.id
          )
        }
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#687482] transition hover:bg-[#EEF3F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
      >
        <MoreVertical size={19} />
      </button>

      {openMenuId === subject.id && (
        <SubjectActions
          subject={subject}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
          onDelete={setDeleteSubject}
          onClose={() => setOpenMenuId(null)}
        />
      )}
    </div>
  );

  return (
    <main
      className="w-full min-w-0 bg-[#F5F7FD] p-2 sm:p-4"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpenMenuId(null);
          setDeleteSubject(null);
          if (isEditOpen) {
            setIsEditOpen(false);
            setSelectedSubject(null);
          }
        }
      }}
    >
      <section className="w-full min-w-0 rounded-lg border border-[#E9ECF1] bg-white p-3 sm:p-4">
        {/* Search and Filters */}
        <div className="mb-4 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(150px,0.43fr)_minmax(150px,0.43fr)]">
          <label className="relative block min-w-0">
            <Search
              size={17}
              strokeWidth={1.7}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9199A5]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search subjects or levels..."
              aria-label="Search subjects or levels"
              className={`${inputClass} pl-10`}
            />
          </label>

          <label className="relative block min-w-0">
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              aria-label="Filter by subject"
              className={`${inputClass} appearance-none pr-9`}
            >
              <option>All Subjects</option>
              <option>Mathematics</option>
              <option>English</option>
              <option>Science</option>
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8993A1]"
            />
          </label>

          <label className="relative block min-w-0">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
              className={`${inputClass} appearance-none pr-9`}
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8993A1]"
            />
          </label>
        </div>

        {/* Desktop Table */}
        <div className="hidden w-full min-w-0 md:block">
          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[20%]" />
                <col className="w-[19%]" />
                <col className="w-[15%]" />
                <col className="w-[16%]" />
                <col className="w-[13%]" />
                <col className="w-[10%]" />
                <col className="w-[7%]" />
              </colgroup>

              <thead>
                <tr className="h-11 bg-[#EEF3F9] text-[#45505E]">
                  {[
                    "Subject",
                    "Description",
                    "Available Tutors",
                    "Enrolled Students",
                    "Classes Held",
                    "Status",
                    "",
                  ].map((heading, index) => (
                    <th
                      key={heading || `actions-${index}`}
                      scope="col"
                      className="px-2.5 text-xs font-semibold leading-4 lg:px-3 lg:text-[13px]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredSubjects.map((subject, index) => {
                  const previous = filteredSubjects[index - 1];
                  const groupStarts =
                    index > 0 &&
                    previous &&
                    previous.category !== subject.category;

                  return (
                    <React.Fragment key={subject.id}>
                      {groupStarts && (
                        <tr aria-hidden="true">
                          <td colSpan={7} className="h-7 p-0">
                            <div className="h-4 rounded-full bg-[#EEF3F9]" />
                          </td>
                        </tr>
                      )}

                      <tr className="h-[62px] border-b border-[#F0F1F4] last:border-b-0 hover:bg-[#FCFDFE]">
                        <td className="px-2.5 py-3 lg:px-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <SubjectIcon category={subject.category} />

                            <span className="break-words text-xs font-semibold leading-5 text-[#292D35] lg:text-[13px]">
                              {subject.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-2.5 py-3 lg:px-3">
                          <p className="line-clamp-2 text-xs leading-[1.6] text-[#69737F] lg:text-[13px]">
                            {subject.description}
                          </p>
                        </td>

                        <td className="px-2.5 py-3 text-sm font-medium text-[#66717F] lg:px-3">
                          {subject.availableTutors}
                        </td>

                        <td className="px-2.5 py-3 text-sm font-medium text-[#66717F] lg:px-3">
                          {subject.enrolledStudents}
                        </td>

                        <td className="px-2.5 py-3 text-sm font-medium text-[#66717F] lg:px-3">
                          {subject.classesHeld}
                        </td>

                        <td className="px-2.5 py-3 lg:px-3">
                          <StatusBadge status={subject.status} />
                        </td>

                        <td className="px-1.5 text-center">
                          {renderActions(subject)}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 md:hidden">
          {filteredSubjects.map((subject, index) => {
            const previous = filteredSubjects[index - 1];
            const groupStarts =
              index > 0 &&
              previous &&
              previous.category !== subject.category;

            return (
              <React.Fragment key={subject.id}>
                {groupStarts && (
                  <div
                    aria-hidden="true"
                    className="h-3 rounded-full bg-[#EEF3F9]"
                  />
                )}

                <article className="min-w-0 rounded-lg border border-[#E8EBF0] bg-white p-4 transition hover:border-[#D9E2EB]">
                  <div className="flex min-w-0 items-start gap-3">
                    <SubjectIcon category={subject.category} size="large" />

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-sm font-semibold leading-5 text-[#292D35]">
                        {subject.name}
                      </h3>

                      <p className="mt-1.5 text-sm leading-5 text-[#69737F]">
                        {subject.description}
                      </p>
                    </div>

                    {renderActions(subject)}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-[#F0F1F4] pt-4">
                    <div className="min-w-0">
                      <p className="text-xs leading-5 text-[#89919D]">
                        Available Tutors
                      </p>
                      <p className="mt-1 text-base font-semibold text-[#343A44]">
                        {subject.availableTutors}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs leading-5 text-[#89919D]">
                        Enrolled Students
                      </p>
                      <p className="mt-1 text-base font-semibold text-[#343A44]">
                        {subject.enrolledStudents}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs leading-5 text-[#89919D]">
                        Classes Held
                      </p>
                      <p className="mt-1 text-base font-semibold text-[#343A44]">
                        {subject.classesHeld}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="mb-2 text-xs leading-5 text-[#89919D]">
                        Status
                      </p>
                      <StatusBadge status={subject.status} />
                    </div>
                  </div>
                </article>
              </React.Fragment>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSubjects.length === 0 && (
          <div className="flex min-h-[190px] flex-col items-center justify-center px-4 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF3F9]">
              <Search size={22} className="text-[#89919D]" />
            </div>

            <p className="mt-4 text-base font-semibold text-[#394150]">
              No subjects found
            </p>

            <p className="mt-1 text-sm leading-5 text-[#89919D]">
              Try another search term or clear your filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 text-sm font-semibold text-[#159A42] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Separate Edit Component */}
      <EditSubject
        isOpen={isEditOpen}
        subject={selectedSubject}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedSubject(null);
        }}
        onSave={handleSave}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        subject={deleteSubject}
        onCancel={() => setDeleteSubject(null)}
        onConfirm={handleDelete}
      />
    </main>
  );
}