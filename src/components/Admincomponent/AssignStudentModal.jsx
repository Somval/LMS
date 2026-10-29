
import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const initialFormData = {
  name: "",
  studentId: "",
  subject: "Mathematics",
  level: "Year 4",
  days: "Mon & Wed",
  time: "5:00 PM – 6:00 PM",
  status: "Active",
};

const inputClass =
  "h-10 w-full rounded-md border border-[#E1E5EB] bg-white px-3 text-[12px] text-[#252525] outline-none transition placeholder:text-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50";

export default function AssignStudentModal({ onClose, onAssign }) {
  const [formData, setFormData] = useState({ ...initialFormData });
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.studentId.trim()) {
      setError("Please enter the student's name and student ID.");
      return;
    }

    onAssign({
      ...formData,
      name: formData.name.trim(),
      studentId: formData.studentId.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#111827]/45 p-3 backdrop-blur-[2px] sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="assign-student-title"
        className="my-auto max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-xl border border-[#E9ECF2] bg-white shadow-2xl"
      >
        {/* Modal header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#EDF0F4] bg-white px-5 py-4 sm:px-6">
          <div>
            <h2
              id="assign-student-title"
              className="text-[18px] font-semibold text-[#171717]"
            >
              Assign Student
            </h2>
            <p className="mt-1 text-[12px] text-[#7B8493]">
              Add a student and configure their class details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#737B89] transition hover:bg-gray-100 hover:text-[#171717] focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
          <FormField label="Student Name">
            <input
              required
              autoFocus
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Enter student name"
              className={inputClass}
            />
          </FormField>

          <FormField label="Student ID">
            <input
              required
              value={formData.studentId}
              onChange={(event) =>
                updateField("studentId", event.target.value)
              }
              placeholder="e.g. STU0013"
              className={inputClass}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Subject">
              <select
                value={formData.subject}
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

            <FormField label="Year Level">
              <select
                value={formData.level}
                onChange={(event) =>
                  updateField("level", event.target.value)
                }
                className={inputClass}
              >
                <option>Year 3</option>
                <option>Year 4</option>
                <option>Year 5</option>
              </select>
            </FormField>
          </div>

          <FormField label="Class Days">
            <input
              value={formData.days}
              onChange={(event) => updateField("days", event.target.value)}
              placeholder="e.g. Mon & Wed"
              className={inputClass}
            />
          </FormField>

          <FormField label="Class Time">
            <input
              value={formData.time}
              onChange={(event) => updateField("time", event.target.value)}
              placeholder="e.g. 5:00 PM – 6:00 PM"
              className={inputClass}
            />
          </FormField>

          <FormField label="Status">
            <select
              value={formData.status}
              onChange={(event) => updateField("status", event.target.value)}
              className={inputClass}
            >
              <option>Active</option>
              <option>On hold</option>
            </select>
          </FormField>

          {error && (
            <p
              role="alert"
              className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-[12px] text-red-600"
            >
              {error}
            </p>
          )}

          {/* Footer actions */}
          <div className="flex flex-col-reverse gap-2 border-t border-[#EDF0F4] pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center justify-center rounded-md border border-[#E1E5EB] px-5 text-[12px] font-medium text-[#596273] transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#064B0B] px-5 text-[12px] font-medium text-white transition hover:bg-[#053D09] focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
            >
              <Plus size={15} />
              Assign Student
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
      <span className="mb-1.5 block text-[12px] font-medium text-[#4B5563]">
        {label}
      </span>
      {children}
    </label>
  );
}
