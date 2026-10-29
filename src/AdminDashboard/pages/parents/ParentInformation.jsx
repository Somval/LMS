
import React, { useState } from "react";
import { Pencil, X, Check } from "lucide-react";

const initialParent = {
  fullName: "Daniel Smith",
  email: "daniel.smith@email.com",
  phoneNumber: "+44 7700 123456",
  dateJoined: "12 Mar 2024",
  accountStatus: "Active",
  subscriptionPlan: "Monthly",
  nextRenewal: "12 Mar 2025",
  children: "Two",
};

const editableFields = [
  { key: "fullName", label: "Full Name", type: "text" },
  { key: "email", label: "Email Address", type: "email" },
  { key: "phoneNumber", label: "Phone Number", type: "tel" },
  { key: "dateJoined", label: "Date Joined", type: "text" },
  {
    key: "accountStatus",
    label: "Account Status",
    type: "select",
    options: ["Active", "Inactive", "Suspended"],
  },
  {
    key: "subscriptionPlan",
    label: "Subscription Plan",
    type: "select",
    options: ["Monthly", "Quarterly", "Yearly"],
  },
  { key: "nextRenewal", label: "Next Renewal", type: "text" },
  { key: "children", label: "Children", type: "text" },
];

const leftFields = editableFields.slice(0, 5);
const rightFields = editableFields.slice(5);

export default function ParentInformation() {
  const [parent, setParent] = useState(initialParent);
  const [formData, setFormData] = useState(initialParent);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const openEditor = () => {
    setFormData({ ...parent });
    setSaved(false);
    setIsEditing(true);
  };

  const closeEditor = () => {
    setIsEditing(false);
    setFormData({ ...parent });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    setParent({ ...formData });
    setIsEditing(false);
    setSaved(true);
  };

  const renderField = ({ key, label }) => (
    <div
      key={key}
      className="grid min-w-0 grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-3 border-b border-[#E9E9ED] px-1 py-3 sm:gap-4 sm:py-[13px]"
    >
      <span className="min-w-0 text-[12px] font-normal leading-5 text-[#85858D] sm:text-[13px]">
        {label}
      </span>

      <span className="min-w-0 break-words text-[12px] font-normal leading-5 text-[#85858D] sm:text-[13px]">
        {parent[key] || "—"}
      </span>
    </div>
  );

  return (
    <>
      <section className="box-border w-full min-w-0 rounded-lg border border-[#ECEEF4] bg-white p-4 sm:p-5 lg:p-6">
        {/* Card Header */}
        <div className="flex min-h-10 items-center justify-between gap-3 border-b border-[#E5E7EB] pb-3">
          <h2 className="text-sm font-semibold leading-5 text-[#111111] sm:text-[15px]">
            Parent Information
          </h2>

          <button
            type="button"
            onClick={openEditor}
            className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md border border-[#DADDE5] bg-white px-3 text-xs font-medium text-[#656570] transition-colors hover:border-[#159A42] hover:bg-[#F5FBF7] hover:text-[#159A42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2"
          >
            <Pencil size={13} strokeWidth={1.7} />
            Edit
          </button>
        </div>

        {/* Full-Width Information Grid */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-x-6 pt-2 sm:grid-cols-2 lg:gap-x-8">
          {/* Left Column */}
          <div className="min-w-0">
            {leftFields.map(renderField)}
          </div>

          {/* Right Column */}
          <div className="min-w-0 sm:border-l sm:border-[#E5E7EB] sm:pl-5 lg:pl-7">
            {rightFields.map(renderField)}
          </div>
        </div>

        {saved && (
          <div
            role="status"
            className="mt-4 rounded-md bg-[#EAF7EE] px-3 py-2.5 text-xs font-medium text-[#159A42]"
          >
            Parent information updated successfully.
          </div>
        )}
      </section>

      {/* Edit Modal */}
      {isEditing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditor();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="parent-edit-title"
            className="my-auto max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-xl border border-[#E8EBF2] bg-white p-5 shadow-xl sm:p-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[#E8EBF2] pb-4">
              <div>
                <h3
                  id="parent-edit-title"
                  className="text-lg font-semibold text-[#111827]"
                >
                  Edit Parent Information
                </h3>
                <p className="mt-1 text-xs text-[#85858D]">
                  Update the parent's information below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditor}
                aria-label="Close editor"
                className="rounded-md p-2 text-[#69737D] transition-colors hover:bg-[#F5F7FD] hover:text-black"
              >
                <X size={19} />
              </button>
            </div>

            {/* Editable Fields */}
            <form onSubmit={handleSave} className="mt-5 space-y-4">
              {editableFields.map((field) => (
                <div key={field.key}>
                  <label
                    htmlFor={`parent-${field.key}`}
                    className="mb-1.5 block text-xs font-medium text-[#4B5563]"
                  >
                    {field.label}
                  </label>

                  {field.type === "select" ? (
                    <select
                      id={`parent-${field.key}`}
                      name={field.key}
                      value={formData[field.key]}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#DADDE5] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition focus:border-[#159A42] focus:ring-2 focus:ring-[#159A42]/10"
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`parent-${field.key}`}
                      name={field.key}
                      type={field.type}
                      value={formData[field.key]}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-[#DADDE5] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition focus:border-[#159A42] focus:ring-2 focus:ring-[#159A42]/10"
                    />
                  )}
                </div>
              ))}

              {/* Modal Actions */}
              <div className="flex flex-col-reverse gap-2 border-t border-[#E8EBF2] pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="inline-flex items-center justify-center rounded-md border border-[#DADDE5] px-4 py-2.5 text-sm font-medium text-[#4B5563] transition hover:bg-[#F5F7FD]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#159A42] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#128238] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2"
                >
                  <Check size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
