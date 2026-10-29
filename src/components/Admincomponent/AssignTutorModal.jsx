import React, { useState } from "react";
import { X, Check, UserRound } from "lucide-react";

const tutors = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", days: "Mon, Tue, Wed", time: "5:00 PM – 10:00 PM" },
  { id: 2, name: "Sarah Johnson", email: "sarah2@email.com", days: "Mon, Tue, Wed", time: "5:00 PM – 10:00 PM" },
  { id: 3, name: "Sarah Johnson", email: "sarah3@email.com", days: "Mon, Tue, Wed", time: "5:00 PM – 10:00 PM" },
  { id: 4, name: "Sarah Johnson", email: "sarah4@email.com", days: "Mon, Tue, Wed", time: "5:00 PM – 10:00 PM" },
  { id: 5, name: "Sarah Johnson", email: "sarah5@email.com", days: "Mon, Tue, Wed", time: "5:00 PM – 10:00 PM" },
  { id: 6, name: "Sarah Johnson", email: "sarah6@email.com", days: "Mon, Tue, Wed", time: "5:00 PM – 10:00 PM" },
  { id: 7, name: "Sarah Johnson", email: "sarah7@email.com", days: "Mon, Tue, Wed", time: "5:00 PM – 10:00 PM" },
  { id: 8, name: "Sarah Johnson", email: "sarah8@email.com", days: "Mon, Tue, Wed", time: "5:00 PM – 10:00 PM" },
  { id: 9, name: "Sarah Johnson", email: "sarah9@email.com", days: "Mon, Tue, Wed", time: "6:00 PM – 10:00 PM" },
];

export default function AssignTutorModal({
  isOpen = true,
  course,
  onClose,
  onAssign,
  assignment,
}) {
  const [selectedTutor, setSelectedTutor] = useState(null);

  if (!isOpen) return null;

  const currentCourse = course || assignment?.[0] || {};

  const courseName = currentCourse.course || currentCourse.courseName || "Course";
  const level = currentCourse.level || "Level not specified";
  const studentName = currentCourse.studentName || "Student";

  const handleAssign = () => {
    if (!selectedTutor) return;

    const tutor = tutors.find((item) => item.id === selectedTutor);
    if (!tutor) return;

    onAssign?.(currentCourse, tutor);
  };

  const handleClose = () => {
    setSelectedTutor(null);
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-4 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="assign-tutor-title"
        className="flex h-[682px] max-h-[calc(100dvh-32px)] w-full max-w-[771px] flex-col overflow-hidden rounded-xl border border-[#E9EBEF] bg-white font-['Inter',sans-serif] shadow-[0_20px_60px_rgba(16,24,40,0.20)]"
      >
        {/* Header */}
        <header className="flex shrink-0 items-start justify-between border-b border-[#EAECF0] px-5 py-5 sm:px-8 sm:py-6">
          <div className="min-w-0">
            <h2
              id="assign-tutor-title"
              className="text-lg font-semibold leading-7 text-[#202124] sm:text-xl"
            >
              Assign Tutor
            </h2>

            <p className="mt-1 break-words text-sm leading-5 text-[#858C98]">
              {courseName} <span className="px-1">·</span> {level}
              <span className="px-1">·</span> {studentName}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#555B65] transition-colors hover:bg-[#F3F4F6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
          >
            <X size={21} strokeWidth={1.7} />
          </button>
        </header>

        {/* Selection heading */}
        <div className="shrink-0 px-5 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-6">
          <h3 className="text-base font-semibold leading-6 text-[#292D32] sm:text-lg">
            Select Tutor
          </h3>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#858C98]">
            These tutors teach {courseName} and are available on the
            student's preferred schedule.
          </p>
        </div>

        {/* Tutor list */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {tutors.map((tutor) => {
              const isSelected = selectedTutor === tutor.id;

              return (
                <button
                  key={tutor.id}
                  type="button"
                  onClick={() => setSelectedTutor(tutor.id)}
                  aria-pressed={isSelected}
                  className={`relative min-w-0 rounded-lg border p-4 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2 ${
                    isSelected
                      ? "border-[#159A42] bg-[#F5FBF5] shadow-[0_0_0_1px_rgba(21,154,66,0.08)]"
                      : "border-[#E4E7EC] bg-white hover:border-[#A7D5AF] hover:bg-[#FCFEFC]"
                  }`}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-[#159A42] bg-[#159A42]"
                          : "border-[#C9CDD4] bg-white"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F3E9] text-[#176B2C]">
                      <UserRound size={22} strokeWidth={1.7} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate pr-5 text-sm font-semibold leading-5 text-[#292D32] sm:text-base">
                        {tutor.name}
                      </span>

                      <span className="mt-1 block truncate text-xs leading-5 text-[#858C98]">
                        {tutor.email}
                      </span>

                      <span className="mt-2 block text-xs font-medium leading-5 text-[#858C98] sm:text-sm">
                        Available days
                      </span>

                      <span className="block text-sm leading-5 text-[#515762]">
                        {tutor.days}
                      </span>

                      <span className="mt-1 block text-sm leading-5 text-[#515762]">
                        {tutor.time}
                      </span>
                    </span>
                  </div>

                  {isSelected && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#159A42] text-white">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 flex-col gap-3 border-t border-[#EAECF0] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-5">
          <p className="text-sm text-[#858C98]">
            {selectedTutor
              ? "1 tutor selected"
              : "Select a tutor to continue"}
          </p>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-5 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAssign}
              disabled={!selectedTutor}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#004B0B] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#063B0D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Assign Tutor
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
