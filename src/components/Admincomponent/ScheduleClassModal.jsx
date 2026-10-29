
import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const initialForm = {
  name: "",
  studentId: "",
  subject: "Mathematics",
  level: "Year 4",
  days: "Mon & Wed",
  time: "5:00 PM – 6:00 PM",
  nextClass: "Oct 7, 2026",
  nextTime: "5:00 PM",
  classesCount: "0/12",
  status: "Active",
};

const inputClass =
  "h-10 w-full rounded-md border border-[#E1E5EB] bg-white px-3 text-[12px] text-[#252525] outline-none transition placeholder:text-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50";

export default function ScheduleClassModal({ onClose, onSchedule }) {
  const [form, setForm] = useState(initialForm);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.studentId.trim()) return;

    onSchedule({
      ...form,
      name: form.name.trim(),
      studentId: form.studentId.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-[#111827]/45 p-3 backdrop-blur-[2px] sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-class-title"
        className="my-auto max-h-[92vh] w-full max-w-[500px] overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h2
              id="schedule-class-title"
              className="text-[17px] font-semibold text-[#171717]"
            >
              Schedule Class
            </h2>
            <p className="mt-1 text-[11px] text-gray-500">
              Enter the student and class schedule details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close schedule class modal"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Student Name">
              <input
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Enter student name"
                className={inputClass}
              />
            </FormField>

            <FormField label="Student ID">
              <input
                required
                value={form.studentId}
                onChange={(event) =>
                  updateField("studentId", event.target.value)
                }
                placeholder="e.g. STU0013"
                className={inputClass}
              />
            </FormField>

            <FormField label="Subject">
              <select
                value={form.subject}
                onChange={(event) =>
                  updateField("subject", event.target.value)
                }
                className={inputClass}
              >
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
              </select>
            </FormField>

            <FormField label="Level">
              <select
                value={form.level}
                onChange={(event) => updateField("level", event.target.value)}
                className={inputClass}
              >
                <option>Year 3</option>
                <option>Year 4</option>
                <option>Year 5</option>
              </select>
            </FormField>

            <FormField label="Class Days">
              <input
                value={form.days}
                onChange={(event) => updateField("days", event.target.value)}
                placeholder="e.g. Mon & Wed"
                className={inputClass}
              />
            </FormField>

            <FormField label="Class Time">
              <input
                value={form.time}
                onChange={(event) => updateField("time", event.target.value)}
                placeholder="e.g. 5:00 PM – 6:00 PM"
                className={inputClass}
              />
            </FormField>

            <FormField label="Next Class Date">
              <input
                value={form.nextClass}
                onChange={(event) =>
                  updateField("nextClass", event.target.value)
                }
                placeholder="e.g. Oct 7, 2026"
                className={inputClass}
              />
            </FormField>

            <FormField label="Next Class Time">
              <input
                value={form.nextTime}
                onChange={(event) =>
                  updateField("nextTime", event.target.value)
                }
                placeholder="e.g. 5:00 PM"
                className={inputClass}
              />
            </FormField>

            <FormField label="Classes Count">
              <input
                value={form.classesCount}
                onChange={(event) =>
                  updateField("classesCount", event.target.value)
                }
                placeholder="e.g. 0/12"
                className={inputClass}
              />
            </FormField>

            <FormField label="Status">
              <select
                value={form.status}
                onChange={(event) => updateField("status", event.target.value)}
                className={inputClass}
              >
                <option>Active</option>
                <option>On hold</option>
              </select>
            </FormField>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-md border border-gray-200 px-4 text-[12px] font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#064B0B] px-4 text-[12px] font-medium text-white transition hover:bg-[#053D09] focus:outline-none focus:ring-2 focus:ring-green-200"
            >
              <Plus size={14} />
              Schedule Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[11px] font-medium text-[#4B5563]">
        {label}
      </span>
      {children}
    </label>
  );
}
