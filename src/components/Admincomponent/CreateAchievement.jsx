
import React, { useEffect, useState } from "react";
import { Award, CalendarDays, CheckCircle2, X } from "lucide-react";
import Badge from "../../assets/images/134a082cca973150969aa91355d8ac63a4934a6a.png";

export default function CreateAchievement({
  isOpen,
  onClose,
  onCreate,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") handleClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isSuccess]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate(new Date().toLocaleDateString("en-CA"));
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose?.();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !date) return;

    const newAchievement = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      date: new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      icon: Badge,
    };

    onCreate(newAchievement);
    setIsSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#101828]/50 p-3 backdrop-blur-[2px] sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-achievement-title"
        className="relative my-auto w-full max-w-[500px] rounded-xl bg-white p-5 sm:p-7"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#8993A2] transition-colors hover:bg-[#F2F4F7] hover:text-[#303846]"
        >
          <X size={19} />
        </button>

        {!isSuccess ? (
          <>
            {/* Modal Heading */}
            <div className="mb-6 flex items-center gap-3 pr-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
                <Award size={23} className="text-[#4777E8]" />
              </div>

              <div className="min-w-0">
                <h2
                  id="create-achievement-title"
                  className="text-lg font-bold text-[#171717] sm:text-xl"
                >
                  Create New Achievement
                </h2>
                <p className="mt-1 text-xs text-[#8993A2] sm:text-sm">
                  Add a new student achievement.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="achievement-title"
                  className="mb-2 block text-sm font-semibold text-[#303846]"
                >
                  Achievement Title
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="achievement-title"
                  type="text"
                  required
                  maxLength={80}
                  autoFocus
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Perfect Attendance"
                  className="h-11 w-full rounded-md border border-[#D9DFE9] bg-white px-3.5 text-sm text-[#303846] outline-none transition focus:border-[#7C9CEB] focus:ring-2 focus:ring-[#E8EEFF]"
                />
              </div>

              <div>
                <label
                  htmlFor="achievement-description"
                  className="mb-2 block text-sm font-semibold text-[#303846]"
                >
                  Description
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <textarea
                  id="achievement-description"
                  required
                  rows={4}
                  maxLength={300}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the achievement and what the student accomplished..."
                  className="w-full resize-none rounded-md border border-[#D9DFE9] bg-white px-3.5 py-3 text-sm leading-relaxed text-[#303846] outline-none transition focus:border-[#7C9CEB] focus:ring-2 focus:ring-[#E8EEFF]"
                />

                <p className="mt-1 text-right text-[11px] text-[#929BAA]">
                  {description.length}/300 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="achievement-date"
                  className="mb-2 block text-sm font-semibold text-[#303846]"
                >
                  Achievement Date
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8993A2]"
                  />

                  <input
                    id="achievement-date"
                    type="date"
                    required
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="h-11 w-full rounded-md border border-[#D9DFE9] bg-white pl-10 pr-3 text-sm text-[#303846] outline-none transition focus:border-[#7C9CEB] focus:ring-2 focus:ring-[#E8EEFF]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#EDF0F5] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="min-h-11 rounded-md px-5 py-2.5 text-sm font-medium text-[#667085] transition-colors hover:bg-[#F4F6FA]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!title.trim() || !description.trim() || !date}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Award size={17} />
                  Create Achievement
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="px-1 py-5 text-center sm:px-3 sm:py-7">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F7ED]">
              <CheckCircle2 size={34} className="text-[#29964B]" />
            </div>

            <h2 className="text-xl font-bold text-[#171717]">
              Achievement Created!
            </h2>

            <p className="mx-auto mt-2 max-w-sm break-words text-sm leading-relaxed text-[#718096]">
              <span className="font-semibold text-[#303846]">{title}</span>{" "}
              has been successfully added to your achievements list.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-7 min-h-11 w-full rounded-md bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
