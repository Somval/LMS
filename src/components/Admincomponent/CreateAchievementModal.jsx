
import React, { useEffect, useState } from "react";
import {
  X,
  Plus,
  ChevronDown,
  Award,
  BookOpen,
  FileText,
} from "lucide-react";

const subjects = ["Mathematics", "English", "Science"];

const emptyForm = {
  name: "",
  subject: "Mathematics",
  description: "",
};

export default function CreateAchievementModal({
  isOpen,
  onClose,
  onCreate,
  initialValues,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...emptyForm,
        ...(initialValues || {}),
      });
      setError("");
    }
  }, [isOpen, initialValues]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();

    if (!name) {
      setError("Please enter an achievement name.");
      return;
    }

    onCreate({
      name,
      subject: formData.subject,
      description: formData.description.trim(),
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-slate-950/45 p-0 backdrop-blur-[3px] sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-achievement-title"
        className="my-auto flex max-h-[94dvh] w-full max-w-[520px] flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        {/* Modal header */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Award size={22} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h2
                id="create-achievement-title"
                className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
              >
                Create Achievement
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Create a new achievement to recognize student progress.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
            {/* Achievement name */}
            <div>
              <label
                htmlFor="achievement-name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Achievement Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="achievement-name"
                name="name"
                type="text"
                autoFocus
                required
                maxLength={100}
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Perfect Attendance"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />

              {error && (
                <p role="alert" className="mt-2 text-xs font-medium text-red-600">
                  {error}
                </p>
              )}

              <p className="mt-1.5 text-xs text-slate-400">
                Choose a short, meaningful title for the achievement.
              </p>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="achievement-subject"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <BookOpen size={15} className="text-slate-400" />
                Subject
              </label>

              <div className="relative">
                <select
                  id="achievement-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-10 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="achievement-description"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <FileText size={15} className="text-slate-400" />
                  Description
                </label>

                <span className="text-xs text-slate-400">
                  {formData.description.length}/500
                </span>
              </div>

              <textarea
                id="achievement-description"
                name="description"
                rows={4}
                maxLength={500}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what students must achieve to earn this recognition..."
                className="min-h-[120px] w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />

              <p className="mt-1.5 text-xs leading-5 text-slate-400">
                Explain the achievement criteria or the behavior being
                recognized.
              </p>
            </div>

            {/* Preview */}
            <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                <Award size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-emerald-800">
                  Achievement preview
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                  {formData.name.trim() || "Your achievement name"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formData.subject}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex flex-col-reverse gap-2 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:min-h-10"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0FEE7F] px-5 text-sm font-semibold text-[#064E3B] shadow-sm transition hover:bg-[#0DDC73] focus:outline-none focus:ring-4 focus:ring-emerald-500/20 sm:min-h-10"
            >
              <Plus size={17} strokeWidth={2} />
              Create Achievement
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
