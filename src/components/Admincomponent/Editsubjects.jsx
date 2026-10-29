
import React, { useEffect, useState } from "react";
import {
  X,
  BookOpen,
  Check,
  Pencil,
  Users,
  GraduationCap,
  CalendarDays,
  AlertCircle,
} from "lucide-react";

const defaultSubject = {
  id: "",
  name: "",
  description: "",
  availableTutors: 0,
  enrolledStudents: 0,
  classesHeld: 0,
  status: "Active",
};

export default function EditSubject({
  isOpen,
  onClose,
  subject,
  onSave,
}) {
  const [formData, setFormData] = useState(defaultSubject);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && subject) {
      setFormData({
        ...defaultSubject,
        ...subject,
      });
      setErrors({});
    }
  }, [isOpen, subject]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Subject name is required.";
    }

    if (!formData.description.trim()) {
      nextErrors.description = "Please enter a description.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setIsSaving(true);

      if (onSave) {
        await onSave({
          ...formData,
          name: formData.name.trim(),
          description: formData.description.trim(),
        });
      }

      onClose();
    } catch (error) {
      setErrors({
        submit:
          error?.message ||
          "Unable to save changes. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !subject) {
    return null;
  }

  const inputClass =
    "h-11 w-full rounded-lg border border-[#E1E5EB] bg-white px-3 text-sm text-[#20252D] outline-none transition placeholder:text-[#A0A7B2] focus:border-[#159A42] focus:ring-2 focus:ring-[#159A42]/10";

  const labelClass =
    "mb-2 block text-[13px] font-medium text-[#414956]";

  const metrics = [
    {
      label: "Available Tutors",
      value: formData.availableTutors,
      icon: Users,
    },
    {
      label: "Enrolled Students",
      value: formData.enrolledStudents,
      icon: GraduationCap,
    },
    {
      label: "Classes Held",
      value: formData.classesHeld,
      icon: CalendarDays,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#101828]/45 p-3 backdrop-blur-[2px] sm:p-5"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSaving
        ) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-subject-title"
        className="my-auto flex max-h-[94dvh] w-full max-w-[600px] flex-col overflow-hidden rounded-xl border border-[#E8EBF0] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
      >
        {/* Modal Header */}
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[#EDF0F4] px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F8EE] text-[#159A42]">
              <Pencil size={19} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h2
                id="edit-subject-title"
                className="text-base font-semibold text-[#171A21] sm:text-lg"
              >
                Edit Subject
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#7B8491]">
                Update subject details and availability.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close edit subject dialog"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#7B8491] transition hover:bg-[#F2F4F7] hover:text-[#171A21] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </header>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-5 px-4 py-5 sm:px-6 sm:py-6">
            {/* Subject Name */}
            <div>
              <label
                htmlFor="edit-subject-name"
                className={labelClass}
              >
                Subject Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="edit-subject-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Mathematics - Year 1"
                aria-invalid={Boolean(errors.name)}
                className={`${inputClass} ${
                  errors.name ? "border-red-400" : ""
                }`}
                required
              />

              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="edit-subject-description"
                className={labelClass}
              >
                Description
                <span className="ml-1 text-red-500">*</span>
              </label>

              <textarea
                id="edit-subject-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what students will learn..."
                rows={4}
                aria-invalid={Boolean(errors.description)}
                className={`min-h-[110px] w-full resize-y rounded-lg border border-[#E1E5EB] bg-white px-3 py-3 text-sm leading-6 text-[#20252D] outline-none transition placeholder:text-[#A0A7B2] focus:border-[#159A42] focus:ring-2 focus:ring-[#159A42]/10 ${
                  errors.description ? "border-red-400" : ""
                }`}
                required
              />

              {errors.description && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Subject Statistics */}
            <div>
              <h3 className="mb-3 text-[13px] font-semibold text-[#303743]">
                Subject Overview
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {metrics.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex min-w-0 items-center gap-3 rounded-lg border border-[#E8EBF0] bg-[#FAFBFD] p-3 sm:flex-col sm:items-start"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F8EE] text-[#159A42]">
                      <Icon size={17} strokeWidth={1.7} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs leading-5 text-[#7B8491]">
                        {label}
                      </p>

                      <p className="text-lg font-semibold leading-6 text-[#20252D]">
                        {value ?? 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-[11px] leading-5 text-[#89919D]">
                These figures are displayed for reference and are
                not editable here.
              </p>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="edit-subject-status"
                className={labelClass}
              >
                Subject Status
              </label>

              <div className="relative">
                <select
                  id="edit-subject-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <span
                  className={`pointer-events-none absolute right-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${
                    formData.status === "Active"
                      ? "bg-[#16B364]"
                      : "bg-[#F04438]"
                  }`}
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-[#7B8491]">
                {formData.status === "Active"
                  ? "This subject is available on the platform."
                  : "This subject is inactive and may not be available to students."}
              </p>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600"
              >
                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0"
                />
                <p>{errors.submit}</p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <footer className="sticky bottom-0 flex shrink-0 flex-col-reverse gap-2 border-t border-[#EDF0F4] bg-white px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#DDE2E9] bg-white px-5 text-sm font-medium text-[#4B5563] transition hover:bg-[#F7F8FA] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#064E0B] px-5 text-sm font-medium text-white transition hover:bg-[#086313] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Check size={16} />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}