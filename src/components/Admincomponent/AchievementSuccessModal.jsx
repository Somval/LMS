
import React from "react";
import { CheckCircle2, X } from "lucide-react";

export default function AchievementSuccessModal({
  isOpen,
  title,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101828]/45 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievement-success-title"
        className="relative w-full max-w-[420px] rounded-xl bg-white p-6 text-center sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close success message"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#8993A2] transition-colors hover:bg-[#F2F4F7] hover:text-[#344054]"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F7ED]">
          <CheckCircle2 size={34} className="text-[#29964B]" />
        </div>

        <h2
          id="achievement-success-title"
          className="text-lg font-bold text-[#171717] sm:text-xl"
        >
          Achievement Created!
        </h2>

        <p className="mx-auto mt-2 max-w-sm break-words text-sm leading-relaxed text-[#718096]">
          <span className="font-semibold text-[#303846]">{title}</span>{" "}
          has been added successfully to your achievements list.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-7 min-h-11 w-full rounded-md bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
        >
          Back to Achievements
        </button>
      </div>
    </div>
  );
}
