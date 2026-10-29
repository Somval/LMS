import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditTopicModal({ isOpen, onClose, topic, onSave }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Published");

  useEffect(() => {
    if (topic) {
      setTitle(topic.title || "");
      setStatus(topic.status || "Published");
    }
  }, [topic]);

  if (!isOpen || !topic) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...topic,
        title,
        status,
        updatedAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-[#e2e8f0] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
          <h2 className="text-lg font-bold text-[#0f172a]">Edit Topic</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Topic Title */}
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">
              Topic Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition focus:border-[#08b927] focus:ring-2 focus:ring-[#08b927]/20"
              placeholder="e.g. Numbers and Place Value"
            />
          </div>

          {/* Topic Status */}
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition focus:border-[#08b927] focus:ring-2 focus:ring-[#08b927]/20 cursor-pointer"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5f9]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#08b927] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#079d21] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}