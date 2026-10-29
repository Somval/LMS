import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

export default function EditBadgeModal({ isOpen, badge, onClose, onSave }) {
  const [formData, setFormData] = useState({ name: "", description: "", criteria: "" });
  const [error, setError] = useState("");

  // Preload validation: sync and reset form data whenever the active badge changes or modal opens
  useEffect(() => {
    if (badge) {
      setFormData({
        name: badge.name || "",
        description: badge.description || "",
        criteria: badge.criteria || "",
      });
      setError("");
    }
  }, [badge, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error message dynamically as user fixes inputs
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Preload & submission validation check
    const trimmedName = formData.name.trim();
    const trimmedDesc = formData.description.trim();
    const trimmedCriteria = formData.criteria.trim();

    if (!trimmedName || !trimmedDesc || !trimmedCriteria) {
      setError("All fields are required and cannot be empty spaces.");
      return;
    }

    if (trimmedName.length < 3) {
      setError("Badge name must be at least 3 characters long.");
      return;
    }

    // Pass valid payload back
    onSave({
      ...badge,
      name: trimmedName,
      description: trimmedDesc,
      criteria: trimmedCriteria,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden scale-100 transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
          <h3 className="text-base font-semibold text-slate-900">Edit Badge Details</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Validation Alert Box */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-shake">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Badge Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Perfect Attendance"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what this badge is awarded for..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Criteria <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="criteria"
              value={formData.criteria}
              onChange={handleChange}
              placeholder="e.g. Attend 100% of classes"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}