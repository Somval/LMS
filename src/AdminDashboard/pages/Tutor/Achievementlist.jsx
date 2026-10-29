import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  ChevronDown,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  X,
  CalendarDays,
  UsersRound,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

import ImageBatch from "../../../assets/images/134a082cca973150969aa91355d8ac63a4934a6a.png";

// Import the separate create-achievement modal
import CreateAchievementModal from "../../../components/Admincomponent/CreateAchievementModal";

const initialAchievements = [
  {
    id: 1,
    name: "Perfect Attendance",
    subject: "Mathematics",
    description: "Awarded for consistent improvement in quiz scores.",
    studentsEarned: 8,
    dateCreated: "May 20, 2025",
    status: "Active",
  },
  {
    id: 2,
    name: "Perfect Attendance",
    subject: "Mathematics",
    description: "Awarded for consistent improvement in quiz scores.",
    studentsEarned: 8,
    dateCreated: "May 20, 2025",
    status: "Active",
  },
  {
    id: 3,
    name: "Perfect Attendance",
    subject: "Mathematics",
    description: "Awarded for consistent improvement in quiz scores.",
    studentsEarned: 8,
    dateCreated: "May 20, 2025",
    status: "Active",
  },
  {
    id: 4,
    name: "Perfect Attendance",
    subject: "Mathematics",
    description: "Awarded for consistent improvement in quiz scores.",
    studentsEarned: 8,
    dateCreated: "May 20, 2025",
    status: "Active",
  },
];

const subjects = ["All Subjects", "Mathematics", "English", "Science"];

const emptyAchievement = {
  name: "",
  subject: "Mathematics",
  description: "",
};

function AchievementBadge({ size = "default" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl bg-[#E8EFFD] ${
        size === "large" ? "h-12 w-12" : "h-10 w-10"
      }`}
    >
      <img
        src={ImageBatch}
        alt=""
        aria-hidden="true"
        className="h-7 w-7 object-contain"
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isActive
          ? "bg-[#DDF7E5] text-[#0AA84F]"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-[#10B981]" : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}

function AchievementActions({
  achievement,
  openMenu,
  setOpenMenu,
  onView,
  onTemplate,
  onDelete,
}) {
  const isOpen = openMenu === achievement.id;

  return (
    <div className="relative flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={() => onView(achievement)}
        className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[#8793E8] px-3 text-xs font-semibold text-[#5261C9] transition hover:bg-[#F0F2FF] focus:outline-none focus:ring-2 focus:ring-[#8793E8]/30"
      >
        View
      </button>

      <button
        type="button"
        onClick={() => setOpenMenu(isOpen ? null : achievement.id)}
        aria-label={`Actions for ${achievement.name}`}
        aria-expanded={isOpen}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        <MoreVertical size={19} />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close actions menu"
            className="fixed inset-0 z-20 cursor-default"
            onClick={() => setOpenMenu(null)}
          />

          <div className="absolute right-0 top-10 z-30 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
            <button
              type="button"
              onClick={() => onView(achievement)}
              className="flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <Eye size={16} />
              View details
            </button>

            <button
              type="button"
              onClick={() => onTemplate(achievement)}
              className="flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil size={16} />
              Use as template
            </button>

            <button
              type="button"
              onClick={() => onDelete(achievement.id)}
              className="flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ModalShell({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-slate-950/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievement-modal-title"
        className="my-auto max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-6"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2
            id="achievement-modal-title"
            className="text-lg font-semibold tracking-tight text-[#111827] sm:text-xl"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default function Achievements() {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newAchievement, setNewAchievement] = useState(emptyAchievement);

  const filteredAchievements = useMemo(() => {
    const query = search.trim().toLowerCase();

    return achievements.filter((achievement) => {
      const matchesSearch =
        achievement.name.toLowerCase().includes(query) ||
        achievement.subject.toLowerCase().includes(query) ||
        achievement.description.toLowerCase().includes(query);

      const matchesSubject =
        subject === "All Subjects" || achievement.subject === subject;

      return matchesSearch && matchesSubject;
    });
  }, [achievements, search, subject]);

  // Create a new achievement from the separate modal form.
  const handleCreate = (formData) => {
    const name = formData.name?.trim();

    if (!name) return;

    const achievement = {
      id: Date.now(),
      name,
      subject: formData.subject || "Mathematics",
      description:
        formData.description?.trim() ||
        "Achievement awarded for outstanding student performance.",
      studentsEarned: 0,
      dateCreated: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "Active",
    };

    setAchievements((previous) => [achievement, ...previous]);
    setNewAchievement(emptyAchievement);
    setShowCreateModal(false);
    setOpenMenu(null);
  };

  const handleDelete = (id) => {
    setAchievements((previous) =>
      previous.filter((achievement) => achievement.id !== id)
    );

    setOpenMenu(null);

    if (selectedAchievement?.id === id) {
      setSelectedAchievement(null);
    }
  };

  const handleView = (achievement) => {
    setSelectedAchievement(achievement);
    setOpenMenu(null);
  };

  const handleTemplate = (achievement) => {
    setNewAchievement({
      name: achievement.name,
      subject: achievement.subject,
      description: achievement.description,
    });

    setSelectedAchievement(null);
    setOpenMenu(null);
    setShowCreateModal(true);
  };

  const handleOpenCreateModal = () => {
    setNewAchievement(emptyAchievement);
    setOpenMenu(null);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewAchievement(emptyAchievement);
  };

  return (
    <section className="box-border min-h-full w-full min-w-0 p-2 sm:p-4">
      <div className="mx-auto box-border w-full max-w-[1066px] min-w-0 rounded-xl border border-[#E8EAF0] bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.025)] sm:p-5 lg:p-6">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#111827] sm:text-2xl">
                Achievements
              </h1>
            </div>

            <p className="mt-2 text-sm leading-5 text-[#64748B]">
              Manage and track student achievements.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-[#86EFB2] bg-white px-4 py-2.5 text-sm font-semibold text-[#0BCB69] transition hover:bg-[#F0FFF6] focus:outline-none focus:ring-2 focus:ring-[#86EFB2] sm:min-h-10 sm:w-auto"
          >
            <Plus size={18} strokeWidth={2} />
            Create Achievement
          </button>
        </div>

        {/* Search and filter */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_190px]">
          <div className="relative min-w-0">
            <Search
              size={18}
              strokeWidth={1.7}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search achievements..."
              aria-label="Search achievements"
              className="h-11 w-full rounded-lg border border-[#E3E5EB] bg-white pl-10 pr-3 text-sm text-[#334155] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#86EFB2] focus:ring-4 focus:ring-[#0FEE7F]/10"
            />
          </div>

          <div className="relative min-w-0">
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              aria-label="Filter by subject"
              className="h-11 w-full appearance-none rounded-lg border border-[#E3E5EB] bg-white px-3.5 pr-10 text-sm text-[#334155] outline-none transition focus:border-[#86EFB2] focus:ring-4 focus:ring-[#0FEE7F]/10"
            >
              {subjects.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />
          </div>
        </div>

        {/* Results summary */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-[#334155]">
            Achievement list
          </p>

          <p className="text-xs text-[#64748B]">
            {filteredAchievements.length}{" "}
            {filteredAchievements.length === 1 ? "result" : "results"}
          </p>
        </div>

        {/* Desktop and tablet table */}
        <div className="mt-3 hidden w-full min-w-0 overflow-visible rounded-xl border border-[#E8EDF4] md:block">
          <div className="w-full overflow-x-auto rounded-xl">
            <table className="w-full min-w-[850px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[19%]" />
                <col className="w-[13%]" />
                <col className="w-[19%]" />
                <col className="w-[12%]" />
                <col className="w-[14%]" />
                <col className="w-[9%]" />
                <col className="w-[14%]" />
              </colgroup>

              <thead>
                <tr className="h-12 bg-[#EEF3F9] text-xs text-[#334155]">
                  <th className="px-3 font-semibold">Achievement Name</th>
                  <th className="px-3 font-semibold">Subject</th>
                  <th className="px-3 font-semibold">Description</th>
                  <th className="px-3 font-semibold">Students Earned</th>
                  <th className="px-3 font-semibold">Date Created</th>
                  <th className="px-3 font-semibold">Status</th>
                  <th className="px-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#EEF0F4]">
                {filteredAchievements.map((achievement) => (
                  <tr
                    key={achievement.id}
                    className="transition-colors hover:bg-[#FAFBFE]"
                  >
                    <td className="px-3 py-4">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <AchievementBadge />

                        <span className="break-words text-xs font-semibold leading-5 text-[#111827]">
                          {achievement.name}
                        </span>
                      </div>
                    </td>

                    <td className="break-words px-3 py-4 text-xs leading-5 text-[#475569]">
                      {achievement.subject}
                    </td>

                    <td className="px-3 py-4">
                      <p className="break-words text-xs leading-5 text-[#64748B]">
                        {achievement.description}
                      </p>
                    </td>

                    <td className="px-3 py-4 text-xs text-[#475569]">
                      {achievement.studentsEarned}
                    </td>

                    <td className="px-3 py-4 text-xs leading-5 text-[#475569]">
                      {achievement.dateCreated}
                    </td>

                    <td className="px-3 py-4">
                      <StatusBadge status={achievement.status} />
                    </td>

                    <td className="px-3 py-4">
                      <AchievementActions
                        achievement={achievement}
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
                        onView={handleView}
                        onTemplate={handleTemplate}
                        onDelete={handleDelete}
                      />
                    </td>
                  </tr>
                ))}

                {filteredAchievements.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-14 text-center text-sm text-[#64748B]"
                    >
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <Search size={28} className="mb-3 text-slate-300" />
                        <p className="font-semibold text-slate-700">
                          No achievements found
                        </p>
                        <p className="mt-1 leading-5">
                          Try another search term or select a different
                          subject.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile achievement cards */}
        <div className="mt-3 grid min-w-0 grid-cols-1 gap-3 md:hidden">
          {filteredAchievements.map((achievement) => (
            <article
              key={achievement.id}
              className="min-w-0 rounded-xl border border-[#E8EDF4] bg-white p-3.5 transition hover:border-[#D8E0ED] sm:p-4"
            >
              <div className="flex min-w-0 items-start gap-3">
                <AchievementBadge size="large" />

                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="break-words text-sm font-semibold leading-5 text-[#111827]">
                    {achievement.name}
                  </h3>

                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#64748B]">
                    <BookOpen size={14} className="shrink-0" />
                    <span className="break-words">{achievement.subject}</span>
                  </p>
                </div>

                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === achievement.id ? null : achievement.id
                      )
                    }
                    aria-label={`Actions for ${achievement.name}`}
                    aria-expanded={openMenu === achievement.id}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100"
                  >
                    <MoreVertical size={19} />
                  </button>

                  {openMenu === achievement.id && (
                    <>
                      <button
                        type="button"
                        aria-label="Close actions menu"
                        className="fixed inset-0 z-20 cursor-default"
                        onClick={() => setOpenMenu(null)}
                      />

                      <div className="absolute right-0 top-10 z-30 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                        <button
                          type="button"
                          onClick={() => handleView(achievement)}
                          className="flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <Eye size={16} />
                          View details
                        </button>

                        <button
                          type="button"
                          onClick={() => handleTemplate(achievement)}
                          className="flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <Pencil size={16} />
                          Use as template
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(achievement.id)}
                          className="flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <p className="mt-4 break-words text-xs leading-5 text-[#64748B]">
                {achievement.description}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-[#F8FAFC] p-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#64748B]">
                    <UsersRound size={13} />
                    Students earned
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#111827]">
                    {achievement.studentsEarned}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#64748B]">
                    <CalendarDays size={13} />
                    Date created
                  </p>

                  <p className="mt-1 break-words text-xs font-medium leading-5 text-[#334155]">
                    {achievement.dateCreated}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <StatusBadge status={achievement.status} />

                <button
                  type="button"
                  onClick={() => handleView(achievement)}
                  className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[#8793E8] px-3.5 text-xs font-semibold text-[#5261C9] transition hover:bg-[#F0F2FF]"
                >
                  <Eye size={14} />
                  View details
                </button>
              </div>
            </article>
          ))}

          {filteredAchievements.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-12 text-center">
              <Search size={28} className="mx-auto mb-3 text-slate-300" />

              <p className="text-sm font-semibold text-slate-700">
                No achievements found
              </p>

              <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-500">
                Try another search term or select a different subject.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Separate Create Achievement Modal */}
      <CreateAchievementModal
        isOpen={showCreateModal}
        onClose={handleCloseCreateModal}
        onCreate={handleCreate}
        initialValues={newAchievement}
      />

      {/* Achievement details modal */}
      {selectedAchievement && (
        <ModalShell
          title="Achievement Details"
          onClose={() => setSelectedAchievement(null)}
        >
          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-[#FAFBFE] p-3.5">
            <AchievementBadge size="large" />

            <div className="min-w-0">
              <h3 className="break-words text-base font-semibold text-[#111827]">
                {selectedAchievement.name}
              </h3>

              <p className="mt-1 text-sm text-[#64748B]">
                {selectedAchievement.subject}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Description
            </p>

            <p className="mt-2 break-words text-sm leading-6 text-[#475569]">
              {selectedAchievement.description}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
            <div className="min-w-0 rounded-xl border border-slate-100 bg-[#F8FAFC] p-3.5 sm:p-4">
              <p className="flex items-center gap-2 text-xs leading-5 text-[#64748B]">
                <UsersRound size={15} />
                Students Earned
              </p>

              <p className="mt-2 text-2xl font-bold text-[#111827]">
                {selectedAchievement.studentsEarned}
              </p>
            </div>

            <div className="min-w-0 rounded-xl border border-slate-100 bg-[#F8FAFC] p-3.5 sm:p-4">
              <p className="flex items-center gap-2 text-xs leading-5 text-[#64748B]">
                <CalendarDays size={15} />
                Date Created
              </p>

              <p className="mt-2 break-words text-sm font-semibold leading-5 text-[#111827]">
                {selectedAchievement.dateCreated}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Status
            </p>

            <StatusBadge status={selectedAchievement.status} />
          </div>

          <button
            type="button"
            onClick={() => setSelectedAchievement(null)}
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0FEE7F] px-4 text-sm font-semibold text-[#064E3B] transition hover:bg-[#0DDC73] focus:outline-none focus:ring-4 focus:ring-[#0FEE7F]/20"
          >
            <CheckCircle2 size={17} />
            Close Details
          </button>
        </ModalShell>
      )}
    </section>
  );
}