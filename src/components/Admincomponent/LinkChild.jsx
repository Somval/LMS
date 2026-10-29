
import React, { useEffect, useState } from "react";
import { Check, X, BookOpen, UserRound } from "lucide-react";

const SUBJECT_OPTIONS = [
  "Mathematics Year 3",
  "English Year 3",
  "Science Year 3",
  "Mathematics Year 4",
  "English Year 4",
  "Science Year 4",
  "Mathematics Year 5",
  "English Year 5",
];

const DEFAULT_SUBJECTS = [
  "Mathematics Year 3",
  "English Year 3",
];

const INITIAL_FORM = {
  name: "",
  subjects: DEFAULT_SUBJECTS,
};

export default function LinkChild({
  isOpen,
  onClose,
  onLink,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        subjects: [...DEFAULT_SUBJECTS],
      });
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNameChange = (event) => {
    setFormData((current) => ({
      ...current,
      name: event.target.value,
    }));

    setError("");
  };

  const handleSubjectChange = (event) => {
    const { value, checked } = event.target;

    setFormData((current) => ({
      ...current,
      subjects: checked
        ? [...current.subjects, value]
        : current.subjects.filter((subject) => subject !== value),
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();

    if (!name) {
      setError("Please enter the child's full name.");
      return;
    }

    if (formData.subjects.length === 0) {
      setError("Please select at least one enrolled subject.");
      return;
    }

    onLink({
      id: `child-${Date.now()}`,
      name,
      subjects: [...formData.subjects],
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#111827]/45 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="link-child-title"
        className="my-auto flex max-h-[90vh] w-full max-w-[500px] flex-col overflow-hidden rounded-xl border border-[#E6EAF0] bg-white shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#E8EBF2] px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E9F8EE] text-[#159A42]">
              <UserRound size={20} strokeWidth={1.8} />
            </div>

            <div>
              <h2
                id="link-child-title"
                className="text-lg font-semibold tracking-[-0.3px] text-[#111827]"
              >
                Link Child
              </h2>

              <p className="mt-1 text-xs text-[#7A8491]">
                Add a child to your linked children list.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#69737D] transition hover:bg-[#F3F5F9] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
          >
            <X size={19} />
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 space-y-6 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6"
        >
          {/* Child Name */}
          <div>
            <label
              htmlFor="linked-child-name"
              className="mb-2 block text-sm font-medium text-[#374151]"
            >
              Child's Full Name
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="linked-child-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Enter child's full name"
              required
              autoFocus
              className="h-11 w-full rounded-md border border-[#D8DEE8] bg-white px-3.5 text-sm text-[#111827] outline-none transition placeholder:text-[#A0A7B2] hover:border-[#B8C2D0] focus:border-[#159A42] focus:ring-2 focus:ring-[#159A42]/10"
            />
          </div>

          {/* Subject Selection */}
          <fieldset>
            <div className="mb-3 flex items-center justify-between gap-3">
              <legend className="text-sm font-medium text-[#374151]">
                Enrolled Subjects
                <span className="ml-1 text-red-500">*</span>
              </legend>

              <span className="text-xs text-[#7A8491]">
                {formData.subjects.length} selected
              </span>
            </div>

            <p className="mb-4 text-xs leading-5 text-[#85858D]">
              Select the subjects the child is enrolled in.
            </p>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SUBJECT_OPTIONS.map((subject) => {
                const checked = formData.subjects.includes(subject);

                return (
                  <label
                    key={subject}
                    className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 transition ${
                      checked
                        ? "border-[#159A42]/50 bg-[#F0FBF3]"
                        : "border-[#E4E8EF] bg-white hover:border-[#B8C2D0]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={subject}
                      checked={checked}
                      onChange={handleSubjectChange}
                      className="h-4 w-4 shrink-0 accent-[#159A42]"
                    />

                    <span
                      className={`text-xs leading-5 ${
                        checked
                          ? "font-medium text-[#176B35]"
                          : "text-[#596575]"
                      }`}
                    >
                      {subject}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="rounded-md border border-red-100 bg-red-50 px-3 py-2.5 text-xs text-red-600"
            >
              {error}
            </p>
          )}

          {/* Selected Subjects Preview */}
          {formData.subjects.length > 0 && (
            <div className="rounded-lg bg-[#F5F7FB] p-3.5">
              <div className="mb-2 flex items-center gap-2 text-[#69737D]">
                <BookOpen size={15} />
                <span className="text-xs font-medium">
                  Selected subjects
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="rounded bg-[#E5EAF2] px-2.5 py-1.5 text-[11px] text-[#667180]"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#E8EBF2] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-md border border-[#D8DEE8] bg-white px-5 text-sm font-medium text-[#4B5563] transition hover:bg-[#F5F7FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#159A42] px-5 text-sm font-medium text-white transition hover:bg-[#128238] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2"
            >
              <Check size={17} />
              Link Child
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
