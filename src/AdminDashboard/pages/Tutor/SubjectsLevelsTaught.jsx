
import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Calculator,
  X,
} from "lucide-react";

const initialSubjects = [
  {
    id: 1,
    subject: "Mathematics",
    levels: ["Year 3", "Year 4", "Year 5"],
  },
  {
    id: 2,
    subject: "Mathematics",
    levels: ["Year 3", "Year 4", "Year 5"],
  },
];

export default function SubjectsLevelsTaught() {
  const [subjects, setSubjects] = useState(initialSubjects);

  const handleRemove = (id) => {
    setSubjects((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const removeLevel = (subjectId, level) => {
    setSubjects((current) =>
      current.map((item) =>
        item.id === subjectId
          ? {
              ...item,
              levels: item.levels.filter(
                (itemLevel) => itemLevel !== level
              ),
            }
          : item
      )
    );
  };

  // Add Subject and Edit intentionally do nothing.
  // No modal, popup, or inline form is displayed.
  const handleAddSubject = () => {};
  const handleEdit = () => {};

  return (
    <section className="mt-6 w-full min-w-0 rounded-lg bg-white p-3 font-sans sm:mt-10 sm:p-5 lg:p-[22px]">
      {/* Section Heading */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
        <h2 className="text-lg font-semibold leading-6 tracking-[-0.3px] text-[#111827] sm:text-xl">
          Subjects &amp; Levels Taught
        </h2>

        <button
          type="button"
          onClick={handleAddSubject}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-[#65e99a] bg-white px-3 text-sm font-medium text-[#16b957] transition hover:bg-[#edfff4] focus:outline-none focus:ring-2 focus:ring-green-200 sm:px-4"
        >
          <Plus size={17} strokeWidth={1.8} />
          Add Subject
        </button>
      </div>

      {/* Subjects Table Only */}
      <div className="w-full overflow-x-auto rounded-lg border border-[#e0e4eb]">
        <div className="min-w-[580px]">
          {/* Table Header */}
          <div className="grid min-h-12 grid-cols-[24%_44%_32%] items-center bg-[#eef2f8] text-sm font-semibold text-[#687487]">
            <div className="px-4 lg:px-5">Subjects</div>
            <div className="px-4 lg:px-5">Year Levels / Grades</div>
            <div className="px-4 text-center">Actions</div>
          </div>

          {/* Subject Rows */}
          {subjects.length > 0 ? (
            subjects.map((item) => (
              <div
                key={item.id}
                className="grid min-h-[60px] grid-cols-[24%_44%_32%] border-t border-[#e5e7eb] first:border-t-0"
              >
                {/* Subject */}
                <div className="flex min-w-0 items-center gap-3 px-3 py-3 sm:px-4 lg:px-5">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md bg-[#34358b] text-white">
                    <Calculator
                      size={19}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="break-words text-sm font-medium text-[#111827] sm:text-[15px]">
                    {item.subject}
                  </span>
                </div>

                {/* Year Levels */}
                <div className="flex min-w-0 flex-wrap items-center gap-2 border-l border-[#edf0f4] px-3 py-3 sm:px-4 lg:px-5">
                  {item.levels.length > 0 ? (
                    item.levels.map((level) => (
                      <span
                        key={level}
                        className="inline-flex min-h-7 items-center gap-1.5 rounded bg-[#e9edf4] px-2.5 py-1 text-xs font-medium text-[#687487]"
                      >
                        {level}

                        <button
                          type="button"
                          onClick={() => removeLevel(item.id, level)}
                          aria-label={`Remove ${level} from ${item.subject}`}
                          className="rounded-sm text-[#8993a3] transition hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-[#9ca3af]">
                      No levels selected
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex min-w-0 items-stretch border-l border-[#e5e7eb]">
                  <button
                    type="button"
                    onClick={handleEdit}
                    aria-label={`Edit ${item.subject}`}
                    className="flex flex-1 items-center justify-center gap-2 border-r border-[#e5e7eb] px-2 py-3 text-sm font-medium text-[#777777] transition hover:bg-[#f5f5ff] hover:text-[#34358b] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-200"
                  >
                    <Pencil size={15} strokeWidth={1.7} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="flex flex-1 items-center justify-center gap-2 px-2 py-3 text-sm font-medium text-[#ff4141] transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-200"
                  >
                    <Trash2 size={15} strokeWidth={1.7} />
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex min-h-[120px] items-center justify-center px-4 text-center">
              <p className="text-sm font-medium text-[#687487]">
                No subjects available.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
