import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditRewardModal({ isOpen, item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    criteria: "",
    studentsEarned: 0,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        criteria: item.criteria || "",
        studentsEarned: item.studentsEarned || 0,
      });
    }
  }, [item]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "studentsEarned" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...item,
      ...formData,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl border border-[#EAEAF0]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#EAEAF0] px-6 py-4 bg-[#F8F9FC]">
          <h3 className="text-base font-semibold text-[#1E293B]">
            Edit Reward / Badge
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[6px] p-1.5 text-[#64748B] hover:bg-[#E2E8F0]/60 hover:text-[#1E293B] transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-6 py-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#1E293B] shadow-xs focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#1E293B] shadow-xs focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 resize-none"
              />
            </div>

            {/* Criteria */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                Criteria
              </label>
              <input
                type="text"
                name="criteria"
                value={formData.criteria}
                onChange={handleChange}
                required
                className="w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#1E293B] shadow-xs focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
              />
            </div>

            {/* Students Earned */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1.5">
                Students Earned
              </label>
              <input
                type="number"
                name="studentsEarned"
                min="0"
                value={formData.studentsEarned}
                onChange={handleChange}
                required
                className="w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#1E293B] shadow-xs focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-[#EAEAF0] bg-[#F8F9FC] px-6 py-3.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[6px] border border-[#CBD5E1] bg-white px-4 py-2 text-xs font-medium text-[#334155] shadow-xs hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-[6px] bg-[#4F46E5] px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}