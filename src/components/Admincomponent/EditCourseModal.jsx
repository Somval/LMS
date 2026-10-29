
import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10";

export default function EditCourseModal({
  course,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    title: "",
    level: "",
    assignedTutor: "",
    scheduleDays: "",
    scheduleTime: "",
    status: "Not Scheduled",
  });

  useEffect(() => {
    if (!course) return;

    setForm({
      title: course.title || "",
      level: course.level || "",
      assignedTutor: course.assignedTutor || "",
      scheduleDays:
        course.scheduleDays === "Not Scheduled"
          ? ""
          : course.scheduleDays || "",
      scheduleTime:
        course.scheduleTime === "Not Scheduled"
          ? ""
          : course.scheduleTime || "",
      status: course.status || "Not Scheduled",
    });
  }, [course]);

  if (!course) return null;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      ...course,
      ...form,
      scheduleDays: form.scheduleDays.trim() || "Not Scheduled",
      scheduleTime: form.scheduleTime.trim() || "Not Scheduled",
      status:
        form.status === "Scheduled" &&
        (!form.scheduleDays.trim() || !form.scheduleTime.trim())
          ? "Not Scheduled"
          : form.status,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-course-title"
        className="flex max-h-[calc(100dvh-24px)] w-full max-w-[540px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:max-h-[calc(100dvh-40px)]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <Pencil size={13} />
              Course management
            </div>
            <h2
              id="edit-course-title"
              className="text-xl font-bold tracking-tight text-slate-900"
            >
              Edit Course
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update the course details below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-7">
            <div>
              <label
                htmlFor="edit-title"
                className="text-sm font-semibold text-slate-700"
              >
                Subject title
              </label>
              <input
                id="edit-title"
                name="title"
                value={form.title}
                onChange={updateField}
                required
                className={inputClass}
                placeholder="e.g. Mathematics"
              />
            </div>

            <div>
              <label
                htmlFor="edit-level"
                className="text-sm font-semibold text-slate-700"
              >
                Year / Level
              </label>
              <input
                id="edit-level"
                name="level"
                value={form.level}
                onChange={updateField}
                required
                className={inputClass}
                placeholder="e.g. Year 4"
              />
            </div>

            <div>
              <label
                htmlFor="edit-tutor"
                className="text-sm font-semibold text-slate-700"
              >
                Assigned tutor
              </label>
              <select
                id="edit-tutor"
                name="assignedTutor"
                value={form.assignedTutor}
                onChange={updateField}
                className={inputClass}
                required
              >
                {(course.availableTutors || []).map((tutor) => (
                  <option key={tutor} value={tutor}>
                    {tutor}
                  </option>
                ))}
                {form.assignedTutor &&
                  !(course.availableTutors || []).includes(
                    form.assignedTutor
                  ) && (
                    <option value={form.assignedTutor}>
                      {form.assignedTutor}
                    </option>
                  )}
              </select>
            </div>

            <div>
              <label
                htmlFor="edit-days"
                className="text-sm font-semibold text-slate-700"
              >
                Schedule days
              </label>
              <input
                id="edit-days"
                name="scheduleDays"
                value={form.scheduleDays}
                onChange={updateField}
                className={inputClass}
                placeholder="e.g. Monday, Wednesday"
              />
            </div>

            <div>
              <label
                htmlFor="edit-time"
                className="text-sm font-semibold text-slate-700"
              >
                Schedule time
              </label>
              <input
                id="edit-time"
                name="scheduleTime"
                value={form.scheduleTime}
                onChange={updateField}
                className={inputClass}
                placeholder="e.g. 10:00 AM – 11:00 AM"
              />
            </div>

            <div>
              <label
                htmlFor="edit-status"
                className="text-sm font-semibold text-slate-700"
              >
                Status
              </label>
              <select
                id="edit-status"
                name="status"
                value={form.status}
                onChange={updateField}
                className={inputClass}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Not Scheduled">Not Scheduled</option>
              </select>
            </div>
          </div>

          <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#084518] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#063512] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              <Pencil size={15} />
              Save Changes
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
